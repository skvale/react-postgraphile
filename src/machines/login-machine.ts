import { Machine, assign, send } from 'xstate'

interface LoginContext {
  email: string
  password: string
  firstName: string
  lastName: string
}

const emailAndPassword = {
  EMAIL: {
    actions: assign({
      email: (_: any, e: any) => e.value
    })
  },
  PASSWORD: {
    actions: assign({
      password: (_: any, e: any) => e.value
    })
  }
}

export const baseMachine = {
  id: 'login',
  initial: 'login',
  context: {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  },
  states: {
    login: {
      on: {
        TOGGLE: 'register',
        SUBMIT: 'loading',
        ...emailAndPassword
      }
    },
    loading: {
      invoke: {
        src: 'onLogin',
        onDone: 'success',
        onError: 'failure'
      }
    },
    loading_register: {
      invoke: {
        src: 'onRegister',
        onDone: 'loading',
        onError: 'failure'
      }
    },
    register: {
      on: {
        SUBMIT: 'loading_register',
        TOGGLE: 'login',
        ...emailAndPassword,
        FIRST_NAME: {
          actions: assign({
            firstName: (_: any, e: any) => e.value
          })
        },
        LAST_NAME: {
          actions: assign({
            lastName: (_: any, e: any) => e.value
          })
        }
      }
    },
    success: {},
    failure: {}
  }
}

export const loginMachine = Machine<LoginContext>(baseMachine)

export const registerMachine = Machine<LoginContext>(
  {
    ...baseMachine,
    initial: 'register'
  }
)
