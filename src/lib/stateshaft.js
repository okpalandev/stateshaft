;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], function (b) {
            return (root.stateshaft = factory();
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.stateshaft = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
'use strict';
/**
 * Represents a Cryptic State Machine.
 * @class CrypticStateMachine
 * @constructor
 * @example
 * const stateMachine = CrypticStateMachine.createStateMachine({
 *   initialState: 'idle',
 *   transitions: [
 *     { name: 'rumble', from: 'idle', to: 'eating' },
 *     { name: 'stop', from: 'eating', to: 'stopped' }
 *   ],
 *   methods: {
 *     onIdle: () => console.log("Belly is not rumbling"),
 *     onEating: () => console.log('Eating'),
 *     onStopped: () => console.log('Eating stopped')
 *   }
 * });
 * stateMachine.setState('idle');
 * stateMachine.run();
 *
 * // belly rumbles once
 * stateMachine.setState(stateMachine.nextState('rumble'));
 * stateMachine.run();
 *
 * // belly rumbles again
 * stateMachine.run();
 *
 * // belly stops rumbling
 * stateMachine.setState(stateMachine.nextState('stop'));
 * stateMachine.run();
 */
class CrypticStateMachine {
    constructor() {
      this.states = {};
      this.current_state = null;
      this.transitions = {};
    }
    
  
    /**
     * Add a state to the state machine.
     * @param {string} name - The name of the state.
     * @param {function} fn - The function to be executed when the state is active.
     */
    addState(name, fn) {
      this.states[name] = fn;
    }
  
    /**
     * Define a transition between states.
     * @param {string} name - The name of the transition.
     * @param {string} from - The name of the state to transition from.
     * @param {string} to - The name of the state to transition to.
     */
    transition(name, from, to) {
      this.transitions[name] = { from, to };
    }
  
    /**
     * Set the current state.
     * @param {string} name - The name of the state to set.
     */
    setState(name) {
      this.current_state = name;
    }
    
    /**
     * Get the next state for a given transition.
     * @param {string} name - The name of the transition.
     * @returns {string} - The name of the next state.
     */
    nextState(name) {
      return this.transitions[name].to;
    }
  
   
     /**
     * Run the state machine.
     * @param {...any} args - Arguments to be passed to the state function.
     * @throws {Error} - Throws an error if no state is set.
     */
     run(...args) {
      if (this.current_state === null) {
          throw new Error("No state set!");
      } else {
          const stateFn = this.states[this.current_state];
          if (stateFn) {
              stateFn(...args);
          } else {
              throw new Error(`State function not defined for state ${this.current_state}`);
          }
      }
  }


    /**
     * set the current state
     * @param {string} name - The name of the state to set.
     * @returns {string} - The name of the current state.
     * @throws {Error} - Throws an error if no state is set.
     */
    setState(name) {
      this.current_state = name;
    }

    getCurrentState() {
      return this.current_state;
    }

    /**
     * Create a new instance of CrypticStateMachine.
     * @param {Object} config - Configuration object for creating the state machine.
     * @param {string} config.initialState - The initial state of the state machine.
     * @param {Array} config.transitions - An array of transition objects.
     * @param {Object} config.methods - An object containing methods for each state.
     * @returns {CrypticStateMachine} - The created instance of CrypticStateMachine.
     */
    static createStateMachine({ initialState, transitions, methods }) {
      const stateMachine = new CrypticStateMachine();
      stateMachine.addState(initialState, methods[`on${initialState[0].toUpperCase()}${initialState.slice(1)}`]);
      transitions.forEach(transition => {
        stateMachine.transition(transition.name, transition.from, transition.to);
      });
      return stateMachine;
    }
  }
  
/**
 * Protocol State Machine
 * @class ProtocolStateMachine
 * @constructor
 * @example
 * const stateMachine = new ProtocolStateMachine();
 * stateMachine.addState('start', {
 *  capture: () => console.log('start capturing'),
 * submit: () => console.log('start submitting')
 * });
 * stateMachine.addState('capturing', {
 * capture: () => console.log('capturing'),
 * submit: () => console.log('submitting')
 * });
 * stateMachine.addState('submitted', {
 * capture: () => console.log('submitted capturing'),
 * submit: () => console.log('submitted submitting')
 * });
 * stateMachine.setState('start');
 * stateMachine.processEvent('capture');
 * stateMachine.processEvent('submit');
*/
class ProtocolStateMachine {
    constructor() {
      this.currentState = null;
      this.states = {};
    }
  
      addState(stateName, state) {
        this.states[stateName] = state;
      }
    
    /**
     * Sets the current state of the state machine.
     * @param {string} stateName - The name of the state to set.
     * @throws {Error} If the state does not exist.
     */
      setState(stateName) {
        if (this.states[stateName]) {
          this.current_state = stateName;
        } else {
          throw new Error(`State '${stateName}' does not exist.`);
        }
      }
    
  /**
   * Returns the current state of the state machine.
   * @returns {string} The current state.
   */
    getCurrentState() {
      return this.currentState;
    }
  
  /**
   * Processes the specified event based on the current state.
   * @param {string} event - The event to be processed.
   * @throws {Error} If the event is not defined in the current state or if no state is set.
   */
    processEvent(event) {
      if (this.currentState) {
        const state = this.states[this.currentState];
        if (state[event]) {
          state[event]();
        } else {
          throw new Error(`Event '${event}' is not defined in state '${this.currentState}'.`);
        }
      } else {
        throw new Error('No state is set.');
      }
    }

    /**
     * Creates a state machine from a configuration object.
     * @param {object} config - The configuration object.
     * @param {string} config.initialState - The initial state of the state machine.
     * @param {object[]} config.states - The states of the state machine.
     * @param {string} config.states[].name - The name of the state.
     * @param {object} config.states[].methods - The methods of the state.
     */

    static createStateMachine(config) {
      const stateMachine = new ProtocolStateMachine();
      if (config.states) {
        config.states.forEach(state => {
          stateMachine.addState(state.name, state);
        });
      }
      stateMachine.setState(config.initialState);
      return stateMachine;
    }

  }

    return {
        CrypticStateMachine,
        ProtocolStateMachine
    };
}));
