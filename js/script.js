const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    // console.log(data);
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
    

};

getWord();

const placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");  
 }
   wordInProgress.innerText = placeholderLetters.join("");
};



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
       updateGuessesRemaining(newGuess);
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

const updateGuessesRemaining = function (newGuess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(newGuess)) {
        message.innerText = `Sadly, the word doesn't contain ${newGuess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Nice! The word contains the letter ${newGuess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `You have no more guesses left. The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

