class ContaFixaPage {

    acessarContasFixas() {
        cy.get('#root > div > div.topo > button.botao-menu', { timeout: 15000 })
            .should('be.visible')
            .click();

        cy.contains('Contas Fixas', { timeout: 15000 })
            .should('be.visible')
            .click();
    }

    selecionarTipo(tipo) {
        cy.contains('label', 'Tipo', { timeout: 10000 })
            .find('select')
            .should('be.visible')
            .select(tipo);
    }

    preencherValor(valor) {
        cy.contains('label', 'Valor (R$)', { timeout: 10000 })
            .find('input')
            .should('be.visible')
            .clear()
            .type(valor);
    }

    preencherVencimento(vencimento) {
        cy.contains('label', 'Dia do vencimento', { timeout: 10000 })
            .find('input')
            .should('be.visible')
            .clear()
            .type(vencimento);
    }

    preencherCategoria(categoria) {
        cy.contains('label', 'Categoria', { timeout: 10000 })
            .find('input')
            .should('be.visible')
            .clear()
            .type(categoria);
    }

    preencherDescricao(descricao) {
        cy.contains('label', 'Descrição', { timeout: 10000 })
            .find('input')
            .should('be.visible')
            .clear()
            .type(descricao);
    }

    clicarSalvar() {
        cy.contains('button', 'Salvar', { timeout: 10000 })
            .should('be.visible')
            .and('not.be.disabled')
            .click();
    }

    mensagemSucesso() {
        cy.get('.overlay-sucesso .modal-sucesso p', { timeout: 10000 })
            .should('be.visible')
            .then(($el) => {
                const texto = $el.text();
                cy.log('Mensagem exibida na tela: ' + texto);
                expect(texto.toLowerCase()).to.contain('sucesso');
            });

        return cy.get('.overlay-sucesso', { timeout: 10000 }).should('not.exist');
    }

    cadastrarConta(conta) {
        this.acessarContasFixas();
        this.selecionarTipo(conta.tipo);
        this.preencherValor(conta.valor);

        if (conta.vencimento) {
            this.preencherVencimento(conta.vencimento);
        }

        this.preencherCategoria(conta.categoria);

        if (conta.descricao) {
            this.preencherDescricao(conta.descricao);
        }

        this.clicarSalvar();
        this.mensagemSucesso();
    }

    validarDadosNaTabela(conta) {
        const tipoExibido = conta.tipo === 'entrada' ? 'Entrada' : 'Saída';
        const classeLinha = conta.tipo === 'entrada' ? '.linha-entrada' : '.linha-saida';
        const vencimentoExibido = conta.vencimento ? `Dia ${conta.vencimento}` : '';
        const normalizar = (str) => str.replace(/\D/g, '');

        cy.get(`.lista-transacoes table tbody tr${classeLinha}`)
            .last()
            .within(() => {
                cy.get('td').eq(0).should('contain.text', tipoExibido);
                cy.get('td').eq(1).should('contain.text', conta.categoria);

                cy.get('td').eq(3).invoke('text').then((textoCelula) => {
                    expect(normalizar(textoCelula)).to.equal(normalizar(conta.valor));
                });

                if (conta.vencimento) {
                    cy.get('td').eq(4).should('contain.text', vencimentoExibido);
                }

                if (conta.descricao) {
                    cy.get('td').eq(2).should('contain.text', conta.descricao);
                } else {
                    cy.get('td').eq(2).should('be.empty');
                }
            });
    }

    contarLinhasTabela() {
        cy.wait(2000); // pequena espera para garantir que a lista carregou
        return cy.get('body').then(($body) => {
            return $body.find('.lista-transacoes table tbody tr').length;
        });
    }

    validarQuantidadeLinhas(quantidadeEsperada) {
        return cy.get('body', { timeout: 10000 }).should(($body) => {
            const quantidade = $body.find('.lista-transacoes table tbody tr').length;
            expect(quantidade).to.equal(quantidadeEsperada);
        });
    }

}

export default ContaFixaPage;