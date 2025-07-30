'use client'
import { FC, useEffect, useRef, useState } from 'react'
import '../lib/css/main.css'
import '../lib/css/entry.CAV5u_-6.css'
import '../lib/css/NavContent.BvzaB8yA.css'
import '../lib/css/Avatar.CaiqtWBM.css'
import '../lib/css/useUIConnector.CNYft9xI.css'
import '../lib/css/FullNameWithIcon.DOaLANlu.css'
import '../lib/css/UserLevel.CaUr9TyZ.css'
import '../lib/css/Dropdown.xzGScYNZ.css'
import '../lib/css/notifications.9XSnvbyV.css'
import '../lib/css/StvButton2.CBphoxHZ.css'
import '../lib/css/Rate.C65GVIHI.css'
import '../lib/css/StvButton.BYKIQDf_.css'
import '../lib/css/ContestsSlider.C5jB7cYq.css'
import '../lib/css/ContestsItem.DPuA7VVm.css'
import '../lib/css/BookmakerRatingItem.BTXJ3foQ.css'
import '../lib/css/BonusButton.CVsXNW4G.css'
import '../lib/css/RoundIndicator.oNbFUwiq.css'
import '../lib/css/BookmakerMultiPromoItem.B5x4inWo.css'
import '../lib/css/ReviewItem.DdoqysOO.css'
import '../lib/css/ReviewsScore.DjL3FD-O.css'
import '../lib/css/LinkButton.C9w-izYF.css'
import '../lib/css/SubscribeButton.CDXCBmyw.css'
import '../lib/css/ArticlesList.XDQq9DXN.css'
import '../lib/css/ViewCounter.VS5vaPP2.css'
import '../lib/css/SeoBlock.BUi-x4uA.css'
import '../lib/css/PageDivider.CbZM0dM6.css'
import '../lib/css/ColumnLinksBlock.dBeGckAc.css'
import '../lib/css/AppModal.zAet4Ooa.css'
import '../lib/css/CheckboxRadio.DgIPpdAd.css'
import '../lib/css/StatisticBar.CCjX7TCD.css'
import { createFragmentsClient } from '@fragmentsx/client-core'
import { Area, GlobalManager } from '@fragmentsx/render-react'

interface DemoProps {
  className?: string
}

export const Demo: FC<DemoProps> = ({ className }) => {
  const fragmentsClient = useRef(
    createFragmentsClient({
      apiToken: '6-c06fee66a75ec9c54c3ec822ce5977a9-605d45ac9a41b570981aa31a4919c5ab849cbba15300513e2340efb377ab12f8',
      isSelf: true
    })
  )

  return (
    <GlobalManager value={fragmentsClient.current}>
      <div className='default' data-v-2af4a11a=''>
        <div className='sidebar-hidden wrapper' data-v-2af4a11a=''>
          <div className='header-container header' data-v-2af4a11a='' data-v-b0a820b1=''>
            <header className='Header' data-v-b0a820b1=''>
              <div className='left' data-v-b0a820b1=''>
                <button className='menu-button' data-v-b0a820b1=''>
                  <span className='menu-button-bar' data-v-b0a820b1=''></span>
                  <span className='menu-button-bar' data-v-b0a820b1=''></span>
                  <span className='menu-button-bar' data-v-b0a820b1=''></span>
                </button>
                <a
                  aria-current='page'
                  href='/'
                  className='router-link-active router-link-exact-active logo'
                  data-v-b0a820b1=''
                >
                  <div className='ContentImage loading logo-image' data-v-b0a820b1='' data-v-13b18673=''>
                    <div className='image-placeholder' data-v-13b18673=''></div>
                  </div>
                </a>
              </div>
              <div className='center' data-v-b0a820b1=''>
                <div className='Search header-search' data-v-b0a820b1='' data-v-8dd581d1=''>
                  <div className='backdrop-layer' data-v-8dd581d1=''></div>
                  <div className='top' data-v-8dd581d1=''>
                    <button className='search-button' type='button' data-v-8dd581d1=''>
                      <span data-v-8dd581d1=''></span>
                    </button>
                  </div>
                </div>
                <div className='PromoGiftContainer gift' data-v-b0a820b1=''></div>
              </div>
              <div className='right' data-v-b0a820b1=''>
                <button
                  className='StvButton StvButton--design-dark StvButton--size-medium StvButton--uppercase StvButton--rounded auth-button'
                  type='button'
                  data-v-b0a820b1=''
                  data-v-91c12806=''
                >
                  {' '}
                  Войти
                </button>
                <button
                  className='StvButton StvButton--design-dark StvButton--size-medium StvButton--uppercase StvButton--rounded registration-button'
                  type='button'
                  data-v-b0a820b1=''
                  data-v-91c12806=''
                >
                  {' '}
                  Зарегистрироваться
                </button>

                <button className='notifications-button notification-button' data-v-b0a820b1='' data-v-6f7f782a=''>
                  <span className='logo-wrapper' data-v-6f7f782a=''>
                    <span alt='notifictions logo bell' data-v-6f7f782a=''></span>
                  </span>
                </button>
                <div data-v-8875ef35='' data-v-4d1432fe=''></div>
              </div>
            </header>
          </div>
          <div className='content' data-v-2af4a11a=''>
            <div className='leftNav' style={{ gridArea: 'nav', marginRight: 12 }}>
              <Area areaCode='7eebc2c48c0268' options={{ ssr: false }} />
            </div>
            <div className='grid-main' data-v-2af4a11a=''>
              <div className='main-wrapper' data-v-2af4a11a=''>
                <div className='MainPage' data-v-4050c876=''>
                  <div className='header' style={{ marginInline: -24 }}>
                    <Area areaCode='80976154971018' options={{ ssr: false }} />
                  </div>

                  <Area areaCode='82e99a8607c17' options={{ ssr: false }} />

                  <section
                    className='MainPageContainer MainPageContainer--top-matches MainPageContainer--grid'
                    data-v-4050c876=''
                    data-v-8a768e31=''
                  >
                    <h2 className='text-h1 title' data-v-8a768e31=''>
                      <a href='/matches' className='marked' data-v-4050c876=''>
                        {' '}
                        1 000+ матчей{' '}
                      </a>{' '}
                      ежедневно. Изучай{' '}
                      <span className='marked--gray' data-v-4050c876=''>
                        <span data-v-4050c876=''></span> статистику{' '}
                      </span>
                      , читай подробные разборы редакции и пиши собственные{' '}
                      <a href='/predictions' className='marked marked--fill' data-v-4050c876=''>
                        {' '}
                        прогнозы{' '}
                      </a>
                    </h2>
                    <div className='TopMatches' data-v-4050c876='' data-v-8dc5b9f9=''>
                      <div className='large-cards' data-v-8dc5b9f9=''>
                        <div
                          className='TopMatchesItem TopMatchesItem--large TopMatchesItem--soccer card--large card'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/22-07-2025-shelbourne-qarabag'
                            className='match-link--large'
                            data-v-b8036fa9=''
                          >
                            <div className='large-logos' data-v-b8036fa9=''>
                              <div className='ContentImage loading logo--large' data-v-b8036fa9='' data-v-13b18673=''>
                                <div className='image-placeholder' data-v-13b18673=''></div>
                              </div>
                              <div className='ContentImage loading logo--large' data-v-b8036fa9='' data-v-13b18673=''>
                                <div className='image-placeholder' data-v-13b18673=''></div>
                              </div>
                            </div>
                            <div
                              className='TopMatchesItemInfo TopMatchesItemInfo--dark'
                              data-v-b8036fa9=''
                              data-v-21ddb129=''
                            >
                              <span className='time' data-v-21ddb129=''>
                                18:45
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                23 июл
                              </span>
                              <span className='text-dot-separator--dark country text-dot-separator' data-v-21ddb129=''>
                                Европа
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига чемпионов
                              </span>
                            </div>

                            <div className='name text-h3' data-v-b8036fa9=''>
                              Шелбурн
                            </div>
                            <div className='name text-h3' data-v-b8036fa9=''>
                              Карабах
                            </div>
                          </a>
                          <div className='outcomes' data-v-b8036fa9=''>
                            <button
                              className='TopMatchesItemOutcome--top TopMatchesItemOutcome outcome-item'
                              data-v-b8036fa9=''
                              data-v-4adeeae5=''
                            >
                              <div className='icon-wrapper' data-v-4adeeae5=''>
                                <span data-v-4adeeae5=''></span>
                              </div>
                              <div
                                className='Rate--pending Rate--medium Rate--primary Rate rate'
                                data-v-4adeeae5=''
                                data-v-3c4adb81=''
                              >
                                {' '}
                                2.49
                              </div>
                              <div className='body' data-v-4adeeae5=''>
                                <div className='outcome text-h5' data-v-4adeeae5=''>
                                  1X
                                </div>
                                <div className='outcome-label' data-v-4adeeae5=''>
                                  58 прогнозов <span data-v-4adeeae5=''></span>
                                </div>
                              </div>
                            </button>
                            <button
                              className='TopMatchesItemOutcome outcome-item'
                              data-v-b8036fa9=''
                              data-v-4adeeae5=''
                            >
                              <div
                                className='Rate--pending Rate--medium Rate--primary Rate rate'
                                data-v-4adeeae5=''
                                data-v-3c4adb81=''
                              >
                                {' '}
                                1.98
                              </div>
                              <div className='body' data-v-4adeeae5=''>
                                <div className='outcome text-h5' data-v-4adeeae5=''>
                                  ОЗ (ДА)
                                </div>
                                <div className='outcome-label' data-v-4adeeae5=''>
                                  56 прогнозов <span data-v-4adeeae5=''></span>
                                </div>
                              </div>
                            </button>
                            <button
                              className='TopMatchesItemOutcome outcome-item'
                              data-v-b8036fa9=''
                              data-v-4adeeae5=''
                            >
                              <div
                                className='Rate--pending Rate--medium Rate--primary Rate rate'
                                data-v-4adeeae5=''
                                data-v-3c4adb81=''
                              >
                                {' '}
                                4.20
                              </div>
                              <div className='body' data-v-4adeeae5=''>
                                <div className='outcome text-h5' data-v-4adeeae5=''>
                                  X
                                </div>
                                <div className='outcome-label' data-v-4adeeae5=''>
                                  45 прогнозов <span data-v-4adeeae5=''></span>
                                </div>
                              </div>
                            </button>
                          </div>
                          <a
                            href='/matches/soccer/22-07-2025-shelbourne-qarabag'
                            className='match-link--large'
                            data-v-b8036fa9=''
                          >
                            <button
                              className='Button text-button Button--design-with-arrow Button--size-medium Button--full-width Button--uppercase Button--rounded prediction-button'
                              type='button'
                              data-v-b8036fa9=''
                              data-v-3754441f=''
                            >
                              <span className='prediction-info' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 520 прогнозов на матч{' '}
                              </span>
                              <span data-v-3754441f=''></span>
                            </button>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem-- card'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/23-07-2025-olimpija-ljubljana-inter-club-de-escaldes'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                18:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                23 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Олимпия Любляна
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Интер Эскальдес
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 494
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem-- card'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/23-07-2025-the-new-saints-red-boys-differdange'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                18:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                23 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Нью-Сейнтс
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Дифферданж
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 474
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className='small-cards' data-v-8dc5b9f9=''>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/23-07-2025-buducnost-milsami'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                19:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                23 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Будучность
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Милсами
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 437
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a href='/matches/csgo/23-07-2025-liquid-pain' className='match-link' data-v-b8036fa9=''>
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                19:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                23 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                IEM Cologne
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Liquid
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    paiN
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 232
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/24-07-2025-tampereen-ilves-az-alkmaar'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                16:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                24 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Ильвес
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    АЗ Алкмар
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 139
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/24-07-2025-astana-zimbru-chisinau-1'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                14:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                24 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Астана
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Зимбру
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 130
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/24-07-2025-atletic-club-d-escaldes-dinamo-tirana'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                14:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                24 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Атлетик Эскальдес
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Динамо Тирана
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 126
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/23-07-2025-winner-qf4-winner-qf3'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                19:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                23 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Чемпионат Европы, женщины
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Германия (Ж)
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Испания (Ж)
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 125
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/24-07-2025-josephs-shamrock-rovers'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                16:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                24 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Сент-Джозефс
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Шемрок Роверс
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 116
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          className='TopMatchesItem TopMatchesItem--small TopMatchesItem--'
                          data-v-8dc5b9f9=''
                          data-v-b8036fa9=''
                        >
                          <a
                            href='/matches/soccer/24-07-2025-arda-kurdzhali-hjk-helsinki'
                            className='match-link'
                            data-v-b8036fa9=''
                          >
                            <div className='TopMatchesItemInfo match-info' data-v-b8036fa9='' data-v-21ddb129=''>
                              <span className='time' data-v-21ddb129=''>
                                16:00
                              </span>
                              <span className='text-dot-separator' data-v-21ddb129=''>
                                24 июл
                              </span>
                              <span className='tournament' data-v-21ddb129=''>
                                Лига конференций
                              </span>
                            </div>
                            <div className='container' data-v-b8036fa9=''>
                              <div className='teams' data-v-b8036fa9=''>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    Арда Курджали
                                  </span>
                                </div>
                                <div className='team' data-v-b8036fa9=''>
                                  <div
                                    className='ContentImage loading logo--small'
                                    data-v-b8036fa9=''
                                    data-v-13b18673=''
                                  >
                                    <div className='image-placeholder' data-v-13b18673=''></div>
                                  </div>
                                  <span className='name text-h5' data-v-b8036fa9=''>
                                    ХИК
                                  </span>
                                </div>
                              </div>
                              <div className='predictions' data-v-b8036fa9=''>
                                <span data-v-b8036fa9=''></span> 111
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className='NavigationLinks--multiple NavigationLinks' data-v-8dc5b9f9='' data-v-781aa78c=''>
                        <div className='links scrollbar-hidden' data-v-781aa78c=''>
                          <a href='/matches/soccer' className='link--item-first link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/ice-hockey' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/tennis' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/basketball' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/volleyball' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/baseball' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/handball' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/futsal' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/snooker' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/csgo' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/dota2' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/american-football' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/mma' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/matches/boxing' className='link--item-last link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                        </div>
                        <a href='/matches' className='link link--all' data-v-781aa78c=''>
                          Все матчи <span data-v-781aa78c=''></span>
                        </a>
                      </div>
                    </div>
                  </section>
                  <section
                    className='MainPageContainer MainPageContainer--contests MainPageContainer--full'
                    data-v-4050c876=''
                    data-v-8a768e31=''
                  >
                    <div className='pluses' data-v-8a768e31=''></div>
                    <h2 className='text-h1 title' data-v-8a768e31=''>
                      {' '}
                      Участвуй в турнирах прогнозов <br />и выигрывай{' '}
                      <a href='/cup' className='marked--green with-icon with-icon--money' data-v-4050c876=''>
                        {' '}
                        реальные деньги{' '}
                      </a>
                    </h2>
                    <div className='advantages' data-v-8a768e31=''>
                      <div className='advantage' data-v-8a768e31=''>
                        <span data-v-8a768e31=''></span> Обучение через игровой процесс
                      </div>
                      <div className='advantage' data-v-8a768e31=''>
                        <span data-v-8a768e31=''></span> Эксклюзивные турниры с низкой конкуренцией
                      </div>
                      <div className='advantage' data-v-8a768e31=''>
                        <span data-v-8a768e31=''></span> Возможность выиграть реальные деньги без вложений
                      </div>
                    </div>

                    <div className='MainPageContests' data-v-4050c876='' data-v-050240de=''>
                      <div className='ContestsSlider contests' data-v-050240de='' data-v-bf65f25b=''>
                        <div className='list scrollbar-hidden' data-v-bf65f25b=''>
                          <a
                            href='/cup/eurotour-nine'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            {/*              <div className='NavigationLinks--single NavigationLinks' data-v-781aa78c=''>*/}
                            {/*                <a href='/bookmakers' className='link link--all link--single' data-v-781aa78c=''>*/}
                            {/*                  Все рейтинги БК*/}
                            {/*                  <span data-v-781aa78c=''></span>*/}
                            {/*                </a>*/}
                            {/*              </div>*/}
                            {/*            </div>*/}
                            {/*          </section>*/}
                            {/*          <div className='SocialPollContainer' data-v-4050c876='' data-v-dff4d117=''></div>*/}
                            {/*          <section*/}
                            {/*            className='MainPageContainer MainPageContainer--bonuses MainPageContainer--full'*/}
                            {/*            data-v-4050c876=''*/}
                            {/*            data-v-8a768e31=''*/}
                            {/*          >*/}
                            {/*            <div className='pluses' data-v-8a768e31=''></div>*/}
                            {/*            <h2 className='text-h1 title' data-v-8a768e31=''>*/}
                            {/*              {' '}*/}
                            {/*              Находи эксклюзивные*/}
                            {/*              <br data-v-4050c876='' />*/}
                            {/*              <a href='/promo/sets' className='marked--pink with-icon with-icon--heart' data-v-4050c876=''>*/}
                            {/*                {' '}*/}
                            {/*                бонусы в коллекциях{' '}*/}
                            {/*              </a>*/}
                            {/*            </h2>*/}
                            {/*            <div className='advantages' data-v-8a768e31=''>*/}
                            {/*              <div className='advantage' data-v-8a768e31=''>*/}
                            {/*                <span data-v-8a768e31=''></span> Подробные разборы*/}
                            {/*              </div>*/}
                            {/*              <div className='advantage' data-v-8a768e31=''>*/}
                            {/*                <span data-v-8a768e31=''></span> Личное и честное мнение*/}
                            {/*              </div>*/}
                            {/*              <div className='advantage' data-v-8a768e31=''>*/}
                            {/*                <span data-v-8a768e31=''></span> Эксклюзивные бонусы*/}
                            {/*              </div>*/}
                            {/*            </div>*/}

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 50 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 1 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Царь горы
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    01 июл - 31 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/weekend-league-43'
                            className='ContestsItem--small ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div
                              className='Badge--new Badge--medium Badge--primary Badge--radius-xsm Badge badge'
                              data-v-53c72fa4=''
                              data-v-597ce9a9=''
                            >
                              {' '}
                              Новый
                            </div>
                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 50 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> Х призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Weekend League
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    26 июл - 27 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/sprint-july-25'
                            className='ContestsItem--small ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div
                              className='Badge--new Badge--medium Badge--primary Badge--radius-xsm Badge badge'
                              data-v-53c72fa4=''
                              data-v-597ce9a9=''
                            >
                              {' '}
                              Новый
                            </div>
                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 000 баллов
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Спринт №25
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    25 июл - 25 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/second-echelon-48'
                            className='ContestsItem--small ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div
                              className='Badge--new Badge--medium Badge--primary Badge--radius-xsm Badge badge'
                              data-v-53c72fa4=''
                              data-v-597ce9a9=''
                            >
                              {' '}
                              Новый
                            </div>
                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 20 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 10 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Второй эшелон
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    25 июл - 28 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/score-booster-35'
                            className='ContestsItem--small ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div
                              className='Badge--new Badge--medium Badge--primary Badge--radius-xsm Badge badge'
                              data-v-53c72fa4=''
                              data-v-597ce9a9=''
                            >
                              {' '}
                              Новый
                            </div>
                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> Х баллов
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> Х призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Бустер баллов
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    25 июл - 25 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/footballru-capper37'
                            className='ContestsItem--small ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div
                              className='Badge--new Badge--medium Badge--primary Badge--radius-xsm Badge badge'
                              data-v-53c72fa4=''
                              data-v-597ce9a9=''
                            >
                              {' '}
                              Новый
                            </div>
                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 50 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 20 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Футбол.ру
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    25 июл - 27 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/sprint-july-24'
                            className='ContestsItem--small ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 000 баллов
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Спринт №24
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    24 июл - 24 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/sprint-july-23'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 000 баллов
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Спринт №23
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    23 июл - 23 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/cs2-iem-cologne'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 20 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 10 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    IEM Cologne 2025
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    23 июл - 03 авг
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/breakpoint-cappers-23'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 20 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 10 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Брейк Поинт
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    21 июл - 25 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/basketball2025-two'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 20 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 10 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Баскетбол
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    17 июл - 31 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/profi-league-11'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 25 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Лига профи
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    01 июл - 31 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/experts-july2025'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 100 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 10 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Лига экспертов
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    01 июл - 31 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a
                            href='/cup/authors-league-11'
                            className='ContestsItem--small ContestsItem--started ContestsItem item'
                            data-v-bf65f25b=''
                            data-v-53c72fa4=''
                          >
                            <div className='ContentImage loading cover' data-v-53c72fa4='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>

                            <div className='inner' data-v-53c72fa4=''>
                              <div className='params' data-v-53c72fa4=''>
                                <span className='params-item params-item--prize' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 75 000 ₽
                                </span>
                                <span className='params-item params-item--prizePlaces' data-v-53c72fa4=''>
                                  <span data-v-53c72fa4=''></span> 25 призовых
                                </span>
                              </div>
                              <div className='header' data-v-53c72fa4=''>
                                <div className='header-info' data-v-53c72fa4=''>
                                  <h2 className='header-title text-h3' data-v-53c72fa4=''>
                                    Лига авторов
                                  </h2>
                                  <div className='header-date text-slogan' data-v-53c72fa4=''>
                                    01 июл - 31 июл
                                  </div>
                                </div>
                              </div>
                              <div className='footer' data-v-53c72fa4=''>
                                <div className='contest-link' data-v-53c72fa4=''>
                                  <span className='contest-link-text' data-v-53c72fa4=''>
                                    {' '}
                                    Участвовать{' '}
                                  </span>
                                  <span data-v-53c72fa4=''></span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className='NavigationLinks' data-v-050240de='' data-v-781aa78c=''>
                        <div className='links scrollbar-hidden' data-v-781aa78c=''>
                          <a href='/cup?type=result' className='link--item-first link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/cup?type=roi' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/cup?type=won' className='link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                          <a href='/cup?type=race' className='link--item-last link link--item' data-v-781aa78c=''>
                            <span data-v-781aa78c=''></span>
                          </a>
                        </div>
                        <a href='/cup' className='link link--all' data-v-781aa78c=''>
                          Все конкурсы <span data-v-781aa78c=''></span>
                        </a>
                      </div>
                    </div>
                  </section>
                  <section
                    className='MainPageContainer MainPageContainer--bookmakers MainPageContainer--grid'
                    data-v-4050c876=''
                    data-v-8a768e31=''
                  >
                    <h2 className='text-h1 title' data-v-8a768e31=''>
                      <a href='/bookmakers' className='marked' data-v-4050c876=''>
                        {' '}
                        Изучай честные рейтинги{' '}
                      </a>{' '}
                      и получай лучшие бонусы от БК{' '}
                    </h2>
                    <div className='MainPageBookmakers' data-v-4050c876=''>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=win_rating_main_main_3k_mob'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            1
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Винлайн
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--high RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    95
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/winline' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=win_rating_main_main_3k_mob'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              3 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=fon_rating_main_main_15000_newreg'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            2
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Фонбет
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--high RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    90
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/fonbet' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=fon_rating_main_main_15000_newreg'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              15 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=bb_bookmakers_rating_table_main_10000reg'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            3
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Бетбум
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--high RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    85
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/betboom' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=bb_bookmakers_rating_table_main_10000reg'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              10 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=bett_rating_main_main_2k_reg'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            4
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Беттери
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--high RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    83
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/bettery' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=bett_rating_main_main_2k_reg'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              2 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=ol_rating_rating_8k_reg'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            5
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                OLIMPBET
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--high RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    80
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/olimpbet' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=ol_rating_rating_8k_reg'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              8 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=pari_rating_main_main_3k_stavka'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            6
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Пари
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--good RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    77
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/pari' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=pari_rating_main_main_3k_stavka'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper gift-icon-wrapper--exclusive' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              3 000 ₽{' '}
                              <p className='bonus-text' data-v-0ba61d93=''>
                                эксклюзив{' '}
                              </p>
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=ls_bookmakers_rating_table_main_7777reg'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            7
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Лига Ставок
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--good RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    75
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/ligastavok' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=ls_bookmakers_rating_table_main_7777reg'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              7 777 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=mel_bookmakers_rating_table_main_25kreg'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            8
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Мелбет
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--good RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    73
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/melbet' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=mel_bookmakers_rating_table_main_25kreg'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper gift-icon-wrapper--exclusive' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              25 000 ₽{' '}
                              <p className='bonus-text' data-v-0ba61d93=''>
                                эксклюзив{' '}
                              </p>
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=leon-rating'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            9
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Леон
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--good RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    70
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/leon' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=leon-rating'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              25 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>
                      <div className='BookmakerRatingItem' data-v-09d4c714=''>
                        <a
                          target='_blank'
                          rel='nofollow noopener noreferrer'
                          href='https://stavka.tv/go?to=betc_rating_main_main_2000_promo'
                          className='link'
                          data-v-09d4c714=''
                        >
                          <span className='position' data-v-09d4c714=''>
                            10
                          </span>
                          <div className='BkLogoWithName' data-v-09d4c714='' data-v-bad4e969=''>
                            <div
                              className='ContentImage loading logo--rounded logo'
                              data-v-bad4e969=''
                              data-v-13b18673=''
                            >
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                            <div data-v-bad4e969=''>
                              <span className='name text-slogan' data-v-bad4e969=''>
                                Бетсити
                              </span>
                              <div className='grade' data-v-bad4e969=''>
                                <div
                                  className='RoundIndicator RoundIndicator--good RoundIndicator--medium RoundIndicator--without-bg RoundIndicator--is-oval'
                                  data-v-bad4e969=''
                                  data-v-00e01bf0=''
                                >
                                  <div className='inner' data-v-00e01bf0=''></div>
                                  <span className='progress' data-v-00e01bf0=''>
                                    69
                                  </span>
                                  <svg
                                    className='IndicatorIcon'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 34 18'
                                    fill='none'
                                    data-v-00e01bf0=''
                                  >
                                    <path
                                      d='M17 1.5H25C29.1421 1.5 32.5 4.85786 32.5 9C32.5 13.1421 29.1421 16.5 25 16.5H9C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5H17'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      data-v-00e01bf0=''
                                    ></path>
                                  </svg>
                                </div>
                                Оценка
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href='/bookmakers/betcity' className='review' data-v-09d4c714=''>
                          <div className='review-button' data-v-09d4c714=''>
                            <span data-v-09d4c714=''></span> Обзор
                          </div>
                        </a>
                        <div className='bonus' data-v-09d4c714=''>
                          <a
                            href='https://stavka.tv/go?to=betc_rating_main_main_2000_promo'
                            rel='nofollow noopener noreferrer'
                            target='_blank'
                            size='small'
                            className='BonusButton text-button BonusButton--dark'
                            data-v-09d4c714=''
                            data-v-0ba61d93=''
                          >
                            <div className='gift-icon-wrapper' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </div>
                            <div className='bonus' data-v-0ba61d93=''>
                              2 000 ₽
                            </div>
                            <span className='arrow' data-v-0ba61d93=''>
                              <span data-v-0ba61d93=''></span>
                            </span>
                          </a>
                        </div>
                        <div data-v-162e60f0='' data-v-4d1432fe=''></div>
                      </div>

                      <div className='NavigationLinks--single NavigationLinks' data-v-781aa78c=''>
                        <a href='/bookmakers' className='link link--all link--single' data-v-781aa78c=''>
                          Все рейтинги БК
                          <span data-v-781aa78c=''></span>
                        </a>
                      </div>
                    </div>
                  </section>
                  <div className='SocialPollContainer' data-v-4050c876='' data-v-dff4d117=''></div>
                  <section
                    className='MainPageContainer MainPageContainer--bonuses MainPageContainer--full'
                    data-v-4050c876=''
                    data-v-8a768e31=''
                  >
                    <div className='pluses' data-v-8a768e31=''></div>
                    <h2 className='text-h1 title' data-v-8a768e31=''>
                      {' '}
                      Находи эксклюзивные
                      <br data-v-4050c876='' />
                      <a href='/promo/sets' className='marked--pink with-icon with-icon--heart' data-v-4050c876=''>
                        {' '}
                        бонусы в коллекциях{' '}
                      </a>
                    </h2>
                    <div className='advantages' data-v-8a768e31=''>
                      <div className='advantage' data-v-8a768e31=''>
                        <span data-v-8a768e31=''></span> Подробные разборы
                      </div>
                      <div className='advantage' data-v-8a768e31=''>
                        <span data-v-8a768e31=''></span> Личное и честное мнение
                      </div>
                      <div className='advantage' data-v-8a768e31=''>
                        <span data-v-8a768e31=''></span> Эксклюзивные бонусы
                      </div>
                    </div>

                    <div className='MainPageBonuses' data-v-4050c876='' data-v-701146a2=''>
                      <div className='bonuses' data-v-701146a2=''>
                        <a
                          href='/promo/sets/best-freebets-month'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                13 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Фрибеты БК на ИЮЛЬ 2025
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/freebet-bez-deposit2023-19-12'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                12 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Фрибеты за регистрацию без депозита: ТОП-2025
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/promocode-bukmekers'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                24 бонуса
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Промокоды букмекеров на сегодня
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/pari-promocode'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                9 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Промокод Пари на фрибет 2025
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/promocode-for-freebet2023-fonbet'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                13 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Промокоды при регистрации Фонбет 2025
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/promocode-winline2023'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                6 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Промокод Винлайн при регистрации на сегодня
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/promocode-betboom'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                5 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Промокод Бетбум на фрибет (ИЮЛЬ 2025){' '}
                            </h4>
                          </div>
                        </a>
                        <a
                          href='/promo/sets/promocode2023-ligastavok'
                          className='BookmakerMultiPromoItem--small BookmakerMultiPromoItem'
                          with-logos='false'
                          data-v-701146a2=''
                          data-v-f483b900=''
                        >
                          <div className='top' data-v-f483b900=''>
                            <div className='ContentImage loading image' data-v-f483b900='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='bottom' data-v-f483b900=''>
                            <div className='bonus-count-wrapper' data-v-f483b900=''>
                              <svg className='bonus-count-corner' viewBox='0 0 15 12' fill='none' data-v-f483b900=''>
                                <path
                                  d='M0 0C0 0 0.5 4.64003 4 8C7.5 11.36 15 12 15 12H0V0Z'
                                  fill='white'
                                  data-v-f483b900=''
                                ></path>
                              </svg>
                              <div className='bonus-count' data-v-f483b900=''>
                                5 бонусов
                              </div>
                            </div>
                            <h4 className='title text-slogan' data-v-f483b900=''>
                              Промокоды Лиги Ставок 2025 на фрибет{' '}
                            </h4>
                          </div>
                        </a>
                      </div>
                      <div className='NavigationLinks--single NavigationLinks' data-v-701146a2='' data-v-781aa78c=''>
                        <a href='/promo/sets' className='link link--all link--single' data-v-781aa78c=''>
                          Все коллекции бонусов <span data-v-781aa78c=''></span>
                        </a>
                      </div>
                    </div>
                  </section>
                  <section
                    className='MainPageContainer MainPageContainer--reviews MainPageContainer--grid'
                    data-v-4050c876=''
                    data-v-8a768e31=''
                  >
                    <h2 className='text-h1 title' data-v-8a768e31=''>
                      <span className='marked' data-v-4050c876=''>
                        Честные рецензии
                      </span>{' '}
                      на букмекерские конторы от реальных игроков
                    </h2>
                    <div className='MainPageReviews' data-v-4050c876='' data-v-840d5c43=''>
                      <div className='reviews' data-v-840d5c43=''>
                        <div className='ReviewItem review' data-v-840d5c43='' data-v-fcdec97f=''>
                          <div className='header' data-v-fcdec97f=''>
                            <a href='/predictors/aaa-aaa-25' className='header-link' data-v-fcdec97f=''>
                              <div className='Avatar avatar' alt='aaa-aaa-25' data-v-fcdec97f='' data-v-b14e7bfb=''>
                                <div className='ContentImage loading image' data-v-b14e7bfb='' data-v-13b18673=''>
                                  <div className='image-placeholder' data-v-13b18673=''></div>
                                </div>
                              </div>
                              <div className='ContentImage loading bk-logo' data-v-fcdec97f='' data-v-13b18673=''>
                                <div className='image-placeholder' data-v-13b18673=''></div>
                              </div>
                              <div className='header-info' data-v-fcdec97f=''>
                                <div
                                  className='FullNameWithIcon FullNameWithIcon--small name'
                                  data-v-fcdec97f=''
                                  data-v-23f46830=''
                                >
                                  <span className='full-name' data-v-23f46830=''>
                                    'ааа 'ааа
                                  </span>
                                  <span
                                    className='UserLevel capper UserLevel--small UserLevel--colored profile-icon'
                                    data-v-23f46830=''
                                    data-v-ff897bdd=''
                                  >
                                    <span data-v-ff897bdd=''>к</span>
                                  </span>
                                </div>
                                <div className='additional-text' data-v-fcdec97f=''>
                                  <span className='date' data-v-fcdec97f=''>
                                    19 июл в 08:57
                                  </span>
                                </div>
                              </div>
                            </a>
                            <div
                              className='ReviewsScore review-level review-level--good ReviewsScore--good ReviewsScore--medium ReviewsScore--line score'
                              data-v-fcdec97f=''
                              data-v-96d3383f=''
                            >
                              <span data-v-96d3383f=''></span>
                              <span className='grade' data-v-96d3383f=''>
                                4.5
                              </span>
                            </div>
                          </div>
                          <div className='body' data-v-fcdec97f=''>
                            <div className='text-block' data-v-fcdec97f=''>
                              <div className='text' data-v-fcdec97f=''>
                                играл не много можно сказать что лишь тестировал прочитав полностью поймете почему
                              </div>

                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--high ReviewsScore--high ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      5
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Процесс регистрации
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  Регистрация проходила в штатном режиме как практически у каждой бк раньше.
                                  Регистрировался в ней еще давно, до того как был цупис. Стандартная процедура, номер
                                  телефона и потом свои инициалы, и все в принципе. Никаких сложностей и подводных
                                  камней., ставлю заслуженные 5 звезд
                                </div>
                              </div>
                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--high ReviewsScore--high ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      5
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Процесс идентификации
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  идентификация была проблемной но прочитав и узнав больше информации насчет
                                  идентификации у других людей понял что проблема была с моей стороны и тут точно нельзя
                                  снижать балл. Главное имейте с собой все нужные документы и правильно...
                                </div>
                              </div>
                            </div>
                            <div className='bottom-block' data-v-fcdec97f=''>
                              <a
                                href='/reviews/baltbet/aaa-aaa-25-13'
                                className='LinkButton--design-light-border LinkButton--size-small LinkButton--uppercase LinkButton--rounded LinkButton text-button button'
                                data-v-fcdec97f=''
                                data-v-97c9f747=''
                              >
                                Читать полностью{' '}
                              </a>
                              <div className='info-list' data-v-fcdec97f=''>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='ReviewItem review' data-v-840d5c43='' data-v-fcdec97f=''>
                          <div className='header' data-v-fcdec97f=''>
                            <a href='/predictors/elena-kashirina-1' className='header-link' data-v-fcdec97f=''>
                              <div
                                className='Avatar avatar'
                                alt='elena-kashirina-1'
                                data-v-fcdec97f=''
                                data-v-b14e7bfb=''
                              >
                                <div className='ContentImage loading image' data-v-b14e7bfb='' data-v-13b18673=''>
                                  <div className='image-placeholder' data-v-13b18673=''></div>
                                </div>
                              </div>
                              <div className='ContentImage loading bk-logo' data-v-fcdec97f='' data-v-13b18673=''>
                                <div className='image-placeholder' data-v-13b18673=''></div>
                              </div>
                              <div className='header-info' data-v-fcdec97f=''>
                                <div
                                  className='FullNameWithIcon FullNameWithIcon--small name'
                                  data-v-fcdec97f=''
                                  data-v-23f46830=''
                                >
                                  <span className='full-name' data-v-23f46830=''>
                                    Елена Каширина
                                  </span>
                                  <span
                                    className='UserLevel capper UserLevel--small UserLevel--colored profile-icon'
                                    data-v-23f46830=''
                                    data-v-ff897bdd=''
                                  >
                                    <span data-v-ff897bdd=''>к</span>
                                  </span>
                                </div>
                                <div className='additional-text' data-v-fcdec97f=''>
                                  <span className='date' data-v-fcdec97f=''>
                                    19 июл в 05:53
                                  </span>
                                </div>
                              </div>
                            </a>
                            <div
                              className='ReviewsScore review-level review-level--good ReviewsScore--good ReviewsScore--medium ReviewsScore--line score'
                              data-v-fcdec97f=''
                              data-v-96d3383f=''
                            >
                              <span data-v-96d3383f=''></span>
                              <span className='grade' data-v-96d3383f=''>
                                4.4
                              </span>
                            </div>
                          </div>
                          <div className='body' data-v-fcdec97f=''>
                            <div className='text-block' data-v-fcdec97f=''>
                              <div className='text' data-v-fcdec97f=''>
                                Здесь будет находиться моя краткая рецензия на БК Беттери! Не сказать что я прям часто
                                ставил в данной букмекерской конторе, но какие-выводы по ней все-таки могу сделать!
                                После редезайна сайт стал походить на своих конкурентов. Впрочем я бы не назвал это
                                минусом. Определенно стало лучше!
                              </div>

                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--high ReviewsScore--high ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      5
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Процесс регистрации
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  Сложно в наше время придумать сложную и неудобную регистрацию для новых клиентов!
                                  Особенно когда есть такая опция как Единый ЦУПИС! Поэтому как и у всех, проблем с
                                  регистрацие на данной букмекерской конторе не наблюдается
                                </div>
                              </div>
                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--high ReviewsScore--high ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      5
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Пополнение счета
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  Несмотря на то, что пополнял счет в данной букмекерской конторе я достаточно редко,...
                                </div>
                              </div>
                            </div>
                            <div className='bottom-block' data-v-fcdec97f=''>
                              <a
                                href='/reviews/bettery/elena-kashirina-1-2'
                                className='LinkButton--design-light-border LinkButton--size-small LinkButton--uppercase LinkButton--rounded LinkButton text-button button'
                                data-v-fcdec97f=''
                                data-v-97c9f747=''
                              >
                                Читать полностью{' '}
                              </a>
                              <div className='info-list' data-v-fcdec97f=''>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='ReviewItem review' data-v-840d5c43='' data-v-fcdec97f=''>
                          <div className='header' data-v-fcdec97f=''>
                            <a href='/predictors/im-him' className='header-link' data-v-fcdec97f=''>
                              <div className='Avatar avatar' alt='im-him' data-v-fcdec97f='' data-v-b14e7bfb=''>
                                <div className='ContentImage loading image' data-v-b14e7bfb='' data-v-13b18673=''>
                                  <div className='image-placeholder' data-v-13b18673=''></div>
                                </div>
                              </div>
                              <div className='ContentImage loading bk-logo' data-v-fcdec97f='' data-v-13b18673=''>
                                <div className='image-placeholder' data-v-13b18673=''></div>
                              </div>
                              <div className='header-info' data-v-fcdec97f=''>
                                <div
                                  className='FullNameWithIcon FullNameWithIcon--small name'
                                  data-v-fcdec97f=''
                                  data-v-23f46830=''
                                >
                                  <span className='full-name' data-v-23f46830=''>
                                    I'M HIM
                                  </span>
                                  <span
                                    className='UserLevel capper UserLevel--small UserLevel--colored profile-icon'
                                    data-v-23f46830=''
                                    data-v-ff897bdd=''
                                  >
                                    <span data-v-ff897bdd=''>к</span>
                                  </span>
                                </div>
                                <div className='additional-text' data-v-fcdec97f=''>
                                  <span className='date' data-v-fcdec97f=''>
                                    19 июл в 05:53
                                  </span>
                                </div>
                              </div>
                            </a>
                            <div
                              className='ReviewsScore review-level review-level--middle ReviewsScore--middle ReviewsScore--medium ReviewsScore--line score'
                              data-v-fcdec97f=''
                              data-v-96d3383f=''
                            >
                              <span data-v-96d3383f=''></span>
                              <span className='grade' data-v-96d3383f=''>
                                3.6
                              </span>
                            </div>
                          </div>
                          <div className='body' data-v-fcdec97f=''>
                            <div className='text-block' data-v-fcdec97f=''>
                              <div className='text' data-v-fcdec97f=''>
                                Бетсити в наше время не пользуется спросом от слова совсем, но вспомните те же девять
                                лет назад, практически каждый ставочник начинал свой путь лудомании с этой конторы,
                                которая в те времена ещё могла дать конкуренцию многим букмекерам. Сейчас же ситуация
                                изменилось в разы, время не щадит никого, тем более заброшенные проекты.
                              </div>

                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--good ReviewsScore--good ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      4
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Процесс регистрации
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  Регистрация на сайте банально проста, причем для меня это было давным давно, указал
                                  свой номер и пошел играть. Как сейчас все идёт, думаю не изменилось, учитывая какой
                                  статус контора держит сейчас, не вводя никакие поправки в свои правила и идя с
                                  сомнительным рейтингом...
                                </div>
                              </div>
                            </div>
                            <div className='bottom-block' data-v-fcdec97f=''>
                              <a
                                href='/reviews/betcity/im-him-5'
                                className='LinkButton--design-light-border LinkButton--size-small LinkButton--uppercase LinkButton--rounded LinkButton text-button button'
                                data-v-fcdec97f=''
                                data-v-97c9f747=''
                              >
                                Читать полностью{' '}
                              </a>
                              <div className='info-list' data-v-fcdec97f=''>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 1
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 1
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='ReviewItem review' data-v-840d5c43='' data-v-fcdec97f=''>
                          <div className='header' data-v-fcdec97f=''>
                            <a href='/predictors/im-him' className='header-link' data-v-fcdec97f=''>
                              <div className='Avatar avatar' alt='im-him' data-v-fcdec97f='' data-v-b14e7bfb=''>
                                <div className='ContentImage loading image' data-v-b14e7bfb='' data-v-13b18673=''>
                                  <div className='image-placeholder' data-v-13b18673=''></div>
                                </div>
                              </div>
                              <div className='ContentImage loading bk-logo' data-v-fcdec97f='' data-v-13b18673=''>
                                <div className='image-placeholder' data-v-13b18673=''></div>
                              </div>
                              <div className='header-info' data-v-fcdec97f=''>
                                <div
                                  className='FullNameWithIcon FullNameWithIcon--small name'
                                  data-v-fcdec97f=''
                                  data-v-23f46830=''
                                >
                                  <span className='full-name' data-v-23f46830=''>
                                    I'M HIM
                                  </span>
                                  <span
                                    className='UserLevel capper UserLevel--small UserLevel--colored profile-icon'
                                    data-v-23f46830=''
                                    data-v-ff897bdd=''
                                  >
                                    <span data-v-ff897bdd=''>к</span>
                                  </span>
                                </div>
                                <div className='additional-text' data-v-fcdec97f=''>
                                  <span className='date' data-v-fcdec97f=''>
                                    19 июл в 05:53
                                  </span>
                                </div>
                              </div>
                            </a>
                            <div
                              className='ReviewsScore review-level review-level--middle ReviewsScore--middle ReviewsScore--medium ReviewsScore--line score'
                              data-v-fcdec97f=''
                              data-v-96d3383f=''
                            >
                              <span data-v-96d3383f=''></span>
                              <span className='grade' data-v-96d3383f=''>
                                3.4
                              </span>
                            </div>
                          </div>
                          <div className='body' data-v-fcdec97f=''>
                            <div className='text-block' data-v-fcdec97f=''>
                              <div className='text' data-v-fcdec97f=''>
                                Контора БетБум на рынке уже давно, хотя свой пик популярности пережила пару лет назад, а
                                сейчас лишь идёт своим путём, буквально спонсируя все что только возможно, вплоть до
                                медиа баскетбола, такая политика явно не идёт на пользу.
                              </div>

                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--good ReviewsScore--good ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      4
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Процесс регистрации
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  Контора имеет хорошую службу безопасности, из-за чего пройти идентификацию придется
                                  полностью, но разве когда-то это было проблемой? Зато никаких задержек по выплатам и
                                  неожиданными "сюрпризами" не будет. Сразу скажу про посредственную поддержку, лучше
                                  обойтись без косяков на старте игры в БетБум.
                                </div>
                              </div>
                              <div className='content-item' data-v-fcdec97f=''>
                                <div className='text-h5 block-title' data-v-fcdec97f=''>
                                  <div
                                    className='ReviewsScore review-level review-level--middle ReviewsScore--middle ReviewsScore--medium ReviewsScore--line block-score'
                                    data-v-fcdec97f=''
                                    data-v-96d3383f=''
                                  >
                                    <span data-v-96d3383f=''></span>
                                    <span className='grade' data-v-96d3383f=''>
                                      3
                                    </span>
                                  </div>
                                  <span className='block-title-separator' data-v-fcdec97f=''>
                                     – 
                                  </span>{' '}
                                  Приветственный бонус
                                </div>
                                <div className='text' data-v-fcdec97f=''>
                                  Каким то образом не смог получить бонус, если он и был на тот...
                                </div>
                              </div>
                            </div>
                            <div className='bottom-block' data-v-fcdec97f=''>
                              <a
                                href='/reviews/betboom/im-him-4'
                                className='LinkButton--design-light-border LinkButton--size-small LinkButton--uppercase LinkButton--rounded LinkButton text-button button'
                                data-v-fcdec97f=''
                                data-v-97c9f747=''
                              >
                                Читать полностью{' '}
                              </a>
                              <div className='info-list' data-v-fcdec97f=''>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                                <div className='info-item' data-v-fcdec97f=''>
                                  <span data-v-fcdec97f=''></span> 0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='NavigationLinks--single NavigationLinks' data-v-840d5c43='' data-v-781aa78c=''>
                        <a href='/reviews' className='link link--all link--single' data-v-781aa78c=''>
                          Все рецензии <span data-v-781aa78c=''></span>
                        </a>
                      </div>
                    </div>
                  </section>
                  <div className='LazyWrapper' data-v-4050c876=''></div>
                  <section
                    className='MainPageContainer MainPageContainer--articles MainPageContainer--grid'
                    data-v-4050c876=''
                    data-v-8a768e31=''
                  >
                    <h2 className='text-h1 title' data-v-8a768e31=''>
                      <a href='/articles' className='marked' data-v-4050c876=''>
                        {' '}
                        Интересные статьи{' '}
                      </a>{' '}
                      о спорте и не только
                    </h2>
                    <div className='MainPageArticles' data-v-4050c876='' data-v-153e113d=''>
                      <div className='ArticlesList articles' data-v-153e113d='' data-v-3930eba1=''>
                        <a
                          href='/articles/soccer/transfers-krasnodar'
                          className='ArticlesCard article'
                          title='Трансферы ФК «Краснодар» — как изменился состав чемпиона и сможет ли клуб защитить титул?'
                          data-v-3930eba1=''
                          data-v-2ee73024=''
                        >
                          <div className='poster-wrapper' data-v-2ee73024=''>
                            <div className='ContentImage loading poster' data-v-2ee73024='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='info' data-v-2ee73024=''>
                            <h5 className='title' data-v-2ee73024=''>
                              Трансферы ФК «Краснодар» — как изменился состав чемпиона и сможет ли клуб защитить титул?
                            </h5>
                            <div className='counters' data-v-2ee73024=''>
                              <div
                                className='ViewCounter ViewCounter--gray views'
                                data-v-2ee73024=''
                                data-v-826c39e6=''
                              >
                                <span data-v-826c39e6=''></span> 1 061
                              </div>
                              <div className='divider' data-v-2ee73024=''></div>
                              <span data-v-2ee73024=''></span> 0
                            </div>
                          </div>
                        </a>
                        <a
                          href='/articles/express/express-2025-july-23'
                          className='ArticlesCard article'
                          title='Экспресс дня от СТАВКА TV на 23 июля'
                          data-v-3930eba1=''
                          data-v-2ee73024=''
                        >
                          <div className='poster-wrapper' data-v-2ee73024=''>
                            <div className='ContentImage loading poster' data-v-2ee73024='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='info' data-v-2ee73024=''>
                            <h5 className='title' data-v-2ee73024=''>
                              Экспресс дня от СТАВКА TV на 23 июля
                            </h5>
                            <div className='counters' data-v-2ee73024=''>
                              <div
                                className='ViewCounter ViewCounter--gray views'
                                data-v-2ee73024=''
                                data-v-826c39e6=''
                              >
                                <span data-v-826c39e6=''></span> 1 244
                              </div>
                              <div className='divider' data-v-2ee73024=''></div>
                              <span data-v-2ee73024=''></span> 0
                            </div>
                          </div>
                        </a>
                        <a
                          href='/articles/blog/user-survey-sports-matches'
                          className='ArticlesCard article'
                          title='Расскажи нам, что для тебя важно'
                          data-v-3930eba1=''
                          data-v-2ee73024=''
                        >
                          <div className='poster-wrapper' data-v-2ee73024=''>
                            <div className='ContentImage loading poster' data-v-2ee73024='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='info' data-v-2ee73024=''>
                            <h5 className='title' data-v-2ee73024=''>
                              Расскажи нам, что для тебя важно
                            </h5>
                            <div className='counters' data-v-2ee73024=''>
                              <div
                                className='ViewCounter ViewCounter--gray views'
                                data-v-2ee73024=''
                                data-v-826c39e6=''
                              >
                                <span data-v-826c39e6=''></span> 476
                              </div>
                              <div className='divider' data-v-2ee73024=''></div>
                              <span data-v-2ee73024=''></span> 17
                            </div>
                          </div>
                        </a>
                        <a
                          href='/articles/tips/bet-2025-july-23'
                          className='ArticlesCard article'
                          title='Ставка дня на 23 июля'
                          data-v-3930eba1=''
                          data-v-2ee73024=''
                        >
                          <div className='poster-wrapper' data-v-2ee73024=''>
                            <div className='ContentImage loading poster' data-v-2ee73024='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='info' data-v-2ee73024=''>
                            <h5 className='title' data-v-2ee73024=''>
                              Ставка дня на 23 июля
                            </h5>
                            <div className='counters' data-v-2ee73024=''>
                              <div
                                className='ViewCounter ViewCounter--gray views'
                                data-v-2ee73024=''
                                data-v-826c39e6=''
                              >
                                <span data-v-826c39e6=''></span> 291
                              </div>
                              <div className='divider' data-v-2ee73024=''></div>
                              <span data-v-2ee73024=''></span> 0
                            </div>
                          </div>
                        </a>
                        <a
                          href='/articles/soccer/torpedo-excluded-rpl'
                          className='ArticlesCard article'
                          title='«Торпедо» исключили из РПЛ'
                          data-v-3930eba1=''
                          data-v-2ee73024=''
                        >
                          <div className='poster-wrapper' data-v-2ee73024=''>
                            <div className='ContentImage loading poster' data-v-2ee73024='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='info' data-v-2ee73024=''>
                            <h5 className='title' data-v-2ee73024=''>
                              «Торпедо» исключили из РПЛ
                            </h5>
                            <div className='counters' data-v-2ee73024=''>
                              <div
                                className='ViewCounter ViewCounter--gray views'
                                data-v-2ee73024=''
                                data-v-826c39e6=''
                              >
                                <span data-v-826c39e6=''></span> 1 997
                              </div>
                              <div className='divider' data-v-2ee73024=''></div>
                              <span data-v-2ee73024=''></span> 0
                            </div>
                          </div>
                        </a>
                        <a
                          href='/articles/tennis/fenomenal-bublik'
                          className='ArticlesCard article'
                          title='Александр Бублик – король хайпа и мемов в теннисе. Почему его обожают фанаты?'
                          data-v-3930eba1=''
                          data-v-2ee73024=''
                        >
                          <div className='poster-wrapper' data-v-2ee73024=''>
                            <div className='ContentImage loading poster' data-v-2ee73024='' data-v-13b18673=''>
                              <div className='image-placeholder' data-v-13b18673=''></div>
                            </div>
                          </div>
                          <div className='info' data-v-2ee73024=''>
                            <h5 className='title' data-v-2ee73024=''>
                              Александр Бублик – король хайпа и мемов в теннисе. Почему его обожают фанаты?
                            </h5>
                            <div className='counters' data-v-2ee73024=''>
                              <div
                                className='ViewCounter ViewCounter--gray views'
                                data-v-2ee73024=''
                                data-v-826c39e6=''
                              >
                                <span data-v-826c39e6=''></span> 1 944
                              </div>
                              <div className='divider' data-v-2ee73024=''></div>
                              <span data-v-2ee73024=''></span> 0
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        className='NavigationLinks--single NavigationLinks article-link'
                        data-v-153e113d=''
                        data-v-781aa78c=''
                      >
                        <a href='/articles' className='link link--all link--single' data-v-781aa78c=''>
                          Все статьи <span data-v-781aa78c=''></span>
                        </a>
                      </div>
                    </div>
                  </section>
                  <section className='MainPageFooter' data-v-4050c876='' data-v-784c77ac=''>
                    <div className='page-end' data-v-784c77ac=''></div>
                    <p className='text-h2 title' data-v-784c77ac=''>
                      {' '}
                      СТАВКА TV — это{' '}
                    </p>
                    <div className='advantages' data-v-784c77ac=''>
                      <span className='text-h4 advantage' data-v-784c77ac=''>
                        <span data-v-784c77ac=''></span> 1 000+ матчей ежедневно
                      </span>
                      <span className='text-h4 advantage' data-v-784c77ac=''>
                        <span data-v-784c77ac=''></span> Тысячи прогнозов каждый день
                      </span>
                      <span className='text-h4 advantage' data-v-784c77ac=''>
                        <span data-v-784c77ac=''></span> Эксклюзивные бонусы с разборами
                      </span>
                      <span className='text-h4 advantage' data-v-784c77ac=''>
                        <span data-v-784c77ac=''></span> Достижения и бонусная система
                      </span>
                      <span className='text-h4 advantage' data-v-784c77ac=''>
                        <span data-v-784c77ac=''></span> Рецензии от игроков
                      </span>
                    </div>
                  </section>
                  <div className='SeoBlock SeoBlock--layoutWithoutSidebar' data-v-4050c876='' data-v-e8065995=''>
                    <div className='PageDivider PageDivider--small' data-v-e8065995='' data-v-ec4cfc72=''>
                      <div className='line' data-v-ec4cfc72=''></div>
                    </div>
                    <div className='content inside-block' data-v-e8065995=''>
                      <div className='content-text text relative' data-v-e8065995=''>
                        <p>
                          СТАВКА TV — социальная сеть для начинающих и профессиональных капперов. Наш портал — не
                          букмекерская контора, а полезный инструмент для любителей ставок, где вы найдете{' '}
                          <strong>лучшие прогнозы на спорт</strong> от экспертов. Мы помогаем бетторам анализировать
                          события, выбирать оптимальные ставки и сохранять свой банкролл.
                        </p>
                        <p>
                          Мы не просто повышаем интерес к спорту, а помогаем бетторам сохранить собственные средства,
                          разыгрываем миллионы рублей призовых в турнирах прогнозов, даём эксклюзивные{' '}
                          <strong>
                            <a href='https://stavka.tv/promo/sets/promocode-bukmekers'>промокоды�букмекеров</a>,�
                          </strong>
                          предлагаем ознакомиться со всеми рабочими промокодами, которые действуют у конкретных
                          букмекеров:
                        </p>
                        <ol>
                          <li>
                            <a href='https://stavka.tv/promo/sets/promocode-winline2023'>
                              <strong>Промокоды Винлайн</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/promocode-for-freebet2023-fonbet'>
                              <strong>Промокоды Фонбет</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/promocode-betboom'>
                              <strong>Промокоды BetBoom</strong>
                            </a>
                            ;
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/pari-promocode'>
                              <strong>Промокоды PARI</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/promocode2023-ligastavok'>
                              <strong>Промокоды Лиги Ставок</strong>
                            </a>
                            .�
                          </li>
                        </ol>
                        <p>
                          Не забывайте и о фрибетах букмекеров, часть их которых можно забрать практически без
                          выполнения каких-либо условий:�
                        </p>
                        <ol>
                          <li>
                            <a href='https://stavka.tv/promo/sets/freebet-new-winline'>
                              <strong>Фрибет Винлайн</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/freebet-fonbet-2025'>
                              <strong>Фрибет Фонбет</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/freebet5000-pari'>
                              <strong>Фрибет PARI</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/ligastavok-freebet'>
                              <strong>Фрибет Лиги Ставок</strong>
                            </a>
                            ;�
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/freebet-bettery'>
                              <strong>Фрибет Bettery</strong>
                            </a>
                            ;
                          </li>
                          <li>
                            <a href='https://stavka.tv/promo/sets/freebet2023-betboom'>
                              <strong>Фрибет BetBoom</strong>
                            </a>
                            .�
                          </li>
                        </ol>
                        <p>
                          У нас также Вы сможете ознакомиться со всеми актуальными{' '}
                          <a href='https://stavka.tv/promo'>
                            <strong>акциями букмекерских контор</strong>
                          </a>
                          . Все розыгрыши фрибетов, бонусы на депозит, страховки и кэшбэк можно найти в данном разделе.
                          Мы честно рассказали о том, где дают{' '}
                          <a href='https://stavka.tv/promo/sets/freebet-bez-deposit2023-19-12'>
                            <strong>фрибет без депозита</strong>
                          </a>
                          ; подсветили лучшие предложения с{' '}
                          <a href='https://stavka.tv/promo/sets/best-freebets-month'>
                            <strong>фрибетами месяца</strong>
                          </a>
                          ; рассказали о том, где найти{' '}
                          <a href='https://stavka.tv/promo/sets/freebet-current-client'>
                            <strong>фрибет действующим игрокам</strong>
                          </a>{' '}
                          и приятно провести время во время спортивных трансляций. Наша задача <span>—</span>� показать
                          обратную сторону беттинга, превращая отрасль в стиль жизни.�
                        </p>
                        <h2>Бесплатные прогнозы на спорт</h2>
                        <p>На СТАВКА TV вы найдете прогнозы на самые популярные виды спорта:</p>
                        <ul>
                          <li>Футбол;</li>
                          <li>Хоккей;</li>
                          <li>Теннис;</li>
                          <li>Киберспорт (Dota 2 и CS 2);</li>
                          <li>Баскетбол;</li>
                          <li>Волейбол и другие.</li>
                        </ul>
                        <p>
                          Каждый прогноз сопровождается анализом статистики команд, текущего уровня, коэффициентов и
                          вероятностей исхода. Это помогает выбрать оптимальную ставку.�
                        </p>
                        <h3>Экспертные прогнозы на спорт</h3>
                        <p>
                          Наша редакция ежедневно публикует <span>прогнозы на спортивные события</span>, основанные на
                          глубоких знаниях и опыте, статистических сводках, трендах и других факторах.
                        </p>
                        <p>
                          Каждый пользователь также может оставить свой прогноз, участвовать в турнирах и выигрывать
                          ценные призы. Для удобства в прогнозах разработаны несколько фильтров, которые помогают
                          пользователям отбирать материалы по видам спорта, а также фильтровать события в зависимости от
                          временного промежутка.
                        </p>
                        <h2>Конкурсы с денежными призами</h2>
                        <p>
                          СТАВКА TV — лидер по количеству организованных{' '}
                          <a href='https://stavka.tv/cup'>
                            <strong>конкурсов прогнозов</strong>
                          </a>
                          . Общий призовой фонд превышает сумму в 1 000 000 рублей в месяц. Это мотивирует лучших
                          капперов публиковать собственные прогнозы и бороться за высокие призовые места, детально
                          изучая статистические показатели команд и спортсменов.
                        </p>
                        <p>
                          Ежемесячно на портале появляются около 15 разных конкурсов и более 300 призовых мест.
                          Требования по каждому турниру прописаны в описании конкурсов. Прозрачная система подсчета
                          позволяет безошибочно утвердить список победителей и выплатить призовые в максимально краткие
                          сроки.
                        </p>
                        <h2>Бонусы и акции букмекеров</h2>
                        <p>
                          Раздел бонусов позволяет игрокам ознакомиться с приветственными и временными акционными
                          предложениями букмекерских компаний.
                        </p>
                        <p>
                          В данном разделе присутствуют актуальные бонусы для новых и действующих игроков. Кроме того, у
                          нас есть ряд эксклюзивных предложений букмекеров, которые невозможно найти внутри БК либо у
                          конкурентов.
                        </p>
                        <p>Среди актуальных предложений доступны все виды бонусов:</p>
                        <ul>
                          <li>фрибеты;</li>
                          <li>промокоды;</li>
                          <li>кэшбэк;</li>
                          <li>бонус на депозит;</li>
                          <li>программа лояльности и другие.</li>
                        </ul>
                        <p>
                          Внутри каждого материала присутствует инструкция получения бонусов, условия использования,
                          отыгрыша и вывода.�
                        </p>
                        <h2>Мобильные приложения</h2>
                        <p>
                          Не только серфинг интернета, но и ставки перекочевали в мобильные устройства. Букмекеры видят
                          этот тренд и делают акцент на развитие приложений. Команда СТАВКА TV создала отдельный раздел
                          с каталогом<strong>�</strong>
                          <a href='https://stavka.tv/apps'>
                            <strong>приложений букмекерских контор</strong>
                          </a>
                          , где мы подготовили обзоры на все приложения легальных букмекеров под разные ОС, чтобы дать
                          объективную оценку текущим успехам и неудачам букмекеров в рамках мобильного беттинга.
                        </p>
                        <h2>Рейтинги букмекеров</h2>
                        <p>
                          <a href='https://stavka.tv/bukmekerskye-kontory'>
                            <strong>Рейтинг легальных букмекерских контор</strong>
                          </a>{' '}
                          — основной помощник при выборе беттинговой площадки. В нем учитывается совокупность факторов,
                          на которые следует обратить внимание:
                        </p>
                        <ul>
                          <li>Опыт работы букмекера;</li>
                          <li>Приветственный бонус;</li>
                          <li>Наличие интересных акций;</li>
                          <li>Маржа;</li>
                          <li>Качество линии/росписи;</li>
                          <li>Удобство в работе;</li>
                          <li>Проведение финансовых платежей;</li>
                          <li>Качество мобильного приложения и многое другое.</li>
                        </ul>
                        <p>Основной рейтинг отражает общую оценку и место в топе среди легальных букмекеров России.</p>
                        <p>
                          Дополнительно пользователи могут ознакомиться с рядом рейтингов по различным критериям и
                          направлениям. Рейтинги выстраиваются с учетом экспертной оценки СТАВКА TV и мнения реальных
                          игроков.
                        </p>
                        <p>На сайте представлены:</p>
                        <ul>
                          <li>Народный рейтинг;</li>
                          <li>Рейтинг надежных букмекеров;</li>
                          <li>
                            Рейтинги БК по оценке каждого вида спорта: футбол, киберспорт, хоккей, теннис, баскетбол;
                          </li>
                        </ul>
                        <p>
                          Для тщательного изучения и анализа любой БК читатели могут воспользоваться обзорами
                          букмекерских компаний. Опубликованные материалы проходят тщательную проверку и поддерживают
                          объективную оценку любого показателя: от способов пополнения/вывода до детального подсчета
                          маржи на самые популярные виды спорта.
                        </p>
                        <h2>Школа ставок</h2>
                        <p>
                          Новички, которые только пытаются освоиться в мире беттинга, смогут воспользоваться разделом
                          Школа ставок.
                        </p>
                        <p>
                          В школе ставок игроки смогут изучить основные термины в области беттинга и спорта, понять
                          психологию, освоить основные стратегии для оформления ставок, изучить инструменты и популярные
                          трендовые направления в ставках на спорт.
                        </p>
                        <h2>Матч-центр</h2>
                        <p>
                          Матч-центр — важнейший пользовательский инструмент. Прямо на сайте игроки могут найти любой
                          матч практически по каждому виду спорта. В матч-центре доступен широкий функционал:
                        </p>
                        <ul>
                          <li>Линия и роспись события;</li>
                          <li>Прогноз редакции;</li>
                          <li>Прямая трансляция;</li>
                          <li>Статистические показатели команд/спортсменов;</li>
                          <li>Актуальные акции/бонусы.</li>
                        </ul>
                        <p>
                          Для удобства пользователей предусмотрены фильтры, позволяющие подобрать интересующее событие
                          быстро и легко.
                        </p>
                      </div>
                      <div
                        className='ColumnLinksBlock inner-block-offset relative'
                        data-v-e8065995=''
                        data-v-5e99b1ee=''
                      >
                        <div className='columns-header' data-v-5e99b1ee=''>
                          <h4 className='columns-title' data-v-5e99b1ee=''>
                            Популярные материалы{' '}
                          </h4>
                        </div>
                        <div className='columns' data-v-5e99b1ee=''>
                          <div className='column' data-v-5e99b1ee=''>
                            <p className='text-h5 column-title' data-v-5e99b1ee=''>
                              Промокоды букмекеров
                            </p>
                            <ul className='column-links' data-v-5e99b1ee=''>
                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/promocode-winline2023'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Промокод Винлайн
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/promo/sets/pari-promocode' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Промокод Пари
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/promocode-for-freebet2023-fonbet'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Промокод на фрибет Фонбет
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/promocode-betboom'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Промокод BetBoom
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/promocode-2023-betcity'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Промокод Бетсити
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/promocode-bettery'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Промокод BETTERY
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/promocode-bukmekers'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Промокоды на фрибет
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className='column' data-v-5e99b1ee=''>
                            <p className='text-h5 column-title' data-v-5e99b1ee=''>
                              Фрибеты
                            </p>
                            <ul className='column-links' data-v-5e99b1ee=''>
                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/freebet-bez-deposit2023-19-12'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибеты за регистрацию без депозита
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/freebets2023-apps'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибет за установку приложения
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/best-freebets-month'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибеты на Июль 2025
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/freebet-registration-fonbet'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибет Фонбет
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/freebet2023-betboom'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибет БетБум
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/freebet5000-pari'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибет Пари
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a
                                  href='/promo/sets/freebet-new-winline'
                                  className='text-h5 column-link'
                                  data-v-5e99b1ee=''
                                >
                                  Фрибет Винлайн{' '}
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className='column' data-v-5e99b1ee=''>
                            <p className='text-h5 column-title' data-v-5e99b1ee=''>
                              Прогнозы
                            </p>
                            <ul className='column-links' data-v-5e99b1ee=''>
                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/predictions/soccer' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Прогнозы на футбол
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/predictions/ice-hockey' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Прогнозы на хоккей
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/predictions/tennis' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Прогнозы на теннис
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/predictions/basketball' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Прогнозы на баскетбол
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/cup' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Конкурсы прогнозов
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className='column' data-v-5e99b1ee=''>
                            <p className='text-h5 column-title' data-v-5e99b1ee=''>
                              Приложения букмекеров
                            </p>
                            <ul className='column-links' data-v-5e99b1ee=''>
                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Приложения букмекерских контор
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/winline-android' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Винлайн на андроид
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/pari-android' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Пари на андроид
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/fonbet-android' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Фонбет на андроид
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/betboom-android' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  БетБум на андроид
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className='column' data-v-5e99b1ee=''>
                            <p className='text-h5 column-title' data-v-5e99b1ee=''>
                              Приложения iOS
                            </p>
                            <ul className='column-links' data-v-5e99b1ee=''>
                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/winline-ios' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Винлайн на айфон
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/pari-ios' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Пари на айфон
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/fonbet-ios' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  Фонбет на айфон
                                </a>
                              </li>

                              <li className='column-link-wrapper' data-v-5e99b1ee=''>
                                <a href='/apps/betboom-ios' className='text-h5 column-link' data-v-5e99b1ee=''>
                                  БетБум на айфон
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-v-f56af8ca='' data-v-4d1432fe=''></div>
                </div>
              </div>
            </div>
            <footer className='Footer grid-footer' data-v-2af4a11a='' data-v-6d0a58f0=''>
              <div className='container' data-v-6d0a58f0=''>
                <div className='FooterHeader header' data-v-6d0a58f0='' data-v-79d8bbe8=''>
                  <div data-v-79d8bbe8=''>
                    <a
                      aria-current='page'
                      href='/'
                      className='router-link-active router-link-exact-active logo'
                      data-v-79d8bbe8=''
                    >
                      <div className='ContentImage loading logo__image' data-v-79d8bbe8='' data-v-13b18673=''>
                        <div className='image-placeholder' data-v-13b18673=''></div>
                      </div>
                    </a>
                    <p className='slogan text-slogan' data-v-79d8bbe8=''>
                      {' '}
                      Место силы каппера 💪{' '}
                    </p>
                  </div>
                  <div className='Socials' data-v-79d8bbe8='' data-v-9cef3620=''>
                    <div className='AppLinks AppLinks--grey' data-v-9cef3620='' data-v-331a59ab=''>
                      <div className='wrapper' data-v-331a59ab=''>
                        <button className='apps-button' data-v-331a59ab=''>
                          <span className='text' data-v-331a59ab=''>
                            Скачать приложения
                          </span>
                          <span className='app-icon-container' data-v-331a59ab=''>
                            <span data-v-331a59ab=''></span>
                          </span>
                          <span className='app-icon-container' data-v-331a59ab=''>
                            <span data-v-331a59ab=''></span>
                          </span>
                          <span className='app-icon-container' data-v-331a59ab=''>
                            <span data-v-331a59ab=''></span>
                          </span>
                          <span data-v-331a59ab=''></span>
                        </button>
                      </div>
                    </div>
                    <div className='links' data-v-9cef3620=''>
                      <a
                        className='link link--white'
                        href='https://stavka.tv/go?to=telegram-footer'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                        data-v-9cef3620=''
                      >
                        <span data-v-9cef3620=''></span>
                      </a>
                      <a
                        className='link link--white'
                        href='https://vk.com/stavkatv'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                        data-v-9cef3620=''
                      >
                        <span data-v-9cef3620=''></span>
                      </a>
                      <a
                        className='link link--white'
                        href='https://youtube.com/@stavkatv'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                        data-v-9cef3620=''
                      >
                        <span data-v-9cef3620=''></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='body' data-v-6d0a58f0=''>
                  <div className='FooterNavMobile' data-v-6d0a58f0='' data-v-37e96694=''>
                    <div className='nav' data-v-37e96694=''>
                      <div className='nav__header text-h5' data-v-37e96694=''>
                        Промокоды <span data-v-37e96694=''></span>
                      </div>
                      <div aria-expanded='false' hidden='' data-v-37e96694=''>
                        <ul className='nav__list' data-v-37e96694=''>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/promocode-bukmekers' className='nav__item-link' data-v-37e96694=''>
                              Промокоды букмекерских контор
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a
                              href='/promo/sets/promocode-for-freebet2023-fonbet'
                              className='nav__item-link'
                              data-v-37e96694=''
                            >
                              Промокод Фонбет
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/promocode-winline2023' className='nav__item-link' data-v-37e96694=''>
                              Промокод Винлайн
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/pari-promocode' className='nav__item-link' data-v-37e96694=''>
                              Промокод Пари
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/promocode-bettery' className='nav__item-link' data-v-37e96694=''>
                              Промокод Bettery
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/promocode-2023-betcity' className='nav__item-link' data-v-37e96694=''>
                              Промокод Бетсити
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='nav' data-v-37e96694=''>
                      <div className='nav__header text-h5' data-v-37e96694=''>
                        Фрибеты <span data-v-37e96694=''></span>
                      </div>
                      <div aria-expanded='false' hidden='' data-v-37e96694=''>
                        <ul className='nav__list' data-v-37e96694=''>
                          <li className='nav__item' data-v-37e96694=''>
                            <a
                              href='/promo/sets/freebet-bez-deposit2023-19-12'
                              className='nav__item-link'
                              data-v-37e96694=''
                            >
                              Фрибеты без депозита
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/best-freebets-month' className='nav__item-link' data-v-37e96694=''>
                              Фрибеты ИЮЛЬ 2025
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/freebet' className='nav__item-link' data-v-37e96694=''>
                              Фрибеты
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/freebet2023-betboom' className='nav__item-link' data-v-37e96694=''>
                              Фрибет Бетбум
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/freebet5000-pari' className='nav__item-link' data-v-37e96694=''>
                              Фрибет ПАРИ
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/sets/freebet-bettery' className='nav__item-link' data-v-37e96694=''>
                              Фрибет Беттери
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a
                              href='https://stavka.tv/promo/sets/freebet-registration-bk'
                              rel='noopener noreferrer'
                              target='_blank'
                              className='nav__item-link'
                              data-v-37e96694=''
                            >
                              Фрибет за регистрацию{' '}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='nav' data-v-37e96694=''>
                      <div className='nav__header text-h5' data-v-37e96694=''>
                        Бонусы букмекеров <span data-v-37e96694=''></span>
                      </div>
                      <div aria-expanded='false' hidden='' data-v-37e96694=''>
                        <ul className='nav__list' data-v-37e96694=''>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/pari' className='nav__item-link' data-v-37e96694=''>
                              Бонусы ПАРИ
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/winline' className='nav__item-link' data-v-37e96694=''>
                              Бонусы Винлайн
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/betboom' className='nav__item-link' data-v-37e96694=''>
                              Бонусы BetBoom
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/promo/fonbet' className='nav__item-link' data-v-37e96694=''>
                              Бонусы Фонбет
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='nav' data-v-37e96694=''>
                      <div className='nav__header text-h5' data-v-37e96694=''>
                        СТАВКА TV <span data-v-37e96694=''></span>
                      </div>
                      <div aria-expanded='false' hidden='' data-v-37e96694=''>
                        <ul className='nav__list' data-v-37e96694=''>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/about' className='nav__item-link' data-v-37e96694=''>
                              О проекте
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/contacts' className='nav__item-link' data-v-37e96694=''>
                              Контакты
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/app' className='nav__item-link' data-v-37e96694=''>
                              Приложение
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/apps' className='nav__item-link' data-v-37e96694=''>
                              Приложения букмекерских контор
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/cup' className='nav__item-link' data-v-37e96694=''>
                              Конкурсы прогнозов
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/other/rules' className='nav__item-link' data-v-37e96694=''>
                              Правила совершения и расчета прогнозов
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/vacancies' className='nav__item-link' data-v-37e96694=''>
                              Вакансии
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/other/privacy-policy' className='nav__item-link' data-v-37e96694=''>
                              Политика конфиденциальности
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/other/terms' className='nav__item-link' data-v-37e96694=''>
                              Пользовательское соглашение
                            </a>
                          </li>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/other/agreement' className='nav__item-link' data-v-37e96694=''>
                              Согласие на обработку данных
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='nav' data-v-37e96694=''>
                      <div className='nav__header text-h5' data-v-37e96694=''>
                        Другие разделы <span data-v-37e96694=''></span>
                      </div>
                      <div aria-expanded='false' hidden='' data-v-37e96694=''>
                        <ul className='nav__list' data-v-37e96694=''>
                          <li className='nav__item' data-v-37e96694=''>
                            <a href='/bettingschool' className='nav__item-link' data-v-37e96694=''>
                              Школа ставок
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className='text text-label disclaimer' data-v-6d0a58f0=''>
                    {' '}
                    Свидетельство ЭЛ № ФС 77 - 83546 от 30.06.2022 г. выдано Федеральной службой по надзору в сфере
                    связи, информационных технологий и массовых коммуникаций (Роскомнадзор). Наименование СМИ: “Ставка
                    TV”. Учредитель: ООО “Ленинград Медиа” Главный редактор: Точилин Д.Н. Телефон редакции: +7 (495)
                    481-39-41. Почта редакции: info@stavka.tv{' '}
                  </p>
                  <p className='note text-button' data-v-6d0a58f0=''>
                    {' '}
                    СТАВКА не является букмекерской конторой и не организует игры на деньги{' '}
                  </p>
                  <noindex data-v-6d0a58f0=''>
                    <div className='copyright' data-v-6d0a58f0=''>
                      <span className='copyright__stavka' data-v-6d0a58f0=''>
                        18+ © 2017-2025 STAVKA.TV
                      </span>
                      <a
                        href='https://flatstudio.co'
                        rel='noopener noreferrer'
                        target='_blank'
                        className='copyright__design'
                        data-v-6d0a58f0=''
                      >
                        {' '}
                        Designed by{' '}
                        <span className='copyright__highlight' data-v-6d0a58f0=''>
                          Flatstudio
                        </span>
                      </a>
                    </div>
                  </noindex>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </GlobalManager>
  )
}
