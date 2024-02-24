
const { CrypticStateMachine ,ProtocolStateMachine} = stateshaft;
const { assert } = chai; 

describe('CrypticStateMachine', () => {
    let stateMachine;

    beforeEach(() => {
        stateMachine = CrypticStateMachine.createStateMachine({
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
    });

    it('should transition to "eating" state when "rumble" is called', () => {
        stateMachine.setState('idle');
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'idle');

        stateMachine.setState(stateMachine.nextState('rumble'));
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'eating');
    });

    it('should transition to "stopped" state when "stop" is called', () => {
        stateMachine.setState('eating');
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'eating');

        stateMachine.setState(stateMachine.nextState('stop'));
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'stopped');
    });
});

describe('ProtocolStateMachine', () => {
    let stateMachine;

    beforeEach(() => {
        stateMachine = ProtocolStateMachine.createStateMachine({
            initialState: 'idle',
            transitions: [
                { name: 'connect', from: 'idle', to: 'connected' },
                { name: 'disconnect', from: 'connected', to: 'idle' }
            ],
            methods: {
                onIdle: () => console.log('Idle'),
                onConnected: () => console.log('Connected')
            }
        });
    });

    it('should transition to "connected" state when "connect" is called', () => {
        stateMachine.setState('idle');
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'idle');

        stateMachine.setState(stateMachine.nextState('connect'));
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'connected');
    });

    it('should transition to "idle" state when "disconnect" is called', () => {
        stateMachine.setState('connected');
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'connected');

        stateMachine.setState(stateMachine.nextState('disconnect'));
        stateMachine.run();

        assert.strictEqual(stateMachine.currentState, 'idle');
    });
}) 
