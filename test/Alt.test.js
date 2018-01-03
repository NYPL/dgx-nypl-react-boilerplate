/* eslint-env mocha */
import { expect } from 'chai';

import sinon from 'sinon';
import alt from '../src/app/alt';
import actions from '../src/app/actions/Actions.js';
import store from '../src/app/stores/Store.js';

/*
 * getDispatcherArguments
 * Results of Actions are stored in an array so they must be obtained sequentially.
 * @param {object} dispatcherSpy Sinon spy for the Alt dispatcher object.
 * @param {number} num The offset of the action called.
 * @returns {object} object with the name and data of that the Action was called with.
 */
const getDispatcherArguments = (dispatcherSpy, num) => dispatcherSpy.args[num][0];
const angularApp = ['A new angular app', 'and another'];
const reactApp = ['A new react app'];

describe('Alt', () => {
  describe('Actions', () => {
    let dispatcherSpy;

    before(() => {
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
    });

    after(() => {
      alt.dispatcher.dispatch.restore();
    });

    it('should pass data to updateAngularApps Action', () => {
      const action = actions.UPDATE_ANGULAR_APPS;

      // Trigger the action with data.
      actions.updateAngularApps([]);

      // Get the payload passed to the dispatcher.
      // Note, the offset must match the order that the action was called.
      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 0);

      // Test that the correct name of the action was called with the expected data.
      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql([]);
    });

    it('should pass data to updateReactApps Action', () => {
      const action = actions.UPDATE_REACT_APPS;

      actions.updateReactApps([]);

      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 1);

      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql([]);
    });
  });

  describe('Store', () => {
    it('should pass data to updateAngularApps Action', () => {
      const oldAngularApps = store.getState().angularApps;
      const action = actions.UPDATE_ANGULAR_APPS;

      expect(oldAngularApps).to.eql([]);

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data: angularApp });
      const newAngularApps = store.getState().angularApps;

      expect(newAngularApps).to.eql(angularApp);
    });

    it('should pass data to updateReactApps Action', () => {
      const oldReactApps = store.getState().reactApps;
      const action = actions.UPDATE_REACT_APPS;

      expect(oldReactApps).to.eql([]);

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data: reactApp });
      const newReactApps = store.getState().reactApps;

      expect(newReactApps).to.eql(reactApp);
    });
  });
});
