<?php

$hostname = "mysql.fullstacksteve.com";
$username = "pokerupdater";
$password = "uBVYGIhbfo8HUBILe3IO897qg482b9";
$database = "fullstacksteve_poker";

$link = mysqli_connect($hostname, $username, $password, $database);
if(mysqli_connect_errno()) {
	die("Connect failed: %s\n" + mysqli_connect_error());
	exit();
}

?>