describe('Test Amazon Page', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com/')
  });

  it('Validate Amazon page is loaded', () => {
    cy.url().should('contains', 'amazon')
  })
  it('Validate Amazon page contain top menu', () => {
    cy.get('[id="nav-xshop"]').within(() => {
      cy.get('a').should('have.length', 6)
    })
  })
  it('Validate Search Bar and Icon is displayed', () => {
    cy.get('[id="twotabsearchtextbox"]').should('be.visible')
    cy.get('[id="nav-search-submit-button"]').should('be.visible')
  })
  it('Search an Apple Watch', () => {
    cy.get('[id="twotabsearchtextbox"]').should('be.visible')
    cy.get('[id="twotabsearchtextbox"]').clear().type('Apple Watch')
    cy.get('[id="nav-search-submit-button"]').should('be.visible').click()
    cy.get('[data-component-type="s-search-result"]').should('have.length.greaterThan', 2)
  })
  it('Open Page Details', () => {
    cy.get('[id="twotabsearchtextbox"]').should('be.visible')
    cy.get('[id="twotabsearchtextbox"]').clear().type('Apple Watch')
    cy.get('[id="nav-search-submit-button"]').should('be.visible').click()

    cy.get('[data-component-type="s-search-result"]').eq(0).should('be.visible').click()
    cy.url().should('contains', 'Apple+Watch')
  })
  it('Storage Price and Is not NULL', () => {
    cy.get('[id="twotabsearchtextbox"]').clear().type('Apple Watch')
    cy.get('[id="nav-search-submit-button"]').should('be.visible').click()
    cy.get('[id="nav-xshop"]').within(() => {
      cy.contains('a', 'Today\'s Deals').click()
    })
    cy.get('[id="twotabsearchtextbox"]').clear().type('Apple Watch')
    cy.get('[id="nav-search-submit-button"]').should('be.visible').click()
    cy.get('[data-cy="title-recipe"]').eq(0).should('be.visible').click()
    cy.wait(10000)
    cy.get('[data-a-color]').within(() => {
    cy.get('[class="a-offscreen"]').invoke('text').then((text) => {
        cy.log('Apple Watch Price: ' + text)
        expect(text).to.not.be.empty
      })
      
    })
  })
  it('Add one Item Into the cart and Cart Details', () => {
    cy.get('[id="twotabsearchtextbox"]').clear().type('Apple Watch')
    cy.get('[id="nav-search-submit-button"]').should('be.visible').click()
    cy.get('[id="nav-xshop"]').within(() => {
      cy.contains('a', 'Today\'s Deals').click()
    })
    cy.get('[id="twotabsearchtextbox"]').clear().type('Apple Watch')
    cy.get('[id="nav-search-submit-button"]').should('be.visible').click()
    cy.get('[data-cy="title-recipe"]').eq(0).should('be.visible').click()
    cy.wait(10000)
    cy.get('[id="size_name_0"]').click()
    cy.wait(3000)
    cy.get('[id="add-to-cart-button"]').click()
    cy.get('[id="nav-cart-count-container"]').click()
    cy.get('[id="sc-subtotal-label-buybox"]').should('contain', 'Subtotal (1 item):')
  })
})