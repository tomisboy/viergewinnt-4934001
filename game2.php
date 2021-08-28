<?php
include "util.php";
//include "databaseRequests.php";
$database = require "connect.php";

session_start();

$loggedIn = isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'];












if (!empty($_SESSION)) {
  echo ("Hallo <b> " . $_SESSION['username']);
  echo (" </b>Du hast die");
  //[10.08.2021 bug mit color] echo '<span style="color:' . $_SESSION['color'] . ' "> ID = ' . $_SESSION['userID'] . '<br>und deine Steinfarbe für dieses Spiel ist die Farbe deiner ID</span>';
  echo (" <b> ID = "  . $_SESSION['userID'] . " </b><br>und deine Steinfarbe für dieses Spiel ist die Farbe des Textes der Reihenfolge ");

  $gameIDphp = $_GET['gameID'];
  echo ("<br> <br> Dein aktuelles Spiel ist die GameID= ");
  print_r($_GET['gameID']);
  echo ("<br>Hier wird dir angezeigt wer gerade am Zug ist: <br><br> ");

  echo '<body onload="updategameID_User(' . htmlspecialchars($gameIDphp) . ',' . $_SESSION['userID'] . ');init()">';
  //echo $_SESSION['color'];

} else {

  echo "<script>alert('Du bist nicht angemeldet, du wirst zur Anmeldemaske geleitet')</script>";
  echo "<script>window.location = 'login.php';</script>";
}




?>



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="src/style-game.css">
  <script src="app2.js"></script>
  <script src="src/util.js"></script>
  <script type="text/javascript" src="src/jquery-3.5.1.min.js"></script>
  <title>Connect Four</title>





</head>



<div id="colorTurn">Bitte Warten</div>


<div id="grid">
  <div class="row">
    <div class="cell" id="cell00" onclick="selectColumn(0)"></div>
    <div class="cell" id="cell01" onclick="selectColumn(1)"></div>
    <div class="cell" id="cell02" onclick="selectColumn(2)"></div>
    <div class="cell" id="cell03" onclick="selectColumn(3)"></div>
    <div class="cell" id="cell04" onclick="selectColumn(4)"></div>
    <div class="cell" id="cell05" onclick="selectColumn(5)"></div>
    <div class="cell" id="cell06" onclick="selectColumn(6)"></div>
  </div>
  <div class="row">
    <div class="cell" id="cell10" onclick="selectColumn(0)"></div>
    <div class="cell" id="cell11" onclick="selectColumn(1)"></div>
    <div class="cell" id="cell12" onclick="selectColumn(2)"></div>
    <div class="cell" id="cell13" onclick="selectColumn(3)"></div>
    <div class="cell" id="cell14" onclick="selectColumn(4)"></div>
    <div class="cell" id="cell15" onclick="selectColumn(5)"></div>
    <div class="cell" id="cell16" onclick="selectColumn(6)"></div>
  </div>
  <div class="row">
    <div class="cell" id="cell20" onclick="selectColumn(0)"></div>
    <div class="cell" id="cell21" onclick="selectColumn(1)"></div>
    <div class="cell" id="cell22" onclick="selectColumn(2)"></div>
    <div class="cell" id="cell23" onclick="selectColumn(3)"></div>
    <div class="cell" id="cell24" onclick="selectColumn(4)"></div>
    <div class="cell" id="cell25" onclick="selectColumn(5)"></div>
    <div class="cell" id="cell26" onclick="selectColumn(6)"></div>
  </div>
  <div class="row">
    <div class="cell" id="cell30" onclick="selectColumn(0)"></div>
    <div class="cell" id="cell31" onclick="selectColumn(1)"></div>
    <div class="cell" id="cell32" onclick="selectColumn(2)"></div>
    <div class="cell" id="cell33" onclick="selectColumn(3)"></div>
    <div class="cell" id="cell34" onclick="selectColumn(4)"></div>
    <div class="cell" id="cell35" onclick="selectColumn(5)"></div>
    <div class="cell" id="cell36" onclick="selectColumn(6)"></div>
  </div>
  <div class="row">
    <div class="cell" id="cell40" onclick="selectColumn(0)"></div>
    <div class="cell" id="cell41" onclick="selectColumn(1)"></div>
    <div class="cell" id="cell42" onclick="selectColumn(2)"></div>
    <div class="cell" id="cell43" onclick="selectColumn(3)"></div>
    <div class="cell" id="cell44" onclick="selectColumn(4)"></div>
    <div class="cell" id="cell45" onclick="selectColumn(5)"></div>
    <div class="cell" id="cell46" onclick="selectColumn(6)"></div>
  </div>
  <div class="row">
    <div class="cell" id="cell50" onclick="selectColumn(0)"></div>
    <div class="cell" id="cell51" onclick="selectColumn(1)"></div>
    <div class="cell" id="cell52" onclick="selectColumn(2)"></div>
    <div class="cell" id="cell53" onclick="selectColumn(3)"></div>
    <div class="cell" id="cell54" onclick="selectColumn(4)"></div>
    <div class="cell" id="cell55" onclick="selectColumn(5)"></div>
    <div class="cell" id="cell56" onclick="selectColumn(6)"></div>
  </div>
</div>





<input type="submit" value="Lösche Spiel" onclick="loesche_spiel()" />
<a href=index.php class="button">Zurück</a>
<a href=impressum.php class="button">Impressum</a>



<form method="post">
  <?php


  echo "<input type=\"submit\" name=\"" . ($loggedIn ? "logout" : "login") . "\" value=\"" . ($loggedIn ? "Ausloggen" : "Einloggen") . "\">";
  ?>
</form>


<?php
if (isset($_POST['logout'])) {
  echo "Ausloggen wurde ausgewählt <br>";
  //userLogout($database, $_SESSION['userID']);

  session_unset();
  session_destroy();
  echo "Sessions gelöscht";

  unset($_POST['logout']);

  echo "<script>alert('Du wurdest abgemeldet, du wirst zur Anmeldemaske geleitet')</script>";
  echo "<script>window.location = 'login.php';</script>";
}
?>
</body>

</html>