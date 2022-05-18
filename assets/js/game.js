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

/* ok so we need to reconfigure all this shit so its not all in one huge convoluted function
first lets outline game progression
- game loads up and displays welcome message
- begin rounds loop
    - fight/skip message
        - if fight: run battle loop
            - after each subtraction, confirm if someone has lost
                - if enemy has lost, end battle loop, go to shop (best if shop is a different function i think?)
                - if player has lost, end battle loop, skip shop loop, display game over/restart
        - if skip: confirm and subtract penalty
    - after round, display shop message
        - if refill: set health to default, subtract money, go to next round
        - if upgrade: increase attack, subtract money, go to next round
        - if leave: go to next round
- after running out of enemies, display game over/restart 

so how many functions should we have...
im thinking
- general for loop
    - pulling the progression selection into its own function might be good OR too complicated
    - fight()
        - while loop
    - skip()
    - shop()
- gameOver() */

// let playerName = window.prompt("What is your robot's name?");
// ^ commented out for easier testing
let playerName = "Rob";
let playerHealth = 50;
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

let shop = function() {
    let shopOptionPrompt = window.prompt("Would you like to refill your health, upgrade your attack, or leave the store? Type 'refill', 'upgrade', or 'leave' to make your choice.");
    shopOptionPrompt = shopOptionPrompt.toLowerCase();

    switch (shopOptionPrompt) {
        case "refill":
            if (playerMoney >= 5) {
                playerHealth += 20;
                playerMoney -= 5;
                window.alert("You paid 5 dollars to refill your health by 20 points.");
                window.alert(`You now have ${playerMoney} dollars and ${playerHealth} health.`);                
            }
            else {
                window.alert("You don't have enough money!");
            };
            break;
        case "upgrade":
            if (playerMoney >= 5) {
                playerAttack += 5;
                playerMoney -= 5;
                window.alert("You paid 5 dollars to upgrade your attack by 5 points.");
                window.alert(`You now have ${playerMoney} dollars and ${playerAttack} attack points.`);                
            }
            else {
                window.alert("You don't have enough money!");
            };
            break;
        case "leave":
            window.alert("You left the store.");
            break;
        default:
            window.alert("Please pick a valid option!");
            shop();
            break;
    }
}

let startGame = function() {
    window.alert("Welcome to Robot Gladiators!");

    playerHealth = 50;
    playerAttack = 10;
    playerMoney = 10;

    for (let i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert(`Begin Round ${i + 1}!`);

            let currentEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(currentEnemyName);
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                let storeConfirm = window.confirm("The fight is over; visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                };
            };
        }
        else {
            break;
            // break kicks us out of the for loop
        }
    };

    endGame();
};

let endGame = function() {
    if (playerHealth > 0) {
        window.alert(`Great job, you survived Robot Gladiators! Your final score was ${playerMoney}.`)
    }
    else {
        window.alert(`Game over! You lost your robot in battle. Your final score was ${playerMoney}.`)
    };

    let playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thanks for playing! Come back soon!");
    };
};

startGame();