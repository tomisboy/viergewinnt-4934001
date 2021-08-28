<html lang="de">

<head>
    <title>Registrieren</title>
    <link rel="stylesheet" href="src/style.css">
</head>

<?php
include "util.php";
$database = require "connect.php";
$correctNick = false;
$correctName = false;
$correctMail = false;
$correctPassword = false;
$age = 0;
if (isset($_POST['nick'])) {
    $username_S = mysqli_real_escape_string($database, htmlentities($_POST['nick']));
    if (mysqli_num_rows(SQLRequest($database, "SELECT * FROM users WHERE username = '$username_S'")) > 0) {
        echo "Es existiert bereits ein Account mit diesem Benutzernamen!<br>";
        $correctNick = false;
    } else {
        $correctNick = true;
    }
}

if (isset($_POST['name'])) {
    $name_S = mysqli_real_escape_string($database, htmlentities($_POST['name']));
    $correctName = true;
}

if (isset($_POST['email'])) {
    $mail_S = mysqli_real_escape_string($database, htmlentities($_POST['email']));

    if (filter_var($mail_S, FILTER_VALIDATE_EMAIL)) {
        $correctMail = true;
    } else {
        $message = "Die Mail-Adresse hat ein ungültiges Format!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }

    if (mysqli_num_rows(SQLRequest($database, "SELECT * FROM users WHERE mail = '$mail_S'")) > 0) {
        $message = "Es existiert bereits ein Account mit dieser E-Mail Adresse! $mail_S";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
}

if (isset($_POST['password']) && isset($_POST['confirmPassword'])) {
    $password = $_POST['password'];
    if (strlen($password) >= 3) {
        if ($password === $_POST['confirmPassword']) {
            $password = password_hash($password, PASSWORD_DEFAULT);
            $correctPassword = true;
        } else {
            echo "Die Passwörter stimmen nicht überein!<br>";
        }
    } else {
        echo "Dein Password muss mindestens 3 Zeichen enthalten!<br>";
    }
}

$gender = "n";
if (isset($_POST['gender'])) {

    $gender = $_POST['gender']; 
   // print_r($gender);
}


if (isset($_POST['age'])) {
    $age = $_POST['age'];
}

$picture = false;
//  print_r($_FILES['picture']);
if (isset($_FILES['picture']) && $_FILES['picture']["tmp_name"]) {
    $picture = true;

    $check = getimagesize($_FILES['picture']["tmp_name"]);
    if ($check === false) {
        echo "Das Bild hat ein ungültiges Format!<br>";
    }

    // 1048576 is 1MB
    if ($_FILES["picture"]["size"] > 10 * 1048576) {
        echo "Das Bild ist zu groß!<br>";
    }
}


$challenge = md5(rand() . time());
$correctData = $correctNick && $correctName && $correctMail && $correctPassword;
$color = "#0000ff";
if ($correctData) {
    if (isset($username_S) && isset($name_S) && isset($mail_S) && isset($password)) {
        $ident = "username, name, mail, password, challenge, color";
        $values = "'$username_S', '$name_S', '$mail_S', '$password', '$challenge', '$color'";

        if ($gender != "n") {
            $ident .= ", gender";
            $values .= ", '$gender'";

        }

        if ($age > 0) {
            $ident .= ", age";
            $values .= ", '$age'";
        }

        if ($picture) {
            $ident .= ", picture";
            $values .= ", 1";
        }

        //echo ("$ident");
        //echo ("$values");
        SQLRequest($database, "INSERT INTO users ($ident) VALUES($values)");

        if (mysqli_affected_rows($database) == 1) {
            $userID = mysqli_fetch_assoc(SQLRequest($database, "SELECT id FROM users WHERE username = '$username_S'"))['id'];

            if ($picture && move_uploaded_file($_FILES['picture']["tmp_name"], "src/img/user/$userID.png")) {
                echo "Profilbild wurde hochgeladen!<br>";
            } else if ($picture) {
                echo "Profilbild konnte nicht hochgeladen werden!<br>";
            }


            // Absicherung gegen Session Hijacking
            $serverIP = gethostbyname(gethostname()) . "/" . str_replace("" . dirname(getcwd()) . "\\", "", getcwd());

            // Send mail confirmation
            $msg = "Bitte klicke <a href='$serverIP/confirm.php?mail=$mail_S&challenge=$challenge'>hier</a>, um deinen Account zu bestätigen!" . $serverIP;
            // hier könnte man den E-Mail versand einstellen 
            //if (mail($mail_S, "Anmeldung bestätigen", $msg, $headers)) {
            //    echo "Die Mail mit dem Bestätigungslink wurde erfolgreich an $mail_S versandt!";
            //} else {

            echo "Das Senden der Mail hat nicht funktioniert! <H1> Klicke <a href=\"confirm.php?mail=$mail_S&challenge=$challenge\">hier</a>, um deinen Account zu bestätigen! </H1>";
        }
    }
}
?>

<div class="registerbox">
    <h1>Registration</h1>
    <form method="post" action="register.php" enctype="multipart/form-data">

        <input type="text" name="nick" id="nick" placeholder="Gebe hier deinen Benutzernamen ein" required autofocus minlength=3 maxlength="25" autocomplete="nickname" value="<?php echo htmlentities($_POST['nick'] ?? ''); ?>">
        <label for="nick">Benutzername <span class="required">*</span></label>
        <br>


        <input type="text" name="name" id="name" placeholder="Gebe hier deinen Namen ein" required minlength=3 maxlength="50" autocomplete="name" value="<?php echo htmlentities($_POST['name'] ?? ''); ?>">
        <label for="name">Name <span class="required">*</span></label>
        <br>


        <input type="email" name="email" id="email" placeholder="Gebe hier deine E-Mail-Adresse ein" required maxlength="50" value="<?php echo htmlentities($_POST['email'] ?? ''); ?>">
        <label for="email">E-Mail <span class="required">*</span></label>
        <br>

        <input type="password" name="password" id="password" placeholder="Gebe hier dein Passwort ein" required minlength=5 autocomplete="new-password" value="<?php echo htmlentities($_POST['password'] ?? ''); ?>">
        <label for="password">Passwort <span class="required">*</span></label>
        <br>


        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Gebe hier nochmal dein Passwort ein" required minlength=4 autocomplete="off" value="<?php echo htmlentities($_POST['confirmPassword'] ?? ''); ?>">
        <label for="confirmPassword">Passwort wiederholen<span class="required">*</span></label>
        <br><br>




        <div class="custom-select" style="width:200px;">
            <select name="gender" id="gender" autocomplete="sex">
                <option value="n">Bitte wähle dein Geschlecht aus</option>
                <script>
                    let prevGender = "<?php echo $_POST['gender'] ?? 'n' ?>";
                    let select = document.getElementById("gender");

                    select.options[1] = new Option("Männlich", "m", prevGender === "m", prevGender === "m");
                    select.options[2] = new Option("Weiblich", "w", prevGender === "w", prevGender === "w");
                    select.options[3] = new Option("Divers", "d", prevGender === "d", prevGender === "d");
                </script>
            </select>


            <br><br>
            <select name="age" id="ageSelect">
                <option value="n">Bitte wähle dein Alter aus</option>
                <script>
                    let prevAge = "<?php echo $_POST['age'] ?? 'n' ?>";
                    select = document.getElementById("ageSelect");

                    for (let i = 1; i < 150; i++) {
                        let selected = false;
                        if (prevAge !== "n" && i === parseInt(prevAge)) {
                            selected = true;
                        }

                        select.options[i] = new Option("" + i, "" + i, selected, selected);
                    }
                </script>
            </select>
            <br>
            <br>
        </div>





        <label for="picture">Profilbild auswählen (.png, max. 10MB) </label>
        <input type="file" name="picture" id="picture" accept="image/png" value="" />
        <br> <br>
        <input type="submit" value="Registrieren">
        <p>Felder mit <span class="required">*</span> müssen ausgefüllt werden!</p>
        <p>By clicking Register, you agree on our <a href="terms.php">terms and condition</a>.</p>
        <a href="impressum.php" class="button"> Impressum</a>

    </form>


</div>



</body>







</html>