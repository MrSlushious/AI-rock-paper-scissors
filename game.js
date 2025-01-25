// Options for the game
const options = ["rock", "paper", "scissors"];

// Function for AI dialogue
function aiDialogue(aiName, choice) {
    return `${aiName}: I choose ${choice}!`;
}

// Function to determine the winner
function determineWinner(choice1, choice2) {
    if (choice1 === choice2) {
        return "It's a tie!";
    } else if (
        (choice1 === "rock" && choice2 === "scissors") ||
        (choice1 === "paper" && choice2 === "rock") ||
        (choice1 === "scissors" && choice2 === "paper")
    ) {
        return "Hruboš wins!";
    } else {
        return "Joshua wins!";
    }
}

// Function to simulate AI thinking with random delay
function delay(min, max) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
}

// Fixed delay for round transitions
function fixedDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update AI output for thinking and choices
function updateAiWindow(ai, thinkingText, choiceText) {
    const thinkingBox = document.getElementById(ai + '-thinking');
    const choiceBox = document.getElementById(ai + '-choice');
    
    thinkingBox.innerHTML = thinkingText;
    choiceBox.innerHTML = choiceText;
}

// Update game result
function updateResult(result) {
    document.getElementById('round-result').innerHTML = result;
}

// Update score output
function updateScore(hrubosScore, joshuaScore) {
    document.getElementById('game-score').innerHTML = `Hruboš: ${hrubosScore} - Joshua: ${joshuaScore}`;
}

// Game loop with score tracking
(async function runGame() {
    let hrubosScore = 0;
    let joshuaScore = 0;
    let roundNum = 1;

    updateResult("Welcome to the AI vs AI Rock-Paper-Scissors Game!");

    while (hrubosScore < 5 && joshuaScore < 5) {
        updateResult(`--- Round ${roundNum} ---`);

        // Update Hruboš thinking
        updateAiWindow('hrubos', "Hruboš is thinking...", "Waiting for choice...");
        await delay(500, 1500); // Random delay between 0.5 and 1.5 seconds
        const hrubosChoice = options[Math.floor(Math.random() * options.length)];
        updateAiWindow('hrubos', "...", aiDialogue("Hruboš", hrubosChoice));

        // Update Joshua thinking
        updateAiWindow('joshua', "Joshua is thinking...", "Waiting for choice...");
        await delay(500, 1500); // Random delay between 0.5 and 1.5 seconds
        const joshuaChoice = options[Math.floor(Math.random() * options.length)];
        updateAiWindow('joshua', "...", aiDialogue("Joshua", joshuaChoice));

        // Determine winner
        const result = determineWinner(hrubosChoice, joshuaChoice);
        updateResult(result);

        // Update scores
        if (result === "Hruboš wins!") {
            hrubosScore++;
        } else if (result === "Joshua wins!") {
            joshuaScore++;
        }

        // Display scores after a short delay
        await fixedDelay(3000); // 3-second delay before showing scores
        updateScore(hrubosScore, joshuaScore);

        // Delay before starting the next round
        await fixedDelay(3000); // 3-second delay before the next round
        roundNum++;
    }

    // Final result
    updateResult("Game Over!");
    if (hrubosScore === 5) {
        updateResult("Hruboš wins the game with 5 points!");
    } else if (joshuaScore === 5) {
        updateResult("Joshua wins the game with 5 points!");
    }

    updateResult("Thanks for watching the AI showdown!");
})();
