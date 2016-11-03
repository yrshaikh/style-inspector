$("body").prepend("\
	<div class='wfit-container'>\
		<div class='wfit-wrapper'>\
		    <div class='wfit-row wfit-header-row'>\
		    	<span class='wfit-logo'><img src=''></span>\
		        <span class='wfit-header'>Which Font Is This ?</span>\
		    </div>\
		    <div class='wfit-row'>\
		      <span class='wfit-label'>Family:</span>\
		      <span id='font-family-holder'>Arial, asdad,a asdasd,as dasdad,adas</span>\
		    </div>\
		    <div class='wfit-row'>\
		      <span class='wfit-label'>Size:</span>\
		      <span id='font-size-holder'>14px</span>\
		    </div>\
		    <div class='wfit-row'>\
		      <span class='wfit-label'>Color:</span>\
		      <span class='wfit-color-box wfit-boxes'></span>\
		      <span id='color-holder'>#dsada</span>\
		    </div>\
		    <div class='wfit-row'>\
		      <span class='wfit-label'>Background:</span>\
		      <span class='wfit-background-color-box wfit-boxes'></span>\
		      <span id='background-color-holder'>#dsada</span>\
		    </div>\
		    <div class='wfit-row wfit-btn-row'>\
		        <span id='end-session' class='wfit-end-btn'>End this session</span>\
		    </div>\
		    <div class='wfit-row'>\
		      <span class='wfit-credits'>Designed and Developed by <a href='http://yassershaikh.com' target='_blank'>Yasser Shaikh</a></span>\
		    </div>\
	    </div>\
	</div>\
	");

var url = chrome.extension.getURL('logo.png');
console.log(url);
$(".wfit-logo img").attr("src", url);

$("body").prepend("\
	<div class='wfit-history'>\
		<span class='wfit-left-tab-header1'>Page History</span>\
		<div id='wfit-font-history'>\
			<span class='wfit-left-tab-header2'>Font used on this page:</span>\
			<ul class='wfit-ul'></ul>\
		</div>\
		<div id='wfit-color-history'>\
			<span class='wfit-left-tab-header2'>Font colors on this page:</span>\
			<ul class='wfit-ul'></ul>\
		</div>\
		<div id='wfit-background-history'>\
			<span class='wfit-left-tab-header2'>Background colors on this page:</span>\
			<ul class='wfit-ul'></ul>\
		</div>\
	</div>\
	");

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
    $(".wfit-color-box").css("background-color", currentFontColor);
    
    var currentBackgroundColor = hoverElem.css("background-color");
    currentBackgroundColor = rgbToHex(currentBackgroundColor);
    $("#background-color-holder").html(currentBackgroundColor);
    $(".wfit-background-color-box").css("background-color", currentBackgroundColor);

    // left tab
    if(fontHistory.indexOf(currentFont) == -1){
    	fontHistory.push(currentFont);
    	$(".wfit-history").find('#wfit-font-history ul').append("<li>" + currentFont + "</li>");
    }

    if(fontcolorHistory.indexOf(currentFontColor) == -1){
    	fontcolorHistory.push(currentFontColor);
    	$(".wfit-history").find('#wfit-color-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentFontColor + ";'></span>"  + currentFontColor + "</li>");
    }

    if(backgroundcolorHistory.indexOf(currentBackgroundColor) == -1){
    	backgroundcolorHistory.push(currentBackgroundColor);
    	$(".wfit-history").find('#wfit-background-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentBackgroundColor + ";'></span>"  +  currentBackgroundColor + "</li>");
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