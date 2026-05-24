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

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const ArrowRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
    <path d="M2.5 7h9M8 4l3.5 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Check = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PhoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const AlertIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 4l10 17H2L12 4zm0 6v5m0 3v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CalendarIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  { n: '01', title: 'Appel de Qualification & Diagnostic', desc: "Premier échange court pour filtrer les prospects et identifier les goulots d'étranglement réels de votre activité. Aucun pitch — uniquement de l'écoute structurée." },
  { n: '02', title: 'Planification Stratégique & Booking', desc: "Réservation Calendly immédiate. Confirmations automatiques WhatsApp à J‑1 puis 3 heures avant le rendez‑vous pour zéro no‑show." },
  { n: '03', title: 'Session de Closing & Audit Visuel', desc: "Présentation de votre futur workflow via notre framework Miro. Acompte sécurisé en fin de session pour verrouiller le créneau d'implémentation." },
  { n: '04', title: 'Suivi Post‑Intervention', desc: "Check‑in WhatsApp à J+3 après la mise en service : ajustements de ton, calibrage du vocabulaire métier, validation des premiers appels traités." },
  { n: '05', title: 'Programme Témoignage', desc: "À J+30, capture vidéo de votre retour d'expérience. En contrepartie, remboursement de 25 % des frais de setup." },
  { n: '06', title: 'Optimisation & Upsell', desc: "À J+45, transition fluide du système Business vers Premium 360 : multi‑agents, intégrations CRM avancées, reporting hebdomadaire automatisé." },
]

const PRICING = [
  {
    name: 'Essentiel',
    tag: 'Urgence',
    setup: '1 200 €',
    monthly: '400 €',
    desc: 'Pour démarrer immédiatement avec un socle d\'automatisations conversationnelles fiable.',
    features: [
      'Réponses automatiques WhatsApp 24/7',
      'Rappels & relances clients programmés',
      'Confirmations de rendez‑vous',
      'Templates métier prêts à l\'emploi',
      'Support email sous 24h',
    ],
    cta: 'Choisir Essentiel',
    highlight: false,
  },
  {
    name: 'Business',
    tag: 'Pro',
    setup: '3 000 €',
    monthly: '700 €',
    desc: 'Le système recommandé pour les artisans qui veulent capter 100 % de leurs appels.',
    features: [
      'Agent Vocal IA 24h/24 · 7j/7',
      'Détection automatique d\'urgence',
      'Alertes SMS Patron en temps réel',
      'Intégrations WhatsApp · Gmail · Calendly',
      'Tableau de bord des appels',
      'Support prioritaire',
    ],
    cta: 'Choisir Business',
    highlight: true,
  },
  {
    name: 'Premium',
    tag: '360',
    setup: '5 500 €',
    monthly: '1 000 €',
    desc: 'L\'écosystème complet — acquisition, conversion et rétention entièrement automatisées.',
    features: [
      'Tout le package Business inclus',
      'Booking automatique multi‑agendas',
      'Suivi post‑intervention automatisé',
      'Demandes d\'avis Google automatisées',
      'Analytics temps réel & reporting',
      'Account manager dédié',
    ],
    cta: 'Choisir Premium',
    highlight: false,
  },
]

/* ─── Hero Voice Agent Mockup ────────────────────────────────────────────── */
function VoiceAgentMockup() {
  return (
    <div className="relative">
      {/* ambient halo */}
      <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-[radial-gradient(circle_at_50%_30%,rgba(107,140,255,0.35),transparent_65%)] blur-2xl" />

      {/* device card */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.1] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-[0_40px_120px_-30px_rgba(20,40,120,0.7)] backdrop-blur-xl">
        {/* topbar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <div>
              <div className="font-[var(--font-syne)] text-sm font-semibold text-white">Agent MécaPro</div>
              <div className="text-[0.7rem] text-white/45">Appel entrant · +33 6 12 34 56 78</div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
            Live
          </span>
        </div>

        {/* waveform */}
        <div className="mb-6 flex h-20 items-center justify-center gap-1.5 rounded-2xl border border-white/[0.06] bg-black/20 px-4">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="wave-bar block w-[3px] rounded-full bg-gradient-to-t from-[#6b8cff] to-[#a4baff]"
              style={{ animationDelay: `${(i % 14) * 0.06}s` }}
            />
          ))}
        </div>

        {/* transcript */}
        <div className="space-y-2.5">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] px-3.5 py-2 text-[0.8rem] leading-relaxed text-white/85">
              Bonjour, mon chauffe‑eau fuit depuis ce matin, c&apos;est urgent.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[var(--accent)]/15 px-3.5 py-2 text-[0.8rem] leading-relaxed text-white/95">
              Compris. Je classe votre demande en urgence. Quelle est votre adresse pour le dispatch ?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] px-3.5 py-2 text-[0.8rem] leading-relaxed text-white/85">
              12 rue Lafayette, Lyon 6e.
            </div>
          </div>
        </div>

        {/* action chips */}
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-3 py-2.5 text-[0.72rem] text-rose-200">
            <AlertIcon className="h-3.5 w-3.5" />
            <div className="leading-tight">
              <div className="font-medium">Urgence détectée</div>
              <div className="text-[0.65rem] text-rose-200/70">SMS Patron envoyé</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.72rem] text-white/75">
            <CalendarIcon className="h-3.5 w-3.5" />
            <div className="leading-tight">
              <div className="font-medium">RDV proposé</div>
              <div className="text-[0.65rem] text-white/45">Aujourd&apos;hui · 14h30</div>
            </div>
          </div>
        </div>
      </div>

      {/* floating side metric */}
      <div className="absolute -right-4 top-12 hidden rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 backdrop-blur-xl sm:block">
        <div className="text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Appels traités</div>
        <div className="font-[var(--font-syne)] text-2xl font-semibold text-white">+ 247</div>
        <div className="text-[0.65rem] text-emerald-300">↗ Cette semaine</div>
      </div>
      <div className="absolute -left-4 bottom-8 hidden rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 backdrop-blur-xl sm:block">
        <div className="text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Temps réponse</div>
        <div className="font-[var(--font-syne)] text-2xl font-semibold text-white">0,8 s</div>
        <div className="text-[0.65rem] text-white/55">Latence moyenne</div>
      </div>
    </div>
  )
}

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
    <div className={`${syne.variable} ${dm.variable} text-white antialiased`}>
      <style jsx global>{`
        :root {
          --ink: #ffffff;
          --ink-soft: #b6c0dd;
          --ink-mute: #7c87a8;
          --accent: #6b8cff;
        }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107, 140, 255, 0.2), transparent 60%),
            radial-gradient(ellipse 60% 50% at 100% 20%, rgba(64, 96, 220, 0.12), transparent 60%),
            radial-gradient(ellipse 70% 60% at 0% 80%, rgba(20, 40, 120, 0.28), transparent 65%),
            linear-gradient(180deg, #0a1340 0%, #06102f 40%, #04081f 100%);
          background-attachment: fixed;
          color: var(--ink);
          font-family: var(--font-dm), system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 8px; }

        @keyframes wave {
          0%, 100% { height: 18%; }
          50% { height: 95%; }
        }
        .wave-bar {
          height: 30%;
          animation: wave 1.1s ease-in-out infinite;
        }
        @keyframes softPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .soft-pulse { animation: softPulse 3s ease-in-out infinite; }

        @keyframes flowDash { to { stroke-dashoffset: -24; } }
        .flow-line { stroke-dasharray: 5 5; animation: flowDash 2.4s linear infinite; }
      `}</style>

      {/* ════════════════════════════════════════════════════════ HEADER */}
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
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--accent)] text-sm font-extrabold tracking-tight">M</div>
            )}
            <span className="font-[var(--font-syne)] text-[1.05rem] font-semibold tracking-tight text-white">
              Monolith<span className="font-light text-white/60"> AI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {[
              { label: 'Notre Solution', href: '#solution' },
              { label: 'Le Processus', href: '#processus' },
              { label: 'Tarifs', href: '#tarifs' },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
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

      {/* ════════════════════════════════════════════════════════ HERO */}
      <section className="relative overflow-hidden px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="pointer-events-none absolute left-[10%] top-[20%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(107,140,255,0.25),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute right-[5%] top-[5%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(80,130,255,0.18),transparent_60%)] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-white/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] soft-pulse" />
              Agence d&apos;automatisation IA · France
            </span>

            <h1 className="font-[var(--font-syne)] text-[clamp(2.4rem,5.4vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
              L&apos;excellence de l&apos;automatisation
              <br />
              et des{' '}
              <span className="bg-gradient-to-r from-white via-[#cfd8ff] to-[#8aa0ff] bg-clip-text text-transparent">
                Agents Vocaux IA
              </span>
              <br />
              pour les PME françaises.
            </h1>

            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              Des agents vocaux qui répondent à 100 % de vos appels, qualifient
              vos prospects et remplissent votre agenda — pendant que vous
              travaillez sur le terrain.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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
                Découvrir le processus
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
              <span>OpenAI GPT‑4o</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>n8n Cloud</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>WhatsApp Business</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Stripe</span>
            </div>
          </div>

          <VoiceAgentMockup />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ SOLUTION */}
      <section id="solution" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Notre Solution
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
              Un Agent Vocal IA, disponible 24h/24.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
              Chaque appel est analysé en temps réel. Notre IA détecte l&apos;intention,
              le niveau d&apos;urgence, puis déclenche le bon scénario — alerte
              immédiate ou prise de rendez‑vous automatisée.
            </p>
          </div>

          {/* triage diagram */}
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8 backdrop-blur-sm sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
              {/* Inbound call node */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-xs rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                      <PhoneIcon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">Appel entrant</span>
                  </div>
                  <div className="font-[var(--font-syne)] text-lg font-semibold text-white">Analyse en temps réel</div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    L&apos;agent écoute, comprend le contexte et classifie la demande en moins d&apos;une seconde.
                  </p>
                </div>
              </div>

              {/* Splitter SVG */}
              <div className="flex h-full items-center justify-center">
                <svg viewBox="0 0 120 200" className="h-40 w-24" aria-hidden>
                  <defs>
                    <linearGradient id="splitter" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(107,140,255,0)" />
                      <stop offset="50%" stopColor="rgba(107,140,255,0.9)" />
                      <stop offset="100%" stopColor="rgba(107,140,255,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M0 100 C40 100, 60 30, 120 30" stroke="rgba(255,255,255,0.18)" strokeWidth="1.25" fill="none" />
                  <path d="M0 100 C40 100, 60 170, 120 170" stroke="rgba(255,255,255,0.18)" strokeWidth="1.25" fill="none" />
                  <path className="flow-line" d="M0 100 C40 100, 60 30, 120 30" stroke="url(#splitter)" strokeWidth="1.75" fill="none" />
                  <path className="flow-line" d="M0 100 C40 100, 60 170, 120 170" stroke="url(#splitter)" strokeWidth="1.75" fill="none" style={{ animationDelay: '0.6s' }} />
                </svg>
              </div>

              {/* Two outcomes */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-rose-400/25 bg-rose-400/[0.06] p-5">
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-400/15 text-rose-300">
                      <AlertIcon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-rose-300">Urgence</span>
                  </div>
                  <div className="font-[var(--font-syne)] text-base font-semibold text-white">SMS Patron immédiat</div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    Notification WhatsApp/SMS instantanée avec contexte client, adresse et niveau de criticité.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                      <CalendarIcon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300">Non‑urgence</span>
                  </div>
                  <div className="font-[var(--font-syne)] text-base font-semibold text-white">Booking Calendly automatique</div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    Réservation directe sur votre agenda + confirmation WhatsApp envoyée au client en temps réel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ PROCESSUS */}
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

          <ol className="grid gap-5 md:grid-cols-2">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.n}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-[var(--font-syne)] text-2xl font-semibold tracking-tight text-white/30 transition-colors duration-500 group-hover:text-white/60">
                    Étape {step.n}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/60" />
                </div>
                <h3 className="font-[var(--font-syne)] text-lg font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ TARIFS */}
      <section id="tarifs" className="relative px-6 py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(107,140,255,0.12),transparent_65%)] blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Tarifs
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
              Trois formules. Une promesse : la conversion.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
              Un setup unique, puis un abonnement mensuel transparent. Sans engagement
              caché, sans frais d&apos;activation cachés.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PRICING.map((p) => (
              <article
                key={p.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
                  p.highlight
                    ? 'border border-[var(--accent)]/40 bg-gradient-to-b from-[var(--accent)]/[0.12] to-white/[0.02] shadow-[0_30px_80px_-20px_rgba(107,140,255,0.4)]'
                    : 'border border-white/[0.08] bg-white/[0.025] hover:border-white/[0.18]'
                }`}
              >
                {p.highlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-white px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#06102f]">
                    Recommandé
                  </span>
                )}
                <div className="mb-1 flex items-baseline gap-2">
                  <h3 className="font-[var(--font-syne)] text-2xl font-semibold tracking-tight text-white">
                    {p.name}
                  </h3>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{p.desc}</p>

                <div className="my-7 border-y border-white/[0.06] py-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-[var(--font-syne)] text-4xl font-semibold tracking-tight text-white">
                      {p.setup}
                    </span>
                    <span className="text-xs uppercase tracking-[0.16em] text-white/50">Setup</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-[var(--font-syne)] text-xl font-semibold text-white/85">
                      + {p.monthly}
                    </span>
                    <span className="text-xs uppercase tracking-[0.16em] text-white/50">/ mois</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${p.highlight ? 'bg-[var(--accent)]/25 text-[var(--accent)]' : 'bg-white/10 text-white/65'}`}>
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                    p.highlight
                      ? 'bg-white text-[#06102f] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]'
                      : 'border border-white/15 text-white hover:border-white/35 hover:bg-white/[0.06]'
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ CONTACT */}
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

      {/* ════════════════════════════════════════════════════════ FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-md">
              <div className="mb-4 flex items-center gap-3">
                {!logoError ? (
                  <div className="relative h-8 w-8">
                    <Image src="/logo.png" alt="Monolith AI" fill sizes="32px" style={{ objectFit: 'contain' }} onError={() => setLogoError(true)} />
                  </div>
                ) : (
                  <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--accent)] text-xs font-extrabold">M</div>
                )}
                <span className="font-[var(--font-syne)] text-base font-semibold tracking-tight text-white">
                  Monolith<span className="font-light text-white/60"> AI</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-mute)]">
                L&apos;agence d&apos;automatisation IA spécialisée dans les services à domicile français.
                Agents vocaux, workflows n8n, intégrations sur mesure.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-sm">
              <a href="#solution" className="text-white/55 transition-colors hover:text-white">Notre Solution</a>
              <a href="#processus" className="text-white/55 transition-colors hover:text-white">Le Processus</a>
              <a href="#tarifs" className="text-white/55 transition-colors hover:text-white">Tarifs</a>
              <a href="#contact" className="text-white/55 transition-colors hover:text-white">Contact</a>
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
