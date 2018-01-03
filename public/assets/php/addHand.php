<?php
if(!empty($_POST)) {

	require('connection.php');
	
	$gameID = mysqli_real_escape_string($link, $_POST['gameID']);
	$numPlayers = mysqli_real_escape_string($link, $_POST['numPlayers']);
	$p1Card1 = mysqli_real_escape_string($link, $_POST['p1Card1']);
	$p1Card2 = mysqli_real_escape_string($link, $_POST['p1Card2']);
	$p1Suited = mysqli_real_escape_string($link, $_POST['p1Suited']);
	$p2Card1 = mysqli_real_escape_string($link, $_POST['p2Card1']);
	$p2Card2 = mysqli_real_escape_string($link, $_POST['p2Card2']);
	$p2Suited = mysqli_real_escape_string($link, $_POST['p2Suited']);
	$p3Card1 = mysqli_real_escape_string($link, $_POST['p3Card1']);
	$p3Card2 = mysqli_real_escape_string($link, $_POST['p3Card2']);
	$p3Suited = mysqli_real_escape_string($link, $_POST['p3Suited']);
	$p4Card1 = mysqli_real_escape_string($link, $_POST['p4Card1']);
	$p4Card2 = mysqli_real_escape_string($link, $_POST['p4Card2']);
	$p4Suited = mysqli_real_escape_string($link, $_POST['p4Suited']);

	if(!empty($gameID)) {
		$query = "INSERT INTO `handResults` SET
			gameID		= '$gameID',
			numPlayers	= '$numPlayers',
			p1Card1		= '$p1Card1',
			p1Card2		= '$p1Card2',
			p1Suited	= '$p1Suited',
			p2Card1		= '$p2Card1',
			p2Card2		= '$p2Card2',
			p2Suited	= '$p2Suited',
			p3Card1		= '$p3Card1',
			p3Card2		= '$p3Card2',
			p3Suited	= '$p3Suited',
			p4Card1		= '$p4Card1',
			p4Card2		= '$p4Card2',
			p4Suited	= '$p4Suited'";

		$execute = mysqli_query($link, $query);

		if($execute == true) {
			echo "Success";
		}
	}
}
?>