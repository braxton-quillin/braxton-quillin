//sets a random word as the variable theWord
var theWord = randomWord();
//tests
console.log(theWord);

//starts the counting of guesses
var currentGuesses = 0;

//currentString held in the row
var currentString = "";

//stores if the User has won yet
var haveWon = false;

//array containing used wrong letters
var usedLetters = [];

//stores yellow letter
var yellowLetters = [];

//stores green letter
var greenLetters = [];

//returns random word from goodWords
function randomWord() {
    let chosenWordID = Math.floor(Math.random() * goodWords.length);
    return goodWords[chosenWordID];
}
//returns if a word is in allWords
function checkWord(guessedWord) {
    if (allWords.includes(guessedWord) || goodWords.includes(guessedWord)) {
        return true;
    } else {
        return false;
    }
}

//replace char in string
function replaceAt(input, index, replacement) {
    return input.substring(0, index) + replacement + input.substring(index + 1);
}

//figuring out how to code keyboard
function letterPressed(letter) {
    currentString = currentString + letter;
}

//process keyboard strokes as a virtual key
document.onkeydown = function (evt) {
    evt = evt || window.event;
    let key = String.fromCharCode(evt.keyCode);
    let keyLetter = key.toLowerCase();
    if (evt.keyCode == 8) {
        deleteLast();
    } else if (evt.keyCode == 13) {
        makeGuess();
    } else if (46 < evt.keyCode && evt.keyCode < 91) {
        letter(keyLetter);
    }
};

//handling Keypress
function letter(inputLetter) {
    if (currentString.length < 5) {
        letterPressed(inputLetter);
        if (currentGuesses < 6) {
            updateRow();
        }
    }
}

//deletes last letter in string
function deleteLast() {
    let num = currentString.length - 1;
    currentString = currentString.substring(0, num);
    updateRow();
}

//function that process user input against correct array
function compareWords(input) {
    let guess = input;
    let solution = theWord;
    var result = ["grey", "grey", "grey", "grey", "grey"];
    for (let i = 0; i < guess.length; i++) {
        let guessLetter = guess.charAt(i);
        let solutionLetter = solution.charAt(i);
        if (guessLetter == solutionLetter) {
            if (greenLetters.includes(guessLetter) == false) {
                greenLetters.push(guessLetter);
            }
            result[i] = "green";
            guess = replaceAt(guess, i, " ");
            solution = replaceAt(solution, i, "/");
        }
    }
    for (let i = 0; i < guess.length; i++) {
        let guessLetter = guess.charAt(i);
        if (solution.includes(guessLetter)) {
            if (result[i] == "grey" && yellowLetters.includes(guessLetter) == false) {
                result[i] = "yellow";
            }
            if (yellowLetters.includes(guessLetter) == false && greenLetters.includes(guessLetter) == false) {
                yellowLetters.push(guessLetter);
            }
            guess = replaceAt(guess, i, " ");
            solution = replaceAt(solution, i, "/");
        }
    }
    for (let i = 0; i < guess.length; i++) {
        let guessLetter = guess.charAt(i);
        if (guessLetter != "0" && usedLetters.includes(guessLetter) == false && yellowLetters.includes(guessLetter) == false && greenLetters.includes(guessLetter) == false) {
            usedLetters.push(guessLetter);
        }
    }
    greenLetters.sort();
    yellowLetters.sort();
    usedLetters.sort();
    return result;
}

//processes the Enter command
function makeGuess() {
    if (currentGuesses < 6) {
        let guess = currentString;
        if (guess.length < 5) {
            tooShort();
        } else if (checkWord(guess) == false) {
            notOnList();
        } else if (guess == theWord) {
            let boxes = compareWords(guess);
            colorSquares(boxes);
            currentGuesses++;
            colorKeys();
            win();
        } else if (currentGuesses == 5 && haveWon == false) {
            let boxes = compareWords(guess);
            colorSquares(boxes);
            currentGuesses++;
            colorKeys();
            lose();
        } else {
            let boxes = compareWords(guess);
            colorSquares(boxes);
            currentGuesses++;
            currentString = "";
            colorKeys();
        }
    }
}

//function to grey letters inside the keyboard
function colorKeys() {
    for (var i = 0; i < usedLetters.length; i++) {
        if (document.getElementById(usedLetters[i]) != null) {
            document.getElementById(usedLetters[i]).style.background = "#262e3b";
        }
    }

    for (i = 0; i < yellowLetters.length; i++) {
        if (document.getElementById(yellowLetters[i]) != null) {
            document.getElementById(yellowLetters[i]).style.background = "#c7c10c";
        }
    }

    for (i = 0; i < greenLetters.length; i++) {
        if (document.getElementById(greenLetters[i]) != null) {
            document.getElementById(greenLetters[i]).style.background = "green";
        }
    }
    console.log(usedLetters);
    console.log(yellowLetters);
    console.log(greenLetters);
    console.log("done");
}

function colorSquares(boxes) {
    if (currentGuesses == 0) {
        document.getElementById("letter1x1").style.background = boxes[0];
        document.getElementById("letter1x2").style.background = boxes[1];
        document.getElementById("letter1x3").style.background = boxes[2];
        document.getElementById("letter1x4").style.background = boxes[3];
        document.getElementById("letter1x5").style.background = boxes[4];
    } else if (currentGuesses == 1) {
        document.getElementById("letter2x1").style.background = boxes[0];
        document.getElementById("letter2x2").style.background = boxes[1];
        document.getElementById("letter2x3").style.background = boxes[2];
        document.getElementById("letter2x4").style.background = boxes[3];
        document.getElementById("letter2x5").style.background = boxes[4];
    } else if (currentGuesses == 2) {
        document.getElementById("letter3x1").style.background = boxes[0];
        document.getElementById("letter3x2").style.background = boxes[1];
        document.getElementById("letter3x3").style.background = boxes[2];
        document.getElementById("letter3x4").style.background = boxes[3];
        document.getElementById("letter3x5").style.background = boxes[4];
    } else if (currentGuesses == 3) {
        document.getElementById("letter4x1").style.background = boxes[0];
        document.getElementById("letter4x2").style.background = boxes[1];
        document.getElementById("letter4x3").style.background = boxes[2];
        document.getElementById("letter4x4").style.background = boxes[3];
        document.getElementById("letter4x5").style.background = boxes[4];
    } else if (currentGuesses == 4) {
        document.getElementById("letter5x1").style.background = boxes[0];
        document.getElementById("letter5x2").style.background = boxes[1];
        document.getElementById("letter5x3").style.background = boxes[2];
        document.getElementById("letter5x4").style.background = boxes[3];
        document.getElementById("letter5x5").style.background = boxes[4];
    } else if (currentGuesses == 5) {
        document.getElementById("letter6x1").style.background = boxes[0];
        document.getElementById("letter6x2").style.background = boxes[1];
        document.getElementById("letter6x3").style.background = boxes[2];
        document.getElementById("letter6x4").style.background = boxes[3];
        document.getElementById("letter6x5").style.background = boxes[4];
    }
}

//updating currentRow
function updateRow() {
    if (haveWon == false) {
        if (currentGuesses == 0) {
            document.getElementById("letter1x1").innerHTML = currentString.charAt(0);
            document.getElementById("letter1x2").innerHTML = currentString.charAt(1);
            document.getElementById("letter1x3").innerHTML = currentString.charAt(2);
            document.getElementById("letter1x4").innerHTML = currentString.charAt(3);
            document.getElementById("letter1x5").innerHTML = currentString.charAt(4);
        } else if (currentGuesses == 1) {
            document.getElementById("letter2x1").innerHTML = currentString.charAt(0);
            document.getElementById("letter2x2").innerHTML = currentString.charAt(1);
            document.getElementById("letter2x3").innerHTML = currentString.charAt(2);
            document.getElementById("letter2x4").innerHTML = currentString.charAt(3);
            document.getElementById("letter2x5").innerHTML = currentString.charAt(4);
        } else if (currentGuesses == 2) {
            document.getElementById("letter3x1").innerHTML = currentString.charAt(0);
            document.getElementById("letter3x2").innerHTML = currentString.charAt(1);
            document.getElementById("letter3x3").innerHTML = currentString.charAt(2);
            document.getElementById("letter3x4").innerHTML = currentString.charAt(3);
            document.getElementById("letter3x5").innerHTML = currentString.charAt(4);
        } else if (currentGuesses == 3) {
            document.getElementById("letter4x1").innerHTML = currentString.charAt(0);
            document.getElementById("letter4x2").innerHTML = currentString.charAt(1);
            document.getElementById("letter4x3").innerHTML = currentString.charAt(2);
            document.getElementById("letter4x4").innerHTML = currentString.charAt(3);
            document.getElementById("letter4x5").innerHTML = currentString.charAt(4);
        } else if (currentGuesses == 4) {
            document.getElementById("letter5x1").innerHTML = currentString.charAt(0);
            document.getElementById("letter5x2").innerHTML = currentString.charAt(1);
            document.getElementById("letter5x3").innerHTML = currentString.charAt(2);
            document.getElementById("letter5x4").innerHTML = currentString.charAt(3);
            document.getElementById("letter5x5").innerHTML = currentString.charAt(4);
        } else if (currentGuesses == 5) {
            document.getElementById("letter6x1").innerHTML = currentString.charAt(0);
            document.getElementById("letter6x2").innerHTML = currentString.charAt(1);
            document.getElementById("letter6x3").innerHTML = currentString.charAt(2);
            document.getElementById("letter6x4").innerHTML = currentString.charAt(3);
            document.getElementById("letter6x5").innerHTML = currentString.charAt(4);
        }
    }
}

//function that alerts Too Short! if the user guesses with a string < 5
function tooShort() {
    let popUp = document.getElementById("popUp");
    popUp.innerHTML = "Too Short!";
    popUp.style.visibility = "visible";
    setTimeout(hidePopup, 3000);
}

function notOnList() {
    let popUp = document.getElementById("popUp");
    popUp.innerHTML = "Not on List!";
    popUp.style.visibility = "visible";
    setTimeout(hidePopup, 3000);
}

function win() {
    let popUp = document.getElementById("popUp");
    popUp.innerHTML = "You Win!";
    popUp.style.visibility = "visible";
}

function lose() {
    let popUp = document.getElementById("popUp");
    popUp.innerHTML = "You Lost <br> The word was: " + theWord;
    popUp.style.visibility = "visible";
}

function hidePopup() {
    let popUp = document.getElementById("popUp");
    popUp.style.visibility = "hidden";
}