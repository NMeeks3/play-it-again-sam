const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");  
 }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
   e.preventDefault();
   message.innerText = "";

   const newGuess = letterInput.value;

   const correctGuess = validateInput(newGuess);

   if (correctGuess)  {
    makeGuess(newGuess);
   }
   letterInput.value = "";

});

const validateInput = function (input) {
   const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Only one letter at a time."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Really? Please enter a letter from A-Z."
    } else {
        return input;
    }
};

const makeGuess = function (newGuess) {
    newGuess = newGuess.toUpperCase();
    if (guessedLetters.includes(newGuess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
       guessedLetters.push(newGuess);
       console.log(guessedLetters); 
       showGuessedLetters();
       updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        showWord.push(letter.toUpperCase());
      } else {
        showWord.push("●")
      }
    }
    wordInProgress.innerText = showWord.join("");
    checkWin();
    // console.log(showWord);
    // console.log(wordArray);
};

const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};