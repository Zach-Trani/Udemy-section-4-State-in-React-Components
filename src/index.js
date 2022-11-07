import React from 'react';
import ReactDOM from 'react-dom';

// class based component - this is called two times (returns some JSX, and a second time when updating state).
class App extends React.Component {
    // executed first - initial setup when component first created, must call super.
    constructor(props) {
        super(props);

        // Only time we do direct assignment to this.state!
        this.state = { lat: null, errorMessage: '' }; // This is the React State - will be added (number unknown initially), and not deleted.

        window.navigator.geolocation.getCurrentPosition(
            // success callback function
            (position) => {
                // to update state object - we called setState! This does not run when we are running the constructor - runs at some point in future.
                this.setState({ lat: position.coords.latitude }) // this is shown in the browser console
            },
            (err) => {
                this.setState({ errorMessage: err.message }); // this is shown in the browser console
            }
        );
    }

    // React says we have to define render! - this is being called frequently. Conditional rendering in this case.
    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>;
        }

        return <div>Loading!</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))

// 'State' is a JS object that contains data relevant to a component
// Updating 'state' on a component causes the components to (almost) instantly rerender
// State must be initialized when a component is created
// State can only be updated using the function 'setState'