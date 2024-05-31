/**
 * Для чего нужен этот normalize.
 * Когда загружается уже созданный шаблон, мы получаем его конфиг.
 * Потом мы берём конфиг из стора и заполняем его данными которые нам пришли.
 * Если в сторе не будет каких-то полей, то они не заполнятся и при загрузки шаблона
 * данные не подставятся.
 */
import { get, set } from '../src'

const normalizedLeague = () => ({
  name: null,
  logo: null
})

const normalizedTeam = () => ({
  name: null,
  logo: null,
})

const normalizedPrediction = () => ({
  factor: null,
  type: null,
  outcome: null,
  value: null
})

const normalizedOneXTwoMarket = () => ({
  w1: null,
  x: null,
  w2: null
})

const normalizedOneTwoMarket = () => ({
  w1: null,
  w2: null
})

const marketsMap = () => ({
  one_x_two: normalizedOneXTwoMarket(),
  one_two: normalizedOneTwoMarket()
})

interface Match {
  slug: string
  sport_slug: string
  match_date: string
  teams: unknown[]
  unique_tournament: unknown
  prediction: unknown
  is_national: boolean
}

export type Market = 'one_x_two' | 'one_two'

interface Options {
  markets?: Market[]
}

export const matchAdapter = (match?: Match, options?: Options) => {
  const target = {
    slug: match?.slug || null,
    sportSlug: match?.sport_slug || null,
    matchDate: match?.match_date || null,
    teams: { ...(match?.teams || { 0: normalizedTeam(), 1: normalizedTeam() }) },
    league: match?.unique_tournament || normalizedLeague(),
    prediction: match?.prediction || normalizedPrediction(),
    isNational: match?.is_national ?? null,
  }

  if (options?.markets) {
    const markets = options.markets.reduce<Record<Market, unknown>>((acc, market) => {
      acc[market] = get(match || {}, `markets.${market}`, marketsMap()[market || 'one_two'])

      return acc
    }, {} as any)

    set(target, 'markets', markets)
  }

  return target
}
