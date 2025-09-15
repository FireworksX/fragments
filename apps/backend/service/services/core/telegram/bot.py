import requests

from conf.settings import logger, service_settings
from services.core.routes.schemas.client import ClientInfo
from services.core.routes.schemas.feedback import FeedbackPost, FeelLevel


def send_feedback(fb: FeedbackPost, client_info: ClientInfo) -> None:
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

    message += f'\nDevice: {client_info.device_type.name if client_info.device_type else 'N/A'}'
    message += f'\nOS: {client_info.os_type.name if client_info.os_type else 'N/A'}'
    message += f'\nBrowser: {client_info.browser if client_info.browser else 'N/A'}'
    message += f'\nLanguage: {client_info.language if client_info.language else 'N/A'}'
    message += f'\nPage: {fb.page}'

    BOT_TOKEN = service_settings.TELEGRAM_BOT_TOKEN
    CHAT_ID = service_settings.TELEGRAM_CHAT_ID
    params = {'chat_id': CHAT_ID, 'text': message}
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    response = requests.post(url, params=params, timeout=10)

    if response.status_code == 200:
        logger.debug('Telegram message sent successfully!')
    else:
        logger.error(f'Failed to send telegram message: {response.text}')
        raise RuntimeError(f'Failed to send telegram message: {response.text}')
