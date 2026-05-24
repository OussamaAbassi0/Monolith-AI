'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Syne, DM_Sans } from 'next/font/google'

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})
const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})

/* ─── Inline brand SVGs ──────────────────────────────────────────────────── */
const OpenAIMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0L4.06 14.196a4.504 4.504 0 01-1.72-6.3zm16.597 3.855l-5.843-3.372L15.11 7.21a.076.076 0 01.071 0l4.762 2.749a4.5 4.5 0 01-.689 8.122V12.56a.786.786 0 00-.385-.68zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.76-2.744a4.5 4.5 0 016.656 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08-4.778 2.758a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
)

const N8nMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden>
    <circle cx="10" cy="30" r="8" fill="#EA580C" />
    <circle cx="30" cy="10" r="8" fill="#EA580C" />
    <circle cx="50" cy="30" r="8" fill="#EA580C" />
    <circle cx="30" cy="50" r="8" fill="#EA580C" />
    <line x1="10" y1="30" x2="30" y2="10" stroke="#EA580C" strokeWidth="2.5" opacity="0.55" />
    <line x1="30" y1="10" x2="50" y2="30" stroke="#EA580C" strokeWidth="2.5" opacity="0.55" />
    <line x1="50" y1="30" x2="30" y2="50" stroke="#EA580C" strokeWidth="2.5" opacity="0.55" />
    <line x1="30" y1="50" x2="10" y2="30" stroke="#EA580C" strokeWidth="2.5" opacity="0.55" />
  </svg>
)

const WhatsAppMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const StripeMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
  </svg>
)

const ArrowRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
    <path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Appel de Qualification & Diagnostic',
    desc: 'Premier échange court pour filtrer les prospects et identifier les goulots d\'étranglement réels de votre activité. Aucun pitch — uniquement de l\'écoute structurée.',
  },
  {
    n: '02',
    title: 'Planification Stratégique & Booking',
    desc: 'Réservation Calendly immédiate. Confirmations automatiques WhatsApp à J‑1 puis 3 heures avant le rendez‑vous pour zéro no‑show.',
  },
  {
    n: '03',
    title: 'Session de Closing & Audit Visuel',
    desc: 'Démonstration Miro de votre futur workflow d\'agent vocal. Acompte sécurisé en fin de session pour verrouiller le créneau d\'implémentation.',
  },
  {
    n: '04',
    title: 'Suivi Post‑Intervention',
    desc: 'Check‑in à J+3 après la mise en service : ajustements de ton, calibrage du vocabulaire métier, validation des premiers appels traités.',
  },
  {
    n: '05',
    title: 'Programme Témoignage',
    desc: 'À J+30, capture vidéo de votre retour d\'expérience. En contrepartie, remboursement de 25 % des frais de setup.',
  },
  {
    n: '06',
    title: 'Optimisation & Upsell',
    desc: 'À J+45, transition vers les systèmes Premium : multi‑agents, intégrations CRM avancées, reporting hebdomadaire automatisé.',
  },
]

const OFFERS = [
  {
    code: 'MÉCA360',
    title: 'Mécanicien',
    agent: 'Agent MécaPro',
    desc: 'Prise de RDV automatisée pour entretien, diagnostic et dépannage. Filtrage des urgences et estimation immédiate par téléphone.',
    bullets: ['Triage panne vs. entretien', 'Devis vocal immédiat', 'Synchronisation agenda atelier', 'Rappel client J‑1'],
  },
  {
    code: 'PLOMB360',
    title: 'Plombier',
    agent: 'Agent PlombPro',
    desc: 'Réponse immédiate aux fuites, dégâts des eaux et urgences sanitaires. Priorisation automatique selon la gravité déclarée.',
    bullets: ["Triage urgence fuite d'eau", 'Géolocalisation artisan proche', 'RDV prioritaire J+0', 'Notification patron WhatsApp'],
  },
  {
    code: 'SERR360',
    title: 'Serrurier',
    agent: 'Agent SerrPro',
    desc: 'Disponible 24h/24 pour ouvertures de porte, pertes de clés et effractions. Validation d\'identité vocale et dispatch GPS.',
    bullets: ['Ouverture porte urgence', 'Validation identité vocale', 'Devis immédiat téléphone', 'Dispatch technicien GPS'],
  },
]

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function MonolithAIPage() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${syne.variable} ${dm.variable} font-[var(--font-dm)] text-white antialiased`}>
      {/* ── Global gradient + base styles ── */}
      <style jsx global>{`
        :root {
          --bg-0: #050a1f;
          --bg-1: #07103a;
          --bg-2: #0b1a5e;
          --bg-3: #15287a;
          --line: rgba(255, 255, 255, 0.08);
          --line-soft: rgba(255, 255, 255, 0.05);
          --ink: #ffffff;
          --ink-soft: #b6c0dd;
          --ink-mute: #7c87a8;
          --accent: #6b8cff;
        }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107, 140, 255, 0.18), transparent 60%),
            radial-gradient(ellipse 60% 50% at 100% 20%, rgba(64, 96, 220, 0.12), transparent 60%),
            radial-gradient(ellipse 70% 60% at 0% 80%, rgba(20, 40, 120, 0.25), transparent 65%),
            linear-gradient(180deg, #0a1340 0%, #06102f 40%, #04081f 100%);
          background-attachment: fixed;
          color: var(--ink);
          font-family: var(--font-dm), system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 8px; }
        @keyframes flowDash { to { stroke-dashoffset: -24; } }
        @keyframes softPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .wf-flow { stroke-dasharray: 5 5; animation: flowDash 2.4s linear infinite; }
        .soft-pulse { animation: softPulse 3s ease-in-out infinite; }
      `}</style>

      {/* ════════════════════════════════════════════════════════════ HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-[#04081f]/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6">
          <a href="#" className="flex items-center gap-3 no-underline">
            {!logoError ? (
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Monolith AI"
                  fill
                  sizes="(max-width: 640px) 32px, 36px"
                  style={{ objectFit: 'contain' }}
                  onError={() => setLogoError(true)}
                  preload
                />
              </div>
            ) : (
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--accent)] text-sm font-extrabold tracking-tight">
                M
              </div>
            )}
            <span className="font-[var(--font-syne)] text-[1.05rem] font-semibold tracking-tight text-white">
              Monolith<span className="font-light text-white/60"> AI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {[
              { label: 'Solutions', href: '#solutions' },
              { label: 'Processus', href: '#processus' },
              { label: 'Technologie', href: '#technologie' },
              { label: 'Contact', href: '#contact' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/65 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]"
          >
            Réserver un appel
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════ HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-32 pb-24">
        {/* soft orbs */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(107,140,255,0.22),transparent_60%)] blur-2xl" />
        <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(80,130,255,0.18),transparent_60%)] blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-white/75 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] soft-pulse" />
            Agence d&apos;automatisation IA · France
          </span>

          <h1 className="font-[var(--font-syne)] text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            L&apos;excellence de l&apos;automatisation
            <br />
            et des{' '}
            <span className="bg-gradient-to-r from-white via-[#cfd8ff] to-[#8aa0ff] bg-clip-text text-transparent">
              Agents Vocaux IA
            </span>
            <br />
            pour les PME françaises.
          </h1>

          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--ink-soft)] sm:text-lg">
            Nous concevons et déployons des systèmes d&apos;agents vocaux et de workflows n8n
            qui répondent à 100 % de vos appels, qualifient vos prospects et remplissent
            votre agenda — pendant que vous travaillez sur le terrain.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#06102f] shadow-[0_20px_60px_-15px_rgba(107,140,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_70px_-15px_rgba(107,140,255,0.7)]"
            >
              Réserver mon appel stratégique
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#processus"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
            >
              Découvrir notre processus
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.18em] text-white/40">
            <span>OpenAI GPT‑4o</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>n8n Cloud</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>WhatsApp Business</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Stripe</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ TECH GRAPH */}
      <section id="technologie" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Infrastructure
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
              Une stack IA pensée pour la production.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
              Chaque appel entrant déclenche une orchestration précise entre nos agents IA,
              vos outils métier et vos clients — entièrement automatisée, supervisée et auditable.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.04]">
            {/* topbar */}
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-6 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-xs font-medium text-white/45">
                monolith‑ai · agent‑vocal.workflow.n8n
              </span>
              <span className="ml-auto flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
                Live
              </span>
            </div>

            {/* graph */}
            <div className="overflow-x-auto px-6 py-10 sm:px-10">
              <svg
                viewBox="0 0 980 320"
                className="block w-full min-w-[720px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker id="ar" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
                  </marker>
                  <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(107,140,255,0)" />
                    <stop offset="50%" stopColor="rgba(107,140,255,0.85)" />
                    <stop offset="100%" stopColor="rgba(107,140,255,0)" />
                  </linearGradient>
                </defs>

                {/* base paths */}
                <line x1="160" y1="160" x2="248" y2="160" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" markerEnd="url(#ar)" />
                <line x1="378" y1="160" x2="458" y2="160" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" markerEnd="url(#ar)" />
                <path d="M578 144 C618 144 638 80 678 80" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" fill="none" markerEnd="url(#ar)" />
                <line x1="578" y1="160" x2="678" y2="160" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" markerEnd="url(#ar)" />
                <path d="M578 176 C618 176 638 240 678 240" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" fill="none" markerEnd="url(#ar)" />
                <line x1="798" y1="80" x2="870" y2="148" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" markerEnd="url(#ar)" />
                <line x1="798" y1="160" x2="870" y2="160" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" markerEnd="url(#ar)" />
                <line x1="798" y1="240" x2="870" y2="172" stroke="rgba(255,255,255,0.14)" strokeWidth="1.25" markerEnd="url(#ar)" />

                {/* animated flow */}
                <line className="wf-flow" x1="160" y1="160" x2="248" y2="160" stroke="url(#flow)" strokeWidth="1.75" />
                <line className="wf-flow" x1="378" y1="160" x2="458" y2="160" stroke="url(#flow)" strokeWidth="1.75" style={{ animationDelay: '0.4s' }} />
                <line className="wf-flow" x1="578" y1="160" x2="678" y2="160" stroke="url(#flow)" strokeWidth="1.75" style={{ animationDelay: '0.8s' }} />

                {/* nodes */}
                {/* trigger */}
                <g>
                  <rect x="20" y="124" width="140" height="72" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
                  <text x="90" y="148" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">TRIGGER</text>
                  <text x="90" y="170" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">Appel entrant</text>
                  <text x="90" y="186" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5">24h / 24 · 7j / 7</text>
                </g>
                {/* openai */}
                <g>
                  <rect x="248" y="124" width="130" height="72" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
                  <text x="313" y="148" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">AI AGENT</text>
                  <text x="313" y="170" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">OpenAI GPT‑4o</text>
                  <text x="313" y="186" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5">Voice NLU · TTS</text>
                </g>
                {/* n8n */}
                <g>
                  <rect x="458" y="124" width="120" height="72" rx="14" fill="rgba(234,88,12,0.06)" stroke="rgba(234,88,12,0.35)" />
                  <text x="518" y="148" textAnchor="middle" fill="rgba(234,88,12,0.85)" fontSize="9" letterSpacing="2">ORCHESTRATOR</text>
                  <text x="518" y="170" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">n8n Workflow</text>
                  <text x="518" y="186" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5">Routing · Logic</text>
                </g>
                {/* whatsapp */}
                <g>
                  <rect x="678" y="44" width="120" height="72" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
                  <text x="738" y="68" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">NOTIFY</text>
                  <text x="738" y="89" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">WhatsApp</text>
                  <text x="738" y="105" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5">Alerte patron</text>
                </g>
                {/* calendar */}
                <g>
                  <rect x="678" y="124" width="120" height="72" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
                  <text x="738" y="148" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">BOOKING</text>
                  <text x="738" y="170" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">Rendez‑vous</text>
                  <text x="738" y="186" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5">Cal.com · Calendly</text>
                </g>
                {/* stripe */}
                <g>
                  <rect x="678" y="204" width="120" height="72" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
                  <text x="738" y="228" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">PAYMENT</text>
                  <text x="738" y="249" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">Acompte Stripe</text>
                  <text x="738" y="265" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5">Sécurisé · 3DS</text>
                </g>
                {/* output */}
                <g>
                  <rect x="870" y="128" width="90" height="64" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />
                  <text x="915" y="152" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2">OUTPUT</text>
                  <text x="915" y="172" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">Patron</text>
                  <text x="915" y="187" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">Notifié · Booké</text>
                </g>
              </svg>
            </div>

            {/* tech chips */}
            <div className="flex flex-wrap gap-2.5 border-t border-white/[0.06] px-6 py-5 sm:px-10">
              {[
                { label: 'OpenAI GPT‑4o', Icon: OpenAIMark },
                { label: 'n8n', Icon: N8nMark },
                { label: 'WhatsApp Business', Icon: WhatsAppMark },
                { label: 'Stripe', Icon: StripeMark },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/75 transition-colors duration-300 hover:border-white/20 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ PROCESS */}
      <section id="processus" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Méthode
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
              Notre Processus de Partenariat
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
              Six étapes calibrées pour transformer un appel de qualification en partenariat
              long terme — sans friction, sans perte d&apos;information, sans no‑show.
            </p>
          </div>

          <ol className="relative space-y-5">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.n}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.04] sm:p-9"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
                  <div className="shrink-0">
                    <div className="font-[var(--font-syne)] text-3xl font-semibold tracking-tight text-white/30 transition-colors duration-500 group-hover:text-white/60 sm:text-4xl">
                      {step.n}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[var(--font-syne)] text-xl font-semibold tracking-tight text-white sm:text-[1.4rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-[0.97rem] leading-relaxed text-[var(--ink-soft)]">
                      {step.desc}
                    </p>
                  </div>
                  <div className="hidden text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/55 sm:block">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ OFFERS */}
      <section id="solutions" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Solutions sectorielles
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
              Trois niches. Une technologie.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
              Chaque agent vocal est calibré pour le vocabulaire métier, les urgences
              et les workflows spécifiques à votre secteur.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {OFFERS.map((o) => (
              <article
                key={o.code}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.2] hover:bg-white/[0.05]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                    {o.code}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/70">
                    {o.agent}
                  </span>
                </div>
                <h3 className="font-[var(--font-syne)] text-2xl font-semibold tracking-tight text-white">
                  {o.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                  {o.desc}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-6">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center gap-2 text-sm text-white/55 transition-colors duration-300 group-hover:text-white">
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ CONTACT / CALENDLY */}
      <section id="contact" className="relative overflow-hidden px-6 py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(107,140,255,0.18),transparent_65%)] blur-2xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Prochaine étape
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Prêt à automatiser
              <br />
              <span className="bg-gradient-to-r from-white via-[#cfd8ff] to-[#8aa0ff] bg-clip-text text-transparent">
                votre croissance ?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              Réservez un appel stratégique gratuit de 30 minutes. Nous analysons votre
              activité et vous présentons un plan d&apos;action personnalisé.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.03] shadow-[0_40px_120px_-30px_rgba(20,40,120,0.6)] backdrop-blur-md">
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-6 py-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
              <span className="text-xs font-medium text-white/65">
                Disponibilités en temps réel · Appel stratégique 30 min · Gratuit
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full min-h-[560px] sm:aspect-[16/11] sm:min-h-[640px] lg:aspect-[16/10] lg:min-h-[720px]">
              <iframe
                src="https://calendly.com/monolith-ai/appel-strategie"
                title="Réserver un appel Monolith AI"
                loading="lazy"
                className="absolute inset-0 block h-full w-full border-0 bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-md">
              <div className="mb-4 flex items-center gap-3">
                {!logoError ? (
                  <div className="relative h-8 w-8">
                    <Image
                      src="/logo.png"
                      alt="Monolith AI"
                      fill
                      sizes="32px"
                      style={{ objectFit: 'contain' }}
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--accent)] text-xs font-extrabold">
                    M
                  </div>
                )}
                <span className="font-[var(--font-syne)] text-base font-semibold tracking-tight text-white">
                  Monolith<span className="font-light text-white/60"> AI</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-mute)]">
                L&apos;agence d&apos;automatisation IA spécialisée dans les services à domicile
                français. Agents vocaux, workflows n8n, intégrations sur mesure.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-sm">
              <a href="#solutions" className="text-white/55 transition-colors hover:text-white">
                Solutions
              </a>
              <a href="#processus" className="text-white/55 transition-colors hover:text-white">
                Processus
              </a>
              <a href="#technologie" className="text-white/55 transition-colors hover:text-white">
                Technologie
              </a>
              <a href="#contact" className="text-white/55 transition-colors hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-8 text-xs text-white/40 md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Monolith AI · Tous droits réservés.</span>
            <span>Made in France · Hébergé en Europe</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
