// Shuffle the deck(s).
function createDeck(numDecks) {
	if(!numDecks) {
		// numDecks is an optional parameter
		var numDecks = 1;
	}

	// Empty all arrays from the previous hand
	emptyArrays();

	// allow the option of multiple decks
	for (var i = 0; i < numDecks; i++) {
		// push all suits into the deck array
		createCards("spades");
		createCards("clubs");
		createCards("diamonds");
		createCards("hearts");
	}
}

// Empties all global game arrays
function emptyArrays() {
	// Empty the deck array
	deck.splice(0, deck.length);

	// Delete any table cards that might exist
	tableCards.splice(0, tableCards.length);

	// Empty player's hands
	p1Hand.splice(0, p1Hand.length);
	p2Hand.splice(0, p2Hand.length);
	p3Hand.splice(0, p3Hand.length);
	p4Hand.splice(0, p4Hand.length);
	p5Hand.splice(0, p5Hand.length);
	p6Hand.splice(0, p6Hand.length);

	// Delete player's results from the prior hand
	p1Result.splice(0, p1Result.length);
	p2Result.splice(0, p2Result.length);
	p3Result.splice(0, p3Result.length);
	p4Result.splice(0, p4Result.length);
	p5Result.splice(0, p5Result.length);
	p6Result.splice(0, p6Result.length);
}

// Create a suit of card objects, values 2 - 14.
function createCards(suit) {
	// suit is a required parameter
	if(!suit) {
		console.log("ERROR: createCards was run without passing a suit.");
		return null;
	}
	// Aces will have a value of 14
	for (var j = 2; j <= 14; j++) {
		var curCard = {
			"val": j,
			"suit": suit
		};

		// Push to the deck array
		deck.push(curCard);
	}
}

// Deals 2 hole cards to each player, both PC and human.
function dealCards() {
	// TEST Force the most difficult to reach hands
	// dealRoyalFlush();
	// dealStraightFlush();
	// deal4Kind();

	if (numPlayers > 1) {
		// Always deal 2 cards to player 1
		for (var i = 0; i < 2; i++) {
			p1Hand = addCardToHand(p1Hand);
		}
		// Always deal 2 cards to player 2
		for (var i = 0; i < 2; i++) {
			p2Hand = addCardToHand(p2Hand);
		}	
	}
	if (numPlayers > 2) {
		// deal player 3
		for (var i = 0; i < 2; i++) {
			p3Hand = addCardToHand(p3Hand);
		}
	}
	if (numPlayers > 3) {
		// deal player 4
		for (var i = 0; i < 2; i++) {
			p4Hand = addCardToHand(p4Hand);
		}
	}

	// TEST Draw each player's hand to the screen. These will be visible.
	drawMyHand();
	drawOpponent("p2");
	drawOpponent("p3");
	drawOpponent("p4");	

	// TEST Draw the table cards all at once.
	flop();
	turn();
	river();

	// Determine each player's resulting hand
	p1Result = handResult(p1Hand);
	$("#playerOptions").append('<img src="assets/images/' + p1Result[1] + '.png" class="img img-responsive" alt="' + p1Result[0] + '">');
	p2Result = handResult(p2Hand);
	$("#p2Stats").append('<img src="assets/images/' + p2Result[1] + '.png" class="img img-responsive cardResultDiv" alt="' + p2Result[0] + '">');
	p3Result = handResult(p3Hand);
	$("#p3Stats").append('<img src="assets/images/' + p3Result[1] + '.png" class="img img-responsive cardResultDiv" alt="' + p3Result[0] + '">');
	p4Result = handResult(p4Hand);
	$("#p4Stats").append('<img src="assets/images/' + p4Result[1] + '.png" class="img img-responsive cardResultDiv" alt="' + p4Result[0] + '">');

	// TEST Check to see what the player's resulting hand will return.
	console.log("Player 1:");
	console.log(p1Result);
	console.log("=====================");
	console.log("Player 2:");
	console.log(p2Result);
	console.log("=====================");
	console.log("Player 3:");
	console.log(p3Result);
	console.log("=====================");
	console.log("Player 4:");
	console.log(p4Result);
}

// Takes 2 cards out of the deck and adds them to the player's hand. Pass the array of the player's hole cards.
function addCardToHand(thisHand) {
	// thisHand is a required parameter
	if(!thisHand) {
		// suppress an error & return an array with a single card inside if no hand was passed
		var thisHand = [];
	}
	// Select a random card from the deck
	var cardNum = Math.floor(Math.random() * deck.length);
	var rndCard = deck[cardNum];
	// Add that card to thisHand
	thisHand.push(rndCard);
	// Remove that card from the deck
	deck.splice(cardNum, 1);
	// Give the hand to the assigned player
	return thisHand;
}

// thisPlayer is a REQUIRED parameter. Displays the opponent's cards on the screen. They are not hidden.
function drawOpponent(thisPlayer) {
	// Load the correct hand into the function
	if(thisPlayer === "p2") {
		var thisHand = p2Hand;
	}
	else if(thisPlayer === "p3") {
		var thisHand = p3Hand;
	}
	else if(thisPlayer === "p4") {
		var thisHand = p4Hand;
	}
	// Return an error if the function is called without passing a parameter.
	else {
		console.log("ERROR: drawOpponents was called without passing a parameter.")
		return null;
	}

	$("#" + thisPlayer).html(
		'<div class="container-float relativeDiv" id="' + thisPlayer + 'Stats">'
	+		'<div class="row">'
	+			'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>'
	+			'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">'
	+				'<img src="assets/images/' + thisHand[0].val + thisHand[0].suit + '.png" class ="img img-responsive">'
	+			'</div>'
	+			'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-lg-pull-3 col-md-pull-3 col-sm-pull-3 col-xs-pull-3 topCard">'
	+				'<img src="assets/images/' + thisHand[1].val + thisHand[1].suit + '.png" class ="img img-responsive">'
	+			'</div>'
	+		'</div>'
	+	'</div>'
	);
}

// Draws the user's hand to the screen. These cards are visible.
function drawMyHand() {
	$("#pcard1").html('<img src="assets/images/' + p1Hand[0].val + p1Hand[0].suit + '.png" class ="img img-responsive">');
	$("#pcard2").html('<img src="assets/images/' + p1Hand[1].val + p1Hand[1].suit + '.png" class ="img img-responsive">');
}

// Takes 3 cards out of the deck and adds them to the tableCards array. Draws the cards to the page.
function flop() {

	// Get 3 cards
	for (var i = 1; i <= 3; i++) {
		// Select a random card from the deck
		var cardNum = Math.floor(Math.random() * deck.length);
		var rndCard = deck[cardNum];
		// Add that card to thisHand
		tableCards.push(rndCard);
		// Remove that card from the deck
		deck.splice(cardNum, 1);
	}

	//Display the cards on the table
	$("#card1").html('<img src="assets/images/' + tableCards[0].val + tableCards[0].suit + '.png" class ="img img-responsive">');
	$("#card2").html('<img src="assets/images/' + tableCards[1].val + tableCards[1].suit + '.png" class ="img img-responsive">');
	$("#card3").html('<img src="assets/images/' + tableCards[2].val + tableCards[2].suit + '.png" class ="img img-responsive">');
}

// Takes 1 card out of the deck and adds it to the tableCards array. Draws the card to the page.
function turn() {
	// Select a random card from the deck
	var cardNum = Math.floor(Math.random() * deck.length);
	var rndCard = deck[cardNum];
	// Add that card to thisHand
	tableCards.push(rndCard);
	// Remove that card from the deck
	deck.splice(cardNum, 1);

	//Display the card on the table
	$("#card4").html('<img src="assets/images/' + tableCards[3].val + tableCards[3].suit + '.png" class ="img img-responsive">');
}

// Takes 1 card out of the deck and adds it to the tableCards array. Draws the card to the page.
function river() {
	// Select a random card from the deck
	var cardNum = Math.floor(Math.random() * deck.length);
	var rndCard = deck[cardNum];
	// Add that card to thisHand
	tableCards.push(rndCard);
	// Remove that card from the deck
	deck.splice(cardNum, 1);

	//Display the card on the table
	$("#card5").html('<img src="assets/images/' + tableCards[4].val + tableCards[4].suit + '.png" class ="img img-responsive">');
}

function dealRoyalFlush() {
	// Delete any table cards that might exist
	tableCards.splice(0, tableCards.length);

	// Deal a Royal Flush
	for (var i = 12; i >= 8; i--) {
		var rndCard = deck[i];
		tableCards.push(rndCard);
		deck.splice(i, 1);
	}

	//Display the cards on the table
	$("#card1").html('<img src="assets/images/' + tableCards[0].val + tableCards[0].suit + '.png" class ="img img-responsive">');
	$("#card2").html('<img src="assets/images/' + tableCards[1].val + tableCards[1].suit + '.png" class ="img img-responsive">');
	$("#card3").html('<img src="assets/images/' + tableCards[2].val + tableCards[2].suit + '.png" class ="img img-responsive">');	
	$("#card4").html('<img src="assets/images/' + tableCards[3].val + tableCards[3].suit + '.png" class ="img img-responsive">');
	$("#card5").html('<img src="assets/images/' + tableCards[4].val + tableCards[4].suit + '.png" class ="img img-responsive">');	
}

function dealStraightFlush() {
	// Delete any table cards that might exist
	tableCards.splice(0, tableCards.length);

	// Deal a King High Straight Flush
	for (var i = 11; i >= 7; i--) {
		var rndCard = deck[i];
		tableCards.push(rndCard);
		deck.splice(i, 1);
	}

	//Display the cards on the table
	$("#card1").html('<img src="assets/images/' + tableCards[0].val + tableCards[0].suit + '.png" class ="img img-responsive">');
	$("#card2").html('<img src="assets/images/' + tableCards[1].val + tableCards[1].suit + '.png" class ="img img-responsive">');
	$("#card3").html('<img src="assets/images/' + tableCards[2].val + tableCards[2].suit + '.png" class ="img img-responsive">');	
	$("#card4").html('<img src="assets/images/' + tableCards[3].val + tableCards[3].suit + '.png" class ="img img-responsive">');
	$("#card5").html('<img src="assets/images/' + tableCards[4].val + tableCards[4].suit + '.png" class ="img img-responsive">');	
}

function deal4Kind() {
	// Delete any table cards that might exist
	tableCards.splice(0, tableCards.length);

	// Deal 4 of a Kind
	tableCards.push(deck[0], deck[13], deck[26], deck[39]);
	deck.splice(39, 1);
	deck.splice(26, 1);
	deck.splice(13, 1);
	deck.splice(0, 1);

	//Display the cards on the table
	$("#card1").html('<img src="assets/images/' + tableCards[0].val + tableCards[0].suit + '.png" class ="img img-responsive">');
	$("#card2").html('<img src="assets/images/' + tableCards[1].val + tableCards[1].suit + '.png" class ="img img-responsive">');
	$("#card3").html('<img src="assets/images/' + tableCards[2].val + tableCards[2].suit + '.png" class ="img img-responsive">');	
	$("#card4").html('<img src="assets/images/' + tableCards[3].val + tableCards[3].suit + '.png" class ="img img-responsive">');

	river();
}

