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
   
 }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
   e.preventDefault();
   message.innerText = "";

   const newGuess = letterInput.value;
   console.log(newGuess);

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
        message.innerText = "Really? Please enter a letter A-Z."
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
    }
};

