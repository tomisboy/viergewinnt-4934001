<?php

if (isset($_POST['verifySession'])) {
    session_start();

    // Regenerate Session ID every 20 Minutes
    if (!isset($_SESSION['createdAt'])) {
        $_SESSION['createdAt'] = time();
    } else if (time() - $_SESSION['createdAt'] > 20 * 60) {
        session_regenerate_id();
        $_SESSION['createdAt'] = time();
    }



    echo ",";

    // Log user out if their ip changed
    if (isset($_SESSION['ip'])) {
        if ($_SESSION['ip'] !== $_SERVER['REMOTE_ADDR']) {
            echo "ip, true";
        }
    }

    unset($_POST['verifySession']);
}

function SQLRequest($database, $request)
{
    $result = mysqli_query($database, $request) or die(mysqli_error($database));
    return $result ? $result : null;
}
