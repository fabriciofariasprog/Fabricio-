const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://barbosa-tech-financ.pages.dev',
    retries: {
      runMode: 2,   // tenta até 2 vezes extras quando rodar via linha de comando (CI)
      openMode: 1   // tenta até 1 vez extra quando rodar no modo interativo (cypress open)
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-features=Translate');
          launchOptions.preferences.default = launchOptions.preferences.default || {};
          launchOptions.preferences.default.translate = { enabled: false };
        }
        return launchOptions;
      });
    }
  }
});