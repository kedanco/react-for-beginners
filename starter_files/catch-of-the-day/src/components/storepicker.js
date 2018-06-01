import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    
    myInput = React.createRef();

    goToStore = event => {
        // Stop form from submitting
        event.preventDefault();

        // Get the text from that input
        const storeName = this.myInput.value.value;

        // Change page to /store/whatever
        this.props.history.push(`/store/${storeName}`);
    }
    
    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a Store</h2>
                <input type="text"
                       ref={this.myInput}
                       required placeholder="Store Name" 
                       defaultValue={getFunName()} />
                <button type="submit">Visit Store →</button>
            </form>
        )
    }
}

export default StorePicker;
