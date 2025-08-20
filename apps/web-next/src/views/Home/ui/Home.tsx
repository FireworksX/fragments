'use client'

import Head from 'next/head'
import React from 'react'

export const Home = () => {
  return (
    <div className='page-root'>
      <Head>
        <title>Fragments — build, ship, and analyse widgets</title>
        <meta
          name='description'
          content='Fragments: a no-code platform to create embeddable widgets, deliver them to targeted segments, and measure their impact.'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' rel='stylesheet' />
      </Head>

      <header className='site-header'>
        <div className='container header-inner'>
          <div className='logo'>Fragments</div>
          <nav className='nav'>
            <a href='#build'>Build</a>
            <a href='#ship'>Ship</a>
            <a href='#analyse'>Analyse</a>
            <a className='cta' href='#get-started'>
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className='hero'>
          <div className='container hero-inner'>
            <div className='hero-copy'>
              <h1>Create product experiences without developers</h1>
              <p>
                Design widgets with our no-code builder, deliver them to targeted segments, and run experiments with
                built-in analytics — all from one platform.
              </p>

              <div className='hero-ctas'>
                <a className='button primary' href='#get-started'>
                  Get Started
                </a>
                <a className='button secondary' href='#'>
                  Join to Telegram
                </a>
              </div>
            </div>

            <div className='hero-art'>
              <div className='mock-window'>
                <div className='mock-header'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className='mock-body'>
                  <div className='widget-sample'>Example widget preview</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='features' className='features container'>
          <h2>Platform overview</h2>
          <p className='lead'>
            Fragments is split into three connected parts — Build, Ship, and Analyse — that let teams rapidly create,
            deliver and improve embeddable experiences.
          </p>

          <div className='feature-grid'>
            <article id='build' className='feature-card'>
              <h3>Build</h3>
              <p>
                Our no-code builder allows you to visually create widgets using a modular block system. Choose from
                pre-designed elements like forms, banners, sliders, and custom embeds. Configure behaviors such as
                triggers, animations, and conditional logic without writing a single line of code.
              </p>
              <p>
                Real-time preview ensures you see exactly how your widget will appear. Version history lets you
                experiment freely, knowing you can roll back at any time.
              </p>
            </article>

            <article id='ship' className='feature-card'>
              <h3>Ship</h3>
              <p>
                The delivery system empowers you to decide exactly how, when, and to whom your widgets are shown.
                Segment audiences based on behavior, demographics, or custom attributes.
              </p>
              <p>
                You can schedule campaigns, set frequency caps, and even roll out widgets gradually to test impact on
                smaller audiences before going global.
              </p>
            </article>

            <article id='analyse' className='feature-card'>
              <h3>Analyse</h3>
              <p>
                Built-in analytics give you deep insights into widget performance. Track views, clicks, conversions, and
                custom events without extra setup.
              </p>
              <p>
                Run A/B tests, measure results in real time, and iterate quickly. Our experiment dashboard makes it easy
                to compare versions and choose the highest-performing variant.
              </p>
            </article>
          </div>
        </section>

        <section id='examples' className='examples container'>
          <h2>Widget examples</h2>
          <p className='lead'>Quick examples of embeddable experiences you can build with Fragments.</p>

          <div className='examples-grid'>
            <div className='example-card'>Newsletter signup</div>
            <div className='example-card'>Product recommendation</div>
            <div className='example-card'>Promo banner</div>
            <div className='example-card'>Feedback widget</div>
          </div>
        </section>

        <section id='get-started' className='cta-strip'>
          <div className='container cta-inner'>
            <div>
              <h3>Ready to ship better experiments?</h3>
              <p>Start building with Fragments and iterate faster.</p>
            </div>
            <div>
              <a className='button primary large' href='#'>
                Get Started
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className='site-footer'>
        <div className='container footer-inner'>
          <div>© {new Date().getFullYear()} Fragments</div>
          <div className='footer-links'>
            <a href='#'>Privacy</a>
            <a href='#'>Terms</a>
            <a href='#'>Contact</a>
            <a href='#'>GitHub</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :root {
          --accent: #0099ff;
          --bg: #ffffff;
          --muted: #6b7280;
          --max-w: 1100px;
          --radius: 12px;
        }
        .page-root {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color: #0f172a;
          background: var(--bg);
        }
        .container {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 32px;
        }
        .site-header {
          border-bottom: 1px solid #eef2f7;
          position: sticky;
          top: 0;
          background: white;
          z-index: 40;
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-weight: 700;
          color: var(--accent);
          font-size: 20px;
        }
        .nav a {
          margin-left: 20px;
          text-decoration: none;
          color: inherit;
        }
        .nav .cta {
          padding: 8px 14px;
          border-radius: 8px;
          background: var(--accent);
          color: white;
          text-decoration: none;
          font-weight: 600;
        }
        .hero {
          padding: 48px 0;
        }
        .hero-inner {
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .hero-copy {
          flex: 1;
        }
        .hero-copy h1 {
          font-size: 40px;
          line-height: 1.05;
          margin: 0 0 18px;
        }
        .hero-copy p {
          color: var(--muted);
          margin: 0 0 24px;
          max-width: 620px;
        }
        .hero-ctas .button {
          margin-right: 12px;
        }
        .hero-art {
          width: 420px;
        }
        .mock-window {
          border-radius: 14px;
          box-shadow: 0 8px 30px rgba(11, 18, 30, 0.06);
          overflow: hidden;
          border: 1px solid #eef2f7;
        }
        .mock-header {
          height: 36px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: linear-gradient(90deg, #fff, #fbfdff);
        }
        .mock-header span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e6eefb;
          display: inline-block;
        }
        .mock-body {
          padding: 24px;
          background: linear-gradient(180deg, #fff, #f8fbff);
        }
        .widget-sample {
          height: 180px;
          border-radius: 10px;
          border: 1px dashed #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
        }
        .features {
          padding: 40px 32px;
        }
        .features h2 {
          margin: 0 0 8px;
        }
        .features .lead {
          color: var(--muted);
          margin-bottom: 20px;
        }
        .feature-grid {
          display: flex;
          gap: 20px;
        }
        .feature-card {
          background: #fff;
          border: 1px solid #eef2f7;
          padding: 20px;
          border-radius: 10px;
          flex: 1;
        }
        .feature-card h3 {
          margin-top: 0;
        }
        .examples {
          padding: 40px 32px;
        }
        .examples-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 16px;
        }
        .example-card {
          min-height: 100px;
          border-radius: 8px;
          border: 1px solid #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
        }
        .cta-strip {
          background: linear-gradient(90deg, #f7fbff, #ffffff);
          padding: 28px 0;
          border-top: 1px solid #eef2f7;
        }
        .cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
        }
        .button.primary {
          background: var(--accent);
          color: white;
        }
        .button.primary.large {
          padding: 14px 20px;
          font-size: 16px;
        }
        .button.secondary {
          border: 1px solid #dbeafe;
          background: transparent;
          color: var(--accent);
        }
        .site-footer {
          border-top: 1px solid #eef2f7;
          padding: 24px 0;
        }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--muted);
        }
        .footer-links a {
          margin-left: 12px;
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
