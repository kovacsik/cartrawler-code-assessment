import React, { Component } from 'react';
import CarDetails from './CarDetails';

export default class CarBrand extends Component {
  render(){
    const { vehicleInfo } = this.props;
    return (
      <div>
        <div>
          { vehicleInfo.Vendor['@Name'] }
        </div>

        <div>
          {
            vehicleInfo.VehAvails.map((item, i) => {
              return <CarDetails vehicleAvailable={item} key={i}/>
            })
          }
        </div>
      </div>
    );
  }
}
