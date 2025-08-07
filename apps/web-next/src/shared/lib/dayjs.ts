import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/en'

// Подключаем плагины
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

// Устанавливаем локаль по умолчанию
dayjs.locale('en')

export default dayjs
