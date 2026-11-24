(function () {
  var EXISTING = window.__autoava;
  if (EXISTING) { EXISTING.close(); return; }
  var KEY_API = 'autoava:api';
  var DEFAULT_API = 'https://www.autoava.us';
  var VERSION = '0.5.13-sessao';
  var CUSTO_SEMANA = 14;
  var PONTOS_BIMESTRE = 100;

  var host = document.createElement('div');
  host.id = 'autoava-root';
  var shadow = host.attachShadow({ mode: 'open' });

  var css = [
    "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap');",
    ':host{all:initial}',
    '.wrap{position:fixed;top:22px;right:22px;width:352px;z-index:2147483000;',
    'font-family:"DM Sans","Segoe UI",Arial,sans-serif;color:#1d2234;background:#fbfaf5;',
    'border:1.5px solid #1d2234;border-radius:16px;box-shadow:7px 7px 0 #f15a43;overflow:hidden;',
    'user-select:none;font-size:13px;line-height:1.45;transform-origin:top right}',
    '.bar{display:flex;align-items:center;gap:8px;padding:11px 13px;background:#2d3ce8;cursor:move}',
    '.brand{flex:1 1 auto;min-width:0;font-family:"Space Grotesk",Arial,sans-serif;font-size:13px;',
    'font-weight:700;letter-spacing:.16em;color:#f5f2e9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.brand i{color:#d6ee58;font-style:normal}',
    '.badge{flex:0 0 auto;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;',
    'padding:3px 7px;border-radius:999px;background:#f15a43;color:#fff;border:1px solid #1d2234}',
    '.badge.on{background:#d6ee58;color:#1d2234}',
    '.x{flex:0 0 auto;width:22px;height:22px;border:1.5px solid #f5f2e9;border-radius:6px;background:transparent;',
    'color:#f5f2e9;cursor:pointer;font-size:14px;line-height:1}',
    '.x:hover{background:#f5f2e9;color:#2d3ce8}',
    '.notice{display:none;padding:8px 13px;font-size:11.5px;line-height:1.45;background:#fdf0ec;color:#b9432d;',
    'border-bottom:1.5px solid #1d2234}',
    '.notice a{color:#2d3ce8;font-weight:600}',
    '.body{padding:12px 13px 13px}',
    '.user{display:flex;gap:10px;align-items:center;padding:9px 10px;border:1.5px solid #1d2234;border-radius:11px;',
    'background:#f5f2e9;margin-bottom:10px}',
    '.av{width:34px;height:34px;flex:0 0 34px;border-radius:9px;background:#2d3ce8;color:#f5f2e9;display:flex;',
    'align-items:center;justify-content:center;font-family:"Space Grotesk",Arial,sans-serif;font-weight:700;font-size:12px}',
    '.un{font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:214px}',
    '.us{font-size:11px;color:#7c8598;margin-top:1px}',
    '.saldo{display:flex;align-items:baseline;gap:7px;padding:10px 12px;border:1.5px solid #1d2234;border-radius:11px;',
    'background:#d6ee58;margin-bottom:10px}',
    '.saldo b{font-family:"Space Grotesk",Arial,sans-serif;font-size:24px;font-weight:700;letter-spacing:-.03em}',
    '.saldo span{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}',
    '.saldo .eq{margin-left:auto;font-size:10.5px;font-weight:600;text-align:right;max-width:120px}',
    '.grid{border:1.5px solid #1d2234;border-radius:11px;overflow:hidden;margin-bottom:10px;background:#fbfaf5}',
    '.gr{display:flex;justify-content:space-between;gap:8px;padding:6px 10px;font-size:11.5px;border-bottom:1px solid #e2e0d6}',
    '.gr:last-child{border-bottom:0}',
    '.gk{color:#7c8598}.gv{color:#1d2234;font-family:ui-monospace,Consolas,monospace;text-align:right;',
    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:198px}',
    '.gv.ok{color:#126a49;font-weight:600}.gv.no{color:#b9432d;font-weight:600}',
    '.actions{display:flex;gap:6px;margin-top:10px}',
    'button.act{flex:1;padding:9px 7px;border:1.5px solid #1d2234;border-radius:9px;font-size:11.5px;font-weight:700;',
    'font-family:"DM Sans",Arial,sans-serif;cursor:pointer;background:#fbfaf5;color:#1d2234;box-shadow:3px 3px 0 #1d2234;',
    'transition:transform .08s ease, box-shadow .08s ease}',
    'button.act:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #1d2234}',
    '.primary{background:#2d3ce8;color:#f5f2e9;box-shadow:3px 3px 0 #f15a43}',
    '.buy{background:#f15a43;color:#fff;box-shadow:3px 3px 0 #1d2234}',
    'button:disabled{opacity:.45;cursor:not-allowed;box-shadow:none;transform:none}',
    '.painel-cursos{display:none;margin-top:10px;max-height:214px;overflow:auto;border:1.5px solid #1d2234;border-radius:10px;background:#f5f2e9}',
    '.curso{padding:8px 10px;border-bottom:1px solid #e2e0d6;font-size:11.5px;cursor:pointer}',
    '.curso:hover{background:#eae7db}',
    '.curso:last-child{border-bottom:0}',
    '.curso b{display:block;font-family:"Space Grotesk",Arial,sans-serif;font-size:12px;font-weight:700;margin-bottom:2px}',
    '.curso span{color:#7c8598}',
    '.curso .tag{float:right;font-size:10px;font-weight:700;background:#2d3ce8;color:#f5f2e9;padding:1px 6px;border-radius:999px}',
    '.log{margin-top:10px;height:66px;overflow:auto;background:#1d2234;border:1.5px solid #1d2234;border-radius:10px;',
    'padding:7px 9px;font-family:ui-monospace,Consolas,monospace;font-size:10.5px;color:#d6ee58}',
    '.log div{margin-bottom:2px}',
    '.foot{padding:8px 13px;border-top:1.5px solid #1d2234;font-size:10px;color:#7c8598;display:flex;justify-content:space-between;background:#f5f2e9}',
    '.splash{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#fbfaf5;z-index:5}',
    '.splash .mark{font-family:"Space Grotesk",Arial,sans-serif;font-weight:700;letter-spacing:.2em;font-size:13px;',
    'color:#2d3ce8;padding:10px 14px;border:1.5px solid #1d2234;border-radius:10px;box-shadow:4px 4px 0 #f15a43;',
    'animation:pop .45s cubic-bezier(.2,1.4,.4,1) both}',
    '.splash .mark i{font-style:normal;color:#f15a43}',
    '.splash.out{animation:fade .22s ease forwards}',
    '@keyframes pop{0%{transform:scale(.6) rotate(-6deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}',
    '@keyframes fade{to{opacity:0;visibility:hidden}}',
    '@keyframes rise{0%{transform:translateY(8px) scale(.96);opacity:0}100%{transform:none;opacity:1}}',
    '.wrap.entra{animation:rise .42s cubic-bezier(.2,1.2,.3,1) both}',
    // --- minimizar / confirmar saida ---
    '.bar button.mn,.bar button.x{flex:0 0 auto;width:22px;height:22px;border:1.5px solid #f5f2e9;border-radius:6px;',
    'background:transparent;color:#f5f2e9;cursor:pointer;font-size:14px;line-height:1;padding:0}',
    '.bar button.mn:hover,.bar button.x:hover{background:#f5f2e9;color:#2d3ce8}',
    '.mini{display:none;flex:1 1 auto;align-items:center;gap:8px;min-width:0}',
    '.mini .mav{width:24px;height:24px;flex:0 0 24px;border-radius:7px;background:#f5f2e9;color:#2d3ce8;',
    'display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",Arial,sans-serif;',
    'font-weight:700;font-size:10px}',
    '.mini .mtx{min-width:0;line-height:1.2}',
    '.mini .mnm{display:block;font-size:11.5px;font-weight:700;color:#f5f2e9;white-space:nowrap;',
    'overflow:hidden;text-overflow:ellipsis;max-width:152px}',
    '.mini .msl{display:block;font-size:10px;color:#d6ee58;font-weight:700}',
    '.wrap.min{width:auto;min-width:196px;max-width:274px}',
    '.wrap.min .brand,.wrap.min .body,.wrap.min .foot,.wrap.min .notice,.wrap.min .bar2{display:none}',
    '.wrap.min .badge{display:none}',
    '.wrap.min .mini{display:flex}',
    '.wrap.min .bar{padding:8px 9px}',
    '.confirm{display:none;padding:12px 13px;background:#fdf0ec;border-top:1.5px solid #1d2234}',
    '.confirm p{margin:0 0 10px;font-size:12.5px;font-weight:700;color:#1d2234}',
    '.confirm p span{display:block;font-weight:400;font-size:11px;color:#7c8598;margin-top:3px}',
    '.wrap.confirmando .body,.wrap.confirmando .foot{display:none}',
    '.wrap.confirmando .confirm{display:block}',
    '.painel-pix{display:none;margin-top:10px;padding:10px;border:1.5px solid #1d2234;border-radius:10px;background:#fff}',
    '.painel-pix img{display:block;margin:0 auto 8px;width:180px;height:180px}',
    '.painel-pix .pix-topo{font-size:11px;font-weight:700;text-align:center;margin-bottom:6px}',
    '.painel-pix .pix-info{font-size:10px;color:#7c8598;text-align:center;margin:4px 0 6px}',
    '.pix-codigo{width:100%;height:56px;font-family:ui-monospace,Consolas,monospace;font-size:9.5px;line-height:1.35;',
    'resize:none;padding:6px;border:1px solid #c9c0aa;border-radius:8px;background:#fbfaf5;color:#1d2234;word-break:break-all}',
    '.painel-pix .pix-acoes{display:flex;gap:6px;margin-top:6px}',
    '.curso.sel{display:flex;gap:8px;align-items:flex-start}',
    '.curso.sel .cx{min-width:0;flex:1}',
    '.curso.sel .tag{float:none;margin-left:auto;flex:0 0 auto}',
    '.chk{width:18px;height:18px;flex:0 0 18px;border:1.5px solid #1d2234;border-radius:5px;background:#fff;',
    'margin-top:3px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff}',
    '.chk.on{background:#2d3ce8;border-color:#2d3ce8}',
    '.curso.completo{opacity:.5}',
    '.selbar{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#fbfaf5;border-bottom:1px solid #e2e0d6}',
    '.selbar .todos{font-weight:700;font-size:10.5px;color:#2d3ce8;background:none;border:0;padding:0;cursor:pointer}',
    '.selbar .resumo{margin-left:auto;font-size:10px;color:#7c8598;text-align:right}',
    '.execbar{display:flex;gap:6px;padding:8px 10px 4px}',
    '.falta{display:none;padding:0 10px 6px;font-size:10.5px;font-weight:700;color:#b9432d}',
    '.falta.on{display:block}'
  ].join('');

  var wrap = document.createElement('div');
  wrap.className = 'wrap entra';
  wrap.innerHTML = [
    '<div class="splash"><div class="mark">AUTO<i>AVA</i></div></div>',
    '<div class="bar"><div class="brand">AUTO<i>AVA</i> <span style="opacity:.55;font-size:10px">ferramenta</span></div>',
    '<div class="mini"><span class="mav">?</span><span class="mtx"><span class="mnm">visitante</span>',
    '<span class="msl">0 pontos</span></span></div>',
    '<span class="badge">fora da sessao</span>',
    '<button class="mn" title="Minimizar" aria-label="Minimizar">&#8211;</button>',
    '<button class="x" title="Fechar" aria-label="Fechar">&#215;</button></div>',
    '<div class="bar2"><i></i></div>',
    '<div class="notice" style="display:none"></div>',
    '<div class="confirm"><p>Fechar a ferramenta?<span>O job continua rodando no servidor. '
      + 'Voc\u00ea pode reabrir depois pelo favorito.</span></p>'
      + '<div class="actions"><button class="act ghost canc">Cancelar</button>'
      + '<button class="act buy sair">Fechar</button></div></div>',
    '<div class="body">',
    '<div class="user"><div class="av">?</div><div><div class="un">visitante</div><div class="us">sem sessao</div></div></div>',
    '<div class="saldo"><b>0</b><span>pontos</span><div class="eq">sem saldo</div></div>',
    '<div class="grid">',
    '<div class="gr"><span class="gk">RA</span><span class="gv" data-k="ra">-</span></div>',
    '<div class="gr"><span class="gk">userId</span><span class="gv" data-k="userId">-</span></div>',
    '<div class="gr"><span class="gk">sesskey</span><span class="gv" data-k="sesskey">-</span></div>',
    '<div class="gr"><span class="gk">api</span><span class="gv" data-k="api">-</span></div>',
    '</div>',
    '<div class="actions"><button class="act primary run">Executar pendentes</button>',
    '<button class="act buy comprar">Comprar</button></div>',
    '<div class="actions"><button class="act ghost cursos">Cursos</button>',
    '<button class="act ghost refresh">Atualizar</button>',
    '<button class="act ghost ext">Extrato</button>',
    '<button class="act ghost diag">Diag</button></div>',
    '<div class="painel-cursos"></div>',
    '<div class="painel-pix"></div>',
    '<div class="log"></div>',
    '</div>',
    '<div class="foot"><span>AUTOAVA ferramenta</span><span>v' + VERSION + '</span></div>'
  ].join('');

  shadow.appendChild(document.createElement('style')).textContent = css;
  shadow.appendChild(wrap);
  document.documentElement.appendChild(host);

  (function animarEntrada() {
    var splash = shadow.querySelector('.splash');
    if (!splash) { return; }
    setTimeout(function () {
      splash.classList.add('out');
      setTimeout(function () { if (splash.parentNode) { splash.remove(); } }, 240);
    }, 620);
  })();

  var q = function (s) { return shadow.querySelector(s); };
  var elBadge = q('.badge'), elAv = q('.av'), elName = q('.un'), elSub = q('.us');
  var elMiniAv = q('.mini .mav'), elMiniNome = q('.mini .mnm'), elMiniSaldo = q('.mini .msl');
  var elSaldo = q('.saldo b'), elEq = q('.saldo .eq');
  var elLog = q('.log'), elBar = q('.bar2 i'), elRun = q('.run'), elPix = q('.painel-pix');
  var state = { ra: '', userId: 0, nome: '', saldo: 0, api: '', busy: false, ativa: true, minima: '', outdated: false, pixTimer: null };

  function apiBase() {
    try { return localStorage.getItem(KEY_API) || DEFAULT_API; } catch (e) { return DEFAULT_API; }
  }
  function field(k, v) { var el = shadow.querySelector('[data-k="' + k + '"]'); if (el) { el.textContent = v; } }
  function log(msg) {
    var d = document.createElement('div');
    d.textContent = '[' + new Date().toLocaleTimeString('pt-BR') + '] ' + msg;
    elLog.appendChild(d); elLog.scrollTop = elLog.scrollHeight;
  }
  function cfg() { try { return (window.M && window.M.cfg) || {}; } catch (e) { return {}; } }

  function detectUser() {
    var c = cfg();
    var id = parseInt(c.userId || c.userid || 0, 10) || 0;
    var info = '';
    var el = document.querySelector('.logininfo');
    if (el) { info = (el.innerText || '').replace(/\s+/g, ' ').trim(); }
    var nome = '';
    var m = info.match(/acessou como\s+(.+?)\s*\(/i);
    if (m) { nome = m[1]; }
    if (!nome) {
      var img = document.querySelector('img.userpicture');
      if (img && img.getAttribute('alt')) { nome = img.getAttribute('alt').trim(); }
    }
    var logged = !!(id > 0 || nome || /(^|\s)loggedin(\s|$)/.test(document.body.className));
    return { id: id, nome: nome, info: info, logged: logged };
  }

  async function lookupPerfil() {
    // Uma chamada só resolve RA e nome. A detecção por DOM (.logininfo /
    // img.userpicture) não existe no tema mobile do Moodle: ali o nome tem
    // que vir do mesmo AJAX que já traz o RA.
    var c = cfg();
    var sesskey = c.sesskey || '';
    var id = parseInt(c.userId || 0, 10) || 0;
    var out = { ra: '', nome: '' };
    if (!sesskey || !id) { return out; }
    try {
      var url = location.origin + '/lib/ajax/service.php?sesskey=' + encodeURIComponent(sesskey);
      var body = [{ index: 0, methodname: 'core_user_get_users_by_field', args: { field: 'id', values: [String(id)] } }];
      var r = await fetch(url, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      var data = await r.json();
      var first = Array.isArray(data) ? data[0] : null;
      if (first && first.error) { log('perfil: ' + (first.exception && first.exception.errorcode || 'erro')); return out; }
      var users = first && first.data ? first.data : [];
      if (users.length) {
        out.ra = users[0].username ? String(users[0].username) : '';
        out.nome = users[0].fullname ? String(users[0].fullname).trim() : '';
      }
    } catch (e) { log('perfil falhou: ' + e.message); }
    return out;
  }

  function primeiroNome(nome) {
    return String(nome || '').trim().split(/\s+/)[0] || 'usuario';
  }

  function iniciais(nome) {
    return String(nome || '?').split(/\s+/).slice(0, 2)
      .map(function (p) { return p.charAt(0).toUpperCase(); }).join('') || '?';
  }

  async function api(path, opts) {
    var r = await fetch(state.api.replace(/\/$/, '') + path, Object.assign({ cache: 'no-store' }, opts || {}));
    var txt = await r.text();
    try { return JSON.parse(txt); } catch (e) { return { ok: false, erro: 'resposta invalida', raw: txt.slice(0, 120) }; }
  }

  function cmpVersao(a, b) {
    var pa = String(a || '0').split('.').map(function (x) { return parseInt(x, 10) || 0; });
    var pb = String(b || '0').split('.').map(function (x) { return parseInt(x, 10) || 0; });
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var d = (pa[i] || 0) - (pb[i] || 0);
      if (d !== 0) { return d > 0 ? 1 : -1; }
    }
    return 0;
  }

  function aviso(html, erro) {
    var el = q('.notice');
    if (!html) { el.style.display = 'none'; el.innerHTML = ''; return; }
    el.className = erro ? 'notice err' : 'notice';
    el.innerHTML = html;
    el.style.display = 'block';
  }

  async function checkVersion() {
    try {
      var d = await api('/api/pontos/versao');
      if (!d || !d.ok) { return; }
      state.ativa = d.ativa !== false;
      state.minima = d.versao_minima || '';
      state.outdated = !!(state.minima && cmpVersao(VERSION, state.minima) < 0);
      if (!state.ativa) {
        aviso('Ferramenta temporariamente desativada.' + (d.aviso ? ' ' + d.aviso : ''), true);
        elRun.disabled = true;
      } else if (state.outdated) {
        aviso('Versao desatualizada (v' + VERSION + '). <a href="https://zastetic.github.io/autoava-client/install.html" target="_blank" rel="noopener">Atualize aqui</a>.', true);
        elRun.disabled = true;
      } else {
        aviso('');
      }
    } catch (e) { /* sem rede: segue com o que tem */ }
  }

  async function ajaxMoodle(methodname, args) {
    var c = cfg();
    var sesskey = c.sesskey || '';
    if (!sesskey) { return null; }
    var url = location.origin + '/lib/ajax/service.php?sesskey=' + encodeURIComponent(sesskey);
    var r = await fetch(url, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ index: 0, methodname: methodname, args: args || {} }])
    });
    var data = await r.json();
    var first = Array.isArray(data) ? data[0] : null;
    if (!first || first.error) {
      var code = first && first.exception && first.exception.errorcode;
      log('AJAX ' + methodname + ': ' + (code || 'erro'));
      return null;
    }
    return first.data;
  }

  async function listarCursos() {
    var el = q('.painel-cursos');
    if (el.style.display === 'block') { el.style.display = 'none'; return; }
    if (!state.userId) { log('abra a plataforma logado'); return; }
    log('lendo cursos...');
    // core_enrol_get_users_courses responde servicenotavailable neste AVA: a lista
    // de trilhas que o servidor usa é a do bloco dimensions (o mesmo que o runner chama).
    var ds = await ajaxMoodle('block_dimensions_get_block_dataset', { favouritesonly: false });
    var cards = (ds && ds.competencycards) || [];
    if (!cards.length) { log('nenhum curso encontrado'); return; }
    el.innerHTML = '';
    cards.forEach(function (c) {
      var d = document.createElement('div');
      d.className = 'curso';
      d.innerHTML = '<span class="tag"></span><b></b><span class="sub"></span>';
      var tag = d.querySelector('.tag');
      var etiqueta = (c.tag1 || (c.tags && c.tags[0]) || '').trim();
      if (etiqueta) { tag.textContent = etiqueta; } else { tag.style.display = 'none'; }
      d.querySelector('b').textContent = c.name || ('curso ' + c.id);
      d.querySelector('.sub').textContent = 'toque para ver os bimestres';
      d.addEventListener('click', function () { abrirCurso(c); });
      el.appendChild(d);
    });
    el.style.display = 'block';
    log(cards.length + ' curso(s)');
  }

  function rotulosBimestres(html) {
    var mapa = {};
    var re = /<a[^>]*href="[^"]*\/course\/view\.php\?id=(\d+)"[^>]*>([\s\S]*?)<\/a>/g, m;
    while ((m = re.exec(html))) {
      var txt = m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (txt && !mapa[m[1]]) { mapa[m[1]] = txt; }
    }
    return mapa;
  }

  async function abrirCurso(curso) {
    var el = q('.painel-cursos');
    log('lendo ' + (curso.name || curso.id));
    el.style.display = 'block';
    el.innerHTML = '<div class="curso"><b>carregando...</b></div>';
    var html = '';
    try {
      var r = await fetch(curso.url, { credentials: 'include' });
      html = await r.text();
    } catch (e) { log('pagina do curso falhou'); }
    var ids = Array.from(new Set((html.match(/data-courseid="(\d+)"/g) || [])
      .map(function (s) { return s.match(/\d+/)[0]; })));
    if (!ids.length) { el.innerHTML = ''; log('sem bimestres nessa trilha'); return; }
    var rotulos = rotulosBimestres(html);
    var prog = await ajaxMoodle('local_dimensions_get_course_progress', { courseids: ids.map(Number) });
    if (!prog) { el.innerHTML = ''; log('progresso indisponivel'); return; }

    var itens = prog.map(function (p, i) {
      var secoes = p.sections || [];
      var pend = secoes.filter(function (s) { return !s.is_completed; }).length;
      var pct = secoes.length ? Math.round(secoes.reduce(function (a, s) { return a + (s.percentage || 0); }, 0) / secoes.length) : 0;
      var rotulo = rotulos[String(p.courseid)] || ('Componente ' + (i + 1));
      var nomesSecoes = secoes.map(function (x) { return String(x.name || ''); });
      var ehIntro = /boas[- ]?vindas/i.test(rotulo) || (nomesSecoes.length > 0 && nomesSecoes.every(function (n) {
        return /conhe[cç]a o componente|mercado de trabalho/i.test(n);
      }));
      var numeroBim = (String(rotulo).match(/([1-4])\s*[\u00ba\u00b0o]?\s*bim/i) || [])[1];
      numeroBim = parseInt(numeroBim, 10) || (i + 1);
      return {
        courseid: p.courseid,
        url: p.course_url || '',
        numero: numeroBim,
        nome: rotulo,
        intro: ehIntro,
        custo: ehIntro ? 0 : PONTOS_BIMESTRE,
        secoes: secoes.length,
        pend: pend,
        pct: pct,
        inicio: p.formatted_start_date || '',
        marcado: pend > 0
      };
    });

    // Introducao (Boas-vindas) nao e atividade nem bimestre: fica fora da lista.
    var introducoes = itens.filter(function (x) { return x.intro; }).length;
    var bimestres = itens.filter(function (x) { return !x.intro; });
    if (!bimestres.length) {
      el.innerHTML = '';
      log('sem bimestres nessa trilha' + (introducoes ? ' (so introducao)' : ''));
      return;
    }
    telaExecucao(el, curso, bimestres);
    var pendTotal = bimestres.reduce(function (a, x) { return a + x.pend; }, 0);
    log('trilha: ' + bimestres.length + ' bimestre(s) · ' + pendTotal + ' pendente(s)'
      + (introducoes ? ' · ' + introducoes + ' introducao ignorada' : ''));
  }

  function telaExecucao(el, curso, itens) {
    el.innerHTML = '';

    var barra = document.createElement('div');
    barra.className = 'selbar';
    barra.innerHTML = '<button class="todos"></button><span class="resumo"></span>';
    el.appendChild(barra);

    var acoes = document.createElement('div');
    acoes.className = 'execbar';
    acoes.innerHTML = '<button class="act primary exec-sel"></button>'
      + '<button class="act buy exec-all"></button>';
    el.appendChild(acoes);

    var falta = document.createElement('div');
    falta.className = 'falta';
    el.appendChild(falta);

    itens.forEach(function (it) {
      var d = document.createElement('div');
      d.className = 'curso sel' + (it.pend ? '' : ' completo');
      d.innerHTML = '<span class="chk"></span><div class="cx"><b></b><span class="sub"></span></div><span class="tag"></span>';
      d.querySelector('b').textContent = it.nome;
      d.querySelector('.sub').textContent = (it.intro ? 'introducao' : 'bimestre')
        + ' · ' + it.secoes + ' secao(oes) · '
        + (it.pend ? it.pend + ' pendente(s)' : 'completo')
        + ' · ' + (it.custo ? it.custo + ' pts' : 'gratis')
        + (it.inicio ? ' · desde ' + it.inicio : '');
      var tag = d.querySelector('.tag');
      tag.textContent = it.pct + '%';
      tag.style.background = it.pct >= 100 ? '#126a49' : '#2d3ce8';
      var chk = d.querySelector('.chk');
      function pinta() {
        chk.textContent = it.marcado ? '\u2713' : '';
        chk.className = 'chk' + (it.marcado ? ' on' : '');
      }
      pinta();
      d.addEventListener('click', function () {
        if (!it.pend) { log('bimestre completo: nada a executar'); return; }
        it.marcado = !it.marcado;
        pinta();
        atualiza();
      });
      el.appendChild(d);
    });

    var selBtn = acoes.querySelector('.exec-sel');
    var allBtn = acoes.querySelector('.exec-all');
    var todosBtn = barra.querySelector('.todos');
    var resumo = barra.querySelector('.resumo');

    function marcados() { return itens.filter(function (x) { return x.marcado && x.pend > 0; }); }
    function comPendencia() { return itens.filter(function (x) { return x.pend > 0; }); }

    function somaCusto(lista) {
      return lista.reduce(function (a, x) { return a + (x.custo || 0); }, 0);
    }

    function atualiza() {
      var sel = marcados();
      var custo = somaCusto(sel);
      var semSaldo = custo > state.saldo;
      selBtn.textContent = sel.length
        ? 'Executar ' + sel.length + ' · ' + (custo ? custo + ' pts' : 'gratis')
        : 'Selecione itens';
      selBtn.disabled = !sel.length || semSaldo;
      selBtn.title = (sel.length && semSaldo) ? ('faltam ' + (custo - state.saldo) + ' pontos') : '';

      var todos = comPendencia();
      var custoTodos = somaCusto(todos);
      allBtn.textContent = 'Executar todos (' + todos.length + ') · '
        + (custoTodos ? custoTodos + ' pts' : 'gratis');
      allBtn.disabled = !todos.length || custoTodos > state.saldo;
      allBtn.title = (todos.length && custoTodos > state.saldo) ? ('faltam ' + (custoTodos - state.saldo) + ' pontos') : '';

      todosBtn.textContent = (sel.length === todos.length && todos.length) ? 'limpar selecao' : 'selecionar todos';
      var alvoCusto = sel.length ? custo : custoTodos;
      if (alvoCusto > state.saldo) {
        falta.textContent = 'faltam ' + (alvoCusto - state.saldo) + ' pontos · toque em Comprar';
        falta.className = 'falta on';
      } else {
        falta.textContent = '';
        falta.className = 'falta';
      }
      var pendTotal = itens.reduce(function (a, x) { return a + x.pend; }, 0);
      var bims = itens.filter(function (x) { return !x.intro; }).length;
      var intro = itens.length - bims;
      resumo.textContent = bims + ' bimestre(s)' + (intro ? ' + introducao' : '')
        + ' · ' + pendTotal + ' pendentes · saldo ' + state.saldo;
    }

    todosBtn.addEventListener('click', function () {
      var todos = comPendencia();
      var marcarTudo = marcados().length !== todos.length;
      itens.forEach(function (x) { x.marcado = marcarTudo ? (x.pend > 0) : false; });
      telaExecucao(el, curso, itens);
    });
    selBtn.addEventListener('click', function () { executarBimestres(marcados()); });
    allBtn.addEventListener('click', function () { executarBimestres(comPendencia()); });
    atualiza();
  }

  async function executarBimestres(lista) {
    if (!state.ra) { log('sem RA'); return; }
    if (!lista.length) { log('selecione ao menos um item'); return; }
    var custo = lista.reduce(function (a, x) { return a + (x.custo || 0); }, 0);
    if (state.saldo < custo) { log('saldo insuficiente: ' + state.saldo + ' de ' + custo + ' pts · use Comprar'); return; }
    var sessao = sessaoParaServidor();
    if (!sessao.sesskey && !Object.keys(sessao.cookies).length) {
      log('sem sessao: abra a plataforma logado e dispare a ferramenta de novo');
      return;
    }
    log('pedindo execucao de ' + lista.length + ' item(ns) · ' + custo + ' pts');
    var d = await api('/api/pontos/job', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ra: state.ra,
        custo: custo,
        bimestres: lista.map(function (x) {
          return { courseid: x.courseid, course_url: x.url, bimester_index: x.numero || 0 };
        }),
        session: sessao
      })
    });
    if (d && d.ok) {
      log('job ' + String(d.jobId || '').slice(0, 8) + ' iniciado · ' + d.bimestres + ' bimestre(s) · ' + d.custo + ' pts reservados');
      acompanharJob(d.jobId);
      return;
    }
    if (d && d.erro === 'saldo_insuficiente') {
      log('faltam ' + (d.faltam || d.custo) + ' ponto(s) · use Comprar');
      return;
    }
    if (d && d.erro === 'automacao_pausada') { log('automacao pausada no servidor · tente mais tarde'); return; }
    if (d && d.erro === 'sessao_ausente') { log('servidor nao recebeu a sessao · recarregue e dispare de novo'); return; }
    if (d && String(d.erro || '').indexOf('execucao_por_sessao') === 0) {
      log('servidor: execucao desligada (TOOL_SESSION_JOBS)');
      return;
    }
    log('falhou: ' + ((d && d.erro) || 'sem resposta'));
  }

  // A sessao nunca e guardada: vai junto do pedido, o servidor usa e descarta.
  function sessaoParaServidor() {
    var cookies = {};
    String(document.cookie || '').split(';').forEach(function (par) {
      var i = par.indexOf('=');
      if (i < 1) { return; }
      var k = par.slice(0, i).trim();
      var v = par.slice(i + 1).trim();
      if (k) { cookies[k] = v; }
    });
    var c = cfg();
    return { cookies: cookies, sesskey: (c && c.sesskey) || '' };
  }

  async function acompanharJob(jobId) {
    if (!jobId) { return; }
    var voltas = 0;
    var visto = '';
    var timer = setInterval(async function () {
      voltas += 1;
      if (voltas > 400) { clearInterval(timer); log('job segue no servidor · reabra a ferramenta depois'); return; }
      var d = await api('/api/pontos/job?jobId=' + encodeURIComponent(jobId));
      if (!d || !d.ok) { return; }
      var linha = 'job ' + String(jobId).slice(0, 8) + ': ' + (d.status || '?');
      if (d.points_charged) { linha += ' · cobrado ' + d.points_charged + ' pts'; }
      if (linha !== visto) { visto = linha; log(linha); }
      if (d.status === 'succeeded' || d.status === 'failed' || d.status === 'stopped') {
        clearInterval(timer);
        await refreshSaldo();
        if (d.status === 'succeeded') {
          log('execucao concluida · saldo ' + state.saldo + ' pts');
        } else {
          log('execucao ' + d.status + ' · nada foi cobrado se nao houve atividade');
        }
        await refresh();
      }
    }, 6000);
  }

  function paintSaldo() {
    elSaldo.textContent = String(state.saldo);
    if (elMiniSaldo) { elMiniSaldo.textContent = (state.saldo | 0) + ' pontos'; }
    var bims = state.saldo / 100;
    if (!state.saldo) { elEq.textContent = 'sem saldo'; return; }
    var txt = bims >= 1 ? (bims.toFixed(bims % 1 ? 2 : 0) + ' bimestre' + (bims === 1 ? '' : 's')) : ('~' + Math.round(bims * 4) + ' semana(s)');
    elEq.textContent = '≈ ' + txt;
  }

  async function refreshSaldo() {
    if (!state.ra) { state.saldo = 0; paintSaldo(); return; }
    var d = await api('/api/pontos/saldo?ra=' + encodeURIComponent(state.ra));
    if (d && d.ok) { state.saldo = d.saldo | 0; } else { state.saldo = 0; log('saldo: ' + (d && d.erro || 'sem resposta')); }
    paintSaldo();
  }

  async function refresh() {
    var u = detectUser();
    var c = cfg();
    state.userId = u.id;
    state.nome = u.nome;
    state.api = apiBase();
    elBadge.textContent = u.logged ? 'sessao ativa' : 'fora da sessao';
    elBadge.className = u.logged ? 'badge on' : 'badge';
    elName.textContent = u.nome || (u.logged ? 'usuario identificado' : 'visitante');
    elAv.textContent = iniciais(u.nome);
    if (elMiniNome) { elMiniNome.textContent = primeiroNome(elName.textContent); }
    if (elMiniAv) { elMiniAv.textContent = elAv.textContent; }
    field('userId', u.id ? String(u.id) : '0');
    field('sesskey', c.sesskey ? (c.sesskey.slice(0, 4) + '...' + c.sesskey.slice(-2)) : 'ausente');
    field('api', state.api.replace(/^https?:\/\//, '').slice(0, 24));
    elSub.textContent = u.logged ? ('userId ' + (u.id || 'n/d')) : 'sem sessao: abra a plataforma logada';
    if (!state.ra || !state.nome) {
      var perfil = await lookupPerfil();
      if (!state.ra && perfil.ra) { state.ra = perfil.ra; log('RA detectado: ' + state.ra); }
      if (!state.nome && perfil.nome) {
        state.nome = perfil.nome;
        elName.textContent = perfil.nome;
        elAv.textContent = iniciais(perfil.nome);
        if (elMiniNome) { elMiniNome.textContent = primeiroNome(perfil.nome); }
        if (elMiniAv) { elMiniAv.textContent = elAv.textContent; }
        log('nome detectado: ' + perfil.nome);
      }
    }
    field('ra', state.ra || (u.logged ? 'nao encontrado' : '-'));
    await checkVersion();
    await refreshSaldo();
    elRun.disabled = !state.ra || !state.ativa || state.outdated;
    return state;
  }

  function close() {
    document.removeEventListener('keydown', onKey, true);
    host.remove();
    window.__autoava = null;
  }
  function pedirSaida() {
    wrap.classList.remove('min');
    sincronizaMinBtn(false);
    wrap.classList.add('confirmando');
  }
  function cancelarSaida() { wrap.classList.remove('confirmando'); }
  function sincronizaMinBtn(minimizado) {
    var btn = q('.mn');
    if (!btn) { return; }
    btn.innerHTML = minimizado ? '&#9633;' : '&#8211;';
    btn.title = minimizado ? 'Restaurar' : 'Minimizar';
    btn.setAttribute('aria-label', btn.title);
  }
  function minimizar() {
    var min = wrap.classList.toggle('min');
    wrap.classList.remove('confirmando');
    sincronizaMinBtn(min);
    return min;
  }
  function onKey(ev) {
    if (ev.key !== 'Escape') { return; }
    if (wrap.classList.contains('confirmando')) { cancelarSaida(); return; }
    if (wrap.classList.contains('min')) { minimizar(); return; }
    pedirSaida();
  }

  q('.x').addEventListener('click', pedirSaida);
  q('.mn').addEventListener('click', minimizar);
  q('.canc').addEventListener('click', cancelarSaida);
  q('.sair').addEventListener('click', close);
  q('.cursos').addEventListener('click', listarCursos);
  q('.refresh').addEventListener('click', async function () { await refresh(); log('atualizado · saldo ' + state.saldo); });
  q('.diag').addEventListener('click', async function () {
    var d = { versao: VERSION, url: location.href, ra: state.ra, userId: state.userId, nome: state.nome, saldo: state.saldo, api: state.api };
    try { await navigator.clipboard.writeText(JSON.stringify(d, null, 2)); log('diagnostico copiado'); } catch (e) { log('nao deu para copiar'); }
    console.log('[autoava]', d);
  });
  q('.ext').addEventListener('click', async function () {
    if (!state.ra) { log('sem RA'); return; }
    var d = await api('/api/pontos/extrato?ra=' + encodeURIComponent(state.ra));
    if (!d || !d.ok) { log('extrato falhou'); return; }
    log('extrato (' + d.movimentos.length + ')');
    d.movimentos.forEach(function (m) { log((m.tipo + ' ' + (m.pontos > 0 ? '+' : '') + m.pontos + ' · ' + (m.descricao || ''))); });
  });
  q('.comprar').addEventListener('click', async function () {
    if (!state.ativa) { log('ferramenta desativada no momento'); return; }
    if (!state.ra) { log('sem RA: entre logado na plataforma'); return; }

    var painel = q('.painel-pix');
    if (painel.style.display === 'block') { painel.style.display = 'none'; return; }
    var local = /^http:\/\/(127\.0\.0\.1|localhost)/.test(state.api);
    if (local) {
      log('creditando pacote de teste (400 pontos)...');
      var t = await api('/api/pontos/compra-simulada', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ra: state.ra, pacote: 'bim4', ref: 'teste-' + Date.now() })
      });
      if (t && t.ok) { state.saldo = t.saldo | 0; paintSaldo(); elRun.disabled = !state.ra || !state.ativa || state.outdated; log('creditado +' + t.pontos + ' · saldo ' + t.saldo); }
      else if (t && t.erro === 'rota_interna') { log('compra simulada so em ambiente local'); }
      else { log('compra falhou: ' + ((t && t.erro) || '')); }
      return;
    }

    log('gerando Pix...');
    var d = await api('/api/pontos/pix', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ra: state.ra, pacote: 'bim4' })
    });
    if (!d || !d.ok || !d.qr_code_base64) { log('pix falhou: ' + ((d && d.erro) || 'sem QR')); return; }

    elPix.innerHTML = [
      '<div class="pix-topo">Pix · R$ ' + String(d.preco).replace('.', ',') + ' por ' + d.pontos + ' pontos</div>',
      '<img alt="QR Code do Pix" src="data:image/png;base64,' + d.qr_code_base64 + '">',
      '<div class="pix-info">Aponte a camera ou copie o codigo abaixo</div>',
      '<textarea class="pix-codigo" readonly></textarea>',
      '<div class="pix-acoes"><button class="act ghost pix-copiar">Copiar codigo Pix</button>',
      '<button class="act ghost pix-fechar">Ocultar</button></div>',
      '<div class="pix-info pix-status">aguardando pagamento...</div>'
    ].join('');
    elPix.querySelector('.pix-codigo').value = d.qr_code;
    elPix.querySelector('.pix-copiar').addEventListener('click', async function () {
      var ta = elPix.querySelector('.pix-codigo');
      try { await navigator.clipboard.writeText(d.qr_code); log('codigo Pix copiado'); }
      catch (e) { ta.select(); document.execCommand('copy'); log('codigo Pix copiado (fallback)'); }
    });
    elPix.querySelector('.pix-fechar').addEventListener('click', function () { elPix.style.display = 'none'; });
    elPix.style.display = 'block';
    log('Pix gerado · ' + d.pontos + ' pontos por R$ ' + d.preco + ' · expira em 24h');

    var alvo = String(d.purchaseId);
    var inicio = Date.now();
    if (state.pixTimer) { clearInterval(state.pixTimer); }
    state.pixTimer = setInterval(async function () {
      var st = await api('/api/pontos/pix/status?purchaseId=' + encodeURIComponent(alvo));
      var linha = elPix.querySelector('.pix-status');
      if (st && st.ok) {
        if (st.status === 'approved' || st.paymentStatus === 'approved') {
          clearInterval(state.pixTimer); state.pixTimer = null;
          state.saldo = st.saldo | 0; paintSaldo();
          elRun.disabled = !state.ra || !state.ativa || state.outdated;
          if (linha) { linha.textContent = 'pago · saldo ' + state.saldo + ' pontos'; linha.style.color = '#126a49'; }
          log('pagamento confirmado · saldo ' + state.saldo);
          return;
        }
        if (linha) { linha.textContent = 'aguardando pagamento... (' + (st.paymentStatus || st.status) + ')'; }
      }
      if (Date.now() - inicio > 1800000) {
        clearInterval(state.pixTimer); state.pixTimer = null;
        if (linha) { linha.textContent = 'Pix expirou · gere outro'; }
      }
    }, 4000);
  });

  q('.run').addEventListener('click', async function () {
    if (!state.ativa) { log('ferramenta desativada no momento'); return; }
    if (!state.ra) { log('sem RA: entre logado na plataforma'); return; }
    var painel = q('.painel-cursos');
    if (painel.style.display !== 'block' || !painel.children.length) {
      log('escolha a trilha e os bimestres');
      await listarCursos();
      return;
    }
    log('selecione os bimestres na lista acima');
  });

  var bar = q('.bar'), drag = null;
  bar.addEventListener('mousedown', function (ev) {
    if (ev.target.closest('.x, .mn')) { return; }
    var r = wrap.getBoundingClientRect();
    drag = { x: ev.clientX, y: ev.clientY, top: r.top, left: r.left };
    ev.preventDefault();
  });
  document.addEventListener('mousemove', function (ev) {
    if (!drag) { return; }
    wrap.style.top = Math.max(0, drag.top + ev.clientY - drag.y) + 'px';
    wrap.style.left = Math.max(0, drag.left + ev.clientX - drag.x) + 'px';
    wrap.style.right = 'auto';
  });
  document.addEventListener('mouseup', function () { drag = null; });
  document.addEventListener('keydown', onKey, true);

  paintSaldo();
  window.__autoava = { close: close, refresh: refresh, state: state, version: VERSION,
                       minimizar: minimizar, saida: pedirSaida, cancelarSaida: cancelarSaida };
  refresh().then(function () {
    log('pronto · saldo ' + state.saldo);
  });
})();
