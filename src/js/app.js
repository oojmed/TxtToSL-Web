const $ = require('jquery');

import { registerSW } from './pwa/register.js';
import * as Theme from './theme';
import * as Snackbar from './snackbar';

let progressKey;
let server = 'https://api.txttosl.com';
let popup;

let progressContainerEl, progressBarEl, progressTextEl;

function formSubmit(e) {
  e.preventDefault();

  if (progressKey !== undefined) { translate(); }

  return false;
}

function getProgressKey() {
  $.get(server + '/api/v1/progress/key', { prefix: 'TTSLWebApp' }, function (data) {
    progressKey = data;
    $('#progressKey').val(data);
  });
}

function setPercentDone(percent) {
  progressBarEl.value = percent;
}

let eventSourceOkay = false;

function setupEventSource() {
  const evtSource = new EventSource(server + '/api/v1/progress/stream?progressKey=' + progressKey);

  console.log(evtSource);

  evtSource.onmessage = function(event) {
    console.log(event.data);

    eventSourceOkay = true;

    const msg = event.data;
    const thirdOfFive = 1.66666666667;

    if (msg.indexOf('Uploaded to:') === -1) {
      progressTextEl.innerText = msg;
    } else {
      progressTextEl.innerText = 'Redirecting...';

      setPercentDone(100);
    }

    //document.getElementById('details-text').scrollTop = document.getElementById('details-text').scrollHeight;

    if (msg === 'Checking integrity of data directories...') {
      setPercentDone(0);
    }

    if (msg === 'Loading autoskips...') {
      setPercentDone(thirdOfFive);
    }

    if (msg === 'Loading phrases...') {
      setPercentDone(thirdOfFive * 2);
    }

    if (msg === 'Loading synonyms...') {
      setPercentDone(thirdOfFive * 3);
    }

    if (msg === 'Interpreting...') {
      setPercentDone(10);
    }

    if (msg.indexOf('Getting word') !== -1) {
      setPercentDone(20);
    }

    if (msg.indexOf('Generating overlay') !== -1) {
      setPercentDone(40);
    }

    if (msg.indexOf('Rendering') !== -1) {
      setPercentDone(60 + (parseInt(msg.split('%')[0].split(' ')[1]) / 5));
    }

    if (msg === 'Uploading...' || msg === 'Redirecting...') {
      setPercentDone(95);
    }
  }
}

function translate() {
  let data = $('#main-form').serialize() + `&redirect=false&progressKey=${progressKey}`;

  $.get(server + '/api/v1/translate', data, function(url) {
    $('#main-form').fadeIn(1000);
    progressContainerEl.className = '';

    popup.src = `${url}.webm`;
    popup.play();

    popup.oncanplay = function() {
      popup.className = 'show';
      popup.oncanplay = undefined;
    };

    getProgressKey();
  });

  setupEventSource();

  $('#main-form').fadeOut(1000);
  progressContainerEl.className = 'show';
}

window.onload = load;

function load() {
  Snackbar.init();
  Theme.init();

  popup = document.getElementById('videoPopup');

  progressContainerEl = document.getElementById('progressContainer');
  progressBarEl = document.getElementById('progressBar');
  progressTextEl = document.getElementById('progressText');

  document.getElementById('main-form').onsubmit = formSubmit;

  document.onkeypress = function() {
    popup.className = '';
  };

  document.onmousedown = function() {
    popup.className = '';
  };

  getProgressKey();
  registerSW();
}