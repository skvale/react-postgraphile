import { Machine, assign } from 'xstate'

export interface LoginContext {
  email: string
  error: string
  firstName: string
  jwtToken: string
  lastName: string
  password: string
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
    error: '',
    firstName: '',
    jwtToken: '',
    lastName: '',
    password: ''
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
        onDone: {
          target: 'success',
          actions: assign({
            jwtToken: (_context: LoginContext, event: any) => {
              return event.data
            }
          })
        },
        onError: {
          target: 'login',
          actions: assign({
            error: (_context: LoginContext, event: any) => {
              if (event && event.data) {
                return event.data.message
              }
              return 'unknown error'
            }
          })
        }
      }
    },
    loading_register: {
      invoke: {
        src: 'onRegister',
        onDone: 'loading',
        onError: {
          target: 'login',
          actions: assign({
            error: (_context: LoginContext, event: any) => {
              if (event && event.data) {
                return event.data.message
              }
              return 'unknown error'
            }
          })
        }
      }
    },
    register: {
      on: {
        SUBMIT: 'loading_register',
        TOGGLE: 'login',
        ...emailAndPassword,
        FIRST_NAME: {
          actions: assign({
            firstName: (_context: any, e: any) => e.value
          })
        },
        LAST_NAME: {
          actions: assign({
            lastName: (_context: any, e: any) => e.value
          })
        }
      }
    },
    success: {
      entry: () => {
        window.location.href = '/'
      }
    }
  }
}

export const loginMachine = Machine(baseMachine)

export const registerMachine = Machine<LoginContext>({
  ...baseMachine,
  initial: 'register'
})
