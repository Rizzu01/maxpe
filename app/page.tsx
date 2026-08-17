'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  ChevronDown,
  Gift,
  IndianRupee,
  LockKeyhole,
  Menu,
  MoveUpRight,
  Smartphone,
  Sparkles,
  Star,
  WalletCards,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  { icon: Smartphone, title: 'Mobile recharge', copy: 'Prepaid, postpaid and instant top-ups.' },
  { icon: Zap, title: 'Electricity', copy: 'Pay your bill in a few taps.' },
  { icon: WalletCards, title: 'DTH & broadband', copy: 'Keep every connection active.' },
  { icon: IndianRupee, title: 'FASTag', copy: 'Recharge before the toll booth.' },
  { icon: Gift, title: 'Gift cards', copy: 'Send something useful and rewarding.' },
  { icon: Banknote, title: 'More payments', copy: 'Everyday payments in one place.' },
];

const faqs = [
  ['What is MaxPe?', 'MaxPe is a rewards-first payment experience for recharges, bill payments, gift cards and everyday digital payments.'],
  ['How does cashback work?', 'Eligible transactions can unlock cashback and MaxPoints, so everyday payments can become more rewarding.'],
  ['Is MaxPe secure?', 'The experience is designed around secure payment flows, protected account access and clear transaction visibility.'],
  ['What can I pay for?', 'Mobile, electricity, DTH, broadband, FASTag, gift cards and additional everyday payment categories.'],
];

function PhoneMockup() {
  return (
    <div className="phone-shell" aria-label="MaxPe app preview">
      <div className="phone-top"><span /> <span /> <span /></div>
      <div className="phone-screen">
        <div className="app-mini-head"><span className="app-dot">M</span><div><b>Good evening</b><small>Rizwan</small></div><button aria-label="Profile">•••</button></div>
        <div className="balance-card">
          <div><span>Total rewards</span><strong>₹2,486</strong></div>
          <div className="balance-row"><span>+ ₹126.50 cashback</span><span>8,640 pts</span></div>
        </div>
        <div className="mini-label">Pay & earn</div>
        <div className="mini-grid">
          {['Recharge', 'Electricity', 'FASTag', 'Gift cards'].map((item, i) => (
            <div key={item} className="mini-service"><span>{['⌁', 'ϟ', '◉', '✦'][i]}</span><small>{item}</small></div>
          ))}
        </div>
        <div className="transaction-card">
          <div><span className="txn-icon">✓</span><div><b>Electricity bill</b><small>Today · 08:42 PM</small></div></div>
          <strong>₹1,250</strong>
        </div>
        <div className="transaction-card reward"><div><span className="txn-icon reward-icon">+</span><div><b>Cashback unlocked</b><small>MaxPe Rewards</small></div></div><strong>₹62</strong></div>
      </div>
      <div className="phone-home" />
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro.from('.nav', { y: -18, opacity: 0, duration: 0.55 })
      .from('.eyebrow', { y: 20, opacity: 0, duration: 0.45 }, '-=0.15')
      .from('.hero-title .line', { yPercent: 120, opacity: 0, duration: 0.85, stagger: 0.08 }, '-=0.2')
      .from('.hero-copy', { y: 18, opacity: 0, duration: 0.5 }, '-=0.45')
      .from('.hero-actions', { y: 18, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-meta', { y: 16, opacity: 0, duration: 0.45 }, '-=0.25')
      .from('.hero-visual', { scale: 0.94, y: 28, opacity: 0, duration: 1 }, '-=0.55')
      .from('.float-card', { y: 20, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1 }, '-=0.65');

    gsap.to('.hero-orb', { xPercent: 12, yPercent: -8, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.to('.hero-ring', { rotation: 360, duration: 22, ease: 'none', repeat: -1 });
    gsap.to('.float-card', { y: -8, duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.22 });

    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%', once: true },
      });
    });

    const servicesTl = gsap.timeline({
      scrollTrigger: { trigger: '.services-section', start: 'top 72%', once: true },
    });
    servicesTl.from('.service-card', { y: 30, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out' });

    const rewards = gsap.timeline({
      scrollTrigger: { trigger: '.rewards-section', start: 'top top', end: '+=1000', scrub: 1, pin: '.rewards-sticky' },
    });
    rewards.from('.reward-number', { scale: 0.82, opacity: 0, y: 40, ease: 'power2.out' })
      .from('.reward-copy', { y: 40, opacity: 0, ease: 'power2.out' }, 0.1)
      .to('.reward-phone', { yPercent: -14, rotate: -4, scale: 1.03, ease: 'none' }, 0.15)
      .to('.reward-chip.one', { xPercent: -18, yPercent: -30, rotate: -7, ease: 'none' }, 0.2)
      .to('.reward-chip.two', { xPercent: 18, yPercent: 22, rotate: 5, ease: 'none' }, 0.2)
      .to('.reward-glow', { scale: 1.25, opacity: 0.75, ease: 'none' }, 0);

    mm.add('(max-width: 820px)', () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === '.rewards-section') st.kill();
      });
      gsap.set('.rewards-sticky', { clearProps: 'all' });
    });

    return () => mm.revert();
  }, { scope: root });

  const menuOpen = () => document.documentElement.classList.toggle('menu-open');

  return (
    <main ref={root}>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="MaxPe home"><span className="brand-mark">M</span><span>MaxPe</span></a>
          <div className="nav-links"><a href="#services">Services</a><a href="#rewards">Rewards</a><a href="#security">Security</a><a href="#faq">FAQ</a></div>
          <div className="nav-actions"><a className="nav-download" href="#download">Download app <ArrowUpRight size={15} /></a><button className="menu-btn" aria-label="Toggle navigation" onClick={menuOpen}><Menu size={22} /></button></div>
        </nav>
      </header>

      <section id="top" className="hero section">
        <div className="hero-orb" /><div className="hero-ring" />
        <div className="container hero-grid">
          <div className="hero-copy-block">
            <p className="eyebrow"><Sparkles size={15} /> Pay. Earn. Save.</p>
            <h1 className="hero-title"><span className="line">Your payments</span><span className="line accent-text">should give</span><span className="line">something back.</span></h1>
            <p className="hero-copy">Recharge, pay bills, buy gift cards and earn rewards in one beautifully simple payment experience.</p>
            <div className="hero-actions"><a className="btn btn-primary" href="#download">Download MaxPe <ArrowRight size={18} /></a><a className="text-link" href="#services">Explore services <MoveUpRight size={16} /></a></div>
            <div className="hero-meta"><span><BadgeCheck size={16} /> Secure payments</span><span><Star size={15} fill="currentColor" /> 4.6+ app rating</span><span>3M+ users</span></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="phone-wrap"><PhoneMockup /></div>
            <div className="float-card cashback-card"><span className="float-icon">+</span><div><small>Cashback unlocked</small><strong>₹126.50</strong></div></div>
            <div className="float-card bill-card"><span className="float-icon tick">✓</span><div><small>Electricity paid</small><strong>₹1,250</strong></div></div>
            <div className="float-card point-card"><span className="float-icon star-dot">✦</span><div><small>MaxPoints</small><strong>+640</strong></div></div>
          </div>
        </div>
      </section>

      <section className="proof-strip"><div className="container proof-grid"><span>3M+ USERS</span><span>4.6★ RATING</span><span>SECURE PAYMENTS</span><span>BBPS ENABLED</span><span>REWARD-LED EXPERIENCE</span></div></section>

      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-head reveal"><div><p className="section-kicker">01 / Services</p><h2>Everything you pay for,<br /><span className="muted">in one place.</span></h2></div><p>From your morning recharge to your monthly electricity bill, MaxPe puts everyday payments in one clean flow.</p></div>
          <div className="service-grid">{services.map(({ icon: Icon, title, copy }) => <article className="service-card" key={title}><div className="service-icon"><Icon size={21} /></div><div className="service-body"><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight className="service-arrow" size={18} /></article>)}</div>
        </div>
      </section>

      <section id="rewards" className="rewards-section section-dark">
        <div className="rewards-sticky"><div className="reward-glow" /><div className="container rewards-grid"><div className="reward-copy"><p className="section-kicker">02 / Rewards</p><h2>Your payment<br /><span className="muted-dark">just paid you back.</span></h2><p className="reward-copy-text">Turn everyday payments into cashback and MaxPoints. The more you use MaxPe, the more rewarding the routine becomes.</p><div className="reward-stats"><div><strong className="reward-number">₹126.50</strong><span>cashback in one flow</span></div><div><strong>8,640</strong><span>MaxPoints collected</span></div></div></div><div className="reward-visual"><div className="reward-phone"><PhoneMockup /></div><div className="reward-chip one"><span>+ ₹62</span><small>Electricity cashback</small></div><div className="reward-chip two"><span>+ 640</span><small>MaxPoints</small></div></div></div></div>
      </section>

      <section className="section app-story">
        <div className="container"><div className="section-head reveal"><div><p className="section-kicker">03 / Product</p><h2>One app.<br /><span className="muted">Everyday momentum.</span></h2></div><p>Built around the moments that matter: choosing a service, paying fast, and seeing the reward appear.</p></div>
          <div className="story-grid reveal"><div className="story-panel dark-panel"><span className="panel-number">01</span><div><small>Choose a service</small><h3>Start with what<br />you need today.</h3></div><span className="panel-pill">Fast</span></div><div className="story-panel light-panel"><span className="panel-number">02</span><div><small>Make your payment</small><h3>Simple by design.<br />Nothing gets in the way.</h3></div><span className="panel-pill">Secure</span></div><div className="story-panel accent-panel"><span className="panel-number">03</span><div><small>Get rewarded</small><h3>Payment complete.<br />Reward unlocked.</h3></div><span className="panel-pill">+ Cashback</span></div></div>
        </div>
      </section>

      <section id="security" className="section security-section"><div className="container security-grid"><div className="security-copy reveal"><p className="section-kicker">04 / Security</p><h2>Your money deserves<br /><span className="muted">serious protection.</span></h2><p>Secure account access, clear transaction visibility and a payment experience designed to keep the important things obvious.</p><a className="text-link" href="#download">Explore MaxPe <MoveUpRight size={16} /></a></div><div className="security-card reveal"><div className="security-icon"><LockKeyhole size={30} /></div><div className="security-lines"><div><span>Account access</span><strong>Protected</strong></div><div><span>Transaction alerts</span><strong>On</strong></div><div><span>Payment visibility</span><strong>Always clear</strong></div></div><div className="security-foot"><BadgeCheck size={17} /> Built around trust and transparency</div></div></div></section>

      <section className="section testimonial-section"><div className="container testimonial-wrap reveal"><div className="quote-mark">“</div><blockquote>MaxPe makes the boring part of life—paying bills—feel surprisingly rewarding.</blockquote><div className="quote-meta"><span className="avatar">A</span><div><strong>Everyday MaxPe user</strong><small>Recharge · Bills · Rewards</small></div></div></div></section>

      <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="reveal"><p className="section-kicker">05 / FAQ</p><h2>Questions,<br /><span className="muted">answered simply.</span></h2><p>Everything you need to understand the MaxPe experience before you start.</p></div><div className="faq-list">{faqs.map(([q, a]) => <details className="faq-item reveal" key={q}><summary><span>{q}</span><ChevronDown size={18} /></summary><p>{a}</p></details>)}</div></div></section>

      <section id="download" className="cta-section"><div className="container cta-card"><div><p className="section-kicker">06 / Get started</p><h2>Make your everyday<br /><span>payments worth more.</span></h2><p>Download MaxPe and turn your next payment into your next reward.</p></div><a className="btn btn-dark" href="#top">Download MaxPe <ArrowRight size={18} /></a></div></section>

      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">M</span><span>MaxPe</span></a><p>Pay. Earn. Save.</p></div><div><small>Explore</small><a href="#services">Services</a><a href="#rewards">Rewards</a><a href="#security">Security</a></div><div><small>Company</small><a href="#top">About MaxPe</a><a href="#faq">FAQ</a><a href="#download">Download</a></div><div><small>Legal</small><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Support</a></div></div><div className="container footer-bottom"><span>© 2026 MaxPe. All rights reserved.</span><span>Built for a faster, more rewarding everyday.</span></div></footer>
    </main>
  );
}
