import React, { Component } from 'react';
import Moment from 'moment';

export default class PickupReturnInfo extends Component {
  render(){
    const { pickupReturnData } = this.props;
    return (
      <div className="flexy flexy-stay-in-row pickup-return">
        <div>
          <h2>Pickup</h2>
          <div>{pickupReturnData.PickUpLocation['@Name']}</div>
          <div>{Moment(pickupReturnData['@PickUpDateTime']).format('D MMM h:mma')}</div>
        </div>
        <div>
          <h2>Dropoff</h2>
          <div>{pickupReturnData.ReturnLocation['@Name']}</div>
          <div>{Moment(pickupReturnData['@ReturnDateTime']).format('D MMM h:mma')}</div>
        </div>
      </div>
    );
  }
}
