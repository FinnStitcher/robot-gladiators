// Game States
// PLAYING - player is actively fighting
// WIN - player has defeated or skipped all enemies
// LOSE - player has run out of health

// declare global variables
// use a for loop to iterate over array of enemies to perform multiple fights
// before each fight, ask the player to fight or skip
    // if fight: continue
    // if skip: subtract 2 dollars, and go to the next iteration of the loop
// for each enemy, run a loop of attacks
    // on each iteration:
    // calculate enemy hp and display message
        // if 0, go to the next enemy
            // if there is no next enemy, end the game
    // calculate player hp and display message
        // if 0, end the game

// let playerName = window.prompt("What is your robot's name?");
// ^ commented out for easier testing
let playerName = "Rob";
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

let fight = function(enemyName) {
    let promptFight = window.prompt("Your opponent is getting ready. Type 'fight' to enter the ring, or 'skip' to back off.");
    promptFight = promptFight.toLowerCase();
    
    if (promptFight === 'fight') {
        window.alert(`${enemyName} enters the ring!`);

        while (enemyHealth > 0 && playerHealth > 0) {
            // subtract playerAttack from enemyHealth
            // display message describing what happened
            // check if enemy is defeated and exit fight() if yes
            enemyHealth -= playerAttack;
            window.alert(`${playerName} attacked ${enemyName}! ${enemyName} now has ${enemyHealth} hit points remaining!`);
            if (enemyHealth <= 0) {
                window.alert(`${enemyName} crumpled. Congratulations! You have won this battle!`);
                break;
            };
            
            // same as above but the player is attacked
            playerHealth -= enemyAttack;
            window.alert(`${enemyName} attacked ${playerName}! ${playerName} now has ${playerHealth} hit points remaining!`);
            if (playerHealth <= 0) {
                window.alert(`${playerName} crumpled. Woe betide, you have lost this battle.`);
                break;
            };
        };
    }
    else if (promptFight === 'skip') {
        let confirmSkip = window.confirm("Are you sure? If you skip, you'll lose 2 dollars, but you may be better equipped for the next battle.");
        if (confirmSkip) {
            playerMoney -= 2;
            window.alert(`You have chosen to skip the fight! After paying the toll, you have ${playerMoney} dollars left.`);
            // no break is needed here. the if statement is finished, which finishes this if block, which finishes the fight() function
            // in other words it goes straight to the next loop
        }
        else {
            fight();
        };
    }
    else {
        window.alert("You need to choose a valid option. Try again!");
        fight();
    };
};

window.alert("Welcome to Robot Gladiators!");

for (let i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        window.alert(`Begin Round ${i + 1}!`);

        let pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        fight(pickedEnemyName);
    }
    else {
        window.alert("Game Over!");
        break;
    };
};