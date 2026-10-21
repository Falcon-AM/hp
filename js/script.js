// スライドショー（ファーストビュー）を抜けたらヘッダーを表示する
(function () {
  var header = document.getElementById('siteHeader');
  var hero = document.getElementById('hero');
  var nav = document.getElementById('siteNav');
  var btn = document.getElementById('menuBtn');
  function closeMenu() {
    nav.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function update() {
    var bottom = hero.getBoundingClientRect().bottom;
    var visible = bottom <= header.offsetHeight;
    header.classList.toggle('is-visible', visible);
    if (!visible) closeMenu();
  }
  // ハンバーガーメニューの開閉
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // LINEボタン：PC（901px以上）はQRコードをポップアップ、スマホ・タブレットは友達追加画面へ遷移
  var modal = document.getElementById('qrModal');
  var pc = window.matchMedia('(min-width: 901px)');
  document.querySelectorAll('.js-line').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (pc.matches && modal && modal.showModal) {
        e.preventDefault();
        modal.showModal();
      }
    });
  });
  if (modal) {
    document.getElementById('qrClose').addEventListener('click', function () { modal.close(); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); }); // 枠外クリックで閉じる
  }
})();
