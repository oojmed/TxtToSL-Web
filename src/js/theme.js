let switcherLight, switcherDark;

let matchMedia = window.matchMedia('(prefers-color-scheme: light)');

matchMedia.addEventListener('change', (e) => {
  loadDefaultColorScheme();
});

function loadDefaultColorScheme() {
  let theme = localStorage.getItem('theme') || (matchMedia.matches ? 'light' : 'dark');

  document.documentElement.setAttribute('data-theme', theme);

  switcherUI(theme);

  return theme;
}

function manualChangeTheme(theme) {
  localStorage.setItem('theme', theme);

  loadDefaultColorScheme();
}

function switcherUI(theme) {
  if (theme === 'light') {
    switcherDark.style.display = 'block';
    switcherLight.style.display = 'none';
  } else {
    switcherDark.style.display = 'none';
    switcherLight.style.display = 'block';
  }
}

export function init() {
  switcherLight = document.getElementById('theme-switcher-light');
  switcherDark = document.getElementById('theme-switcher-dark');

  switcherLight.onclick = () => {
    manualChangeTheme('light');
  };

  switcherDark.onclick = () => {
    manualChangeTheme('dark');
  };

  loadDefaultColorScheme();
}