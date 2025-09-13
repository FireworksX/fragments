'use client'
import '../lib/css/scores24.css'
import { useEffect, useRef } from 'react'
import { createFragmentsClient } from '@fragmentsx/client-core'
import { GlobalManager, Area } from '@fragmentsx/render-react'

export const Demo = () => {
  const fragmentsClient = useRef(
    createFragmentsClient({
      apiToken: '3-4bdeacbe0257f0fa1a2f525383ccad59-d46439868498ae35c6e89a207bcdd7d1c549083eb4e8023bdedcdc9a1162be7f',
      isSelf: false
    })
  )

  useEffect(() => {
    console.log(fragmentsClient)
  }, [])

  return (
    <GlobalManager value={fragmentsClient.current}>
      <>
        <div id='app'>
          <div className='sc-1xsn000-3 czDNtf'>
            <div className='sc-b8rrln-0 bUWSkZ sc-1xsn000-5 gUVGwW'>
              <div className='sc-b8rrln-1 eRokCx'></div>
            </div>

            <div className='sc-1xsn000-4 cjDpEV js-sensor'></div>
            <div className='sc-1xsn000-0 VayEz header-trigger-classname'>
              <div
                className='sc-cukopy-0 imOEFq sc-1xsn000-2 bOCiyW'
                id='cookie-notification'
                style={{ transform: 'initial' }}
              >
                <div className='sc-cukopy-1 dLRRmc'>
                  <span className='sc-cukopy-2 bAMJeV'>
                    Мы используем <a href='/ru/p-rules'>cookies</a> для вашего удобства.
                  </span>
                  <button className='sc-cukopy-3 iimVNO' type='button'>
                    OK
                  </button>
                </div>
              </div>

              <header className='sc-inssjx-0 cjBsXd sc-1xsn000-1 eUXaCS js-header' data-device-container='giftTemplate'>
                <div className='sc-inssjx-1 fisXFn'>
                  <div className='sc-inssjx-2 blbgPU'>
                    <div className='sc-inssjx-4 ikViiG'>
                      <a className='link sc-d0h9pz-0 dYjoZu link--active' href='/ru'>
                        <svg className='sc-i341db-0 ixrffO' direction='right' height='30' width='130'>
                          <use fill='currentColor' href='#logo-scores24'></use>
                        </svg>
                      </a>
                      <div className='sc-d0h9pz-4 gBophS'></div>
                    </div>
                    <div className='sc-inssjx-5 fdkrgL'>
                      <div className='sc-inssjx-6 ebwjNE'>
                        <nav className='sc-hkjphn-0 kExWUL'>
                          <div className='sc-hkjphn-2 kIuffk'>
                            <button
                              aria-expanded='false'
                              className='sc-hkjphn-4 fJfugy'
                              id='header-nav-sports'
                              type='button'
                            >
                              <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                <use fill='currentColor' href='#bars'></use>
                              </svg>
                              Футбол
                            </button>
                            <div
                              aria-labelledby='header-nav-sports'
                              className='sc-1u9bgxl-0 nFnwL sc-hkjphn-8 eYiMrc'
                              style={{
                                position: 'absolute',
                                top: 'calc(100% + 0px)',
                                left: '-20px'
                              }}
                            >
                              <div className='sc-1u9bgxl-1 biNLEy HeaderNavInner'>
                                <a
                                  className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 gnvHRd DropdownItem_active'
                                  href='/ru/soccer'
                                >
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#soccer'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Футбол</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/basketball'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#basketball'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Баскетбол</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/tennis'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#tennis'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Теннис</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/ice-hockey'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#ice-hockey'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Хоккей</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/table-tennis'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#table-tennis'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Настольный теннис</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/volleyball'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#volleyball'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Волейбол</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/handball'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#handball'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Гандбол</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/baseball'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#baseball'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Бейсбол</span>
                                  </span>
                                </a>
                                <a
                                  className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm'
                                  href='/ru/american-football'
                                >
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#american-football'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Американский футбол</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/rugby'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#rugby'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Регби</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/cricket'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#cricket'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Крикет</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/mma'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#mma'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>ММА</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/boxing'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#boxing'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Бокс</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/snooker'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#snooker'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Снукер</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/futsal'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#futsal'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Футзал</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/waterpolo'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#waterpolo'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Водное поло</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/badminton'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#badminton'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Бадминтон</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/darts'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#darts'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Дартс</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/csgo'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#csgo'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Counter-Strike</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/dota2'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#dota2'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Dota 2</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/lol'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#lol'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>League of Legends</span>
                                  </span>
                                </a>
                                <a className='link sc-111o75k-5 dNxTfO sc-hkjphn-10 ffzxWm' href='/ru/horse-racing'>
                                  <span className='sc-111o75k-0 hCXZYg'>
                                    <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                      <use fill='currentColor' href='#horse-racing'></use>
                                    </svg>
                                  </span>
                                  <span className='sc-111o75k-3 jlOBWm DropdownItemInner'>
                                    <span className='sc-hkjphn-11 edIZPf'>Скачки</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className='sc-hkjphn-7 gpcNlA'></div>
                          <div className='sc-1810s67-0 cgcLJU sc-hkjphn-1 gA-dPiR'>
                            <div className='sc-1810s67-1 eAMuAQ hide-scrollbars' style={{ height: '50px' }}>
                              <a className='link sc-hkjphn-5 gfiLxv' href='/ru/trends'>
                                <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                  <use fill='currentColor' href='#fire'></use>
                                </svg>
                                Тренды
                              </a>
                              <a className='link sc-hkjphn-5 gfiLxv' href='/ru/predictions'>
                                <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                  <use fill='currentColor' href='#bet-stacked'></use>
                                </svg>
                                Прогнозы
                              </a>
                              <a className='link sc-hkjphn-5 gfiLxv' href='/ru/accumulators'>
                                <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                  <use fill='currentColor' href='#calculator'></use>
                                </svg>
                                Экспрессы
                              </a>
                              <a className='link sc-hkjphn-5 gfiLxv' href='/ru/sportbooks'>
                                <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                  <use fill='currentColor' href='#bookmakers-rating'></use>
                                </svg>
                                Букмекеры
                              </a>
                              <a className='link sc-hkjphn-5 gfiLxv' href='/ru/articles'>
                                <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                  <use fill='currentColor' href='#news'></use>
                                </svg>
                                Статьи
                              </a>
                            </div>
                            <div className='sc-1810s67-2 jVfXyq HeaderNavShowMore'>
                              <div className='sc-1t0r7hb-0 llvRLu'>
                                <button
                                  aria-expanded='false'
                                  aria-label='ShowMore'
                                  className='sc-1810s67-4 clDzWV'
                                  id='showMoreHeaderNav'
                                  type='button'
                                >
                                  <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                                    <use fill='currentColor' href='#ellipsis'></use>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div className='sc-inssjx-7 ioaHga'>
                        <div className='sc-1bhqq9-0 btnUSa HeaderSearch'>
                          <div className='sc-1do6qmg-0 fZoceK'>
                            <input
                              autoComplete='one-time-code'
                              className='sc-1do6qmg-1 koCOaF'
                              placeholder='Поиск'
                              type='text'
                              value=''
                            />
                            <button aria-label='Search' className='sc-1do6qmg-3 cPFJwO' type='button'>
                              <svg className='sc-i341db-0 ixrffO' direction='right' height='16' width='16'>
                                <use fill='currentColor' href='#search'></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='sc-inssjx-8 eWcIzu'>
                      <div className='sc-10wthie-1 kATIvv'>
                        <button className='sc-xkaft1-4 kJcxug sc-10wthie-2 kMZWVV' type='button'>
                          <svg
                            className='sc-i341db-0 ixrffO sc-xkaft1-1 iIFIMH icon'
                            direction='right'
                            height='16'
                            width='16'
                          >
                            <use fill='currentColor' href='#online'></use>
                          </svg>
                          <span className='sc-xkaft1-5 jqDLGl buttonText'>
                            <span className='sc-xkaft1-3 eKEprw'>RU</span>
                          </span>
                          <svg
                            className='sc-i341db-0 ixrffO sc-xkaft1-2 eJvZds chevron'
                            direction='right'
                            height='16'
                            width='16'
                          >
                            <use fill='currentColor' href='#arrow-caret'></use>
                          </svg>
                        </button>
                        <div
                          className='sc-1u9bgxl-0 nFnwL fade-in dropdown_autoheight dropdown_hidden'
                          style={{ position: 'absolute', top: 'calc(100% + 5px)', right: '-0px' }}
                        >
                          <div className='sc-1u9bgxl-1 biNLEy'>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/en/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>EN</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> English
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/es/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>ES</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Español
                              </span>
                            </a>
                            <span className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS DropdownItem_active DropdownItem_active pointer'>
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>RU</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Русский
                              </span>
                            </span>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/it/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>IT</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Italiano
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/fr/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>FR</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Français
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/pt/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>PT</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Português
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/de/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>DE</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Deutsch
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/pl/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>PL</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Polski
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/hu/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>HU</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Magyar
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/ja/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>JP</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> 日本語
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/id/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>ID</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Indonesia
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/gr/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>GR</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> Ελληνικά
                              </span>
                            </a>
                            <a
                              className='link sc-111o75k-5 dNxTfO sc-10wthie-3 jzddLS'
                              href='/cn/soccer/m-10-08-2025-chelsea-milan-prediction'
                            >
                              <span className='sc-111o75k-3 jlOBWm body'>
                                <span className='sc-10wthie-4 fKFYzo'>CN</span>{' '}
                                <span className='sc-10wthie-0 dnTSgG'></span> 中国语
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className='sc-d0h9pz-9 gAvJSa'>
                        <div className='sc-d0h9pz-5 jjHChH'>
                          <svg
                            className='sc-i341db-0 ixrffO sc-d0h9pz-6 dvgmcX'
                            direction='right'
                            height='30'
                            width='30'
                          >
                            <use fill='currentColor' href='#profile-avatar'></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <svg
                  className='sc-inssjx-9 sc-inssjx-10 iLyA-Dg eEEXHJ'
                  height='20px'
                  preserveAspectRatio='none'
                  viewBox='0 0 20 20'
                  width='20px'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M20,0 H0 V20 Q0,4 16,0 Z' fill='currentColor'></path>
                </svg>
                <svg
                  className='sc-inssjx-9 sc-inssjx-11 iLyA-Dg kWZyYE'
                  height='20px'
                  preserveAspectRatio='none'
                  viewBox='0 0 20 20'
                  width='20px'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0,0 H20 V20 Q20,4 4,0 Z' fill='currentColor'></path>
                </svg>
              </header>
            </div>

            <div className='sc-b8rrln-0 bUWSkZ sc-1xsn000-6 fbZGcb'>
              <div className='sc-b8rrln-1 eRokCx'></div>
            </div>

            <div className='clever-core-ads'></div>
            <main className='sc-1f6wkge-3 dVpqMC sc-1xsn000-7 kUxPYB'>
              <aside className='sc-1f6wkge-0 hyREvX'>
                <div className='sticky-outer-wrapper'>
                  <div className='sticky-inner-wrapper inner-name' style={{ position: 'relative', top: '0px' }}>
                    <div className='sc-15xowze-0 jzyPYa' style={{ paddingBottom: 0 }}>
                      <div className='sc-gsavkd-0 lnxYIu'>
                        <div className='sc-1c7kzop-0 ijOoKt'>
                          <ul className='sc-1c7kzop-1 laovTb'>
                            <li className='sc-1c7kzop-2 eRHTJe'>
                              <div className='sc-14qtqh-1 gdiJJi'>Футбол</div>
                            </li>
                            <li className='sc-1c7kzop-2 eRHTJe'>
                              <div className='sc-1oygpd3-1 gLmPSg'>
                                <a className='link sc-1oygpd3-2 ffxPKC' href='/ru/soccer'>
                                  <svg
                                    className='sc-i341db-0 ixrffO sc-1oygpd3-0 fHOXXs'
                                    direction='right'
                                    height='20'
                                    width='20'
                                  >
                                    <use fill='currentColor' href='#faults'></use>
                                  </svg>
                                  <span>Матчи</span>
                                </a>
                              </div>
                            </li>
                            <li className='sc-1c7kzop-2 eRHTJe'>
                              <div className='sc-1oygpd3-1 gLmPSg'>
                                <a className='link sc-1oygpd3-2 ffxPKC' href='/ru/predictions/soccer'>
                                  <svg
                                    className='sc-i341db-0 ixrffO sc-1oygpd3-0 fHOXXs'
                                    direction='right'
                                    height='20'
                                    width='20'
                                  >
                                    <use fill='currentColor' href='#bet-stacked'></use>
                                  </svg>
                                  <span>Прогнозы</span>
                                </a>
                              </div>
                            </li>
                            <li className='sc-1c7kzop-2 eRHTJe'>
                              <div className='sc-1oygpd3-1 gLmPSg'>
                                <a className='link sc-1oygpd3-2 ffxPKC' href='/ru/trends/soccer'>
                                  <svg
                                    className='sc-i341db-0 ixrffO sc-1oygpd3-0 fHOXXs'
                                    direction='right'
                                    height='20'
                                    width='20'
                                  >
                                    <use fill='currentColor' href='#fire'></use>
                                  </svg>
                                  <span>Тренды</span>
                                </a>
                              </div>
                            </li>
                            <li className='sc-1c7kzop-2 eRHTJe'>
                              <div className='sc-1oygpd3-1 gLmPSg'>
                                <a className='link sc-1oygpd3-2 ffxPKC' href='/ru/accumulators/soccer'>
                                  <svg
                                    className='sc-i341db-0 ixrffO sc-1oygpd3-0 fHOXXs'
                                    direction='right'
                                    height='20'
                                    width='20'
                                  >
                                    <use fill='currentColor' href='#calculator'></use>
                                  </svg>
                                  <span>Экспрессы</span>
                                </a>
                              </div>
                            </li>
                            <li className='sc-1c7kzop-2 eRHTJe'>
                              <div className='sc-1oygpd3-1 gLmPSg'>
                                <a className='link sc-1oygpd3-2 ffxPKC' href='/ru/soccer/countries'>
                                  <svg
                                    className='sc-i341db-0 ixrffO sc-1oygpd3-0 fHOXXs'
                                    direction='right'
                                    height='20'
                                    width='20'
                                  >
                                    <use fill='currentColor' href='#cup'></use>
                                  </svg>
                                  <span>Турниры</span>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className='sc-15kg99g-0 cHXUNI sc-17qciki-0 lfYpni'>
                          <div className='sc-1n1dofm-0 dsUkMS'>
                            <div className='sc-1n1dofm-1 gvKteO'>Мои матчи</div>
                            <div className='sc-1n1dofm-2 iyyYVs'>
                              <svg className='sc-i341db-0 llDTjH' direction='down' height='16' width='16'>
                                <use fill='currentColor' href='#arrow-caret'></use>
                              </svg>
                            </div>
                          </div>
                          <div className='sc-jrv2fx-0 fhEluS open' open=''>
                            <div className='sc-15kg99g-1 ldCvGU'>
                              <div className='sc-1vxyfb0-0 jUgDpx'>
                                Нажмите
                                <svg
                                  className='sc-i341db-0 ixrffO sc-1vxyfb0-1 cUeXyZ'
                                  direction='right'
                                  height='16'
                                  width='16'
                                >
                                  <use fill='currentColor' href='#bell'></use>
                                </svg>
                                напротив матча, чтобы получать уведомления
                              </div>
                            </div>
                            <div className='sc-15kg99g-2 jZcQfw'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
              <section className='sc-1f6wkge-1 eZXjvs'>
                <section className='sc-1xsn000-9 iTuKvM'>
                  <div className='sc-18u0541-0 iGcyqB'></div>
                  <div>
                    <div className='sc-qt1qbt-0 kzzMRu'>
                      <div>
                        <div>
                          <div className='sc-1ioo4eh-0 flFKrK' data-testid='MatchHeader'>
                            <div className='sc-13fposn-0 RYPTo'>
                              <div className='sc-1810s67-0 cgcLJU sc-13fposn-1 hPEmnM'>
                                <div className='sc-1810s67-1 fgxnql hide-scrollbars' style={{ height: '16px' }}>
                                  <div className='sc-ed0wb2-0 lmXJtI'>
                                    <div className='sc-ed0wb2-1 ljMZEO'>
                                      <a className='link sc-ed0wb2-3 hGsFNy link--active' href='/ru'>
                                        Главная
                                        <svg
                                          className='sc-i341db-0 ixrffO sc-ed0wb2-2 fbRKwm'
                                          direction='right'
                                          height='16'
                                          width='16'
                                        >
                                          <use fill='currentColor' href='#arrow-chevron-small'></use>
                                        </svg>
                                      </a>
                                      <a className='link sc-ed0wb2-3 hGsFNy' href='/ru/predictions'>
                                        Прогнозы
                                        <svg
                                          className='sc-i341db-0 ixrffO sc-ed0wb2-2 fbRKwm'
                                          direction='right'
                                          height='16'
                                          width='16'
                                        >
                                          <use fill='currentColor' href='#arrow-chevron-small'></use>
                                        </svg>
                                      </a>
                                      <a className='link sc-ed0wb2-3 hGsFNy' href='/ru/predictions/soccer'>
                                        Футбол
                                        <svg
                                          className='sc-i341db-0 ixrffO sc-ed0wb2-2 fbRKwm'
                                          direction='right'
                                          height='16'
                                          width='16'
                                        >
                                          <use fill='currentColor' href='#arrow-chevron-small'></use>
                                        </svg>
                                      </a>
                                      <a
                                        className='link sc-ed0wb2-3 hGsFNy'
                                        href='/ru/soccer/l-international-clubs-club-friendly-games/predictions'
                                      >
                                        Клубные товарищеские матчи
                                        <svg
                                          className='sc-i341db-0 ixrffO sc-ed0wb2-2 fbRKwm'
                                          direction='right'
                                          height='16'
                                          width='16'
                                        >
                                          <use fill='currentColor' href='#arrow-chevron-small'></use>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='sc-13fposn-2 gNkGFj'>
                                <div className='sc-1y5i3gt-0 iXaAmN'>
                                  <button aria-label='SubscribeButton' className='sc-o7yq8p-0 guXtYE' type='button'>
                                    <svg
                                      className='sc-i341db-0 ixrffO sc-o7yq8p-1 ezqmNo'
                                      direction='right'
                                      height='20'
                                      width='20'
                                    >
                                      <use fill='currentColor' href='#star-sharp'></use>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className='sc-1ioo4eh-1 cLROOp'>
                              <div className='sc-1ioo4eh-2 duPWBJ'>
                                <div className='sc-1ioo4eh-3 hTaxJd'>
                                  <div className='sc-1ioo4eh-4 eEmBuS'>
                                    <div className='sc-wboo8m-0 fyNHcR'>
                                      <a className='link sc-wboo8m-2 dVfgnQ' href='/ru/soccer/t-chelsea-fc'>
                                        Челси
                                      </a>
                                    </div>
                                  </div>
                                  <div className='sc-1ioo4eh-5 juzZOG'>-</div>
                                  <div className='sc-1ioo4eh-4 eEmBuS'>
                                    <div className='sc-wboo8m-0 fyNHcR'>
                                      <a className='link sc-wboo8m-2 dVfgnQ' href='/ru/soccer/t-ac-milan-2'>
                                        Милан
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1u3j2wh-0 iuactv'>
                                  <span data-testid='MatchHeaderHeadDate'>10.08.25</span>
                                  <div className='sc-1u3j2wh-1 kHgDCb'></div>
                                  <span data-testid='MatchHeaderHeadTime'>14:00</span>
                                </div>
                              </div>
                              <div className='sc-1ioo4eh-6 cPBhYc'>
                                <div className='sc-1ioo4eh-11 hZWaIU'>
                                  <div className='sc-6dcylu-0 sc-1ioo4eh-12 imMxPT'>
                                    <div className='sc-6dcylu-1 lnPHoy' data-testid='MatchHeaderLogo'>
                                      <div className='sc-13yy778-0 jACzoa' data-testid='MatchBoardLogo'>
                                        <a
                                          className='link sc-13yy778-3'
                                          data-testid='MatchBoardLogoLink'
                                          href='/ru/soccer/t-chelsea-fc'
                                        >
                                          <Area areaCode='79f780fa0dd508' options={{ ssr: false }} />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className='sc-1tryk2s-0 bjsAWl sc-1ioo4eh-13 rWYrB'
                                    data-testid='DisplayPhysicalForm'
                                  >
                                    <div className='sc-1tryk2s-1 fpzAk'>
                                      <div className='sc-1tryk2s-2 bsVXQ' data-testid='DisplayPhysicalFormWrapper'>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 dsQacB'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1ioo4eh-8 hfYoiR'>
                                  <div>
                                    <div className='sc-1ioo4eh-9 jEJkvF'>
                                      <div data-testid='MatchHeaderBodyTimeWrapper'>
                                        <div className='sc-nbom0p-1 jCwmVa'>
                                          <div className='sc-1ue4xdi-2 iswicc' data-testid='MatchHeaderTimer'>
                                            <div className='sc-1ue4xdi-0 dMryWh' data-testid='MatchHeaderTimerHour'>
                                              04
                                            </div>
                                            <div className='sc-1ue4xdi-1 cZqGFB'>:</div>
                                            <div className='sc-1ue4xdi-0 dMryWh' data-testid='MatchHeaderTimerMinute'>
                                              54
                                            </div>
                                            <div className='sc-1ue4xdi-1 lcroqe'>:</div>
                                            <div className='sc-1ue4xdi-0 kbfhMY' data-testid='MatchHeaderTimerSecond'>
                                              02
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1ioo4eh-11 hZWaIU'>
                                  <div className='sc-6dcylu-0 sc-1ioo4eh-12 imMxPT'>
                                    <div className='sc-6dcylu-1 lnPHoy' data-testid='MatchHeaderLogo'>
                                      <div className='sc-13yy778-0 jACzoa' data-testid='MatchBoardLogo'>
                                        <a
                                          className='link sc-13yy778-3'
                                          data-testid='MatchBoardLogoLink'
                                          href='/ru/soccer/t-ac-milan-2'
                                        >
                                          <Area areaCode='79f780fa0dd508' options={{ ssr: false }} />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className='sc-1tryk2s-0 bjsAWl sc-1ioo4eh-13 rWYrB'
                                    data-testid='DisplayPhysicalForm'
                                  >
                                    <div className='sc-1tryk2s-1 fpzAk'>
                                      <div className='sc-1tryk2s-2 bsVXQ' data-testid='DisplayPhysicalFormWrapper'>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 hNxsWs'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                        <div
                                          className='sc-1tryk2s-4 dsQacB'
                                          data-testid='DisplayPhysicalFormItem'
                                          mode='gray'
                                        >
                                          <span className='link pointer sc-1tryk2s-5 fuipjo'></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='sc-7qcxog-0 kuDffG'></div>
                            </div>
                          </div>
                          <div className='sc-1fgmmbh-0 dndkCZ'>
                            <div className='sc-1fgmmbh-1 gkARcj'>
                              <div className='sc-1810s67-0 fyEwee sc-1fgmmbh-3 cLVDmQ'>
                                <div
                                  className='sc-1810s67-1 fgxnql ListWrapper hide-scrollbars'
                                  style={{ height: '46px' }}
                                >
                                  <div
                                    className='sc-1fgmmbh-2 cDzsEY'
                                    style={{ height: 0, width: 0, transform: 'translate(0px, 0px)' }}
                                  ></div>
                                  <div className='sc-1eqhv54-0 jfQGQa' data-active='false'>
                                    <a
                                      className='link sc-1eqhv54-1 iZhYBh'
                                      href='/ru/soccer/m-10-08-2025-chelsea-milan'
                                    >
                                      <svg
                                        className='sc-i341db-0 ixrffO sc-1eqhv54-2 gFWeJv'
                                        direction='right'
                                        height='16'
                                        width='16'
                                      >
                                        <use fill='currentColor' href='#interface'></use>
                                      </svg>
                                      Обзор
                                    </a>
                                  </div>
                                  <div className='sc-1eqhv54-0 jfQGQa' data-active='true'>
                                    <a
                                      className='link sc-1eqhv54-1 fmYzlQ link--active'
                                      href='/ru/soccer/m-10-08-2025-chelsea-milan-prediction'
                                    >
                                      <svg
                                        className='sc-i341db-0 ixrffO sc-1eqhv54-2 gFWeJv'
                                        direction='right'
                                        height='16'
                                        width='16'
                                      >
                                        <use fill='currentColor' href='#bet-stacked'></use>
                                      </svg>
                                      Прогноз
                                    </a>
                                  </div>
                                  <div className='sc-1eqhv54-0 jfQGQa' data-active='false'>
                                    <a
                                      className='link sc-1eqhv54-1 iZhYBh'
                                      href='/ru/soccer/m-10-08-2025-chelsea-milan#trends'
                                    >
                                      <svg
                                        className='sc-i341db-0 ixrffO sc-1eqhv54-2 gFWeJv'
                                        direction='right'
                                        height='16'
                                        width='16'
                                      >
                                        <use fill='currentColor' href='#fire'></use>
                                      </svg>
                                      Тренды
                                    </a>
                                  </div>
                                  <div className='sc-1eqhv54-0 jfQGQa' data-active='false'>
                                    <a
                                      className='link sc-1eqhv54-1 iZhYBh'
                                      href='/ru/soccer/m-10-08-2025-chelsea-milan-h2h'
                                    >
                                      <svg
                                        className='sc-i341db-0 ixrffO sc-1eqhv54-2 gFWeJv'
                                        direction='right'
                                        height='16'
                                        width='16'
                                      >
                                        <use fill='currentColor' href='#shield-separated'></use>
                                      </svg>
                                      Стат.
                                    </a>
                                  </div>
                                  <div className='sc-1eqhv54-0 jlqUtq' data-active='false'>
                                    <a
                                      className='link sc-1eqhv54-1 iZhYBh'
                                      href='/ru/soccer/m-10-08-2025-chelsea-milan#chat'
                                    >
                                      <svg
                                        className='sc-i341db-0 ixrffO sc-1eqhv54-2 gFWeJv'
                                        direction='right'
                                        height='16'
                                        width='16'
                                      >
                                        <use fill='currentColor' href='#comments'></use>
                                      </svg>
                                      Чат
                                    </a>
                                  </div>
                                  <div className='sc-1eqhv54-0 jfQGQa' data-active='false'>
                                    <a
                                      className='link sc-1eqhv54-1 iZhYBh'
                                      href='/ru/soccer/m-10-08-2025-chelsea-milan#odds'
                                    >
                                      <svg
                                        className='sc-i341db-0 ixrffO sc-1eqhv54-2 gFWeJv'
                                        direction='right'
                                        height='16'
                                        width='16'
                                      >
                                        <use fill='currentColor' href='#one-two-stacked'></use>
                                      </svg>
                                      Кэфы
                                    </a>
                                  </div>
                                </div>
                                <div className='sc-1810s67-8 ghwVrb'>
                                  <svg className='sc-i341db-0 ixrffO' direction='right' height='16' width='16'>
                                    <use fill='currentColor' href='#arrow-chevron-small'></use>
                                  </svg>
                                </div>
                                <div className='sc-1810s67-9 bfFHpO'>
                                  <svg className='sc-i341db-0 ixrffO' direction='right' height='16' width='16'>
                                    <use fill='currentColor' href='#arrow-chevron-small'></use>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>

                    <div className='sc-165q7m8-0 gRVzLM' data-testid='MatchPredictionHead'>
                      <h2 className='sc-4y75cf-0 hoRCwP' data-testid='Headline'>
                        Челси - Милан прогноз
                      </h2>
                    </div>
                    <div className='sc-7s74tu-0 bvsCVq sc-4u32b4-0 aHuDe'>
                      <div className='sc-1810s67-0 cgcLJU'>
                        <ul
                          className='sc-1810s67-1 fgxnql pageAnchorsList hide-scrollbars'
                          style={{ height: '30px' }}
                        ></ul>
                      </div>
                    </div>
                    <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>
                    <Area areaCode='0a2eb85eb05f' options={{ ssr: false }} />
                    <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>

                    <div>
                      <div className='sc-2cxzjp-0 cfqqTg' data-anchor='prediction' data-testid='PageAnchorContainer'>
                        <div className='sc-494x2g-0 gvBCgg'>
                          <div className='sc-494x2g-2 hSGGEC'>
                            <p>
                              Будут ли игроки выкладываться на полную в предстоящей встрече? Товарищеский матч между
                              командами Челси и Милан состоится 10 августа в 14:00. Чтобы лучше спрогнозировать исход
                              игры, предлагаем ознакомиться со статистическими данными по коллективам.
                            </p>
                          </div>
                          <div>
                            <div className='sc-111vqmd-0 fiNJGr sc-494x2g-1 bvTyEo'>
                              <div className='sc-111vqmd-1 huPwvB'>
                                <div className='sc-111vqmd-2 dRkomU'>
                                  <h2 className='sc-4y75cf-0 hoRCwP sc-111vqmd-5 grXjBn' data-testid='Headline'>
                                    Личные встречи
                                  </h2>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p>
                                Последний официальный матч между командами состоялся 11 октября 2022 и завершился со
                                счётом 0:2. Приведём сравнительную статистику той встречи (хозяева поля – Милан):
                              </p>
                              <ul>
                                <li>процент владения мячом: 29% vs 71%;</li>
                                <li>угловые удары: 2 vs 5;</li>
                                <li>фолы: 11 vs 17;</li>
                                <li>жёлтые карточки: 6 vs 3;</li>
                                <li>удары в створ ворот: 1 vs 4.</li>
                              </ul>
                              <p>
                                Начнём с истории личных встреч, в которой насчитывается 4 игры. Нынешним хозяевам поля
                                удалось выиграть 4 раза, гости же одержали верх в 0 матчах.
                              </p>
                              <p>
                                Что касается голов, то команда Челси поразила ворота соперника 10 раз. Коллектив Милан
                                ответил 1 голом. Таким образом, средний тотал в очных встречах составляет 2.75.
                              </p>
                            </div>
                          </div>
                          <div className='sc-494x2g-2 sc-494x2g-3 hSGGEC iHOJZP'>
                            <div className='sc-2cxzjp-0 cfqqTg' data-anchor='h2h' data-testid='PageAnchorContainer'>
                              <div className='sc-1b1ga3p-0 fGiQFA' data-testid='MatchH2HWidget'>
                                <div className='sc-1v24ncn-0 esABlP' data-testid='Container'>
                                  <div className='sc-111vqmd-0 hDSIKb sc-1b1ga3p-1 kGrClf'>
                                    <div className='sc-111vqmd-1 huPwvB'>
                                      <div className='sc-111vqmd-2 dRkomU'>
                                        <h3 className='sc-4y75cf-0 fAPWyp sc-111vqmd-5 grXjBn' data-testid='Headline'>
                                          Челси - Милан очные встречи и последние результаты
                                        </h3>
                                      </div>
                                    </div>
                                    <div className='sc-111vqmd-6 FuFnE'>
                                      <div className='sc-1b1ga3p-3 kREMpv'>
                                        <button className='sc-2dzn45-6 cVLSuC' data-testid='Chip'>
                                          <div className='sc-2dzn45-1 ixyoiX'>
                                            <div className='sc-2d1xt9-0 A-DEsR'>
                                              <input className='sc-2d1xt9-1 bwkLHw' type='checkbox' />
                                              <div className='sc-2d1xt9-2 fwWaeg'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO sc-2d1xt9-3 UuTht'
                                                  direction='right'
                                                  height='20'
                                                  width='20'
                                                >
                                                  <use fill='currentColor' href='#check'></use>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='sc-2dzn45-4 kVkqIr'>Дом/Выезд </div>
                                          <div className='sc-2dzn45-2 bWbFCd'></div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1v24ncn-0 esABlP' data-testid='Container'>
                                  <div className='sc-1g2gfht-0 dCXAxu' data-testid='MatchH2HChart'>
                                    <div className='sc-1g2gfht-1 bgQNFH'>
                                      <div className='sc-1g2gfht-2 cJDUWh'></div>
                                      <div className='sc-1g2gfht-2 hOeego'></div>
                                      <div className='sc-1g2gfht-2 hOeego'></div>
                                    </div>
                                    <div className='sc-1g2gfht-3 oURsR'>
                                      <div className='sc-1g2gfht-6 dpbXln'>
                                        <span className='sc-11tt6ib-0 fdYpUu' size='30'>
                                          <img
                                            className='lazyload sc-11tt6ib-2 mzpSx'
                                            data-src='https://cdn.scores24.live/upload/team/w30-h30/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                            data-srcset='https://cdn.scores24.live/upload/team/w30-h30/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w60-h60/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                            src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                          />
                                        </span>
                                        <div>
                                          <div className='sc-1g2gfht-4 zcUMK'>100%</div>
                                          <div className='sc-1g2gfht-5 hbICwL'>4 Победы</div>
                                        </div>
                                      </div>
                                      <div className='sc-1g2gfht-6 dpbXln'>
                                        <div>
                                          <div className='sc-1g2gfht-4 zcUMK'>0%</div>
                                          <div className='sc-1g2gfht-5 hbICwL'>0 Ничьих</div>
                                        </div>
                                      </div>
                                      <div className='sc-1g2gfht-6 dpbXln'>
                                        <div>
                                          <div className='sc-1g2gfht-4 zcUMK'>0%</div>
                                          <div className='sc-1g2gfht-5 hbICwL'>0 Побед</div>
                                        </div>
                                        <span className='sc-11tt6ib-0 fdYpUu' size='30'>
                                          <img
                                            className='lazyload sc-11tt6ib-2 mzpSx'
                                            data-src='https://cdn.scores24.live/upload/team/w30-h30/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                            data-srcset='https://cdn.scores24.live/upload/team/w30-h30/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w60-h60/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                            src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1v24ncn-0 hpPvWt' data-testid='Container'>
                                  <div className='sc-1v24ncn-0 jdBASz sc-1bt3bah-0 hmurfp' data-testid='Container'>
                                    <div className='sc-1bt3bah-5 loFrxX'>
                                      <div className='sc-1bt3bah-2 gjBWji'>
                                        <div className='sc-1bt3bah-3 CMGOq'>Всего игр</div>
                                        <div className='sc-1bt3bah-4 jRxnqn'>4</div>
                                      </div>
                                      <div className='sc-1bt3bah-2 gjBWji'>
                                        <div className='sc-1bt3bah-3 CMGOq'>Средний тотал матча</div>
                                        <div className='sc-1bt3bah-4 jRxnqn'>2.75</div>
                                      </div>
                                      <div className='sc-1bt3bah-2 gjBWji'>
                                        <div className='sc-1bt3bah-3 CMGOq'>Обе команды забивали</div>
                                        <div className='sc-1bt3bah-4 jRxnqn'>25%</div>
                                      </div>
                                    </div>
                                    <div className='sc-1bt3bah-1 brAEa-d'>
                                      <div className='sc-1bt3bah-2 gjBWji'>
                                        <div className='sc-1bt3bah-4 jRxnqn'>2.5</div>
                                        <div className='sc-1bt3bah-3 CMGOq'>Средний тотал</div>
                                        <div className='sc-1bt3bah-4 jRxnqn'>0.25</div>
                                      </div>
                                      <div className='sc-1bt3bah-2 gjBWji'>
                                        <div className='sc-1bt3bah-4 jRxnqn'>1.5</div>
                                        <div className='sc-1bt3bah-3 CMGOq'>Жёлтые карточки</div>
                                        <div className='sc-1bt3bah-4 jRxnqn'>3</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sc-1v24ncn-0 hpPvWt' data-testid='Container'>
                                  <div className='sc-b9tb4l-0 gjZrXC'>
                                    <div>
                                      <div className='sc-30rb2b-2 hSCXdH' data-testid='MatchGenericHeader'>
                                        <div className='sc-30rb2b-0 iiAsXC'>
                                          <div className='sc-30rb2b-3 jLyKab'>Последние матчи</div>
                                        </div>
                                        <div className='sc-30rb2b-1 eRlrOB'>
                                          <div
                                            className='sc-l3bgdv-0 cUdwHj'
                                            data-testid='MatchGenericStatisticsHeader'
                                          >
                                            <div className='sc-l3bgdv-1 jkvlCM'>
                                              <svg
                                                className='sc-i341db-0 ixrffO'
                                                direction='right'
                                                height='20'
                                                width='15'
                                              >
                                                <use fill='currentColor' href='#xg-icon'></use>
                                              </svg>
                                            </div>
                                            <div className='sc-l3bgdv-1 jkvlDW'>
                                              <svg
                                                className='sc-i341db-0 ixrffO'
                                                direction='right'
                                                height='16'
                                                width='16'
                                              >
                                                <use fill='currentColor' href='#corner-kicks-received'></use>
                                              </svg>
                                            </div>
                                            <div className='sc-l3bgdv-1 jkvlDW'>
                                              <svg
                                                className='sc-i341db-0 ixrffO'
                                                direction='right'
                                                height='16'
                                                width='16'
                                              >
                                                <use fill='currentColor' href='#faults'></use>
                                              </svg>
                                            </div>
                                            <div className='sc-l3bgdv-1 jkvlDW'>
                                              <div
                                                className='sc-cn243d-0 bzKxcj'
                                                color='yellow'
                                                data-testid='MatchCard'
                                              >
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='16'
                                                  width='16'
                                                >
                                                  <use fill='currentColor' href='#card'></use>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='sc-b9tb4l-2 eEVvvY'>
                                        <div className='sc-15z5276-0 hSdDfN sc-b9tb4l-3 gKdmEn'>
                                          <div className='sc-15z5276-2 fAwaEU'>
                                            <div className='sc-1eaieo6-0 dEJdyt __MatchGamesBody'>
                                              <div className='sc-jrv2fx-0 fhEluS open' open=''>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>11.10.22</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>ЛЧУ</span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div className='sc-p2ps84-1 etreKg'>
                                                          <a
                                                            className='link sc-2k73ey-0 hHswlX'
                                                            href='/ru/soccer/m-11-10-2022-ac-milan-chelsea-fc-prediction'
                                                          >
                                                            <svg
                                                              className='sc-i341db-0 ixrffO sc-2k73ey-1 fzOumZ'
                                                              direction='right'
                                                              height='20'
                                                              width='20'
                                                            >
                                                              <use fill='currentColor' href='#bet-stacked'></use>
                                                            </svg>
                                                          </a>
                                                        </div>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Милан</div>
                                                                <div
                                                                  className='sc-cn243d-0 kqAIXT sc-17qxh4e-15 icWxNy'
                                                                  color='red'
                                                                  data-testid='MatchCard'
                                                                >
                                                                  <svg
                                                                    className='sc-i341db-0 ixrffO'
                                                                    direction='right'
                                                                    height='16'
                                                                    width='16'
                                                                  >
                                                                    <use fill='currentColor' href='#card'></use>
                                                                  </svg>
                                                                  <div className='sc-cn243d-1 bxwJRz'>1</div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>11</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>17</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>6</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>11</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>17</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>6</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <div className='sc-p2ps84-0 hfixrZ sc-1spz999-1 iDrgnu'>
                                                          <div className='sc-p2ps84-1 etreKg action'>
                                                            <a
                                                              className='link sc-2k73ey-0 hHswlX'
                                                              href='/ru/soccer/m-11-10-2022-ac-milan-chelsea-fc-prediction'
                                                            >
                                                              <svg
                                                                className='sc-i341db-0 ixrffO sc-2k73ey-1 fzOumZ'
                                                                direction='right'
                                                                height='20'
                                                                width='20'
                                                              >
                                                                <use fill='currentColor' href='#bet-stacked'></use>
                                                              </svg>
                                                            </a>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>05.10.22</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>ЛЧУ</span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div className='sc-p2ps84-1 etreKg'>
                                                          <a
                                                            className='link sc-2k73ey-0 hHswlX'
                                                            href='/ru/soccer/m-05-10-2022-chelsea-fc-ac-milan-prediction'
                                                          >
                                                            <svg
                                                              className='sc-i341db-0 ixrffO sc-2k73ey-1 fzOumZ'
                                                              direction='right'
                                                              height='20'
                                                              width='20'
                                                            >
                                                              <use fill='currentColor' href='#bet-stacked'></use>
                                                            </svg>
                                                          </a>
                                                        </div>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Милан</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>15</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>15</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>3</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>15</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>15</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <div className='sc-p2ps84-0 hfixrZ sc-1spz999-1 iDrgnu'>
                                                          <div className='sc-p2ps84-1 etreKg action'>
                                                            <a
                                                              className='link sc-2k73ey-0 hHswlX'
                                                              href='/ru/soccer/m-05-10-2022-chelsea-fc-ac-milan-prediction'
                                                            >
                                                              <svg
                                                                className='sc-i341db-0 ixrffO sc-2k73ey-1 fzOumZ'
                                                                direction='right'
                                                                height='20'
                                                                width='20'
                                                              >
                                                                <use fill='currentColor' href='#bet-stacked'></use>
                                                              </svg>
                                                            </a>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='sc-1eaieo6-0 dEJdyt __MatchGamesBody'>
                                              <div className='sc-jrv2fx-0 WmwaT notEntered'></div>
                                            </div>
                                          </div>
                                          <div className='sc-15z5276-1 jvqndO empty'>
                                            <div className='sc-15z5276-4 dKhvGV'>
                                              <svg
                                                className='sc-i341db-0 ixrffO sc-15z5276-5 fqHOwN'
                                                direction='right'
                                                height='90'
                                                width='90'
                                              >
                                                <use fill='currentColor' href='#empty-general'></use>
                                              </svg>
                                            </div>
                                            <div className='sc-15z5276-3 hpirry'>
                                              <div className='sc-15z5276-6 TysSf'>Матчей нет</div>
                                              <div className='sc-15z5276-7 krKqUg'>
                                                Добавьте интересующие вас матчи или подпишитесь на команду, турнир или
                                                игрока.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='sc-494x2g-2 hSGGEC'>
                            <div className='sc-1gd34kg-0 iWHzDM'>
                              <div className='sc-1gd34kg-1 kcQuML'>
                                <span className='sc-11tt6ib-0 iQOaaC sc-1gd34kg-6 ehwfCy' size='60'>
                                  <img
                                    className='lazyload sc-11tt6ib-2 mzpSx'
                                    data-src='https://cdn.scores24.live/upload/team/w60-h60/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                    data-srcset='https://cdn.scores24.live/upload/team/w60-h60/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w120-h120/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                    src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                  />
                                </span>
                                <h2 className='sc-1gd34kg-2 cNYWKh'>
                                  Челси<span className='sc-1gd34kg-4 bLsdd'> Обзор команды</span>
                                </h2>
                              </div>
                              <div className='sc-494x2g-0 sc-1gd34kg-5 gvBCgg hhWnfd'>
                                <p>
                                  Последний официальный матч команда провела 8 августа 2025 в рамках турнира Клубные
                                  товарищеские матчи (хозяева поля – Челси, гости – Байер). Матч завершился со счётом
                                  2:0.
                                </p>
                                <p>Статистика игры следующая (Челси vs Байер):</p>
                                <ul>
                                  <li>процент владения мячом: 69% vs 31%;</li>
                                  <li>угловые удары: 7 vs 4;</li>
                                  <li>жёлтые карточки: 1 vs 2;</li>
                                  <li>удары в створ ворот: 6 vs 2.</li>
                                </ul>
                                <p>
                                  ✅Команде Челси выпала честь провести первый официальный матч в этом сезоне на своём
                                  поле. Нам только предстоит увидеть, какую работу проделали над своей игрой тренерский
                                  состав и игроки. А пока предлагаем ознакомиться со статистикой коллектива за последние
                                  10 матчей.
                                </p>
                                <p>
                                  На официальном десятиматчевом отрезке команда имеет 9 побед, 1 поражение, и 0 ничьи. В
                                  общей сложности за 10 предыдущих игр коллектив забил 23 гола. Исходя из этого можно
                                  посчитать среднее количество голов за игру, которое составляет 2.3. При этом в
                                  домашних матчах этот показатель равен 2. Что касается пропущенных мячей, то их среднее
                                  количество равно 0.6.
                                </p>
                              </div>
                              <div className='sc-1gd34kg-7 eGDoMz'>
                                <div className='sc-85qh4y-0 jcnSTJ'>
                                  <div className='sc-ou8qdt-0 kIFtjI'>
                                    <h3 className='sc-4y75cf-0 fAPWyp sc-ou8qdt-1 eIHCZe' data-testid='Headline'>
                                      Результаты матчей: Челси
                                    </h3>
                                    <div className='sc-ou8qdt-2 igXPEY'>
                                      <div className='sc-1t0r7hb-0 llvRLu'>
                                        <button
                                          className='sc-2dzn45-6 cVLSuC sc-13b4qwh-1 sc-ou8qdt-3 ikRGnq'
                                          data-testid='Chip'
                                        >
                                          <div className='sc-2dzn45-1 ixyoiX'></div>
                                          <div className='sc-2dzn45-4 kVkqIr'>Все турниры </div>
                                          <div className='sc-2dzn45-2 bWbFCd'>
                                            <svg
                                              className='sc-i341db-0 ixrffO sc-13b4qwh-0 kYKqgr'
                                              direction='right'
                                              height='16'
                                              width='16'
                                            >
                                              <use fill='currentColor' href='#arrow-chevron'></use>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                      <div className='sc-1t0r7hb-0 llvRLu'>
                                        <button className='sc-2dzn45-6 cVLSuC sc-13b4qwh-1' data-testid='Chip'>
                                          <div className='sc-2dzn45-1 ixyoiX'></div>
                                          <div className='sc-2dzn45-4 kVkqIr'>Все матчи </div>
                                          <div className='sc-2dzn45-2 bWbFCd'>
                                            <svg
                                              className='sc-i341db-0 ixrffO sc-13b4qwh-0 kYKqgr'
                                              direction='right'
                                              height='16'
                                              width='16'
                                            >
                                              <use fill='currentColor' href='#arrow-chevron'></use>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='sc-b9tb4l-0 irdcwi'>
                                    <div>
                                      <div className='sc-wzh2yo-0 kgmgDt' data-testid='StickyHeader'>
                                        <div className='sc-30rb2b-2 hSCXdH' data-testid='MatchGenericHeader'>
                                          <div className='sc-30rb2b-0 iiAsXC'>
                                            <div className='sc-30rb2b-3 jLyKab'>Последние матчи</div>
                                          </div>
                                          <div className='sc-30rb2b-1 eRlrOB'>
                                            <div
                                              className='sc-l3bgdv-0 cUdwHj'
                                              data-testid='MatchGenericStatisticsHeader'
                                            >
                                              <div className='sc-l3bgdv-1 jkvlCM'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='20'
                                                  width='15'
                                                >
                                                  <use fill='currentColor' href='#xg-icon'></use>
                                                </svg>
                                              </div>
                                              <div className='sc-l3bgdv-1 jkvlDW'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='16'
                                                  width='16'
                                                >
                                                  <use fill='currentColor' href='#corner-kicks-received'></use>
                                                </svg>
                                              </div>
                                              <div className='sc-l3bgdv-1 jkvlDW'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='16'
                                                  width='16'
                                                >
                                                  <use fill='currentColor' href='#faults'></use>
                                                </svg>
                                              </div>
                                              <div className='sc-l3bgdv-1 jkvlDW'>
                                                <div
                                                  className='sc-cn243d-0 bzKxcj'
                                                  color='yellow'
                                                  data-testid='MatchCard'
                                                >
                                                  <svg
                                                    className='sc-i341db-0 ixrffO'
                                                    direction='right'
                                                    height='16'
                                                    width='16'
                                                  >
                                                    <use fill='currentColor' href='#card'></use>
                                                  </svg>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='sc-b9tb4l-2 eEVvvY'>
                                        <div className='sc-15z5276-0 hSdDfN sc-b9tb4l-3 gKdmEn'>
                                          <div className='sc-15z5276-2 fAwaEU'>
                                            <div className='sc-1eaieo6-0 dEJdyt __MatchGamesBody'>
                                              <div className='sc-jrv2fx-0 fhEluS open' open=''>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>08.08.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>
                                                        Клубные товарищеские матчи
                                                      </span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <a
                                                      className='link sc-17qxh4e-8 fwbGnc'
                                                      href='/ru/soccer/m-08-08-2025-chelsea-bayer-leverkusen'
                                                    ></a>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Байер'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/424/5b1/ac20998721bd5643be5dd3a5e5ff2ff390.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/424/5b1/ac20998721bd5643be5dd3a5e5ff2ff390.png 1x, https://cdn.scores24.live/upload/team/w40-h40/424/5b1/ac20998721bd5643be5dd3a5e5ff2ff390.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Байер</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>7</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>7</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 byxdUl sc-17qxh4e-13 huCtwe'
                                                      type='lose'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>26.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>
                                                        Клубные товарищеские матчи
                                                      </span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Шолинг'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/62f/ddc/1fb1589ceab0ce12f57cceaf8c4a662c94.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/62f/ddc/1fb1589ceab0ce12f57cceaf8c4a662c94.png 1x, https://cdn.scores24.live/upload/team/w40-h40/62f/ddc/1fb1589ceab0ce12f57cceaf8c4a662c94.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Шолинг</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 byxdUl sc-1spz999-2 jcYBgi'
                                                          type='lose'
                                                        >
                                                          П
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>13.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>Клубный чемпионат мира</span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='ПСЖ'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/483/96e/e3400db1dd190a07890d8d442233ea24dc.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/483/96e/e3400db1dd190a07890d8d442233ea24dc.png 1x, https://cdn.scores24.live/upload/team/w40-h40/483/96e/e3400db1dd190a07890d8d442233ea24dc.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>ПСЖ</div>
                                                                <div
                                                                  className='sc-cn243d-0 kqAIXT sc-17qxh4e-15 icWxNy'
                                                                  color='red'
                                                                  data-testid='MatchCard'
                                                                >
                                                                  <svg
                                                                    className='sc-i341db-0 ixrffO'
                                                                    direction='right'
                                                                    height='16'
                                                                    width='16'
                                                                  >
                                                                    <use fill='currentColor' href='#card'></use>
                                                                  </svg>
                                                                  <div className='sc-cn243d-1 bxwJRz'>1</div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2.11</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0.52</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>15</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>12</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>3</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>3</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2.11</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0.52</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>15</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>12</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>08.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>Клубный чемпионат мира</span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Флуминенсе'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/48c/b2d/18ad08ac61e145c1902849382b6d268ea2.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/48c/b2d/18ad08ac61e145c1902849382b6d268ea2.png 1x, https://cdn.scores24.live/upload/team/w40-h40/48c/b2d/18ad08ac61e145c1902849382b6d268ea2.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Флуминенсе</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0.96</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1.58</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>11</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>11</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0.96</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1.58</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>11</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>11</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>05.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>Клубный чемпионат мира</span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Палмейрас'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/603/266/c5edf5d190fbeed12764e56b3b5b2094ba.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/603/266/c5edf5d190fbeed12764e56b3b5b2094ba.png 1x, https://cdn.scores24.live/upload/team/w40-h40/603/266/c5edf5d190fbeed12764e56b3b5b2094ba.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Палмейрас</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Челси'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Челси</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0.19</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1.11</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>10</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>14</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>16</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0.19</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1.11</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>10</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>14</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>16</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>3</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='sc-1eaieo6-0 dEJdyt __MatchGamesBody'>
                                              <div className='sc-jrv2fx-0 WmwaT notEntered'></div>
                                            </div>
                                          </div>
                                          <div className='sc-15z5276-1 jvqndO empty'>
                                            <div className='sc-15z5276-4 dKhvGV'>
                                              <svg
                                                className='sc-i341db-0 ixrffO sc-15z5276-5 fqHOwN'
                                                direction='right'
                                                height='90'
                                                width='90'
                                              >
                                                <use fill='currentColor' href='#empty-general'></use>
                                              </svg>
                                            </div>
                                            <div className='sc-15z5276-3 hpirry'>
                                              <div className='sc-15z5276-6 TysSf'>Матчей нет</div>
                                              <div className='sc-15z5276-7 krKqUg'>
                                                Добавьте интересующие вас матчи или подпишитесь на команду, турнир или
                                                игрока.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='sc-17eplpv-0 eAXAfg'>
                                      <button
                                        aria-label='Показать еще'
                                        className='sc-17eplpv-1 kqmojO sc-b9tb4l-4 jyQUOh'
                                        mode='show-more'
                                        type='button'
                                      >
                                        Показать еще
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='sc-1wwwqdz-0 kJixMC' data-testid='MatchPredictionBonuses'>
                            <div className='sc-958ogn-0 jXHTgF sc-1wwwqdz-1 giwBgw' data-testid='CommonDelimeter'></div>
                            <div className='sc-1wwwqdz-2 cdUfrl'>
                              <svg
                                className='sc-i341db-0 ixrffO sc-1wwwqdz-4 gWpdNt'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#gift'></use>
                              </svg>
                              <h2 className='sc-1wwwqdz-3 cljHfd'>Популярные бонусы</h2>
                            </div>
                            <div className='sc-1wwwqdz-5 eiMaMi'>
                              <div className='sc-1wwwqdz-6 ewBEO'>
                                <div className='sc-1wwwqdz-7 jqwhfH'>Букмекер</div>
                                <div className='sc-1wwwqdz-7 jqwhfH'>Бонус</div>
                                <div className='sc-1wwwqdz-7 jqwhfH'>Жми 👇</div>
                              </div>
                              <div className='sc-1wwwqdz-8 hJINxq'>
                                <div className='sc-1jiobxs-0 gvSzfs' data-testid='BonusRow'>
                                  <div className='sc-1jiobxs-1 faJEyV'>
                                    <div className='sc-18vea0p-1 idBVUT sc-1jiobxs-3 hdEjEp'>
                                      <img
                                        alt='Unibet'
                                        className='lazyload sc-18vea0p-0 jPtiYw'
                                        data-src='https://cdn.scores24.ru/upload/partners-s24/origin/972/f30/fba9298dbf8e04ab3d8377c819c9213bccunibet.svg'
                                        data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/972/f30/fba9298dbf8e04ab3d8377c819c9213bccunibet.svg'
                                        src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                      />
                                    </div>
                                  </div>
                                  <div className='sc-1jiobxs-1 faJEyV'>
                                    <div className='sc-1jiobxs-4 sc-1jiobxs-5 brdCVM icRnHr'>
                                      <span className='sc-1jiobxs-6 fjANi'>50</span>
                                      <span className='sc-1jiobxs-7 cVWNlK'>€</span>
                                    </div>
                                    <div className='sc-1jiobxs-4 brdCVM'>
                                      <span className='sc-1jiobxs-6 fjANi'>50</span>
                                      <span className='sc-1jiobxs-7 cVWNlK'>€</span>
                                    </div>
                                  </div>
                                  <a
                                    className='sc-ljbnji-0 iufpzM sc-1jiobxs-2 fCGXfH'
                                    data-capture=':Rr6kmf6h6h:'
                                    href='/dapi/v3/click/sYyWTbW9?position=table_bonus_prediction&amp;bkm=unibet&amp;lg=international-clubs-club-friendly-games&amp;mch=10-08-2025-chelsea-milan'
                                    rel='noopener nofollow'
                                    target='_blank'
                                  >
                                    Забрать
                                  </a>
                                </div>
                                <div className='sc-1jiobxs-0 gvSzfs' data-testid='BonusRow'>
                                  <div className='sc-1jiobxs-1 faJEyV'>
                                    <div className='sc-18vea0p-1 dqymWZ sc-1jiobxs-3 wyuWX'>
                                      <img
                                        alt='Бет 365'
                                        className='lazyload sc-18vea0p-0 jPtiYw'
                                        data-src='https://cdn.scores24.ru/upload/partners-s24/origin/99c/072/b19c64b85d2f79525a4cef9bff61845e61.jpeg'
                                        data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/99c/072/b19c64b85d2f79525a4cef9bff61845e61.jpeg'
                                        src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                      />
                                    </div>
                                  </div>
                                  <div className='sc-1jiobxs-1 faJEyV'>
                                    <div className='sc-1jiobxs-4 sc-1jiobxs-5 brdCVM icRnHr'>
                                      <span className='sc-1jiobxs-6 fjANi'>50</span>
                                      <span className='sc-1jiobxs-7 cVWNlK'>€</span>
                                    </div>
                                    <div className='sc-1jiobxs-4 brdCVM'>
                                      <span className='sc-1jiobxs-6 fjANi'>50</span>
                                      <span className='sc-1jiobxs-7 cVWNlK'>€</span>
                                    </div>
                                  </div>
                                  <a
                                    className='sc-ljbnji-0 iufpzM sc-1jiobxs-2 fCGXfH'
                                    data-capture=':Rt6kmf6h6h:'
                                    href='/dapi/v3/click/sYyWTbW9?position=table_bonus_prediction&amp;bkm=bet365&amp;lg=international-clubs-club-friendly-games&amp;mch=10-08-2025-chelsea-milan'
                                    rel='noopener nofollow'
                                    target='_blank'
                                  >
                                    Забрать
                                  </a>
                                </div>
                              </div>
                            </div>
                            <span className='sc-1i0wga8-0 kZildY sc-1wwwqdz-9 hDcyEO' color='gray'>
                              18+ Gamble Responsibly
                            </span>
                            <div className='sc-958ogn-0 jXHTgF sc-1wwwqdz-1 giwBgw' data-testid='CommonDelimeter'></div>
                          </div>

                          <div className='sc-494x2g-2 hSGGEC'>
                            <div className='sc-1gd34kg-0 iWHzDM'>
                              <div className='sc-1gd34kg-1 kcQuML'>
                                <span className='sc-11tt6ib-0 iQOaaC sc-1gd34kg-6 ehwfCy' size='60'>
                                  <img
                                    className='lazyload sc-11tt6ib-2 mzpSx'
                                    data-src='https://cdn.scores24.live/upload/team/w60-h60/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                    data-srcset='https://cdn.scores24.live/upload/team/w60-h60/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w120-h120/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                    src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                  />
                                </span>
                                <h2 className='sc-1gd34kg-2 cNYWKh'>
                                  Милан<span className='sc-1gd34kg-4 bLsdd'> Обзор команды</span>
                                </h2>
                              </div>
                              <div className='sc-494x2g-0 sc-1gd34kg-5 gvBCgg hhWnfd'>
                                <p>
                                  Нынешние гости провели свой последний официальный матч 9 августа 2025 в рамках турнира
                                  Клубные товарищеские матчи (хозяева поля – Лидс, гости – Милан). Встреча завершилась
                                  со счётом 1:1.{' '}
                                </p>
                                <p>Статистика игры следующая (Милан vs Лидс):</p>
                                <ul>
                                  <li>процент владения мячом: 36% vs 64%;</li>
                                  <li>угловые удары: 5 vs 6;</li>
                                  <li>жёлтые карточки: 0 vs 1;</li>
                                  <li>удары в створ ворот: 3 vs 3.</li>
                                </ul>
                                <p>
                                  Команде Милан повезло меньше, ведь предстоящий товарищеский матч она проведёт на
                                  выезде. Чем может похвастаться состав по результатам последних 10 официальных игр?
                                </p>
                                <p>
                                  На данном отрезке коллектив одержал 6 побед, потерпел 3 поражения, а также 1 раз
                                  сыграл вничью. Результатом атакующих действий игроков является 19 голов, что в среднем
                                  составляет 1.9 за матч (на выезде показатель равен 2). Разумеется, в обороне команды
                                  не обошлось без ошибок. Среднее значение пропущенных мячей за игру равно 0.9.
                                </p>
                                <p></p>
                              </div>
                              <div className='sc-1gd34kg-7 eGDoMz'>
                                <div className='sc-85qh4y-0 jcnSTJ'>
                                  <div className='sc-ou8qdt-0 kIFtjI'>
                                    <h3 className='sc-4y75cf-0 fAPWyp sc-ou8qdt-1 eIHCZe' data-testid='Headline'>
                                      Результаты матчей: Милан
                                    </h3>
                                    <div className='sc-ou8qdt-2 igXPEY'>
                                      <div className='sc-1t0r7hb-0 llvRLu'>
                                        <button
                                          className='sc-2dzn45-6 cVLSuC sc-13b4qwh-1 sc-ou8qdt-3 ikRGnq'
                                          data-testid='Chip'
                                        >
                                          <div className='sc-2dzn45-1 ixyoiX'></div>
                                          <div className='sc-2dzn45-4 kVkqIr'>Все турниры </div>
                                          <div className='sc-2dzn45-2 bWbFCd'>
                                            <svg
                                              className='sc-i341db-0 ixrffO sc-13b4qwh-0 kYKqgr'
                                              direction='right'
                                              height='16'
                                              width='16'
                                            >
                                              <use fill='currentColor' href='#arrow-chevron'></use>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                      <div className='sc-1t0r7hb-0 llvRLu'>
                                        <button className='sc-2dzn45-6 cVLSuC sc-13b4qwh-1' data-testid='Chip'>
                                          <div className='sc-2dzn45-1 ixyoiX'></div>
                                          <div className='sc-2dzn45-4 kVkqIr'>Все матчи </div>
                                          <div className='sc-2dzn45-2 bWbFCd'>
                                            <svg
                                              className='sc-i341db-0 ixrffO sc-13b4qwh-0 kYKqgr'
                                              direction='right'
                                              height='16'
                                              width='16'
                                            >
                                              <use fill='currentColor' href='#arrow-chevron'></use>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='sc-b9tb4l-0 irdcwi'>
                                    <div>
                                      <div className='sc-wzh2yo-0 kgmgDt' data-testid='StickyHeader'>
                                        <div className='sc-30rb2b-2 hSCXdH' data-testid='MatchGenericHeader'>
                                          <div className='sc-30rb2b-0 iiAsXC'>
                                            <div className='sc-30rb2b-3 jLyKab'>Последние матчи</div>
                                          </div>
                                          <div className='sc-30rb2b-1 eRlrOB'>
                                            <div
                                              className='sc-l3bgdv-0 cUdwHj'
                                              data-testid='MatchGenericStatisticsHeader'
                                            >
                                              <div className='sc-l3bgdv-1 jkvlCM'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='20'
                                                  width='15'
                                                >
                                                  <use fill='currentColor' href='#xg-icon'></use>
                                                </svg>
                                              </div>
                                              <div className='sc-l3bgdv-1 jkvlDW'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='16'
                                                  width='16'
                                                >
                                                  <use fill='currentColor' href='#corner-kicks-received'></use>
                                                </svg>
                                              </div>
                                              <div className='sc-l3bgdv-1 jkvlDW'>
                                                <svg
                                                  className='sc-i341db-0 ixrffO'
                                                  direction='right'
                                                  height='16'
                                                  width='16'
                                                >
                                                  <use fill='currentColor' href='#faults'></use>
                                                </svg>
                                              </div>
                                              <div className='sc-l3bgdv-1 jkvlDW'>
                                                <div
                                                  className='sc-cn243d-0 bzKxcj'
                                                  color='yellow'
                                                  data-testid='MatchCard'
                                                >
                                                  <svg
                                                    className='sc-i341db-0 ixrffO'
                                                    direction='right'
                                                    height='16'
                                                    width='16'
                                                  >
                                                    <use fill='currentColor' href='#card'></use>
                                                  </svg>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='sc-b9tb4l-2 eEVvvY'>
                                        <div className='sc-15z5276-0 hSdDfN sc-b9tb4l-3 gKdmEn'>
                                          <div className='sc-15z5276-2 fAwaEU'>
                                            <div className='sc-1eaieo6-0 dEJdyt __MatchGamesBody'>
                                              <div className='sc-jrv2fx-0 fhEluS open' open=''>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 dKDKyE sc-17qxh4e-13 huCtwe'
                                                      type='draw'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>09.08.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>
                                                        Клубные товарищеские матчи
                                                      </span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <a
                                                      className='link sc-17qxh4e-8 fwbGnc'
                                                      href='/ru/soccer/m-09-08-2025-leeds-united-milan'
                                                    ></a>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Лидс'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/90c/dae/9cdd458d233ab7d3e76208415be4037e1d.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/90c/dae/9cdd458d233ab7d3e76208415be4037e1d.png 1x, https://cdn.scores24.live/upload/team/w40-h40/90c/dae/9cdd458d233ab7d3e76208415be4037e1d.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Лидс</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Милан</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>6</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>6</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 dKDKyE sc-1spz999-2 jcYBgi'
                                                          type='draw'
                                                        >
                                                          Н
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>31.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>
                                                        Клубные товарищеские матчи
                                                      </span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Перт Глори'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/116/60a/d22eff38a1a619fda4a69d1d045d0b07d0.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/116/60a/d22eff38a1a619fda4a69d1d045d0b07d0.png 1x, https://cdn.scores24.live/upload/team/w40-h40/116/60a/d22eff38a1a619fda4a69d1d045d0b07d0.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Перт Глори</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Милан</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0.47</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4.71</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>9</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>5</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>4</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0.47</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4.71</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>5</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>26.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>
                                                        Клубные товарищеские матчи
                                                      </span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Ливерпуль'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/41f/ded/77e924b65229051ee72dc7ff3a9b166ef6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/41f/ded/77e924b65229051ee72dc7ff3a9b166ef6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/41f/ded/77e924b65229051ee72dc7ff3a9b166ef6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Ливерпуль</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Милан</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>2</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>4</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>3</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>23.07.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>
                                                        Клубные товарищеские матчи
                                                      </span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Арсенал'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/1de/823/838ab4d32ab22622c6c129053bd7c16dbb.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/1de/823/838ab4d32ab22622c6c129053bd7c16dbb.png 1x, https://cdn.scores24.live/upload/team/w40-h40/1de/823/838ab4d32ab22622c6c129053bd7c16dbb.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Арсенал</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Милан</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>14</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>1</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>1</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-4whuex-2 gxLBKF'></div>
                                                          <div className='sc-pvs6fr-0 jGdtXn'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>5</div>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>6</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>14</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>2</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>-</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='sc-17qxh4e-0 dHxDFU'>
                                                  <div className='sc-17qxh4e-1 iLRgmV'>
                                                    <div
                                                      className='sc-vn72qa-0 wcbRr sc-17qxh4e-12 hhOtWx'
                                                      data-testid='MatchGenericSubscribe'
                                                    ></div>
                                                    <span
                                                      className='sc-1hthis6-0 bZQzlG sc-17qxh4e-13 huCtwe'
                                                      type='win'
                                                    ></span>
                                                    <div className='sc-5hj7ft-0 dDFJAN' data-testid='MatchGenericInfo'>
                                                      <div className='sc-oh2bsf-0 fUZLA'>
                                                        <span>24.05.25</span>
                                                      </div>
                                                      <div className='sc-5hj7ft-1 eYrqTP'></div>
                                                      <span className='sc-5hj7ft-3 eKJwvm'>Серия А</span>
                                                      <div className='sc-p2ps84-0 hfixrZ sc-5hj7ft-5 jynVzi'>
                                                        <div
                                                          className='sc-vn72qa-0 wcbRr'
                                                          data-testid='MatchGenericSubscribe'
                                                        ></div>
                                                      </div>
                                                    </div>
                                                    <span className='link sc-17qxh4e-8 fwbGnc pointer'></span>
                                                    <div className='sc-17qxh4e-3 dSsigE'>
                                                      <div className='sc-17qxh4e-4 kWBSIF'>
                                                        <div className='sc-17qxh4e-9 kNTalG'>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Милан'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 esbhnW'>Милан</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className='sc-17qxh4e-5 iUfAma'>
                                                            <div className='sc-17qxh4e-6 jncOYI'>
                                                              <span
                                                                className='sc-11tt6ib-0 eAPQXi sc-17qxh4e-7 ewpDUQ'
                                                                size='18'
                                                              >
                                                                <img
                                                                  alt='Монца'
                                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/066/a8f/8cf7b7a20002abe900f0e5b532e5db99ca.png'
                                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/066/a8f/8cf7b7a20002abe900f0e5b532e5db99ca.png 1x, https://cdn.scores24.live/upload/team/w40-h40/066/a8f/8cf7b7a20002abe900f0e5b532e5db99ca.png 2x'
                                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                                />
                                                              </span>
                                                              <div className='sc-17qxh4e-11 bAavID'>
                                                                <div className='sc-17qxh4e-10 iztCrh'>Монца</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-17qxh4e-2 cuPJkr'>
                                                          <div
                                                            className='sc-cmtokc-0 deICTO'
                                                            data-testid='MatchGenericStatistics'
                                                          >
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1.99</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0.52</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>6</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>8</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>9</div>
                                                            </div>
                                                            <div className='sc-cmtokc-2 jOqilS'></div>
                                                            <div className='sc-cmtokc-1 eYHyrO'>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                              <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className='sc-4g7sie-0 gMBPyP'>
                                                          <div className='sc-pvs6fr-0 cguIVO sc-4whuex-1 kdcjrx'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                          <div className='sc-pvs6fr-0 iqhToT'>
                                                            <div className='sc-pvs6fr-1 hdZfIn'>2</div>
                                                            <div className='sc-pvs6fr-1 bAhpay'>0</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='sc-17qxh4e-2 cuPJkr'>
                                                        <div
                                                          className='sc-cmtokc-0 deICTO'
                                                          data-testid='MatchGenericStatistics'
                                                        >
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1.99</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0.52</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>4</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>6</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>8</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>9</div>
                                                          </div>
                                                          <div className='sc-cmtokc-2 jOqilS'></div>
                                                          <div className='sc-cmtokc-1 eYHyrO'>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>0</div>
                                                            <div className='sc-cmtokc-3 jkOIJJ'>1</div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className='sc-1spz999-0 bvWwSG'
                                                        data-testid='MatchGenericActions'
                                                      >
                                                        <span
                                                          className='sc-1hthis6-0 bZQzlG sc-1spz999-2 jcYBgi'
                                                          type='win'
                                                        >
                                                          В
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='sc-1eaieo6-0 dEJdyt __MatchGamesBody'>
                                              <div className='sc-jrv2fx-0 WmwaT notEntered'></div>
                                            </div>
                                          </div>
                                          <div className='sc-15z5276-1 jvqndO empty'>
                                            <div className='sc-15z5276-4 dKhvGV'>
                                              <svg
                                                className='sc-i341db-0 ixrffO sc-15z5276-5 fqHOwN'
                                                direction='right'
                                                height='90'
                                                width='90'
                                              >
                                                <use fill='currentColor' href='#empty-general'></use>
                                              </svg>
                                            </div>
                                            <div className='sc-15z5276-3 hpirry'>
                                              <div className='sc-15z5276-6 TysSf'>Матчей нет</div>
                                              <div className='sc-15z5276-7 krKqUg'>
                                                Добавьте интересующие вас матчи или подпишитесь на команду, турнир или
                                                игрока.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='sc-17eplpv-0 eAXAfg'>
                                      <button
                                        aria-label='Показать еще'
                                        className='sc-17eplpv-1 kqmojO sc-b9tb4l-4 jyQUOh'
                                        mode='show-more'
                                        type='button'
                                      >
                                        Показать еще
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className='heading'>Прогноз на исход</h2>{' '}
                            <p>
                              <i>Очные матчи:</i>
                            </p>
                            <ul>
                              <li>количество противостояний – 4;</li>
                              <li>победы у хозяев поля – 4, у гостей – 0, ничьих – 0.</li>
                            </ul>
                            <div>
                              <i>Тренды</i>
                            </div>
                            <ul>
                              <li>Милан не проигрывает в 8 из 9 последних матчей (Клубные товарищеские матчи).</li>
                            </ul>
                            <div> =IПрогноз: Милан не проиграет(коэффициент: 1.95)</div>
                            <h2 className='heading'>Прогноз на тотал</h2> <p>Очные матчи</p>
                            <ul>
                              <li>хозяева поля в среднем забивают - 2.5, гости - 0.25;</li>
                              <li>средний тотал голов в очных матчах - 2.75;</li>
                              <li>обе команды забивали: за всё время - 1 раз; на поле домашней команды - 0 раз.</li>
                            </ul>
                            <div>
                              <i>Тренды</i>
                            </div>
                            <ul>
                              <li>
                                Тотал меньше 3.5 голов сыграл в 5 матчах команды Челси подряд (Клубные товарищеские
                                матчи).
                              </li>
                            </ul>
                            <div> =IПрогноз: Тотал голов меньше (3.5)(коэффициент: 1.74)</div>
                            <h2 className='heading'>Прогноз на угловые</h2>
                            <div>
                              <i>Тренды</i>
                            </div>
                            <ul>
                              <li>
                                Тотал меньше 9.5 угловых сыграл в 6 из 7 последних выездных матчей команды Милан
                                (Клубные товарищеские матчи).
                              </li>
                            </ul>
                            <div> =IПрогноз: Угловые - Тотал меньше (9.5)(коэффициент: 1.8)</div>
                            <h2 className='heading'>Прогноз на карточки</h2>{' '}
                            <p>
                              <i>Очные матчи</i>
                            </p>
                            <ul>
                              <li>
                                средний тотал желтых карточек в очных матчах - 3 (1.5 - у хозяев поля и 1.5 - у гостей);
                              </li>
                              <li>
                                средний тотал желтых карточек на поле хозяев - 5 (2 - у хозяев поля и 3 - у гостей).
                              </li>
                            </ul>
                            <div> =IПрогноз: Желтые карточки - Тотал меньше (3.5)</div>
                            <h2 className='heading'>Прогноз на обе забьют</h2>{' '}
                            <p>
                              <i>Очные матчи:</i>
                            </p>
                            <ul>
                              <li>количество противостояний – 4;</li>
                              <li>обе команды забивали за всё время - 1 раз;</li>
                              <li>на поле домашней команды - 0 раз.</li>
                            </ul>
                            <div> =IПрогноз: Обе забьют (Нет)(коэффициент: 2.63)</div>
                          </div>
                          <div>
                            <p></p>
                          </div>
                        </div>
                      </div>

                      <div className='sc-10cwpmp-0 cVXUI'>
                        <img
                          className='sc-10cwpmp-1 fupXhF lazyload'
                          data-src='https://cdn.scores24.live/upload/scores24/dist/assets/bg-3d16e7f3.png'
                          data-srcset='https://cdn.scores24.live/upload/scores24/dist/assets/bg-3d16e7f3.png'
                          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                        />
                        <div className='sc-10cwpmp-2 dCrCCi'>Наш выбор</div>
                        <div className='sc-10cwpmp-3 cVvIGt'>
                          <div className='sc-10cwpmp-5 hvjWKr'>
                            <div className='sc-10cwpmp-6 gLatNg'>
                              <span>Тотал голов больше (3.5)</span> с кэфом <span className='value'>2.1*</span>
                            </div>
                          </div>
                          <div className='sc-10cwpmp-4 erEdfP'>
                            *Коэффициент актуален на момент публикации прогноза (8 августа 2025, 14:24)
                          </div>
                        </div>
                      </div>

                      <div className='sc-3xainz-0 ejfsOT'>
                        <div className='sc-3xainz-2 dAzuou'>
                          <div className='sc-3xainz-3 cmgcDL'>
                            <div className='sc-111vqmd-0 fiNJGr sc-3xainz-1 bYJTwT'>
                              <div className='sc-111vqmd-1 huPwvB'>
                                <div className='sc-111vqmd-2 dRkomU'>
                                  <h2 className='sc-4y75cf-0 hoRCwP sc-111vqmd-5 grXjBn' data-testid='Headline'>
                                    Этот прогноз зайдёт?
                                  </h2>
                                </div>
                              </div>
                            </div>
                            <div className='sc-3xainz-5 jyuQdH'>
                              <button
                                aria-label='YesButton'
                                className='sc-jvwc7y-4 sc-jvwc7y-5 cmfzay dTeXrV sc-jvwc7y-4 jvVchS sc-3xainz-6 YdnMw'
                                type='button'
                              >
                                <svg
                                  className='sc-i341db-0 ixrffO sc-jvwc7y-1 gqBSzk'
                                  direction='right'
                                  height='20'
                                  width='20'
                                >
                                  <use fill='currentColor' href='#finger-up'></use>
                                </svg>
                                <span className='sc-jvwc7y-3 hdwUJe'>Да</span>
                              </button>
                              <button
                                aria-label='NoButton'
                                className='sc-jvwc7y-4 sc-jvwc7y-6 cmfzay eODfWO sc-jvwc7y-4 jvVchS sc-3xainz-6 eDUInR'
                                type='button'
                              >
                                <svg
                                  className='sc-i341db-0 ixrffO sc-jvwc7y-1 gqBSzk'
                                  direction='right'
                                  height='20'
                                  width='20'
                                >
                                  <use fill='currentColor' href='#finger-down'></use>
                                </svg>
                                <span className='sc-jvwc7y-3 hdwUJe'>Нет</span>
                              </button>
                            </div>
                            <div className='sc-3xainz-4 jzeefU'>Всего проголосовало: 0</div>
                          </div>
                        </div>
                      </div>

                      <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>
                      <div className='sc-2cxzjp-0 cfqqTg' data-anchor='trends' data-testid='PageAnchorContainer'>
                        <div className='sc-1x89i8t-0 bTaOmI'>
                          <div className='sc-111vqmd-0 fiNJGr sc-1x89i8t-1 emWSaU'>
                            <div className='sc-111vqmd-1 huPwvB'>
                              <div className='sc-111vqmd-2 dRkomU'>
                                <h2 className='sc-4y75cf-0 hoRCwP sc-111vqmd-5 grXjBn' data-testid='Headline'>
                                  Челси - Милан прогнозы по статистике
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className='sc-1qook4i-4 yrJen' data-testid='trendCard'>
                            <div className='sc-1qook4i-2 iYtyoa'>
                              <div className='sc-og57cc-10 emIpKv' data-testid='MatchCardWithTrendsMarket'>
                                <button className='sc-og57cc-0 iiOXcW'>
                                  <div className='sc-og57cc-1 kiVdxT'>
                                    <div className='sc-og57cc-2 dRVDA'>Прогнозы на Двойной исход</div>
                                    <span>(1)</span>
                                  </div>
                                  <div className='sc-og57cc-4 eJKsmP'>
                                    <div className='sc-og57cc-3 vaEqd'>
                                      <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                        <img
                                          className='lazyload sc-11tt6ib-2 mzpSx'
                                          data-src='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                          data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                        />
                                      </span>
                                    </div>
                                    <div className='sc-og57cc-5 clOpzx'>1.91</div>
                                  </div>
                                  <div className='sc-og57cc-6 hNWKUS'>
                                    <svg
                                      className='sc-i341db-0 ixrffO sc-og57cc-7 JAIQM'
                                      direction='right'
                                      height='20'
                                      width='20'
                                    >
                                      <use fill='currentColor' href='#arrow-chevron-small'></use>
                                    </svg>
                                  </div>
                                </button>
                                <div className='sc-jrv2fx-0 fhEluS open' open=''>
                                  <div className='sc-og57cc-8 hpvWlg'>
                                    <div className='sc-13dfxab-0 gyREyU'>
                                      <div className='sc-gwfubx-0 cQQCqy' data-testid='TrendContent'>
                                        <div className='sc-gwfubx-1 eYwIWJ'>
                                          <div className='sc-gwfubx-2 gcuecJ'>Милан не проигрывает:</div>
                                          <div className='sc-gwfubx-3 eIvUra'>
                                            <div className='sc-gwfubx-4 btvJKL'>
                                              <span className='sc-11tt6ib-0 iQnnmC sc-gwfubx-5 hbEEtl' size='20'>
                                                <img
                                                  alt='ac-milan-2'
                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                />
                                              </span>
                                              <span className='sc-gwfubx-6 iQDcbZ'>
                                                в <span className='digit'>8 </span>из <span className='digit'>9 </span>
                                                последних матчей (Клубные товарищеские матчи).
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span className='sc-ljbnji-0 iufpzM sc-13dfxab-2 yGjVC'>
                                        <a
                                          className='sc-13dfxab-3 erpqpa'
                                          href='/dapi/v3/click/sYyWTbW9?position=trends&amp;bkm=bet365&amp;lg=international-clubs-club-friendly-games&amp;mch=10-08-2025-chelsea-milan'
                                          target='_blank'
                                        ></a>
                                        <div className='sc-13dfxab-1 kozYiF'>
                                          <div className='sc-13dfxab-4 lnuejF'>
                                            <span className='sc-7nq6jv-0 ilPlEz'>Милан не проиграет</span>
                                          </div>
                                        </div>
                                        <div className='sc-31r1g9-0 bwklvq' data-testid='PredictionValueButton'>
                                          <div className='sc-31r1g9-3 gyCHJE' data-testid='PredictionValueButtonLogo'>
                                            <img
                                              alt='Бет 365'
                                              className='sc-31r1g9-4 guucqz lazyload'
                                              data-src='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                              style={{ objectFit: 'contain' }}
                                            />
                                          </div>
                                          <div className='sc-31r1g9-1 fkPJDI'>
                                            <div
                                              className='sc-31r1g9-2 kGYzNO'
                                              data-testid='PredictionValueButtonValue'
                                            >
                                              1.91
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='sc-og57cc-10 gkDBDD' data-testid='MatchCardWithTrendsMarket'>
                                <button className='sc-og57cc-0 iiOXcW'>
                                  <div className='sc-og57cc-1 kiVdxT'>
                                    <div className='sc-og57cc-2 dRVDA'>Прогнозы на Тотал</div>
                                    <span>(4)</span>
                                  </div>
                                  <div className='sc-og57cc-4 eJKsmP'>
                                    <div className='sc-og57cc-3 vaEqd'>
                                      <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                        <img
                                          className='lazyload sc-11tt6ib-2 mzpSx'
                                          data-src='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                          data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                        />
                                      </span>
                                    </div>
                                    <div className='sc-og57cc-5 clOpzx'>1.11 - 1.73 </div>
                                  </div>
                                  <div className='sc-og57cc-6 hNWKUS'>
                                    <svg
                                      className='sc-i341db-0 ixrffO sc-og57cc-7 JAIQM'
                                      direction='right'
                                      height='20'
                                      width='20'
                                    >
                                      <use fill='currentColor' href='#arrow-chevron-small'></use>
                                    </svg>
                                  </div>
                                </button>
                                <div className='sc-jrv2fx-0 WmwaT notEntered'>
                                  <div className='sc-og57cc-8 hpvWlg'>
                                    <div className='sc-13dfxab-0 gyREyU'>
                                      <div className='sc-gwfubx-0 cQQCqy' data-testid='TrendContent'>
                                        <div className='sc-gwfubx-1 eYwIWJ'>
                                          <div className='sc-gwfubx-2 gcuecJ'>Милан забивает:</div>
                                          <div className='sc-gwfubx-3 eIvUra'>
                                            <div className='sc-gwfubx-4 btvJKL'>
                                              <span className='sc-11tt6ib-0 iQnnmC sc-gwfubx-5 hbEEtl' size='20'>
                                                <img
                                                  alt='ac-milan-2'
                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                />
                                              </span>
                                              <span className='sc-gwfubx-6 iQDcbZ'>
                                                в <span className='digit'>11 </span>из{' '}
                                                <span className='digit'>12 </span>
                                                последних матчей (Клубные товарищеские матчи).
                                              </span>
                                            </div>
                                            <div className='sc-gwfubx-4 btvJKL'>
                                              <span className='sc-11tt6ib-0 iQnnmC sc-gwfubx-5 hbEEtl' size='20'>
                                                <img
                                                  alt='ac-milan-2'
                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png'
                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/384/5c6/e42c6fa090d38dae66b42187f7f5b1ced6.png 2x'
                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                />
                                              </span>
                                              <span className='sc-gwfubx-6 iQDcbZ'>
                                                на выезде в <span className='digit'>7 </span>из{' '}
                                                <span className='digit'>8 </span>последних матчей (Клубные товарищеские
                                                матчи).
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span className='sc-ljbnji-0 iufpzM sc-13dfxab-2 yGjVC'>
                                        <a
                                          className='sc-13dfxab-3 erpqpa'
                                          href='/dapi/v3/click/sYyWTbW9?position=trends&amp;bkm=bet365&amp;lg=international-clubs-club-friendly-games&amp;mch=10-08-2025-chelsea-milan'
                                          target='_blank'
                                        ></a>
                                        <div className='sc-13dfxab-1 kozYiF'>
                                          <div className='sc-13dfxab-4 lnuejF'>
                                            <span className='sc-7nq6jv-0 ilPlEz'>Милан забьет гол</span>
                                          </div>
                                        </div>
                                        <div className='sc-31r1g9-0 bwklvq' data-testid='PredictionValueButton'>
                                          <div className='sc-31r1g9-3 gyCHJE' data-testid='PredictionValueButtonLogo'>
                                            <img
                                              alt='Бет 365'
                                              className='sc-31r1g9-4 guucqz lazyload'
                                              data-src='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                              style={{ objectFit: 'contain' }}
                                            />
                                          </div>
                                          <div className='sc-31r1g9-1 fkPJDI'>
                                            <div
                                              className='sc-31r1g9-2 kGYzNO'
                                              data-testid='PredictionValueButtonValue'
                                            >
                                              1.29
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className='sc-13dfxab-0 gyREyU'>
                                      <div className='sc-gwfubx-0 cQQCqy' data-testid='TrendContent'>
                                        <div className='sc-gwfubx-1 eYwIWJ'>
                                          <div className='sc-gwfubx-2 gcuecJ'>Челси забивает:</div>
                                          <div className='sc-gwfubx-3 eIvUra'>
                                            <div className='sc-gwfubx-4 btvJKL'>
                                              <span className='sc-11tt6ib-0 iQnnmC sc-gwfubx-5 hbEEtl' size='20'>
                                                <img
                                                  alt='chelsea-fc'
                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                />
                                              </span>
                                              <span className='sc-gwfubx-6 iQDcbZ'>
                                                в <span className='digit'>10 </span>из{' '}
                                                <span className='digit'>11 </span>
                                                последних матчей (Клубные товарищеские матчи).
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span className='sc-ljbnji-0 iufpzM sc-13dfxab-2 yGjVC'>
                                        <a
                                          className='sc-13dfxab-3 erpqpa'
                                          href='/dapi/v3/click/sYyWTbW9?position=trends&amp;bkm=bet365&amp;lg=international-clubs-club-friendly-games&amp;mch=10-08-2025-chelsea-milan'
                                          target='_blank'
                                        ></a>
                                        <div className='sc-13dfxab-1 kozYiF'>
                                          <div className='sc-13dfxab-4 lnuejF'>
                                            <span className='sc-7nq6jv-0 ilPlEz'>Челси забьет гол</span>
                                          </div>
                                        </div>
                                        <div className='sc-31r1g9-0 bwklvq' data-testid='PredictionValueButton'>
                                          <div className='sc-31r1g9-3 gyCHJE' data-testid='PredictionValueButtonLogo'>
                                            <img
                                              alt='Бет 365'
                                              className='sc-31r1g9-4 guucqz lazyload'
                                              data-src='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                              style={{ objectFit: 'contain' }}
                                            />
                                          </div>
                                          <div className='sc-31r1g9-1 fkPJDI'>
                                            <div
                                              className='sc-31r1g9-2 kGYzNO'
                                              data-testid='PredictionValueButtonValue'
                                            >
                                              1.11
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                    <div className='sc-13dfxab-0 gyREyU'>
                                      <div className='sc-gwfubx-0 cQQCqy' data-testid='TrendContent'>
                                        <div className='sc-gwfubx-1 eYwIWJ'>
                                          <div className='sc-gwfubx-2 gcuecJ'>Челси забивает меньше 2.5 мячей:</div>
                                          <div className='sc-gwfubx-3 eIvUra'>
                                            <div className='sc-gwfubx-4 btvJKL'>
                                              <span className='sc-11tt6ib-0 iQnnmC sc-gwfubx-5 hbEEtl' size='20'>
                                                <img
                                                  alt='chelsea-fc'
                                                  className='lazyload sc-11tt6ib-2 mzpSx'
                                                  data-src='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png'
                                                  data-srcset='https://cdn.scores24.live/upload/team/w20-h20/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 1x, https://cdn.scores24.live/upload/team/w40-h40/621/2e4/ae04abc5c947467e81e702ff0c7682b709.png 2x'
                                                  src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                                />
                                              </span>
                                              <span className='sc-gwfubx-6 iQDcbZ'>
                                                в <span className='digit'>9 </span>из <span className='digit'>10 </span>
                                                последних матчей (Клубные товарищеские матчи).
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span className='sc-ljbnji-0 iufpzM sc-13dfxab-2 yGjVC'>
                                        <a
                                          className='sc-13dfxab-3 erpqpa'
                                          href='/dapi/v3/click/sYyWTbW9?position=trends&amp;bkm=bet365&amp;lg=international-clubs-club-friendly-games&amp;mch=10-08-2025-chelsea-milan'
                                          target='_blank'
                                        ></a>
                                        <div className='sc-13dfxab-1 kozYiF'>
                                          <div className='sc-13dfxab-4 lnuejF'>
                                            <span className='sc-7nq6jv-0 ilPlEz'>Челси Тотал голов меньше (2.5)</span>
                                          </div>
                                        </div>
                                        <div className='sc-31r1g9-0 bwklvq' data-testid='PredictionValueButton'>
                                          <div className='sc-31r1g9-3 gyCHJE' data-testid='PredictionValueButtonLogo'>
                                            <img
                                              alt='Бет 365'
                                              className='sc-31r1g9-4 guucqz lazyload'
                                              data-src='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              data-srcset='https://cdn.scores24.ru/upload/partners-s24/origin/2b5/0ac/122042bd5b79eb2e966262b7a5c08d37bfbet365 fav.svg'
                                              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                              style={{ objectFit: 'contain' }}
                                            />
                                          </div>
                                          <div className='sc-31r1g9-1 fkPJDI'>
                                            <div
                                              className='sc-31r1g9-2 kGYzNO'
                                              data-testid='PredictionValueButtonValue'
                                            >
                                              1.44
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a className='link sc-1qook4i-3 bWIqnx' href='/ru/soccer/m-10-08-2025-chelsea-milan#trends'>
                              Все факты о соперниках
                              <svg className='sc-i341db-0 ixrffO' direction='right' height='16' width='16'>
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>

                      <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>

                      <div className='sc-958ogn-0 jXHTgF' data-testid='CommonDelimeter'></div>

                      <div className='sc-958ogn-0 bsLROc' data-testid='CommonDelimeter'></div>

                      <div className='sc-958ogn-0 bsLROc' data-testid='CommonDelimeter'></div>

                      <div className='sc-utrs6s-0 cLBJko'>
                        <div className='sc-111vqmd-0 fiNJGr sc-utrs6s-1 EWTjA'>
                          <div className='sc-111vqmd-1 huPwvB'>
                            <div className='sc-111vqmd-2 dRkomU'>
                              <h2 className='sc-4y75cf-0 hoRCwP sc-111vqmd-5 grXjBn' data-testid='Headline'>
                                Другие прогнозы на Футбол
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className='sc-utrs6s-2 jZSvNz'>
                          <a
                            className='link sc-tcl2eq-0 gyKrf'
                            href='/ru/soccer/m-10-08-2025-hibernian-w-durham-lfc-w--prediction'
                          >
                            <div className='sc-tcl2eq-1 ghAAbO'>Клубные товарищеские матчи</div>
                            <div className='sc-tcl2eq-2 jEsSw'>
                              <div className='sc-tcl2eq-3 nBiAX'>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Дарем (Ж)'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/6f1/820/6ae906982b3ec1e6d151694853a1b193ed.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/6f1/820/6ae906982b3ec1e6d151694853a1b193ed.png 1x, https://cdn.scores24.live/upload/team/w40-h40/6f1/820/6ae906982b3ec1e6d151694853a1b193ed.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Дарем (Ж)</div>
                                </div>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Хиберниан (Ж)'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/626/ac0/f4a906edfe4a8366755dd5c9b2edb368ce.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/626/ac0/f4a906edfe4a8366755dd5c9b2edb368ce.png 1x, https://cdn.scores24.live/upload/team/w40-h40/626/ac0/f4a906edfe4a8366755dd5c9b2edb368ce.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Хиберниан (Ж)</div>
                                </div>
                              </div>
                              <div className='sc-tcl2eq-4 fiMOII'>
                                <div className='sc-tcl2eq-5 vQgxT'>
                                  <span>10 авг</span>
                                </div>
                                <div className='sc-tcl2eq-6 ZfplR'>
                                  <span>12:00</span>
                                </div>
                              </div>
                            </div>
                            <div className='sc-tcl2eq-9 hMoSig'>
                              Подробнее
                              <svg
                                className='sc-i341db-0 ixrffO sc-tcl2eq-10 irTYkU'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </div>
                          </a>
                          <a
                            className='link sc-tcl2eq-0 gyKrf'
                            href='/ru/soccer/m-10-08-2025-atalanta-nk-opatija-prediction'
                          >
                            <div className='sc-tcl2eq-1 ghAAbO'>Клубные товарищеские матчи</div>
                            <div className='sc-tcl2eq-2 jEsSw'>
                              <div className='sc-tcl2eq-3 nBiAX'>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Аталанта'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/ef8/3e3/a5b6734c1a1339ca80f017112cf24e0757.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/ef8/3e3/a5b6734c1a1339ca80f017112cf24e0757.png 1x, https://cdn.scores24.live/upload/team/w40-h40/ef8/3e3/a5b6734c1a1339ca80f017112cf24e0757.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Аталанта</div>
                                </div>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Опатия'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/bab/755/9a83063f29e6cd39870dd5fa9927451a77.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/bab/755/9a83063f29e6cd39870dd5fa9927451a77.png 1x, https://cdn.scores24.live/upload/team/w40-h40/bab/755/9a83063f29e6cd39870dd5fa9927451a77.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Опатия</div>
                                </div>
                              </div>
                              <div className='sc-tcl2eq-4 fiMOII'>
                                <div className='sc-tcl2eq-5 vQgxT'>
                                  <span>10 авг</span>
                                </div>
                                <div className='sc-tcl2eq-6 ZfplR'>
                                  <span>08:30</span>
                                </div>
                              </div>
                            </div>
                            <div className='sc-tcl2eq-9 hMoSig'>
                              Подробнее
                              <svg
                                className='sc-i341db-0 ixrffO sc-tcl2eq-10 irTYkU'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </div>
                          </a>
                          <a
                            className='link sc-tcl2eq-0 gyKrf'
                            href='/ru/soccer/m-10-08-2025-napoli-as-sorrento-calcio-prediction'
                          >
                            <div className='sc-tcl2eq-1 ghAAbO'>Клубные товарищеские матчи</div>
                            <div className='sc-tcl2eq-2 jEsSw'>
                              <div className='sc-tcl2eq-3 nBiAX'>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Наполи'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/377/8f4/6c1f931258a2a93e1c0777c842a04d18bd.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/377/8f4/6c1f931258a2a93e1c0777c842a04d18bd.png 1x, https://cdn.scores24.live/upload/team/w40-h40/377/8f4/6c1f931258a2a93e1c0777c842a04d18bd.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Наполи</div>
                                </div>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Сорренто 1945'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/e94/281/b48865d4a2d4071e885ae6e485897065b8.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/e94/281/b48865d4a2d4071e885ae6e485897065b8.png 1x, https://cdn.scores24.live/upload/team/w40-h40/e94/281/b48865d4a2d4071e885ae6e485897065b8.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Сорренто 1945</div>
                                </div>
                              </div>
                              <div className='sc-tcl2eq-4 fiMOII'>
                                <div className='sc-tcl2eq-5 vQgxT'>
                                  <span>10 авг</span>
                                </div>
                                <div className='sc-tcl2eq-6 ZfplR'>
                                  <span>09:00</span>
                                </div>
                              </div>
                            </div>
                            <div className='sc-tcl2eq-9 hMoSig'>
                              Подробнее
                              <svg
                                className='sc-i341db-0 ixrffO sc-tcl2eq-10 irTYkU'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </div>
                          </a>
                          <a
                            className='link sc-tcl2eq-0 gyKrf'
                            href='/ru/soccer/m-10-08-2025-mfa-zalgiris-w-fc-flora-tallinn-w--prediction'
                          >
                            <div className='sc-tcl2eq-1 ghAAbO'>Клубные товарищеские матчи</div>
                            <div className='sc-tcl2eq-2 jEsSw'>
                              <div className='sc-tcl2eq-3 nBiAX'>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Флора Таллинн (Ж)'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/0e5/de9/d74f3616789f25293fe847db158ba880c2.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/0e5/de9/d74f3616789f25293fe847db158ba880c2.png 1x, https://cdn.scores24.live/upload/team/w40-h40/0e5/de9/d74f3616789f25293fe847db158ba880c2.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Флора Таллинн (Ж)</div>
                                </div>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='MFA Zalgiris (w)'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://img.thesports.com/football/team/9ec0b58e31e65de4027cf499df009e77.png'
                                      data-srcset='https://img.thesports.com/football/team/9ec0b58e31e65de4027cf499df009e77.png'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>MFA Zalgiris (w)</div>
                                </div>
                              </div>
                              <div className='sc-tcl2eq-4 fiMOII'>
                                <div className='sc-tcl2eq-5 vQgxT'>
                                  <span>10 авг</span>
                                </div>
                                <div className='sc-tcl2eq-6 ZfplR'>
                                  <span>09:30</span>
                                </div>
                              </div>
                            </div>
                            <div className='sc-tcl2eq-9 hMoSig'>
                              Подробнее
                              <svg
                                className='sc-i341db-0 ixrffO sc-tcl2eq-10 irTYkU'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </div>
                          </a>
                          <a
                            className='link sc-tcl2eq-0 gyKrf'
                            href='/ru/soccer/m-10-08-2025-cd-arenteiro-sporting-gijon-prediction'
                          >
                            <div className='sc-tcl2eq-1 ghAAbO'>Клубные товарищеские матчи</div>
                            <div className='sc-tcl2eq-2 jEsSw'>
                              <div className='sc-tcl2eq-3 nBiAX'>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Спортинг'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/9b1/926/98b9e0985b7371df9dea9fd048f195f500.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/9b1/926/98b9e0985b7371df9dea9fd048f195f500.png 1x, https://cdn.scores24.live/upload/team/w40-h40/9b1/926/98b9e0985b7371df9dea9fd048f195f500.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Спортинг</div>
                                </div>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Арентейро'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/659/d1b/6e34f68e5417db6f27a572595d6d7cf2a6.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/659/d1b/6e34f68e5417db6f27a572595d6d7cf2a6.png 1x, https://cdn.scores24.live/upload/team/w40-h40/659/d1b/6e34f68e5417db6f27a572595d6d7cf2a6.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Арентейро</div>
                                </div>
                              </div>
                              <div className='sc-tcl2eq-4 fiMOII'>
                                <div className='sc-tcl2eq-5 vQgxT'>
                                  <span>10 авг</span>
                                </div>
                                <div className='sc-tcl2eq-6 ZfplR'>
                                  <span>10:00</span>
                                </div>
                              </div>
                            </div>
                            <div className='sc-tcl2eq-9 hMoSig'>
                              Подробнее
                              <svg
                                className='sc-i341db-0 ixrffO sc-tcl2eq-10 irTYkU'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </div>
                          </a>
                          <a
                            className='link sc-tcl2eq-0 gyKrf'
                            href='/ru/soccer/m-10-08-2025-buriram-united-rayong-fc-prediction'
                          >
                            <div className='sc-tcl2eq-1 ghAAbO'>Клубные товарищеские матчи</div>
                            <div className='sc-tcl2eq-2 jEsSw'>
                              <div className='sc-tcl2eq-3 nBiAX'>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Районг'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/19f/b10/7417196b176f96c0e39992e6621b3fda25.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/19f/b10/7417196b176f96c0e39992e6621b3fda25.png 1x, https://cdn.scores24.live/upload/team/w40-h40/19f/b10/7417196b176f96c0e39992e6621b3fda25.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Районг</div>
                                </div>
                                <div className='sc-tcl2eq-7 kwOtMp'>
                                  <span className='sc-11tt6ib-0 iQnnmC' size='20'>
                                    <img
                                      alt='Бурирам'
                                      className='lazyload sc-11tt6ib-2 mzpSx'
                                      data-src='https://cdn.scores24.live/upload/team/w20-h20/e44/ba2/382000477588805d23e8f15ca152a0e364.png'
                                      data-srcset='https://cdn.scores24.live/upload/team/w20-h20/e44/ba2/382000477588805d23e8f15ca152a0e364.png 1x, https://cdn.scores24.live/upload/team/w40-h40/e44/ba2/382000477588805d23e8f15ca152a0e364.png 2x'
                                      src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                                    />
                                  </span>
                                  <div className='sc-tcl2eq-8 jbAlZT'>Бурирам</div>
                                </div>
                              </div>
                              <div className='sc-tcl2eq-4 fiMOII'>
                                <div className='sc-tcl2eq-5 vQgxT'>
                                  <span>10 авг</span>
                                </div>
                                <div className='sc-tcl2eq-6 ZfplR'>
                                  <span>11:00</span>
                                </div>
                              </div>
                            </div>
                            <div className='sc-tcl2eq-9 hMoSig'>
                              Подробнее
                              <svg
                                className='sc-i341db-0 ixrffO sc-tcl2eq-10 irTYkU'
                                direction='right'
                                height='20'
                                width='20'
                              >
                                <use fill='currentColor' href='#arrow-chevron'></use>
                              </svg>
                            </div>
                          </a>
                        </div>
                        <div className='sc-17eplpv-0 ccfGM'>
                          <a className='link sc-17eplpv-1 fENEvO sc-utrs6s-3 kXISXw' href='/ru/predictions/soccer'>
                            Все прогнозы
                            <svg
                              className='sc-i341db-0 ixrffO otherMatches-caret'
                              direction='right'
                              height='30'
                              width='30'
                            >
                              <use fill='currentColor' href='#arrow-chevron-small'></use>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <article className='sc-vjv7tj-0 kmqZqq'></article>

                <div className='sc-1xsn000-11' id='sticky-boundary'></div>
              </section>
              <aside className='sc-1f6wkge-2 kiABVW'>
                <Area areaCode='5da94fb4f27828' options={{ ssr: false }} />
              </aside>
            </main>

            <footer className='sc-1vy4lno-1 cXHMKQ sc-1xsn000-10 gIOoVA'>
              <div className='sc-1vy4lno-0 gnZydl'>
                <div className='sc-1yx7qj5-0 kzkZwu'>
                  <div className='sc-1yx7qj5-1 hekNtJ'>
                    <div className='sc-1udshgx-0 dXEIzX' data-testid='FooterNavBlock'>
                      <div className='sc-1udshgx-1 jHWSVK'>SCORES24</div>
                      <div className='sc-1udshgx-2 kTKhxI'>
                        <ul className='sc-1yx7qj5-4 hRXZbI'>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA link--active' href='/ru'>
                              Главная
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/sportbooks'>
                              Букмекеры
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/trends/soccer'>
                              Тренды
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions'>
                              Прогнозы
                            </a>
                          </li>
                        </ul>
                        <div className='sc-1udshgx-3 mRKgd'></div>
                      </div>
                    </div>
                    <div className='sc-1udshgx-0 dXEIzX' data-testid='FooterNavBlock'>
                      <div className='sc-1udshgx-1 jHWSVK'>Прогнозы</div>
                      <div className='sc-1udshgx-2 kTKhxI'>
                        <ul className='sc-1yx7qj5-4 hRXZbI'>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/soccer'>
                              Футбол
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/ice-hockey'>
                              Хоккей
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/basketball'>
                              Баскетбол
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/tennis'>
                              Теннис
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/volleyball'>
                              Волейбол
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/mma'>
                              ММА
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/snooker'>
                              Снукер
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/csgo'>
                              Counter-Strike
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/predictions/futsal'>
                              Футзал
                            </a>
                          </li>
                        </ul>
                        <div className='sc-1udshgx-3 mRKgd'></div>
                      </div>
                    </div>
                    <div className='sc-1udshgx-0 dXEIzX' data-testid='FooterNavBlock'>
                      <div className='sc-1udshgx-1 jHWSVK'>Компания</div>
                      <div className='sc-1udshgx-2 kTKhxI'>
                        <ul className='sc-1yx7qj5-4 hRXZbI'>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/p-about'>
                              О нас
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/p-contacts'>
                              Контакты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/p-rules'>
                              Пользовательское соглашение
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/p-personal-data-rules'>
                              Политика обработки персональных данных
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/p-cookie-policy'>
                              Политика использования файлов cookie
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='sc-1yx7qj5-7 ecJYCZ'
                              href='https://hh.ru/employer/10335256'
                              target='_blank'
                              rel='noreferrer'
                            >
                              Вакансии
                            </a>
                          </li>
                        </ul>
                        <div className='sc-1udshgx-3 mRKgd'></div>
                      </div>
                    </div>
                    <div className='sc-1udshgx-0 dXEIzX' data-testid='FooterNavBlock'>
                      <div className='sc-1udshgx-1 jHWSVK'>Результаты</div>
                      <div className='sc-1udshgx-2 kTKhxI'>
                        <ul className='sc-1yx7qj5-4 hRXZbI'>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/soccer'>
                              Футбольные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/basketball'>
                              Баскетбольные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/tennis'>
                              Теннисные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/ice-hockey'>
                              Хоккейные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/table-tennis'>
                              Результаты настольного тенниса
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/volleyball'>
                              Волейбольные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/handball'>
                              Гандбольные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/baseball'>
                              Бейсбольные результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/american-football'>
                              Результаты американского футбола
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/rugby'>
                              Результаты по регби
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/cricket'>
                              Результаты по крикету
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/mma'>
                              Результаты MMA
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/boxing'>
                              Боксерские результаты
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/snooker'>
                              Результаты снукера
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/futsal'>
                              Результаты футзала
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/waterpolo'>
                              Результаты водного поло
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/badminton'>
                              Результаты бадминтона
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/darts'>
                              Результаты дартса
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/csgo'>
                              Результаты Counter-Strike
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/dota2'>
                              Результаты Dota 2
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/lol'>
                              Результаты League of Legends
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a className='link sc-1yx7qj5-6 gZMrwA' href='/ru/horse-racing'>
                              Результаты скачек
                            </a>
                          </li>
                        </ul>
                        <div className='sc-1udshgx-3 mRKgd'></div>
                      </div>
                    </div>

                    <div className='sc-1udshgx-0 dXEIzX' data-testid='FooterNavBlock'>
                      <div className='sc-1udshgx-1 jHWSVK'>Популярные события</div>
                      <div className='sc-1udshgx-2 kTKhxI'>
                        <ul className='sc-1yx7qj5-4 hRXZbI'>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-09-08-2025-garcia-caroline-muchova-karolina-prediction'
                            >
                              Каролин Гарсия – Каролина Мухова
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-kudermetova-veronika-bencic-belinda-prediction'
                            >
                              Вероника Кудерметова – Белинда Бенчич
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-krejcikova-barbora-svitolina-elina-prediction'
                            >
                              Барбора Крейчикова – Элина Свитолина
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/soccer/m-10-08-2025-crystal-palace-liverpool-prediction'
                            >
                              Кристал Пэлас – Ливерпуль
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-walton-adam-medvedev-daniil-prediction'
                            >
                              Адам Уолтон – Даниил Медведев
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-tien-learner-rublev-andrey-prediction'
                            >
                              Лернер Тьен – Андрей Рублев
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <span className='link sc-1yx7qj5-6 gZMrwA link--active cursorDefault'>Челси – Милан</span>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/soccer/m-10-08-2025-borussia-dortmund-juventus-turin-prediction'
                            >
                              Боруссия Дортмунд – Ювентус
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-dzumhur-damir-alcaraz-carlos-prediction'
                            >
                              Дамир Джумхур – Карлос Алькарас
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-khachanov-karen-royer-valentin-prediction'
                            >
                              Карен Хачанов – Валентин Ройер
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-wang-xinyu-gauff-coco-prediction'
                            >
                              Ван Синью – Кори Гауфф
                            </a>
                          </li>
                          <li className='sc-1yx7qj5-5 dlvYLy'>
                            <a
                              className='link sc-1yx7qj5-6 gZMrwA'
                              href='/ru/tennis/m-10-08-2025-de-minaur-alex-opelka-reilly-prediction'
                            >
                              Алекс Де Минор – Рейлли Опелка{' '}
                            </a>
                          </li>
                        </ul>
                        <div className='sc-1udshgx-3 mRKgd'></div>
                      </div>
                    </div>
                  </div>
                  <div className='sc-1xexym7-0 tLHPT sc-1yx7qj5-2 lqvnk' data-testid='FooterNavSettings'>
                    <div className='sc-1xexym7-1 dENHsU'>
                      <a
                        className='sc-1xexym7-2 huZtFO'
                        href='https://vk.com/scores_24'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                      >
                        <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                          <use fill='currentColor' href='#vk'></use>
                        </svg>
                      </a>
                      <a
                        className='sc-1xexym7-2 huZtFO'
                        href='https://t.me/+OYWNfu_1sNU0N2Qy'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                      >
                        <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                          <use fill='currentColor' href='#tg'></use>
                        </svg>
                      </a>
                      <a
                        className='sc-1xexym7-2 huZtFO'
                        href='https://twitter.com/scores_24live'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                      >
                        <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                          <use fill='currentColor' href='#twitter'></use>
                        </svg>
                      </a>
                      <a
                        className='sc-1xexym7-2 huZtFO'
                        href='https://instagram.com/scores_24/'
                        rel='nofollow noopener noreferrer'
                        target='_blank'
                      >
                        <svg className='sc-i341db-0 ixrffO' direction='right' height='20' width='20'>
                          <use fill='currentColor' href='#instagram'></use>
                        </svg>
                      </a>
                    </div>
                    <div className='sc-1xexym7-3 goFlVb'>
                      <button className='sc-xkaft1-4 kJcxug' type='button'>
                        <span className='sc-xkaft1-5 jqDLGl'>
                          <span className='sc-xkaft1-3 eKEprw'>EU (1.50)</span>
                        </span>
                        <svg className='sc-i341db-0 ixrffO sc-xkaft1-2 eJvZds' direction='right' height='16' width='16'>
                          <use fill='currentColor' href='#arrow-caret'></use>
                        </svg>
                      </button>
                      <button className='sc-xkaft1-4 kJcxug' type='button'>
                        <span className='sc-xkaft1-5 jqDLGl'>
                          <span className='sc-xkaft1-3 eKEprw'>
                            <span>09:05</span> (GTM+00:00)
                          </span>
                        </span>
                        <svg className='sc-i341db-0 ixrffO sc-xkaft1-2 eJvZds' direction='right' height='16' width='16'>
                          <use fill='currentColor' href='#arrow-caret'></use>
                        </svg>
                      </button>
                      <button className='sc-jvwc7y-4 sc-jvwc7y-11 cmfzay hvAZEo sc-jvwc7y-4 cmfzay' type='button'>
                        <span className='sc-jvwc7y-3 hdwUJe'>Скрыть актуальные бонусы</span>
                      </button>
                    </div>
                  </div>
                  <div className='sc-fzqqld-0 gGdHMk sc-1yx7qj5-3 izXwvw' data-testid='FooterNavLegal'>
                    <div className='sc-fzqqld-1 cqyqnA'>
                      <div className='sc-fzqqld-3 hojyrX'>
                        <div className='sc-fzqqld-4 sjTPD'>18+</div>
                        <div className='sc-fzqqld-5 gvrhPm'>
                          Играйте <br /> ответственно.
                        </div>
                      </div>
                      <a
                        className='sc-fzqqld-7 korJWU'
                        href='https://kansspelautoriteit.nl/'
                        rel='nofollow noreferrer'
                        target='_blank'
                      >
                        <img
                          alt='ru'
                          className='sc-fzqqld-8 buzeva lazyload'
                          data-src='/static/img/assets/license/regulator/nl.png'
                          data-srcset='/static/img/assets/license/regulator/nl.png'
                          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                          style={{ objectFit: 'contain' }}
                        />
                      </a>
                      <a
                        className='sc-fzqqld-7 korJWU'
                        href='http://www.gamblingtherapy.org/'
                        rel='nofollow noreferrer'
                        target='_blank'
                      >
                        <img
                          alt='ru'
                          className='sc-fzqqld-8 buzeva lazyload'
                          data-src='/static/img/assets/license/helper/world.png'
                          data-srcset='/static/img/assets/license/helper/world.png'
                          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                          style={{ objectFit: 'contain' }}
                        />
                      </a>
                    </div>
                    <div className='sc-fzqqld-6 hzUlpx'>
                      Scores24 не является букмекерской конторой <br /> и не организует игры на деньги.
                    </div>
                  </div>
                </div>
                <div className='sc-19d2vr2-0 kZmgQi'>
                  <div className='sc-19d2vr2-1 fuWEUM'>© 2025 Scores24 (Скорс24). Все права защищены.</div>
                  <div className='sc-19d2vr2-2 kwxlFF'>
                    Designed in
                    <a
                      className='sc-19d2vr2-3 BIkUI'
                      href='https://flatstudio.co/'
                      rel='noreferrer noopener nofollow'
                      target='_blank'
                    >
                      {' '}
                      Flatstudio
                    </a>
                  </div>
                </div>
              </div>
            </footer>

            <div className='sc-1peck7g-0 gXtDyj' data-testid='ScrollDirectionToggle'></div>
          </div>
          <div></div>
        </div>
      </>
    </GlobalManager>
  )
}
