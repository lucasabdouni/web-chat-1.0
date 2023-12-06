describe('User Send Message', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should must be possible to log in with an existing account', () => {
    cy.get('form').should('exist')
    cy.get('label:contains("E-mail")')
      .next('input')
      .type('jhondoe@email.com.br')
    cy.contains('label', 'Senha').next('div').find('input').type('123456')
    cy.contains('Entrar').click()
    cy.location('pathname').should('equal', '/home')
    cy.get('textarea[name="message"]').type('Hello Cypress')
    cy.get('button[type="submit"]').click()
    cy.contains('Hello Cypress.').should('exist')
  })
})
