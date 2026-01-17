
const BLUR_CLASS = 'blur-youtube-thumbnails';

function isHomepage() {
  return location.pathname === '/' || location.pathname.startsWith('/feed');
}

function applyBlur(enabled) {
  if (enabled && isHomepage()) {
    document.documentElement.classList.add(BLUR_CLASS);
  } else {
    document.documentElement.classList.remove(BLUR_CLASS);
  }
}

chrome.storage.sync.get(['enabled'], (res) => {
  applyBlur(res.enabled !== false);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    applyBlur(changes.enabled.newValue);
  }
});

setInterval(() => {
  chrome.storage.sync.get(['enabled'], (res) => {
    applyBlur(res.enabled !== false);
  });
}, 1500);
