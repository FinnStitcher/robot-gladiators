// Game States
// PLAYING - player is actively fighting
// WIN - player has defeated or skipped all enemies
// LOSE - player has run out of health

// iterate over array of enemies to perform multiple fights
// for each enemy, run a loop of attacks
    // calculate enemy hp and display message
        // if 0, go to the next enemy
            // if there is no next enemy, end the game
    // calculate player hp and display message
        // if 0, end the game

// let playerName = window.prompt("What is your robot's name?");
let playerName = "Rob";
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

// window.alert("Welcome to Robot Gladiators!");

let fight = function(enemyName) {
    let promptFight = window.prompt("Your opponent is getting ready. Type 'fight' to enter the ring, or 'skip' to back off.");
    // quickly make sure the prompt input is valid
    promptFight = promptFight.toLowerCase();
    
    if (promptFight === 'fight') {
        // player deals damage to enemy
        // alert describing the damage is displayed
        enemyHealth -= playerAttack;
        window.alert(`${playerName} attacked ${enemyName}! ${enemyName} now has ${enemyHealth} hit points remaining!`);
        // if the enemy has zero health another alert is displayed
        if (enemyHealth === 0) {
            window.alert(`${enemyName} crumpled. Congratulations! You have won this battle!`)
        };

        // enemy deals damage to player with the same system
        playerHealth -= enemyAttack;
        window.alert(`${enemyName} attacked ${playerName}! ${playerName} now has ${playerHealth} hit points remaining!`);
        if (playerHealth === 0) {
            window.alert(`${playerName} crumpled. Woe betide, you have lost this battle.`)
        };
    }

    else if (promptFight === 'skip') {
        let confirmSkip = window.confirm("Are you sure? If you skip, you'll lose 2 dollars, but you may be better equipped for the next battle.");

        // if yes is selected confirmSkip === true
        if (confirmSkip) {
            playerMoney -= 2;
            window.alert(`You have chosen to skip the fight! After paying the toll, you have ${playerMoney} dollars left.`);
        }
        else {
            fight();
        };
    }

    else {
        window.alert("You need to choose a valid option. Try again!")
        fight();
    }
};

for (let i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i])
};