describe('Bloglist app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'Tim Tester', username: 'testuser', password: 'testpassword' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Tim Tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Tim Tester logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('a test blog')
      cy.get('#author-input').type('cypress123')
      cy.get('#url-input').type('wwww..')
      cy.get('#create-button').click()
      cy.contains('cypress123')
    })

    describe('There is a created blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'a test blog', author: 'cypress123', url: 'www..' })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be removed', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog').should('not.exist')
      })

      it('A blog cant be removed by other users ', function() {
        cy.createUser({ name: 'Other Tester', username: 'testuser2', password: 'testpassword2' })
        cy.login({ username: 'testuser2', password: 'testpassword2' })

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('Blogs are shown ordered by likes', function() {
        cy.createBlog({ title: 'b test blog', author: 'cypress123', url: 'www..' })
        cy.contains('b test blog cypress123')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('hide').click()
        cy.get('.blog').eq(0).should('contain', 'b test blog')
        cy.get('.blog').eq(1).should('contain', 'a test blog')
        cy.contains('a test blog cypress123')
          .contains('view')
          .click()
        cy.contains('like').click().click()
        cy.get('.blog').eq(0).should('contain', 'a test blog')
        cy.get('.blog').eq(1).should('contain', 'b test blog')
      })
    })
  })
})