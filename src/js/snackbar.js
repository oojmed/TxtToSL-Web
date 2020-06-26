let snackbars = ['update'];

export function showSnackbar(name) {
  let c = document.getElementById('snackbar').className;

  document.getElementById('snackbar').className = '';

  if (name !== undefined) {
    setTimeout(function() {
      for (const s of snackbars.filter(x => x !== name)) {
        document.getElementById(`snackbar-${s}`).className = '';
      }

      document.getElementById('snackbar').className = 'show';

      document.getElementById('snackbar-' + name).className = 'show';
    }, c === '' ? 0 : 1000);
  }
}

export function init() {
  document.getElementById('refresh').onclick = function() {
    window.location.href = window.location.href;
  };

  document.getElementById('ignore-snackbar').onclick = function() {
    showSnackbar();
  };
}