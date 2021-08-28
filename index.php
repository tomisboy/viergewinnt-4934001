<?php
include "util.php";

$database = require "connect.php";

session_start();

if (!empty($_SESSION) && $_SESSION['loggedIn']) {
    //  echo $_SESSION['userID'];
    // echo $_SESSION['username'];
    // echo $_SESSION['color'];
} else {

    echo "<script>alert('Du bist nicht angemeldet, du wirst zur Anmeldemaske geleitet')</script>";
    echo "<script>window.location = 'login.php';</script>";
}


?>
<?php
$loggedIn = isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'];
?>
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

if (isset($_POST['login'])) {
    header("location: login.php");

    unset($_POST['login']);
}
?>
<?php
$loggedIn = isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'];
?>
<html lang="de">

<head>
    <title>Vier-Gewinnt</title>
    <link rel="stylesheet" href="src/style.css">

    <script src="src/colorHandler.js"></script>
    <script src="src/sessionHandler.js"></script>
    <script src="src/util.js"></script>
    <script type="text/javascript" src="src/jquery-3.5.1.min.js"></script>
</head>


<?php

echo '<body onload="initColor(), init_index(' . htmlspecialchars($_SESSION['userID']) . ')">';
?>


<div id="kopf">

    <form method="post">
        <?php
        echo "<input type=\"submit\" name=\"" . ($loggedIn ? "logout" : "login") . "\" value=\"" . ($loggedIn ? "Ausloggen" : "Einloggen") . "\">";
        ?>
    </form>



    Hallo <b> <?php
                echo $_SESSION['username'] ?> </b>schön dich zu sehen! <br>

    Willkommen bei 4-Gewinnt Multiplayer.

    Um ein Spiel gegen andere Personen zu erstellen, wähle unten beim Colorpicker deine Steinfarbe aus und Klicke dann auf den "Spiel erstellen" Knopf. <br>
    Anschließend muss du warten, bis ein anderer Spieler dieses Spielherausforderung annimmt. Geschieht dies taucht dieses Spiel im pinken Kasten zum Beitreten auf.
    <br>
    <br>

</div>






<div id="mitte">
    <br>
    <h3> Spiel erstellen </h3> <br>
    Um ein Spiel zuerstellen, wähle zuerst im Colorpicker deine gewünschte Steinfarbe aus.
    <br>Die Farbe gilt dann nur für dieses eine Spiel (welches erstellt wird) und kann nicht geändert werden! Drücke anschließend auf Spiel erstellen.<br>
    <?php
    $color = $_SESSION['color'];
    echo '<button class="button" onclick="spiel_erstellen(' . htmlspecialchars($_SESSION['userID']) . ')">Spiel erstellen</button>';
    echo "<input id='colorPicker' type='color' title='Farbe ändern' onchange='changeColor()' value='$color'>"
    ?>
    <br>
    Warte nun bis ein andere Spieler deine Herausfoderung im blauen Kasten annimmst, dann taucht das Spiel zum Beitreten im pinken Kasten auf <br> <br>
</div>

<div id="lobby">
    <!-- eDIV BOX lobby -->

    <H3> <br> Liste der freien Spiele zum Registrieren: </H3>
    <div id="left">
        <br> Hier findest du Spiele bzw. Herausfoderung anderer Spieler, denen du dich anschließend kannst.
        <br> Wichtig: Durch das Klicken einer dieser Knöpfe, bist du in dieses Spiel eingetragen und musst auch Spielen.
        <br>Die beim Colorpicker aktuell angezeigte Farbe ist, bzw. wird deine Steinfarbe für dieses Spiel. <br> Diese kannst du vor dem Klicken eines Knöpfe auch wechseln.
        <br>Sobald du jedoch einmal mit der Steinfarbe registriert bist, kannst du diese für das laufende Spiel nicht mehr ändern.
        <br>
        <br>
    </div>
</div><!-- ende der divbox ------ lobby-->



<div id="eigene_Spiele">
    <!--  DIV BOX eigene_Spiele -->
    <br>
    <H3> Liste der offen Spiele zum Beitreten: </H3>
    <br> Hier siehst du deine aktuellen (offenen) Spiele. <br> Du kannst diese jederzeit über das Klicken auf einen der Knöpfe aufrufen.
    <br>
    <br>
    <!-- 
ende der divbox ------ eigene_Spiele
-->
</div>



<div id="impressum">
<a href="impressum.php" class="buttonlobby-link" > Impressum</a>
</div>

</body>

</html>