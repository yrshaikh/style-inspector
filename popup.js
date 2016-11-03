document.addEventListener('DOMContentLoaded', function (tab) {
  chrome.tabs.executeScript(null, { file: "content.js" });
  window.close();
});
