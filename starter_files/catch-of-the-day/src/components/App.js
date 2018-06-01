import React from "react";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
      fishes: {},
      order: {}
  };

  componentDidMount(){
    // Ref in firebase different from React ref
    const { params } = this.props.match;

    // Reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);

    // new store may not have any existing localStorage data
    if(localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    const fishes = {...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishes
    });
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    const fishes = {...this.state.fishes };
    fishes[key] = null; //Normally you can delete from array, but only setting to null will work w firebase.
    this.setState({ fishes });
  };

  addToOrder = (key) => {
    // Take a copy of state
    const order = {...this.state.order };
    // Add to order, or update the number
    order[key] = order[key] + 1 || 1;
    // call setstate to update state object
    this.setState({ order });
  }

  deductFromOrder = (key) => {
    const order = {...this.state.order };

    order[key]>1 ? order[key] -= 1 : delete order[key];

    this.setState({ order });
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order };

    delete order[key];

    this.setState({ order });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  }
  // test
  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
              <Fish 
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                deductFromOrder={this.deductFromOrder}>
                {key}
              </Fish>)}
          </ul>
        </div>
          <Order 
            fishes={this.state.fishes}
            order={this.state.order}
            removeFromOrder={this.removeFromOrder} />
          <Inventory 
            addFish={this.addFish} 
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes} 
            fishes={this.state.fishes} />
      </div>
    );
  }
}

//Always Remember to export, type this first before content
export default App;
