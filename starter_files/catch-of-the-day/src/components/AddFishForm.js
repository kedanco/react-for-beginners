import React from 'react';

class AddFishForm extends React.Component {
  
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef(); 
  descRef = React.createRef();
  imageRef = React.createRef();
  
  createFish = (event) => {
    event.preventDefault();

    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    };

    this.props.addFish(fish);

    event.currentTarget.reset();
  };
  
  
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="NAME" />
        <input name="price" ref={this.priceRef} type="text" placeholder="PRICE" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" ref={this.descRef} type="text" placeholder="DESC" />
        <input name="image" ref={this.imageRef} type="text" placeholder="IMAGE" />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
