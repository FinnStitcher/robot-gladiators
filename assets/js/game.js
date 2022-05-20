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

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // oh my god i don't have to edit the numbers in multiple places now
    refillHealth: function() {
        if (this.money >= 5) {
            this.health += 20;
            this.money -= 5;
            window.alert(`You paid 5 dollars to recover 20 health points. You now have ${this.health} HP, and ${this.money} dollars left.`);
        }
        else {
            window.alert("You don't have enough money to do that!");
        };
    },
    upgradeAttack: function() {
        if (this.money >= 5) {
            this.attack += 6;
            this.money -= 5;
            window.alert(`You paid 5 dollars in return for 6 attack points. You now have ${this.attack} AP, and ${this.money} dollars left.`);
        }
        else {
            window.alert("You don't have enough money to do that!");
        };
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];


/* HOIST THESE */

function randomNumber(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    // dunno why we don't use Math.ceiling here, since i think it could achieve the same result... we would have to push the minimum down by one, though, so i guess it makes no difference
    return value;
};

function getPlayerName() {
    let name = "";

    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");

        if (name === "" || name === null) {
            window.alert("Please enter a name!");
        };
    };

    return name;
};


/* ARCHITECTURE */

let fightOrSkip = function() {
    let promptFight = window.prompt("Your opponent is getting ready. Type 'fight' to enter the ring, or 'skip' to back off.").toLowerCase();

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to select an option.");
        fightOrSkip();
    }
    else if (promptFight === "fight") {
        fight();
    }
    else if (promptFight === "skip") {
        let confirmSkip = window.confirm("Are you sure? If you skip, you'll lose 2 dollars, but you may be better equipped for the next battle.");

        if (confirmSkip) {
            playerInfo.money = Math.max(0, playerInfo.money - 2);
            window.alert(`You have chosen to skip the fight! After paying the toll, you have ${playerInfo.money} dollars left.`);
            return true;
        }
        else {
            return false;
        };
        // true/false return is used in fight() to kill the loop if desired
    }
    else {
        window.alert("You need to select a valid option.")
        fightOrSkip();
    };
    // else-if chain is necessary so entering a blank input doesn't call two different error responses
};

let fight = function(enemy) {
    while (enemy.health > 0 && playerInfo.health > 0) {
        // kill the loop if the player chose to skip

        if (fightOrSkip()) {
            break;
        };
        
        window.alert(`${enemy.name} enters the ring!`);

        // pick a random number for the damage done to the enemy
        // subtract that damage from enemy.health, making sure it doesn't go negative
        // popup describes what happened

        let damageToEnemy = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damageToEnemy);
        window.alert(`${playerInfo.name} attacked ${enemy.name}! ${enemy.name} now has ${enemy.health} hit points remaining!`);
        if (enemy.health <= 0) {
            window.alert(`${enemy.name} crumpled. Congratulations! You have won this battle!`);
            break;
        };
        
        // same as above but the player is attacked

        let damageToPlayer = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damageToPlayer);
        window.alert(`${enemy.name} attacked ${playerInfo.name}! ${playerInfo.name} now has ${playerInfo.health} hit points remaining!`);
        if (playerInfo.health <= 0) {
            window.alert(`${playerInfo.name} crumpled. Woe betide, you have lost this battle.`);
            break;
        };
    };
};

let shop = function() {
    let shopOptionPrompt = window.prompt("Enter '1' to refill your health, '2' to upgrade your attack, or '3' to leave the store.");
    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("You left the store.");
            break;
        default:
            window.alert("Please pick a valid option!");
            shop();
            break;
    }
}


/* START AND END */

let startGame = function() {
    window.alert("Welcome to Robot Gladiators!");

    for (let i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert(`Begin Round ${i + 1}!`);

            let currentEnemy = enemyInfo[i];
            currentEnemy.health = randomNumber(40, 60);
            fight(currentEnemy);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert(`Great job, you survived Robot Gladiators! Your final score was ${playerInfo.money}.`)
    }
    else {
        window.alert(`Game over! You lost your robot in battle. Your final score was ${playerInfo.money}.`)
    };

    let playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        // i just feel like it makes more sense to reset things down here
        playerInfo.reset();
        startGame();
    }
    else {
        window.alert("Thanks for playing! Come back soon!");
    };
};

startGame();