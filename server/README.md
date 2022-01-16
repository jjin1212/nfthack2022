## Getting Started
Run all commands within /server directory

Download Mongo
```bash
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start mongodb-community@5.0
```

Then, run the development server:

```bash
node index.js
```

## Test
Option 1
Open another terminal window or tab.
```bash
pip install virtualenv
python3 -m venv venv
. venv/bin/activate
python test.py
```

Option 2
Just curl the endpoint https://localhost:80/battle data={...}
