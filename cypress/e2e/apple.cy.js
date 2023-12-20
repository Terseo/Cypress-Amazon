describe('Test Apple Page', () => {
  
    it('Validate Apple Page is Loaded', () => {
      cy.visit('https://www.apple.com/')
      cy.get('#globalnav-menubutton-link-bag').click()
      cy.contains('a', 'Sign in').click()
      getIframeDocument().find('.form-checkbox-indicator').click()
    })
})

export function getIframeDocument () {
    return cy
    .get('#aid-auth-widget-iFrame')
    .its('0.contentDocument').should('exist')
  }