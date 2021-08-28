function init_index(ubergeben_userID) {
  $session_userID = ubergeben_userID;

  window.setInterval("hole_leere_spiel()", 1000);
  window.setInterval("hole_deine_spiel()", 1000);


}



function updategameID_User(ubergeben_gameIDphp, ubergeben_session_userID) {
  //   console.log(ubergeben_gameIDphp);
  //  console.log(ubergeben_session_userID);
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameIDphp: ubergeben_gameIDphp, userID: ubergeben_session_userID, updategameID_User: true }

    //data: {$_POST['gameID'], $_SESSION['userID'], updategameID_User: true},/*

    /*
    success: function(result) { //we got the response
        alert('Successfully called');
    },
    error: function(jqxhr, status, exception) {
        alert('Exception:', exception);
    }*/

  });
  console.log("Game ID gespeichert");
}





function spiel_registrieren(ubergeben_userID, ubergeben_gameID) {
  console.log(ubergeben_userID);
  console.log(ubergeben_gameID);
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { playerTWO: ubergeben_userID, gameID: ubergeben_gameID, spiel_registrieren: true }

    //data: {$_POST['gameID'], $_SESSION['userID'], updategameID_User: true},/*

    /*
    success: function(result) { //we got the response
        alert('Successfully called');
    },
    error: function(jqxhr, status, exception) {
        alert('Exception:', exception);
    }*/

  });
  console.log("Spiel beigetretten");
}


function spiel_erstellen(ubergeben_userID) {
  console.log(ubergeben_userID);
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { playerONE: ubergeben_userID, spiel_erstellen: true },
    success: function (result) { //we got the response
      alert("Das Spiel mit der ID " + result + " wurde erstellt");
    }
    //data: {$_POST['gameID'], $_SESSION['userID'], updategameID_User: true},/*

  });

  console.log("Game erstellt");
}




function hole_leere_spiel() {

  //  console.log(ubergeben_userID);
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { playerONE: $session_userID, hole_leere_spiel: true },
    success: function (response) { //we got the response

      leerespiele = response.split(',');
      leerespiele.forEach(element => {



        console.log(document.querySelector('button[titel=Spiel' + element + ']'));

        if (!(document.querySelector('button[titel=Spiel' + element + ']'))) // schaue ob die Buttons schon existieren, überspringe das erste mal (counter !=0)
        {


          if (element != 0) {
            let btn = document.createElement("button");
            btn.innerHTML = "Für Spiel " + element + " registrieren";
            btn.setAttribute("type", "submit");
            btn.setAttribute("id", element);
            btn.setAttribute("class", "buttonlobby");
            btn.setAttribute("titel", "Spiel" + element);
            btn.onclick = function () { spiel_registrieren($session_userID, element), alert("spiel" + element + " beigetreten"), window.location.reload() };
            var br = document.createElement("br");


            var myDiv = document.getElementById("lobby");
            myDiv.appendChild(btn);
            myDiv.appendChild(br);
            myDiv.appendChild(br);
          }
        }

      });



    },


  });

  console.log("Lobby Aktualisiert");
}






function hole_deine_spiel() {

  //  console.log(ubergeben_userID);
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { player: $session_userID, hole_deine_spiel: true },
    success: function (response) { //we got the response
      spiele = response.split(',');
      spiele.forEach(element => {

        console.log(document.querySelector("[title=Spiel" + element + "]"));
        console.log(document.querySelector('button[titel=Spiel' + element + ']'));

        if (!(document.querySelector("[title=Spiel" + element + "]")))// schaue ob die Buttons schon existieren, überspringe das erste mal (counter !=0)
        {

          if (element != 0) {
            newlink = document.createElement('a');
            newlink.innerHTML = 'Spiel ID ' + element + " beitreten";
            newlink.setAttribute('title', "Spiel" + element);
            newlink.setAttribute('class', "buttonlobby-link");
            newlink.setAttribute('href', 'game2.php' + '?gameID=' + element);
            var br = document.createElement("br");


            var myDiv = document.getElementById("eigene_Spiele");
            myDiv.appendChild(newlink);
            myDiv.appendChild(br);
            myDiv.appendChild(br);
          }

        }
      });


    },
    //data: {$_POST['gameID'], $_SESSION['userID'], updategameID_User: true},/*

  });

  console.log("Deine Spiele Geladen Aktualisiert");
}




