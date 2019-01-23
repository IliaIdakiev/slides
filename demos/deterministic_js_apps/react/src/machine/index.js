import React from 'react';
import { service } from './service';

const MachineContext = React.createContext();

export class Machine extends React.Component {
  state = {
    machineState: null
  };

  devTools = null;

  constructor(props) {
    super(props);

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name: 'Machine',
      });
    }

    this.state = {
      machineState: service.initialState,
      transition: (type, data) => {
        this.interpreter.send({ type, data });
      }
    };

    if (this.devTools) {
      this.devTools.init(this.state.machineState.context);

      // this.unsubscribe = this.devTools.subscribe(message => {
      //   if (
      //     message.type === REDUX_DISPATCH &&
      //     message.payload.type === REDUX_JUMP_TO_ACTION
      //   ) {
      //     this.jumpToAction = true
      //     this.setState(JSON.parse(message.state))
      //   }
      // })
    }

    this.interpreter = service.onTransition((state, action) => {
      const newMachineState = state;
      if (this.state.machineState.value !== newMachineState.value) {
        console.log(newMachineState);
        this.setState({ machineState: newMachineState });
        if (this.devTools) {
          this.devTools.send(action, newMachineState.context);
        }
      }
    }).start();
  }
  render() {
    return (
      <MachineContext.Provider value={this.state}>
        {this.props.children}
      </MachineContext.Provider>
    );
  }
}

export function connectMachine(Cmp) {
  return function (props) {
    return <MachineContext.Consumer>
      {
        (context) => <Cmp {...props} {...context} />
      }
    </MachineContext.Consumer>
  }
}
