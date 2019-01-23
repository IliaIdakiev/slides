import { Machine, actions } from 'xstate';
import { interpret } from 'xstate/lib/interpreter'
import userService from '../User/user-service';
const { assign } = actions;

export const states = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  COMPLETED: 'COMPLETED',
  READY: 'READY',
  FAILED: 'FAILED'
};

export const listStates = {
  READY: 'LIST_READY',
  LOADING: 'LIST_LOADING',
  FAILED: 'LIST_FAILED'
}

export const entityStates = {
  READY: 'ENTITY_READY',
  LOADING: 'ENTITY_LOADING',
  FAILED: 'ENTITY_FAILED'
}

export const action = {
  LOAD: 'LOAD',
  READY: 'READY',
  ERROR: 'ERROR',
  RELOAD: 'RELOAD'
};

const initialContext = {
  userList: null,
  userEntity: null,
  errorMessage: null
};

const machine = Machine({
  initial: states.INITIAL,
  context: initialContext,
  states: {
    [states.INITIAL]: {
      onEntry: assign(initialContext),
      on: {
        [action.LOAD]: states.LOADING
      }
    },
    [states.LOADING]: {
      type: 'parallel',
      states: {
        list: {
          type: 'compound',
          initial: listStates.READY,
          states: {
            [listStates.LOADING]: {
              invoke: {
                id: 'getUsers',
                src: (ctx, event) => userService.getUsers(),
                onDone: {
                  target: listStates.READY,
                  actions: 'setUserList'
                },
                onError: {
                  target: listStates.FAILED,
                  actions: 'setError'
                }
              },
            },
            [listStates.READY]: {
              type: 'final',
              on: {
                [`list.${action.LOAD}`]: listStates.LOADING
              }
            },
            [listStates.FAILED]: {
              type: 'final'
            }
          }
        },
        entity: {
          type: 'compound',
          initial: entityStates.READY,
          states: {
            [entityStates.LOADING]: {
              invoke: {
                id: 'getUser',
                src: (ctx, { data }) => userService.getUser(data),
                onDone: {
                  target: entityStates.READY,
                  actions: 'setUserEntity'
                },
                onError: {
                  target: entityStates.FAILED,
                  actions: 'setError'
                }
              },
            },
            [entityStates.READY]: {
              type: 'final',
              on: {
                [`entity.${action.LOAD}`]: entityStates.LOADING
              }
            },
            [states.FAILED]: {
              type: 'final'
            }
          }
        },
      },
      onDone: {
        cond: ctx => ctx.errorMessage || ctx.userList || ctx.userEntity,
        target: states.COMPLETED
      }
    },
    [states.COMPLETED]: {
      on: {
        '': [
          {
            target: states.FAILED,
            cond: ctx => !!ctx.errorMessage
          },
          { target: states.READY }
        ]
      }
    },
    [states.READY]: {
      on: {
        [action.RELOAD]: states.INITIAL,
        [action.LOAD]: states.LOADING
      },
      onExit: assign((ctx, { type }) => {
        if (type === action.LOAD) {
          return { ...initialContext };
        }
        return ctx;
      })
    },
    [states.FAILED]: {
      on: {
        [action.RELOAD]: states.INITIAL,
        [action.LOAD]: states.LOADING
      }
    }
  }
}, {
    actions: {
      setUserList: assign({
        userList: (ctx, { data: users }) => users
      }),
      setUserEntity: assign({
        userEntity: (ctx, { data: user }) => user
      }),
      setError: assign({
        errorMessage: (ctx, { data: error }) => error.message
      })
    },
  });

export const service = interpret(machine);
