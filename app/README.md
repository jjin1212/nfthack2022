## Getting Started

First, run the development server:

```bash
yarn

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```bash
  /components # components are pure UI component and contains no logic
  /containers # containers are stateful components that are page specific, and usually consume a context
  /context # manage the state throughout the tree with react context
  /pages # statically generated pages
  /public # the public folder
```

## Minting the smart contract

If you want to modify the conrtact, you should deploy them by running the hardhat scripts. If not, you can use the pre-deployed contracts below.

### Ropsten Contract Addresses
- AvatarOwnership: `0x615c9303444c7Ba99c2ff6818E7DBCa755814945`

To mint the contract locally, create a `.env.local` file in the `/app` directory.
```
NEXT_PUBLIC_ALCHEMY=YOUR_ALCHEMY_NODE_WEBSOCKET_URL
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_AVATAR_OWNERSHIP_CONTRACT_ADDRESS
NEXT_PUBLIC_EQUIPMENT_CONTRACT_ADDRESS=
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=
```

Then, follow the Getting Started section, and go to `http://localhost:3000/mint`
