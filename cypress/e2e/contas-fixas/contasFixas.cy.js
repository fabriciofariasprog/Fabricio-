import LoginPage from '../../pages/LoginPage';
import ContaFixaPage from '../../pages/ContaFixaPage';

describe('KAN-7 - Contas Fixas', () => {

    const loginPage = new LoginPage();
    const contaFixaPage = new ContaFixaPage();

    beforeEach(() => {
        cy.visit('https://barbosa-tech-financ.vercel.app/');

        cy.fixture('Login').then((login) => {
           loginPage.realizarLogin(login.matricula, login.senha);
        });
   });

    it('CT001 - Deve cadastrar uma conta fixa sem descrição com sucesso', () => {
        cy.fixture('contaFixa').then((dados) => {
            contaFixaPage.cadastrarConta(dados.contaSemDescricao);
       });
    });

    it('CT002 - Deve cadastrar uma conta fixa com descrição com sucesso', () => {
        cy.fixture('contaFixa').then((dados) => {
           contaFixaPage.cadastrarConta(dados.contaComDescricao);
      });
   });

    it('CT003 - Deve exibir os dados corretamente na tabela após o cadastro', () => {
        cy.fixture('contaFixa').then((dados) => {
            contaFixaPage.cadastrarConta(dados.contaSemDescricao);
         contaFixaPage.validarDadosNaTabela(dados.contaSemDescricao);
       });
    });

    it('CT004 - Deve exibir a descrição informada na tabela', () => {
        cy.fixture('contaFixa').then((dados) => {
            contaFixaPage.cadastrarConta(dados.contaComDescricao);
            contaFixaPage.validarDadosNaTabela(dados.contaComDescricao);
        });
    });

    it('CT005 - Deve exibir o tipo Entrada corretamente na tabela', () => {
        cy.fixture('contaFixa').then((dados) => {
           contaFixaPage.cadastrarConta(dados.contaSemDescricao);
           contaFixaPage.validarDadosNaTabela(dados.contaSemDescricao);
       });
    });

    it('CT006 - Deve exibir o tipo Saída corretamente na tabela', () => {
        cy.fixture('contaFixa').then((dados) => {
            contaFixaPage.cadastrarConta(dados.contaComDescricao);
            contaFixaPage.validarDadosNaTabela(dados.contaComDescricao);
        });
    });
    it('CT007 - Não deve criar lançamento duplicado ao tentar salvar a mesma conta em sequência rápida', () => {
        cy.fixture('contaFixa').then((dados) => {
            contaFixaPage.acessarContasFixas();
            contaFixaPage.selecionarTipo(dados.contaSemDescricao.tipo);
            contaFixaPage.preencherValor(dados.contaSemDescricao.valor);
            contaFixaPage.preencherVencimento(dados.contaSemDescricao.vencimento);
            contaFixaPage.preencherCategoria(dados.contaSemDescricao.categoria);

            contaFixaPage.contarLinhasTabela().then((totalAntes) => {
                cy.contains('button', 'Salvar').click();

            cy.contains('button', 'Salvar').should('be.disabled');

                contaFixaPage.validarQuantidadeLinhas(totalAntes + 1);
            });
       });
    });
          it('CT008 - Sistema permite lançamentos idênticos após intervalo de tempo suficiente', () => {
        const contaUnica = {
            tipo: 'entrada',
            valor: '33,00',
            vencimento: '15',
            categoria: `TesteIntervalo-${Date.now()}`
        };

        contaFixaPage.acessarContasFixas();

        contaFixaPage.contarLinhasTabela().then((totalAntes) => {
            contaFixaPage.cadastrarConta(contaUnica);

            cy.wait(3000);

            contaFixaPage.cadastrarConta(contaUnica);
            contaFixaPage.validarQuantidadeLinhas(totalAntes + 2);
        });
    });


        it('CT009 - Não deve permitir cadastrar a mesma conta fixa em sequência rápida', () => {
        cy.intercept('POST', '**/contas-fixas').as('cadastroContaFixa');

        cy.fixture('contaFixa').then((dados) => {
            contaFixaPage.acessarContasFixas();

            contaFixaPage.contarLinhasTabela().then((totalAntes) => {
               contaFixaPage.selecionarTipo(dados.contaDuplicidade.tipo);
               contaFixaPage.preencherValor(dados.contaDuplicidade.valor);
                contaFixaPage.preencherVencimento(dados.contaDuplicidade.vencimento);
                contaFixaPage.preencherCategoria(dados.contaDuplicidade.categoria);
                contaFixaPage.clicarSalvar();

                cy.wait('@cadastroContaFixa').its('response.statusCode').should('eq', 200);

                contaFixaPage.mensagemSucesso();

                contaFixaPage.acessarContasFixas();
                contaFixaPage.selecionarTipo(dados.contaDuplicidade.tipo);
                contaFixaPage.preencherValor(dados.contaDuplicidade.valor);
                contaFixaPage.preencherVencimento(dados.contaDuplicidade.vencimento);
                contaFixaPage.preencherCategoria(dados.contaDuplicidade.categoria);
                contaFixaPage.clicarSalvar();
                cy.wait('@cadastroContaFixa').its('response.statusCode').should('eq', 409);

                contaFixaPage.validarQuantidadeLinhas(totalAntes + 1);
            });
        });
    });
});