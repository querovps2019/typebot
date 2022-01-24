import { createTypebotWithStep } from 'cypress/plugins/data'
import { getIframeBody } from 'cypress/support'
import { InputStepType } from 'models'

describe('Email input', () => {
  beforeEach(() => {
    cy.task('seed')
    createTypebotWithStep({ type: InputStepType.EMAIL })
    cy.signOut()
  })

  it('options should work', () => {
    cy.signIn('test2@gmail.com')
    cy.visit('/typebots/typebot3/edit')
    cy.findByRole('button', { name: 'Preview' }).click()
    getIframeBody()
      .findByPlaceholderText('Type your email...')
      .should('have.attr', 'type')
      .should('equal', 'email')
    getIframeBody().findByRole('button', { name: 'Send' })
    getIframeBody().findByPlaceholderText('Type your email...').should('exist')
    getIframeBody().findByRole('button', { name: 'Send' }).should('be.disabled')
    cy.findByTestId('step-step1').click({ force: true })
    cy.findByRole('textbox', { name: 'Placeholder:' })
      .clear()
      .type('Your email...')
    cy.findByRole('textbox', { name: 'Button label:' }).clear().type('Go')
    cy.findByTestId('step-step1').should('contain.text', 'Your email...')
    cy.findByRole('button', { name: 'Restart' }).click()
    getIframeBody().findByPlaceholderText('Your email...').should('exist')
    getIframeBody().findByRole('button', { name: 'Go' })
  })
})