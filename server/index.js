// Importing express module
var express = require("express");

// Importing mongoose module
var mongoose = require("mongoose");
const port = 80;
const app = express();
const AVATAR = 'AVATAR';
const CPU = 'CPU';

function getRandomMultiplierWithRange(min, max) { // min and max included 
    let randNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randNum / 100;
}

function battle(avatarHp, cpuHp, avatarAttack, cpuAttack) {
    // Make the game more favorable for the avatar
    var dmgFromAvatar = avatarAttack * getRandomMultiplierWithRange(70,100);
    var dmgFromCpu = cpuAttack * getRandomMultiplierWithRange(40,100);

    
    cpuHp -= dmgFromAvatar;
    avatarHp -= dmgFromCpu;

    // Check if we have winners, the order matters, check CPU's hp first.
    // If one party won, we need to add back the dmg inflicted for the other party.
    // This is kind of a hack since we are trying to make 2 turns in one go. Let me know if you have qs
    var whoWon = ''
    if (cpuHp < 0) {
        whoWon = AVATAR;
        avatarHp += dmgFromCpu;
    } else if (avatarHp < 0) {
        whoWon = CPU;
        cpuHp += dmgFromAvatar;
    }

    var tokenBoostMultiplier = 1;
    var tokenLossMultiplier = 1;
    var xpBoostMultiplier = 1;
    if (whoWon == AVATAR) {
        // we + 1 for the boosts 
        tokenBoostMultiplier = getRandomMultiplierWithRange(50,100) + 1;
        xpBoostMultiplier = getRandomMultiplierWithRange(5,10) + 1;
    } else if (whoWon == CPU) {
        tokenLossMultiplier = getRandomMultiplierWithRange(0,100);
    }

    return {
        'whoWon': whoWon,
        'avatarHp': avatarHp,
        'cpuHp': cpuHp,
        'tokenBoostMultiplier': tokenBoostMultiplier,
        'tokenLossMultiplier': tokenLossMultiplier,
        'xpBoostMultiplier': xpBoostMultiplier,
    }
}

// Handling the get request
app.get("/", (req, res) => {
    res.send("Hello World");
});

// When avatar attacks and gets 200 from /battle endpoint, it should call this /fetchData
// to update the UI then call battle immediately after with isAvatarTurn = False.
// Repeat till whoWon field is populated with winner
app.get("/fetchData", (req, res) => {
    // return data to FE
})

// This will get called when we click "attack" in game AND when CPU is ready to attack
app.post("/battle", (req, res) => {
    var battleId = req.battleId;
    var avatarAttack = req.avatarAttack;

    var avatarHp = 0;
    var cpuHp = 0;
    var cpuAttack = 0;
    // fetch battleId from db
    // var battleDb = db.fetch(battleId);
    if (battleDb) {
        // fill in these fields
        avatarHp = req.avatarHp;
        cpuHp = db.cpuHp;
        cpuAttack = db.cpuHp;
    } else {
        avatarHp = req.avatarHp;    
        // to start off make cpuHp/cpuAttack a bit less than hero
        cpuHp = avatarHp - 1;
        cpuAttack = avatarAttack - 1;
    } 
    
    results = battle(avatarHp, cpuHp, avatarAttack, cpuAttack);
    // update db
    // send 200 success back to FE, with results
    res.send(results);
});

// Starting the server on the 80 port
app.listen(port, () => {
    console.log(`The application started
    successfully on port ${port}`);
});
