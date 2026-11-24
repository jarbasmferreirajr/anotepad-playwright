# Entrega trabalho TEST DAS 2025: automação no anotepad

Automação em Node.js com Playwright feita para a disciplina TEST – Testes Automatizados da Especialização em Desenvolvimento Ágil de Software da UFPR.

O teste abre o https://pt.anotepad.com e preenche:

- **Título:** `Entrega trabalho TEST DAS 2024`
- **Corpo:** nome e matrícula do aluno

Depois confere se os valores ficaram nos campos, destaca o campo de conteúdo (borda vermelha e fundo amarelo) e salva o print em `evidencias/anotepad-preenchido.png`.

## Tecnologias

Node.js, Playwright Test e Chromium.

## Arquivos

| Arquivo | Função |
|---|---|
| `package.json` | dependências e scripts |
| `playwright.config.js` | configuração do Playwright (URL base, navegador, viewport, relatório) |
| `tests/anotepad.spec.js` | o teste/automação |

## Como executar

Requisito: Node.js 18 ou superior.

```bash
npm install
npm run setup          # baixa o Chromium do Playwright
```

O nome e a matrícula não ficam no código. Eles são lidos das variáveis de ambiente `ALUNO_NOME` e `ALUNO_MATRICULA`, que precisam ser definidas antes de rodar.

No PowerShell:

```powershell
$env:ALUNO_NOME = "Seu Nome"
$env:ALUNO_MATRICULA = "123456"
npm test               # roda sem abrir janela
npm run test:headed    # roda com o navegador visível
```

No Bash:

```bash
ALUNO_NOME="Seu Nome" ALUNO_MATRICULA="123456" npm test
```

O print é gerado em `evidencias/anotepad-preenchido.png` e também aparece anexado no relatório (`npm run report`). A pasta `evidencias/` não é versionada, porque o print contém os dados pessoais.

Como o teste acessa um site externo, ele depende de o anotepad estar no ar e de manter os mesmos campos (`#edit_title` e `#edit_textarea`).

## Autor

Jarbas de M. Ferreira Jr.
