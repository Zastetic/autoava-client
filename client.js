(function () {
  var EXISTING = window.__autoava;
  if (EXISTING) { EXISTING.close(); return; }
  var KEY_STORE = 'autoava:key';
  var VERSION = '0.2.0-teste';
  var started = Date.now();

  var host = document.createElement('div');
  host.id = 'autoava-root';
  var shadow = host.attachShadow({ mode: 'open' });

  var css = [
    ':host{all:initial}',
    '.wrap{position:fixed;top:20px;right:20px;width:340px;z-index:2147483000;',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#e8ecf1;',
    'background:#11151c;border:1px solid #232a35;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.55);',
    'overflow:hidden;user-select:none;font-size:13px;line-height:1.4}',
    '.bar{display:flex;align-items:center;gap:8px;padding:11px 12px;background:linear-gradient(90deg,#1b2430,#151a22);cursor:move}',
    '.brand{font-size:12px;font-weight:700;letter-spacing:.14em;color:#8ef0c8;flex:1}',
    '.badge{font-size:10px;font-weight:600;letter-spacing:.06em;padding:3px 7px;border-radius:999px;',
    'background:#3a2b12;color:#e0b341;border:1px solid #4a3a1a}',
    '.badge.on{background:#0f2a22;color:#3ad29f;border-color:#1d4a3a}',
    '.x{width:22px;height:22px;border:0;border-radius:6px;background:#222b36;color:#aab4c2;cursor:pointer;font-size:14px;line-height:1}',
    '.x:hover{background:#2c3744;color:#fff}',
    '.bar2{height:3px;background:#1a212b}.bar2 i{display:block;height:100%;width:0;background:#3ad29f;transition:width .25s}',
    '.body{padding:12px}',
    '.user{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid #1d242e;border-radius:10px;background:#0c1016;margin-bottom:10px}',
    '.av{width:34px;height:34px;border-radius:50%;background:#1d3b31;color:#8ef0c8;display:flex;align-items:center;',
    'justify-content:center;font-weight:700;font-size:12px;flex:0 0 34px}',
    '.un{font-weight:600;font-size:13px;color:#e8ecf1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:210px}',
    '.us{font-size:11px;color:#71808f;margin-top:2px}',
    '.grid{border:1px solid #1d242e;border-radius:10px;overflow:hidden;margin-bottom:10px}',
    '.gr{display:flex;justify-content:space-between;gap:8px;padding:6px 9px;font-size:11.5px;border-bottom:1px solid #151b23}',
    '.gr:last-child{border-bottom:0}',
    '.gk{color:#71808f}.gv{color:#c3ccd8;font-family:ui-monospace,Menlo,Consolas,monospace;text-align:right;',
    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:190px}',
    '.gv.ok{color:#3ad29f}.gv.no{color:#e0b341}',
    'label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#71808f;margin:0 0 5px}',
    'input{width:100%;box-sizing:border-box;padding:8px 9px;border-radius:8px;border:1px solid #2a3441;background:#0c1016;',
    'color:#e8ecf1;font-size:12.5px;outline:none}',
    'input:focus{border-color:#3ad29f}',
    '.actions{display:flex;gap:6px;margin-top:10px}',
    'button.act{flex:1;padding:8px 6px;border:0;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer}',
    '.primary{background:#3ad29f;color:#08130f}.primary:hover{background:#4be0ad}',
    '.ghost{background:#1c242f;color:#aab8c6}.ghost:hover{background:#25303d}',
    '.log{margin-top:10px;height:64px;overflow:auto;background:#0a0e13;border:1px solid #1d242e;border-radius:8px;',
    'padding:7px 8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10.5px;color:#8fa0b3}',
    '.log div{margin-bottom:2px}',
    '.foot{padding:8px 12px;border-top:1px solid #1d242e;font-size:10px;color:#5f6b7a;display:flex;justify-content:space-between}'
  ].join('');

  var wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.innerHTML = [
    '<div class="bar"><div class="brand">AUTOAVA</div>',
    '<span class="badge">fora da sessao</span><button class="x" title="Fechar">&#215;</button></div>',
    '<div class="bar2"><i></i></div>',
    '<div class="body">',
    '<div class="user"><div class="av">?</div><div><div class="un">visitante</div><div class="us">sem nome na pagina</div></div></div>',
    '<div class="grid">',
    '<div class="gr"><span class="gk">sesskey</span><span class="gv" data-k="sesskey">-</span></div>',
    '<div class="gr"><span class="gk">userId</span><span class="gv" data-k="userId">-</span></div>',
    '<div class="gr"><span class="gk">host</span><span class="gv" data-k="host">-</span></div>',
    '<div class="gr"><span class="gk">pagina</span><span class="gv" data-k="page">-</span></div>',
    '<div class="gr"><span class="gk">cookie MoodleSession</span><span class="gv" data-k="cookie">-</span></div>',
    '<div class="gr"><span class="gk">expira sessao</span><span class="gv" data-k="timeout">-</span></div>',
    '</div>',
    '<label>Chave de acesso</label><input class="key" type="text" placeholder="cole sua chave" autocomplete="off" spellcheck="false">',
    '<div class="actions"><button class="act primary run">Executar</button>',
    '<button class="act ghost refresh">Atualizar</button>',
    '<button class="act ghost diag">Diagnostico</button></div>',
    '<div class="log"></div>',
    '</div>',
    '<div class="foot"><span>AUTOAVA</span><span>v' + VERSION + '</span></div>'
  ].join('');

  shadow.appendChild(document.createElement('style')).textContent = css;
  shadow.appendChild(wrap);
  document.documentElement.appendChild(host);

  var q = function (s) { return shadow.querySelector(s); };
  var elBadge = q('.badge'), elAv = q('.av'), elName = q('.un'), elSub = q('.us');
  var elKey = q('.key'), elLog = q('.log'), elBar = q('.bar2 i');
  var timer = null;

  function field(k, v) { var el = shadow.querySelector('[data-k="' + k + '"]'); if (el) { el.textContent = v; } }
  function log(msg) {
    var d = document.createElement('div');
    d.textContent = '[' + new Date().toLocaleTimeString('pt-BR') + '] ' + msg;
    elLog.appendChild(d); elLog.scrollTop = elLog.scrollHeight;
  }
  function cookieValue(name) {
    var parts = document.cookie.split(';');
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].trim();
      if (p.indexOf(name + '=') === 0) { return p.slice(name.length + 1); }
    }
    return '';
  }
  function cfg() {
    try { return (window.M && window.M.cfg) || {}; } catch (e) { return {}; }
  }
  function detectUser() {
    var c = cfg();
    var id = c.userId || c.userid || 0;
    var info = '';
    var el = document.querySelector('.logininfo');
    if (el) { info = (el.innerText || '').replace(/\s+/g, ' ').trim(); }
    var menu = document.querySelector('[data-region="user-menu"], .usermenu');
    var menuTxt = menu ? (menu.innerText || '').replace(/\s+/g, ' ').trim() : '';
    var name = '';
    var m = info.match(/acessou como\s+(.+?)\s*\(/i);
    if (m) { name = m[1]; }
    if (!name && menuTxt) {
      name = menuTxt.split('\n')[0].trim();
      if (name.length > 60) { name = name.slice(0, 60); }
    }
    try {
      var img = document.querySelector('img.userpicture');
      if (!name && img && img.getAttribute('alt')) { name = img.getAttribute('alt').trim(); }
    } catch (e) {}
    var logged = !!(parseInt(id, 10) > 0 || name || /(^|\s)loggedin(\s|$)/.test(document.body.className));
    return { id: parseInt(id, 10) || 0, name: name || '', logged: logged, info: info };
  }
  function refresh() {
    var c = cfg();
    var u = detectUser();
    var sess = c.sesskey || '';
    var ck = cookieValue('MoodleSession');
    elBadge.textContent = u.logged ? 'sessao ativa' : 'fora da sessao';
    elBadge.className = u.logged ? 'badge on' : 'badge';
    elName.textContent = u.name || (u.logged ? 'usuario identificado' : 'visitante');
    var initials = (u.name || '?').split(/\s+/).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join('');
    elAv.textContent = initials || '?';
    elSub.textContent = u.logged ? ('userId ' + (u.id || 'n/d') + ' · ' + (location.hostname || '')) : 'sem nome na pagina';
    field('sesskey', sess ? sess.slice(0, 4) + '...' + sess.slice(-2) : 'ausente');
    field('userId', u.id ? String(u.id) : '0');
    field('host', location.hostname || '-');
    field('page', (location.pathname || '/').slice(0, 26));
    var cel = shadow.querySelector('[data-k="cookie"]');
    cel.textContent = ck ? 'lido (' + ck.length + ' chars)' : 'nao visivel';
    cel.className = 'gv ' + (ck ? 'ok' : 'no');
    var t = parseInt(c.sessiontimeout, 10);
    field('timeout', t ? Math.round(t / 3600) + 'h (' + t / 60 + ' min)' : '-');
    return { cfg: c, user: u, cookie: !!ck, sesskey: sess };
  }
  function diagnostics() {
    var d = refresh();
    return {
      versao: VERSION,
      url: location.href,
      host: location.hostname,
      userId: d.user.id,
      nome: d.user.name,
      logininfo: d.user.info,
      logged: d.user.logged,
      sesskey_mascarado: d.sesskey ? d.sesskey.slice(0, 3) + '***' : '',
      sesskey_len: d.sesskey ? d.sesskey.length : 0,
      moodleSession: d.cookie,
      cookies_lidos: document.cookie.split(';').filter(function (x) { return x.trim(); }).length,
      localStorage_keys: Object.keys(localStorage).length,
      sessiontimeout: d.cfg.sessiontimeout || '',
      wwwroot: d.cfg.wwwroot || '',
      courseId: d.cfg.courseId || '',
      body_logged: /(^|\s)loggedin(\s|$)/.test(document.body.className)
    };
  }
  function close() {
    if (timer) { clearInterval(timer); timer = null; }
    document.removeEventListener('keydown', onKey, true);
    host.remove();
    window.__autoava = null;
  }
  function onKey(ev) { if (ev.key === 'Escape') { close(); } }

  try { elKey.value = localStorage.getItem(KEY_STORE) || ''; } catch (e) {}

  q('.x').addEventListener('click', close);
  q('.refresh').addEventListener('click', function () { var u = refresh().user; log('atualizado · ' + (u.name || 'visitante')); });
  q('.diag').addEventListener('click', function () {
    var d = diagnostics();
    var txt = JSON.stringify(d, null, 2);
    navigator.clipboard.writeText(txt).then(function () { log('diagnostico copiado'); }, function () { log('nao deu para copiar'); });
    console.log('[autoava] diagnostico', d);
  });
  q('.run').addEventListener('click', function () {
    var key = (elKey.value || '').trim();
    if (!key) { log('informe a chave'); elKey.focus(); return; }
    var d = refresh();
    if (!d.sesskey) { log('abra a plataforma e clique de novo'); return; }
    if (timer) { return; }
    try { localStorage.setItem(KEY_STORE, key); } catch (e) {}
    var passos = ['lendo sessao', 'lendo usuario', 'validando chave', 'executando', 'concluido'];
    var i = 0;
    elBar.style.width = '8%';
    log('iniciando · ' + (d.user.name || 'visitante') + ' · ' + key.slice(0, 4) + '...');
    timer = setInterval(function () {
      if (i >= passos.length) {
        clearInterval(timer); timer = null; elBar.style.width = '100%';
        log('fim do teste · nenhuma execucao real');
        return;
      }
      elBar.style.width = Math.round(((i + 1) / passos.length) * 100) + '%';
      log(passos[i]); i += 1;
    }, 650);
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

  var first = refresh();
  log('popup carregado em ' + Math.round((Date.now() - started)) + 'ms');
  log(first.user.logged ? ('sessao lida: ' + first.user.name) : 'sem sessao: clique na plataforma logada');
  window.__autoava = { close: close, refresh: refresh, diagnostics: diagnostics, version: VERSION };
})();
