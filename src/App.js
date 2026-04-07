import { useState, useEffect, useRef } from 'react';
import {
  HiArrowRight,
  HiArrowUpRight,
  HiArrowLeft,
  HiChevronLeft,
  HiChevronRight,
  HiPlus,
  HiMinus,
} from 'react-icons/hi2';
import {
  FiLayout,
  FiLayers,
  FiGrid,
  FiPenTool,
  FiImage,
  FiMonitor,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiDribbble,
  FiArrowDown,
  FiMenu,
  FiX,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTarget,
  FiCalendar,
  FiMessageCircle,
  FiCode,
} from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import logoWhite from './logo_white.svg';
import './App.css';

/* ── Data ── */
const sliderData = [
  { id: 1, title: 'Landing Pages', tag: 'Web Design', description: 'High-converting landing pages that capture attention, communicate your value, and turn visitors into customers.', image: `${process.env.PUBLIC_URL}/project1.jpg` },
  { id: 2, title: 'Multipage Websites', tag: 'Development', description: 'Fully custom websites with multiple pages, smooth navigation, and a cohesive design that tells your brand story.', image: `${process.env.PUBLIC_URL}/project5.jpg` },
  { id: 3, title: 'UI/UX Design', tag: 'Design', description: 'User-centered interfaces designed through research, prototyping, and testing to deliver intuitive experiences.', image: `${process.env.PUBLIC_URL}/project4.jpg` },
  { id: 4, title: 'Web Applications', tag: 'Apps', description: 'Custom web apps built with modern frameworks — dashboards, platforms, and tools tailored to your business.', image: `${process.env.PUBLIC_URL}/project6.jpg` },
];

const services = [
  { icon: <FiLayout />, title: 'Landing Pages', description: 'One-page websites designed to convert. Perfect for product launches, campaigns, and lead generation.', num: '01' },
  { icon: <FiLayers />, title: 'Multipage Websites', description: 'Complete websites with custom layouts, responsive design, and CMS integration for full control.', num: '02' },
  { icon: <FiGrid />, title: 'Web Portfolios', description: 'Stunning portfolio sites that showcase your work with smooth animations and a lasting impression.', num: '03' },
  { icon: <FiPenTool />, title: 'UI/UX Design', description: 'Research-driven design from wireframes to high-fidelity prototypes, focused on usability and beauty.', num: '04' },
  { icon: <FiImage />, title: 'Graphic Design', description: 'Brand identities, social media assets, marketing materials, and visual content that stands out.', num: '05' },
  { icon: <FiMonitor />, title: 'Web Applications', description: 'Custom dashboards, SaaS platforms, and interactive tools built with React, Next.js, and modern stacks.', num: '06' },
];

const PU = process.env.PUBLIC_URL;
const portfolio = [
  {
    title: 'Nymb', category: 'Landing Page', image: `${PU}/project1.jpg`, year: '2025',
    overview: 'A sleek landing page for Nymb Ecosystem — a tokenization and gamification platform that turns time into real value.',
    challenge: 'The client needed a single page that could communicate a complex Web3 concept in a way that feels approachable, not intimidating.',
    solution: 'We crafted a dark, minimal design with animated particles and bold typography, paired with clear CTAs that guide visitors toward the vision and investment pages.',
    services: ['Landing Page Design', 'Frontend Development', 'Motion Design'],
    gallery: [`${PU}/project1b.jpg`, `${PU}/project1c.jpg`, `${PU}/project1d.jpg`, `${PU}/project1e.jpg`],
  },
  {
    title: 'Dimora del Tramonto', category: 'Landing Page with Booking', image: `${PU}/project2.jpg`, year: '2025',
    overview: 'A premium landing page for a private Tuscan villa featuring panoramic Chianti hills views and an integrated booking system.',
    challenge: 'The villa owner wanted a site that felt as luxurious as the property itself, with a seamless booking experience that eliminated back-and-forth emails.',
    solution: 'We designed a cinematic hero with rich landscape photography, warm gold tones, and a multi-language interface (EN/IT/DE) with a built-in availability checker and virtual tour.',
    services: ['Landing Page Design', 'Booking Integration', 'Multi-language Support'],
    gallery: [`${PU}/project2b.jpg`, `${PU}/project2c.jpg`, `${PU}/project2d.jpg`, `${PU}/project2e.jpg`],
  },
  {
    title: 'Bimmer', category: 'Landing Page', image: `${PU}/project3.jpg`, year: '2025',
    overview: 'A bold, typography-driven landing page for Bimmer — an automotive service company where every detail counts.',
    challenge: 'The brand needed a digital presence that matched the precision and quality of their physical service, while standing out in a crowded automotive market.',
    solution: 'We went with a striking black-and-white palette, oversized Romanian typography, and a structured layout that communicates trust and professionalism at first glance.',
    services: ['Landing Page Design', 'Brand Identity', 'Frontend Development'],
    gallery: [`${PU}/project3b.jpg`, `${PU}/project3c.jpg`, `${PU}/project3d.jpg`, `${PU}/project3e.jpg`],
  },
  {
    title: 'Start', category: 'UI/UX Design', image: `${PU}/project4.jpg`, year: '2025',
    overview: 'A complete UI/UX design for Start — a driving school platform with course management, instructor profiles, and student enrollment.',
    challenge: 'The driving school had a complex offering — multiple course types, pricing tiers, instructors, and reviews — that needed to be organized into an intuitive multipage experience.',
    solution: 'We designed a vibrant, energetic interface with orange and blue accents, clear navigation across 10+ pages, star ratings, and a streamlined enrollment flow.',
    services: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Design System'],
    gallery: [`${PU}/project4b.jpg`, `${PU}/project4c.jpg`, `${PU}/project4d.jpg`, `${PU}/project4e.jpg`],
  },
  {
    title: 'GranStilArt', category: 'Multipage Website', image: `${PU}/project5.jpg`, year: '2025',
    overview: 'A full multipage website for GranStilArt — a memorial stone company crafting personalized funeral monuments with care and artistry.',
    challenge: 'The subject matter required extreme sensitivity. The site needed to feel respectful and elegant while still being functional as a product catalog and lead generation tool.',
    solution: 'We chose a dark, muted palette with soft lighting photography and subtle animations. The site includes a monument catalog, service pages, blog, and a tasteful contact flow.',
    services: ['Multipage Website', 'Web Development', 'CMS Integration'],
    gallery: [],
  },
  {
    title: 'VertragPlus', category: 'Multipage Website', image: `${PU}/project6.jpg`, year: '2025',
    overview: 'A full multipage website for VertragPlus — a food packaging company offering a wide range of packaging solutions for the food industry.',
    challenge: 'VertragPlus needed a website that could showcase a large and diverse product catalog in a way that felt organized, trustworthy, and easy to navigate for B2B buyers.',
    solution: 'We designed a clean, product-focused website with structured category pages, detailed product listings, and clear calls to action — making it easy for buyers to find the right packaging solution and get in touch.',
    services: ['Multipage Website', 'Web Development', 'UI/UX Design'],
    gallery: [`${PU}/project6b.jpg`, `${PU}/project6c.jpg`, `${PU}/project6d.jpg`, `${PU}/project6e.jpg`],
  },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Founder, Luxe Realty', text: "OneCode built us a landing page that doubled our lead conversion overnight. The design is sleek, fast, and exactly what we envisioned.", avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name: 'David Chen', role: 'Creative Director, Moda Studio', text: "They designed a portfolio site that actually feels like art. Every detail was considered — it's the best investment we've made.", avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { name: 'Emily Rodriguez', role: 'CEO, NovaBrew', text: "From the brand identity to the full website, OneCode delivered a cohesive digital presence that elevated our entire business.", avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
];

const team = [
  { name: 'Alex Morgan', role: 'Web Developer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Priya Sharma', role: 'UI/UX Designer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'James Wilson', role: 'Graphic Designer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Lisa Park', role: 'Project Manager', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
];

const faqs = [
  { question: 'How long does a typical project take?', answer: 'It depends on scope — a landing page can be done in 3–7 days, while a full product design + dev build typically takes 1–3 weeks. I give you a precise timeline after our discovery call, and I stick to it.' },
  { question: 'Do you work with clients outside of Europe?', answer: 'Absolutely. I work async-first with clients across North America, the Middle East, and Southeast Asia. Time zones have never been a blocker — clear communication and good tooling make it seamless.' },
  { question: 'What do you need from me to get started?', answer: 'A brief (or even just a rough idea), your brand assets if you have them, and a 30-minute kickoff call. I handle the rest — research, structure, design, and code.' },
  { question: 'Do you offer ongoing support after launch?', answer: 'Yes. Every project includes 30 days of post-launch support at no extra cost. After that, I offer monthly retainer packages for clients who need continuous updates, new features, or A/B testing.' },
  { question: 'Can you redesign an existing website without breaking it?', answer: 'That is one of my specialties. I audit your current site first — performance, UX, conversion gaps — then redesign and rebuild iteratively so the transition is smooth and your SEO is protected.' },
  { question: 'What is your pricing like?', answer: 'Projects are quoted fixed-price based on scope, so you always know the total upfront — no surprise invoices. Landing pages start around €300, full websites from €550. Book a call and I will send a detailed quote within 24 hours.' },
];

/* ── Custom scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Reveal wrapper component ── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Parallax layer that moves on scroll ── */
function ParallaxLayer({ speed = 0.3, className = '', children }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const y = window.scrollY * speed;
        ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={className}>{children}</div>;
}


/* ── FAQ Accordion Item ── */
function FaqItem({ question, answer, isOpen, onClick, index }) {
  const contentRef = useRef(null);
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} onClick={onClick}>
      <div className="faq-item__header">
        <span className="faq-item__num">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="faq-item__question">{question}</h3>
        <span className="faq-item__icon">{isOpen ? <HiMinus /> : <HiPlus />}</span>
      </div>
      <div className="faq-item__body" ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0px' }}>
        <p className="faq-item__answer">{answer}</p>
      </div>
    </div>
  );
}

/* ── Case Study overlay ── */
function CaseStudy({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="case" onClick={onClose}>
      <div className="case__inner" onClick={(e) => e.stopPropagation()}>
        <button className="case__close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <div className="case__hero">
          <img src={project.image} alt={project.title} className="case__hero-img" />
          <div className="case__hero-overlay" />
          <div className="case__hero-content">
            <span className="case__tag">{project.category}</span>
            <h1 className="case__title">{project.title}</h1>
            <span className="case__year">{project.year}</span>
          </div>
        </div>

        <div className="case__body">
          <div className="case__section">
            <h2 className="case__heading">Overview</h2>
            <p className="case__text">{project.overview}</p>
          </div>

          <div className="case__two-col">
            <div className="case__section">
              <h2 className="case__heading">Challenge</h2>
              <p className="case__text">{project.challenge}</p>
            </div>
            <div className="case__section">
              <h2 className="case__heading">Solution</h2>
              <p className="case__text">{project.solution}</p>
            </div>
          </div>

          <div className="case__section">
            <h2 className="case__heading">Services Provided</h2>
            <div className="case__services">
              {project.services.map((s) => (
                <span key={s} className="case__service-tag">{s}</span>
              ))}
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="case__section">
              <h2 className="case__heading">Gallery</h2>
              <div className="case__gallery">
                {project.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} className="case__gallery-img" />
                ))}
              </div>
            </div>
          )}

          <div className="case__footer">
            <button className="btn btn--ghost" onClick={onClose}>
              <HiArrowLeft /> Back to Portfolio
            </button>
            <a href="#contact" className="btn btn--primary" onClick={onClose}>
              <span>Start a Similar Project</span> <HiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════ APP ══════════ */
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCase, setActiveCase] = useState(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  /* Navbar scroll */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Slider auto-play */
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % sliderData.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrentSlide((p) => (p - 1 + sliderData.length) % sliderData.length);
  const next = () => setCurrentSlide((p) => (p + 1) % sliderData.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    emailjs.sendForm('service_tjrtu2j', 'template_op0wa7q', formRef.current, 'dzh_MYVldtKHUDQQG')
      .then(() => {
        setFormStatus('sent');
        formRef.current.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      })
      .catch(() => {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      });
  };

  return (
    <div className="app">
      {/* Floating particles — fixed, always visible */}
      <div className="particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => {
          const dur = 6 + Math.random() * 10;
          const del = Math.random() * 8;
          return (
            <span key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDuration: `${dur}s, ${dur}s`,
              animationDelay: `${del}s, ${del}s`,
            }} />
          );
        })}
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#home" className="nav__logo"><img src={logoWhite} alt="OneCode" className="nav__logo-img" /></a>
          <ul className={`nav__links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#work" onClick={() => setMenuOpen(false)}>Work</a></li>
            <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="nav__right">
            <a href="#contact" className="nav__cta">Start a Project <HiArrowUpRight /></a>
            <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero" id="home">
        {/* Animated floating gradient blobs */}
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />


        {/* Grid pattern overlay */}
        <div className="hero__grid" />

        <ParallaxLayer speed={-0.15} className="hero__content-wrap">
          <div className="hero__content">
            <p className="hero__tag anim-hero anim-hero--1">Web Design & Development Studio</p>
            <h1 className="hero__title anim-hero anim-hero--2">
              We design websites that{' '}
              <em className="hero__italic">convert</em>{' '}
              and inspire
            </h1>
            <p className="hero__sub anim-hero anim-hero--3">
              Landing pages, portfolios, multipage websites, and custom web apps &mdash;
              crafted with precision to grow your brand online.
            </p>
            <div className="hero__actions anim-hero anim-hero--4">
              <a href="#work" className="btn btn--primary">
                <span>See Our Work</span> <HiArrowRight />
              </a>
              <a href="#services" className="btn btn--ghost">Our Services</a>
            </div>
          </div>
        </ParallaxLayer>

        <div className="hero__scroll anim-hero anim-hero--5">
          <span>Scroll</span>
          <FiArrowDown className="hero__scroll-icon" />
        </div>

        <div className="hero__stats">
          {[['150+', 'Projects'], ['50+', 'Clients'], ['8+', 'Years']].map(([num, label], i) => (
            <div key={label} className={`hero__stat anim-hero anim-hero--${i + 5}`}>
              <span className="hero__stat-num">{num}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>

      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee">
        <div className="marquee__track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="marquee__content">
              Landing Pages &nbsp;&bull;&nbsp; Multipage Websites &nbsp;&bull;&nbsp;
              Web Portfolios &nbsp;&bull;&nbsp; UI/UX Design &nbsp;&bull;&nbsp;
              Graphic Design &nbsp;&bull;&nbsp; Web Applications &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── SHOWCASE / SLIDER ─── */}
      <section className="showcase" id="work">
        <div className="section-glow section-glow--left" />
        <Reveal><p className="label">Featured Work</p></Reveal>
        <Reveal delay={100}><h2 className="heading-2">Selected <em>projects</em></h2></Reveal>
        <div className="showcase__spacer" />

        <div className="showcase__slider">
          <div className="showcase__slider-img">
            {sliderData.map((slide, index) => (
              <img key={slide.id} src={slide.image} alt={slide.title}
                className={`showcase__img ${index === currentSlide ? 'active' : ''}`} />
            ))}
            <div className="showcase__slider-overlay" />
          </div>
          <div className="showcase__slider-info">
            <div className="showcase__slider-text">
              <span className="showcase__tag">{sliderData[currentSlide].tag}</span>
              <h3 className="heading-3">{sliderData[currentSlide].title}</h3>
              <p className="body-text">{sliderData[currentSlide].description}</p>
            </div>
            <div className="showcase__controls">
              <button className="showcase__arrow" onClick={prev} aria-label="Previous"><HiChevronLeft /></button>
              <span className="showcase__count">{String(currentSlide + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}</span>
              <button className="showcase__arrow" onClick={next} aria-label="Next"><HiChevronRight /></button>
            </div>
            <div className="showcase__progress">
              <div className="showcase__progress-bar" key={`bar-${currentSlide}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="portfolio">
        <div className="section-glow section-glow--left" />
        <div className="portfolio__header">
          <Reveal><p className="label">Portfolio</p></Reveal>
          <Reveal delay={100}><h2 className="heading-2">Recent <em>work</em></h2></Reveal>
        </div>
        <div className="portfolio__grid">
          {portfolio.map((p, i) => (
            <Reveal delay={i * 80} key={i}>
              <div className="port-card" onClick={() => setActiveCase(p)} role="button" tabIndex={0}>
                <div className="port-card__img">
                  <img src={p.image} alt={p.title} />
                  <div className="port-card__overlay">
                    <span className="port-card__view">View Case Study <HiArrowUpRight /></span>
                  </div>
                </div>
                <div className="port-card__info">
                  <div>
                    <h3 className="port-card__title">{p.title}</h3>
                    <span className="port-card__cat">{p.category}</span>
                  </div>
                  <span className="port-card__year">{p.year}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="about" id="about">
        <div className="section-glow section-glow--right" />
        <div className="about__inner">
          <div className="about__left">
            <Reveal><p className="label">About Us</p></Reveal>
            <Reveal delay={100}>
              <h2 className="heading-2">
                We design with purpose and build with <em>precision</em>
              </h2>
            </Reveal>
          </div>
          <div className="about__right">
            <Reveal delay={150}>
              <p className="body-text body-text--lg">
                OneCode is a web design and development studio that helps businesses
                stand out online. From single landing pages to full multipage websites,
                we combine clean UI/UX design with solid development to deliver
                digital products that look great and perform even better.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="about__features">
                {['Pixel-perfect design', 'Mobile-first development', 'Fast turnaround times', 'Ongoing support & revisions'].map((f) => (
                  <div className="about__feat" key={f}>
                    <span className="about__check" /><span>{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={250}>
              <a href="#services" className="btn btn--primary"><span>See Our Services</span> <HiArrowRight /></a>
            </Reveal>
          </div>
        </div>
        <div className="process">
          <div className="process__grid">
            <Reveal>
              <div className="process__card">
                <div className="process__card-icon"><FiTarget /></div>
                <h3 className="process__card-title">Focused on <em>the release</em> of the product</h3>
                <p className="process__card-text">We align every design and development decision around your launch goals — no fluff, just results.</p>
                <div className="process__tags">
                  <span className="process__tag">Advanced Analytics</span>
                  <span className="process__tag">Design Process</span>
                  <span className="process__tag">Development</span>
                  <span className="process__tag process__tag--accent">Release</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="process__card">
                <div className="process__card-icon"><FiCalendar /></div>
                <h3 className="process__card-title">We show the result <em>weekly</em></h3>
                <p className="process__card-text">You see progress every week — designs, prototypes, and builds shared on a fixed schedule so nothing is a surprise.</p>
                <div className="process__week">
                  {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
                    <span key={i} className={`process__day ${i === 4 ? 'process__day--active' : ''}`}>{d}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="process__card">
                <div className="process__card-icon"><FiMessageCircle /></div>
                <h3 className="process__card-title">We always stay <em>in touch</em></h3>
                <p className="process__card-text">Questions via Telegram, email, or call — we respond fast. If you can't hop on a call, we record a video walkthrough instead.</p>
                <div className="process__chat">
                  <span className="process__bubble process__bubble--client">Can we review the new layout?</span>
                  <span className="process__bubble process__bubble--us">Sure! I just sent a video walkthrough.</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="process__card">
                <div className="process__card-icon"><FiCode /></div>
                <h3 className="process__card-title">We develop <em>transparently</em></h3>
                <p className="process__card-text">You get access to the staging site from day one. Every change is visible in real time — full transparency, zero guesswork.</p>
                <div className="process__tags">
                  <span className="process__tag">Live Preview</span>
                  <span className="process__tag">Git Access</span>
                  <span className="process__tag">Staging Site</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services" id="services">
        <div className="section-glow section-glow--center" />
        <div className="services__header">
          <Reveal><p className="label">Our Services</p></Reveal>
          <Reveal delay={100}><h2 className="heading-2">Everything you need to go <em>live</em></h2></Reveal>
        </div>
        <div className="services__grid">
          {services.map((s, i) => (
            <Reveal delay={i * 80} key={i}>
              <div className="service-card">
                <div className="service-card__top">
                  <span className="service-card__num">{s.num}</span>
                  <span className="service-card__icon">{s.icon}</span>
                </div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.description}</p>
                <span className="service-card__arrow"><HiArrowUpRight /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials">
        <div className="section-glow section-glow--right" />
        <div className="testimonials__header">
          <Reveal><p className="label">Testimonials</p></Reveal>
          <Reveal delay={100}><h2 className="heading-2">What our <em>clients</em> say</h2></Reveal>
        </div>
        <div className="testimonials__list">
          {testimonials.map((t, i) => (
            <Reveal delay={i * 120} key={i}>
              <div className="testi-card">
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__author">
                  <img src={t.avatar} alt={t.name} className="testi-card__avatar" />
                  <div>
                    <h4 className="testi-card__name">{t.name}</h4>
                    <span className="testi-card__role">{t.role}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="faq" id="faq">
        <div className="section-glow section-glow--center" />
        <div className="faq__inner">
          <div className="faq__header">
            <Reveal><p className="label">FAQ</p></Reveal>
            <Reveal delay={100}><h2 className="heading-2">Frequently asked <em>questions</em></h2></Reveal>
            <Reveal delay={150}><p className="body-text body-text--lg faq__subtitle">Everything you need to know before we start working together.</p></Reveal>
          </div>
          <div className="faq__list">
            {faqs.map((faq, i) => (
              <Reveal delay={i * 80} key={i}>
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  index={i}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="team">
        <div className="team__header">
          <Reveal><p className="label">The Team</p></Reveal>
          <Reveal delay={100}><h2 className="heading-2">The people behind <em>OneCode</em></h2></Reveal>
        </div>
        <div className="team__grid">
          {team.map((m, i) => (
            <Reveal delay={i * 100} key={i}>
              <div className="team-card">
                <div className="team-card__img"><img src={m.image} alt={m.name} /></div>
                <h3 className="team-card__name">{m.name}</h3>
                <span className="team-card__role">{m.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="contact" id="contact">
        <div className="section-glow section-glow--center" />
        <div className="contact__inner">
          <div className="contact__left">
            <Reveal><p className="label">Get In Touch</p></Reveal>
            <Reveal delay={100}><h2 className="heading-2">Let's bring your vision <em>online</em></h2></Reveal>
            <Reveal delay={150}>
              <p className="body-text body-text--lg">
                Need a landing page, a full website, or a custom web app? Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="contact__details">
                <div className="contact__item"><FiMail /> hello@onecode.dev</div>
                <div className="contact__item"><FiPhone /> +1 (555) 123-4567</div>
                <div className="contact__item"><FiMapPin /> San Francisco, CA</div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} className="contact__right">
            <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
              <input type="text" name="from_name" placeholder="Name" className="form-field" required />
              <input type="email" name="from_email" placeholder="Email" className="form-field" required />
              <select name="service" className="form-field form-select" required>
                <option value="">Select a service</option>
                <option>Landing Page</option>
                <option>Multipage Website</option>
                <option>Web Portfolio</option>
                <option>UI/UX Design</option>
                <option>Graphic Design</option>
                <option>Web Application</option>
                <option>Other</option>
              </select>
              <textarea name="message" placeholder="Tell us about your project..." className="form-field form-textarea" rows="5" required />
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
              <button type="submit" className={`btn btn--primary btn--full ${formStatus === 'sent' ? 'btn--success' : ''} ${formStatus === 'error' ? 'btn--error' : ''}`} disabled={formStatus === 'sending'}>
                <span>
                  {formStatus === 'idle' && 'Send Message'}
                  {formStatus === 'sending' && 'Sending...'}
                  {formStatus === 'sent' && 'Message Sent!'}
                  {formStatus === 'error' && 'Failed — Try Again'}
                </span>
                {formStatus === 'idle' && <HiArrowRight />}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="nav__logo"><img src={logoWhite} alt="OneCode" className="nav__logo-img" /></a>
            <p className="footer__tagline">Web design & development studio crafting digital experiences that convert.</p>
            <div className="footer__socials">
              <a href="#!" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#!" aria-label="Twitter"><FiTwitter /></a>
              <a href="#!" aria-label="GitHub"><FiGithub /></a>
              <a href="#!" aria-label="Dribbble"><FiDribbble /></a>
            </div>
          </div>
          <div className="footer__col"><h4>Company</h4><a href="#about">About</a><a href="#work">Work</a><a href="#!">Careers</a><a href="#contact">Contact</a></div>
          <div className="footer__col"><h4>Services</h4><a href="#!">Landing Pages</a><a href="#!">Multipage Websites</a><a href="#!">Web Portfolios</a><a href="#!">UI/UX Design</a></div>
          <div className="footer__col"><h4>Resources</h4><a href="#!">Blog</a><a href="#!">Case Studies</a><a href="#!">Documentation</a><a href="#!">Support</a></div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 OneCode. All rights reserved.</p>
          <div className="footer__bottom-links"><a href="#!">Privacy</a><a href="#!">Terms</a></div>
        </div>
      </footer>

      {/* ─── CASE STUDY OVERLAY ─── */}
      {activeCase && (
        <CaseStudy project={activeCase} onClose={() => setActiveCase(null)} />
      )}
    </div>
  );
}

export default App;
