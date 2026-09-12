/* Browser demo only: real accounts and payments require a server ledger. */
(() => {
  const key = 'fr_coins';
  const button = document.getElementById('coinBalance');
  const dialog = document.getElementById('coinDialog');
  const status = document.getElementById('coinStatus');
  let storageOK = true;
  function balance() {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) { localStorage.setItem(key, '5'); return 5; }
      const n = Number(raw);
      return Number.isSafeInteger(n) && n >= 0 ? n : 0;
    } catch { storageOK = false; return 0; }
  }
  function render() {
    const n = balance();
    if (button) {
      button.textContent = '🪙 ' + n + ' Coins';
      button.setAttribute('aria-label', n + ' Coins verfügbar. Angebote öffnen');
    }
    return n;
  }
  function open() {
    render();
    if (!dialog) return;
    status.textContent = storageOK ? 'Demo: Zahlungen sind noch nicht angeschlossen.' : 'Das Guthaben kann nicht gespeichert werden. Bitte erlaube die Speicherung im Browser.';
    document.getElementById('coinTitle').textContent = balance() === 0 ? 'Leider ist Ihr Guthaben aufgebraucht.' : 'Coin-Pakete';
    if (!dialog.open) dialog.showModal();
  }
  window.FRCoins = {
    balance: render,
    spend() {
      const n = render();
      if (!storageOK || n < 1) { open(); return false; }
      try { localStorage.setItem(key, String(n - 1)); }
      catch { storageOK = false; open(); return false; }
      render();
      return true;
    },
    open
  };
  button?.addEventListener('click', open);
  document.getElementById('closeCoinDialog')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.querySelectorAll('[data-package]').forEach(option => option.addEventListener('click', () => {
    dialog.querySelectorAll('[data-package]').forEach(item => item.setAttribute('aria-pressed', String(item === option)));
    status.textContent = option.dataset.package + ' ausgewählt. Noch keine Zahlung möglich; es werden keine Coins gutgeschrieben.';
  }));
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) render(); });
  window.addEventListener('focus', render);
  render();
})();
