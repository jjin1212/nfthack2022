const { MongoClient } = require("mongodb");


uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri);


async function fetchBattleInfo(_battle_id) {
    await client.connect();
    const database = client.db("mydb");
    const table = database.collection("battle_results");
    var query = { battle_id:  _battle_id};

    var result = await table.find(query).toArray()
    return result[0]
}

async function insertBattleInfo(
  battle_id,
  cpuHp, 
  avatarHp,
  whoWon
) {
    try {
      await client.connect();
      const database = client.db("mydb");
      const table = database.collection("battle_results");
      await table.deleteOne({battle_id: battle_id});
      // create a document to insert
      const battle_result = {
        battle_id: battle_id,
        battle_result: whoWon,
        cpuHp: cpuHp,
        avatarHp: avatarHp
      }
      const result = await table.insertOne(battle_result);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {

    }
}

module.exports = {
  fetchBattleInfo,
  insertBattleInfo
};
