const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

(async () => {

  const doc = JSON.stringify({
    id: 0,
    name: 'Sword',
    image: "https://bafkreidhlf5ebtc5pe2hwtsyfdbu26btaikan2f4xcy36vmqy3wcckoq5y.ipfs.dweb.link"
  });
  
  const cid = await ipfs.add(doc);

  console.log("IPFS cid:", cid);
  
  console.log(await ipfs.cat(cid));

})();