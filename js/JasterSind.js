// TODO
//
// fare howto da minhex
// attivare l'hover del button submit solo se il set e' composto da 4 colori
// cambiare sfondo
// fare le mosse codificate nell'url, per salvare le partite e per continuarle


// var colorsList = ["#f73030", "#f7d843", "#69e569", "#406df6", "#9351d3", "#db46be", "#ec8c34", "#36e1ec", "#f4f4f4"];
// var n_colors = 9;
var answerCol = ['#df0e0e', "#ffffff"];
var game = [];
    game['solution'] = [],
    game['colors'] = [],
    game['currGuess'] = [-1, -1, -1, -1];
    game['lastClicked'] = "#null";

var movesC = document.getElementById("movesContainer");
var N = 0;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  }); return vars;
}

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
  if (game['currGuess'].indexOf(-1) != -1)
    return;
  
  chk = check(game['solution'], game['currGuess']);
  checkGuess(chk);

  // hai vinto!
  if (chk[0] == 4) {
    // message section
    win_msg = document.createElement("DIV");
    win_msg.classList = "win_message";
    tries = $('.try.dot').length/4;
    win_msg.innerHTML = "You're a Mastermind! You found the combination in " + ((tries == 1) ? '1 try' : tries + ' tries') + ', using ' + game['colors']['length'] + ' colors!';
    document.querySelector('#gameboard').appendChild(win_msg);
    
    // mostra nasconde il necessario a fine partita
    showSolution()
    $("#submit").animate({ opacity: '0' }, 200, "swing");
    $("#submit").attr('style', 'display: none');
    $(".win_message").animate({ opacity: '1' }, 800, "swing");

    // re-enables the color menu for rematch
    $('#clr_select').removeAttr('disabled')
    $('#clr_select').prop("selectedIndex", 0);

  } else {
    game['currGuess'] = [-1, -1, -1, -1];
    newTry();
  }
}

function newTry() {
  // hides the color menu
  $('#color_popup').addClass('hidden')
  // disable click on past tries
  const dots = document.querySelectorAll('.try.dot');
  if (dots.length) {
    for (i = dots.length - 4; i < dots.length; i++) {
      dots[i].classList.add('unclickable')
      dots[i].classList.remove('selected')
      dots[i].onclick = null;
    }
  }

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
  ansC.classList = "answer hidden";

  for (i = 0; i < 2; i++) {
    ansC_sub = document.createElement("OL");
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
  
  if (N >= 0) {
    // da fare meglio? ora cancella il submit e ne ricrea uno...  
    $('#submit').remove();
    btn = document.createElement("A");
    btn.id = "submit";
    btn.onclick = submit;

    btnchk = document.createElement("I")
    btnchk.className = "checkBtn circle";
    btnchk.innerHTML = "&#x2714;";
    // appends elements
    btn.appendChild(btnchk);
    dotsC.appendChild(btn);
  } N++;
}

// fare meglio!!! con le classi css...
function checkGuess(res) {
  dotN = 0
  $('.answer.hidden').removeClass("hidden");
  $('.answer').animate({ opacity: '1'}, 800, "swing");
  for (i = 0; i < res[0]; i++) {
    //clr and pos
    $('#a'+(N-1)+'2d'+dotN).animate({ backgroundColor: answerCol[0]}, 500, "swing");
    $('#a' + (N - 1) + '2d' + dotN).addClass('active')
    dotN++;
  }
  for (i = 0; i < res[1]; i++) {
    //clr
    $('#a'+(N-1)+'2d'+dotN).animate({ backgroundColor: answerCol[1]}, 500, "swing");
    $('#a' + (N - 1) + '2d' + dotN).addClass('active')
    dotN++;
  }
}

function dotClick(e) {
  // not first click => remove selected
  // console.log(e)
  // e ? newClickID = '#' + e.explicitOriginalTarget.id : newClickID = "#null"
  // e ? newClickID = '#' + e.srcElement.id : newClickID = "#null"
  newClickID = '#' + e.srcElement.id
  $(newClickID).toggleClass('selected')

  if (game['lastClicked'] != "#null") { // !first click
    $(game['lastClicked']).removeClass('selected')
  } else {
    $(game['lastClicked']).addClass('selected')
  }

  if (newClickID == game['lastClicked'] && !$('#color_popup').hasClass('hidden')) {
    $('#color_popup').addClass('hidden')
  } else {
    $('#color_popup').removeClass('hidden')
  }

  // updates the last click
  game['lastClicked'] = newClickID
  dotNumber = parseInt(this.id.split('d')[1]);
  // $("#color_popup").show()
  changeColor()
}

function changeColor(e) {
  // console.log(e)

  // fix for the transparent element
  click_on_transp = false
  // console.log(e.id)
  if(e) {
    if(e.id == 'clr-transparent') {
      click_on_transp = true
      clickedID = -1
      e.classList.remove('active')
    } else {
      clickedID = parseInt(e.srcElement.id.split('-')[1])
    } 
    new_color = click_on_transp ? 'rgba(0,0,0,.2)' : game['colors'][clickedID]
    if(!$(game['lastClicked']).hasClass('unclickable')) {
      // new_col = e.srcElement.getAttribute(transparent' ? 'hsla(0,50%,.2)' : game['colors'][clickedID]
      // change the color of the lastClicked dot with the clicked color from menu
      $(game['lastClicked']).animate({
        // backgroundColor: game['colors'][clickedID]
        backgroundColor: new_color
      }, 200, "swing");
      // element clicked wich opened the menu
      click_on_transp ? $(game['lastClicked']).removeClass('active') : $(game['lastClicked']).addClass('active')
      game['currGuess'][game['lastClicked'].split('d')[1]] = clickedID;
    }
  }
  // console.log(new_color)
}

function showSolution() {
  $('.dot.sol').each(function () {
    dotNumber = parseInt(this.id.split('l')[1]);
    var clr = game['colors'][game['solution'][dotNumber]];
    $(this).css('background-color', clr);
  });
  $("#solutionContainer").removeClass('hidden');
  // $("#color_popup").hide()
}


function createGame(n_colors, show = false) {
  // genera la combinazione da indovinare
  game['solution'] = [
    Math.floor(Math.random() * n_colors), Math.floor(Math.random() * n_colors),
    Math.floor(Math.random() * n_colors), Math.floor(Math.random() * n_colors)
  ]
  
  game['currGuess'] = [-1, -1, -1, -1];
  game['lastClicked'] = "#null";
  
  game['colors'] = []
  // recreates the first transparent dot for removing color
  $('#color_popup').empty()
  col_itm = document.createElement("LI")
  col_itm.classList = "color dot menu active"
  col_itm.id = "clr-transparent"
  col_itm.onclick = 'changeColor(this)'
  col_itm.setAttribute('style', 'background:hsla(0, 0%, 10%, 0.6);border-color:rgba(0,0,0,.2)')
  $('#color_popup').append(col_itm)
  // `<li class="color dot menu active" id="clr-transparent" onclick="changeColor(this)" style="background-color:hsla(0, 0%, 20%, 0.2);border-color:rgba(200,200,200,.2)"></li>`
  // $('#color_popup').appendChild(transparent)
  for(i=0; i< n_colors; i++) {
    // divides all rainbow from color number
    game['colors'].push('hsl(' + Math.ceil(i*(360/n_colors+1)) + ',80%,50%)')
    col_itm = document.createElement("LI")
    col_itm.classList = "color dot menu active"
    col_itm.id = "clr-" + i
    col_itm.onclick = changeColor
    col_itm.setAttribute('style', 'background-color:'+game['colors'][i])
    $('#color_popup').append(col_itm)
  }

  // cleans the current game
  $('#movesContainer').empty()
  // creates a new one
  newTry();

  // disables the menu and selects the first one
  $('#clr_select').prop('disabled', 'disabled')

  // hides the win_message
  if ($('.win_message')) {
    $('.win_message').hide()
    $('#solutionContainer').addClass("hidden")
  }

}

/// MODAL PANEL
buttons = document.querySelectorAll(".modal.btn")
buttons.forEach(element => {
  element.addEventListener("click", function () {
    href = element.getAttribute('href')
    document.querySelector('#howtos').classList.remove('hidden')
    document.querySelectorAll('.modal.panel').forEach(element => {
      element.classList.remove('active')
      element.classList.add('hidden')
    })
    if (href != "#close") {
      document.querySelector(href).classList.toggle('active')
      document.querySelector(href).classList.toggle('hidden')
    } else {
      // lets the animation run
      // setTimeout(function () {
      //   document.querySelector('#howtos').classList.add('hidden')
      // }, 700)
    }
    // console.log(href)
  })
})


////////////////////////////////////// MAIN ///////////////////////////

$(document).ready(function () {
  // selects the first option value, menu title
  $('#clr_select').prop("selectedIndex", 0);
});