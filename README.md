# AutoAVA — cliente (teste de instalação)

Cliente de teste para validar o fluxo de instalação por favorito (bookmarklet) e o popup na página.

**O que este repositório contém:** apenas a interface do cliente — popup, campo de chave e leitura da
sessão já aberta na página. Nenhuma automação, nenhuma senha, nenhuma chamada de execução.

## Instalar (2 passos)

1. Abra a página de instalação:
   `https://zastetic.github.io/autoava-client/install.html`
2. Mostre a barra de favoritos (`Ctrl` + `Shift` + `B`) e **arraste** o botão verde `AutoAVA` para ela.

## Usar

1. Abra a plataforma e faça login normalmente.
2. Clique no favorito `AutoAVA`.
3. O popup aparece no canto superior direito: cole a chave e clique em executar.
4. `Esc` ou o `X` fecham o popup.

## Alternativa manual

Se não conseguir arrastar: copie o conteúdo de `bookmarklet.txt` e crie um favorito manual, colando o
código no campo de URL (precisa começar com `javascript:`).

## Arquivos

- `install.html` — página de instalação (arrastar/copiar).
- `client.js` — código legível do popup.
- `bookmarklet.txt` — a versão de uma linha usada pelo favorito.

## Limites do teste

- Não funciona no celular (Chrome Android não executa favorito `javascript:`).
- Precisa ser clicado na página da plataforma, com sessão aberta.
- Se a página recarregar, o popup some; basta clicar no favorito de novo.

Versão 0.1.0-teste.
