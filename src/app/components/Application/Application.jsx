import React from 'react';

import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';

import Store from '../../stores/Store.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this.getList = this.getList.bind(this);
  }

  // Helper functions below the render() function:
  getList(appsArray) {
    return appsArray.map((app, index) => (
      <li key={index}><a href={app.link}>{app.id}</a></li>
    ));
  }

  render() {
    const angularApps = this.getList(this.state.angularApps);
    const reactApps = this.getList(this.state.reactApps);

    return (
      <div className="app-wrapper">
        <Header
          skipNav={{ target: 'mainContent' }}
          navData={navConfig.current}
        />

        <div id="mainContent">
          {
            // Replace the following with your code. The #mainContent ID is needed for an
            // accessible skip nav from the Header component.
          }
          <h2>NYPL Rocks!</h2>
          <p>
            NYPL React Boilerplate<br />
            Quickly start prototyping projcets in React using this boilerplate. It contains
            React v0.15, Alt, Iso, NYPL Header and Footer NPM modules, and Webpack hot reload
            dev server.
          </p>
          <p>Our Angular Apps</p>
          <ul>
            {angularApps}
          </ul>
          <p>Our React Apps</p>
          <ul>
            {reactApps}
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
