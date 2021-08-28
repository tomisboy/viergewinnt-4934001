<?php
include "util.php";
$database = require "connect.php";

session_start();

if (isset($_POST['hole_session_USERID'])) {
    $userID = $_SESSION['userID'];
    print_r($userID);
    unset($_POST['hole_session_USERID']);
}

if (isset($_POST['hole_leere_spiel'])) {
    //print_r($_POST);
    $arrayresult = 0;
    $playerone = $_POST['playerONE'];


    $query =  "SELECT gameID FROM `games` WHERE PLAYERTWO = 0 AND playerONE != $playerone";
    $arrayresult =  mysqli_query($database, $query);
    $rows = array();
    while ($row = $arrayresult->fetch_assoc()) {
        $rows[] = $row;
    }

    $result = $rows;

    $ruckarray = ("");
    foreach ($result as &$value) {
        $ruckarray .= ($value['gameID']);
        $ruckarray .= ",";
    }
    //   print_r  ($value[0]);echo(",");
    // print_r($ruckarray);
    $newarraynama = rtrim($ruckarray, ", ");
    print_r($newarraynama);

    unset($_POST['hole_leere_spiel']);
}

if (isset($_POST['hole_deine_spiel'])) {
    $player = $_POST['player'];

    $query =  "SELECT * FROM `games` WHERE ((playerONE = $player OR playerTWO = $player) AND playerTWO != 0)";

    $arrayresult =  mysqli_query($database, $query);

    $rows = array();
    while ($row = $arrayresult->fetch_assoc()) {
        $rows[] = $row;
    }


    $result = $rows;


    $ruckarray = ("");
    foreach ($result as &$value) {
        $ruckarray .= ($value['gameID']);
        $ruckarray .= ",";
    }
    //   print_r  ($value[0]);echo(",");
    // print_r($ruckarray);
    $newarraynama = rtrim($ruckarray, ", ");
    print_r($newarraynama);

    unset($_POST['hole_deine_spiel']);
}

if (isset($_POST['hole_spiel_id'])) {
    $userID = $_SESSION['userID'];
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT gameID FROM `users` WHERE ID = $userID"));
    //print_r ($arrayresult);
    //  $userID = $_SESSION['userID'];
    $result = $arrayresult['gameID'];
    print_r($result); //irghendwie geht es nur wnen des hier geprinted wird weil es keine Funktion ist
    unset($_POST['hole_spiel_id']);
}

if (isset($_POST['hole_color_p1'])) {
    $gameID = $_POST['gameID'];
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT colorp1 FROM `games` WHERE  gameID = $gameID"));
    //print_r ($arrayresult);
    //print_r ($arrayresult);
    $result = $arrayresult["colorp1"];
    print_r($result);
    unset($_POST['hole_color_p1']);
}

if (isset($_POST['hole_color_p2'])) {
    $gameID = $_POST['gameID'];
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT colorp2 FROM `games` WHERE  gameID = $gameID"));
    // print_r ($arrayresult);
    //print_r ($arrayresult);
    $result = $arrayresult["colorp2"];
    print_r($result);
    unset($_POST['hole_color_p2']);
}

if (isset($_POST['hole_p1_id'])) {
    $gameID = $_POST['gameID'];
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT playerONE FROM `games` WHERE  gameID = $gameID"));
    // print_r ($arrayresult);
    //print_r ($arrayresult);
    $result = $arrayresult["playerONE"];
    print_r($result);
    unset($_POST['hole_p1_id']);
}

if (isset($_POST['hole_p2_id'])) {
    $gameID = $_POST['gameID'];
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT playerTWO FROM `games` WHERE  gameID = $gameID"));
    // print_r ($arrayresult);
    //print_r ($arrayresult);
    $result = $arrayresult["playerTWO"];
    print_r($result);
    unset($_POST['hole_p2_id']);
}

if (isset($_POST['hole_reihenfolge'])) {
    $gameID = $_POST['gameID'];
    // print_r ($gameID);
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT reihenfolge FROM `games` WHERE  gameID = $gameID"));
    // print_r ($arrayresult);
    // print_r ($arrayresult);
    $result = $arrayresult["reihenfolge"];
    print_r($result);
    unset($_POST['hole_reihenfolge']);
}

if (isset($_POST['update_reihenfolge'])) {
    $gameID = $_POST['gameID'];
    $wer_ist_dran = $_POST['player'];
    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "UPDATE games SET reihenfolge = $wer_ist_dran  WHERE  gameID = $gameID"));
    // print_r ($arrayresult);
    //print_r ($arrayresult);
    $result = $arrayresult["reihenfolge"];
    print_r($result);
    unset($_POST['update_reihenfolge']);
}

if (isset($_POST['updateSpielZustand'])) {
    // print_r($_POST);
    $grid = $_POST['grid'];
    $gameID = $_POST['gameID'];
    $grid = "\"" . $grid . "\"";
    SQLRequest($database, "UPDATE games SET spielZustand = $grid WHERE gameID = $gameID ");
    unset($_POST['updateSpielZustand']);
}

if (isset($_POST['ladeSpielZustand'])) {
    $gameID = $_POST['gameID'];

    $arrayresult = mysqli_fetch_assoc(SQLRequest($database, "SELECT spielZustand FROM `games` WHERE  gameID = $gameID"));
    //print_r ($arrayresult);
    $result = $arrayresult["spielZustand"];
    print_r($result);
    unset($_POST['ladeSpielZustand']);
}

if (isset($_POST['updategameID_User'])) {
    print_r($_POST);
    $gameID = $_POST['gameIDphp'];
    $userID = $_POST['userID'];
    SQLRequest($database, "UPDATE users SET gameID = $gameID WHERE id = $userID ");
    unset($_POST['updategameID_User']);
}

if (isset($_POST['spiel_erstellen'])) {
    //print_r($_POST);
    $user = $_POST['playerONE'];
    SQLRequest($database, "INSERT INTO `games` (`playerONE`) VALUES ($user) ;");
    $neue_gameID = mysqli_fetch_assoc(SQLRequest($database, "SELECT gameID FROM games ORDER BY gameID DESC LIMIT 1"));
    $gameid = ($neue_gameID['gameID']);
    print_r($neue_gameID['gameID']);
    //Speichere die Farbe von Player 1 ins Spiel

    $color = mysqli_fetch_assoc(SQLRequest($database, "SELECT color FROM users WHERE id = $user"));
    //print_r($color['color']);
    $color = $_SESSION['color'];
    SQLRequest($database, "UPDATE games SET colorp1 = '$color' WHERE gameID = $gameid");
    //init grid
    $initgrid = "[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]";
    SQLRequest($database, "UPDATE games SET spielZustand = '$initgrid' WHERE gameID = $gameid");
    SQLRequest($database, "UPDATE games SET reihenfolge = $user WHERE gameID = $gameid");
    unset($_POST['spiel_erstellen']);
}

if (isset($_POST['spiel_registrieren'])) {
    //print_r ($_POST);
    $user = $_POST['playerTWO'];
    $gameid = $_POST['gameID'];
    SQLRequest($database, "UPDATE games SET playerTwo = '$user' WHERE gameID = $gameid");
    $color = mysqli_fetch_assoc(SQLRequest($database, "SELECT color FROM users WHERE id = $user"));
    //print_r($color['color']);
    //Überprüfen
    #####
    $color = $_SESSION['color'];
    SQLRequest($database, "UPDATE games SET colorp2 = '$color' WHERE gameID = $gameid");
    unset($_POST['spiel_registrieren']);
}

if (isset($_POST['resetGrid'])) {
    $gameid = $_POST['gameID'];
    $initgrid = "[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]";
    SQLRequest($database, "UPDATE games SET spielZustand = '$initgrid' WHERE gameID = $gameid");
    unset($_POST['resetGrid']);
}

if (isset($_POST['loesche_spiel'])) {
    $gameid = $_POST['gameID'];
    SQLRequest($database, "DELETE FROM games WHERE gameID = $gameid");
    unset($_POST['loesche_spiel']);

}

if (isset($_POST['changeColor'])) {
    $background = $_POST['color'];
    $_SESSION['color'] = $background;
    $userID = $_SESSION['userID'];
    SQLRequest($database, "UPDATE users SET color = '$background' WHERE id = $userID");
    unset($_POST['changeColor']);
}
