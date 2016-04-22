import React from 'react';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

import Store from '../../stores/Store.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }

  // Helper functions below the render() function:
  _getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }

  render() {
    const angularApps = this._getList(this.state._angularApps);
    const reactApps = this._getList(this.state._reactApps);

    return (
      <div className="app-wrapper">
        <Header />

        <h2>NYPL Rocks!</h2>
        <p>Our Angular Apps</p>
        <ul>
          {angularApps}
        </ul>
        <p>Our React Apps</p>
        <ul>
          {reactApps}
        </ul>

        <Footer />
      </div>
    );
  }
}

export default App;
