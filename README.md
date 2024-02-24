# stateshaft
## Manage Cryptic and Protocol state machines with ease.

## Introduction

stateshaft.js is a lightweight and easy-to-use state machine library for Node.js. It provides a way to define and manage state transitions in your applications.

## Installation

You can install stateshaft.js using npm:

```bash
npm install stateshaft
```

## Usage
A Cryptic State Machine would on encountering the same state yield different output performing a different transition.
To use stateshaft.js, you need to create a new state machine and define the states and transitions. Here's an example:
```javascript
const { CrypticStateMachine } = require('stateshaft');
 const stateMachine = CrypticStateMachine.createStateMachine({
   initialState: 'idle',
    transitions: [
      { name: 'rumble', from: 'idle', to: 'eating' },
      { name: 'stop', from: 'eating', to: 'stopped' }
    ],
    methods: {
      onIdle: () => console.log("Belly is not rumbling"),
      onEating: () => console.log('Eating'),
      onStopped: () => console.log('Eating stopped')
    }
 });
 stateMachine.setState('idle');
  stateMachine.run();
 
  // belly rumbles once
  stateMachine.setState(stateMachine.nextState('rumble'));
 stateMachine.run();
 
  // belly rumbles again
  stateMachine.run();
 
  // belly stops rumbling
  stateMachine.setState(stateMachine.nextState('stop'));
  stateMachine.run();
```

In this example, we create a new state machine with an initial state of 'idle'. We then define two transitions: 'rumble' and 'stop'. When the 'rumble' transition is triggered, the state machine moves from 'idle' to 'eating'. When the 'stop' transition is triggered, the state machine moves from 'eating' to 'stopped'. We also define three methods: onIdle, onEating, and onStopped. These methods are called when the state machine enters the 'idle', 'eating', and 'stopped' states, respectively.

 A Protocol State Machine would on encountering the same state yield the same output performing the same transition.
```javascript
const { ProtocolStateMachine} = require('stateshaft');

const stateMachine = ProtocolStateMachine.createStateMachine({
   initialState: 'disconnected',
    transitions: [
      { name: 'connect', from: 'disconnected', to: 'connected' },
      { name: 'disconnect', from: 'connected', to: 'disconnected' }
    ],
    methods: {
      onDisconnected: () => console.log('Disconnected'),
      onConnected: () => console.log('Connected')
    }
 });
 stateMachine.setState('disconnected');
  stateMachine.run();
 
  // connect to the server
  stateMachine.setState(stateMachine.nextState('connect'));
  stateMachine.run();
 
  // disconnect from the server
  stateMachine.setState(stateMachine.nextState('disconnect'));
  stateMachine.run();
```

In this example, we create a new state machine with an initial state of 'disconnected'. We then define two transitions: 'connect' and 'disconnect'. When the 'connect' transition is triggered, the state machine moves from 'disconnected' to 'connected'. When the 'disconnect' transition is triggered, the state machine moves from 'connected' to 'disconnected'. We also define two methods: onDisconnected and onConnected. These methods are called when the state machine enters the 'disconnected' and 'connected' states, respectively.

## Conclusion
stateshaft.js is a powerful and flexible state machine library for Node.js. It provides a simple and intuitive way to define and manage state transitions in your applications. Whether you're building a cryptic or protocol state machine, stateshaft.js has you covered.