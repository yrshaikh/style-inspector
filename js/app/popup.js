document.addEventListener('DOMContentLoaded', function (tab) { 
  chrome.tabs.executeScript(null, { file: "js/app/content.js" }); 
  window.close(); 
});