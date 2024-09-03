import requests
from conf.settings import service_settings
from services.core.routes.schemas import Feedback, FeelLevel

BOT_TOKEN = service_settings.TELEGRAM_BOT_TOKEN
CHAT_ID = service_settings.TELEGRAM_CHAT_ID
MESSAGE = 'Hello from your bot!'

# Telegram API URL to send the message
url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'


def send_feedback(fb: Feedback) -> None:
    # Parameters for the API request
    message: str = f'Получили новый фидбек!\nПользователь: {fb.user.first_name} {fb.user.last_name}, {fb.user.email}\nСайт: {fb.page}\nСообщенние: {fb.content}'

    if fb.feel is not None:
        if fb.feel == FeelLevel.ONE:
            message += '\nНастроение: 😠'
        if fb.feel == FeelLevel.TWO:
            message += '\nНастроение: 😕'
        if fb.feel == FeelLevel.THREE:
            message += '\nНастроение: 😐'
        if fb.feel == FeelLevel.FOUR:
            message += '\nНастроение: 🙂'
        if fb.feel == FeelLevel.FIVE:
            message += '\nНастроение: 😃'
    params = {
        'chat_id': CHAT_ID,
        'text': message
    }

    # Send the request to Telegram
    response = requests.post(url, params=params)

    # Check the response
    if response.status_code == 200:
        print('Message sent successfully!')
    else:
        print('Failed to send message:', response.text)
