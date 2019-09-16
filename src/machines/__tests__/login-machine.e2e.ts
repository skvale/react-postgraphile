import { createModel } from '@xstate/test'
import { loginMachine } from '../login-machine'

const loginModel = createModel(loginMachine).withEvents({
  EMAIL: {
    exec: async (page: any) => {
      await page.type('[data-testid="login-email"]', 'foo@bar.com')
    }
  },
  FIRST_NAME: {
    exec: async (page: any) => {
      await page.type('[data-testid="login-first-name"]', 'nn')
    }
  },
  LAST_NAME: {
    exec: async (page: any) => {
      await page.type('[data-testid="login-last-name"]', 'b')
    }
  },
  PASSWORD: {
    exec: async (page: any) => {
      await page.type('[data-testid="login-password"]', 'barbare')
    }
  },
  TOGGLE: {
    exec: async (page: any) => {
      await page.click('[data-testid="toggle-link"]')
    }
  },
  SUBMIT: {
    exec: async (page: any) => {
      await page.click('[data-testid="login-submit-button"]')
    }
  },
  'done.invoke.onLogin': (c: any, e: any) => Promise.resolve({ data: 'res' }),
  'done.invoke.onRegister': (c: any, e: any) => Promise.resolve(),
  'error.platform.onRegister': (c: any, e: any) =>
    Promise.resolve(Error('bad error')),
  'error.platform.onLogin': (c: any, e: any) =>
    Promise.resolve(Error('bad error'))
})

describe('toggle', () => {
  const testPlans = loginModel.getShortestPathPlans()
  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          console.log(path.description)
          // do any setup, then...
          // @ts-ignore
          await page.goto('http://localhost:3000')
          // @ts-ignore
          await page.click('[data-testid="signin-link"]')
          // @ts-ignore
          await path.test(page)
        })
      })
    })
  })

  it('should have full coverage', () => {
    return loginModel.testCoverage()
  })
})
