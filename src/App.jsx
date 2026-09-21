import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Menu,
  MessageCircle,
  Moon,
  Send,
  Sparkles,
  Terminal,
  X,
  Zap
} from "lucide-react";

const projects = [
  {
    title: "Heart Disease AI",
    tag: "ML + Flask",
    description:
      "A multi-class heart disease risk prediction system with an ANN, dropout, L2 regularization and traditional ML comparison.",
    tech: ["Python", "TensorFlow", "scikit-learn", "Flask"],
    github: "https://github.com/husnain-ali2"
  },
  
   {
  title: "Groq AI Web Chatbot",
  tag: "AI + LLM",
  description:
    "A high-speed conversational AI chatbot leveraging Groq API for ultra-fast response generation and seamless user interactions.",
  tech: ["HTML", "Groq API", "JavaScript", "CSS"],
  github: "https://github.com/husnain-ali2"
},
  {
    title: "Fake News Detector",
    tag: "NLP + Web",
    description:
      "An AI application that checks a news claim, evaluates available evidence and presents supporting sources and headlines.",
    tech: ["Python", "NLP", "Flask", "Web Search"],
    github: "https://github.com/husnain-ali2"
  }
];

const skills = [
  ["Python", "Advanced", 92],
  ["Machine Learning", "Advanced", 88],
  ["PyTorch", "Strong", 82],
  ["TensorFlow", "Strong", 80],
  ["scikit-learn", "Strong", 86],
  ["Flask / Django", "Strong", 84],
  ["JavaScript", "Strong", 78],
  ["HTML / CSS", "Strong", 90],
  ["Django", "Strong", 90],
  ["React.js ", "Strong", 90]
];

const pages = ["home", "about", "skills", "projects", "blog", "contact"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [darkGlow, setDarkGlow] = useState(true);
  const [sent, setSent] = useState(false);
  const [active, setActive] = useState("home");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      setScrolled(window.scrollY > 30);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);

      let current = "home";
      for (const id of pages) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let ringX = 0, ringY = 0;
    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ringX = e.clientX;
      ringY = e.clientY;
      const hovering = e.target.closest("button, a, input, textarea");
      ring.classList.toggle("hovering", !!hovering);
    };
    let raf;
    const animateRing = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(animateRing);
    };
    window.addEventListener("mousemove", onMove);
    animateRing();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) translateY(-8px)`;
  };
  const resetTilt = (e) => {
    e.currentTarget.style.transform = "";
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
    const submitContact = (e) => {
  e.preventDefault();

  const form = e.currentTarget;

  const name = encodeURIComponent(form.elements[0].value);
  const email = encodeURIComponent(form.elements[1].value);
  const subject = encodeURIComponent(form.elements[2].value);
  const message = encodeURIComponent(
    `Name: ${form.elements[0].value}\nEmail: ${form.elements[1].value}\n\n${form.elements[3].value}`
  );

  const gmailURL =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=husnain45605@gmail.com` +
    `&su=${subject}` +
    `&body=${message}`;

  window.open(gmailURL, "_blank");

  setSent(true);
  setTimeout(() => setSent(false), 3500);
};
  
  return (
    <div className={darkGlow ? "app" : "app no-glow"}>
      {loading && (
        <div className="loader">
          <span>H<i>A</i></span>
        </div>
      )}
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="noise" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <header className={scrolled ? "navbar scrolled" : "navbar"}>
        <button className="brand" onClick={() => scrollTo("home")}>
          H<span>A</span>
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {pages.map((item) => (
            <button
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="Toggle glow"
            onClick={() => setDarkGlow((v) => !v)}
          >
            <Moon size={17} />
          </button>
          <button className="connect-btn" onClick={() => scrollTo("contact")}>
            Let&apos;s Connect <ArrowUpRight size={16} />
          </button>
          <button
            className="mobile-btn"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
                <section id="home" className="hero section">
          <div className="hero-copy reveal-left in-view">
            <div className="availability">
              <span />
              Available for freelance & remote work
            </div>

            <p className="eyebrow">HELLO, I&apos;M</p>
            <h1>
              Husnain <span>Ali</span>
            </h1>
            <h2>
              AI/ML Engineer <i>&amp;</i> Full Stack Developer
            </h2>
            <p className="hero-text">
              I build intelligent, practical software with Python, machine
              learning and modern web technologies — turning ideas into useful
              products.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => scrollTo("projects")}>
                View My Work <ArrowUpRight size={18} />
              </button>
              <a className="secondary-btn" href="./husnain-cv.pdf" download>
                <Download size={18} /> Download CV
              </a>
            </div>

            <div className="socials">
              <a href="https://github.com/husnain-ali2" target="_blank" rel="noreferrer">
                <Github size={19} />
              </a>
              <a href="https://www.linkedin.com/in/husnain-ali-904671357" target="_blank" rel="noreferrer">
                <Linkedin size={19} />
              </a>
              <a href="mailto:husnain45605@gmail.com" target="_blank" rel="noreferrer">
                <Mail size={19} />
              </a>
              <a href="whatsapp://send?phone= +923076606145" target="_blank" rel="noreferrer">
                <Phone size={19} />
              </a>
            </div>
          </div>

          <div className="hero-visual reveal-right in-view">
            <div className="grid-ring" />
            <div className="eagle-wing left-wing" />
            <div className="eagle-wing right-wing" />
            <div className="portrait-card">
              <div className="portrait-photo">
                <img src="./Ali.png" alt="Husnain Ali" />
              </div>
              <div className="portrait-label">
                <strong>AI ENGINEER</strong>
                <small>Python • ML • Web</small>
              </div>
            </div>
            <div className="floating-card fc-one">
              <BrainCircuit size={18} />
              <div><b>AI / ML</b><small>Building intelligent systems</small></div>
            </div>
            <div className="floating-card fc-two">
              <Terminal size={18} />
              <div><b>Python</b><small>Clean & scalable code</small></div>
            </div>
          </div>
        </section>

                <section id="about" className="section">
          <div className="section-head reveal">
            <p className="eyebrow">01 — ABOUT</p>
            <h2>Building with <span>purpose.</span></h2>
          </div>

          <div className="about-grid">
            <div className="about-text reveal-left">
              <p>
                I&apos;m a BSCS graduate focused on AI, machine learning, web development and
                software development. My goal is simple: create technology
                that solves real problems and is actually useful to people.
              </p>
              <p>
                I enjoy working across the full journey — understanding the
                problem, preparing data, training models, building APIs and
                turning the result into a clean web experience.
              </p>
              <div className="quote">
                <Sparkles size={18} />
                <span>Learn. Build. Test. Improve. Repeat.</span>
              </div>
            </div>

            <div className="stats reveal-right">
              <div><b>AI</b><span>Machine Learning</span></div>
              <div><b>API</b><span>Backend Development</span></div>
              <div><b>NLP</b><span>Language Intelligence</span></div>
              <div><b>WEB</b><span>Full Stack Experiences</span></div>

            </div>
          </div>
        </section>

                <section id="skills" className="section">
          <div className="section-head reveal">
            <p className="eyebrow">02 — SKILLS</p>
            <h2>My technical <span>toolkit.</span></h2>
          </div>

          <div className="skill-grid">
            {skills.map(([name, level, value], i) => (
              <div
                className="skill-card reveal"
                key={name}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="skill-top">
                  <span>{name}</span><small>{level}</small>
                </div>
                <div className="bar"><i style={{ "--val": `${value}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="tool-row reveal">
            <span><Code2 /> Python</span>
            <span><BrainCircuit /> PyTorch</span>
            <span><Database /> SQL</span>
            <span><Terminal /> Flask</span>
            <span><Zap /> TensorFlow</span>
            <span><Globe /> Django</span>
            <span><Globe /> React.js</span>
          </div>
        </section>

                <section id="projects" className="section">
          <div className="section-head project-heading reveal">
            <div>
              <p className="eyebrow">03 — SELECTED WORK</p>
              <h2>Projects that <span>matter.</span></h2>
            </div>
            <a href="https://github.com/husnain-ali2" target="_blank" rel="noreferrer" className="text-link">
              View GitHub <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card reveal-scale"
                key={project.title}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="project-number">0{index + 1}</div>
                <div className="project-icon"><BrainCircuit /></div>
                <p className="project-tag">{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-list">
                  {project.tech.map((t) => <span key={t}>{t}</span>)}
                </div>
                <a href={project.github}>Explore Project <ArrowUpRight size={16} /></a>
              </article>
            ))}
          </div>
        </section>

                <section id="blog" className="section">
          <div className="section-head reveal">
            <p className="eyebrow">04 — BLOG</p>
            <h2>Ideas, AI & <span>experiments.</span></h2>
          </div>

          <div className="blog-grid">
            <article className="reveal" style={{ transitionDelay: "0ms" }}><span>AI</span><h3>How I approach real-world ML projects</h3><p>From data to model to a usable product.</p></article>
            <article className="reveal" style={{ transitionDelay: "100ms" }}><span>NLP</span><h3>Building useful AI assistants</h3><p>Designing assistants that can understand and act.</p></article>
            <article className="reveal" style={{ transitionDelay: "200ms" }}><span>DEV</span><h3>Why APIs matter in modern AI apps</h3><p>A practical look at connecting models with products.</p></article>
          </div>
        </section>

                <section id="contact" className="section contact-section">
          <div className="contact-copy reveal-left">
            <p className="eyebrow">05 — CONTACT</p>
            <h2>Let&apos;s build something <span>great.</span></h2>
            <p>
              Have an AI idea, software project or freelance opportunity?
              Send a message and let&apos;s talk.
            </p>
            <div className="contact-item"><Mail size={18} /><span>husnain45605@gmail.com</span></div>
            <div className="contact-item"><Phone size={18} /><span>0307 6606145</span></div>
            <div className="contact-item"><MessageCircle size={18} /><span>Available for remote opportunities</span></div>
          </div>

          <form className="contact-form reveal-right" onSubmit={submitContact}>
            <input required placeholder="Your name" />
            <input required type="email" placeholder="Email address" />
            <input required placeholder="Project / subject" />
            <textarea required rows="6" placeholder="Tell me about your project..." />
          
            <button className="primary-btn" type="submit">
              {sent ? "Message Ready ✓" : "Send Message"} <Send size={17} />
            </button>
            <small className="form-note">
        
            </small>
          </form>
        </section>
      </main>

      <footer>
        <div className="brand">H<span>A</span></div>
        <p>© {new Date().getFullYear()} Husnain Ali. Built with React.</p>
        <div className="footer-links">
          <a href="https://github.com/husnain-ali2" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/husnain-ali-904671357" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>

      {showTop && (
        <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;