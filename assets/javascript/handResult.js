// This function will return an array with the [HAND DESC, HAND CODE, (PARAM1), (PARAM2), (PARAM3), (PARAM4), (PARAM5)].
// HAND DESC is a string with the hand's name. HAND CODE is a number; the higher number always wins.
// If the HAND CODE numbers are the same, the highest PARAM1 number wins. If the same, PARAM2, etc.
// If all numbers in the length of the array are the same, it's a true tie.
function handResult(thisHand) {
	// This function 
	var neededCards = 0;
	var hearts = 0, diamonds = 0, clubs = 0, spades = 0;

	// Create an array of 7 cards, including the table cards and the player's hold cards
	var allCards = [tableCards[0], tableCards[1], tableCards[2], tableCards[3], tableCards[4]];
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
		return ["Royal Flush", 10];
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

	// Cards must be sorted by value, then by suit. The resulting order is the cards in ascending order by their suit.
	// Sort cards by value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

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

	// Card #6 will always be highest; check to see if there are 5 in a row
	if(
		allCards[2].val === allCards[3].val - 1
		&& allCards[3].val === allCards[4].val - 1
		&& allCards[4].val === allCards[5].val - 1
		// Include a check for Aces as low
		&& (allCards[5].val === allCards[6].val - 1  || allCards[6].val === allCards[2].val + 12)
		// If there are 5 in a row, make sure they are the same suit
		&& allCards[2].suit === allCards[6].suit
	) {
		return ["Straight Flush", 9, allCards[6].val];
	}
	else if (
		allCards[1].val === allCards[2].val - 1
		&& allCards[2].val === allCards[3].val - 1
		&& allCards[3].val === allCards[4].val - 1
		// Include a check for Aces as low
		&& (allCards[4].val === allCards[5].val - 1  || allCards[5].val === allCards[1].val + 12)
		&& allCards[1].suit === allCards[5].suit
	) {
		return ["Straight Flush", 9, allCards[5].val];
	}
	else if (
		allCards[0].val === allCards[1].val - 1
		&& allCards[1].val === allCards[2].val - 1
		&& allCards[2].val === allCards[3].val - 1
		// Include a check for Aces as low
		&& (allCards[3].val === allCards[4].val - 1  || allCards[4].val === allCards[0].val + 12)
		&& allCards[0].suit === allCards[4].suit
	) {
		return ["Straight Flush", 9, allCards[4].val];
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

	// Check to see if cards 3, 4, 5, and 6 have the same value.
	if(
		allCards[3].val === allCards[4].val
		&& allCards[4].val === allCards[5].val
		&& allCards[5].val === allCards[6].val
	) {
		// Beyond the 4 of a kind (cards 3, 4, 5, and 6), the High Card will be card 2
		return ["4 of a Kind", 8, allCards[6].val, allCards[2].val];
	}
	// Check to see if cards 2, 3, 4, and 5 have the same value.
	else if(
		allCards[2].val === allCards[3].val
		&& allCards[3].val === allCards[4].val
		&& allCards[4].val === allCards[5].val
	) {
		// Beyond the 4 of a kind (cards 2, 3, 4, and 5), the High Card will be card 6
		return ["4 of a Kind", 8, allCards[5].val, allCards[6].val];
	}
	// Check to see if cards 1, 2, 3, and 4 have the same value.
	else if(
		allCards[1].val === allCards[2].val
		&& allCards[2].val === allCards[3].val
		&& allCards[3].val === allCards[4].val
	) {
		return ["4 of a Kind", 8, allCards[4].val, allCards[6].val];
	}
	// Check to see if cards 0, 1, 2, and 3 have the same value.
	else if(
		allCards[0].val === allCards[1].val
		&& allCards[1].val === allCards[2].val
		&& allCards[2].val === allCards[3].val
	) {
		return ["4 of a Kind", 8, allCards[3].val, allCards[6].val];
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

	var fh3Kind = 0;
	var fhPair = 0;

	// Sort cards by value
	allCards.sort(function (a, b) {
	  return a.val - b.val;
	});

	// First check for 3 of a Kind & store the val
	if(allCards[6].val === allCards[5].val && allCards[5].val === allCards[4].val) {
		fh3Kind = allCards[6].val;
	}
	else if(allCards[5].val === allCards[4].val && allCards[4].val === allCards[3].val) {
		fh3Kind = allCards[5].val;
	}
	else if(allCards[4].val === allCards[3].val && allCards[3].val === allCards[2].val) {
		fh3Kind = allCards[4].val;
	}
	else if(allCards[3].val === allCards[2].val && allCards[2].val === allCards[1].val) {
		fh3Kind = allCards[3].val;
	}
	else if(allCards[2].val === allCards[1].val && allCards[1].val === allCards[0].val) {
		fh3Kind = allCards[2].val;
	}

	// If there is a 3 of a Kind, check for the Pair & store the value. The Pair cannot be the same value as the 3 of a Kind.
	if(fh3Kind !== 0) {
		if(allCards[6].val === allCards[5].val && allCards[6].val !== fh3Kind) {
			fhPair = allCards[6].val;
		}
		else if(allCards[5].val === allCards[4].val && allCards[5].val !== fh3Kind) {
			fhPair = allCards[5].val;
		}
		else if(allCards[4].val === allCards[3].val && allCards[4].val !== fh3Kind) {
			fhPair = allCards[4].val;
		}
		else if(allCards[3].val === allCards[2].val && allCards[3].val !== fh3Kind) {
			fhPair = allCards[3].val;
		}
		else if(allCards[2].val === allCards[1].val && allCards[2].val !== fh3Kind) {
			fhPair = allCards[2].val;
		}
		else if(allCards[1].val === allCards[0].val && allCards[1].val !== fh3Kind) {
			fhPair = allCards[1].val;
		}
	}

	if(fh3Kind !== 0 && fhPair !== 0) {
		return ["Full House", 7, fh3Kind, fhPair];
	}

	// *******************************************************************************
	// ********************************* FLUSH CHECK *********************************
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

	// Check to see if cards 6, 5, 4, 3, and 2 have the same suit
	if(
		allCards[6].suit === allCards[5].suit
		&& allCards[5].suit === allCards[4].suit
		&& allCards[4].suit === allCards[3].suit
		&& allCards[3].suit === allCards[2].suit
	) {
		return ["Flush", 6, allCards[6].val, allCards[5].val, allCards[4].val, allCards[3].val, allCards[2].val];
	}
	// Check to see if cards 5, 4, 3, 2, and 1 have the same suit
	else if(
		allCards[5].suit === allCards[4].suit
		&& allCards[4].suit === allCards[3].suit
		&& allCards[3].suit === allCards[2].suit
		&& allCards[2].suit === allCards[1].suit
	) {
		return ["Flush", 6, allCards[5].val, allCards[4].val, allCards[3].val, allCards[2].val, allCards[1].val];
	}
	// Check to see if cards 4, 3, 2, 1, and 0 have the same suit
	else if(
		allCards[4].suit === allCards[3].suit
		&& allCards[3].suit === allCards[2].suit
		&& allCards[2].suit === allCards[1].suit
		&& allCards[1].suit === allCards[0].suit
	) {
		return ["Flush", 6, allCards[4].val, allCards[3].val, allCards[2].val, allCards[1].val, allCards[0].val];
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

	// straightArray does not include any duplicate values. We will check it for the straight.
	$.each(tmpStraightArray, function(i, el){
		if($.inArray(el, straightArray) === -1) straightArray.push(el);
	});

	if(
		// Make sure the array is long enough for this check
		straightArray.length > 4
		// Check if cards 2, 3, 4, 5, and 6 are 1 value away from each other
		&& straightArray[2] === straightArray[3] - 1
		&& straightArray[3] === straightArray[4] - 1
		&& straightArray[4] === straightArray[5] - 1
		// Include a check for Aces as low
		&& (straightArray[5] === straightArray[6] - 1  || straightArray[6] === straightArray[2] + 12)
	) {
		return ["Straight", 5, straightArray[6]];
	}
	else if (
		// Make sure the array is long enough for this check
		straightArray.length > 5
		// Check if cards 1, 2, 3, 4, and 5 are 1 value away from each other
		&& straightArray[1] === straightArray[2] - 1
		&& straightArray[2] === straightArray[3] - 1
		&& straightArray[3] === straightArray[4] - 1
		// Include a check for Aces as low
		&& (straightArray[4] === straightArray[5] - 1  || straightArray[5] === straightArray[1] + 12)
	) {
		return ["Straight", 5, straightArray[5]];
	}
	else if (
		// Make sure the array is long enough for this check
		straightArray.length > 6
		// Check if cards 0, 1, 2, 3, and 4 are 1 value away from each other
		&& straightArray[0] === straightArray[1] - 1
		&& straightArray[1] === straightArray[2] - 1
		&& straightArray[2] === straightArray[3] - 1
		// Include a check for Aces as low
		&& (straightArray[3] === straightArray[4] - 1  || straightArray[4] === straightArray[0] + 12)
	) {
		return ["Straight", 5, straightArray[4]];
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

	// Checks to see if cards 6, 5, and 4 have the same value
	if(allCards[6].val === allCards[5].val && allCards[5].val === allCards[4].val) {
		return ["3 of a Kind", 4, allCards[6].val, allCards[3].val, allCards[2].val];
	}
	else if(allCards[5].val === allCards[4].val && allCards[4].val === allCards[3].val) {
		return ["3 of a Kind", 4, allCards[5].val, allCards[6].val, allCards[2].val];
	}
	else if(allCards[4].val === allCards[3].val && allCards[3].val === allCards[2].val) {
		return ["3 of a Kind", 4, allCards[4].val, allCards[6].val, allCards[5].val];
	}
	else if(allCards[3].val === allCards[2].val && allCards[2].val === allCards[1].val) {
		return ["3 of a Kind", 4, allCards[3].val, allCards[6].val, allCards[5].val];
	}
	else if(allCards[2].val === allCards[1].val && allCards[1].val === allCards[0].val) {
		return ["3 of a Kind", 4, allCards[2].val, allCards[6].val, allCards[5].val];
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

	// Keeps track of the number of pairs and the value of each pair
	var numPairs = 0;
	var highPair = 0;
	var lowPair = 0;
	var tpHighCard = 0;

	// Checks to see if cards 6 and 5 are the same
	if(allCards[6].val === allCards[5].val) {
		// Increase the number of pairs by 1. The highest numPairs can be at this point is 1.
		numPairs++;
		// Store the high card
		highPair = allCards[6].val;
	}
	if(allCards[5].val === allCards[4].val) {
		// Increase the number of pairs by 1. The highest numPairs can be is still 1; if both applied, we would have ended at 3 of a Kind already.
		numPairs++;
		// Store the high card
		highPair = allCards[5].val;
	}
	if(allCards[4].val === allCards[3].val) {
		// Increase the number of pairs by 1. The highest numPairs can be is now 2.
		numPairs++;
		// If this was the first pair, store it as the highPair.
		if(numPairs === 1) {
			highPair = allCards[4].val;
		}
		// If there already is a highPair, store this as the lowPair
		else if(numPairs === 2) {
			lowPair = allCards[4].val;
		}
	}
	if(allCards[3].val === allCards[2].val) {
		numPairs++;
		if(numPairs === 1) {
			highPair = allCards[3].val;
		}
		else if(numPairs === 2) {
			lowPair = allCards[3].val;
		}
	}
	if(allCards[2].val === allCards[1].val) {
		numPairs++;
		if(numPairs === 1) {
			highPair = allCards[2].val;
		}
		else if(numPairs === 2) {
			lowPair = allCards[2].val;
		}
	}
	if(allCards[1].val === allCards[0].val) {
		numPairs++;
		// If this final check is the first pair, we don't want to store anything, because it's not 2 Pair.
		if(numPairs === 2) {
			lowPair = allCards[1].val;
		}
	}

	// Only run this if we find more than 1 pair.
	if(numPairs > 1) {
		// Determine the highest card that isn't part of the 2 pair
		if(tpHighCard === 0 && allCards[6].val !== highPair && allCards[6].val !== lowPair) { tpHighCard = allCards[6].val; }
		if(tpHighCard === 0 && allCards[5].val !== highPair && allCards[5].val !== lowPair) { tpHighCard = allCards[5].val; }
		if(tpHighCard === 0 && allCards[4].val !== highPair && allCards[4].val !== lowPair) { tpHighCard = allCards[4].val; }
		if(tpHighCard === 0 && allCards[3].val !== highPair && allCards[3].val !== lowPair) { tpHighCard = allCards[3].val; }
		if(tpHighCard === 0 && allCards[2].val !== highPair && allCards[2].val !== lowPair) { tpHighCard = allCards[2].val; }
		if(tpHighCard === 0 && allCards[1].val !== highPair && allCards[1].val !== lowPair) { tpHighCard = allCards[1].val; }
		if(tpHighCard === 0 && allCards[0].val !== highPair && allCards[0].val !== lowPair) { tpHighCard = allCards[0].val; }
		return ["2 Pair", 3, highPair, lowPair, tpHighCard];
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

	// Checks to see if cards 6 & 5 have the same value.
	if(allCards[6].val === allCards[5].val) {
		return ["Pair", 2, allCards[6].val, allCards[4].val, allCards[3].val, allCards[2].val];
	}
	else if(allCards[5].val === allCards[4].val) {
		return ["Pair", 2, allCards[5].val, allCards[6].val, allCards[3].val, allCards[2].val];
	}
	else if(allCards[4].val === allCards[3].val) {
		return ["Pair", 2, allCards[4].val, allCards[6].val, allCards[5].val, allCards[2].val];
	}
	else if(allCards[3].val === allCards[2].val) {
		return ["Pair", 2, allCards[3].val, allCards[6].val, allCards[5].val, allCards[4].val];
	}
	else if(allCards[2].val === allCards[1].val) {
		return ["Pair", 2, allCards[2].val, allCards[6].val, allCards[5].val, allCards[4].val];
	}
	else if(allCards[1].val === allCards[0].val) {
		return ["Pair", 2, allCards[1].val, allCards[6].val, allCards[5].val, allCards[4].val];
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

	// Returns the high card value
	return ["High Card", 1, allCards[6].val, allCards[5].val, allCards[4].val, allCards[3].val, allCards[2].val];
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