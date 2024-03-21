describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'emma',
      username: 'Matti',
      password: 'moimoi',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Matti')    
      cy.get('#password').type('moimoi')    
      cy.get('#login-button').click()
      cy.contains('emma logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('milla')
      cy.get('#password').type('mallikas')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'emma',
        username: 'Matti',
        password: 'moimoi',
      }
    })

    it('A blog can be created', function() {
      cy.get('#username').type('Matti')    
      cy.get('#password').type('moimoi')    
      cy.get('#login-button').click()
      cy.contains('create new blog').click()      
      cy.get('#title').type('kissa')
      cy.get('#author').type('koira')
      cy.get('#url').type('miau.fi')      
      cy.contains('save new blog').click()      
      cy.contains('kissa koira')   
    })
  })

  it('can be liked', function() {
    cy.get('#username').type('Matti')    
    cy.get('#password').type('moimoi')    
    cy.get('#login-button').click()
    cy.contains('emma logged in')
    cy.contains('create new blog').click()      
    cy.get('#title').type('kissa')
    cy.get('#author').type('koira')
    cy.get('#url').type('miau.fi')      
    cy.contains('save new blog').click()    
    cy.contains('view').click()
    cy.contains('likes 0')
    cy.contains('like').click()
    cy.contains('likes 1')
  })
  it('can be deleted', function() {
    cy.get('#username').type('Matti')    
    cy.get('#password').type('moimoi')    
    cy.get('#login-button').click()
    cy.contains('create new blog').click()      
    cy.get('#title').type('kissa')
    cy.get('#author').type('koira')
    cy.get('#url').type('miau.fi')      
    cy.contains('save new blog').click() 
    cy.contains('emma logged in')  
    cy.contains('view').click()
    cy.contains('delete').click()
    cy.get('body').should('not.contain', 'koira')

  })
  it('person who created can see delete', function() {
    cy.get('#username').type('Matti')    
    cy.get('#password').type('moimoi')    
    cy.get('#login-button').click()
    cy.contains('create new blog').click()      
    cy.get('#title').type('kissa2')
    cy.get('#author').type('koira2')
    cy.get('#url').type('miau2.fi')   
    cy.contains('save new blog').click()
    cy.contains('view').click()
    cy.contains('delete').click()
    cy.contains('blog kissa2 deleted')

  })

})



