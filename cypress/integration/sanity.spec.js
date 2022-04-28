describe('test try', function () {
    beforeEach(() => {
        cy.wait(1000)
    })

    it('should fail', function () {
        cy.get('baklawa')
    })

    it('should actually pass!', function () {
        cy.wait(2000)
    },

    it('should fail again', function () {
        cy.get('teriakysauce')
    }));

    it("should remove bad characters !@#$%^<>?%*:|'\"<>&*()]|[`/\\_", function () {
        cy.get('thebad')
    })

    it('should skip', function () {
        cy.skipOn('electron')
    })

    it('should record all tries', function () {
        Cypress.config('retries', 3)
        cy.get('cookie')
    })

    afterEach(() => {
        cy.wait(1000)
    })
})