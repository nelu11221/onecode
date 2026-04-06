import { useState, useEffect, useRef } from 'react';
import {
  HiArrowRight,
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
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
} from 'react-icons/fi';
import logoWhite from './logo_white.svg';
import './App.css';

/* ── Data ── */
const sliderData = [
  { id: 1, title: 'Landing Pages', tag: 'Web Design', description: 'High-converting landing pages that capture attention, communicate your value, and turn visitors into customers.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80' },
  { id: 2, title: 'Multipage Websites', tag: 'Development', description: 'Fully custom websites with multiple pages, smooth navigation, and a cohesive design that tells your brand story.', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80' },
  { id: 3, title: 'UI/UX Design', tag: 'Design', description: 'User-centered interfaces designed through research, prototyping, and testing to deliver intuitive experiences.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80' },
  { id: 4, title: 'Web Applications', tag: 'Apps', description: 'Custom web apps built with modern frameworks — dashboards, platforms, and tools tailored to your business.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80' },
];

const services = [
  { icon: <FiLayout />, title: 'Landing Pages', description: 'One-page websites designed to convert. Perfect for product launches, campaigns, and lead generation.', num: '01' },
  { icon: <FiLayers />, title: 'Multipage Websites', description: 'Complete websites with custom layouts, responsive design, and CMS integration for full control.', num: '02' },
  { icon: <FiGrid />, title: 'Web Portfolios', description: 'Stunning portfolio sites that showcase your work with smooth animations and a lasting impression.', num: '03' },
  { icon: <FiPenTool />, title: 'UI/UX Design', description: 'Research-driven design from wireframes to high-fidelity prototypes, focused on usability and beauty.', num: '04' },
  { icon: <FiImage />, title: 'Graphic Design', description: 'Brand identities, social media assets, marketing materials, and visual content that stands out.', num: '05' },
  { icon: <FiMonitor />, title: 'Web Applications', description: 'Custom dashboards, SaaS platforms, and interactive tools built with React, Next.js, and modern stacks.', num: '06' },
];

const portfolio = [
  { title: 'Luxe Realty', category: 'Landing Page', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', year: '2026' },
  { title: 'Moda Studio', category: 'Web Portfolio', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', year: '2025' },
  { title: 'NovaBrew', category: 'Multipage Website', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', year: '2025' },
  { title: 'Zenith Health', category: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', year: '2026' },
  { title: 'EcoTrack', category: 'Web Application', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', year: '2024' },
  { title: 'Atlas Ventures', category: 'Graphic Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', year: '2025' },
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


/* ══════════ APP ══════════ */
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

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
        <Reveal delay={100}>
          <div className="about__image-wrap">
            <ParallaxLayer speed={-0.05} className="about__parallax-img">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80" alt="Team collaboration" className="about__image" />
            </ParallaxLayer>
          </div>
        </Reveal>
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
              <div className="port-card">
                <div className="port-card__img"><img src={p.image} alt={p.title} /></div>
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
            <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name" className="form-field" />
              <input type="email" placeholder="Email" className="form-field" />
              <select className="form-field form-select">
                <option value="">Select a service</option>
                <option>Landing Page</option>
                <option>Multipage Website</option>
                <option>Web Portfolio</option>
                <option>UI/UX Design</option>
                <option>Graphic Design</option>
                <option>Web Application</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Tell us about your project..." className="form-field form-textarea" rows="5" />
              <button type="submit" className="btn btn--primary btn--full"><span>Send Message</span> <HiArrowRight /></button>
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
    </div>
  );
}

export default App;
