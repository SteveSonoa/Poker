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
	console.log(p1Hand);
	console.log(p2Hand);
	console.log(p3Hand);
	console.log(p4Hand);
	console.log(deck);
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