let snackbars = ["update", "install"];

export function showSnackbar(name) {
  let c = document.getElementById("snackbar").className;

  document.getElementById("snackbar").className = "";

  if (name !== undefined) {
    setTimeout(function() {
      for (const s of snackbars.filter(x => x !== name)) {
        document.getElementById(`snackbar-${s}`).className = "";
      }

      document.getElementById("snackbar").className = "show";

      document.getElementById("snackbar-" + name).className = "show";
    }, c === "" ? 0 : 1000);
  }
}

export function init() {
  document.getElementById("refresh").onclick = function() {
    window.location.href = window.location.href;
  };

  document.getElementById("install").onclick = function() {
    showSnackbar();

    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt

    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  };

  document.getElementById("no-snackbar").onclick = function() {
    showSnackbar();
  };
}