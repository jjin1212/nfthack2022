## Getting Started

First, run the development server:

```bash
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
