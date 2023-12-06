describe('User Login', () => {
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
  })

  it('should not be possible to log in with an not existing account', () => {
    cy.get('form').should('exist')
    cy.get('label:contains("E-mail")')
      .next('input')
      .type('jhondoe@email.com.br')
    cy.contains('label', 'Senha').next('div').find('input').type('122321')
    cy.contains('Entrar').click()
    cy.contains('Verifique os dados informados.').should('exist')
  })
})
