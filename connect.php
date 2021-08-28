<?php
    $database = mysqli_connect("localhost", "root", "", "vier") or die("Couldn't connect vier database!");
    return $database;