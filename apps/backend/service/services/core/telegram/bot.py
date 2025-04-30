import requests

from conf.settings import service_settings
from services.core.routes.schemas.feedback import FeedbackGet, FeelLevelGet

BOT_TOKEN = service_settings.TELEGRAM_BOT_TOKEN
CHAT_ID = service_settings.TELEGRAM_CHAT_ID
MESSAGE = 'Hello from your bot!'

# Telegram API URL to send the message
url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'


def send_feedback(fb: FeedbackGet) -> None:
    # Parameters for the API request
    message: str = (
        f'Получили новый фидбек!{'\nПользователь:' if False else ''}\nСайт: {fb.page}{'\nСообщенние:' + fb.content if fb.content is not None else ''}'
    )

    if fb.feel == FeelLevelGet.ONE:
        message += '\nНастроение: 😠'
    if fb.feel == FeelLevelGet.TWO:
        message += '\nНастроение: 😕'
    if fb.feel == FeelLevelGet.THREE:
        message += '\nНастроение: 😐'
    if fb.feel == FeelLevelGet.FOUR:
        message += '\nНастроение: 🙂'
    if fb.feel == FeelLevelGet.FIVE:
        message += '\nНастроение: 😃'
    params = {'chat_id': CHAT_ID, 'text': message}

    # Send the request to Telegram
    response = requests.post(url, params=params)

    # Check the response
    if response.status_code == 200:
        print('Message sent successfully!')
    else:
        print('Failed to send message:', response.text)
