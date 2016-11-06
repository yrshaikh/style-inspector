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
$(".wfit-logo img").attr("src", url); 
 
var fontHistory = []; 
var fontcolorHistory = []; 
var backgroundcolorHistory = []; 
 
$(".wfit-end-btn").click(function(){ 
  $(".wfit-container").remove(); 
  $(".wfit-history").remove(); 
});

$("#wfit-color-history ul, #wfit-background-history ul").on("click", "li span", function(e){
  copyToClipboard($(this));
  $(this).text("COPIED");
}); 

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(rgbToHex($(element).css( "background-color" ))).select();
    document.execCommand("copy");
    $temp.remove();
}


$("#wfit-color-history ul, #wfit-background-history ul").on("mouseover", "li span", function(e){
  var $this = $(this);
  $this.data('initialText', $this.text());
  $this.text("COPY");
}); 


$("#wfit-color-history ul, #wfit-background-history ul").on("mouseout", "li span", function(e){
  var $this = $(this);
  $this.text($this.data('initialText'));
}); 

 
$('*').hover(function(e) { 
    hoverElem = $(this); 
    var fonts = hoverElem.css("font-family"); 
    var currentFont = fonts.split(/,\s*/)[0]; 
     
    // top tab 
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
 
    // bottom tab 
    if(fontHistory.indexOf(currentFont) == -1){ 
      fontHistory.push(currentFont); 
      $(".wfit-wrapper").find('#wfit-font-history ul').append("<li>" + currentFont + "</li>"); 
    } 
 
    if(fontcolorHistory.indexOf(currentFontColor) == -1){ 
      fontcolorHistory.push(currentFontColor); 
      $(".wfit-wrapper").find('#wfit-color-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentFontColor + "; color:" + fontColor(currentFontColor) + ";'>" + currentFontColor + "</span></li>"); 
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
  return hexColor.substring(1,2) < '7' ? 'white' : 'black';
}