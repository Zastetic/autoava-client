# AutoAVA ferramenta (bookmarklet) — instalação

> **Separado do site.** Este repositório é a **ferramenta** que roda na aba do AVA (bookmarklet).
> O **site** (login com RA, fila de jobs, painel) é outro produto, em `www.autoava.us`.
> A ferramenta nunca pede senha: ela lê a sessão já aberta na página.


**O que este repositório contém:** a interface da ferramenta — popup, saldo de pontos, detecção do RA
pela sessão e criação de checkout. Nenhuma automação roda aqui, nenhuma senha é pedida.

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
