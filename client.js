(function () {
  var EXISTING = window.__autoava;
  if (EXISTING) { EXISTING.close(); return; }
  var KEY_API = 'autoava:api';
  var DEFAULT_API = 'https://www.autoava.us';
  var VERSION = '0.5.3';
  var CUSTO_SEMANA = 14;

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
    '.wrap.entra{animation:rise .42s cubic-bezier(.2,1.2,.3,1) both}'
  ].join('');

  var wrap = document.createElement('div');
  wrap.className = 'wrap entra';
  wrap.innerHTML = [
    '<div class="splash"><div class="mark">AUTO<i>AVA</i></div></div>',
    '<div class="bar"><div class="brand">AUTO<i>AVA</i> <span style="opacity:.55;font-size:10px">ferramenta</span></div>',
    '<span class="badge">fora da sessao</span><button class="x" title="Fechar">&#215;</button></div>',
    '<div class="bar2"><i></i></div>',
    '<div class="notice" style="display:none"></div>',
    '<div class="body">',
    '<div class="user"><div class="av">?</div><div><div class="un">visitante</div><div class="us">sem sessao</div></div></div>',
    '<div class="saldo"><b>0</b><span>pontos</span><div class="eq">sem saldo</div></div>',
    '<div class="grid">',
    '<div class="gr"><span class="gk">RA</span><span class="gv" data-k="ra">-</span></div>',
    '<div class="gr"><span class="gk">userId</span><span class="gv" data-k="userId">-</span></div>',
    '<div class="gr"><span class="gk">sesskey</span><span class="gv" data-k="sesskey">-</span></div>',
    '<div class="gr"><span class="gk">api</span><span class="gv" data-k="api">-</span></div>',
    '</div>',
    '<div class="actions"><button class="act primary run">Executar 1 semana</button>',
    '<button class="act buy comprar">Comprar</button></div>',
    '<div class="actions"><button class="act ghost cursos">Cursos</button>',
    '<button class="act ghost refresh">Atualizar</button>',
    '<button class="act ghost ext">Extrato</button>',
    '<button class="act ghost diag">Diag</button></div>',
    '<div class="painel-cursos"></div>',
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
  var elSaldo = q('.saldo b'), elEq = q('.saldo .eq');
  var elLog = q('.log'), elBar = q('.bar2 i'), elRun = q('.run');
  var state = { ra: '', userId: 0, nome: '', saldo: 0, api: '', busy: false, ativa: true, minima: '', outdated: false };

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

  async function lookupRA() {
    var c = cfg();
    var sesskey = c.sesskey || '';
    var id = parseInt(c.userId || 0, 10) || 0;
    if (!sesskey || !id) { return ''; }
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
      if (first && first.error) { log('RA: ' + (first.exception && first.exception.errorcode || 'erro')); return ''; }
      var users = first && first.data ? first.data : [];
      if (users.length && users[0].username) { return String(users[0].username); }
    } catch (e) { log('RA lookup falhou: ' + e.message); }
    return '';
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
    var cursos = await ajaxMoodle('core_enrol_get_users_courses', { userid: state.userId });
    if (!cursos) { log('nao consegui listar cursos'); return; }
    el.innerHTML = '';
    cursos.forEach(function (c) {
      var d = document.createElement('div');
      d.className = 'curso';
      var pct = (c.progress !== null && c.progress !== undefined) ? c.progress + '%' : '';
      d.innerHTML = '<span class="tag">' + pct + '</span><b></b><span></span>';
      d.querySelector('b').textContent = c.fullname || c.shortname || ('curso ' + c.id);
      d.querySelector('span').textContent = (c.timemodified ? 'atualizado' : '') + ' · id ' + c.id;
      d.addEventListener('click', function () { abrirCurso(c); });
      el.appendChild(d);
    });
    el.style.display = 'block';
    log(cursos.length + ' curso(s)');
  }

  async function abrirCurso(curso) {
    var el = q('.painel-cursos');
    log('lendo ' + (curso.shortname || curso.fullname));
    var secoes = await ajaxMoodle('core_course_get_contents', { courseid: curso.id });
    if (!secoes) { log('nao consegui ler o curso'); return; }
    el.innerHTML = '';
    var pendentes = 0;
    var total = 0;
    secoes.forEach(function (sec) {
      var mods = sec.modules || [];
      if (!mods.length) { return; }
      total += mods.length;
      var feitos = mods.filter(function (m) { return m.completiondata && m.completiondata.state === 1; }).length;
      pendentes += mods.length - feitos;
      var d = document.createElement('div');
      d.className = 'curso';
      d.innerHTML = '<span class="tag">' + feitos + '/' + mods.length + '</span><b></b><span></span>';
      d.querySelector('b').textContent = sec.name || ('secao ' + sec.section);
      d.querySelector('span').textContent = (mods.length - feitos) + ' pendente(s)';
      el.appendChild(d);
    });
    var custo = Math.round(pendentes * (100 / Math.max(1, secoes.filter(function (x) { return (x.modules || []).length; }).length)));
    log('curso: ' + total + ' atividades, ' + pendentes + ' pendentes · ~' + custo + ' pontos');
    var acao = document.createElement('div');
    acao.className = 'curso';
    acao.innerHTML = '<b>Executar pendentes</b><span>~' + custo + ' pontos · ' + pendentes + ' atividades</span>';
    acao.addEventListener('click', function () { executarCurso(curso, custo); });
    el.appendChild(acao);
  }

  async function executarCurso(curso, custo) {
    if (!state.ra) { log('sem RA'); return; }
    if (state.saldo < custo) { log('saldo insuficiente (' + state.saldo + ' < ' + custo + ')'); return; }
    log('pedindo execucao ao servidor...');
    var d = await api('/api/pontos/job', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ra: state.ra, courseid: curso.id, course_url: (cfg().wwwroot || location.origin) + '/course/view.php?id=' + curso.id })
    });
    if (d && d.ok) { log('job criado: ' + (d.jobId || '')); return; }
    if (d && d.erro === 'execucao_por_sessao_desligada') { log('execucao pela ferramenta ainda desligada no servidor'); return; }
    log('falhou: ' + (d && d.erro || 'sem resposta'));
  }

  function paintSaldo() {
    elSaldo.textContent = String(state.saldo);
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
    elAv.textContent = (u.nome || '?').split(/\s+/).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join('') || '?';
    field('userId', u.id ? String(u.id) : '0');
    field('sesskey', c.sesskey ? (c.sesskey.slice(0, 4) + '...' + c.sesskey.slice(-2)) : 'ausente');
    field('api', state.api.replace(/^https?:\/\//, '').slice(0, 24));
    elSub.textContent = u.logged ? ('userId ' + (u.id || 'n/d')) : 'sem sessao: abra a plataforma logada';
    if (!state.ra) {
      state.ra = await lookupRA();
      if (state.ra) { log('RA detectado: ' + state.ra); }
    }
    field('ra', state.ra || (u.logged ? 'nao encontrado' : '-'));
    await checkVersion();
    await refreshSaldo();
    elRun.disabled = !state.ra || state.saldo < CUSTO_SEMANA || !state.ativa || state.outdated;
    return state;
  }

  function close() {
    document.removeEventListener('keydown', onKey, true);
    host.remove();
    window.__autoava = null;
  }
  function onKey(ev) { if (ev.key === 'Escape') { close(); } }

  q('.x').addEventListener('click', close);
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
    var local = /^http:\/\/(127\.0\.0\.1|localhost)/.test(state.api);
    if (local) {
      log('criando pacote de teste (400 pontos)...');
      var t = await api('/api/pontos/compra-simulada', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ra: state.ra, pacote: 'bim4', ref: 'teste-' + Date.now() })
      });
      if (t && t.ok) { state.saldo = t.saldo | 0; paintSaldo(); elRun.disabled = state.saldo < CUSTO_SEMANA; log('creditado +' + t.pontos + ' · saldo ' + t.saldo); }
      else if (t && t.erro === 'rota_interna') { log('compra simulada so em ambiente local'); }
      else { log('compra falhou: ' + (t && t.erro || '')); }
      return;
    }
    log('criando cobranca Pix...');
    var d = await api('/api/pontos/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ra: state.ra, pacote: 'bim4' })
    });
    if (!d || !d.ok || !d.init_point) { log('checkout falhou: ' + (d && d.erro || 'sem init_point')); return; }
    log('abrindo checkout · R$ ' + d.preco + ' por ' + d.pontos + ' pontos');
    window.open(d.init_point, '_blank', 'noopener');
    var t0 = Date.now();
    var iv = setInterval(async function () {
      await refreshSaldo();
      if (state.saldo >= CUSTO_SEMANA) { clearInterval(iv); log('pagamento confirmado · saldo ' + state.saldo); elRun.disabled = false; }
      else if (Date.now() - t0 > 300000) { clearInterval(iv); log('checkout expirou · clique Atualizar'); }
    }, 4000);
  });

  q('.run').addEventListener('click', async function () {
    if (state.busy) { return; }
    if (!state.ativa) { log('ferramenta desativada no momento'); return; }
    if (state.outdated) { log('atualize a ferramenta para executar'); return; }
    if (!state.ra) { log('sem RA'); return; }
    if (state.saldo < CUSTO_SEMANA) { log('saldo insuficiente (' + state.saldo + ')'); return; }
    state.busy = true; elRun.disabled = true;
    var aid = 'demo-' + Date.now();
    log('executando 1 semana · custo ' + CUSTO_SEMANA + ' pontos');
    elBar.style.width = '35%';
    var d = await api('/api/pontos/consumo', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ra: state.ra, exec_id: 'exec-' + Date.now(), itens: [{ activity_id: aid, peso: CUSTO_SEMANA, confirmado: true }] })
    });
    elBar.style.width = '100%';
    if (d && d.ok) { state.saldo = d.saldo | 0; paintSaldo(); log('consumiu ' + d.cobrado + ' · saldo ' + d.saldo); }
    else if (d && d.erro === 'rota_interna') { log('execucao roda no servidor · o popup so agenda'); }
    else { log('consumo falhou: ' + (d && d.erro || '')); }
    state.busy = false; elRun.disabled = state.saldo < CUSTO_SEMANA;
  });

  var bar = q('.bar'), drag = null;
  bar.addEventListener('mousedown', function (ev) {
    if (ev.target.closest('.x')) { return; }
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
  window.__autoava = { close: close, refresh: refresh, state: state, version: VERSION };
  refresh().then(function () {
    log('pronto · saldo ' + state.saldo);
  });
})();
