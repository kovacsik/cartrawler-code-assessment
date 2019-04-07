import React, { Component } from 'react';
import '../css/web_form.css';

export default class CarFullDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_confirm: '',
      email_match_error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Update the email addresses as the user is typing
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  //Check if the email and email confirmation match
  handleSubmit(event){
    this.setState({email_match_error: false})
    if(this.state.email !== this.state.email_confirm){
      //email and email confirmation do not match, so display the validation error
      this.setState({email_match_error: true})
    } else {
      //All is good
      alert("No actual data was sent. This is for demonstration purposes.")
    }
    event.preventDefault();
  }

  render(){
    const { carData } = this.props;
    const vehicleInfo = carData[0];
    return (
      <div>
        {/*
          Display a single vehicle that the user selected
        */}
        <div>
          <h1>Vehicle</h1>
        </div>
        <div className="flexy">
          <div>
            {/*
              Display the vendor name
            */}
            <div>
              { vehicleInfo.vendor['@Name'] }
            </div>

            {/*
              Display the vehicle make and model
            */}
            <div>
              <strong>{ vehicleInfo.available.Vehicle.VehMakeModel['@Name'] }</strong>
            </div>

            {/*
              Display the vehicle picture
            */}
            <div>
              <img src={vehicleInfo.available.Vehicle.PictureURL} alt={vehicleInfo.available.Vehicle.VehMakeModel['@Name']} />
            </div>
          </div>

          <div>
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
            <div className="total-amount">
              <strong>Total: ${ vehicleInfo.available.TotalCharge['@RateTotalAmount'] }</strong>
            </div>
          </div>
        </div>

        {/*
          Display contact details
        */}
        <div>
          <h1>Contact Details</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name
                <input type="text" placeholder="Full name" required autoComplete="name" />
              </label>
              <label>
                Email
                <input type="email" name="email" value={this.state.email} placeholder="name@example.com" required autoComplete="email" onChange={this.handleChange} />
              </label>
              <label>
                Confirm Email
                <input type="email" name="email_confirm" value={this.state.email_confirm} placeholder="name@example.com" required autoComplete="email" onChange={this.handleChange} />
              </label>
              {/*
                Email validation. This will display if the email and email confirmation fields do not match
              */}
              {this.state.email_match_error && (
                <div className="email-val"><sup>email does not match!</sup></div>
              )}
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
