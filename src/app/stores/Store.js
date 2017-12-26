import Actions from '../actions/Actions.js';
import alt from '../alt.js';

class Store {
  constructor() {
    this.bindListeners({
      updateAngularApps: Actions.UPDATE_ANGULAR_APPS,
      updateReactApps: Actions.UPDATE_REACT_APPS,
    });

    this.state = {
      angularApps: [],
      reactApps: [],
    };
  }

  updateAngularApps(angularApps) {
    this.setState({ angularApps });
  }

  updateReactApps(reactApps) {
    this.setState({ reactApps });
  }
}

export default alt.createStore(Store, 'Store');
