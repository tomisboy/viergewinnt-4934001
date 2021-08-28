<html lang="de">

<head>
    <title>Anmeldung</title>
    <link rel="stylesheet" href="src/style.css">
</head>
<br> <br> <br>
<div class="center login">
    <h1>Login</h1>
    <div class="loginbox">
        <form method="post" action="">
            <br> <br>
            <input id="ident" type="text" name="identifier" class="width100" placeholder="Gebe hier deine Email-Adresse oder Benutzernamen ein" required autofocus autocomplete="username nickname">
            <input id="password" type="password" name="password" class="width100" placeholder="Gebe hier dein Passwort ein" required minlength=4 autocomplete="current-password">

            <br>
            <div>
                <input type="submit" value="Einloggen">

            </div>
            <br> <br> <br> <br> <br> <br>
            Noch keinen Account ? Dann registriere dich hier:

            <a href='register.php' , class="button">Registrieren</a>
            <a href="impressum.php" class="button"> Impressum</a>
        </form>

    </div>
</div>
</body>

<?php
session_start();

if ((isset($_POST['identifier'])) && (isset($_POST['password']))) {
    $_SESSION['loggedIn'] = false;

    include "util.php";
    $database = require('connect.php');

    $safe_ident = mysqli_real_escape_string($database, $_POST['identifier']);

    if (filter_var($safe_ident, FILTER_VALIDATE_EMAIL)) {
        $db_ident = "mail";
    } else {
        $db_ident = "username";
    }
    $result = SQLRequest($database, "SELECT * FROM users WHERE " . $db_ident . " = '" . $safe_ident . "';");
    $knownUser = false;
    if ($dataReceived = mysqli_fetch_assoc($result)) {
        // echo("Step 1 ");
        //print_r($dataReceived);
        if ($dataReceived['confirmed']) {
            //   echo("Step 2 ");
            if (true) {
                // echo("Step 3 ");
                if (password_verify($_POST['password'], $dataReceived['password'])) {
                    $result = SQLRequest($database, "UPDATE users SET active = 1 WHERE " . $db_ident . " = '" . $safe_ident . "';");
                    //  echo("JA");
                    $knownUser = true;

                    $_SESSION['loggedIn'] = true;
                    $_SESSION['userID'] = $dataReceived['id'];
                    $_SESSION['username'] = $dataReceived['username'];
                    $_SESSION['name'] = $dataReceived['name'];
                    $_SESSION['email'] = $dataReceived['mail'];
                    $_SESSION['color'] = $dataReceived['color'];
                    $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
                    // echo "Hallo " . $_SESSION['userID'] ;
                    if ($dataReceived['age']) {
                        $_SESSION['age'] = $dataReceived['age'];
                    }

                    if ($dataReceived['gender']) {
                        $_SESSION['gender'] = $dataReceived['gender'];
                    }

                    header("location: index.php");
                }
            } else {
                $knownUser = true;
                echo  "Dieser Benutzer ist bereits eingeloggt!";
            }
        } else {
            $knownUser = true;
            echo  "Dieser Account muss noch bestätigt werden!";
        }
    }

    if (!$knownUser) {
        echo  "Benutzername oder Passwort unbekannt!";
    }
}
?>

</html>