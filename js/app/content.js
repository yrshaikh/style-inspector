setTimeout(function(){
  //$("#wfit-color-history").mCustomScrollbar();
  //$("#bg-color-box").mCustomScrollbar();
}, 300);

var firstScrollAttached = false;
function attachFirstScroll() {
  if(!firstScrollAttached)  {
    firstScrollAttached = true;
    $(".wfit-no-sel").hide();
    $(".wfit-family-sel").show();
    $('.wfit-main').css("height", window.innerHeight-90); 
    setTimeout(function(){
      $("#font-color-box").mCustomScrollbar();
      $("#bg-color-box").mCustomScrollbar();
      $('.wfit-main').mCustomScrollbar();
    }, 300)
  }
}

$("html").prepend("\
  <div class='wfit-wrap1 wfit-wrap1--right'>\
    <div class='wfit-wrap2'>\
        <div class='wfit-head' style='box-sizing:content-box;'>\
          <span class='wfit-logo'><img src=''></span>\
            <span class='wfit-title'>Style Inspector</span>\
            <a class='wfit-close'>\
            <img src=''/>\
            </a>\
        </div>\
        <div class='wfit-main'>\
	        <div class='box'>\
	          <div class='wfit-label wfit-big-label'>Live Inspector</div>\
            <div class='wfit-no-sel'>\
            <span>Hover over text on the webpage to view their Styles</span>\
              <img src=''/>\
            </div>\
            <div class='wfit-family-sel' style='display:none;'>\
	           <div class='wfit-row paddingtop10 wfit-family'>\
  	            <span class='wfit-label wfit-small-label width50percent'>Family</span>\
  	            <span class='wfit-label wfit-small-label width50percent'>Size</span>\
  	            <span id='font-family-holder' class='width50percent wfit-font18 yellow'>Arial</span>\
  	            <span id='font-size-holder' class='width50percent wfit-font18 yellow'>14px</span>\
              </div>\
  	          <div class='wfit-row'>\
  	            <span class='wfit-label wfit-small-label width50percent'>Color</span>\
  	            <span class='wfit-label wfit-small-label width50percent'>Background</span>\
  	            <span class='width50percent'>\
  	              <span class='colorbox wfit-boxes'>\
  	                <span id='color-holder'>#</span>\
  	              </span>\
  	            </span>\
  	            <span class='width50percent'>\
  	              <span id='background-color-box' class='colorbox wfit-boxes'>\
  	                <span id='background-color-holder'>#</span>\
  	              </span>\
  	            </span>\
  	          </div>\
            </div>\
	        </div>\
	        <div class='box wfit-row'>\
	          <div class='wfit-label wfit-big-label'>Colors on this page</div>\
	          <div class='wfit-row wfit-color paddingtop10'>\
	            <span id='font-color' class='wfit-label wfit-small-label width50percent wfit-active'>FONT COLORS</span>\
	            <span id='bg-color' class='wfit-label wfit-small-label width50percent'>BG COLORS</span>\
	          </div>\
	          <div id='font-color-box' class='wfit-row'>\
	            <div id='wfit-color-history' class=''>\
	            </div>\
	          </div>\
	          <div id='bg-color-box' class='wfit-row' style='display:none;'>\
	            <div id='wfit-background-history' class=''>\
	            </div>\
	          </div>\
	        </div>\
	        <div class='box paddingtop10 row'>\
	          <div class='title wfit-label wfit-big-label'>Fonts on this page</div>\
	          <div id='wfit-font-history' class='paddingtop10'>\
	            <div class='wfit-ul yellow wfit-font18'></div>\
	          </div>\
	        </div>\
	        <div class='wfit-footer'>\
	          <span class='wfit-credits'>Designed by <a href='//www.linkedin.com/in/omar-faizan-44253a41/' target='_blank'>Omar Faizan</a></span>\
	          <span class='wfit-credits'>Developed by <a href='//www.linkedin.com/in/alirizvi2008/' target='_blank'>Ali Rizvi</a> & <a href='//www.linkedin.com/in/yrshaikh/' target='_blank'>Yasser Shaikh</a></span>\
	        </div>\
        </div>\
      </div>\
  </div>\
  ");

$('head').append('<link href="https://fonts.googleapis.com/css?family=Raleway:400,600,700|Titillium+Web" rel="stylesheet">')

var url = chrome.extension.getURL('icons/logo.png');
var crossUrl = chrome.extension.getURL('icons/close.png');
var noSelectionUrl = chrome.extension.getURL('icons/no-selection.png');
$(".wfit-logo img").attr("src", url);
$(".wfit-close img").attr("src", crossUrl);
$(".wfit-no-sel img").attr("src", noSelectionUrl);

var fontHistory = [];
var fontcolorHistory = [];
var backgroundcolorHistory = [];

$(".wfit-close").click(function(){
  $(".wfit-wrap1").remove();
  $(".wfit-history").remove();
});

$("#wfit-color-history div, #wfit-background-history div").on("click", ".wfit-li span", function(e){
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


$("#wfit-color-history div, #wfit-background-history div").on("mouseover", ".wfit-li span", function(e){
  var $this = $(this);
  $this.data('initialText', $this.text());
  $this.text("COPY");
});


$("#wfit-color-history div, #wfit-background-history div").on("mouseout", ".wfit-li span", function(e){
  var $this = $(this);
  $this.text($this.data('initialText'));
});

$.fn.descendantOf = function(element) {
    element = $(element)[0];
    var current = this;
    var body    = document.body;
    while (current && current != element && current != document.body) {
        current = $(current).parent()[0];
    }
    if (typeof(current) == "undefined" || typeof(current) == "null") {
        return false;
    } else if (current == element) {
        return true;
    } else if (current == document.body) {
        return false;
    }
}

$('*').hover(function(e) {

    var target = $(e.target);
    hoverElem = $(this);
    if ($(target).descendantOf(".wfit-wrap1")) {
      return;
    }

    var fonts = hoverElem.css("font-family");
    var currentFont = fonts.split(/,\s*/)[0];

    attachFirstScroll();
    // top tab
    $("#font-family-holder").html(currentFont);
    $("#font-size-holder").html(hoverElem.css("font-size"));

    var currentFontColor = hoverElem.css("color");
    currentFontColor = rgbToHex(currentFontColor);
    $("#color-holder").html(currentFontColor);
    $("#color-holder").css("color", fontColor(currentFontColor));
    $(".colorbox").css("background-color", currentFontColor);

    var currentBackgroundColor = hoverElem.css("background-color");
    currentBackgroundColor = rgbToHex(currentBackgroundColor);
    $("#background-color-holder").html(currentBackgroundColor);
    $("#background-color-holder").css("color", fontColor(currentBackgroundColor));
    $("#background-color-box").css("background-color", currentBackgroundColor);

    // bottom tab
    if(fontHistory.indexOf(currentFont) == -1){
      fontHistory.push(currentFont);
      $(".wfit-wrap2").find('#wfit-font-history div').append("<span class='wfit-li'>" + currentFont + "</span>");
    }

    if(fontcolorHistory.indexOf(currentFontColor) == -1){
      fontcolorHistory.push(currentFontColor);
      $(".wfit-wrap2").find('#wfit-color-history').append("<div class='wfit-li wfit-boxes' style='background-color:"  + currentFontColor + "; color:" + fontColor(currentFontColor) + ";'>" + currentFontColor + "</div>");
    }

    if(backgroundcolorHistory.indexOf(currentBackgroundColor) == -1){
      backgroundcolorHistory.push(currentBackgroundColor);
      $(".wfit-wrap2").find('#wfit-background-history').append("<div class='wfit-li wfit-boxes' style='background-color:"  + currentBackgroundColor + "; color:" + fontColor(currentBackgroundColor) + ";'>"  +  currentBackgroundColor + "</div>");
    }

});

$('#bg-color').click(function(){
  $('#font-color-box').hide();
  $('#font-color').removeClass('wfit-active');
  $('#bg-color-box').show();
  $('#bg-color').addClass('wfit-active');
  //$("#bg-color-box").mCustomScrollbar();
});

$('#font-color').click(function(){
  $('#bg-color-box').hide();
  $('#bg-color').removeClass('wfit-active');
  $('#font-color-box').show();
  $('#font-color').addClass('wfit-active');
  //$("#font-color-box").mCustomScrollbar();
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
