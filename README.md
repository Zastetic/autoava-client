# AutoAVA ferramenta — instalação e uso

Ferramenta que roda **na aba da plataforma**, aproveitando a sessão que já está aberta ali.
Ela **nunca pede senha**: lê `M.cfg.sesskey` e o `MoodleSession` da própria página para identificar o
aluno (RA + nome), mostrar saldo de pontos, listar bimestres e abrir a cobrança Pix.

> **Não confundir com o site.** O site (`www.autoava.us`) é outro produto, com login próprio. Este
> repositório é só o cliente fino que roda dentro da plataforma.

Versão atual: **0.5.12-tipos** (o rodapé do popup mostra a versão em execução).

---

## 1. Instalar no Android (Chrome) — caminho mais comum

No Android o Chrome não tem extensões e não executa `javascript:` digitado na barra de endereço.
O que funciona é **favorito executado pela barra de endereço**.

1. Abra a página de instalação e toque em **Copiar código da ferramenta**.
   `https://www.autoava.us/instalar`
2. Abra **qualquer site** (pode ser a própria página de instalação) e toque na estrela ☆ para
   favoritar, ou use **⋮ → ☆ Favorito**.
3. Abra **⋮ → Favoritos**. A tela abre no **nível de pastas** (`Dispositivos móveis`,
   `Barra de favoritos`, `Outros favoritos`, `Lista de leitura`) — toque em **Dispositivos móveis**
   para entrar. O favorito novo fica **no fim** da lista.
4. Segure o favorito → **⋮ → Editar**.
   Atalho: com a página ainda aberta, **⋮ → o 3º ícone do topo vira “Editar favorito”** e abre o
   editor direto, sem passar pela pasta.
5. **Nome:** coloque algo curto e único, tipo `0ava`. Isso importa: o favorito é ranqueado baixo na
   barra de endereço e um nome comum (ex. “AutoAVA”) fica enterrado atrás das sugestões do Google.
6. **URL:** apague tudo que está lá e **cole o código** (começa com `javascript:`). Toque em ← para
   voltar — salva sozinho.
7. Confirme que o favorito ficou com a descrição começando em `javascript:(function()...`.

### Usar

1. Abra a plataforma **logada**, na página onde você quer a ferramenta.
2. Toque na **barra de endereço** e digite o nome do favorito (`0ava`).
3. Na lista de sugestões, toque na linha cujo subtítulo é **`/Dispositivos móveis`**.
   As outras linhas são buscas do Google e vão te levar para a busca, não para a ferramenta.
4. O popup `AUTOAVA ferramenta` aparece no canto superior direito.

---

## 2. Instalar no desktop (Chrome, Edge, Brave)

1. Abra `https://www.autoava.us/instalar`.
2. Mostre a barra de favoritos (`Ctrl` + `Shift` + `B`) e **arraste** o botão verde `AutoAVA` para ela.
   Se preferir, copie o código e crie o favorito manualmente colando no campo de URL.
3. Com a aba da plataforma aberta e logada, **clique no favorito**.

Diferença em relação ao Android: no desktop o favorito roda normalmente pelo clique; o problema da
barra de endereço é específico do Chrome Android.

---

## 3. Instalar no Firefox (desktop e Android) — userscript

Alternativa que sobrevive melhor a mudanças de layout e não depende da barra de favoritos:

1. Instale um gerenciador de userscripts: **Tampermonkey** ou **Violentmonkey**
   (no Firefox Android, ambos instalam pela loja de extensões do próprio Firefox).
2. Abra `https://www.autoava.us/autoava.user.js` e confirme **Instalar**.
3. Abra a plataforma logada: o popup aparece sozinho (o userscript carrega o `client.js` do domínio).

O arquivo `autoava.user.js` deste repositório é só um carregador — o código real vem sempre de
`www.autoava.us/ferramenta/client.js`, com fallback para o GitHub Pages.

---

## 4. O que o popup faz

- **Identificação**: RA (via `core_user_get_users_by_field`), nome, `userId` e a sessão (`sesskey`).
- **Saldo** de pontos e extrato.
- **Cursos → bimestres**: lista as trilhas do aluno e, dentro da trilha, os bimestres com
  progresso (%), nº de seções, pendências e custo. Dá para **selecionar bimestres** e escolher
  **Executar N** ou **Executar todos**.
  - Bimestres completos aparecem apagados e não podem ser marcados.
  - O componente de **introdução** (“Boas-vindas – …”, seções “Conheça o Componente” e
    “Mercado de Trabalho”) **não é atividade nem bimestre**: é ignorado na lista e na cobrança.
- **Comprar**: gera **Pix** e mostra o **QR Code** + **código copia-e-cola** dentro do próprio popup.
  Não abre página de pagamento, não pede login do Mercado Pago. O status é consultado a cada 4s e o
  saldo sobe sozinho quando o Pix é aprovado.
- **Minimizar** (–): vira um pill de uma linha (avatar, primeiro nome, pontos). **Fechar** (✕) pede
  confirmação e avisa que o job continua rodando no servidor.
- **Diag**: copia um JSON com versão, URL, RA, userId, saldo — útil para suporte.

Custo: **100 pontos por bimestre** (o pacote de 400 pontos = R$ 12,50).

---

## 5. Detalhes que dão errado (leia antes de abrir suporte)

| Sintoma | Causa | O que fazer |
|---|---|---|
| `sesskey: ausente` / “abra a plataforma logada” | popup aberto em outra aba, ou sessão expirada (8h) | abrir o favorito **na aba da plataforma**, logado |
| O favorito não aparece na barra de endereço | nome comum, enterrado pelas sugestões do Google | renomear para algo único (`0ava`, `zz`) |
| Nada acontece ao tocar o favorito | foi disparado pelo **menu de Favoritos** | disparar pela **barra de endereço** (só assim o Chrome mantém o contexto da página) |
| Colar `javascript:` na barra de endereço não roda | o Chrome remove o prefixo ao colar | o favorito é o único caminho no Android |
| O popup some ao recarregar a página | é esperado: o popup vive na página | disparar o favorito de novo; **o job continua no servidor** |
| “ferramenta desatualizada” | o servidor exige versão mínima | reinstalar o favorito com o código novo da página `/instalar` |
| Popup abre mas mostra tudo zerado | a página não é a plataforma (outro domínio) | abrir na aba da plataforma |
| `403 Origem não autorizada` | domínio da plataforma fora de `ALLOWED_ORIGINS` no servidor | ajustar a variável e reiniciar o serviço do site |
| Lista de cursos vazia | `core_enrol_get_users_courses` / `core_course_get_contents` respondem `servicenotavailable` nesse AVA | a ferramenta usa `block_dimensions_get_block_dataset` + `local_dimensions_get_course_progress` |
| Pix não aparece | Mercado Pago não configurado no servidor | conferir as chaves no `.env` do servidor |
| `execucao pela ferramenta em construcao` | `POST /api/pontos/job` ainda é stub no servidor | a execução automática pela ferramenta é a próxima fase |
| Saldo não atualiza depois de pagar | Pix ainda não aprovado | o popup consulta a cada 4s; se expirar, gerar outro Pix |

---

## 6. Atualização

O favorito **não** guarda o código: ele carrega `client.js?v=<versão>` do domínio. Corrigir no
servidor atualiza todo mundo sem reinstalar. Só quando o `?v=` muda é que clientes antigos em cache
passam a pegar a versão nova na hora.

Se a ferramenta avisar “desatualizada”, reinstale o favorito com o código atual da página
`/instalar` (o `?v=` do código é o que força o navegador a baixar a versão nova).

---

## 7. Arquivos

- `client.js` — o código do popup (é o que roda de verdade).
- `bookmarklet-bootstrap.txt` — o favorito de uma linha: só carrega o `client.js` do domínio.
- `bookmarklet.txt` — cópia do bootstrap usada pela página de instalação (não é mais um bundle).
- `install.html` — página de instalação (copiar/arrastar).
- `autoava.user.js` — userscript para Firefox/gerenciador de userscripts.

---

## 8. O que este repositório não faz

- Não executa automação: quem executa é o servidor.
- Não guarda senha, cookie ou token de aluno.
- Não versiona preço, copy de venda nem chaves — isso fica no servidor.
