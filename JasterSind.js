$(document).ready(function () {
  var colorsList = ["#F23553", "#F7D843", "#69E569", "#406DF6", "#9351D3", "#DB46BE", "#EC8C34", "#36E1EC", "#ECECEC"]//, "#1F1F1F"];
  var n_colors = 9;
  var configuration = [];

  $('.try.dot').bind("click", function () {
    var act_clr = colorsList.indexOf(rgb2hex($(this).css('background-color'))); //get this css color, convert to hex, get its index in the color list
    var index = 0;
    if (index <= n_colors) {
      var clr = colorsList[ (act_clr) % n_colors]; //get next clr in list
      $(this).css('background-color', clr);

      console.log(clr);
    }
  });
  
  $('.dot.sol').each(function(){
    var clr = colorsList[Math.floor(Math.random() * (n_colors))];
    $(this).css('background-color', clr);
    configuration.push(clr);
    // console.log('select color: ' ,clr);
  });
  console.log('actual configuration: ',configuration);

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