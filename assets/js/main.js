//Set up variables

//Quiz Questions
var questionArray = [ "What is the most popular pet in the United States?",
										"A group of cats is called a ____?",
										"Cats sleep over ____% of their lives.",
										"What flavor can cats not taste?",
										"How much is the richest cat worth?",
										"Cats make about ____ different sounds.",
										"A cat's brain is ____% close to humans.",
										"When a cat leaves its poop uncovered, it's a sign of ____ to let you know it doesn't fear you."
	];

//Quiz Answer Choices
var answerArray = [
									[ "Cats", "Dogs", "Hamsters", "Goldfish" ],
									[ "Pride", "Clowder", "Litter", "Clan" ],
									[ "65%", "50%", "70%", "85%" ],
									[ "Sour", "Spicy", "Sweetness", "Umami" ],
									[ "$100,000", "$25,573", "Nothing", "$13 million" ],
									[ "100", "10", "5", "65" ],
									[ "60%", "90%", "10%", "1%" ],
									[ "Calmness", "Love", "Aggression", "Fear" ]
									];

//Quiz Correct Answers
var correctAnswers = [ "A. Cats",
											"B. Clowder",
											"C. 70%",
											"C. Sweetness",
											"D. $13 million",
											"A. 100",
											"B. 90%",
											"D.  Aggression" ];
//Start Button
var initialScreen;

//Game Container
var gameHTML;

//Timer
var Clock;
var counter = 30;

//Tallies
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

//Counter--Keeps track of what questions the user is on
var questionCounter = 0;

//Audio
var clickSound = new Audio( "assets/sound/meow.mp3" ); //Selector Sound
var endMusic = new Audio( "assets/sound/endsong.mp3" ); //Music for the final page


$( document )
	.ready( function() {

		// Start button--First screen, pending quiz enabling by user
		function startScreen() {
			initialScreen =
				"<p class='text-center main-button-container'><a class='btn btn-default btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
			$( ".mainArea" )
				.html( initialScreen );
		}

		startScreen();

		// generateHTML will trigger once the user clicks the start button.
		$( "body" )
			.on( "click", ".start-button", function( event ) {
				event.preventDefault();
				clickSound.play(); //Meow Sound (repeats on each page)
				generateHTML();
				timerWrapper();
			} );

		$( "body" )
			.on( "click", ".answer", function( event ) {
				clickSound.play();
				selectedAnswer = $( this )
					.text();
					//Runs function to tally a correct answer and restart the timer from 30 seconds
				if ( selectedAnswer === correctAnswers[ questionCounter ] ) {
					clearInterval( Clock );
					generateWin();
					//Runs function to tally a wrong answer and restart the timer from 30 seconds
				} else {
					clearInterval( Clock );
					generateLoss();
				}
			} );

			//Last page function. Allows the user to reset the game after viewing their results.
		$( "body" )
			.on( "click", ".reset-button", function( event ) {
				clickSound.play();
				resetGame();
			} );

	} ); //  End of the jQuery wrapper

//Generates a loss once the timer runs out.
function timeOutLoss() {
	unansweredTally++;
	gameHTML =
		"<p class='text-center timer-p'>Time Left: <span class='timer'>" +
		counter + "</span></p>" +
		"<p class='text-center'>Playing with your dog?  The correct answer was: " +
		correctAnswers[ questionCounter ] + "</p>";
	$( ".mainArea" )
		.html( gameHTML );
	setTimeout( wait, 2500 );
}

//Tallies a win if the user answers correctly
function generateWin() {
	correctTally++;
	gameHTML =
		"<p class='text-center timer-p'>Time Left: <span class='timer'>" +
		counter + "</span></p>" + "<p class='text-center'>You got it, cat whisperer! The answer is: " +
		correctAnswers[ questionCounter ] + "</p>";
	$( ".mainArea" )
		.html( gameHTML );
	setTimeout( wait, 2500 );
}

//Tallies a loss if the user answers incorrectly
function generateLoss() {
	incorrectTally++;
	gameHTML =
		"<p class='text-center timer-p'>Time Left: <span class='timer'>" +
		counter + "</span></p>" +
		"<p class='text-center'>Ruh roh, is this dog?! The correct answer is: " + correctAnswers[
			questionCounter ] + "</p>";
	$( ".mainArea" )
		.html( gameHTML );
	setTimeout( wait, 2500 );
}

function generateHTML() {
	gameHTML =
		"<p class='text-center timer-p'>Time Left: <span class='timer'>30</span></p><p class='text-center'>" +
		questionArray[ questionCounter ] + "</p><p class='first-answer answer'>A. " +
		answerArray[ questionCounter ][ 0 ] + "</p><p class='answer'>B. " +
		answerArray[ questionCounter ][ 1 ] + "</p><p class='answer'>C. " +
		answerArray[ questionCounter ][ 2 ] + "</p><p class='answer'>D. " +
		answerArray[ questionCounter ][ 3 ] + "</p>";
	$( ".mainArea" )
		.html( gameHTML );
}

//Keeps the game going until the final question, then it will switch to the final screen.
function wait() {
	if ( questionCounter < 7 ) {
		questionCounter++;
		generateHTML();
		counter = 30;
		timerWrapper();
	} else {
		finalScreen();
	}
}

//Sets the clock to 30 seconds, 1 second intervals (1000ms)
function timerWrapper() {
	Clock = setInterval( thirtySeconds, 1000 );

	//If the user doesn't answer when the timer runs out, run the timeOutLoss function & mark in unansweredTally.
	function thirtySeconds() {
		if ( counter === 0 ) {
			clearInterval( Clock );
			timeOutLoss();
		}
		//If the number is greater than zero, keep counting down.
		if ( counter > 0 ) {
			counter--;
		}
		$( ".timer" )
			.html( counter );
	}
}

//Once all of the questions have been answered or timed out, the finalScreen will generate the user's results and play the MeowMix (endMusic) song.
function finalScreen() {
	gameHTML =
		"<p class='text-center timer-p'>Time Left: <span class='timer'>" +
		counter + "</span></p>" +
		"<p class='text-center'>Meow it's time for your results!" + "</p>" +
		"<p class='summary-right'>Correct: " + correctTally + "</p>" +
		"<p>Incorrect: " + incorrectTally + "</p>" + "<p>Skipped: " +
		unansweredTally + "</p>" +
		"<p class='text-center reset-button-container'><a class='btn btn-default btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$( ".mainArea" )
		.html( gameHTML );
	endMusic.play(); //#sorrynotsorry
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
