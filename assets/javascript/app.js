// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 30 seconds for each question
    var time = 30;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Who is the main character of Uncharted?",
	    choices: ["Nathan Drake", "Aloy", "Master Chief", "Mario"],
	    correctAnswer: "Nathan Drake",
	    image: "<img src='assets/images/nathanDrake.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What is the name of the fictional English archaeologist in the game Tomb Raider?",
	    choices: ["Cortana", "Lara Croft", "Faith", "Kitana"],
	    correctAnswer: "Lara Croft",
	    image: "<img src='assets/images/laraCroft.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Black Ops is the subtitle of which game?",
	    choices: ["Call of Duty", "Battlefield", "Operation:", "Sims 4"],
	    correctAnswer: "Call of Duty",
	    image: "<img src='assets/images/blackOps.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Pikachu is one of the species of creatures in which series of games?",
	    choices: ["Digimon", "Space Invaders", "Rick & Morty", "Pokemon"],
	    correctAnswer: "Pokemon",
	    image: "<img src='assets/images/pikachu.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What color is Pac-Man?",
	    choices: ["Pink", "Blue", "Burnt Orange", "Yellow"],
	    correctAnswer: "Yellow",
	    image: "<img src='assets/images/pacMan.png' class='img-circle shadow'>"
	  }];
	  

	// create question contents
	function questionContent() {
    	$("#gameScreen").append("<p class'questionHeader'><strong>" + questions[questionCounter].question + "</p><p class='choices'>" + questions[questionCounter].choices[0] + "</p><p class='choices'>" + questions[questionCounter].choices[1] + "</p><p class='choices'>" + questions[questionCounter].choices[2] + "</p><p class='choices'>" + questions[questionCounter].choices[3] + "</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'><strong>" + correctAnswer + "</strong></span></p>" + questions[questionCounter].image);
		setTimeout(nextQuestion, 5000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'><strong>" + correctAnswer + "</strong></span></p>" + questions[questionCounter].image);
		setTimeout(nextQuestion, 5000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'><strong>" + correctAnswer + "</strong></span></p>" + questions[questionCounter].image);
			setTimeout(nextQuestion, 5000);
			questionCounter++;
		}
	}

	function resultsScreen() {
		$("#gameScreen").html("<p>Good work!</p>" + "<p>You got <strong>" + correctGuesses + "</strong> right.</p>" + "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time <1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	function nextQuestion() {
		if (questionCounter < 5) {
			time = 30;
			$("#gameScreen").html("<p>You have <span id='timer'><strong>" + time + "</strong></span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	console.log(questionCounter);
	console.log(questions[questionCounter].correctAnswer);
	}

	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	// $("#gameScreen").append("<div id='question'>");
    	// var nextQuestion = questionContent(questionCounter);
    	// $("#gameScreen").append(nextQuestion);

		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});