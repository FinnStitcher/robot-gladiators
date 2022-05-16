console.log("NEW GAME START");

// let playerName = window.prompt("What is your robot's name?");
let playerName = "Rob";
let playerHealth = 100;
let playerAttack = 10;

let enemyName = "Roborto";
let enemyHealth = 50;
let enemyAttack = 12;

window.alert("Welcome to Robot Gladiators!");

let fight = function() {
    enemyHealth -= playerAttack;
    playerHealth -= enemyAttack;

    window.alert(`${playerName} attacked ${enemyName}! ${enemyName} now has ${enemyHealth} hit points remaining!`);
    if (enemyHealth === 0) {
        window.alert(`${enemyName} crumpled. Congratulations! You have won this battle!`)
    };

    window.alert(`${enemyName} attacked ${playerName}! ${playerName} now has ${playerHealth} hit points remaining!`);
    if (playerHealth === 0) {
        window.alert(`${playerName} crumpled. Woe betide, you have lost this battle.`)
    };
};