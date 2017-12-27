function createDeck(numDecks) {
	if(!numDecks) {
		// numDecks is an optional parameter
		var numDecks = 1;
	}

	// Start with an empty deck array
	deck.splice(0, deck.length);

	// allow the option of multiple decks
	for (var i = 0; i < numDecks; i++) {
		// push all suits into the deck array
		createCards("spades");
		createCards("clubs");
		createCards("diamonds");
		createCards("hearts");
	}
}

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

function dealCards() {
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

	drawMyHand();
	drawOpponent("p2");
	drawOpponent("p3");
	drawOpponent("p4");	

	flop();
	turn();
	river();
	console.log(deck);

	console.log(handResult(p1Hand));

}

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

// thisPlayer is a REQUIRED parameter.
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
		'<div class="container-float">'
	+		'<div class="row">'
	+			'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'
	+				'<img src="assets/images/' + thisHand[0].val + thisHand[0].suit + '.png" class ="img img-responsive">'
	+			'</div>'
	+			'<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'
	+				'<img src="assets/images/' + thisHand[1].val + thisHand[1].suit + '.png" class ="img img-responsive">'
	+			'</div>'
	+		'</div>'
	+	'</div>'
	);
}

function drawMyHand() {
	$("#pcard1").html('<img src="assets/images/' + p1Hand[0].val + p1Hand[0].suit + '.png" class ="img img-responsive">');
	$("#pcard2").html('<img src="assets/images/' + p1Hand[1].val + p1Hand[1].suit + '.png" class ="img img-responsive">');
}

function flop() {
	// Delete any table cards that might exist
	tableCards.splice(0, tableCards.length);

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

// This function will return an array with the [HAND CODE, (PARAM1), (PARAM2)]. The highest Hand Code wins.
// Optional PARAM1 is the high card and exists in every result except the Royal Flush.
// Optional PARAM2 is the pair in a Full House hand or the low pair in a 2 Pair hand.
function handResult(thisHand) {
	// This function 
	var neededCards = 0;
	var hearts = 0, diamonds = 0, clubs = 0, spades = 0;

	// Create an array of 7 cards, including the table cards and the player's hold cards
	var allCards = tableCards;
	allCards.push(thisHand[0], thisHand[1]);

	// *******************************************************************************
	// ****************************** ROYAL FLUSH CHECK ******************************
	// *******************************************************************************
	for (var i = 0; i < allCards.length; i++) {
		// If 14 exists
		if(allCards[i].val === 14) {
			if(allCards[i].suit === "hearts") { hearts++; }
			else if(allCards[i].suit === "spades") { spades++; }
			else if(allCards[i].suit === "clubs") { clubs++; }
			else if(allCards[i].suit === "diamonds") { diamonds++; }
		}
		// If 13 exists
		else if(allCards[i].val === 13) {
			if(allCards[i].suit === "hearts") { hearts++; }
			else if(allCards[i].suit === "spades") { spades++; }
			else if(allCards[i].suit === "clubs") { clubs++; }
			else if(allCards[i].suit === "diamonds") { diamonds++; }
		}
		// If 12 exists
		else if(allCards[i].val === 12) {
			if(allCards[i].suit === "hearts") { hearts++; }
			else if(allCards[i].suit === "spades") { spades++; }
			else if(allCards[i].suit === "clubs") { clubs++; }
			else if(allCards[i].suit === "diamonds") { diamonds++; }
		}
		// If 11 exists
		else if(allCards[i].val === 11) {
			if(allCards[i].suit === "hearts") { hearts++; }
			else if(allCards[i].suit === "spades") { spades++; }
			else if(allCards[i].suit === "clubs") { clubs++; }
			else if(allCards[i].suit === "diamonds") { diamonds++; }
		}
		// If 10 exists
		else if(allCards[i].val === 10) {
			if(allCards[i].suit === "hearts") { hearts++; }
			else if(allCards[i].suit === "spades") { spades++; }
			else if(allCards[i].suit === "clubs") { clubs++; }
			else if(allCards[i].suit === "diamonds") { diamonds++; }
		}
	}
	if(hearts === 5 || clubs === 5 || diamonds === 5 || spades === 5) {
		console.log(allCards);
		return [10];
	}

	// *******************************************************************************
	// **************************** STRAIGHT FLUSH CHECK *****************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort allCards by suit
	allCards.sort(function(a, b) {
		var suitA = a.suit;
		var suitB = b.suit;
		if (suitA < suitB) {
			return -1;
		}
		if (suitA > suitB) {
			return 1;
		}

		// suits must be equal
		return 0;
	});

	if(
		allCards[2].val === allCards[3].val - 1
		&& allCards[3].val === allCards[4].val - 1
		&& allCards[4].val === allCards[5].val - 1
		// Include a check for Aces as low
		&& (allCards[5].val === allCards[6].val - 1  || allCards[6].val === allCards[2].val + 12)
		&& allCards[2].suit === allCards[6].suit
	) {
		console.log(allCards);
		return [9, allCards[4].val];
	}
	else if (
		allCards[1].val === allCards[2].val - 1
		&& allCards[2].val === allCards[3].val - 1
		&& allCards[3].val === allCards[4].val - 1
		// Include a check for Aces as low
		&& (allCards[4].val === allCards[5].val - 1  || allCards[5].val === allCards[1].val + 12)
		&& allCards[1].suit === allCards[5].suit
	) {
		console.log(allCards);
		return [9, allCards[5].val];
	}
	else if (
		allCards[0].val === allCards[1].val - 1
		&& allCards[1].val === allCards[2].val - 1
		&& allCards[2].val === allCards[3].val - 1
		// Include a check for Aces as low
		&& (allCards[3].val === allCards[4].val - 1  || allCards[4].val === allCards[0].val + 12)
		&& allCards[0].suit === allCards[4].suit
	) {
		console.log(allCards);
		return [9, allCards[6].val];
	}

	// *******************************************************************************
	// ****************************** 4 OF A KIND CHECK ******************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort allCards by numerical value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

	if(
		allCards[0].val === allCards[1].val
		&& allCards[1].val === allCards[2].val
		&& allCards[2].val === allCards[3].val
	) {
		console.log(allCards);
		return [8, allCards[3].val];
	}
	else if(
		allCards[1].val === allCards[2].val
		&& allCards[2].val === allCards[3].val
		&& allCards[3].val === allCards[4].val
	) {
		console.log(allCards);
		return [8, allCards[4].val];
	}
	else if(
		allCards[2].val === allCards[3].val
		&& allCards[3].val === allCards[4].val
		&& allCards[4].val === allCards[5].val
	) {
		console.log(allCards);
		return [8, allCards[5].val];
	}
	else if(
		allCards[3].val === allCards[4].val
		&& allCards[4].val === allCards[5].val
		&& allCards[5].val === allCards[6].val
	) {
		console.log(allCards);
		return [8, allCards[6].val];
	}


	// *******************************************************************************
	// ******************************* FULL HOUSE CHECK ******************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;


	// *******************************************************************************
	// ********************************* FLUSH CHECK *********************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort allCards by suit
	allCards.sort(function(a, b) {
		var suitA = a.suit;
		var suitB = b.suit;
		if (suitA < suitB) {
			return -1;
		}
		if (suitA > suitB) {
			return 1;
		}

		// suits must be equal
		return 0;
	});

	if(
		allCards[6].suit === allCards[5].suit
		&& allCards[5].suit === allCards[4].suit
		&& allCards[4].suit === allCards[3].suit
		&& allCards[3].suit === allCards[2].suit
	) {
		console.log(allCards);
		return [6, allCards[6].val];
	}
	else if(
		allCards[5].suit === allCards[4].suit
		&& allCards[4].suit === allCards[3].suit
		&& allCards[3].suit === allCards[2].suit
		&& allCards[2].suit === allCards[1].suit
	) {
		console.log(allCards);
		return [6, allCards[5].val];
	}
	else if(
		allCards[4].suit === allCards[3].suit
		&& allCards[3].suit === allCards[2].suit
		&& allCards[2].suit === allCards[1].suit
		&& allCards[1].suit === allCards[0].suit
	) {
		console.log(allCards);
		return [6, allCards[4].val];
	}

	// *******************************************************************************
	// ******************************** STRAIGHT CHECK *******************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort cards by val
	allCards.sort(function (a, b) {
		return a.val - b.val;
	});


	// Strip out duplicate numbers
	// SOURCE: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
	var tmpStraightArray = [allCards[0].val, allCards[1].val, allCards[2].val, allCards[3].val, allCards[4].val, allCards[5].val, allCards[6].val];
	var straightArray = [];

	$.each(tmpStraightArray, function(i, el){
		if($.inArray(el, straightArray) === -1) straightArray.push(el);
	});

	console.log(straightArray);

	if(
		straightArray.length > 4
		&& straightArray[2] === straightArray[3] - 1
		&& straightArray[3] === straightArray[4] - 1
		&& straightArray[4] === straightArray[5] - 1
		// Include a check for Aces as low
		&& (straightArray[5] === straightArray[6] - 1  || straightArray[6] === straightArray[2] + 12)
	) {
		console.log(allCards);
		return [5, straightArray[4]];
	}
	else if (
		straightArray.length > 5
		&& straightArray[1] === straightArray[2] - 1
		&& straightArray[2] === straightArray[3] - 1
		&& straightArray[3] === straightArray[4] - 1
		// Include a check for Aces as low
		&& (straightArray[4] === straightArray[5] - 1  || straightArray[5] === straightArray[1] + 12)
	) {
		console.log(allCards);
		return [5, straightArray[5]];
	}
	else if (
		straightArray.length > 6
		&& straightArray[0] === straightArray[1] - 1
		&& straightArray[1] === straightArray[2] - 1
		&& straightArray[2] === straightArray[3] - 1
		// Include a check for Aces as low
		&& (straightArray[3] === straightArray[4] - 1  || straightArray[4] === straightArray[0] + 12)
	) {
		console.log(allCards);
		return [5, straightArray[6]];
	}

	// *******************************************************************************
	// ****************************** 3 OF A KIND CHECK ******************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort cards by value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

	if(allCards[6].val === allCards[5].val && allCards[5].val === allCards[4].val) {
		console.log(allCards);
		return [4, allCards[6].val];
	}
	else if(allCards[5].val === allCards[4].val && allCards[4].val === allCards[3].val) {
		console.log(allCards);
		return [4, allCards[5].val];
	}
	else if(allCards[4].val === allCards[3].val && allCards[3].val === allCards[2].val) {
		console.log(allCards);
		return [4, allCards[4].val];
	}
	else if(allCards[3].val === allCards[2].val && allCards[2].val === allCards[1].val) {
		console.log(allCards);
		return [4, allCards[3].val];
	}
	else if(allCards[2].val === allCards[1].val && allCards[1].val === allCards[0].val) {
		console.log(allCards);
		return [4, allCards[2].val];
	}

	// *******************************************************************************
	// ********************************* 2 PAIR CHECK ********************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort cards by value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

	var numPairs = 0;
	var highPair = 0;
	var lowPair = 0;

	if(allCards[6].val === allCards[5].val) {
		numPairs++;
		highPair = allCards[6].val;
	}
	if(allCards[5].val === allCards[4].val) {
		numPairs++;
		if(numPairs === 1) {
			highPair = allCards[5].val;
		}
		else if(numPairs > 1) {
			lowPair = allCards[5].val;
		}
	}
	if(allCards[4].val === allCards[3].val) {
		numPairs++;
		if(numPairs === 1) {
			highPair = allCards[4].val;
		}
		else if(numPairs > 1) {
			lowPair = allCards[4].val;
		}
	}
	if(allCards[3].val === allCards[2].val) {
		numPairs++;
		if(numPairs === 1) {
			highPair = allCards[3].val;
		}
		else if(numPairs > 1) {
			lowPair = allCards[3].val;
		}
	}
	if(allCards[2].val === allCards[1].val) {
		numPairs++;
		if(numPairs === 1) {
			highPair = allCards[2].val;
		}
		else if(numPairs > 1) {
			lowPair = allCards[2].val;
		}
	}
	if(allCards[1].val === allCards[0].val) {
		numPairs++;
		if(numPairs > 1) {
			lowPair = allCards[1].val;
		}
	}

	if(numPairs > 1) {
		console.log(allCards);
		return [3, highPair, lowPair];
	}

	// *******************************************************************************
	// ********************************** PAIR CHECK *********************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort cards by value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

	if(allCards[6].val === allCards[5].val) {
		console.log(allCards);
		return [2, allCards[6].val];
	}
	else if(allCards[5].val === allCards[4].val) {
		console.log(allCards);
		return [2, allCards[5].val];
	}
	else if(allCards[4].val === allCards[3].val) {
		console.log(allCards);
		return [2, allCards[4].val];
	}
	else if(allCards[3].val === allCards[2].val) {
		console.log(allCards);
		return [2, allCards[3].val];
	}
	else if(allCards[2].val === allCards[1].val) {
		console.log(allCards);
		return [2, allCards[2].val];
	}
	else if(allCards[1].val === allCards[0].val) {
		console.log(allCards);
		return [2, allCards[1].val];
	}

	// *******************************************************************************
	// ******************************* HIGH CARD CHECK *******************************
	// *******************************************************************************

	// Reset used variables
	neededCards = 0;
	hearts = 0;
	diamonds = 0;
	clubs = 0;
	spades = 0;

	// Sort allCards by numerical value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

	console.log(allCards);
	return [1, allCards[6].val];
}


// Sort cards by value
// allCards.sort(function (a, b) {
//   return a.val - b.val;
// });

// Sort cards by suit
// allCards.sort(function(a, b) {
//   var suitA = a.suit;
//   var suitB = b.suit;
//   if (suitA < suitB) {
//     return -1;
//   }
//   if (suitA > suitB) {
//     return 1;
//   }
//   // Suits must be equal
//   return 0;
// });