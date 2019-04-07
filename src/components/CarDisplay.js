import React, { Component } from 'react';
import CarDetails from './CarDetails';

export default class CarDisplayFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle_data: [],
      sorting: {
        price_desc: false, vendor_desc: false
      }
    };
  }

  sortByPrice() {
    //Toggle the sorting from asc to desc and visa versa
    let sort_desc = this.state.sorting.price_desc;
    this.setState({
      sorting: {
        price_desc: !sort_desc
      }
    })

    if(sort_desc){
      return this.props.carData.sort((a,b) => (parseFloat(a.available.TotalCharge['@RateTotalAmount']) < parseFloat(b.available.TotalCharge['@RateTotalAmount'])) ? 1 : -1)
    }
    return this.props.carData.sort((a,b) => (parseFloat(a.available.TotalCharge['@RateTotalAmount']) > parseFloat(b.available.TotalCharge['@RateTotalAmount'])) ? 1 : -1)
  }

  sortByVendor() {
    //Toggle the sorting from asc to desc and visa versa
    let sort_desc = this.state.sorting.vendor_desc;
    this.setState({
      sorting: {
        vendor_desc: !sort_desc
      }
    })

    if(sort_desc){
      return this.props.carData.sort((a,b) => (a.vendor['@Name'] < b.vendor['@Name']) ? 1 : -1)
    }
    return this.props.carData.sort((a,b) => (a.vendor['@Name'] > b.vendor['@Name']) ? 1 : -1)
  }

  sortCars(value) {
    if(value === "Price"){
      this.setState({
        vehicle_data: this.sortByPrice()
      })
    } else if(value === "Vendor"){
      this.setState({
        vehicle_data: this.sortByVendor()
      })
    }
  }

  componentDidMount() {
    //Immediately sort the list of vehicles by price
    this.sortCars("Price")
  }

  render(){
    return (
      <div>
        <div className="flexy flexy-stay-in-row car-sorting">
          {/*
            Sort by Vendor
          */}
          <div>
            <button onClick={() => this.sortCars("Vendor")}>Vendor <i className="fas fa-sort"></i></button>
          </div>

          {/*
            Sort by Price
          */}
          <div>
            <button onClick={() => this.sortCars("Price")}>Price <i className="fas fa-sort"></i></button>
          </div>
        </div>

        <div>
          {/*
            Show how many vehicles are available
          */}
          <p>
            Cars Available - { this.state.vehicle_data.length }
          </p>

          {/*
            Display list of vehicles
          */}
          <div className="app-car-list">
            {
              this.state.vehicle_data.map((item, i) => {
                return <CarDetails vehicleInfo={item} key={i}/>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
