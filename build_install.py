#!/usr/bin/env python3
"""Gera install.html a partir de client.js (bookmarklet) sem escapar HTML dentro do <script>."""
import json, pathlib, re

base = pathlib.Path(__file__).parent
code = (base / "bookmarklet.txt").read_text(encoding="utf-8").strip()
if not code.startswith("javascript:"):
    raise SystemExit("bookmarklet.txt deve comecar com javascript:")
# JSON seguro para dentro de <script>: escapa < para nao fechar a tag
payload = json.dumps(code).replace("<", "\\u003c")

page = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AutoAVA ferramenta - instalar</title>
<style>
:root{{color-scheme:dark}}
*{{box-sizing:border-box}}
body{{margin:0;background:#0b0e13;color:#e8ecf1;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}}
.wrap{{max-width:720px;margin:0 auto;padding:56px 24px 80px}}
.brand{{font-size:13px;font-weight:700;letter-spacing:.18em;color:#8ef0c8;margin-bottom:28px}}
h1{{font-size:32px;line-height:1.15;margin:0 0 12px;letter-spacing:-.02em}}
.sub{{color:#8c99a8;font-size:15px;line-height:1.6;margin:0 0 36px}}
.card{{background:#11151c;border:1px solid #232a35;border-radius:14px;padding:22px;margin-bottom:18px}}
h2{{font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#71808f;margin:0 0 14px}}
ol,ul{{margin:0;padding-left:20px;color:#c3ccd8;font-size:14.5px;line-height:1.9}}
kbd{{background:#1c242f;border:1px solid #2a3441;border-radius:5px;padding:1px 6px;font-size:12.5px;font-family:ui-monospace,Menlo,Consolas,monospace}}
.btn{{display:inline-flex;align-items:center;gap:10px;background:#3ad29f;color:#08130f;font-weight:700;
padding:12px 18px;border-radius:10px;text-decoration:none;font-size:14.5px;border:0;cursor:pointer}}
.btn.ghost{{background:#1c242f;color:#b9c6d4;font-weight:600}}
.row{{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:6px}}
.hint{{color:#6f7d8d;font-size:12.5px;margin-top:12px}}
pre{{background:#0a0e13;border:1px solid #1d242e;border-radius:10px;padding:12px;overflow:auto;
font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11.5px;color:#8fa0b3;max-height:150px}}
.warn{{border-left:3px solid #e0b341;background:#1a1710;padding:12px 14px;border-radius:0 8px 8px 0;
color:#cbb98a;font-size:13px;line-height:1.6}}
.err{{border-left:3px solid #e05555;background:#1a1010;padding:12px 14px;border-radius:0 8px 8px 0;
color:#e0a0a0;font-size:13px;line-height:1.6;margin-top:12px;display:none}}
</style></head>
<body><div class="wrap">
<div class="brand">AUTOAVA</div>
<h1>Instalar a ferramenta em 2 passos</h1>
<p class="sub">A ferramenta e separada do site: roda na sua aba do AVA, le a sessao que voce ja abriu e conversa com a API.
Nenhuma senha e digitada aqui.</p>

<div class="card">
  <h2>Passo 1 - mostrar a barra de favoritos</h2>
  <p class="sub" style="margin:0">No Chrome ou Edge, aperte <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>.
  A barra aparece embaixo da barra de endereco.</p>
</div>

<div class="card">
  <h2>Passo 2 - arrastar o botao para a barra</h2>
  <div class="row">
    <a id="bm" class="btn" href="#" draggable="true">AutoAVA</a>
    <button class="btn ghost" id="copy">Copiar codigo</button>
    <button class="btn ghost" id="demo">Testar aqui</button>
  </div>
  <p class="hint">Arraste o botao verde para a barra de favoritos. Se preferir, use "Copiar codigo",
  crie um favorito manual e cole no campo de URL.</p>
  <div class="err" id="err"></div>
</div>

<div class="card">
  <h2>Como usar</h2>
  <ol>
    <li>Abra a plataforma e faca o login normalmente.</li>
    <li>Clique no favorito <strong>AutoAVA</strong> que voce acabou de criar.</li>
    <li>O popup aparece no canto da tela: cole a chave e clique em executar.</li>
    <li><kbd>Esc</kbd> ou o X fecham o popup.</li>
  </ol>
  <p class="hint">"Testar aqui" mostra o popup nesta propria pagina (sem sessao, o status fica amarelo).</p>
</div>

<div class="card">
  <h2>Se nao funcionar</h2>
  <div class="warn">O favorito precisa ser clicado <strong>na pagina da plataforma</strong>, com a sessao
  aberta. Se o favorito nao fizer nada, apague e arraste de novo: favorito criado com codigo quebrado
  continua quebrado.</div>
</div>

<div class="card">
  <h2>Codigo (transparencia)</h2>
  <p class="hint" style="margin:0 0 10px">Tudo que o cliente faz esta abaixo. Nada de senha, nada de tecla
  registrada.</p>
  <pre id="src"></pre>
</div>

</div>
<script>
window.__BM = {payload};
</script>
<script>
(function(){{
  var code = window.__BM;
  var a = document.getElementById('bm');
  var err = document.getElementById('err');
  a.href = code;
  document.getElementById('src').textContent = code.slice(0, 1200) + (code.length > 1200 ? ' ...' : '');
  try {{
    new Function(code.replace(/^javascript:/, ''));
  }} catch (e) {{
    err.style.display = 'block';
    err.textContent = 'O codigo do favorito nao compila: ' + e.message;
  }}
  document.getElementById('copy').addEventListener('click', function(){{
    navigator.clipboard.writeText(code).then(function(){{
      document.getElementById('copy').textContent = 'Copiado';
      setTimeout(function(){{ document.getElementById('copy').textContent = 'Copiar codigo'; }}, 1600);
    }});
  }});
  document.getElementById('demo').addEventListener('click', function(){{
    try {{ (0, eval)(code.replace(/^javascript:/, '')); }}
    catch (e) {{ alert('erro: ' + e.message); }}
  }});
}})();
</script>
</body></html>
"""
(base / "install.html").write_text(page, encoding="utf-8")
print("install.html gerado:", len(page), "bytes; bookmarklet:", len(code))
