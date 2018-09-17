var colorsList = ["#f23553", "#f7d843", "#69e569", "#406df6", "#9351d3", "#db46be", "#ec8c34", "#36e1ec", "#ececec"];//, "#1f1f1f"];
var colorsListM = ["#F23553", "#F7D843", "#69E569", "#406DF6", "#9351D3", "#DB46BE", "#EC8C34", "#36E1EC", "#ECECEC"];//, "#1F1F1F"];
var n_colors = 9;
var configuration = [];
var lastGuess = [-1, -1, -1, -1];

var N = 0;

function dotClick (e) {
  // which dot am I?
  dotNumber = parseInt(this.id.split('d')[1]);

  colIx = lastGuess[dotNumber];
  // il caso iniziale va trattato, ahimè, a parte
  if (colIx == -1)
    colIx = (e.shiftKey) ? n_colors - 1: 0;
  else
    colIx = lastGuess[dotNumber] + ((e.shiftKey)?-1:1) + n_colors;
  lastGuess[dotNumber] = colIx % n_colors;
  $(this).animate({ backgroundColor: colorsList[colIx % n_colors] }, 350, "swing");

}

$(document).ready(function () {

  $('.try.dot').bind("click", dotClick);

  // genera la combinazione da indovinare
  for (i = 0; i < 4; i++)
    configuration.push(Math.floor(Math.random() * n_colors));

  // !!temporaneamente visualizzo la soluzione, poi da cancellare
  $('.dot.sol').each(function(){
    dotNumber = parseInt(this.id.split('l')[1]);
    var clr = colorsList[configuration[dotNumber]];
    $(this).css('background-color', clr);
  });
  //

  newTry();

  // add submit button dinamically at startup
  dotsC = document.getElementById("move"+(N-1));

  btn = document.createElement("A");
  btn.id = "submit";
  btn.classList = "button_submit";
  btn.onclick = submit;
  //btn.href = "";

  btnchk = document.createElement("I")
  btnchk.classList = "fa fa-check fa-lg";

  btn.appendChild(btnchk);
  dotsC.appendChild(btn);

  // console.log('actual configuration: ', configuration);

});

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
/*
function rgb2hex(orig) {
  var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
  return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
}
*/
//funzione check tra soluzione e tentativo
/*
function old_check(arrayTry, arraySol) {
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
*/

function check (trg, gss) {
  res = [0,0]
  target = trg.slice(0);
  guess = gss.slice(0);
  for (i = 0; i < guess.length; i++)
    if (target[i] == guess[i]) {
      target[i] = guess[i] = undefined;
      res[0]+=1;
    }
  for (i = 0; i < guess.length; i++)
    if ((guess[i] != undefined) && (target.indexOf(guess[i])!=-1)) {
      target[target.indexOf(guess[i])] = undefined;
      res[1]++;
    }
  return res;
}


function submit () {
  if (lastGuess.indexOf(-1) != -1)
    return;
  chk = check(configuration, lastGuess);
  // colorare i pallini...
  console.log(chk);
  showRes(chk);
  if (chk[0] == 4) {
    //p = document.createElement("H1");
    //p.innerHTML = '';
    //document.getElementById("movesContainer").appendChild(p);
    // mag section
    $(".mag").fadeIn( "slow", function() {});

    window.scrollTo(0,document.body.scrollHeight);
    //
  } else {
    lastGuess = [-1, -1, -1, -1];
    newTry();
  }
}


//funzione risposta pallini rossi/bianchi rispetto alla soluzione
/*
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
*/

function newTry() {
  movesC = document.getElementById("movesContainer");
  dotsC = document.createElement("OL");

  dotsC.id = "move" + N;
  dotsC.classList = "dotsContainer";

  for (i = 0; i < 4; i++) {
    dot = document.createElement("LI");
    dot.classList = "try dot";
    dot.id = "m" + N + "d" + i;
    dot.onclick = dotClick;
    dotsC.appendChild(dot);
  }
  movesC.appendChild(dotsC);

  ansC = document.createElement("DIV");
  ansC.classList = "answer";

  for (i = 0; i < 2; i++) {
    ansC_sub = document.createElement("DIV");
    ansC_sub.classList = "answer_l" + i;

    for (j = 0; j < 2; j++) {
      dotlet = document.createElement("LI");
      dotlet.id = ("a" + N + "2d") + (2*i + j);
      dotlet.classList = "dot_answ";
      ansC_sub.appendChild(dotlet);
    }
    ansC.appendChild(ansC_sub);
  }
  dotsC.appendChild(ansC);
  if (N) dotsC.appendChild(document.getElementById("submit"));

  N++;
}


function showRes (res) {
  dotN = 0
  for (i = 0; i < res[0]; i++) {
    $('#a'+(N-1)+'2d'+dotN).css('background-color', 'blue');
    dotN++;
  }
  for (i = 0; i < res[1]; i++) {
    $('#a'+(N-1)+'2d'+dotN).css('background-color', 'purple');
    dotN++;
  }
}
