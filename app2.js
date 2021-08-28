

$gameID = "0";
$gameover = 0;
var $colorplayer1;
var $colorplayer2;
var $session_USER;
var $playerONE;
var $playerTWO;
$player = 0;
function init() {
  setTimeout(function () {

    hole_spiel_infos();

  }, 500);

  window.setInterval("ladeSpielZustand()", 700);
  //window.setInterval("refresh()", 500);


}




var $grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

function selectColumn(col) {
  getWinner($grid);

  if ($gameover == 0) {



    //console.log("was ist in USERsessio");
    //console.log($session_USER);
    //console.log($playerONE);

    //document.getElementById("colorTurn").innerHTML = $player;

    //hole_reihenfolge();
    console.log(">Es ist folgender Spieler an der Reihe:)");
    console.log($player);
    if (($player == $session_USER) && ($player == $playerONE)) { // player 1 beginnt

      var index = 5;
      for (index; index >= 0; index--) {
        if ($grid[index][col] == 0) {
          $grid[index][col] = 1;//platzieren
          break;
        }
      }
      updateSpielZustand();
      refreshGrid($grid);
      getWinner($grid);
      if ($gameover == 0) {
        refresh();
        update_reihenfolge($playerTWO);
        console.log("Player 1 hat gelegt");
        console.log("nun ist drann:");
        console.log($player);
      }
      if (!$gameID) {

      }

    }


    if (($player == $session_USER) && ($player == $playerTWO)) {
      var index = 5;
      for (index; index >= 0; index--) {
        if ($grid[index][col] == 0) {
          $grid[index][col] = 2;//platzieren
          break;
        }
      }
      updateSpielZustand();
      refreshGrid($grid);
      getWinner($grid);
      if ($gameover == 0) {
        refresh();
        update_reihenfolge($playerONE);
        console.log("Player 2 hat gelegt");
        console.log("nun ist drann:");
        console.log($player);
      }
    }

    //getWinner($grid);
  }
}
function refreshGrid($grid) {
  // getWinner($grid);
  // ladeSpielZustand();
  //console.log($colorplayer1);
  //  console.log($colorplayer2);
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if ($grid[row][col] == 0) {
        document.getElementById("cell" + row + col).style.backgroundColor = "#FFFFFF";
      } else if ($grid[row][col] == 1) { 
        document.getElementById("cell" + row + col).style.backgroundColor = $colorplayer1;
      } else if ($grid[row][col] == 2) { 
        document.getElementById("cell" + row + col).style.backgroundColor = $colorplayer2;
      }
    }
  }


}
//console.log($grid);

function resetGrid() {
  $gameover = 0;
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, resetGrid: true },
    success: function (response) { //we got the response
      console.log("zurückgesetzt");
      ladeSpielZustand();
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });



}

















//#############################################
//
//
//Spezial Funkionen


// hole die Aktuelle gameID, diese ist beim  User gespeichert in der Tabelle und wird beim aufruf der game2.php geladen


function hole_spiel_infos() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { hole_spiel_id: true },
    success: function (response) { //we got the response

      console.log("DEBUGG hole_spiel_id");
      console.log(response);
      $gameID = response;
      // console.log($gameID);
      hole_color_p1();
      hole_color_p2();
      hole_p1_id();
      hole_p2_id();
      hole_session_USERID();
      ladeSpielZustand();


      hole_reihenfolge();


      // console.log("NACH SUC");
      //  console.log($player);
      //console.log($gameID);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }

  });
}

function hole_farbe_zu_game_und_user() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, hole_farbe_zu_game_und_user: true },
    success: function (response) { //we got the response
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });
}


function hole_color_p1() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, hole_color_p1: true },
    success: function (response) { //we got the response


      //  console.log("DEBUGG hole_color_p1");
      // console.log(response);
      $colorplayer1 = response;
      //  console.log($colorplayer1);
      //ladeSpielZustand();
      //console.log("NACH SUC");
      //  console.log($return);
      //console.log($gameID);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });
}
function hole_color_p2() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, hole_color_p2: true },
    success: function (response) { //we got the response


      //console.log("DEBUGG hole_color_p2");
      // console.log(response);
      $colorplayer2 = response;
      // ladeSpielZustand();
      //console.log("NACH SUC");
      //  console.log($return);
      //console.log($gameID);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });

}

function hole_p1_id() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, hole_p1_id: true },
    success: function (response) { //we got the response


      //  console.log("DEBUGG hole_p1_id");
      //  console.log(response);
      $playerONE = response;
      $player = $playerONE;
      // ladeSpielZustand();
      //console.log("NACH SUC");
      //  console.log($return);
      //console.log($gameID);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });

}
function hole_p2_id() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, hole_p2_id: true },
    success: function (response) { //we got the response


      // console.log("DEBUGG hole_p2_id");
      //  console.log(response);
      $playerTWO = response;
      // ladeSpielZustand();
      //console.log("NACH SUC");
      //  console.log($return);
      //console.log($gameID);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });

}

function hole_session_USERID() {
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { hole_session_USERID: true },
    success: function (response) { //we got the response


      //  console.log("DEBUGG hole_session_USERID");
      //  console.log(response);
      $session_USER = response;
      // ladeSpielZustand();
      //console.log("NACH SUC");
      //  console.log($return);
      //console.log($gameID);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }
  });

}

function hole_reihenfolge() {
  //console.log("gameid");

  //console.log($gameID);
  //console.log("^^^^");
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, hole_reihenfolge: true },

    success: function (response) { //we got the response
      //  console.log("REIHENFDOLGE in der Methode :");
      // console.log(response);

      // console.log("response");
      // console.log(response);
      $player = response;
      // console.log("PLAYER in der Methode :");
      if (($player != $playerONE) && ($player != $playerTWO)) { // wenn reihenfolge noch nicht aus datenbank geholt wurde, warte
        //location.reload();
        console.log("reihenfolge nocht nicht da !!! warten ...:");
        console.log($playerONE);
        console.log($playerTWO);
        console.log($player);

      }
      else {

        console.log("reihenfolge geholt::");
        console.log($player);
        refresh();
      }
    },
    error: function (exception) {
      alert('Exception:', exception);
    }

  });





}





function update_reihenfolge(nextplayer) {

  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, player: nextplayer, update_reihenfolge: true },

  });
  $player = nextplayer;
  //console.log("reihenfolge geändert  in der Methode");
  //console.log($player);


}



function updateSpielZustand() {

  var serializedArr = JSON.stringify($grid);
  //console.log(serializedArr);
  // console.log(colorPicker.val());
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, grid: serializedArr, updateSpielZustand: true },
    /*
    success: function(result) { //we got the response
        alert('Successfully called');
    },
    error: function(exception) {
        alert('Exception:', exception);
    }*/

  });
  console.log("Spielstand gespeichert");
}
//##############################################################################################################################################################

function refresh() {
  console.log("Refresh");

  // document.getElementById("colorTurn").innerHTML = $player;
  if ($player == $playerONE) {
    document.getElementById("colorTurn").style.color = $colorplayer1;
  }
  else {
    document.getElementById("colorTurn").style.color = $colorplayer2;
  }


  
  if ($player == $session_USER) {
    document.getElementById("colorTurn").innerHTML = "Du bist dran"

    if ($gameover == 1) {
      document.getElementById("colorTurn").innerHTML = "-----> 🥳🥳🥳 Du hast gewonnen 🥳🥳🥳<-----";
      document.getElementById("colorTurn").style.color = "#000000";
    }
  }
  else {
    document.getElementById("colorTurn").innerHTML = "Warte auf den Zug deines Gegenspielers";

    if ($gameover == 1) {
      document.getElementById("colorTurn").innerHTML = "-----> ☹️☹️☹️ Du hast verloren ☹️☹️☹️ <-----";
      document.getElementById("colorTurn").style.color =  "#000000";
    }

  }


  if ($gameover == 3) {
    document.getElementById("colorTurn").innerHTML = "--> Unentschieden <--";
    document.getElementById("colorTurn").style.color =  '#000000';
  }






  // }
  //getWinner($grid);
}


function ladeSpielZustand() {
  hole_reihenfolge();
  //console.log("#########laden aufgerufen"); 
  //console.log($gameID);
  // console.log(colorPicker.val());
  $return = 0;
  //document.getElementById("colorTurn").innerHTML = "$player";
  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, ladeSpielZustand: true },
    //dataType: html,
    success: function (response) { //we got the response

      $return = response;
      //
      //console.log("NACH SUC");
      //console.log($return);
      //return($return);
      speicherInArray(response);
    },
    error: function (exception) {
      alert('Exception:', exception);
    }

  });

  getWinner($grid);
  // return($return);

}

function speicherInArray($uebergabe) {
  //console.log("speicherInArray");
  //alert($uebergabe);
  //console.log($uebergabe);

  $uebergabe = $uebergabe.replace(/[^a-zA-Z0-9 ]/g, "");
  // $uebergabe = preg_replace('[', $uebergabe);
  // console.log($uebergabe);


  var colweiter = 0;
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      $grid[row][col] = parseInt($uebergabe[colweiter]);
      colweiter++;
    }
  }

  refreshGrid($grid);

}





function loesche_spiel() {

  $.ajax({
    url: "databaseRequests.php",
    type: "post",
    data: { gameID: $gameID, loesche_spiel: true },
    //dataType: html,
    success: function (response) { //we got the response

    },
    error: function (exception) {
      alert('Exception:', exception);
    }

  });
  alert("Spiel " + $gameID + " wurde gelöscht du wirst zum Hauptmenü gebracht");
  window.location.href = "index.php";

}





function getWinner($grid) {
  // nicht schön aber gut :)
  //horizontal Spalte 1 von links

  if ($grid[5][0] == '1' && $grid[4][0] == '1' && $grid[3][0] == '1' && $grid[2][0] == '1') { $gameover = 1 };
  if ($grid[5][0] == '2' && $grid[4][0] == '2' && $grid[3][0] == '2' && $grid[2][0] == '2') { $gameover = 1 };
  if ($grid[4][0] == '1' && $grid[3][0] == '1' && $grid[2][0] == '1' && $grid[1][0] == '1') { $gameover = 1 };
  if ($grid[4][0] == '2' && $grid[3][0] == '2' && $grid[2][0] == '2' && $grid[1][0] == '2') { $gameover = 1 };
  if ($grid[3][0] == '1' && $grid[2][0] == '1' && $grid[1][0] == '1' && $grid[0][0] == '1') { $gameover = 1 };
  if ($grid[3][0] == '2' && $grid[2][0] == '2' && $grid[1][0] == '2' && $grid[0][0] == '2') { $gameover = 1 };


  //horizontal Spalte 2 von links
  if ($grid[5][1] == '1' && $grid[4][1] == '1' && $grid[3][1] == '1' && $grid[2][1] == '1') { $gameover = 1 };
  if ($grid[5][1] == '2' && $grid[4][1] == '2' && $grid[3][1] == '2' && $grid[2][1] == '2') { $gameover = 1 };
  if ($grid[4][1] == '1' && $grid[3][1] == '1' && $grid[2][1] == '1' && $grid[1][1] == '1') { $gameover = 1 };
  if ($grid[4][1] == '2' && $grid[3][1] == '2' && $grid[2][1] == '2' && $grid[1][1] == '2') { $gameover = 1 };
  if ($grid[3][1] == '1' && $grid[2][1] == '1' && $grid[1][1] == '1' && $grid[0][1] == '1') { $gameover = 1 };
  if ($grid[3][1] == '2' && $grid[2][1] == '2' && $grid[1][1] == '2' && $grid[0][1] == '2') { $gameover = 1 };


  //horizontal Spalte 3 von links
  if ($grid[5][2] == '1' && $grid[4][2] == '1' && $grid[3][2] == '1' && $grid[2][2] == '1') { $gameover = 1 };
  if ($grid[5][2] == '2' && $grid[4][2] == '2' && $grid[3][2] == '2' && $grid[2][2] == '2') { $gameover = 1 };
  if ($grid[4][2] == '1' && $grid[3][2] == '1' && $grid[2][2] == '1' && $grid[1][2] == '1') { $gameover = 1 };
  if ($grid[4][2] == '2' && $grid[3][2] == '2' && $grid[2][2] == '2' && $grid[1][2] == '2') { $gameover = 1 };
  if ($grid[3][2] == '1' && $grid[2][2] == '1' && $grid[1][2] == '1' && $grid[0][2] == '1') { $gameover = 1 };
  if ($grid[3][2] == '2' && $grid[2][2] == '2' && $grid[1][2] == '2' && $grid[0][2] == '2') { $gameover = 1 };

  //horizontal Spalte 4 von links
  if ($grid[5][3] == '1' && $grid[4][3] == '1' && $grid[3][3] == '1' && $grid[2][3] == '1') { $gameover = 1 };
  if ($grid[5][3] == '2' && $grid[4][3] == '2' && $grid[3][3] == '2' && $grid[2][3] == '2') { $gameover = 1 };
  if ($grid[4][3] == '1' && $grid[3][3] == '1' && $grid[2][3] == '1' && $grid[1][3] == '1') { $gameover = 1 };
  if ($grid[4][3] == '2' && $grid[3][3] == '2' && $grid[2][3] == '2' && $grid[1][3] == '2') { $gameover = 1 };
  if ($grid[3][3] == '1' && $grid[2][3] == '1' && $grid[1][3] == '1' && $grid[0][3] == '1') { $gameover = 1 };
  if ($grid[3][3] == '2' && $grid[2][3] == '2' && $grid[1][3] == '2' && $grid[0][3] == '2') { $gameover = 1 };

  //horizontal Spalte 5 von links
  if ($grid[5][4] == '1' && $grid[4][4] == '1' && $grid[3][4] == '1' && $grid[2][4] == '1') { $gameover = 1 };
  if ($grid[5][4] == '2' && $grid[4][4] == '2' && $grid[3][4] == '2' && $grid[2][4] == '2') { $gameover = 1 };
  if ($grid[4][4] == '1' && $grid[3][4] == '1' && $grid[2][4] == '1' && $grid[1][4] == '1') { $gameover = 1 };
  if ($grid[4][4] == '2' && $grid[3][4] == '2' && $grid[2][4] == '2' && $grid[1][4] == '2') { $gameover = 1 };
  if ($grid[3][4] == '1' && $grid[2][4] == '1' && $grid[1][4] == '1' && $grid[0][4] == '1') { $gameover = 1 };
  if ($grid[3][4] == '2' && $grid[2][4] == '2' && $grid[1][4] == '2' && $grid[0][4] == '2') { $gameover = 1 };

  //horizontal Spalte 6 von links
  if ($grid[5][5] == '1' && $grid[4][5] == '1' && $grid[3][5] == '1' && $grid[2][5] == '1') { $gameover = 1 };
  if ($grid[5][5] == '2' && $grid[4][5] == '2' && $grid[3][5] == '2' && $grid[2][5] == '2') { $gameover = 1 };
  if ($grid[4][5] == '1' && $grid[3][5] == '1' && $grid[2][5] == '1' && $grid[1][5] == '1') { $gameover = 1 };
  if ($grid[4][5] == '2' && $grid[3][5] == '2' && $grid[2][5] == '2' && $grid[1][5] == '2') { $gameover = 1 };
  if ($grid[3][5] == '1' && $grid[2][5] == '1' && $grid[1][5] == '1' && $grid[0][5] == '1') { $gameover = 1 };
  if ($grid[3][5] == '2' && $grid[2][5] == '2' && $grid[1][5] == '2' && $grid[0][5] == '2') { $gameover = 1 };


  //horizontal Spalte 7 von links
  if ($grid[5][6] == '1' && $grid[4][6] == '1' && $grid[3][6] == '1' && $grid[2][6] == '1') { $gameover = 1 };
  if ($grid[5][6] == '2' && $grid[4][6] == '2' && $grid[3][6] == '2' && $grid[2][6] == '2') { $gameover = 1 };
  if ($grid[4][6] == '1' && $grid[3][6] == '1' && $grid[2][6] == '1' && $grid[1][6] == '1') { $gameover = 1 };
  if ($grid[4][6] == '2' && $grid[3][6] == '2' && $grid[2][6] == '2' && $grid[1][6] == '2') { $gameover = 1 };
  if ($grid[3][6] == '1' && $grid[2][6] == '1' && $grid[1][6] == '1' && $grid[0][6] == '1') { $gameover = 1 };
  if ($grid[3][6] == '2' && $grid[2][6] == '2' && $grid[1][6] == '2' && $grid[0][6] == '2') { $gameover = 1 };


  // Vertikal 
  //Winning Combinations erste reihe 
  if ($grid[0][0] == '1' && $grid[0][1] == '1' && $grid[0][2] == '1' && $grid[0][3] == '1') { $gameover = 1 };
  if ($grid[0][0] == '2' && $grid[0][1] == '2' && $grid[0][2] == '2' && $grid[0][3] == '2') { $gameover = 1 };
  if ($grid[0][1] == '1' && $grid[0][2] == '1' && $grid[0][3] == '1' && $grid[0][4] == '1') { $gameover = 1 };
  if ($grid[0][1] == '2' && $grid[0][2] == '2' && $grid[0][3] == '2' && $grid[0][4] == '2') { $gameover = 1 };
  if ($grid[0][2] == '1' && $grid[0][3] == '1' && $grid[0][4] == '1' && $grid[0][5] == '1') { $gameover = 1 };
  if ($grid[0][2] == '2' && $grid[0][3] == '2' && $grid[0][4] == '2' && $grid[0][5] == '2') { $gameover = 1 };
  if ($grid[0][3] == '1' && $grid[0][4] == '1' && $grid[0][5] == '1' && $grid[0][6] == '1') { $gameover = 1 };
  if ($grid[0][3] == '2' && $grid[0][4] == '2' && $grid[0][5] == '2' && $grid[0][6] == '2') { $gameover = 1 };

  //Winning Combinations ezweitereihe 
  if ($grid[1][0] == '1' && $grid[1][1] == '1' && $grid[1][2] == '1' && $grid[1][3] == '1') { $gameover = 1 };
  if ($grid[1][0] == '2' && $grid[1][1] == '2' && $grid[1][2] == '2' && $grid[1][3] == '2') { $gameover = 1 };
  if ($grid[1][1] == '1' && $grid[1][2] == '1' && $grid[1][3] == '1' && $grid[1][4] == '1') { $gameover = 1 };
  if ($grid[1][1] == '2' && $grid[1][2] == '2' && $grid[1][3] == '2' && $grid[1][4] == '2') { $gameover = 1 };
  if ($grid[1][2] == '1' && $grid[1][3] == '1' && $grid[1][4] == '1' && $grid[1][5] == '1') { $gameover = 1 };
  if ($grid[1][2] == '2' && $grid[1][3] == '2' && $grid[1][4] == '2' && $grid[1][5] == '2') { $gameover = 1 };
  if ($grid[1][3] == '1' && $grid[1][4] == '1' && $grid[1][5] == '1' && $grid[1][6] == '1') { $gameover = 1 };
  if ($grid[1][3] == '2' && $grid[1][4] == '2' && $grid[1][5] == '2' && $grid[1][6] == '2') { $gameover = 1 };


  //Winning Combinations reihe 3 von oben
  if ($grid[2][0] == '1' && $grid[2][1] == '1' && $grid[2][2] == '1' && $grid[2][3] == '1') { $gameover = 1 };
  if ($grid[2][0] == '2' && $grid[2][1] == '2' && $grid[2][2] == '2' && $grid[2][3] == '2') { $gameover = 1 };
  if ($grid[2][1] == '1' && $grid[2][2] == '1' && $grid[2][3] == '1' && $grid[2][4] == '1') { $gameover = 1 };
  if ($grid[2][1] == '2' && $grid[2][2] == '2' && $grid[2][3] == '2' && $grid[2][4] == '2') { $gameover = 1 };
  if ($grid[2][2] == '1' && $grid[2][3] == '1' && $grid[2][4] == '1' && $grid[2][5] == '1') { $gameover = 1 };
  if ($grid[2][2] == '2' && $grid[2][3] == '2' && $grid[2][4] == '2' && $grid[2][5] == '2') { $gameover = 1 };
  if ($grid[2][3] == '1' && $grid[2][4] == '1' && $grid[2][5] == '1' && $grid[2][6] == '1') { $gameover = 1 };
  if ($grid[2][3] == '2' && $grid[2][4] == '2' && $grid[2][5] == '2' && $grid[2][6] == '2') { $gameover = 1 };

  //Winning Combinations reihe 3 von unten
  if ($grid[3][0] == '1' && $grid[3][1] == '1' && $grid[3][2] == '1' && $grid[3][3] == '1') { $gameover = 1 };
  if ($grid[3][0] == '2' && $grid[3][1] == '2' && $grid[3][2] == '2' && $grid[3][3] == '2') { $gameover = 1 };
  if ($grid[3][1] == '1' && $grid[3][2] == '1' && $grid[3][3] == '1' && $grid[3][4] == '1') { $gameover = 1 };
  if ($grid[3][1] == '2' && $grid[3][2] == '2' && $grid[3][3] == '2' && $grid[3][4] == '2') { $gameover = 1 };
  if ($grid[3][2] == '1' && $grid[3][3] == '1' && $grid[3][4] == '1' && $grid[3][5] == '1') { $gameover = 1 };
  if ($grid[3][2] == '2' && $grid[3][3] == '2' && $grid[3][4] == '2' && $grid[3][5] == '2') { $gameover = 1 };
  if ($grid[3][3] == '1' && $grid[3][4] == '1' && $grid[3][5] == '1' && $grid[3][6] == '1') { $gameover = 1 };
  if ($grid[3][3] == '2' && $grid[3][4] == '2' && $grid[3][5] == '2' && $grid[3][6] == '2') { $gameover = 1 };

  //Winning Combinations vorletzte letzte reihe
  if ($grid[4][0] == '1' && $grid[4][1] == '1' && $grid[4][2] == '1' && $grid[4][3] == '1') { $gameover = 1 };
  if ($grid[4][0] == '2' && $grid[4][1] == '2' && $grid[4][2] == '2' && $grid[4][3] == '2') { $gameover = 1 };
  if ($grid[4][1] == '1' && $grid[4][2] == '1' && $grid[4][3] == '1' && $grid[4][4] == '1') { $gameover = 1 };
  if ($grid[4][1] == '2' && $grid[4][2] == '2' && $grid[4][3] == '2' && $grid[4][4] == '2') { $gameover = 1 };
  if ($grid[4][2] == '1' && $grid[4][3] == '1' && $grid[4][4] == '1' && $grid[4][5] == '1') { $gameover = 1 };
  if ($grid[4][2] == '2' && $grid[4][3] == '2' && $grid[4][4] == '2' && $grid[4][5] == '2') { $gameover = 1 };
  if ($grid[4][3] == '1' && $grid[4][4] == '1' && $grid[4][5] == '1' && $grid[4][6] == '1') { $gameover = 1 };
  if ($grid[4][3] == '2' && $grid[4][4] == '2' && $grid[4][5] == '2' && $grid[4][6] == '2') { $gameover = 1 };

  //Winning Combinations letzte reihe
  if ($grid[5][0] == '1' && $grid[5][1] == '1' && $grid[5][2] == '1' && $grid[5][3] == '1') { $gameover = 1 };
  if ($grid[5][0] == '2' && $grid[5][1] == '2' && $grid[5][2] == '2' && $grid[5][3] == '2') { $gameover = 1 };
  if ($grid[5][1] == '1' && $grid[5][2] == '1' && $grid[5][3] == '1' && $grid[5][4] == '1') { $gameover = 1 };
  if ($grid[5][1] == '2' && $grid[5][2] == '2' && $grid[5][3] == '2' && $grid[5][4] == '2') { $gameover = 1 };
  if ($grid[5][2] == '1' && $grid[5][3] == '1' && $grid[5][4] == '1' && $grid[5][5] == '1') { $gameover = 1 };
  if ($grid[5][2] == '2' && $grid[5][3] == '2' && $grid[5][4] == '2' && $grid[5][5] == '2') { $gameover = 1 };
  if ($grid[5][3] == '1' && $grid[5][4] == '1' && $grid[5][5] == '1' && $grid[5][6] == '1') { $gameover = 1 };
  if ($grid[5][3] == '2' && $grid[5][4] == '2' && $grid[5][5] == '2' && $grid[5][6] == '2') { $gameover = 1 };




  // Quer von links unten kommend 1

  if ($grid[2][0] == '1' && $grid[3][1] == '1' && $grid[4][2] == '1' && $grid[5][3] == '1') { $gameover = 1 };
  if ($grid[2][0] == '2' && $grid[3][1] == '2' && $grid[4][2] == '2' && $grid[5][3] == '2') { $gameover = 1 };



  // Quer von links unten kommend 1+1

  if ($grid[1][0] == '1' && $grid[2][1] == '1' && $grid[3][2] == '1' && $grid[4][3] == '1') { $gameover = 1 };
  if ($grid[1][0] == '2' && $grid[2][1] == '2' && $grid[3][2] == '2' && $grid[4][3] == '2') { $gameover = 1 };
  if ($grid[2][1] == '1' && $grid[3][2] == '1' && $grid[4][3] == '1' && $grid[5][4] == '1') { $gameover = 1 };
  if ($grid[2][1] == '2' && $grid[3][2] == '2' && $grid[4][3] == '2' && $grid[5][4] == '2') { $gameover = 1 };




  // Quer von links unten kommend 1+2

  if ($grid[0][0] == '1' && $grid[1][1] == '1' && $grid[2][2] == '1' && $grid[3][3] == '1') { $gameover = 1 };
  if ($grid[0][0] == '2' && $grid[1][1] == '2' && $grid[2][2] == '2' && $grid[3][3] == '2') { $gameover = 1 };
  if ($grid[1][1] == '1' && $grid[2][2] == '1' && $grid[3][3] == '1' && $grid[4][4] == '1') { $gameover = 1 };
  if ($grid[1][1] == '2' && $grid[2][2] == '2' && $grid[3][3] == '2' && $grid[4][4] == '2') { $gameover = 1 };
  if ($grid[2][2] == '1' && $grid[3][3] == '1' && $grid[4][4] == '1' && $grid[5][5] == '1') { $gameover = 1 };
  if ($grid[2][2] == '2' && $grid[3][3] == '2' && $grid[4][4] == '2' && $grid[5][5] == '2') { $gameover = 1 };

  // Quer von links unten kommend 1+1+2
  if ($grid[0][1] == '1' && $grid[1][2] == '1' && $grid[2][3] == '1' && $grid[3][4] == '1') { $gameover = 1 };
  if ($grid[0][1] == '2' && $grid[1][2] == '2' && $grid[2][3] == '2' && $grid[3][4] == '2') { $gameover = 1 };
  if ($grid[1][2] == '1' && $grid[2][3] == '1' && $grid[3][4] == '1' && $grid[4][5] == '1') { $gameover = 1 };
  if ($grid[1][2] == '2' && $grid[2][3] == '2' && $grid[3][4] == '2' && $grid[4][5] == '2') { $gameover = 1 };
  if ($grid[2][3] == '1' && $grid[3][4] == '1' && $grid[4][5] == '1' && $grid[5][6] == '1') { $gameover = 1 };
  if ($grid[2][3] == '2' && $grid[3][4] == '2' && $grid[4][5] == '2' && $grid[5][6] == '2') { $gameover = 1 };



  // Quer von links unten kommend 1+1+1

  if ($grid[0][2] == '1' && $grid[1][3] == '1' && $grid[2][4] == '1' && $grid[3][5] == '1') { $gameover = 1 };
  if ($grid[0][2] == '2' && $grid[1][3] == '2' && $grid[2][4] == '2' && $grid[3][5] == '2') { $gameover = 1 };
  if ($grid[1][3] == '1' && $grid[2][4] == '1' && $grid[3][5] == '1' && $grid[4][6] == '1') { $gameover = 1 };
  if ($grid[1][3] == '2' && $grid[2][4] == '2' && $grid[3][5] == '2' && $grid[4][6] == '2') { $gameover = 1 };



  // Quer von links unten kommend 1

  if ($grid[0][3] == '1' && $grid[1][4] == '1' && $grid[2][5] == '1' && $grid[3][6] == '1') { $gameover = 1 };
  if ($grid[0][3] == '2' && $grid[1][4] == '2' && $grid[2][5] == '2' && $grid[3][6] == '2') { $gameover = 1 };








  //--------------


  // Quer von rechts unten kommend 1

  if ($grid[3][0] == '1' && $grid[2][1] == '1' && $grid[1][2] == '1' && $grid[0][3] == '1') { $gameover = 1 };
  if ($grid[3][0] == '2' && $grid[2][1] == '2' && $grid[1][2] == '2' && $grid[0][3] == '2') { $gameover = 1 };



  // Quer von rechts unten kommend 1+1

  if ($grid[4][0] == '1' && $grid[3][1] == '1' && $grid[2][2] == '1' && $grid[1][3] == '1') { $gameover = 1 };
  if ($grid[4][0] == '2' && $grid[3][1] == '2' && $grid[2][2] == '2' && $grid[1][3] == '2') { $gameover = 1 };
  if ($grid[3][1] == '1' && $grid[2][2] == '1' && $grid[1][3] == '1' && $grid[0][4] == '1') { $gameover = 1 };
  if ($grid[3][1] == '2' && $grid[2][2] == '2' && $grid[1][3] == '2' && $grid[0][4] == '2') { $gameover = 1 };




  // Quer von rechts unten kommend 1+2

  if ($grid[5][0] == '1' && $grid[4][1] == '1' && $grid[3][2] == '1' && $grid[2][3] == '1') { $gameover = 1 };
  if ($grid[5][0] == '2' && $grid[4][1] == '2' && $grid[3][2] == '2' && $grid[2][3] == '2') { $gameover = 1 };
  if ($grid[4][1] == '1' && $grid[3][2] == '1' && $grid[2][3] == '1' && $grid[1][4] == '1') { $gameover = 1 };
  if ($grid[4][1] == '2' && $grid[3][2] == '2' && $grid[2][3] == '2' && $grid[1][4] == '2') { $gameover = 1 };
  if ($grid[3][2] == '1' && $grid[2][3] == '1' && $grid[1][4] == '1' && $grid[0][5] == '1') { $gameover = 1 };
  if ($grid[3][2] == '2' && $grid[2][3] == '2' && $grid[1][4] == '2' && $grid[0][5] == '2') { $gameover = 1 };

  // Quer von rechts unten kommend 1+1+2
  if ($grid[5][1] == '1' && $grid[4][2] == '1' && $grid[3][3] == '1' && $grid[2][4] == '1') { $gameover = 1 };
  if ($grid[5][1] == '2' && $grid[4][2] == '2' && $grid[3][3] == '2' && $grid[2][4] == '2') { $gameover = 1 };
  if ($grid[4][2] == '1' && $grid[3][3] == '1' && $grid[2][4] == '1' && $grid[1][5] == '1') { $gameover = 1 };
  if ($grid[4][2] == '2' && $grid[3][3] == '2' && $grid[2][4] == '2' && $grid[1][5] == '2') { $gameover = 1 };
  if ($grid[3][3] == '1' && $grid[2][4] == '1' && $grid[1][5] == '1' && $grid[0][6] == '1') { $gameover = 1 };
  if ($grid[3][3] == '2' && $grid[2][4] == '2' && $grid[1][5] == '2' && $grid[0][6] == '2') { $gameover = 1 };



  // Quer von rechts unten kommend 1+1+1

  if ($grid[5][2] == '1' && $grid[4][3] == '1' && $grid[3][4] == '1' && $grid[2][5] == '1') { $gameover = 1 };
  if ($grid[5][2] == '2' && $grid[4][3] == '2' && $grid[3][4] == '2' && $grid[2][5] == '2') { $gameover = 1 };
  if ($grid[4][3] == '1' && $grid[3][4] == '1' && $grid[2][5] == '1' && $grid[1][6] == '1') { $gameover = 1 };
  if ($grid[4][3] == '2' && $grid[3][4] == '2' && $grid[2][5] == '2' && $grid[1][6] == '2') { $gameover = 1 };



  // Quer von rechts unten kommend 1

  if ($grid[5][3] == '1' && $grid[4][4] == '1' && $grid[3][5] == '1' && $grid[2][6] == '1') { $gameover = 1 };
  if ($grid[5][3] == '2' && $grid[4][4] == '2' && $grid[3][5] == '2' && $grid[2][6] == '2') { $gameover = 1 };



  //check for draw überprüfe ob die oberste Zeile voll ist und davor kein Gewinner existiert 
  if ($gameover == 0) {

    var index = 0;
    for (index; index <= 7; index++) {
      if (!($grid[0][index] == 0)) {
        console.log($grid[0][index]);
        $gameover = 3;
      }
      else { // spielfeld ist noch nicht voll
        $gameover = 0;
        break;
      }
    }
  }

}

function winnertext() {

}