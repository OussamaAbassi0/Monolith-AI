'use client'

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
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
const MicIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 11a7 7 0 0014 0M12 18v3M8.5 21h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PlayIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M8 5.5v13a1 1 0 001.52.85l10-6.5a1 1 0 000-1.7l-10-6.5A1 1 0 008 5.5z" />
  </svg>
)
const PauseIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <rect x="6" y="5" width="4" height="14" rx="1.2" />
    <rect x="14" y="5" width="4" height="14" rx="1.2" />
  </svg>
)
const WrenchIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M14.5 6a3.5 3.5 0 00-4.9 4.3L4 15.9a2 2 0 002.8 2.8l5.6-5.6A3.5 3.5 0 1018 8l-2.3 2.3-1.9-1.9L16 6a3.5 3.5 0 00-1.5 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)
const BoltIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)
const KeyIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="7.5" cy="16.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 14L20 4M17 4h3v3M15.5 7.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const DoubleCheck = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 20 16" fill="none" className={className} aria-hidden>
    <path d="M1 8.5l3.2 3.2L11 4.5M8.5 11.7l.7.7L16 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ChatIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9A1.5 1.5 0 0118.5 16H9l-4 3.5V16H5.5A1.5 1.5 0 014 14.5v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/* ─── SMS & WhatsApp badge ───────────────────────────────────────────────── */
function ChannelBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-1.5 text-xs font-medium text-emerald-200 ${className}`}>
      <ChatIcon className="h-3.5 w-3.5" />
      Fonctionne sur WhatsApp <span className="text-emerald-300/50">&amp;</span> SMS classique
    </span>
  )
}

/* ─── Brand marks (integration ticker) ──────────────────────────────────── */
const MetaMark = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3 15.5c0-3.6 1.9-7 4.4-7 1.6 0 2.7 1.2 4.6 4.3 1.9-3.1 3-4.3 4.6-4.3 2.5 0 4.4 3.4 4.4 7 0 2-1 3.3-2.6 3.3-1.5 0-2.4-.9-4-3.6l-1-1.7-1 1.7c-1.6 2.7-2.5 3.6-4 3.6C4 18.8 3 17.5 3 15.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)
const WhatsAppMark = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1L4 20z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9 9c0 3 2.2 5.2 5 5.2.6 0 1.2-.5 1.2-1.1 0-.3-.9-.7-1.2-.8-.4-.1-.6.4-.9.4-.7 0-2.3-1.6-2.3-2.3 0-.3.5-.5.4-.9-.1-.3-.5-1.2-.8-1.2-.6 0-1.1.6-1.1 1.2z"
      fill="currentColor"
    />
  </svg>
)
const MapsMark = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 21s6-5.3 6-10a6 6 0 10-12 0c0 4.7 6 10 6 10z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const StripeMark = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M14.5 9.2c-1-.5-1.9-.8-1.9-1.4 0-.5.4-.7 1.1-.7 1 0 2.1.4 2.9.9V5.2A7 7 0 0013.8 5C11.5 5 10 6.3 10 8.2c0 2.4 3 2.7 3 3.8 0 .5-.5.7-1.2.7-1 0-2.4-.5-3.3-1v2.8c1 .5 2.2.7 3.3.7 2.4 0 4-1.2 4-3.2 0-2.6-3-2.9-3-3.8z"
      fill="currentColor"
    />
  </svg>
)

const INTEGRATIONS: { name: string; Mark: (p: { className?: string }) => ReactNode }[] = [
  { name: 'Meta', Mark: MetaMark },
  { name: 'WhatsApp Business', Mark: WhatsAppMark },
  { name: 'Google Maps', Mark: MapsMark },
  { name: 'Stripe', Mark: StripeMark },
]

function IntegrationTicker() {
  const row = [...INTEGRATIONS, ...INTEGRATIONS]
  return (
    <div className="ticker-mask w-full overflow-hidden">
      <div className="ticker-track items-center gap-x-12">
        {row.map((it, i) => (
          <span
            key={`${it.name}-${i}`}
            className="flex shrink-0 items-center gap-2.5 text-white/45"
          >
            <it.Mark className="h-5 w-5" />
            <span className="whitespace-nowrap text-sm font-medium tracking-tight">{it.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Social proof avatars ───────────────────────────────────────────────── */
const AVATARS = [
  { initials: 'JM', color: '#3d7bfd' },
  { initials: 'KB', color: '#12a150' },
  { initials: 'SL', color: '#b4530a' },
  { initials: 'AR', color: '#6b4ffd' },
]

function SocialProof() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/[0.03] px-3 py-2">
      <div className="flex -space-x-2.5">
        {AVATARS.map((a) => (
          <span
            key={a.initials}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--bg)] text-[0.62rem] font-semibold text-white"
            style={{ backgroundColor: a.color }}
          >
            {a.initials}
          </span>
        ))}
      </div>
      <span className="pr-1.5 text-sm font-medium text-white/75">
        <span className="font-semibold text-white">+110 artisans</span> nous font confiance
      </span>
    </div>
  )
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Comment l'IA apprend mon métier ?",
    a: "Lors de l'installation, nous entraînons l'agent sur votre vocabulaire, vos prestations et votre grille tarifaire. Ensuite, grâce à la technologie « Earn to Learn », il s'améliore à chaque appel et chaque conversation — il affine ses réponses et maîtrise vos termes techniques en quelques semaines.",
  },
  {
    q: 'Puis-je garder mon numéro WhatsApp ?',
    a: "Oui. L'agent se connecte à votre WhatsApp Business existant (ou à votre ligne SMS). Vos clients continuent d'écrire au même numéro — c'est l'IA qui répond à votre place, sans changement pour eux.",
  },
  {
    q: 'Est-ce que je perds le contrôle sur mes clients ?',
    a: "Jamais. Vous gardez la main à tout moment : l'agent vous notifie des urgences par SMS, vous pouvez reprendre une conversation manuellement, et chaque rendez-vous est visible dans votre agenda. L'IA travaille pour vous, pas à votre place.",
  },
  {
    q: 'Combien de temps pour être opérationnel ?',
    a: "Comptez 5 à 7 jours entre l'appel de qualification et la mise en service. Nous configurons, testons et calibrons l'agent avec vous avant qu'il ne traite son premier vrai client.",
  },
  {
    q: 'Que se passe-t-il si l\'IA ne comprend pas une demande ?',
    a: "L'agent est conçu pour ne jamais laisser un client sans réponse. En cas de doute ou de demande complexe, il escalade automatiquement vers vous par SMS avec le contexte complet, pour que vous repreniez la main immédiatement.",
  },
]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
            Questions fréquentes
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Vous vous posez la question ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            Les réponses aux objections les plus fréquentes des artisans avant de passer à l&apos;IA.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? 'border-[var(--accent)]/40 bg-white/[0.03]' : 'border-[var(--line)] bg-white/[0.015]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-[var(--font-syne)] text-[1.02rem] font-semibold tracking-tight text-white">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]'
                        : 'border-white/15 text-white/60'
                    }`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-panel ${isOpen ? 'open' : ''}`}>
                  <div>
                    <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── YouTube video showcase ─────────────────────────────────────────────── */
function VideoShowcase({ videoId = '0LT64_mgkro' }: { videoId?: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <section id="video" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
            En vidéo
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Voyez Monolith AI en action.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            Une démonstration complète : de l&apos;appel entrant à la prise de rendez‑vous automatisée,
            en passant par la relance et la détection d&apos;urgence.
          </p>
        </div>

        {/* multi-language capability badge */}
        <div className="mx-auto mb-8 flex w-fit max-w-3xl items-center gap-3 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.07] px-5 py-3.5 text-center sm:rounded-full sm:text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[0.9rem] leading-snug text-white/85">
            L&apos;IA comprend et répond naturellement dans toutes les langues{' '}
            <span className="text-[var(--ink-soft)]">(Français, Anglais, Espagnol, Deutsch...)</span>
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Démonstration Monolith AI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Lire la vidéo de démonstration"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Aperçu de la démonstration Monolith AI"
                fill
                sizes="(max-width: 1024px) 92vw, 960px"
                className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                unoptimized
              />
              <span className="absolute inset-0 bg-black/40" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform duration-300 group-hover:scale-105">
                <PlayIcon className="h-8 w-8 translate-x-0.5" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Paliers (Comment ça marche) ────────────────────────────────────────── */
const PALIERS = [
  {
    id: 'p1',
    n: 'Palier 1',
    title: 'Client écrit directement sur WhatsApp',
    desc: "Le prospect envoie un message sur votre WhatsApp Business (ou par SMS). L'agent répond en quelques secondes, qualifie la demande et propose un créneau — sans que vous touchiez votre téléphone.",
    client: { src: '/WhatsApp Image 2026-08-08 at 06.03.13 (2).jpeg', w: 1600, h: 831 },
    artisan: { src: '/WhatsApp Image 2026-08-08 at 06.03.13 (3).jpeg', w: 1600, h: 831 },
  },
  {
    id: 'p2',
    n: 'Palier 2',
    title: "Appel manqué, l'IA relance le client",
    desc: "Vous êtes sur un chantier et un appel passe en absence. L'agent envoie immédiatement une relance WhatsApp/SMS, engage la conversation et récupère le lead avant qu'il n'appelle un concurrent.",
    client: { src: '/WhatsApp Image 2026-08-09 at 02.36.24.jpeg', w: 1201, h: 627 },
    artisan: { src: '/WhatsApp Image 2026-08-09 at 02.35.50.jpeg', w: 1273, h: 660 },
  },
  {
    id: 'p3',
    n: 'Palier 3',
    title: 'No‑show, reprise de créneau',
    desc: "Un client ne se présente pas au rendez‑vous. L'agent le recontacte automatiquement, comprend l'imprévu et repositionne un nouveau créneau — votre agenda ne reste jamais vide.",
    client: { src: '/WhatsApp Image 2026-08-08 at 06.04.14 (1).jpeg', w: 1600, h: 831 },
    artisan: { src: '/WhatsApp Image 2026-08-08 at 06.04.15 (1).jpeg', w: 1600, h: 831 },
  },
]

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
    desc: 'Pour les artisans qui veulent démarrer immédiatement avec un socle d\'automatisations conversationnelles fiable.',
    features: [
      'Réponses automatiques WhatsApp 24/7',
      'Rappels & relances clients programmés',
      'Confirmations de rendez‑vous',
      'Templates métier prêts à l\'emploi',
      'Support email sous 24h',
    ],
    cta: 'Réserver un appel stratégique',
    highlight: false,
  },
  {
    name: 'Business',
    tag: 'Pro',
    desc: 'Le système recommandé pour les artisans qui veulent capter 100 % de leurs appels.',
    earnToLearn: {
      title: 'Technologie « Earn to Learn » via Supabase',
      body: "L'IA apprend en continu de vos clients et s'améliore chaque jour grâce à une synchronisation sécurisée sur notre base de données Supabase.",
    },
    features: [
      'Agent Vocal IA 24h/24 · 7j/7',
      'Technologie « Earn to Learn » via Supabase',
      'Détection automatique d\'urgence',
      'Alertes SMS Patron en temps réel',
      'Intégrations WhatsApp · Gmail · Calendly',
      'Tableau de bord des appels',
      'Support prioritaire',
    ],
    cta: 'Réserver un appel stratégique',
    highlight: true,
  },
  {
    name: 'Premium',
    tag: '360',
    desc: 'L\'infrastructure premium complète pour les artisans — acquisition, conversion et rétention entièrement automatisées.',
    earnToLearn: {
      title: 'Système « Earn to Learn » Autonome Avancé',
      body: "Infrastructure Supabase dédiée pour une adaptation totale aux habitudes de l'entreprise. Apprentissage continu, autonome et entièrement isolé.",
    },
    spotlight: {
      title: 'IA Apprenante & Autonome',
      body: "Votre agent vocal apprend en continu à partir de vos appels, de vos données métier et des interactions clients. Il s'adapte de manière autonome, affine son vocabulaire, ses réponses et ses décisions — et devient chaque jour plus précis et plus pertinent pour votre environnement.",
    },
    features: [
      'Tout le package Business inclus',
      'Système « Earn to Learn » Autonome Avancé',
      'Booking automatique multi‑agendas',
      'Suivi post‑intervention automatisé',
      'Demandes d\'avis Google automatisées',
      'Analytics temps réel & reporting',
      'Account manager dédié',
    ],
    cta: 'Réserver un appel stratégique',
    highlight: false,
  },
]

type ChatMsg = { from: 'client' | 'agent'; text: string; time: string }
type UseCase = {
  id: string
  label: string
  Icon: (props: { className?: string }) => ReactNode
  client: string
  context: string
  messages: ChatMsg[]
}

const CHAT_USE_CASES: UseCase[] = [
  {
    id: 'plombier',
    label: 'Plombier',
    Icon: WrenchIcon,
    client: 'Mme Durand',
    context: 'Fuite sous évier',
    messages: [
      { from: 'client', text: "Bonjour, j'ai une fuite d'eau sous mon évier depuis ce matin, c'est urgent 😰", time: '09:12' },
      { from: 'agent', text: "Bonjour Mme Durand ! Une fuite peut vite s'aggraver. Avez-vous pu couper l'arrivée d'eau sous l'évier ?", time: '09:12' },
      { from: 'client', text: "Oui je viens de la couper", time: '09:13' },
      { from: 'agent', text: "Parfait 👍 Un artisan peut passer aujourd'hui entre 14h et 16h. Je vous réserve ce créneau ?", time: '09:13' },
      { from: 'client', text: "Oui parfait, merci beaucoup", time: '09:14' },
      { from: 'agent', text: "C'est noté ✅ RDV confirmé aujourd'hui 14h–16h. Vous recevez la confirmation par WhatsApp. À tout à l'heure !", time: '09:14' },
    ],
  },
  {
    id: 'electricien',
    label: 'Électricien',
    Icon: BoltIcon,
    client: 'M. Bianchi',
    context: 'Tableau qui disjoncte',
    messages: [
      { from: 'client', text: "Bonsoir, mon tableau électrique disjoncte sans arrêt depuis 1h, je n'ai plus de courant au rez‑de‑chaussée", time: '20:47' },
      { from: 'agent', text: "Bonsoir M. Bianchi. Je classe votre demande en priorité ⚡ Est‑ce que ça sent le brûlé ou est‑ce uniquement une coupure ?", time: '20:47' },
      { from: 'client', text: "Non pas d'odeur, juste ça saute quand je remets le disjoncteur", time: '20:48' },
      { from: 'agent', text: "Compris. Ne forcez pas le réarmement. Un électricien peut intervenir demain à 8h30, ou ce soir en urgence (+ majoration). Que préférez‑vous ?", time: '20:48' },
      { from: 'client', text: "Demain 8h30 c'est parfait", time: '20:49' },
      { from: 'agent', text: "Réservé ✅ Demain 8h30. J'ai alerté le patron de votre dossier. Rappel WhatsApp envoyé 1h avant. Bonne soirée !", time: '20:49' },
    ],
  },
  {
    id: 'serrurier',
    label: 'Serrurier',
    Icon: KeyIcon,
    client: 'Léa M.',
    context: 'Porte claquée',
    messages: [
      { from: 'client', text: "Bonjour j'ai claqué ma porte avec les clés à l'intérieur, je suis dehors avec mon bébé 😩", time: '13:02' },
      { from: 'agent', text: "Bonjour Léa, je comprends l'urgence 🙏 Vous êtes bien au 8 rue Victor Hugo ? La porte est‑elle simplement claquée ou verrouillée à clé ?", time: '13:02' },
      { from: 'client', text: "Oui c'est ça, juste claquée", time: '13:03' },
      { from: 'agent', text: "Parfait, ouverture simple sans dégât. Un serrurier est à 12 min de chez vous, j'envoie une intervention immédiate ?", time: '13:03' },
      { from: 'client', text: "Oui allez‑y vite svp !", time: '13:03' },
      { from: 'agent', text: "En route ✅ Arrivée estimée 13h15. Vous recevez le nom et le numéro de l'artisan par WhatsApp. Restez au chaud avec bébé 💙", time: '13:04' },
    ],
  },
]

const METRICS = [
  { value: '+35%', label: 'de devis signés', sub: 'sur 3 mois' },
  { value: 'Zéro', label: 'appel manqué', sub: '24h/24 · 7j/7' },
  { value: '× 2', label: 'de RDV honorés', sub: 'rappels auto' },
  { value: '0,8 s', label: 'temps de réponse', sub: 'latence moyenne' },
]

const VOICE_TRANSCRIPT: { at: number; from: 'client' | 'agent'; text: string }[] = [
  { at: 0, from: 'client', text: "Allô ? Bonjour, je vous appelle pour un devis de rénovation…" },
  { at: 22, from: 'agent', text: "Bonjour et bienvenue chez Dupont Artisans ! Avec plaisir. De quel type de travaux s'agit‑il ?" },
  { at: 46, from: 'client', text: "La réfection complète d'une salle de bain." },
  { at: 66, from: 'agent', text: "Très bien. Je note « rénovation salle de bain ». Souhaitez‑vous une visite technique cette semaine ?" },
  { at: 86, from: 'client', text: "Oui, jeudi si possible." },
  { at: 100, from: 'agent', text: "C'est réservé ✅ Jeudi 10h. Vous recevez la confirmation par SMS. Excellente journée !" },
]

const TESTIMONIALS = [
  {
    name: 'Jean Moreau',
    role: 'Artisan · Paris',
    initials: 'JM',
    headline: '+38 % de chiffre d\'affaires',
    quote: "L'agent vocal a capté une urgence à 23h un dimanche. Mon client a été pris en charge en moins de 2 minutes, et j'ai gagné un contrat de 2 800 €. En trois mois, mon chiffre d'affaires a bondi de 38 %.",
  },
  {
    name: 'Karim Benali',
    role: 'Artisan · Lyon',
    initials: 'KB',
    headline: 'Zéro appel manqué',
    quote: "Avant Monolith AI, je laissais filer 6 à 8 appels par jour quand j'étais sur un chantier. Aujourd'hui, chaque appel est traité, qualifié et planifié. Mon planning est plein deux semaines à l'avance.",
  },
  {
    name: 'Sophie Lefèvre',
    role: 'Artisan · Marseille',
    initials: 'SL',
    headline: 'Taux de conversion doublé',
    quote: "Les urgences nocturnes sont gérées sans que je touche mon téléphone. L'IA me notifie uniquement quand c'est critique. Mon taux de conversion a doublé et mes clients adorent la réactivité.",
  },
  {
    name: 'Antoine Rivière',
    role: 'Artisan · Bordeaux',
    initials: 'AR',
    headline: 'Vocabulaire métier maîtrisé',
    quote: "Ce qui me bluffe, c'est que l'agent s'améliore tout seul. Au début il confondait certains termes techniques, aujourd'hui il les maîtrise mieux que mon apprenti. Il a appris mon vocabulaire métier en quelques semaines.",
  },
  {
    name: 'Mehdi Cherif',
    role: 'Artisan · Toulouse',
    initials: 'MC',
    headline: 'Qualification 100 % automatique',
    quote: "L'IA apprend de chaque appel — elle anticipe maintenant les bonnes questions à poser pour qualifier une demande. C'est comme avoir une secrétaire qui maîtrise mon métier, sans pause, sans congé.",
  },
  {
    name: 'Laurent Pasquier',
    role: 'Artisan · Nantes',
    initials: 'LP',
    headline: '+22 % de RDV honorés',
    quote: "Au bout de trois mois, l'agent a intégré tout notre catalogue de prestations et notre grille tarifaire. Il qualifie les devis avec une précision que je n'aurais pas crue possible. + 22 % de RDV honorés depuis qu'on l'utilise.",
  },
]

/* ─── Hero Voice Agent Mockup ────────────────────────────────────────────── */
function VoiceAgentMockup() {
  return (
    <div className="relative">
      {/* device card */}
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6">
        {/* topbar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <div>
              <div className="font-[var(--font-syne)] text-sm font-semibold text-white">Agent Artisan</div>
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
              className="wave-bar block w-[3px] rounded-full bg-[var(--accent)]"
              style={{ animationDelay: `${(i % 14) * 0.06}s` }}
            />
          ))}
        </div>

        {/* transcript */}
        <div className="space-y-2.5">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] px-3.5 py-2 text-[0.8rem] leading-relaxed text-white/85">
              Bonjour, j&apos;ai une urgence à mon domicile depuis ce matin, pouvez‑vous intervenir ?
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
      <div className="absolute -right-4 top-12 hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 sm:block">
        <div className="text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Appels traités</div>
        <div className="font-[var(--font-syne)] text-2xl font-semibold text-white">+ 247</div>
        <div className="text-[0.65rem] text-emerald-300">↗ Cette semaine</div>
      </div>
      <div className="absolute -left-4 bottom-8 hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 sm:block">
        <div className="text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Temps réponse</div>
        <div className="font-[var(--font-syne)] text-2xl font-semibold text-white">0,8 s</div>
        <div className="text-[0.65rem] text-white/55">Latence moyenne</div>
      </div>
    </div>
  )
}

/* ─── Comment ça marche (Paliers tabs + client → artisan screens) ────────── */
function CommentCaMarche() {
  const [active, setActive] = useState(PALIERS[0].id)
  const [view, setView] = useState<'client' | 'artisan'>('client')
  const current = PALIERS.find((p) => p.id === active) ?? PALIERS[0]

  const selectPalier = (id: string) => {
    setActive(id)
    setView('client')
  }

  const img = view === 'client' ? current.client : current.artisan
  const label = view === 'client' ? 'Échange client' : "Résumé envoyé à l'artisan"

  return (
    <section id="comment" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
            Comment ça marche
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Trois paliers, zéro lead perdu.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            De la première prise de contact au rattrapage d&apos;un rendez‑vous manqué,
            l&apos;agent gère chaque scénario et vous envoie un résumé clair côté artisan.
          </p>
          <div className="mt-6 flex justify-center">
            <ChannelBadge />
          </div>
        </div>

        {/* tabs */}
        <div role="tablist" aria-label="Paliers" className="mb-10 flex flex-wrap justify-center gap-3">
          {PALIERS.map((p) => {
            const on = p.id === active
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={on}
                onClick={() => selectPalier(p.id)}
                className={`flex items-center gap-3 rounded-2xl border px-5 py-3 text-left transition-colors duration-300 ${
                  on
                    ? 'border-[var(--accent)]/50 bg-[var(--accent)]/10'
                    : 'border-[var(--line)] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.04]'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-[var(--font-syne)] text-sm font-semibold ${
                    on ? 'bg-[var(--accent)]/25 text-[var(--accent)]' : 'bg-white/[0.05] text-white/55'
                  }`}
                >
                  {p.n.split(' ')[1]}
                </span>
                <span className="font-[var(--font-syne)] text-sm font-semibold tracking-tight text-white">
                  {p.n}
                </span>
              </button>
            )
          })}
        </div>

        {/* active palier */}
        <div key={active} className="fade-swap">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="font-[var(--font-syne)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {current.title}
            </h3>
            <p className="mx-auto mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
              {current.desc}
            </p>
          </div>

          {/* view toggle */}
          <div className="mx-auto mb-6 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setView('client')}
                aria-pressed={view === 'client'}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                  view === 'client'
                    ? 'bg-emerald-400/15 text-emerald-200'
                    : 'text-white/55 hover:text-white/80'
                }`}
              >
                <ChatIcon className="h-3.5 w-3.5" />
                Échange client
              </button>
              <button
                type="button"
                onClick={() => setView('artisan')}
                aria-pressed={view === 'artisan'}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                  view === 'artisan'
                    ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                    : 'text-white/55 hover:text-white/80'
                }`}
              >
                <DoubleCheck className="h-3.5 w-3.5" />
                Résumé artisan
              </button>
            </div>
          </div>

          {/* large screenshot with slider arrow */}
          <div className="relative mx-auto w-full max-w-4xl">
            <figure key={view} className="fade-swap w-full">
              <figcaption
                className={`mb-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.16em] ${
                  view === 'client' ? 'text-emerald-300' : 'text-[var(--accent)]'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${view === 'client' ? 'bg-emerald-400' : 'bg-[var(--accent)]'}`} />
                {label}
              </figcaption>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
                <Image
                  src={img.src}
                  alt={label}
                  width={img.w}
                  height={img.h}
                  sizes="(max-width: 1024px) 92vw, 860px"
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </figure>

            {/* arrow toggle overlay */}
            <button
              type="button"
              onClick={() => setView((v) => (v === 'client' ? 'artisan' : 'client'))}
              aria-label={view === 'client' ? "Voir le résumé envoyé à l'artisan" : "Voir l'échange client"}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0c0d10]/90 text-white transition-transform duration-300 hover:scale-105 sm:right-4"
            >
              <ArrowRight
                className={`h-5 w-5 transition-transform duration-300 ${view === 'artisan' ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* step dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setView('client')}
              aria-label="Vue 1 · Échange client"
              className={`h-2 rounded-full transition-all duration-300 ${
                view === 'client' ? 'w-6 bg-emerald-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
            <button
              type="button"
              onClick={() => setView('artisan')}
              aria-label="Vue 2 · Résumé artisan"
              className={`h-2 rounded-full transition-all duration-300 ${
                view === 'artisan' ? 'w-6 bg-[var(--accent)]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Comparison: Sans vs Avec Monolith AI ────────────────────────────────── */
function ComparisonSection() {
  return (
    <section id="comparaison" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
            La différence
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Chaque minute compte pour un lead.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            Un prospect qui n&apos;obtient pas de réponse immédiate part chez le concurrent.
            Voici la même demande, traitée sans puis avec Monolith AI.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Without */}
          <div className="group relative overflow-hidden rounded-3xl border border-rose-400/20 bg-rose-400/[0.04] p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-400/15 text-rose-300">
                  <AlertIcon className="h-4 w-4" />
                </span>
                <span className="font-[var(--font-syne)] text-base font-semibold text-white">Sans Monolith AI</span>
              </div>
              <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-[0.65rem] font-medium text-rose-200">
                Réponse 9h plus tard
              </span>
            </div>
            <div className="mx-auto max-w-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--panel)]">
              <Image
                src="/WhatsApp Image 2026-08-08 at 06.04.14 (1).jpeg"
                alt="Sans Monolith AI : réponse 9h plus tard, lead perdu"
                width={1600}
                height={831}
                sizes="(max-width: 768px) 80vw, 360px"
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-rose-200/80">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              Lead perdu — le client a déjà appelé un concurrent.
            </p>
          </div>

          {/* With */}
          <div className="group relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.05] p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                  <Check className="h-4 w-4" />
                </span>
                <span className="font-[var(--font-syne)] text-base font-semibold text-white">Avec Monolith AI</span>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[0.65rem] font-medium text-emerald-200">
                Réponse en quelques secondes
              </span>
            </div>
            <div className="mx-auto max-w-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--panel)]">
              <Image
                src="/WhatsApp Image 2026-08-08 at 06.04.15 (1).jpeg"
                alt="Avec Monolith AI : réponse en quelques secondes, rendez-vous fixé"
                width={1600}
                height={831}
                sizes="(max-width: 768px) 80vw, 360px"
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-emerald-200/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
              Rendez‑vous confirmé — le lead est capté et planifié.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Interactive Chat Showcase (WhatsApp style, tabbed by trade) ─────────── */
function ChatShowcase() {
  const [active, setActive] = useState(CHAT_USE_CASES[0].id)
  const current = CHAT_USE_CASES.find((c) => c.id === active) ?? CHAT_USE_CASES[0]

  return (
    <section id="demo" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
            Démo interactive
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Voyez l&apos;agent gérer un vrai client.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            Choisissez votre métier et suivez une conversation réelle : le prospect
            demande un devis ou un dépannage, l&apos;agent qualifie et réserve —
            instantanément, sans que vous décrochiez.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Tabs + narrative */}
          <div>
            <div
              role="tablist"
              aria-label="Métiers"
              className="flex flex-col gap-3"
            >
              {CHAT_USE_CASES.map((c) => {
                const on = c.id === active
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(c.id)}
                    className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
                      on
                        ? 'border-[var(--accent)]/50 bg-[var(--accent)]/10'
                        : 'border-[var(--line)] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        on ? 'bg-[var(--accent)]/25 text-[var(--accent)]' : 'bg-white/[0.05] text-white/55 group-hover:text-white/80'
                      }`}
                    >
                      <c.Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-[var(--font-syne)] text-base font-semibold tracking-tight text-white">
                        {c.label}
                      </span>
                      <span className="block truncate text-[0.8rem] text-[var(--ink-soft)]">
                        {c.context} · {c.client}
                      </span>
                    </span>
                    <ArrowRight
                      className={`ml-auto h-4 w-4 shrink-0 transition-all duration-300 ${
                        on ? 'text-[var(--accent)]' : 'text-white/20 group-hover:translate-x-0.5 group-hover:text-white/50'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] px-5 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                Réponse en moins d&apos;une seconde, ton naturel, prise de RDV et
                confirmation WhatsApp — <span className="text-white">100 % automatisé.</span>
              </p>
            </div>
          </div>

          {/* Phone / WhatsApp frame */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-[36px] border border-[var(--line)] bg-[var(--panel)]">
              {/* chat header */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/25 font-[var(--font-syne)] text-sm font-semibold text-white">
                  <current.Icon className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--panel)] bg-emerald-400" />
                </span>
                <div className="min-w-0">
                  <div className="font-[var(--font-syne)] text-sm font-semibold text-white">Agent Monolith</div>
                  <div className="flex items-center gap-1.5 text-[0.7rem] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
                    en ligne · répond en 0,8 s
                  </div>
                </div>
                <span className="ml-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-white/60">
                  <PhoneIcon className="h-3 w-3" />
                  WhatsApp
                </span>
              </div>

              {/* messages */}
              <div key={active} className="chat-canvas max-h-[440px] space-y-3 overflow-y-auto px-4 py-5">
                <div className="mx-auto w-fit rounded-full bg-white/[0.06] px-3 py-1 text-[0.65rem] text-white/50">
                  Aujourd&apos;hui · {current.context}
                </div>
                {current.messages.map((m, i) => {
                  const agent = m.from === 'agent'
                  return (
                    <div
                      key={i}
                      className={`msg-in flex ${agent ? 'justify-end' : 'justify-start'}`}
                      style={{ animationDelay: `${i * 0.55 + 0.1}s` }}
                    >
                      <div
                        className={`relative max-w-[82%] px-3.5 py-2 text-[0.82rem] leading-relaxed shadow-sm ${
                          agent
                            ? 'rounded-2xl rounded-br-md bg-emerald-600 text-white'
                            : 'rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.06] text-white/90'
                        }`}
                      >
                        {m.text}
                        <span className={`mt-1 flex items-center justify-end gap-1 text-[0.6rem] ${agent ? 'text-white/70' : 'text-white/40'}`}>
                          {m.time}
                          {agent && <DoubleCheck className="h-3 w-3 text-sky-200" />}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div className="msg-in flex justify-end" style={{ animationDelay: `${current.messages.length * 0.55 + 0.2}s` }}>
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[0.62rem] font-medium text-emerald-200">
                    <CalendarIcon className="h-3 w-3" />
                    RDV réservé automatiquement
                  </span>
                </div>
              </div>

              {/* composer */}
              <div className="flex items-center gap-2.5 border-t border-white/[0.06] px-4 py-3">
                <div className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[0.75rem] text-white/35">
                  L&apos;agent répond à votre place…
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <MicIcon className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Voice Agent Demo Player ─────────────────────────────────────────────── */
function VoiceDemo() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0
        return Math.min(100, p + 0.7)
      })
    }, 90)
    return () => window.clearInterval(id)
  }, [playing])

  const activeIndex = VOICE_TRANSCRIPT.reduce(
    (acc, line, i) => (progress >= line.at ? i : acc),
    0,
  )
  const total = 42 // ~seconds of the mock call
  const elapsed = Math.round((progress / 100) * total)
  const fmt = (s: number) => `0:${String(s).padStart(2, '0')}`

  return (
    <section id="voix" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
            Agent Vocal
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Écoutez un appel réel, géré par l&apos;IA.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            Votre agent vocal décroche à la première sonnerie, comprend la demande,
            qualifie le besoin et réserve le rendez‑vous — 24h/24, même la nuit et le week‑end.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-7 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* player controls */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]">
                  <MicIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-[var(--font-syne)] text-base font-semibold text-white">Appel entrant · Dupont Artisans</div>
                  <div className="flex items-center gap-1.5 text-[0.72rem] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
                    {playing ? 'En cours de lecture' : 'Démo · 0:42'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label={playing ? 'Pause' : 'Lecture'}
                  onClick={() => setPlaying((v) => !v)}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5 translate-x-0.5" />}
                </button>

                {/* waveform + progress */}
                <div className="flex-1">
                  <div className="flex h-12 items-center gap-[3px] overflow-hidden">
                    {Array.from({ length: 40 }).map((_, i) => {
                      const filled = (i / 40) * 100 <= progress
                      return (
                        <span
                          key={i}
                          className={`block w-[3px] rounded-full transition-colors duration-150 ${
                            filled ? 'bg-[var(--accent)]' : 'bg-white/15'
                          } ${playing ? 'wave-bar' : ''}`}
                          style={{
                            height: `${28 + Math.abs(Math.sin(i * 0.9)) * 60}%`,
                            animationDelay: `${(i % 12) * 0.06}s`,
                          }}
                        />
                      )
                    })}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[0.68rem] tabular-nums text-white/45">
                    <span>{fmt(elapsed)}</span>
                    <span>0:42</span>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { k: 'Décroché', v: '1re sonnerie' },
                  { k: 'Langue', v: 'Français 🇫🇷' },
                  { k: 'Issue', v: 'RDV pris' },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center">
                    <div className="text-[0.6rem] uppercase tracking-[0.14em] text-white/45">{s.k}</div>
                    <div className="mt-1 font-[var(--font-syne)] text-sm font-semibold text-white">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* live transcript */}
            <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/45">Transcription en direct</span>
                <span className="flex items-center gap-1.5 text-[0.65rem] text-white/45">
                  <span className={`h-1.5 w-1.5 rounded-full ${playing ? 'bg-rose-400 soft-pulse' : 'bg-white/25'}`} />
                  {playing ? 'REC' : 'Prêt'}
                </span>
              </div>
              <div className="space-y-3">
                {VOICE_TRANSCRIPT.map((line, i) => {
                  const agent = line.from === 'agent'
                  const isActive = i === activeIndex && playing
                  const revealed = progress >= line.at || !playing
                  return (
                    <div
                      key={i}
                      className={`flex ${agent ? 'justify-end' : 'justify-start'} transition-opacity duration-500 ${
                        revealed ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[0.8rem] leading-relaxed transition-all duration-300 ${
                          agent
                            ? 'rounded-tr-sm bg-[var(--accent)]/15 text-white/95'
                            : 'rounded-tl-sm border border-white/[0.06] bg-white/[0.04] text-white/85'
                        } ${isActive ? 'ring-2 ring-[var(--accent)]/50' : ''}`}
                      >
                        <span className={`mb-1 block text-[0.6rem] uppercase tracking-[0.14em] ${agent ? 'text-[var(--accent)]' : 'text-white/40'}`}>
                          {agent ? 'Agent IA' : 'Client'}
                        </span>
                        {line.text}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials / Retours clients ─────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section id="temoignages" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
            Témoignages clients
          </span>
          <h2 className="font-[var(--font-syne)] text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-white">
            Ils ne ratent plus jamais un appel.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
            Des artisans français de tous corps de métier qui ont remplacé leur répondeur
            par un agent vocal IA — et qui voient les résultats au quotidien.
          </p>
        </div>

        {/* metric cards */}
        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white/[0.02] p-6 text-center transition-colors duration-300 hover:border-[var(--accent)]/40"
            >
              <div className="font-[var(--font-syne)] text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight text-white">
                {m.value}
              </div>
              <div className="mt-1 text-sm font-medium text-[var(--ink-soft)]">{m.label}</div>
              <div className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--accent)]/70">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* rating summary bar */}
        <div className="mx-auto mb-12 flex w-fit flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3">
          <span className="flex items-center gap-2">
            <span className="flex gap-0.5 text-[#ffd166]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M8 1.5l1.95 4.18 4.55.55-3.36 3.13.86 4.5L8 11.6 3.99 13.86l.86-4.5L1.5 6.23l4.55-.55L8 1.5z" />
                </svg>
              ))}
            </span>
            <span className="text-sm font-semibold text-white">4,9/5</span>
          </span>
          <span className="h-4 w-px bg-white/10" />
          <span className="text-sm text-[var(--ink-soft)]">+120 artisans équipés</span>
          <span className="h-4 w-px bg-white/10" />
          <span className="text-sm text-[var(--ink-soft)]">Plombiers · Électriciens · Serruriers</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-white/[0.18] hover:bg-white/[0.04]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="mb-5 h-6 w-6 text-[var(--accent)]/70" aria-hidden>
                <path d="M9 7H5a2 2 0 00-2 2v3a2 2 0 002 2h2v1a3 3 0 01-3 3v2a5 5 0 005-5V9a2 2 0 00-2-2zm12 0h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v1a3 3 0 01-3 3v2a5 5 0 005-5V9a2 2 0 00-2-2z" fill="currentColor" />
              </svg>
              <h3 className="mb-3 font-[var(--font-syne)] text-[1.15rem] font-bold leading-snug tracking-tight text-[var(--accent)]">
                {t.headline}
              </h3>
              <blockquote className="flex-1 text-[0.97rem] leading-relaxed text-white/90">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/25 font-[var(--font-syne)] text-sm font-semibold text-white">
                  {t.initials}
                </span>
                <div>
                  <div className="font-[var(--font-syne)] text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 text-[#ffd166]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                      <path d="M8 1.5l1.95 4.18 4.55.55-3.36 3.13.86 4.5L8 11.6 3.99 13.86l.86-4.5L1.5 6.23l4.55-.55L8 1.5z" />
                    </svg>
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Form Field ─────────────────────────────────────────────────────────── */
function Field({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[var(--accent)]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/25"
      />
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
type FormState = {
  fullName: string
  company: string
  phone: string
  message: string
  date: string
  time: string
}

const INITIAL_FORM: FormState = {
  fullName: '',
  company: '',
  phone: '',
  message: '',
  date: '',
  time: '',
}

export default function MonolithAIPage() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const minDate = new Date().toISOString().split('T')[0]

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
    setForm(INITIAL_FORM)
  }

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
          --ink-soft: #c2c8d6;
          --ink-mute: #8991a3;
          --accent: #3d7bfd;
          --bg: #0c0d10;
          --panel: #131419;
          --line: rgba(255, 255, 255, 0.08);
        }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--bg);
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

        @keyframes msgIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .msg-in { opacity: 0; animation: msgIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .chat-canvas { background-color: rgba(255,255,255,0.015); }
        .chat-canvas::-webkit-scrollbar { width: 5px; }
        .chat-canvas::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 8px; }

        @keyframes fadeSwap {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-swap { animation: fadeSwap 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes arrowNudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .flow-arrow { animation: arrowNudge 1.6s ease-in-out infinite; }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 26s linear infinite;
        }
        .ticker-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }

        .faq-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .faq-panel.open { grid-template-rows: 1fr; }
        .faq-panel > div { overflow: hidden; }

        @media (prefers-reduced-motion: reduce) {
          .msg-in { opacity: 1; animation: none; }
          .wave-bar { animation: none; }
          .fade-swap { animation: none; }
          .flow-arrow { animation: none; }
          .ticker-track { animation: none; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════ HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? 'border-b border-[var(--line)] bg-[var(--bg)]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            {!logoError ? (
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src="/logo-monolith.png"
                  alt="Monolith AI"
                  fill
                  sizes="40px"
                  style={{ objectFit: 'contain' }}
                  onError={() => setLogoError(true)}
                  priority
                />
              </div>
            ) : (
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--accent)] text-sm font-extrabold tracking-tight">M</div>
            )}
            <span className="font-[var(--font-syne)] text-[1.05rem] font-semibold tracking-tight text-white">
              Monolith<span className="font-light text-white/60"> AI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {[
              { label: 'Comment ça marche', href: '#comment' },
              { label: 'Démo', href: '#demo' },
              { label: 'Comparaison', href: '#comparaison' },
              { label: 'Tarifs', href: '#tarifs' },
              { label: 'FAQ', href: '#faq' },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#3570e6]"
          >
            Réserver un appel
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════ HERO */}
      <section className="relative px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-7">
              <SocialProof />
            </div>

            <h1 className="font-[var(--font-syne)] text-[clamp(2.4rem,5.4vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
              L&apos;excellence de l&apos;automatisation
              <br />
              et des{' '}
              <span className="text-[var(--accent)]">
                Agents Vocaux IA
              </span>
              <br />
              pour les artisans français.
            </h1>

            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              Une infrastructure premium pour les artisans et les petites
              entreprises du bâtiment : des agents vocaux qui répondent à 100 %
              de vos appels, qualifient vos prospects et remplissent votre
              agenda — pendant que vous travaillez sur le terrain.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#3570e6]"
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

            <div className="mt-6">
              <ChannelBadge />
            </div>
          </div>

          <VoiceAgentMockup />
        </div>

        {/* integration logo ticker */}
        <div className="mx-auto mt-16 max-w-7xl lg:mt-24">
          <p className="mb-6 text-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/40">
            Compatible avec vos outils
          </p>
          <IntegrationTicker />
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
          <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white/[0.02] p-8 sm:p-12">
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

      {/* ════════════════════════════════════════════════════════ COMMENT ÇA MARCHE */}
      <CommentCaMarche />

      {/* ════════════════════════════════════════════════════════ TÉMOIGNAGES */}
      <TestimonialsSection />

      {/* ════════════════════════════════════════════════════════ COMPARAISON */}
      <ComparisonSection />

      {/* ════════════════════════════════════════════════════════ VIDÉO */}
      <VideoShowcase />

      {/* ════════════════════════════════════════════════════════ DÉMO CHAT */}
      <ChatShowcase />

      {/* ════════════════════════════════════════════════════════ AGENT VOCAL */}
      <VoiceDemo />

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
                className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-white/[0.18] hover:bg-white/[0.04]"
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
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-colors duration-300 ${
                  p.highlight
                    ? 'border border-[var(--accent)]/50 bg-[var(--accent)]/[0.08]'
                    : 'border border-[var(--line)] bg-white/[0.02] hover:border-white/[0.18]'
                }`}
              >
                {p.highlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-white px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#0d0e12]">
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
                    <span className="font-[var(--font-syne)] text-3xl font-semibold tracking-tight text-white">
                      Tarif sur demande
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">
                    Devis personnalisé après audit
                  </p>
                </div>

                {'earnToLearn' in p && p.earnToLearn && (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden>
                          <path d="M12 3l3 6 6 .9-4.5 4.4 1 6.2L12 17.7 6.5 20.5l1-6.2L3 9.9 9 9l3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        Earn to Learn
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
                        Supabase
                      </span>
                    </div>
                    <div className="font-[var(--font-syne)] text-sm font-semibold text-white">
                      {p.earnToLearn.title}
                    </div>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--ink-soft)]">
                      {p.earnToLearn.body}
                    </p>
                  </div>
                )}

                {'spotlight' in p && p.spotlight && (
                  <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--accent)]/35 bg-[var(--accent)]/[0.1] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent)]/30 text-[var(--accent)]">
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
                          <path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M4 12l2-2M10 6l2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#cfd8ff]">Nouveau</span>
                    </div>
                    <div className="font-[var(--font-syne)] text-base font-semibold text-white">
                      {p.spotlight.title}
                    </div>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-[var(--ink-soft)]">
                      {p.spotlight.body}
                    </p>
                  </div>
                )}

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
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                    p.highlight
                      ? 'bg-[var(--accent)] text-white hover:bg-[#3570e6]'
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
      <section id="contact" className="relative px-6 py-28">
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]/85">
              Prochaine étape
            </span>
            <h2 className="font-[var(--font-syne)] text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Prêt à automatiser
              <br />
              <span className="text-[var(--accent)]">
                votre croissance ?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
              Réservez un appel stratégique gratuit de 30 minutes. Nous analysons votre
              activité et vous présentons un plan d&apos;action personnalisé.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white/[0.02]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-6 py-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 soft-pulse" />
              <span className="text-xs font-medium tracking-wide text-white/65">
                Formulaire de réservation · Réponse sous 2h ouvrées · Gratuit
              </span>
            </div>

            {submitted ? (
              <div className="relative px-8 py-16 text-center sm:px-12">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/15 text-emerald-300">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-[var(--font-syne)] text-2xl font-semibold tracking-tight text-white">
                  Demande envoyée
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
                  Merci. Notre équipe vous contacte sous 2 heures ouvrées pour confirmer votre créneau et préparer l&apos;appel stratégique.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/35 hover:text-white"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative grid gap-5 px-6 py-8 sm:px-10 sm:py-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Nom complet"
                    name="fullName"
                    placeholder="Jean Dupont"
                    value={form.fullName}
                    onChange={(v) => updateField('fullName', v)}
                    required
                  />
                  <Field
                    label="Nom de l'entreprise"
                    name="company"
                    placeholder="Dupont Artisans SARL"
                    value={form.company}
                    onChange={(v) => updateField('company', v)}
                    required
                  />
                </div>

                <Field
                  label="Numéro de téléphone"
                  name="phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={form.phone}
                  onChange={(v) => updateField('phone', v)}
                  required
                />

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/55">
                    Message · Problème à résoudre
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Décrivez brièvement votre activité et le goulot d'étranglement que vous voulez automatiser…"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className="w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[var(--accent)]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/25"
                  />
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                      <CalendarIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/65">
                      Vos disponibilités pour l&apos;appel
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="date" className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white/50">
                        Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        min={minDate}
                        value={form.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[var(--accent)]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/25 [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white/50">
                        Créneau horaire
                      </label>
                      <select
                        id="time"
                        name="time"
                        required
                        value={form.time}
                        onChange={(e) => updateField('time', e.target.value)}
                        className="w-full appearance-none rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[var(--accent)]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/25 [color-scheme:dark]"
                      >
                        <option value="" disabled>Choisir un créneau</option>
                        <option value="09:00">09h00 – 09h30</option>
                        <option value="10:00">10h00 – 10h30</option>
                        <option value="11:00">11h00 – 11h30</option>
                        <option value="14:00">14h00 – 14h30</option>
                        <option value="15:00">15h00 – 15h30</option>
                        <option value="16:00">16h00 – 16h30</option>
                        <option value="17:00">17h00 – 17h30</option>
                        <option value="18:00">18h00 – 18h30</option>
                      </select>
                    </div>
                  </div>
                  <p className="mt-3 text-[0.72rem] leading-relaxed text-white/40">
                    Notre équipe confirme votre créneau par WhatsApp dans les 2 heures ouvrées suivantes.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#3570e6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Envoi en cours…' : 'Réserver mon appel stratégique'}
                  {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>

                <p className="text-center text-[0.7rem] text-white/35">
                  En soumettant ce formulaire, vous acceptez d&apos;être recontacté par Monolith AI. Aucune donnée n&apos;est partagée avec des tiers.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ FAQ */}
      <FaqSection />

      {/* ════════════════════════════════════════════════════════ FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-md">
              <div className="mb-4 flex items-center gap-2.5">
                {!logoError ? (
                  <div className="relative h-9 w-9 shrink-0">
                    <Image src="/logo-monolith.png" alt="Monolith AI" fill sizes="36px" style={{ objectFit: 'contain' }} onError={() => setLogoError(true)} />
                  </div>
                ) : (
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--accent)] text-xs font-extrabold">M</div>
                )}
                <span className="font-[var(--font-syne)] text-base font-semibold tracking-tight text-white">
                  Monolith<span className="font-light text-white/60"> AI</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-mute)]">
                L&apos;agence d&apos;automatisation IA qui équipe les artisans français d&apos;une
                infrastructure premium. Agents vocaux, workflows n8n, intégrations sur mesure.
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
