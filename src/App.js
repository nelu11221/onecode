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
  FiTrendingUp,
  FiCalendar,
  FiMessageCircle,
  FiCode,
} from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import logoWhite from './logo_white.svg';
import { translations } from './i18n';
import './App.css';

/* ── Language-neutral data (icons + images + non-translatable values) ── */
const PU = process.env.PUBLIC_URL;

const sliderImages = [
  `${PU}/project1.jpg`,
  `${PU}/project5.jpg`,
  `${PU}/project4.jpg`,
  `${PU}/project6.jpg`,
];

const serviceIcons = [<FiLayout />, <FiLayers />, <FiTarget />, <FiTrendingUp />, <FiImage />, <FiMonitor />];

const portfolioMeta = [
  { title: 'Nymb', filterKey: 'web-dev', image: `${PU}/project1.jpg`, year: '2025', gallery: [`${PU}/project1b.jpg`, `${PU}/project1c.jpg`, `${PU}/project1d.jpg`, `${PU}/project1e.jpg`] },
  { title: 'Dimora del Tramonto', filterKey: 'web-dev', image: `${PU}/project2.jpg`, year: '2025', gallery: [`${PU}/project2b.jpg`, `${PU}/project2c.jpg`, `${PU}/project2d.jpg`, `${PU}/project2e.jpg`] },
  { title: 'Bimmer', filterKey: 'web-dev', image: `${PU}/project3.jpg`, year: '2025', gallery: [`${PU}/project3b.jpg`, `${PU}/project3c.jpg`, `${PU}/project3d.jpg`, `${PU}/project3e.jpg`] },
  { title: 'Start', filterKey: 'web-dev', image: `${PU}/project4.jpg`, year: '2025', gallery: [`${PU}/project4b.jpg`, `${PU}/project4c.jpg`, `${PU}/project4d.jpg`, `${PU}/project4e.jpg`] },
  { title: 'GranStilArt', filterKey: 'web-dev', image: `${PU}/project5.jpg`, year: '2025', gallery: [] },
  { title: 'VertragPlus', filterKey: 'web-dev', image: `${PU}/project6.jpg`, year: '2025', gallery: [`${PU}/project6b.jpg`, `${PU}/project6c.jpg`, `${PU}/project6d.jpg`, `${PU}/project6e.jpg`] },
  { title: 'Dimora del Tramonto — Logo', filterKey: 'graphic', image: `${PU}/project7.jpg`, year: '2025', gallery: [`${PU}/project7b.jpg`, `${PU}/project7c.jpg`] },
  { title: 'Artmedia', filterKey: 'graphic', image: `${PU}/project8.jpg`, year: '2025', gallery: [`${PU}/project8b.jpg`, `${PU}/project8c.jpg`, `${PU}/project8d.jpg`] },
  { title: 'Renstal', filterKey: 'graphic', image: `${PU}/project9.jpg`, year: '2025', gallery: [`${PU}/project9b.jpg`, `${PU}/project9c.jpg`, `${PU}/project9d.jpg`] },
  { title: 'Cosmetology Clinic', filterKey: 'marketing', image: `${PU}/project10.jpg`, statsCard: true, year: '2025', gallery: [],
    stats: { conversations: '402', costPer: '$1.08', spent: '$436.11', dailyBudget: '$5.00', reach: '10,604', impressions: '34,526' } },
  { title: 'Trauma Clinic', filterKey: 'marketing', image: `${PU}/project11.jpg`, statsCard: true, year: '2025', gallery: [],
    stats: { conversations: '445', costPer: '$0.98', spent: '$436.39', dailyBudget: '$5.00', reach: '20,878', impressions: '54,300' } },
  { title: 'B2B Flower Wholesale', filterKey: 'marketing', image: `${PU}/project12.jpg`, statsCard: true, year: '2025', gallery: [],
    stats: { conversations: '83', costPer: '$1.31', spent: '$108.53', dailyBudget: '$5.00', reach: '20,173', impressions: '27,556' } },
];

const testimonialMeta = [
  { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
];

/* ── Build localized arrays from translations + meta ── */
const buildSliderData = (t) => t.slider.map((s, i) => ({ id: i + 1, ...s, image: sliderImages[i] }));
const buildServices = (t) => t.services.items.map((s, i) => ({ ...s, icon: serviceIcons[i], num: String(i + 1).padStart(2, '0') }));
const buildPortfolio = (t) => portfolioMeta.map((m, i) => ({ ...m, ...t.portfolioItems[i] }));
const buildTestimonials = (t) => testimonialMeta.map((m, i) => ({ ...m, ...t.testimonials.items[i] }));

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
/* ── Stats card (mimics ad-platform results screen) ── */
const DEFAULT_STATS = { conversations: 402, costPer: '$1.08', spent: '$436.11', dailyBudget: '$5.00', reach: '10,604', impressions: '34,526' };
function StatsCard({ t, compact = false, stats }) {
  const labels = t.statsCard || {};
  const s = { ...DEFAULT_STATS, ...(stats || {}) };
  return (
    <div className={`stats-card ${compact ? 'stats-card--compact' : ''}`}>
      <div className="stats-card__head">
        <h4 className="stats-card__title">{labels.results || 'Results'}</h4>
        <a href="#!" className="stats-card__link" onClick={(e) => e.preventDefault()}>
          {labels.seePerformance || 'See performance'}
        </a>
      </div>
      <div className="stats-card__tabs">
        <span className="stats-card__tab"><span className="stats-card__tab-ico">▦</span> {labels.last30 || 'Last 30 days'}</span>
        <span className="stats-card__tab stats-card__tab--active">{labels.maximum || 'Maximum'}</span>
        <span className="stats-card__tab">{labels.today || 'Today'}</span>
      </div>
      <div className="stats-card__row">
        <div className="stats-card__metric">
          <span className="stats-card__num">{s.conversations}</span>
          <span className="stats-card__lbl">{labels.convosStarted || 'Conversations started in app'}</span>
        </div>
        <div className="stats-card__metric">
          <span className="stats-card__num">{s.costPer}</span>
          <span className="stats-card__lbl">{labels.costPer || 'Cost per: Conversation started in app'}</span>
        </div>
        <div className="stats-card__metric">
          <span className="stats-card__num">{s.spent}</span>
          <span className="stats-card__lbl">{labels.amountSpent || 'Amount spent'}</span>
        </div>
      </div>
      <div className="stats-card__budget">
        {labels.dailyBudget || 'Daily budget'} {s.dailyBudget} <span className="stats-card__pencil">✎</span>
      </div>
      <div className="stats-card__row stats-card__row--last">
        <div className="stats-card__metric">
          <span className="stats-card__num">{s.reach}</span>
          <span className="stats-card__lbl">{labels.reach || 'Reach'}</span>
        </div>
        <div className="stats-card__metric">
          <span className="stats-card__num">{s.impressions}</span>
          <span className="stats-card__lbl">{labels.impressions || 'Impressions'}</span>
        </div>
      </div>
      <div className="stats-card__more">⌄ {labels.more || 'More'}</div>
    </div>
  );
}

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
function CaseStudy({ project, onClose, t }) {
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

        <div className={`case__hero ${!project.image && project.statsCard ? 'case__hero--stats' : ''}`}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="case__hero-img" decoding="async" />
          ) : project.statsCard ? (
            <div className="case__hero-stats"><StatsCard t={t} stats={project.stats} /></div>
          ) : null}
          <div className="case__hero-overlay" />
          <div className="case__hero-content">
            <span className="case__tag">{project.category}</span>
            <h1 className="case__title">{project.title}</h1>
            <span className="case__year">{project.year}</span>
          </div>
        </div>

        <div className="case__body">
          <div className="case__section">
            <h2 className="case__heading">{t.caseStudy.overview}</h2>
            <p className="case__text">{project.overview}</p>
          </div>

          <div className="case__two-col">
            <div className="case__section">
              <h2 className="case__heading">{t.caseStudy.challenge}</h2>
              <p className="case__text">{project.challenge}</p>
            </div>
            <div className="case__section">
              <h2 className="case__heading">{t.caseStudy.solution}</h2>
              <p className="case__text">{project.solution}</p>
            </div>
          </div>

          {project.statsCard && project.image && (
            <div className="case__section case__section--stats">
              <h2 className="case__heading">{t.statsCard?.results || 'Results'}</h2>
              <div className="case__stats-wrap">
                <StatsCard t={t} stats={project.stats} />
              </div>
            </div>
          )}

          <div className="case__section">
            <h2 className="case__heading">{t.caseStudy.servicesProvided}</h2>
            <div className="case__services">
              {project.services.map((s) => (
                <span key={s} className="case__service-tag">{s}</span>
              ))}
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="case__section">
              <h2 className="case__heading">{t.caseStudy.gallery}</h2>
              <div className="case__gallery">
                {project.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} className="case__gallery-img" loading="lazy" decoding="async" />
                ))}
              </div>
            </div>
          )}

          <div className="case__footer">
            <button className="btn btn--ghost" onClick={onClose}>
              <HiArrowLeft /> {t.caseStudy.back}
            </button>
            <a href="#contact" className="btn btn--primary" onClick={onClose}>
              <span>{t.caseStudy.startSimilar}</span> <HiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════ APP ══════════ */
function ProjectsPage({ onOpenCase, onBack, t, portfolio }) {
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const visible = portfolio.filter((p) => filter === 'all' || p.filterKey === filter);
  return (
    <div className="projects-page">
      <div className="projects-page__head">
        <button className="projects-page__back" onClick={onBack}>
          <HiArrowLeft /> {t.projectsPage.back}
        </button>
        <p className="label">{t.projectsPage.label}</p>
        <h1 className="heading-2">{t.projectsPage.headingPre} <em>{t.projectsPage.headingEm}</em></h1>
        <p className="body-text body-text--lg projects-page__intro">{t.projectsPage.intro}</p>
      </div>
      <div className="portfolio__filters projects-page__filters">
        {[{ key: 'all', label: t.portfolio.filterAll }, ...t.portfolio.filterGroups].map((group) => {
          const isActive = filter === group.key;
          return (
            <button
              key={group.key}
              className={`portfolio__filter ${isActive ? 'portfolio__filter--active' : ''}`}
              onClick={() => setFilter(group.key)}
            >
              {group.label}
            </button>
          );
        })}
      </div>
      <div className="projects-page__grid portfolio__grid--slider">
        {visible.map((p, i) => (
          <div
            key={`${filter}-${i}`}
            className="port-card"
            onClick={() => onOpenCase(p)}
            role="button"
            tabIndex={0}
          >
            <div className="port-card__img">
              <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
              <div className="port-card__overlay">
                <span className="port-card__view">{t.portfolio.view} <HiArrowUpRight /></span>
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
        ))}
      </div>
    </div>
  );
}

function LegalPage({ onBack, page }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const p = page;
  return (
    <div className="projects-page legal-page">
      <div className="projects-page__head">
        <button className="projects-page__back" onClick={onBack}>
          <HiArrowLeft /> {p.back}
        </button>
        <p className="label">{p.label}</p>
        <h1 className="heading-2">{p.title}</h1>
        <p className="legal-page__updated">{p.updated}</p>
        <p className="body-text body-text--lg projects-page__intro">{p.intro}</p>
      </div>
      <div className="legal-page__body">
        {p.sections.map((s, i) => (
          <div key={i} className="legal-page__section">
            <h3>{s.heading}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCase, setActiveCase] = useState(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    if (window.location.hash === '#/projects') return 'projects';
    if (window.location.hash === '#/privacy') return 'privacy';
    if (window.location.hash === '#/terms') return 'terms';
    return 'home';
  });
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('lang') || 'en';
  });
  const t = translations[lang];
  const sliderData = buildSliderData(t);
  const services = buildServices(t);
  const portfolio = buildPortfolio(t);
  const testimonials = buildTestimonials(t);
  const faqs = t.faq.items;
  const toggleLang = () => {
    const next = lang === 'en' ? 'ro' : 'en';
    setLang(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', next);
      document.documentElement.lang = next;
    }
  };
  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);
  const formRef = useRef(null);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#/projects') setRoute('projects');
      else if (window.location.hash === '#/privacy') setRoute('privacy');
      else if (window.location.hash === '#/terms') setRoute('terms');
      else setRoute('home');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goToProjects = (e) => {
    if (e) e.preventDefault();
    window.location.hash = '#/projects';
  };
  const goToPrivacy = (e) => {
    if (e) e.preventDefault();
    window.location.hash = '#/privacy';
  };
  const goToTerms = (e) => {
    if (e) e.preventDefault();
    window.location.hash = '#/terms';
  };
  const goHome = (e) => {
    if (e) e.preventDefault();
    window.location.hash = '';
  };


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
  }, [sliderData.length]);

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
          <a href="#home" className="nav__logo"><img src={logoWhite} alt="Urma Digital" className="nav__logo-img" width="75" height="44" /></a>
          <ul className={`nav__links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>{t.nav.home}</a></li>
            <li><a href="#work" onClick={() => setMenuOpen(false)}>{t.nav.work}</a></li>
            <li><a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a></li>
            <li className="nav__links-lang">
              <button className="nav__lang nav__lang--menu" onClick={toggleLang} aria-label="Toggle language">
                <span className={lang === 'en' ? 'nav__lang-active' : ''}>EN</span>
                <span className="nav__lang-sep">/</span>
                <span className={lang === 'ro' ? 'nav__lang-active' : ''}>RO</span>
              </button>
            </li>
          </ul>
          <div className="nav__right">
            <button className="nav__lang nav__lang--desktop" onClick={toggleLang} aria-label="Toggle language">
              <span className={lang === 'en' ? 'nav__lang-active' : ''}>EN</span>
              <span className="nav__lang-sep">/</span>
              <span className={lang === 'ro' ? 'nav__lang-active' : ''}>RO</span>
            </button>
            <a href="#contact" className="nav__cta">{t.nav.cta} <HiArrowUpRight /></a>
            <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {route === 'projects' ? (
        <ProjectsPage onOpenCase={setActiveCase} onBack={goHome} t={t} portfolio={portfolio} />
      ) : route === 'privacy' ? (
        <LegalPage onBack={goHome} page={t.privacyPage} />
      ) : route === 'terms' ? (
        <LegalPage onBack={goHome} page={t.termsPage} />
      ) : (
      <>
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
            <p className="hero__tag anim-hero anim-hero--1">{t.hero.tag}</p>
            <h1 className="hero__title anim-hero anim-hero--2">
              {t.hero.title1}{' '}
              <em className="hero__italic">{t.hero.titleItalic}</em>{' '}
              {t.hero.title2}
            </h1>
            <p className="hero__sub anim-hero anim-hero--3">{t.hero.subtitle}</p>
            <div className="hero__actions anim-hero anim-hero--4">
              <a href="#work" className="btn btn--primary">
                <span className="btn__label-desktop">{t.hero.primaryDesktop}</span>
                <span className="btn__label-mobile">{t.hero.primaryMobile}</span>
                <HiArrowRight />
              </a>
              <a href="#services" className="btn btn--ghost">{t.hero.secondary}</a>
            </div>
          </div>
        </ParallaxLayer>

        <div className="hero__bottom-block hero__mobile-only anim-hero anim-hero--5">
          <p className="hero__bottom-sub">{t.hero.subtitle}</p>
        </div>

        <div className="hero__scroll anim-hero anim-hero--5">
          <span>{t.hero.scroll}</span>
          <FiArrowDown className="hero__scroll-icon" />
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
        <Reveal><p className="label">{t.showcase.label}</p></Reveal>
        <Reveal delay={100}><h2 className="heading-2">{t.showcase.headingPre} <em>{t.showcase.headingEm}</em></h2></Reveal>
        <div className="showcase__spacer" />

        <div className="showcase__slider">
          <div className="showcase__slider-img">
            {sliderData.map((slide, index) => (
              <img key={slide.id} src={slide.image} alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'} decoding="async"
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
              <button className="showcase__arrow" onClick={prev} aria-label={t.showcase.prev}><HiChevronLeft /></button>
              <span className="showcase__count">{String(currentSlide + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}</span>
              <button className="showcase__arrow" onClick={next} aria-label={t.showcase.next}><HiChevronRight /></button>
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
          <Reveal><p className="label">{t.portfolio.label}</p></Reveal>
          <Reveal delay={100}>
            <h2 className="heading-2 portfolio__heading-desktop">{t.portfolio.headingPre} <em>{t.portfolio.headingEm}</em></h2>
            <h2 className="heading-2 portfolio__heading-mobile">{t.portfolio.headingMobilePre} <em>{t.portfolio.headingMobileEm}</em></h2>
          </Reveal>
        </div>
        <div className="portfolio__grid portfolio__grid--slider">
          {portfolio.filter((p) => p.title !== 'GranStilArt').slice(0, 6).map((p, i) => (
            <Reveal delay={i * 80} key={i}>
              <div className="port-card" onClick={() => setActiveCase(p)} role="button" tabIndex={0}>
                <div className={`port-card__img ${!p.image && p.statsCard ? 'port-card__img--stats' : ''}`}>
                  {p.image ? <img src={p.image} alt={p.title} loading="lazy" decoding="async" /> : (p.statsCard ? <StatsCard t={t} compact stats={p.stats} /> : null)}
                  <div className="port-card__overlay">
                    <span className="port-card__view">{t.portfolio.view} <HiArrowUpRight /></span>
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
        <Reveal delay={120}>
          <div className="portfolio__cta">
            <a href="#/projects" onClick={goToProjects} className="btn btn--ghost">
              {t.portfolio.seeAll} <HiArrowUpRight />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="about" id="about">
        <div className="section-glow section-glow--right" />
        <div className="about__inner">
          <div className="about__left">
            <Reveal><p className="label">{t.about.label}</p></Reveal>
            <Reveal delay={100}>
              <h2 className="heading-2">
                {t.about.headingPre} <em>{t.about.headingEm}</em>
              </h2>
            </Reveal>
          </div>
          <div className="about__right">
            <Reveal delay={150}>
              <p className="body-text body-text--lg">{t.about.body}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="about__features">
                {t.about.features.map((f) => (
                  <div className="about__feat" key={f}>
                    <span className="about__check" /><span>{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={250}>
              <a href="#services" className="btn btn--primary"><span>{t.about.seeServices}</span> <HiArrowRight /></a>
            </Reveal>
          </div>
        </div>
        <div className="process">
          <div className="process__grid">
            <Reveal>
              <div className="process__card">
                <div className="process__card-icon"><FiTarget /></div>
                <h3 className="process__card-title">{t.process.card1.title} <em>{t.process.card1.titleEm}</em> {t.process.card1.titleSuffix}</h3>
                <p className="process__card-text">{t.process.card1.text}</p>
                <div className="process__tags">
                  {t.process.card1.tags.map((tag, i) => (
                    <span key={i} className={`process__tag ${i === t.process.card1.tags.length - 1 ? 'process__tag--accent' : ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="process__card">
                <div className="process__card-icon"><FiCalendar /></div>
                <h3 className="process__card-title">{t.process.card2.title} <em>{t.process.card2.titleEm}</em></h3>
                <p className="process__card-text">{t.process.card2.text}</p>
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
                <h3 className="process__card-title">{t.process.card3.title} <em>{t.process.card3.titleEm}</em></h3>
                <p className="process__card-text">{t.process.card3.text}</p>
                <div className="process__chat">
                  <span className="process__bubble process__bubble--client">{t.process.card3.chatClient}</span>
                  <span className="process__bubble process__bubble--us">{t.process.card3.chatUs}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="process__card">
                <div className="process__card-icon"><FiCode /></div>
                <h3 className="process__card-title">{t.process.card4.title} <em>{t.process.card4.titleEm}</em></h3>
                <p className="process__card-text">{t.process.card4.text}</p>
                <div className="process__tags">
                  {t.process.card4.tags.map((tag, i) => (
                    <span key={i} className="process__tag">{tag}</span>
                  ))}
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
          <Reveal><p className="label">{t.services.label}</p></Reveal>
          <Reveal delay={100}><h2 className="heading-2">{t.services.headingPre} <em>{t.services.headingEm}</em></h2></Reveal>
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
          <Reveal><p className="label">{t.testimonials.label}</p></Reveal>
          <Reveal delay={100}><h2 className="heading-2">{t.testimonials.headingPre} <em>{t.testimonials.headingEm}</em> {t.testimonials.headingSuffix}</h2></Reveal>
        </div>
        <div className="testimonials__list">
          {testimonials.map((t, i) => (
            <Reveal delay={i * 120} key={i}>
              <div className="testi-card">
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__author">
                  <img src={t.avatar} alt={t.name} className="testi-card__avatar" loading="lazy" decoding="async" width="48" height="48" />
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
            <Reveal><p className="label">{t.faq.label}</p></Reveal>
            <Reveal delay={100}><h2 className="heading-2">{t.faq.headingPre} <em>{t.faq.headingEm}</em></h2></Reveal>
            <Reveal delay={150}><p className="body-text body-text--lg faq__subtitle">{t.faq.subtitle}</p></Reveal>
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

      {/* ─── CONTACT ─── */}
      <section className="contact" id="contact">
        <div className="section-glow section-glow--center" />
        <div className="contact__inner">
          <div className="contact__left">
            <Reveal><p className="label">{t.contact.label}</p></Reveal>
            <Reveal delay={100}><h2 className="heading-2">{t.contact.headingPre} <em>{t.contact.headingEm}</em></h2></Reveal>
            <Reveal delay={150}>
              <p className="body-text body-text--lg">{t.contact.body}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="contact__details">
                <div className="contact__item"><FiMail /> <a href="mailto:urmadigital@gmail.com">urmadigital@gmail.com</a></div>
                <div className="contact__item"><FiPhone /> <a href="tel:+37379454943">+373 79 45 49 43</a></div>
                <div className="contact__item"><FiMapPin /> Chișinău, MD</div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} className="contact__right">
            <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="from_name">{t.contact.form.name}</label>
              <input id="from_name" type="text" name="from_name" placeholder={t.contact.form.name} className="form-field" required autoComplete="name" />
              <label className="sr-only" htmlFor="from_email">{t.contact.form.email}</label>
              <input id="from_email" type="email" name="from_email" placeholder={t.contact.form.email} className="form-field" required autoComplete="email" />
              <label className="sr-only" htmlFor="from_phone">{t.contact.form.phone}</label>
              <input id="from_phone" type="tel" name="from_phone" placeholder={t.contact.form.phone} className="form-field" required autoComplete="tel" />
              <label className="sr-only" htmlFor="service">{t.contact.form.selectService}</label>
              <select id="service" name="service" className="form-field form-select" required>
                <option value="">{t.contact.form.selectService}</option>
                {t.contact.form.serviceOptions.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
              <label className="sr-only" htmlFor="message">{t.contact.form.message}</label>
              <textarea id="message" name="message" placeholder={t.contact.form.message} className="form-field form-textarea" rows="5" required />
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
              <label className="form-consent" htmlFor="consent">
                <input id="consent" type="checkbox" name="consent" required />
                <span>
                  {t.contact.form.consentPre}
                  <a href="#/privacy" onClick={goToPrivacy}>{t.contact.form.consentLink}</a>
                  {t.contact.form.consentPost}
                </span>
              </label>
              <button type="submit" className={`btn btn--primary btn--full ${formStatus === 'sent' ? 'btn--success' : ''} ${formStatus === 'error' ? 'btn--error' : ''}`} disabled={formStatus === 'sending'}>
                <span>
                  {formStatus === 'idle' && t.contact.form.statusIdle}
                  {formStatus === 'sending' && t.contact.form.statusSending}
                  {formStatus === 'sent' && t.contact.form.statusSent}
                  {formStatus === 'error' && t.contact.form.statusError}
                </span>
                {formStatus === 'idle' && <HiArrowRight />}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
      </>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="nav__logo"><img src={logoWhite} alt="OneCode" className="nav__logo-img" loading="lazy" decoding="async" /></a>
            <p className="footer__tagline">{t.footer.tagline}</p>
            <div className="footer__socials">
              <a href="#!" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#!" aria-label="Twitter"><FiTwitter /></a>
              <a href="#!" aria-label="GitHub"><FiGithub /></a>
              <a href="#!" aria-label="Dribbble"><FiDribbble /></a>
            </div>
          </div>
          <div className="footer__col">
            <h4>{t.footer.company}</h4>
            {t.footer.companyLinks.map((label, i) => {
              const hrefs = ['#about', '#work', '#services', '#contact'];
              return <a key={i} href={hrefs[i]}>{label}</a>;
            })}
          </div>
          <div className="footer__col">
            <h4>{t.footer.services}</h4>
            {t.footer.serviceLinks.map((label, i) => <a key={i} href="#services">{label}</a>)}
          </div>
          <div className="footer__col">
            <h4>{t.footer.resources}</h4>
            <a href="mailto:urmadigital@gmail.com">urmadigital@gmail.com</a>
            <a href="tel:+37379454943">+373 79 45 49 43</a>
            <span className="footer__col-static">Chișinău, MD</span>
          </div>
        </div>
        <div className="footer__bottom">
          <p>{t.footer.copyright}</p>
          <div className="footer__bottom-links"><a href="#/privacy" onClick={goToPrivacy}>{t.footer.privacy}</a><a href="#/terms" onClick={goToTerms}>{t.footer.terms}</a></div>
        </div>
      </footer>

      {/* ─── CASE STUDY OVERLAY ─── */}
      {activeCase && (
        <CaseStudy project={activeCase} onClose={() => setActiveCase(null)} t={t} />
      )}
    </div>
  );
}

export default App;
