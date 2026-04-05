import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  HiArrowRight,
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import {
  FiCode,
  FiSmartphone,
  FiCloud,
  FiShield,
  FiZap,
  FiLayers,
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
import './App.css';

/* ── Data ── */
const sliderData = [
  {
    id: 1,
    title: 'Web Development',
    tag: 'Development',
    description:
      'We build high-performance web applications with modern frameworks that scale with your business.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  },
  {
    id: 2,
    title: 'Mobile Applications',
    tag: 'Mobile',
    description:
      'Native and cross-platform apps designed for seamless user experiences on every device.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Interface Design',
    tag: 'Design',
    description:
      'Intuitive, research-driven interfaces that delight users and drive measurable results.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
  },
  {
    id: 4,
    title: 'Cloud Infrastructure',
    tag: 'DevOps',
    description:
      'Scalable, resilient cloud architecture that keeps your products fast and always available.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  },
];

const services = [
  {
    icon: <FiCode />,
    title: 'Frontend Engineering',
    description:
      'Pixel-perfect interfaces built with React, Next.js, and Vue that perform at scale.',
    num: '01',
  },
  {
    icon: <FiLayers />,
    title: 'Backend Architecture',
    description:
      'Robust API design, microservices, and database architecture built for growth.',
    num: '02',
  },
  {
    icon: <FiSmartphone />,
    title: 'Mobile Development',
    description:
      'iOS and Android applications with fluid animations and native performance.',
    num: '03',
  },
  {
    icon: <FiCloud />,
    title: 'Cloud & DevOps',
    description:
      'CI/CD pipelines, containerization, and infrastructure-as-code on AWS and GCP.',
    num: '04',
  },
  {
    icon: <FiShield />,
    title: 'Cybersecurity',
    description:
      'Penetration testing, threat modeling, and secure-by-design engineering.',
    num: '05',
  },
  {
    icon: <FiZap />,
    title: 'Performance',
    description:
      'Core Web Vitals optimization, caching strategies, and real-time monitoring.',
    num: '06',
  },
];

const portfolio = [
  {
    title: 'FinTrack',
    category: 'Web Application',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    year: '2026',
  },
  {
    title: 'MediCare',
    category: 'Mobile App',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    year: '2025',
  },
  {
    title: 'ShopEase',
    category: 'E-Commerce Platform',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    year: '2025',
  },
  {
    title: 'EduLearn',
    category: 'SaaS Platform',
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    year: '2026',
  },
  {
    title: 'GreenGrid',
    category: 'IoT Dashboard',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    year: '2024',
  },
  {
    title: 'TravelMate',
    category: 'Mobile App',
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    year: '2025',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, FinTrack',
    text: "OneCode turned our rough prototype into a product that investors fight over. Their team operates at a level I haven't seen elsewhere.",
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'David Chen',
    role: 'CTO, MediCare',
    text: "Technical excellence combined with genuine care for the product. They didn't just build what we asked — they built what we needed.",
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, ShopEase',
    text: 'Working with OneCode felt like having a world-class engineering team in-house. The ROI was immediate and measurable.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'Lead Engineer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'Design Director',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    name: 'James Wilson',
    role: 'Backend Architect',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'Lisa Park',
    role: 'Project Lead',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  },
];

/* ══════════ APP ══════════ */
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  /* AOS */
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic', offset: 80 });
  }, []);

  /* Navbar scroll effect */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Slider auto-play */
  useEffect(() => {
    const t = setInterval(
      () => setCurrentSlide((p) => (p + 1) % sliderData.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  const prev = () =>
    setCurrentSlide((p) => (p - 1 + sliderData.length) % sliderData.length);
  const next = () =>
    setCurrentSlide((p) => (p + 1) % sliderData.length);

  return (
    <div className="app">

      {/* ─── NAVBAR ─── */}
      <nav className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#home" className="nav__logo">
            One<span>Code</span>
          </a>
          <ul className={`nav__links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#work" onClick={() => setMenuOpen(false)}>Work</a></li>
            <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="nav__right">
            <a href="#contact" className="nav__cta">
              Start a Project <HiArrowUpRight />
            </a>
            <button
              className="nav__burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero" id="home">
        <div className="hero__content">
          <p className="hero__tag anim-hero anim-hero--1">Digital Studio</p>
          <h1 className="hero__title anim-hero anim-hero--2">
            We turn ideas into{' '}
            <em className="hero__italic">digital</em>{' '}
            experiences
          </h1>
          <p className="hero__sub anim-hero anim-hero--3">
            A collective of engineers, designers and strategists crafting
            software that moves industries forward.
          </p>
          <div className="hero__actions anim-hero anim-hero--4">
            <a href="#work" className="btn btn--primary">
              View Our Work <HiArrowRight />
            </a>
            <a href="#about" className="btn btn--ghost">
              How We Work
            </a>
          </div>
        </div>

        <div className="hero__scroll anim-hero anim-hero--5">
          <span>Scroll</span>
          <FiArrowDown className="hero__scroll-icon" />
        </div>

        <div className="hero__stats">
          {[
            ['150+', 'Projects'],
            ['50+', 'Clients'],
            ['8+', 'Years'],
          ].map(([num, label], i) => (
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
          {[...Array(3)].map((_, i) => (
            <span key={i} className="marquee__content">
              Web Development &nbsp;&bull;&nbsp; Mobile Apps &nbsp;&bull;&nbsp;
              UI/UX Design &nbsp;&bull;&nbsp; Cloud Solutions &nbsp;&bull;&nbsp;
              Strategy &nbsp;&bull;&nbsp; Branding &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── SHOWCASE / SLIDER ─── */}
      <section className="showcase" id="work">
        <div className="showcase__header">
          <p className="label" data-aos="fade-up">Featured Work</p>
          <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
            Selected <em>projects</em>
          </h2>
        </div>

        <div className="showcase__slider">
          <div className="showcase__slider-img">
            {sliderData.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                className={`showcase__img ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
            <div className="showcase__slider-overlay" />
          </div>

          <div className="showcase__slider-info">
            <div className="showcase__slider-text">
              <span className="showcase__tag">{sliderData[currentSlide].tag}</span>
              <h3 className="heading-3" key={`t-${currentSlide}`}>
                {sliderData[currentSlide].title}
              </h3>
              <p className="body-text" key={`d-${currentSlide}`}>
                {sliderData[currentSlide].description}
              </p>
            </div>

            <div className="showcase__controls">
              <button className="showcase__arrow" onClick={prev} aria-label="Previous slide">
                <HiChevronLeft />
              </button>
              <span className="showcase__count">
                {String(currentSlide + 1).padStart(2, '0')} /{' '}
                {String(sliderData.length).padStart(2, '0')}
              </span>
              <button className="showcase__arrow" onClick={next} aria-label="Next slide">
                <HiChevronRight />
              </button>
            </div>

            <div className="showcase__progress">
              <div
                className="showcase__progress-bar"
                key={`bar-${currentSlide}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="about" id="about">
        <div className="about__inner">
          <div className="about__left">
            <p className="label" data-aos="fade-up">About Us</p>
            <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
              We believe great software starts with understanding{' '}
              <em>people</em>
            </h2>
          </div>
          <div className="about__right">
            <p className="body-text body-text--lg" data-aos="fade-up" data-aos-delay="150">
              OneCode is a collective of engineers, designers and strategists
              who don't just write code &mdash; we solve problems, build
              relationships, and deliver products that matter. We work as an
              extension of your team, not a vendor.
            </p>
            <div className="about__features" data-aos="fade-up" data-aos-delay="200">
              {[
                'Agile-first methodology',
                'Transparent communication',
                'End-to-end ownership',
                'Post-launch support',
              ].map((f) => (
                <div className="about__feat" key={f}>
                  <span className="about__check" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div data-aos="fade-up" data-aos-delay="250">
              <a href="#services" className="btn btn--primary">
                Our Process <HiArrowRight />
              </a>
            </div>
          </div>
        </div>

        <div className="about__image-wrap" data-aos="fade-up" data-aos-delay="100">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80"
            alt="Team collaboration"
            className="about__image"
          />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services" id="services">
        <div className="services__header">
          <p className="label" data-aos="fade-up">What We Do</p>
          <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
            Services built for <em>scale</em>
          </h2>
        </div>
        <div className="services__grid">
          {services.map((s, i) => (
            <div
              className="service-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="service-card__top">
                <span className="service-card__num">{s.num}</span>
                <span className="service-card__icon">{s.icon}</span>
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
              <span className="service-card__arrow"><HiArrowUpRight /></span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="portfolio">
        <div className="portfolio__header">
          <p className="label" data-aos="fade-up">Portfolio</p>
          <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
            Recent <em>work</em>
          </h2>
        </div>
        <div className="portfolio__grid">
          {portfolio.map((p, i) => (
            <div
              className="port-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="port-card__img">
                <img src={p.image} alt={p.title} />
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
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials">
        <div className="testimonials__header">
          <p className="label" data-aos="fade-up">Testimonials</p>
          <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
            Trusted by <em>industry</em> leaders
          </h2>
        </div>
        <div className="testimonials__list">
          {testimonials.map((t, i) => (
            <div
              className="testi-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <p className="testi-card__text">"{t.text}"</p>
              <div className="testi-card__author">
                <img src={t.avatar} alt={t.name} className="testi-card__avatar" />
                <div>
                  <h4 className="testi-card__name">{t.name}</h4>
                  <span className="testi-card__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="team">
        <div className="team__header">
          <p className="label" data-aos="fade-up">The Team</p>
          <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
            The people behind <em>OneCode</em>
          </h2>
        </div>
        <div className="team__grid">
          {team.map((m, i) => (
            <div
              className="team-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="team-card__img">
                <img src={m.image} alt={m.name} />
              </div>
              <h3 className="team-card__name">{m.name}</h3>
              <span className="team-card__role">{m.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="contact" id="contact">
        <div className="contact__inner">
          <div className="contact__left">
            <p className="label" data-aos="fade-up">Get In Touch</p>
            <h2 className="heading-2" data-aos="fade-up" data-aos-delay="100">
              Let's build something <em>remarkable</em>
            </h2>
            <p className="body-text body-text--lg" data-aos="fade-up" data-aos-delay="150">
              Have a project in mind? We'd love to hear about it.
              Drop us a line and let's start a conversation.
            </p>
            <div className="contact__details" data-aos="fade-up" data-aos-delay="200">
              <div className="contact__item">
                <FiMail /> hello@onecode.dev
              </div>
              <div className="contact__item">
                <FiPhone /> +1 (555) 123-4567
              </div>
              <div className="contact__item">
                <FiMapPin /> San Francisco, CA
              </div>
            </div>
          </div>
          <div className="contact__right" data-aos="fade-up" data-aos-delay="150">
            <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Name" className="form-field" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" className="form-field" />
              </div>
              <div className="form-group">
                <select className="form-field form-select">
                  <option value="">Select a service</option>
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                  <option>Cloud & DevOps</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Tell us about your project..."
                  className="form-field form-textarea"
                  rows="5"
                />
              </div>
              <button type="submit" className="btn btn--primary btn--full">
                Send Message <HiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="nav__logo">
              One<span>Code</span>
            </a>
            <p className="footer__tagline">
              Crafting digital solutions that drive real-world results.
            </p>
            <div className="footer__socials">
              <a href="#!" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#!" aria-label="Twitter"><FiTwitter /></a>
              <a href="#!" aria-label="GitHub"><FiGithub /></a>
              <a href="#!" aria-label="Dribbble"><FiDribbble /></a>
            </div>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#!">Careers</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <a href="#!">Web Development</a>
            <a href="#!">Mobile Apps</a>
            <a href="#!">UI/UX Design</a>
            <a href="#!">Cloud Solutions</a>
          </div>
          <div className="footer__col">
            <h4>Resources</h4>
            <a href="#!">Blog</a>
            <a href="#!">Case Studies</a>
            <a href="#!">Documentation</a>
            <a href="#!">Support</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 OneCode. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#!">Privacy</a>
            <a href="#!">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
