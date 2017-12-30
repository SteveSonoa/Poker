function addHand_db() {
	var handInfo = {
		gameID: 0,
		numPlayers: 4,
		p1Card1: 14,
		p1Card2: 2,
		p1Suited: true,
		p2Card1: 13,
		p2Card2: 3,
		p2Suited: true,
		p3Card1: 12,
		p3Card2: 4,
		p3Suited: false,
		p4Card1: 11,
		p4Card2: 5,
		p4Suited: false
	};

	$.ajax({
		method: "POST",
		url: "assets/php/addHand.php",
		data: handInfo
	}).done(function(response) {
		console.log(response);
	});
}

function updateHand_db() {

}