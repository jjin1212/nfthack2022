import fetch from "node-fetch";
import { ethers } from "ethers";

import EquipmentContract from "../../../artifacts/contracts/Equipment.sol/EquipmentContract.json";

import { config } from "../../config";

const getAvatarAttack = async (address) => {
  if (!address) return;

  const _provider = new ethers.providers.WebSocketProvider(config.alchemy);
  const _equipmentContract = new ethers.Contract(
    config.equipmentContractAddress,
    EquipmentContract.abi,
    _provider,
  );

  const totalOne = _equipmentContract.balanceOf(address, 0);
  const totalTwo = _equipmentContract.balanceOf(address, 1);
  const totalThree = _equipmentContract.balanceOf(address, 2);
  const total = await Promise.all([totalOne, totalTwo, totalThree]);
  const totalInNumber = total.map(t => ethers.BigNumber.from(t).toString());

  const milkPower = 20;
  const corndogPower = 9;
  const tomatoPower = 12;

  const attack = (parseInt(totalInNumber[0]) * milkPower) + (parseInt(totalInNumber[1]) * corndogPower) + (parseInt(totalInNumber[2]) * tomatoPower);

  return attack;
};

export default async function handler(req, res) {
  const reqbody = JSON.parse(req.body);
  const attack = await getAvatarAttack(reqbody.address);

  const result = await fetch("http://localhost:80/battle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "battleId": reqbody.battleId,
      "avatarAttack": attack,
      "avatarHp": 150,
    }),
  });
  console.log(result);
  const json = await result.json();
  res.status(200).json(json);
}