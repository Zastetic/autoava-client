// ==UserScript==
// @name         AutoAVA ferramenta
// @namespace    https://www.autoava.us/ferramenta
// @version      0.5.12
// @description  Carrega a ferramenta AutoAVA na aba da plataforma. Nao pede senha: usa a sessao ja aberta.
// @author       AutoAVA
// @match        https://educacaoprofissional.educacao.sp.gov.br/*
// @match        https://saladofuturo.educacao.sp.gov.br/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==
(function () {
  'use strict';

  // Idempotente: se a ferramenta ja esta na pagina, nao injeta de novo.
  if (document.getElementById('autoava-loader')) { return; }

  // O userscript e so um carregador: o codigo real vem sempre do dominio,
  // entao correcao e kill switch valem sem o aluno reinstalar nada.
  var urls = [
    'https://www.autoava.us/ferramenta/client.js?v=userscript',
    'https://zastetic.github.io/autoava-client/client.js?v=userscript'
  ];

  function go(i) {
    if (i >= urls.length) {
      console.warn('AutoAVA: nao foi possivel carregar a ferramenta (sem internet?).');
      return;
    }
    var s = document.createElement('script');
    s.id = 'autoava-loader';
    s.src = urls[i];
    s.onerror = function () {
      var e = document.getElementById('autoava-loader');
      if (e) { e.remove(); }
      go(i + 1);
    };
    (document.head || document.documentElement).appendChild(s);
  }

  go(0);
})();
