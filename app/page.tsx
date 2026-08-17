'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowRight, ChevronDown, CircleDollarSign, CreditCard, Gift, LockKeyhole, Menu, MoveUpRight, Smartphone, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Service = [string, string, string, LucideIcon, string];

const services: Service[] = [
  ['01', 'Mobile', 'Recharge', Smartphone, 'Prepaid + postpaid'],
  ['02', 'Power', 'Bills', Zap, 'Electricity + gas'],
  ['03', 'Travel', 'FASTag', CircleDollarSign, 'Toll-ready payments'],
  ['04', 'Watch', 'DTH', CreditCard, 'Entertainment, uninterrupted'],
  ['05', 'Gifting', 'Gift cards', Gift, 'Give something useful'],
];

const faqs = [
  ['What is MaxPe?', 'MaxPe brings mobile recharge, bill payments, gift cards and other everyday digital services into one rewards-led app.'],
  ['How does cashback work?', 'Eligible recharges and bill payments can earn instant cashback, with offers and reward values varying by service and provider.'],
  ['What are MaxPoints?', 'MaxPoints are reward points earned through eligible transactions and can be used toward supported recharges and services.'],
  ['Is MaxPe secure?', 'MaxPe is a BBPS-approved platform powered by Bharat Connect, with protected account access, transaction visibility and payment notifications.'],
];

function AppScreen({ compact = false }: { compact?: boolean }) {
  return <div className={`app-screen ${compact ? 'compact' : ''}`}>
    <div className="app-bar"><span className="app-logo">M</span><div><b>MaxPe</b><small>Good morning</small></div><span className="app-bell">•••</span></div>
    <div className="wallet-panel"><span>Available rewards</span><strong>₹2,486<span>.50</span></strong><div><i>+ ₹126.50 cashback</i><i>8,640 MaxPoints</i></div></div>
    <div className="pay-label">PAY & EARN</div>
    <div className="pay-grid">{['Recharge', 'Electricity', 'FASTag', 'Gift cards'].map((x, i) => <div key={x}><span>{['↗', 'ϟ', '◉', '✦'][i]}</span><small>{x}</small></div>)}</div>
    {!compact && <>
      <div className="app-line"><span>RECENT</span><span>View all</span></div>
      <div className="app-txn"><span className="txn-check">✓</span><div><b>Electricity bill</b><small>Paid today · 08:42 PM</small></div><strong>₹1,250</strong></div>
      <div className="app-txn reward-txn"><span className="txn-plus">+</span><div><b>Cashback unlocked</b><small>MaxPe Rewards</small></div><strong>₹62</strong></div>
    </>}
  </div>;
}

function ServiceIcon({ Icon }: { Icon: LucideIcon }) { return <Icon size={23} strokeWidth={1.7} />; }

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: 'power4.out' } });
      hero.from('.topbar', { y: -30, opacity: 0, duration: .6 })
        .from('.hero-kicker', { y: 24, opacity: 0, duration: .45 }, '-=.25')
        .from('.hero-word', { yPercent: 105, duration: .85, stagger: .06 }, '-=.2')
        .from('.hero-sub', { y: 24, opacity: 0, duration: .55 }, '-=.45')
        .from('.hero-cta', { y: 18, opacity: 0, duration: .45 }, '-=.3')
        .from('.hero-orbit', { scale: .72, opacity: 0, rotation: -12, duration: 1.2 }, '-=.65')
        .from('.hero-float', { y: 30, opacity: 0, scale: .82, duration: .5, stagger: .08 }, '-=.7');

      gsap.to('.orbit-ring.r1', { rotation: 360, duration: 24, repeat: -1, ease: 'none' });
      gsap.to('.orbit-ring.r2', { rotation: -360, duration: 34, repeat: -1, ease: 'none' });
      gsap.to('.hero-orbit', { y: -16, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-float.a', { y: -12, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-float.b', { y: 10, duration: 2.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      gsap.to('.marquee-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' });

      const serviceSection = document.querySelector('.service-stage');
      const serviceTrack = document.querySelector('.service-track') as HTMLElement | null;
      if (serviceSection && serviceTrack) {
        const distance = () => Math.max(0, serviceTrack.scrollWidth - window.innerWidth + 80);
        gsap.to(serviceTrack, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: serviceSection, start: 'top top', end: () => `+=${distance() + window.innerHeight * .55}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
      }

      gsap.utils.toArray<HTMLElement>('.rise').forEach((el) => gsap.from(el, { y: 55, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }));

      const rewardTl = gsap.timeline({ scrollTrigger: { trigger: '.reward-lab', start: 'top top', end: '+=1200', scrub: 1, pin: true } });
      rewardTl.from('.reward-number', { scale: .7, opacity: 0, y: 70, ease: 'power2.out' }, 0)
        .from('.reward-orb', { scale: .45, rotation: -30, opacity: 0, ease: 'power2.out' }, 0)
        .to('.reward-orb', { x: -120, y: 100, rotation: 160, scale: 1.15, ease: 'none' }, .22)
        .to('.reward-number', { y: -85, scale: 1.12, ease: 'none' }, .22)
        .to('.reward-copy-block', { y: -130, opacity: .35, ease: 'none' }, .18)
        .to('.reward-chip', { y: -220, stagger: .05, ease: 'none' }, .3)
        .to('.reward-bar-fill', { scaleX: 1, ease: 'none' }, .1);

      const processTl = gsap.timeline({ scrollTrigger: { trigger: '.process-stage', start: 'top top', end: '+=1050', scrub: 1, pin: true } });
      processTl.to('.process-line', { scaleX: 1, ease: 'none' }, 0)
        .fromTo('.process-node.n1', { scale: .8, opacity: .4 }, { scale: 1.2, opacity: 1, duration: .18 }, .08)
        .fromTo('.process-node.n2', { scale: .8, opacity: .4 }, { scale: 1.2, opacity: 1, duration: .18 }, .34)
        .fromTo('.process-node.n3', { scale: .8, opacity: .4 }, { scale: 1.2, opacity: 1, duration: .18 }, .64)
        .to('.process-phone', { yPercent: -15, rotate: 4, ease: 'none' }, .15)
        .to('.process-copy', { y: -40, ease: 'none' }, .2);

      gsap.to('.cta-spark', { rotation: 360, duration: 18, repeat: -1, ease: 'none' });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, { scope: root });

  return <main ref={root} className="site-shell">
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">M</span><span>MaxPe</span></a><div className={`nav-menu ${menuOpen ? 'open' : ''}`}><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#rewards" onClick={() => setMenuOpen(false)}>Rewards</a><a href="#how" onClick={() => setMenuOpen(false)}>How it works</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></div><div className="top-actions"><a className="mini-download" href="#download">Get the app <ArrowUpRightIcon /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={21} /></button></div></header>

    <section id="home" className="hero-kinetic">
      <div className="hero-grid-bg" />
      <div className="hero-copy"><p className="hero-kicker"><span>MAXPE / 2026</span><i /> THE EVERYDAY REWARD ENGINE</p><h1><span className="hero-word">Pay</span><span className="hero-word blue-word">less.</span><span className="hero-word">Get</span><span className="hero-word orange-word">more.</span></h1><p className="hero-sub">Recharge. Pay bills. Collect cashback.<br /><b>One payment app that makes routine feel rewarding.</b></p><div className="hero-cta"><a className="primary-btn" href="#download">Start earning <ArrowRight size={18} /></a><a className="under-link" href="#services">See everything you can pay <ArrowDownRight size={16} /></a></div><div className="hero-trust"><span><strong>3M+</strong> users</span><span><strong>6%</strong> cashback*</span><span><strong>BBPS</strong> approved</span></div></div>
      <div className="hero-stage"><div className="hero-orbit"><div className="orbit-ring r1" /><div className="orbit-ring r2" /><div className="orbit-core"><span className="core-label">MAX</span><strong>₹</strong><small>PAY / EARN</small></div></div><div className="hero-float a"><small>Cashback</small><strong>+₹126.50</strong></div><div className="hero-float b"><small>MaxPoints</small><strong>+640</strong></div><div className="hero-float c"><span>✓</span><div><small>Bill paid</small><strong>₹1,250</strong></div></div><div className="hero-app"><AppScreen compact /></div></div>
    </section>

    <section className="signal-band"><div className="marquee-track"><span>RECHARGE</span><i>✦</i><span>EARN CASHBACK</span><i>✦</i><span>PAY BILLS</span><i>✦</i><span>COLLECT MAXPOINTS</span><i>✦</i><span>RECHARGE</span><i>✦</i><span>EARN CASHBACK</span><i>✦</i><span>PAY BILLS</span><i>✦</i><span>COLLECT MAXPOINTS</span><i>✦</i></div></section>

    <section id="services" className="service-stage"><div className="stage-caption"><p>01 / THE MAXPE UNIVERSE</p><h2>Everyday payments,<br /><span>reframed.</span></h2><div className="scroll-hint">SCROLL <span>→</span></div></div><div className="service-track">{services.map(([n, a, b, Icon, copy]) => <article className="service-tile" key={n}><span className="tile-number">{n}</span><div className="tile-icon"><ServiceIcon Icon={Icon} /></div><p>{a}</p><h3>{b}</h3><small>{copy}</small><ArrowUpRight className="tile-arrow" size={19} /></article>)}<div className="service-end"><span>+ MORE</span><strong>Water · Insurance<br />Broadband · Gift cards</strong></div></div></section>

    <section id="rewards" className="reward-lab"><div className="reward-grid"><div className="reward-copy-block"><p className="eyebrow-blue">02 / REWARD ENGINE</p><h2>What if every<br />payment <span>gave back?</span></h2><p>MaxPe turns ordinary recharges and bills into a visible loop of cashback and MaxPoints.</p><div className="reward-bar"><span>VALUE RETURN</span><i><b className="reward-bar-fill" /></i><strong>UP TO 6%*</strong></div></div><div className="reward-number">6<span>%</span></div><div className="reward-orb"><span>₹</span></div><div className="reward-chip chip-a"><small>Electricity</small><b>+ ₹62</b></div><div className="reward-chip chip-b"><small>Recharge</small><b>+ ₹18</b></div><div className="reward-chip chip-c"><small>MaxPoints</small><b>+ 640</b></div></div></section>

    <section id="how" className="process-stage"><div className="process-copy"><p className="eyebrow-orange">03 / THE LOOP</p><h2>Pay it.<br /><span>Watch it return.</span></h2><p>Three moments. One continuous experience. The interface makes the reward visible instead of hiding it after checkout.</p></div><div className="process-visual"><div className="process-line"><i /></div><div className="process-node n1"><b>01</b><span>Choose</span></div><div className="process-node n2"><b>02</b><span>Pay</span></div><div className="process-node n3"><b>03</b><span>Earn</span></div><div className="process-phone"><AppScreen compact /></div></div></section>

    <section className="split-proof"><div className="split-blue rise"><p>04 / BUILT FOR REAL LIFE</p><h2>From a ₹20 recharge<br />to the monthly bill.</h2><div className="proof-numbers"><div><strong>2021</strong><span>Since</span></div><div><strong>3M+</strong><span>Users</span></div><div><strong>4.2★</strong><span>Google Play</span></div></div></div><div className="split-white rise"><div className="shield"><LockKeyhole size={28} /></div><p>SECURITY ISN'T A FOOTNOTE.</p><h3>Protected access.<br />Clear transactions.<br />Visible notifications.</h3><span className="secure-line">BBPS · BHARAT CONNECT</span></div></section>

    <section className="referral-strip rise"><div><p>05 / BRING YOUR PEOPLE</p><h2>10 friends.<br /><span>₹300 back.</span></h2></div><div className="referral-orbit"><div className="ref-person p1">A</div><div className="ref-person p2">R</div><div className="ref-person p3">S</div><div className="ref-center">₹300</div><div className="ref-line l1" /><div className="ref-line l2" /><div className="ref-line l3" /></div><div className="ref-copy"><p>Share your link. When 10 friends install MaxPe and add ₹100 to their wallet, the referral reward unlocks.</p><a href="#download">Invite friends <MoveUpRight size={16} /></a></div></section>

    <section id="faq" className="faq-kinetic"><div className="faq-head rise"><p>06 / NO SMALL PRINT</p><h2>Questions<br /><span>before you start.</span></h2></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q} className="faq-row"><summary>{q}<ChevronDown size={20} /></summary><p>{a}</p></details>)}</div></section>

    <section id="download" className="download-hero"><div className="cta-spark" /><div className="download-inner rise"><p>07 / YOUR NEXT PAYMENT</p><h2>Make routine<br /><span>worth more.</span></h2><p>Download MaxPe and turn the next recharge or bill into the beginning of a better loop.</p><a className="dark-btn" href="#home">Download MaxPe <ArrowRight size={18} /></a><small>*Cashback, offers and rewards are subject to applicable service terms.</small></div></section>

    <footer className="footer-new"><div><a className="brand" href="#home"><span className="brand-mark">M</span><span>MaxPe</span></a><p>Pay. Earn. Save.</p></div><div className="footer-links"><a href="#services">Services</a><a href="#rewards">Rewards</a><a href="#how">How it works</a><a href="#faq">FAQs</a></div><div className="footer-meta"><span>support@maxpe.in</span><span>+91 7390903230</span><span>© 2026 MaxPe</span></div></footer>
  </main>;
}

function ArrowUpRightIcon() { return <ArrowRight size={15} />; }
