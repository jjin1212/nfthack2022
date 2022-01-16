import requests

resp = requests.post(
    'http://localhost:80/battle',
    data={
        'battleId': 9,
        'avatarAttack': 50,
        'avatarHp': 2
    }
)

print(resp.json())

# resp = requests.get(
#     'http://368b-99-241-141-46.ngrok.io/get_result?battleId=9',
# )

print(resp.json())