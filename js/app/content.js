console.log("yes"); 
$("body").prepend("\
  <div class='wfit-container'>\
    <div class='wfit-wrapper'>\
        <div class='wfit-row wfit-header-row'>\
          <span class='wfit-logo'><img src=''></span>\
            <span class='wfit-header'>Style Inspector</span>\
            <span id='end-session' class='wfit-end-btn'>End</span>\
        </div>\
        <div class='wfit-box'>\
          <div class='wfit-title'>Live Inspector</div>\
          <div class='wfit-row'>\
            <span class='wfit-label wfit-half'>Family</span>\
            <span class='wfit-label wfit-half'>Size</span>\
            <span id='font-family-holder' class='wfit-half'>Arial</span>\
            <span id='font-size-holder' class='wfit-half'>14px</span>\
          </div>\
          <div class='wfit-row'>\
            <span class='wfit-label wfit-half'>Color</span>\
            <span class='wfit-label wfit-half'>Background</span>\
            <span class='wfit-half'>\
              <span class='wfit-color-box wfit-boxes'>\
                <span id='color-holder'>#dsada</span>\
              </span>\
            </span>\
            <span class='wfit-half'>\
              <span class='wfit-background-color-box wfit-boxes'>\
                <span id='background-color-holder'>#dsada</span>\
              </span>\
            </span>\
          </div>\
        </div>\
        <div class='wfit-box'>\
          <div class='wfit-title'>Colors on this page</div>\
          <div class='wfit-row wfit-color'>\
            <span class='wfit-label wfit-half'>FONT COLORS</span>\
            <span class='wfit-label wfit-half'>BG COLORS</span>\
          </div>\
          <hr>\
          <div class='wfit-row wfit-row-scroll'>\
            <div id='wfit-color-history'>\
              <ul class='wfit-ul'></ul>\
            </div>\
          </div>\
          <div class='wfit-row wfit-row-scroll'>\
            <div id='wfit-background-history'>\
              <ul class='wfit-ul'></ul>\
            </div>\
          </div>\
        </div>\
        <div class='wfit-box'>\
          <div class='wfit-title'>Fonts on this page</div>\
          <div id='wfit-font-history' class='wfit-row-scroll'>\
            <ul class='wfit-ul'></ul>\
          </div>\
        </div>\
        <div class='wfit-row'>\
          <span class='wfit-credits'>Designed and Developed by <a href='http://yassershaikh.com' target='_blank'>Yasser Shaikh</a></span>\
        </div>\
      </div>\
  </div>\
  "); 
 
var url = chrome.extension.getURL('icons/logo.png'); 
console.log(url); 
$(".wfit-logo img").attr("src", url); 
 /*
$("body").prepend("\
  <div class='wfit-history'>\
    <span class='wfit-left-tab-header1'>Page History</span>\
    <div id='wfit-color-history'>\
      <span class='wfit-left-tab-header2'>Font colors on this page:</span>\
      <ul class='wfit-ul'></ul>\
    </div>\
    <div id='wfit-background-history'>\
      <span class='wfit-left-tab-header2'>Background colors on this page:</span>\
      <ul class='wfit-ul'></ul>\
    </div>\
  </div>\
  "); */
 
var fontHistory = []; 
var fontcolorHistory = []; 
var backgroundcolorHistory = []; 
 
$(".wfit-end-btn").click(function(){ 
  $(".wfit-container").remove(); 
  $(".wfit-history").remove(); 
}); 
 
$('*').hover(function(e) { 
    hoverElem = $(this); 
    var fonts = hoverElem.css("font-family"); 
    var currentFont = fonts.split(/,\s*/)[0]; 
     
    // right tab 
    $("#font-family-holder").html(currentFont); 
    $("#font-size-holder").html(hoverElem.css("font-size")); 
     
    var currentFontColor = hoverElem.css("color"); 
    currentFontColor = rgbToHex(currentFontColor); 
    $("#color-holder").html(currentFontColor); 
    $("#color-holder").css("color", fontColor(currentFontColor)); 
    $(".wfit-color-box").css("background-color", currentFontColor); 
     
    var currentBackgroundColor = hoverElem.css("background-color"); 
    currentBackgroundColor = rgbToHex(currentBackgroundColor); 
    $("#background-color-holder").html(currentBackgroundColor); 
    $("#background-color-holder").css("color", fontColor(currentBackgroundColor)); 
    $(".wfit-background-color-box").css("background-color", currentBackgroundColor); 
 
    // left tab 
    if(fontHistory.indexOf(currentFont) == -1){ 
      fontHistory.push(currentFont); 
      $(".wfit-wrapper").find('#wfit-font-history ul').append("<li>" + currentFont + "</li>"); 
    } 
 
    if(fontcolorHistory.indexOf(currentFontColor) == -1){ 
      fontcolorHistory.push(currentFontColor); 
      $(".wfit-wrapper").find('#wfit-color-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentFontColor + "; color:" + fontColor(currentBackgroundColor) + ";'>" + currentFontColor + "</span></li>"); 
    } 
 
    if(backgroundcolorHistory.indexOf(currentBackgroundColor) == -1){ 
      backgroundcolorHistory.push(currentBackgroundColor); 
      $(".wfit-wrapper").find('#wfit-background-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentBackgroundColor + "; color:" + fontColor(currentBackgroundColor) + ";'>"  +  currentBackgroundColor + "</span></li>"); 
    } 
     
}); 
 
function rgbToHex(input){ 
  var rgb = input; 
  try{ 
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i); 
     return (rgb && rgb.length === 4) ? "#" + 
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + 
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + 
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : ''; 
  } 
  catch(exception){ 
    return input; 
  } 
}

function fontColor(hexColor){
  console.log(hexColor);
  console.log(hexColor.substring(1,2) < '7');
  if(hexColor.substring(1,2) < '7')
    return 'white';
  return 'black';
}