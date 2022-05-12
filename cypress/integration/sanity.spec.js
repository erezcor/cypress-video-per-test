describe('test try', function () {
    it('should fail', function () {
        cy.get('baklawa')
    })

    it('should actually pass!', function () {
        cy.wait(2000)
        cy.get('div')
    })

    it('should fail again', function () {
        cy.wait(1000)
        cy.get('teriakysauce')
    });

    it("should remove bad characters !@#$%^<>?%*:|'\"<>&*()]|[`/\\_", function () {
        cy.wait(500)
        cy.get('thebad')
    })

    it('should be pending', function () {
        cy.skipOn(true)
    })

    it('should record all tries', {
        retries: 1
    }, function (){
        cy.wait(1000)
        cy.get('cookie')
    })
})