import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PickupReturnInfo from './components/PickupReturnInfo';
import CarDisplay from './components/CarDisplay';
import CarFullDetails from './components/CarFullDetails';
import car_data from './data/cars.json';
import "@babel/polyfill";
import axios from 'axios';
import './css/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading_data: true,
      pickup_return_data: {},
      vehicle_data: [],
    };
  }

  //Reorganize the data from the API to make it easier to sort
  organizeVehicleData(vehicles) {
    let organized_data = []
    for(let i = 0; i < vehicles.length; i++){
      for(let j = 0; j < vehicles[i].VehAvails.length; j++){
        organized_data.push({
          vendor: vehicles[i].Vendor,
          available: vehicles[i].VehAvails[j],
          vehicle_id: `${i}_${j}`
        })
      }
    }
    console.log("organized data: ", organized_data);
    return organized_data
  }

  //Return the single vehicle data that was selected by the user
  carSelected(id) {
    return this.state.vehicle_data.filter((car) => {
      return car.vehicle_id === id
    });
  }

  componentDidMount() {
    axios.get("http://www.cartrawler.com/ctabe/cars.json")
      .then((result) => {
        this.setState({
          pickup_return_data: result.data[0].VehAvailRSCore.VehRentalCore,
          vehicle_data: this.organizeVehicleData(result.data[0].VehAvailRSCore.VehVendorAvails),
          loading_data: false
        })
      })
      .catch((error) => {
        console.log("error: ", error)
      })

    /*
      Import the car data from a local JSON file so we don't constantly call the API as we develop
    */
    // this.setState({
    //   pickup_return_data: car_data[0].VehAvailRSCore.VehRentalCore,
    //   vehicle_data: this.organizeVehicleData(car_data[0].VehAvailRSCore.VehVendorAvails),
    //   loading_data: false
    // })
  }

  render() {
    return (
      <TransitionGroup component={null}>
        {/*
          Transition into the app when we are done loading
        */}
        {!this.state.loading_data && (
        <CSSTransition classNames="fade" timeout={1000}>
          <Router>
            <div className="app">
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />

              {/*
                Display the Pickup and Return location and date
              */}
              <PickupReturnInfo pickupReturnData={this.state.pickup_return_data} />

              {/*
                When at the landing page, display the list of cars
              */}
              <Route
                exact={true}
                path="/"
                render={() => <CarDisplay carData={this.state.vehicle_data} />}
              />

              {/*
                Display the car that the user clicked on
              */}
              <Route
                path="/carFullDetails/:id"
                render={({ match }) => <CarFullDetails carData={this.carSelected(match.params.id)} />}
              />
              </div>
          </Router>
        </CSSTransition>
        )}
      </TransitionGroup>
    );
  }
}

export default App;
