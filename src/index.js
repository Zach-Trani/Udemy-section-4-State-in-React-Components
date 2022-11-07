import React from 'react';
import ReactDOM from 'react-dom';

// class based component
class App extends React.Component {
    // executed first - will always write constructor + super methods
    constructor(props) {
        super(props);

        // Only time we do direct assignment to this.state!
        this.state = { lat: null }; // This is the React State - will be updated (number unknown initially)

        window.navigator.geolocation.getCurrentPosition(
            // success callback function
            (position) => {
                // to update state object - we called setState!
                this.setState({ lat: position.coords.latitude })
            },
            (err) => console.log(err) // err
        );
    }

    // React says we have to define render! - this is being called frequently
    render () {
        return <div>Latitude: {this.state.lat}</div>;
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))

// 'State' is a JS object that contains data relevant to a component
// Updating 'state' on a component causes the components to (almost) instantly rerender
// State must be initialized when a component is created
// State can only be updated using the function 'setState'