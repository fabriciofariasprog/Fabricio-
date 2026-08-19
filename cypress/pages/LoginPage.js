class LoginPage {

    preencherMatricula(matricula) {
        cy.get('input')
            .eq(0)
            .should('be.visible')
            .clear()
            .type(matricula);
    }

    preencherSenha(senha) {
        cy.get('input')
            .eq(1)
            .should('be.visible')
            .clear()
            .type(senha);
    }

    clicarEntrar() {
        cy.contains('button', 'Entrar')
            .should('be.visible')
            .click();
    }

    realizarLogin(matricula, senha) {
        this.preencherMatricula(matricula);
        this.preencherSenha(senha);
        this.clicarEntrar();
    }
}

export default LoginPage;