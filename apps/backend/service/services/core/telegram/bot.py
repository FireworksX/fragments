import requests

from conf.settings import service_settings
from services.core.routes.schemas.client import ClientInfo
from services.core.routes.schemas.feedback import FeedbackPost, FeelLevel

BOT_TOKEN = service_settings.TELEGRAM_BOT_TOKEN
CHAT_ID = service_settings.TELEGRAM_CHAT_ID

# Telegram API URL to send the message
url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'


def send_feedback(fb: FeedbackPost, client_info: ClientInfo) -> None:
    # Parameters for the API request
    message: str = (
        f'Получили новый фидбек!\nСайт: {fb.page}{'\nСообщенние:' + fb.content if fb.content is not None else ''}'
    )

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

    message += f'\nIP: {client_info.ip_address}'
    message += f'\nDevice: {client_info.device_type}'
    message += f'\nOS: {client_info.os_type}'
    message += f'\nBrowser: {client_info.browser}'
    message += f'\nLanguage: {client_info.language}'
    message += f'\nScreen Width: {client_info.screen_width}'
    message += f'\nScreen Height: {client_info.screen_height}'

    params = {'chat_id': CHAT_ID, 'text': message}

    # Send the request to Telegram
    response = requests.post(url, params=params, timeout=10)

    # Check the response
    if response.status_code == 200:
        print('Message sent successfully!')
    else:
        print('Failed to send message:', response.text)
