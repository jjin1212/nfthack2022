import requests

requests.post(
    'http://localhost:80/battle',
    data={
        'battleId': 9,
        'avatarAttack': 50,
        'avatarHp': 150
    }
)
