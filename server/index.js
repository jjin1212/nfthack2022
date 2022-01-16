// Importing express module
var express = require("express");
var bodyParser = require('body-parser')
var db = require("./db");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// create application/json parser
var jsonParser = bodyParser.json()

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

function battle(battle_id, avatarHp, cpuHp, avatarAttack, cpuAttack) {
    // Make the game more favorable for the avatar
    var dmgFromAvatar = avatarAttack * getRandomMultiplierWithRange(70,100);
    var dmgFromCpu = cpuAttack * getRandomMultiplierWithRange(40,100);

    var whoWon = ''
    cpuHp -= dmgFromAvatar;
    if (cpuHp <= 0) {
        whoWon = AVATAR;
    }
    else {
        avatarHp -= dmgFromCpu;
        if (avatarHp <= 0) {
            whoWon = CPU;
        }
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

// This will get called when we click "attack" in game AND when CPU is ready to attack
app.post("/battle", urlencodedParser, async (req, res) => {
    req = req.body
    var battleId = req.battleId;
    var avatarAttack = req.avatarAttack;

    var avatarHp = 0;
    var cpuHp = 0;
    var cpuAttack = 0;

    // Fetch battle info from DB
    fetched_battle_info = await db.fetchBattleInfo(battleId)
    if (fetched_battle_info !== undefined ) {
        avatarHp = fetched_battle_info.avatarHp;
        cpuHp = fetched_battle_info.cpuHp;
        cpuAttack = fetched_battle_info.cpuHp;
    } else {
        avatarHp = req.avatarHp;
        // to start off make cpuHp/cpuAttack a bit less than hero
        cpuHp = avatarHp - 1;
        cpuAttack = avatarAttack - 1;
    }
    
    results = battle(battleId, avatarHp, cpuHp, avatarAttack, cpuAttack);
    db.insertBattleInfo(
        battleId,
        results.cpuHp, 
        results.avatarHp,
        results.whoWon
    )
    res.send(results);
});


// Starting the server on the 80 port
app.listen(port, () => {
    console.log(`The application started
    successfully on port ${port}`);
});
