'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Syne, DM_Sans, Space_Mono } from 'next/font/google'

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})
const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

/* ─── Inline SVG brand logos ─────────────────────────────────────────────── */
const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0L4.06 14.196a4.504 4.504 0 01-1.72-6.3zm16.597 3.855l-5.843-3.372L15.11 7.21a.076.076 0 01.071 0l4.762 2.749a4.5 4.5 0 01-.689 8.122V12.56a.786.786 0 00-.385-.68zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.76-2.744a4.5 4.5 0 016.656 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08-4.778 2.758a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
)

const N8nLogo = () => (
  <svg viewBox="0 0 60 60" fill="none" className="w-5 h-5">
    <circle cx="10" cy="30" r="9" fill="#EA580C" />
    <circle cx="30" cy="10" r="9" fill="#EA580C" />
    <circle cx="50" cy="30" r="9" fill="#EA580C" />
    <circle cx="30" cy="50" r="9" fill="#EA580C" />
    <line x1="10" y1="30" x2="30" y2="10" stroke="#EA580C" strokeWidth="3" opacity="0.5" />
    <line x1="30" y1="10" x2="50" y2="30" stroke="#EA580C" strokeWidth="3" opacity="0.5" />
    <line x1="50" y1="30" x2="30" y2="50" stroke="#EA580C" strokeWidth="3" opacity="0.5" />
    <line x1="30" y1="50" x2="10" y2="30" stroke="#EA580C" strokeWidth="3" opacity="0.5" />
  </svg>
)

const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const StripeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
  </svg>
)

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function MonolithAIPage() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-observe]').forEach((el) => {
      observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <>
      {/* ── Global Styles ─────────────────────────────────────────────────── */}
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:       #040508;
          --surface:  #0b0c12;
          --surface2: #11121c;
          --border:   rgba(255,255,255,0.07);
          --border2:  rgba(255,255,255,0.04);
          --blue:     #3D5AFE;
          --blue-dim: rgba(61,90,254,0.18);
          --blue-glow:rgba(61,90,254,0.35);
          --teal:     #00D4AA;
          --teal-dim: rgba(0,212,170,0.12);
          --orange:   #EA580C;
          --text:     #EEEEF6;
          --muted:    #5A5A78;
          --silver:   #9898B4;
          --font-syne: 'Syne', sans-serif;
          --font-dm:   'DM Sans', sans-serif;
          --font-mono: 'Space Mono', monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-dm);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        h1,h2,h3,h4 { font-family: var(--font-syne); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--blue-dim); border-radius: 2px; }

        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0 var(--blue-glow); }
          50%      { box-shadow: 0 0 0 6px transparent;    }
        }
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes nodePulse {
          0%,100% { filter: drop-shadow(0 0 6px var(--blue-glow)); }
          50%      { filter: drop-shadow(0 0 14px var(--blue-glow)); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes emergencyPulse {
          0%,100% { opacity:1; }
          50%      { opacity:.55; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gridSlide {
          from { background-position: 0 0; }
          to   { background-position: 48px 48px; }
        }

        /* ── Utilities ── */
        .font-syne   { font-family: var(--font-syne); }
        .font-mono   { font-family: var(--font-mono); }

        .text-gradient-white {
          background: linear-gradient(150deg, #ffffff 0%, #c8c8e0 60%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
        .text-gradient-blue {
          background: linear-gradient(135deg, #3D5AFE 0%, #8BA4FF 50%, #3D5AFE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* Grid background */
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridSlide 8s linear infinite;
        }

        /* Radial glow */
        .glow-blue { background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(61,90,254,0.1) 0%, transparent 70%); }
        .glow-teal { background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,170,0.07) 0%, transparent 70%); }

        /* CTA Button */
        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--blue);
          color: #fff;
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.02em;
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid rgba(61,90,254,0.4);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none;
        }
        .btn-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px var(--blue-glow), 0 8px 24px rgba(0,0,0,0.5);
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--silver);
          font-family: var(--font-syne);
          font-weight: 600;
          font-size: 0.875rem;
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .btn-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        /* Card */
        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--blue), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .card:hover { transform: translateY(-6px); box-shadow: 0 32px 64px rgba(0,0,0,0.45), 0 0 48px rgba(61,90,254,0.07); border-color: rgba(61,90,254,0.25); }
        .card:hover::before { opacity: 1; }

        /* Badge */
        .badge-blue { background: var(--blue-dim); border: 1px solid rgba(61,90,254,0.3); color: #8BA4FF; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; }
        .badge-teal { background: var(--teal-dim); border: 1px solid rgba(0,212,170,0.25); color: var(--teal); font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; }
        .badge-red  { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #F87171; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 8px; border-radius: 6px; animation: emergencyPulse 2s ease-in-out infinite; }

        /* Workflow SVG nodes */
        .wf-node { animation: nodePulse 2.5s ease-in-out infinite; }
        .wf-path  { stroke-dasharray: 6 4; animation: flowDash 1.2s linear infinite; }

        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal.visible { animation: fadeUp 0.7s ease-out forwards; }
        .reveal-delay-1 { animation-delay: 0.1s; }
        .reveal-delay-2 { animation-delay: 0.2s; }
        .reveal-delay-3 { animation-delay: 0.3s; }
        .reveal-delay-4 { animation-delay: 0.45s; }

        /* Section label */
        .section-label { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal); }

        /* Step number */
        .step-num { font-family: var(--font-syne); font-weight: 800; font-size: 3.5rem; color: rgba(61,90,254,0.15); line-height: 1; }

        /* Marquee */
        .marquee-wrap { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent); }
        .marquee-track { display: flex; width: max-content; animation: marquee 24s linear infinite; }

        /* Nav link */
        .nav-link { color: var(--muted); font-size: 0.875rem; text-decoration: none; transition: color 0.2s; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: var(--blue); transition: width 0.25s ease; }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        /* Orbit ring (hero decoration) */
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(61,90,254,0.08);
          pointer-events: none;
        }
      `}</style>

      <div className={`${syne.variable} ${dm.variable} ${mono.variable}`}>

        {/* ════════════════════════════════════════════════════════════
            HEADER
        ════════════════════════════════════════════════════════════ */}
        <header
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 72,
            transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
            background: scrolled ? 'rgba(4,5,8,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              {!logoError ? (
                <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                  <Image
                    src="/logo.png"
                    alt="Monolith AI"
                    fill
                    style={{ objectFit: 'contain' }}
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                /* Fallback geometric logo mark */
                <div style={{ width: 32, height: 32, background: 'var(--blue)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 14, color: '#fff', letterSpacing: '-0.05em' }}>M</span>
                </div>
              )}
              <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff' }}>
                Monolith<span style={{ color: 'var(--blue)' }}> AI</span>
              </span>
            </a>

            {/* Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
              {[
                { label: 'Solutions',    href: '#solutions'   },
                { label: 'Technologie', href: '#technologie' },
                { label: 'Processus',   href: '#processus'   },
                { label: 'Contact',     href: '#contact'     },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="nav-link">{label}</a>
              ))}
            </nav>

            {/* CTA */}
            <a href="#contact" className="btn-cta" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
              Réserver un appel
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════ */}
        <section
          style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 72 }}
        >
          {/* Grid + radial overlay */}
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
          <div className="glow-blue" style={{ position: 'absolute', inset: 0 }} />

          {/* Orbit rings */}
          <div className="orbit-ring" style={{ width: 480, height: 480, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="orbit-ring" style={{ width: 720, height: 720, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="orbit-ring" style={{ width: 960, height: 960, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

          {/* Content */}
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

            {/* Eyebrow badge */}
            <div style={{ animation: 'fadeUp 0.6s ease-out 0.05s both', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <span className="badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'emergencyPulse 1.5s ease-in-out infinite' }} />
                Agents Vocaux IA · Nouvelle Génération
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-syne)', fontWeight: 800,
                fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
                lineHeight: 1.06, letterSpacing: '-0.03em',
                marginBottom: 28,
                animation: 'fadeUp 0.7s ease-out 0.15s both',
              }}
            >
              <span className="text-gradient-white" style={{ display: 'block' }}>L'excellence de l'automatisation</span>
              <span style={{ display: 'block', color: '#fff' }}>et des Agents Vocaux IA</span>
              <span className="text-gradient-blue" style={{ display: 'block' }}>pour les PME françaises</span>
            </h1>

            {/* Sub */}
            <p
              style={{
                fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--silver)',
                maxWidth: 580, margin: '0 auto 44px',
                animation: 'fadeUp 0.7s ease-out 0.28s both',
              }}
            >
              Nous transformons vos PME de services à domicile en machines de croissance 24h/24 — grâce à des agents qui décrochent, qualifient, bookent et gèrent les urgences sans intervention humaine.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.7s ease-out 0.38s both' }}>
              <a href="#contact" className="btn-cta" style={{ fontSize: '0.9rem', padding: '13px 28px' }}>
                Réserver un appel stratégique
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#solutions" className="btn-ghost" style={{ fontSize: '0.9rem', padding: '13px 28px' }}>
                Voir nos solutions
              </a>
            </div>

            {/* KPIs */}
            <div
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1, maxWidth: 480, margin: '64px auto 0',
                background: 'var(--border)',
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--border)',
                animation: 'fadeUp 0.7s ease-out 0.5s both',
              }}
            >
              {[
                { val: '24h/24', label: 'Disponibilité' },
                { val: '< 1s',   label: 'Temps de réponse' },
                { val: '100%',   label: 'Appels traités' },
              ].map(({ val, label }) => (
                <div key={label} style={{ background: 'var(--surface)', padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--blue)', letterSpacing: '-0.04em', marginBottom: 4 }}>{val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
        </section>

        {/* ════════════════════════════════════════════════════════════
            MARQUEE — TECH STACK
        ════════════════════════════════════════════════════════════ */}
        <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Intégrations natives</span>
          </div>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[
                'OpenAI GPT-4o', 'n8n Automation', 'WhatsApp Business', 'Stripe Payments',
                'Cal.com', 'Twilio Voice', 'Make.com', 'Google Calendar', 'Notion', 'Zapier',
                'OpenAI GPT-4o', 'n8n Automation', 'WhatsApp Business', 'Stripe Payments',
                'Cal.com', 'Twilio Voice', 'Make.com', 'Google Calendar', 'Notion', 'Zapier',
              ].map((name, i) => (
                <span key={i} style={{ padding: '0 40px', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            TECH AUTHORITY — WORKFLOW GRAPH
        ════════════════════════════════════════════════════════════ */}
        <section id="technologie" style={{ padding: '120px 24px', position: 'relative' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            {/* Heading */}
            <div
              id="tech-head" data-observe
              className={`reveal${isVisible('tech-head') ? ' visible' : ''}`}
              style={{ textAlign: 'center', marginBottom: 64 }}
            >
              <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>// Infrastructure technique</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', marginBottom: 20 }}>
                Une stack IA de{' '}
                <span className="text-gradient-blue">classe entreprise</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--silver)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                Chaque appel déclenche une orchestration précise entre nos agents IA, vos outils métier, et vos clients — entièrement automatisée.
              </p>
            </div>

            {/* Workflow canvas */}
            <div
              id="tech-graph" data-observe
              className={`reveal${isVisible('tech-graph') ? ' visible reveal-delay-2' : ''}`}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}
            >
              {/* Terminal-style topbar */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface2)' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
                <span style={{ marginLeft: 12, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>monolith-ai — agent-vocal.workflow.n8n</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--teal)' }}>● LIVE</span>
              </div>

              {/* SVG Graph */}
              <div style={{ padding: '40px 24px', overflowX: 'auto' }}>
                <svg
                  viewBox="0 0 980 340"
                  style={{ width: '100%', minWidth: 640, maxHeight: 340 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="rgba(61,90,254,0.6)" />
                    </marker>
                    <marker id="arr-teal" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="rgba(0,212,170,0.7)" />
                    </marker>
                    <filter id="glow-filter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="rgba(61,90,254,0)" />
                      <stop offset="50%"  stopColor="rgba(61,90,254,0.9)" />
                      <stop offset="100%" stopColor="rgba(61,90,254,0)" />
                    </linearGradient>
                    <linearGradient id="flowGradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="rgba(0,212,170,0)" />
                      <stop offset="50%"  stopColor="rgba(0,212,170,0.8)" />
                      <stop offset="100%" stopColor="rgba(0,212,170,0)" />
                    </linearGradient>
                  </defs>

                  {/* ── Static base paths ── */}
                  {/* Phone → OpenAI */}
                  <line x1="160" y1="170" x2="248" y2="170" stroke="rgba(61,90,254,0.2)" strokeWidth="1.5" markerEnd="url(#arr)" />
                  {/* OpenAI → n8n */}
                  <line x1="378" y1="170" x2="458" y2="170" stroke="rgba(61,90,254,0.2)" strokeWidth="1.5" markerEnd="url(#arr)" />
                  {/* n8n → WhatsApp */}
                  <path d="M578 154 C618 154 638 88 678 88" stroke="rgba(61,90,254,0.2)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
                  {/* n8n → Calendar */}
                  <line x1="578" y1="170" x2="678" y2="170" stroke="rgba(61,90,254,0.2)" strokeWidth="1.5" markerEnd="url(#arr)" />
                  {/* n8n → Stripe */}
                  <path d="M578 186 C618 186 638 252 678 252" stroke="rgba(61,90,254,0.2)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
                  {/* Outputs → Patron */}
                  <line x1="798" y1="88"  x2="870" y2="155" stroke="rgba(0,212,170,0.25)" strokeWidth="1.5" markerEnd="url(#arr-teal)" />
                  <line x1="798" y1="170" x2="870" y2="165" stroke="rgba(0,212,170,0.25)" strokeWidth="1.5" markerEnd="url(#arr-teal)" />
                  <line x1="798" y1="252" x2="870" y2="175" stroke="rgba(0,212,170,0.25)" strokeWidth="1.5" markerEnd="url(#arr-teal)" />

                  {/* ── Animated overlay paths ── */}
                  <line className="wf-path" x1="160" y1="170" x2="248" y2="170" stroke="url(#flowGrad)" strokeWidth="2" />
                  <line className="wf-path" x1="378" y1="170" x2="458" y2="170" stroke="url(#flowGrad)" strokeWidth="2" style={{ animationDelay: '0.3s' }} />
                  <line className="wf-path" x1="578" y1="170" x2="678" y2="170" stroke="url(#flowGrad)" strokeWidth="2" style={{ animationDelay: '0.6s' }} />

                  {/* ── NODE 1: Appel entrant ── */}
                  <g className="wf-node" style={{ animationDelay: '0s' }}>
                    <rect x="20" y="132" width="140" height="76" rx="12" fill="#0b0c12" stroke="rgba(61,90,254,0.55)" strokeWidth="1.5" filter="url(#glow-filter)" />
                    <text x="90" y="156" textAnchor="middle" fill="rgba(61,90,254,0.65)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">TRIGGER</text>
                    <text x="90" y="176" textAnchor="middle" fill="#EEEEF6" fontSize="13" fontWeight="600">📞 Appel entrant</text>
                    <text x="90" y="194" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">Client PME · 24h/24</text>
                  </g>

                  {/* ── NODE 2: OpenAI ── */}
                  <g className="wf-node" style={{ animationDelay: '0.25s' }}>
                    <rect x="248" y="128" width="130" height="84" rx="12" fill="#0b0c12" stroke="rgba(61,90,254,0.6)" strokeWidth="1.5" filter="url(#glow-filter)" />
                    <text x="313" y="150" textAnchor="middle" fill="rgba(61,90,254,0.65)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">AI AGENT</text>
                    {/* OpenAI icon placeholder circle */}
                    <circle cx="313" cy="171" r="13" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    <text x="313" y="175.5" textAnchor="middle" fill="#fff" fontSize="11">⚡</text>
                    <text x="313" y="192" textAnchor="middle" fill="#EEEEF6" fontSize="11" fontWeight="600">OpenAI GPT-4o</text>
                    <text x="313" y="206" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">Voice NLU · TTS</text>
                  </g>

                  {/* ── NODE 3: n8n ── */}
                  <g className="wf-node" style={{ animationDelay: '0.5s' }}>
                    <rect x="458" y="128" width="120" height="84" rx="12" fill="#0b0c12" stroke="rgba(234,88,12,0.65)" strokeWidth="1.5" filter="url(#glow-filter)" />
                    <text x="518" y="150" textAnchor="middle" fill="rgba(234,88,12,0.75)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">ORCHESTRATOR</text>
                    <circle cx="518" cy="171" r="13" fill="rgba(234,88,12,0.12)" stroke="rgba(234,88,12,0.3)" strokeWidth="1" />
                    <text x="518" y="176" textAnchor="middle" fill="rgb(234,88,12)" fontSize="16" fontWeight="700">n</text>
                    <text x="518" y="193" textAnchor="middle" fill="#EEEEF6" fontSize="11" fontWeight="600">n8n Workflow</text>
                    <text x="518" y="207" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">Auto-routing · Logic</text>
                  </g>

                  {/* ── NODE 4a: WhatsApp ── */}
                  <g className="wf-node" style={{ animationDelay: '0.7s' }}>
                    <rect x="678" y="50" width="120" height="76" rx="12" fill="#0b0c12" stroke="rgba(37,211,102,0.55)" strokeWidth="1.5" />
                    <text x="738" y="72" textAnchor="middle" fill="rgba(37,211,102,0.7)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">NOTIFICATION</text>
                    <text x="738" y="91" textAnchor="middle" fill="#EEEEF6" fontSize="11" fontWeight="600">📱 SMS Urgence</text>
                    <text x="738" y="108" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">WhatsApp · Patron</text>
                  </g>

                  {/* ── NODE 4b: Calendar ── */}
                  <g className="wf-node" style={{ animationDelay: '0.9s' }}>
                    <rect x="678" y="132" width="120" height="76" rx="12" fill="#0b0c12" stroke="rgba(61,90,254,0.5)" strokeWidth="1.5" />
                    <text x="738" y="154" textAnchor="middle" fill="rgba(61,90,254,0.65)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">BOOKING</text>
                    <text x="738" y="173" textAnchor="middle" fill="#EEEEF6" fontSize="11" fontWeight="600">📅 Rendez-vous</text>
                    <text x="738" y="190" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">Cal.com · Calendly</text>
                  </g>

                  {/* ── NODE 4c: Stripe ── */}
                  <g className="wf-node" style={{ animationDelay: '1.1s' }}>
                    <rect x="678" y="214" width="120" height="76" rx="12" fill="#0b0c12" stroke="rgba(99,91,255,0.55)" strokeWidth="1.5" />
                    <text x="738" y="236" textAnchor="middle" fill="rgba(99,91,255,0.7)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">PAYMENT</text>
                    <text x="738" y="255" textAnchor="middle" fill="#EEEEF6" fontSize="11" fontWeight="600">💳 Acompte</text>
                    <text x="738" y="272" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">Stripe · Sécurisé</text>
                  </g>

                  {/* ── NODE 5: Patron confirmé ── */}
                  <g className="wf-node" style={{ animationDelay: '1.3s' }}>
                    <rect x="870" y="138" width="90" height="64" rx="12" fill="#0b0c12" stroke="rgba(0,212,170,0.65)" strokeWidth="1.5" filter="url(#glow-filter)" />
                    <text x="915" y="160" textAnchor="middle" fill="rgba(0,212,170,0.75)" fontSize="9" fontFamily="monospace" letterSpacing="0.08em">OUTPUT</text>
                    <text x="915" y="180" textAnchor="middle" fill="#EEEEF6" fontSize="12" fontWeight="600">✅ Patron</text>
                    <text x="915" y="195" textAnchor="middle" fill="rgba(238,238,246,0.38)" fontSize="9">Notifié & booké</text>
                  </g>
                </svg>
              </div>

              {/* Tech pill row */}
              <div style={{ padding: '0 32px 32px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { label: 'OpenAI GPT-4o',      Icon: OpenAILogo,   c: '#fff',     bg: 'rgba(255,255,255,0.05)',   bd: 'rgba(255,255,255,0.12)' },
                  { label: 'n8n Automation',      Icon: N8nLogo,      c: '#EA580C',  bg: 'rgba(234,88,12,0.08)',     bd: 'rgba(234,88,12,0.25)' },
                  { label: 'WhatsApp Business',   Icon: WhatsAppLogo, c: '#25D366',  bg: 'rgba(37,211,102,0.08)',    bd: 'rgba(37,211,102,0.25)' },
                  { label: 'Stripe',              Icon: StripeLogo,   c: '#635BFF',  bg: 'rgba(99,91,255,0.08)',     bd: 'rgba(99,91,255,0.25)' },
                ].map(({ label, Icon, c, bg, bd }) => (
                  <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 10, background: bg, border: `1px solid ${bd}`, color: c, fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                    <Icon />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CORE OFFERS GRID
        ════════════════════════════════════════════════════════════ */}
        <section id="solutions" style={{ padding: '40px 24px 120px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            {/* Heading */}
            <div
              id="sol-head" data-observe
              className={`reveal${isVisible('sol-head') ? ' visible' : ''}`}
              style={{ textAlign: 'center', marginBottom: 64 }}
            >
              <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>// Nos solutions sectorielles</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginBottom: 20 }}>
                Trois niches.&nbsp;
                <span className="text-gradient-blue">Une technologie.</span>
                <br />Des résultats immédiats.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--silver)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                Chaque agent vocal est calibré pour le vocabulaire métier, les urgences, et les workflows spécifiques à votre secteur.
              </p>
            </div>

            {/* Cards */}
            <div
              id="sol-cards" data-observe
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 48 }}
            >
              {[
                {
                  icon:     '🔧',
                  code:     'MÉCA360',
                  agent:    'Agent MécaAuto',
                  title:    'Mécanicien à domicile',
                  desc:     'Gestion automatisée des pannes, dépannages et entretiens urgents. Détection intelligente des cas critiques avec dispatch immédiat et devis vocal.',
                  features: ['Diagnostic vocal préliminaire', 'Réservation intervention J+0', 'Devis automatique SMS', 'Alerte WhatsApp patron'],
                  accent:   '#F59E0B',
                  accentBg: 'rgba(245,158,11,0.08)',
                  accentBd: 'rgba(245,158,11,0.22)',
                  urgency:  'Panne moteur, accident route',
                  delay:    '0s',
                },
                {
                  icon:     '🔩',
                  code:     'PLOMB360',
                  agent:    'Agent PlombPro',
                  title:    'Plombier à domicile',
                  desc:     'Réponse immédiate aux fuites, dégâts des eaux et urgences sanitaires. Priorisation automatique selon la gravité déclarée par le client.',
                  features: ['Triage urgence fuite d'eau', 'Géolocalisation artisan proche', 'RDV prioritaire J+0', 'Notification patron WhatsApp'],
                  accent:   '#3B82F6',
                  accentBg: 'rgba(59,130,246,0.08)',
                  accentBd: 'rgba(59,130,246,0.22)',
                  urgency:  'Fuite eau, dégât urgent',
                  delay:    '0.1s',
                },
                {
                  icon:     '🔑',
                  code:     'SERR360',
                  agent:    'Agent SerrPro',
                  title:    'Serrurier à domicile',
                  desc:     'Disponible 24h/24 pour ouvertures de porte, pertes de clés et effractions. Intervention garantie en moins d\'une heure avec validation d\'identité vocale.',
                  features: ['Ouverture porte urgence', 'Validation identité vocale', 'Devis immédiat téléphone', 'Dispatch technicien GPS'],
                  accent:   '#10B981',
                  accentBg: 'rgba(16,185,129,0.08)',
                  accentBd: 'rgba(16,185,129,0.22)',
                  urgency:  'Serrure bloquée, effraction',
                  delay:    '0.2s',
                },
              ].map((s) => (
                <div
                  key={s.code}
                  className={`card reveal${isVisible('sol-cards') ? ' visible' : ''}`}
                  style={{ padding: 36, display: 'flex', flexDirection: 'column', animationDelay: s.delay }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                      <div style={{ fontSize: '2.6rem', marginBottom: 12, lineHeight: 1 }}>{s.icon}</div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: s.accent, background: s.accentBg, border: `1px solid ${s.accentBd}`, padding: '4px 10px', borderRadius: 6 }}>
                        {s.code}
                      </span>
                    </div>
                    <span className="badge-red">🚨 Urgence 24/7</span>
                  </div>

                  {/* Title */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: s.accent, marginBottom: 6, letterSpacing: '0.06em' }}>{s.agent}</div>
                    <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.9rem', color: 'var(--silver)', lineHeight: 1.75, marginBottom: 24, flex: 1 }}>{s.desc}</p>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {s.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--silver)' }}>
                        <span style={{ color: s.accent, fontSize: '0.7rem', flexShrink: 0 }}>▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Urgency indicator */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'var(--muted)' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 6px rgba(239,68,68,0.6)', animation: 'emergencyPulse 1.8s ease-in-out infinite' }} />
                    Détection auto :&nbsp;<span style={{ color: '#F87171' }}>{s.urgency}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent vocal feature callout */}
            <div
              id="sol-callout" data-observe
              className={`reveal${isVisible('sol-callout') ? ' visible reveal-delay-2' : ''}`}
              style={{
                borderRadius: 20, padding: '52px 48px',
                background: 'linear-gradient(135deg, rgba(61,90,254,0.09) 0%, rgba(0,212,170,0.04) 100%)',
                border: '1px solid rgba(61,90,254,0.22)',
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center',
              }}
            >
              <div>
                <span className="badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'emergencyPulse 1.5s ease-in-out infinite' }} />
                  Agent Vocal IA 24h/24
                </span>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.2 }}>
                  Votre agent vocal ne dort jamais.<br />
                  <span className="text-gradient-blue">Vous, si.</span>
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--silver)', lineHeight: 1.8, maxWidth: 520 }}>
                  L'agent détecte automatiquement les mots-clés d'urgence dans l'appel, notifie le patron par SMS et WhatsApp en temps réel, et réserve le créneau d'intervention — le tout sans aucune intervention humaine.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 240 }}>
                {[
                  { icon: '🎙️', step: 'Appel entrant détecté',       delay: '0s' },
                  { icon: '🧠', step: 'IA analyse l\'urgence',        delay: '0.4s' },
                  { icon: '📱', step: 'SMS patron instantané',         delay: '0.8s' },
                  { icon: '📅', step: 'RDV automatiquement booké',     delay: '1.2s' },
                ].map(({ icon, step, delay }, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--silver)', animation: `fadeUp 0.6s ease-out ${delay} both` }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
                    <span>{step}</span>
                    {i < 3 && <span style={{ marginLeft: 'auto', color: 'rgba(61,90,254,0.5)', fontSize: '0.75rem' }}>↓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PROCESS — 4 STEPS
        ════════════════════════════════════════════════════════════ */}
        <section id="processus" style={{ padding: '40px 24px 120px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(61,90,254,0.03) 50%, transparent)' }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

            <div
              id="proc-head" data-observe
              className={`reveal${isVisible('proc-head') ? ' visible' : ''}`}
              style={{ textAlign: 'center', marginBottom: 64 }}
            >
              <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>// Notre processus</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                Opérationnel en&nbsp;<span className="text-gradient-blue">72 heures</span>
              </h2>
            </div>

            <div
              id="proc-steps" data-observe
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}
            >
              {[
                { n: '01', title: 'Audit & Qualification',   desc: 'On analyse votre activité, vos horaires, vos types d\'urgences et vos processus actuels lors d\'un appel stratégique de 30 min.', delay: '0s' },
                { n: '02', title: 'Configuration Agent',      desc: 'Votre agent vocal est personnalisé avec votre vocabulaire métier, vos tarifs, vos disponibilités et votre tonalité de marque.', delay: '0.1s' },
                { n: '03', title: 'Intégration Système',      desc: 'Connexion sécurisée à votre calendrier, votre numéro professionnel, WhatsApp Business et Stripe pour les acomptes.', delay: '0.2s' },
                { n: '04', title: 'Go Live & Optimisation',   desc: 'Mise en ligne, monitoring temps réel 30 jours, ajustements fins sur le comportement de l\'agent, reporting hebdomadaire.', delay: '0.3s' },
              ].map(({ n, title, desc, delay }) => (
                <div
                  key={n}
                  className={`reveal${isVisible('proc-steps') ? ' visible' : ''}`}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 18, padding: '32px 28px',
                    animationDelay: delay,
                    transition: 'border-color 0.3s',
                  }}
                >
                  <div className="step-num" style={{ marginBottom: 16 }}>{n}</div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.015em', marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--silver)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CTA + CALENDLY EMBED
        ════════════════════════════════════════════════════════════ */}
        <section id="contact" style={{ padding: '40px 24px 120px', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
          <div className="glow-teal" style={{ position: 'absolute', inset: 0 }} />
          <div className="glow-blue" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>

            <div
              id="cta-head" data-observe
              className={`reveal${isVisible('cta-head') ? ' visible' : ''}`}
              style={{ textAlign: 'center', marginBottom: 56 }}
            >
              <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>// Prenez de l'avance sur vos concurrents</span>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.1 }}>
                Prêt à automatiser<br />
                <span className="text-gradient-blue">votre croissance ?</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--silver)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                Réservez un appel stratégique gratuit de 30 minutes. On analyse votre business et vous présentons un plan d'action personnalisé.
              </p>
            </div>

            {/* Calendly widget wrapper */}
            <div
              id="cta-cal" data-observe
              className={`reveal${isVisible('cta-cal') ? ' visible reveal-delay-2' : ''}`}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}
            >
              {/* Top bar */}
              <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'emergencyPulse 1.5s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>Disponibilités en temps réel · Appel stratégique 30 min · Gratuit</span>
              </div>

              {/* ↓ Replace the src URL with your actual Calendly link */}
              <iframe
                src="https://calendly.com/monolith-ai/appel-strategie"
                width="100%"
                height="680"
                frameBorder="0"
                title="Réserver un appel Monolith AI"
                style={{ display: 'block', background: 'transparent', minHeight: 680 }}
              />

              {/* Fallback — shown when iframe is blocked by CSP */}
              <noscript>
                <div style={{ padding: 48, textAlign: 'center' }}>
                  <a href="https://calendly.com/monolith-ai/appel-strategie" className="btn-cta" target="_blank" rel="noopener noreferrer">
                    📅 Choisir un créneau
                  </a>
                </div>
              </noscript>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════ */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '64px 24px 40px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            {/* Top row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64, marginBottom: 48, alignItems: 'start' }}>
              <div style={{ maxWidth: 280 }}>
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  {!logoError ? (
                    <div style={{ position: 'relative', width: 28, height: 28 }}>
                      <Image src="/logo.png" alt="Monolith AI" fill style={{ objectFit: 'contain' }} onError={() => setLogoError(true)} />
                    </div>
                  ) : (
                    <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 12, color: '#fff' }}>M</span>
                    </div>
                  )}
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                    Monolith<span style={{ color: 'var(--blue)' }}> AI</span>
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.75 }}>
                  L'agence d'automatisation IA spécialisée dans les services à domicile français. Agents vocaux, workflows n8n, intégrations sur mesure.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                {[
                  {
                    title: 'Solutions',
                    links: ['MécaAuto / Méca360', 'PlombPro / Plomb360', 'SerrPro / Serr360'],
                  },
                  {
                    title: 'Technologie',
                    links: ['Agent Vocal IA', 'Automatisation n8n', 'Intégrations natives', 'Reporting & Analytics'],
                  },
                  {
                    title: 'Contact',
                    links: ['Réserver un appel', 'hello@monolith-ai.fr', 'LinkedIn', 'Instagram'],
                  },
                ].map(({ title, links }) => (
                  <div key={title}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>{title}</div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {links.map((l) => (
                        <li key={l}>
                          <a href="#" style={{ fontSize: '0.875rem', color: 'var(--silver)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                            onMouseOut={e => (e.currentTarget.style.color = 'var(--silver)')}>
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
                © 2025 Monolith AI. Tous droits réservés.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {['Mentions légales', 'Confidentialité', 'CGV'].map((item) => (
                  <a key={item} href="#" style={{ fontSize: '0.78rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--silver)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* ── Mobile nav hide helper ── */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}