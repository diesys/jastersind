$(document).ready(function () {
  var colorsList = ["#f23553", "#f7d843", "#69e569", "#406df6", "#9351d3", "#db46be", "#ec8c34", "#36e1ec", "#ececec"];//, "#1f1f1f"];
  var colorsListM = ["#F23553", "#F7D843", "#69E569", "#406DF6", "#9351D3", "#DB46BE", "#EC8C34", "#36E1EC", "#ECECEC"];//, "#1F1F1F"];
  var n_colors = 9;
  var configuration = [];

  $('.try.dot').bind("click", function (e) {
    var act_clrRGB = $(this).css('background-color');
    var act_clr = rgb2hex(act_clrRGB);
    var act_ind = Math.max(colorsList.indexOf(act_clr), colorsListM.indexOf(act_clr));
    
    if (e.shiftKey) {
      if (act_ind < 1) {
        $(this).css("background-color", colorsList[n_colors - 1]);
      } else {
        $(this).css("background-color", colorsList[(act_ind - 1) % (n_colors)]);
      }
      // console.log('using SHIFT and click, cycling backwards colours');
    }

    else {
      if (act_ind < 0) {
        $(this).css("background-color", colorsList[0]);
      } else {  
        $(this).css("background-color", colorsList[( act_ind + 1 ) % (n_colors)]);
      }
      // console.log('using click, cycling forward colours');
    }
    // console.log('Before click:', act_clr, act_ind);
    
  });


  $('.dot.sol').each(function(){
    var clr = colorsList[Math.floor(Math.random() * (n_colors))];
    $(this).css('background-color', clr);
    configuration.push(clr);
    // console.log('select color: ' ,clr);
  });
  
  console.log('actual configuration: ', configuration);

});

 function getUrlVars() {
   var vars = {};
   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
     vars[key] = value;
   });
   return vars;
 }

 function rgb2hex(orig) {
   var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
   return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
 }