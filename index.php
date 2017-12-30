<?php
	include 'assets/php/connection.php';
?>

<!DOCTYPE html>
<html lang="en-us">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

	<!-- Load Font Awesome -->
	<script src="https://use.fontawesome.com/e14e0f3537.js"></script>

	<!-- Load local files -->
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<script src="assets/javascript/vars.js"></script>
	<script src="assets/javascript/functions.js"></script>
	<script src="assets/javascript/handResult.js"></script>
	<script src="assets/javascript/mySQLcalls.js"></script>

	<title>JS Hold 'Em</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" id="p2"></div>
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" id="p3"></div>
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" id="p4"></div>
		</div>
		<div class="row">
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="gameStats"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="card1"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="card2"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="card3"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="card4"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="card5"></div>
		</div>
		<div class="row">
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" id="playerInfo"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="pcard1"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="pcard2"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="playerOptions"></div>
			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="playerStats"></div>
		</div>
	</div>

	<script type="text/javascript">
		createDeck();
		dealCards();
	</script>
</body>
</html>