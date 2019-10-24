import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import LoadingSpinner from './LoadingSpinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        // Get the position inside the function constructor otherwise the render will continue updating
        window.navigator.geolocation.getCurrentPosition(
        // Calling setState
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage} </div>
        } else if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        } else {
            return <LoadingSpinner message="Please accept location check"/>
        }
    }

    // React wants a render function otherwise it returns error
    render() {
        <div className="border red">
            {this.renderContent()}
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))