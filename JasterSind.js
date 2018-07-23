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
        $(this).animate({
              backgroundColor: colorsList[n_colors - 1]
            }, 350, "swing");
          } else {
            $(this).animate({
              backgroundColor: colorsList[(act_ind - 1) % (n_colors)]
            }, 350, "swing");

          }
          // console.log('using SHIFT and click, cycling backwards colours');
        }

    else {
      if (act_ind < 0) {
        $(this).animate({
          backgroundColor: colorsList[0]
        }, 350, "swing");
      } else {  
        $(this).animate({
          backgroundColor: colorsList[(act_ind + 1) % (n_colors)]
        }, 350, "swing");
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
  
  // console.log('actual configuration: ', configuration);

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
//funzione check tra soluzione e tentativo
function check(arrayTry, arraySol) {
  var arrayResult = [2,2,2,2];  
  var i,j;
  for (i = 0; i < arrayTry.length; i=i+1)
    for (j = 0; j < arraySol.length; j=j+1) {
      if(arrayTry[i]==arraySol[j]){
        if(i==j)
        //rosso: pos e col
          arrayResult[i]=0;
        else
        //bianco: col
          arrayResult[i]=1;
      }
    }
  return arrayResult.sort();
}

//funzione risposta pallini rossi/bianchi rispetto alla soluzione
function answerTry(arrayAns) {
  var i;
  for(i = 0; i<arrayAns.length; i = i+1){
    if(arrayAns[i]==0)
      console.log()
    if(arrayAns[i]==1) 
      console.log()
    else
      console.log()
  }
  return arrayResult.sort();
}