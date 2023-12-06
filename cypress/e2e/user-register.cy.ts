describe('User Register', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the registro page and register account', () => {
    cy.get('a[href^="/register"]').click()

    cy.get('form').should('exist')
    cy.get('label:contains("Nome")').next('input').type('John Doe')
    cy.get('label:contains("E-mail")')
      .next('input')
      .type('jhondoe@email.com.br')
    cy.contains('label', 'Senha').next('div').find('input').type('123456')
    cy.contains('Enviar').click()
    cy.location('pathname').should('equal', '/')
  })

  it('should not be possible to register an account with an email already used', () => {
    cy.get('a[href^="/register"]').click()

    cy.get('form').should('exist')
    cy.get('label:contains("Nome")').next('input').type('John Doe')
    cy.get('label:contains("E-mail")')
      .next('input')
      .type('jhondoe@email.com.br')
    cy.contains('label', 'Senha').next('div').find('input').type('123456')
    cy.contains('Enviar').click()
    cy.contains('E-mail já cadastrado.').should('exist')
  })
})
