function addHand_db() {
	var query = "INSERT INTO `handResults` "
		+ "(`gameID`, `numPlayers`, `p1Card1`, `p1Card2`, `p1Suited`, `p2Card1`, `p2Card2`, `p2Suited`, `p3Card1`, `p3Card2`, `p3Suited`, `p4Card1`, `p4Card2`, `p4Suited`)"
		+ " VALUES "
		+ "('0', '4', '14', '2', '1', '13', '3', '1', '12', '4', '0', '11', '5', '0')";

	console.log(query);

	con.connect(function(err) {
		console.log("begin con.connect");
		if(err) {
			throw err;
			console.log("ERROR: " + err);
		}
		console.log("Connected!");
		con.query(query, function(err, result) {
			if(err) {
				throw err;
				console.log("ERROR: " + err);
			}
			console.log("Result: " + result);
		});
	});

	// $.ajax({
	// 	method: "POST",
	// 	url: "assets/php/addHand.php",
	// 	data: handInfo
	// }).done(function(response) {
	// 	console.log(response);
	// });
}

function updateHand_db() {

}