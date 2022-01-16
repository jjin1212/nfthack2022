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

// middleware
app.use(express.json());
app.use(express.urlencoded());

function getRandomMultiplierWithRange(min, max) { // min and max included 
    let randNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randNum / 100;
}

function battle(battle_id, avatarHp, cpuHp, avatarAttack, cpuAttack) {
    // Make the game more favorable for the avatar
    var dmgFromAvatar = avatarAttack * getRandomMultiplierWithRange(70,100);
    var dmgFromCpu = cpuAttack * getRandomMultiplierWithRange(70,100);

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

app.get("/", async (req, res) => {
    res.send("hello");
})

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
    console.log("fetched_battle_info: \n", fetched_battle_info);
    if (fetched_battle_info !== undefined ) {
        avatarHp = fetched_battle_info.avatarHp;
        cpuHp = fetched_battle_info.cpuHp;
    } else {
        avatarHp = req.avatarHp;
        // to start off make cpuHp/cpuAttack a bit less than hero
        cpuHp = avatarHp * getRandomMultiplierWithRange(80, 100);
    }
    cpuAttack = avatarAttack * getRandomMultiplierWithRange(80, 90);

    console.log("---------------- \n");
    console.log("Before \n");
    console.log("avatarHp: ", avatarHp, "\n");
    console.log("cpuHp: ", cpuHp, "\n");
    console.log("---------------- \n");

    results = await battle(battleId, avatarHp, cpuHp, avatarAttack, cpuAttack);

    console.log("---------------- \n");
    console.log("After \n");
    console.log("avatarHp: ", results.avatarHp, "\n");
    console.log("cpuHp: ", results.cpuHp, "\n");
    console.log("---------------- \n");

    await db.insertBattleInfo(
        battleId,
        results.cpuHp, 
        results.avatarHp,
        results.whoWon
    )
    res.send(results);
});


app.get("/get_result", urlencodedParser, async (req, res) => {
    req = req.query
    console.log(req)
    var battleId = req.battleId;
    console.log(battleId)
    
    fetched_battle_info = await db.fetchBattleInfo(battleId)
    console.log(fetched_battle_info)
    result = fetched_battle_info.battle_result == 'AVATAR' ? 1 : 2
    res.send({'result': result})
})


// Starting the server on the 80 port
app.listen(port, () => {
    console.log(`The application started
    successfully on port ${port}`);
});
