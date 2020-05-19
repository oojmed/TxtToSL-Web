import { showSnackbar } from '/js/snackbar';

export async function registerSW() {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '') {
    return false; // Disallow registering service worker on localhost
  }

  if ('serviceWorker' in navigator) {
    try {
      /*navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let i = 0; i < registrations.length; i++) {
          registrations[i].unregister().then(function(success) {
            showSnackbar("update");
          });
        }
      });*/

      navigator.serviceWorker.register('/sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
          let newWorker = reg.installing;

          newWorker.addEventListener('statechange', () => {
            switch (newWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  showSnackbar("update"); // Show Update Prompt
                }

                break;
            }
          });
        });
      });
    } catch(e) {
      console.warn('SW registration failed');
    }
  }
}