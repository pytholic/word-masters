// Let's query the DOM and get things we need first
const letters = document.querySelectorAll(".letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = "";
  let currentRow = 0;

  // Getting word of the day
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  let done = false;

  setLoading(false);

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      // add letter to the end
      currentGuess += letter;
    } else {
      // if length is full replace last letter with newly entered one
      // here we chop off last and add letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    // Write char in the box
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    // length < 5 => do nothing
    if (currentGuess.length !== ANSWER_LENGTH) return;

    // Win logic
    if (currentGuess === word) {
      // win
      alert("you win!");
      done = true;
      return;
    }

    // TODO: validate the word

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
    console.log(map);

    // Character color logic

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      // mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing, we already did it
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        // mark as close
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close"); // correct but wrong place
        map[guessParts[i]]--; // important
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    // else go to next row
    currentRow++;
    // reset guessed
    currentGuess = "";

    // Lose logic
    if (currentRow === ROUNDS) {
      alert(`you lose, the word was ${word}`);
      done = true;
    }
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    // no '-1' because we want to remove the next one
    // length letters in one large than currentGuess now
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  // Get the key pressed
  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;
    console.log(action);

    // keep the keys we want and ignore rest
    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase()); // everything in uppercase
    } else {
      //do nothing
    }
  });

  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  function setLoading(isLoading) {
    // if loading, then show loading spiral
    loadingDiv.classList.toggle("show", isLoading); // shortcut for classList.add or remove
  }

  // Utility function to ocunter number of occurrrences
  function makeMap(array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
      const letter = array[i];
      if (obj[letter]) {
        obj[letter]++;
      } else {
        obj[letter] = 1;
      }
    }
    return obj;
  }
}
init();
