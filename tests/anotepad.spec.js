// @ts-check
const { test, expect } = require('@playwright/test');

// Dados da entrega: lidos de variáveis de ambiente para não expor dados pessoais no repositório
const NOME = process.env.ALUNO_NOME;
const MATRICULA = process.env.ALUNO_MATRICULA;

if (!NOME || !MATRICULA) {
  throw new Error('Defina ALUNO_NOME e ALUNO_MATRICULA antes de rodar o teste (veja o README).');
}

const TITULO = 'Entrega trabalho TEST DAS 2024';

const CORPO = `Nome: ${NOME}\nMatrícula: ${MATRICULA}`;
const CAMINHO_PRINT = 'evidencias/anotepad-preenchido.png';

/**
 * Destaca visualmente um elemento da página (borda vermelha + fundo amarelo),
 * para que o campo manipulado pela automação apareça no print.
 * @param {import('@playwright/test').Locator} locator
 */
async function destacar(locator) {
  await locator.evaluate((el) => {
    el.style.outline = '4px solid #e00000';
    el.style.outlineOffset = '2px';
    el.style.backgroundColor = '#fff59d';
    el.style.boxShadow = '0 0 12px 4px rgba(224, 0, 0, 0.6)';
  });
}

test('preenche a nota no anotepad com nome e matrícula', async ({ page }) => {
  // 1. Abre o anotepad
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const campoTitulo = page.locator('#edit_title');
  const campoConteudo = page.locator('#edit_textarea');

  await expect(campoTitulo).toBeVisible();
  await expect(campoConteudo).toBeVisible();

  // 2. Preenche o título
  await campoTitulo.click();
  await campoTitulo.fill(TITULO);

  // 3. Preenche o corpo com nome e matrícula
  await campoConteudo.click();
  await campoConteudo.fill(CORPO);

  // 4. Confere se os valores ficaram nos campos
  await expect(campoTitulo).toHaveValue(TITULO);
  await expect(campoConteudo).toHaveValue(CORPO);

  // 5. Destaca o campo de conteúdo (nome e matrícula)
  await destacar(campoConteudo);

  // 6. Tira o print da página preenchida
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: CAMINHO_PRINT });

  // Anexa o print também ao relatório HTML do Playwright
  await test.info().attach('anotepad-preenchido', {
    path: CAMINHO_PRINT,
    contentType: 'image/png',
  });
});
