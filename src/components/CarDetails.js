import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CarDetails extends Component {
  render(){
    const { vehicleInfo } = this.props;
    return (
      <div className="flexy car-details">
        {/*
          Display a vehicle for the list of vehicles on the landing page
        */}
        {/*
          Display the vendor name. In the future, we could display their logo beneath the name
        */}
        <div>
          { vehicleInfo.vendor['@Name'] }
        </div>
        <div>
          {/*
            Show that the vehicle is available to confirm for the user
          */}
          <div>
            { vehicleInfo.available['@Status'] }
          </div>

          {/*
            Display the vehicle make and model
          */}
          <div>
            <strong>{ vehicleInfo.available.Vehicle.VehMakeModel['@Name'] }</strong>
          </div>

          {/*
            Display the vehicle details
          */}
          <div>
            <ul>
              <li>Air conditioned: { vehicleInfo.available.Vehicle['@AirConditionInd']  }</li>
              <li>Transmission: { vehicleInfo.available.Vehicle['@TransmissionType'] }</li>
              <li>Fuel: { vehicleInfo.available.Vehicle['@FuelType'] }</li>
              <li>Passenger Quantity: { vehicleInfo.available.Vehicle['@PassengerQuantity'] }</li>
              <li>Doors: { vehicleInfo.available.Vehicle['@DoorCount'] }</li>
              <li>Baggage Quantity: { vehicleInfo.available.Vehicle['@BaggageQuantity'] }</li>
            </ul>
          </div>

          {/*
            Display the total price
          */}
          <div>
            <strong>Total: ${ vehicleInfo.available.TotalCharge['@RateTotalAmount'] }</strong>
          </div>
        </div>
        <div>
          {/*
            Display a picture of the vehicle
          */}
          <div>
            <img src={vehicleInfo.available.Vehicle.PictureURL} alt={vehicleInfo.available.Vehicle.VehMakeModel['@Name']} />
          </div>

          {/*
            Book button
          */}
          <div>
            <Link to={`/carFullDetails/${vehicleInfo.vehicle_id}`} target="_blank"><button className="book-btn">BOOK</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
