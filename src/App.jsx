import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import emailjs from '@emailjs/browser';
import {
  Layout, Box, Building2, Wrench, PenTool, Scissors, Sofa, MousePointer2,
  Video, Type, Award, Package, Gamepad2, Glasses, Car, HeartHandshake,
  Cuboid, Brush, Palette, Briefcase, Zap, X, Check,
  MessageSquare, Users, Activity, User, Sun, Moon, ArrowRight
} from 'lucide-react';

function App() {
  /*
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  */
  const [activeTab, setActiveTab] = useState('for-you');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
  });
  
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [waitlistCount, setWaitlistCount] = useState(() => {
    const saved = localStorage.getItem('knot_waitlist_count');
    return saved ? parseInt(saved, 10) : 264;
  });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('knot_waitlist_count', waitlistCount.toString());
  }, [waitlistCount]);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1500;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayCount(Math.floor(easeProgress * waitlistCount));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [waitlistCount]);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsCMoc5oeFVo3w27iUB0OggkWNoI9SwZ3S2f1AerK88S_a0K-bFO0hZSEy0dGetHDr5A/exec';

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitStatus('loading');
    
    try {
      const templateParams = {
        user_email: email,
        user_industry: selectedIndustry || 'Not specified',
        timestamp: new Date().toLocaleString()
      };

      const emailPromise = emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      const sheetPromise = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          email: email,
          discipline: selectedIndustry || 'Not specified'
        })
      });

      // Execute both concurrently
      await Promise.allSettled([emailPromise, sheetPromise]);
      
      setSubmitStatus('success');
      setEmail('');
      setWaitlistCount(prev => prev + 1);
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      setSubmitStatus('error');
    }
  };
  
  /*
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  */
  
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    // Smooth scrolling for native anchors
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const posts = [
    {
      id: 1,
      categories: ['for-you', 'architecture'],
      author: 'Elena Rostova',
      handle: '@erostova',
      time: '2h',
      text: 'Testing parametric facades for a cultural center. The geometry looks interesting, but I\'m struggling to balance daylight performance with construction costs. How would you approach this?',
      mediaClass: 'mock-media-1',
      mediaImage: '/post1.jpg',
      mediaTag: 'WIP - 02.obj',
      likes: 24,
      comments: 42
    },
    {
      id: 2,
      categories: ['for-you', 'product'],
      author: 'Marcus Chen',
      handle: '@marcus_ui',
      time: '5h',
      text: 'Why do most B2B dashboards feel the same? Exploring an editorial layout system that treats data like content. Sharing an early concept.',
      mediaClass: 'mock-media-2',
      mediaImage: '/post2.jpg',
      mediaTag: 'Figma prototype',
      likes: 89,
      comments: 87
    },
    {
      id: 3,
      categories: ['for-you', 'following'],
      author: 'Sarah Jenkins',
      handle: '@sjenkins',
      time: '1d',
      text: 'Users understand the navigation in testing. But task completion still drops. At what point do you stop simplifying and start teaching?',
      mediaClass: null,
      mediaTag: null,
      likes: 12,
      comments: 126
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const designFields = [
    { name: "UI/UX Design", icon: <Layout size={14} /> },
    { name: "Product Design", icon: <Box size={14} /> },
    { name: "Architecture", icon: <Building2 size={14} /> },
    { name: "Industrial Design", icon: <Wrench size={14} /> },
    { name: "Graphic Design", icon: <PenTool size={14} /> },
    { name: "Fashion Design", icon: <Scissors size={14} /> },
    { name: "Interior Design", icon: <Sofa size={14} /> },
    { name: "Interaction Design", icon: <MousePointer2 size={14} /> },
    { name: "Motion Graphics", icon: <Video size={14} /> },
    { name: "Typography", icon: <Type size={14} /> },
    { name: "Branding", icon: <Award size={14} /> },
    { name: "Packaging Design", icon: <Package size={14} /> },
    { name: "Game Design", icon: <Gamepad2 size={14} /> },
    { name: "VR/AR Design", icon: <Glasses size={14} /> },
    { name: "Automotive Design", icon: <Car size={14} /> },
    { name: "Service Design", icon: <HeartHandshake size={14} /> },
    { name: "3D Modeling", icon: <Cuboid size={14} /> },
    { name: "Illustration", icon: <Brush size={14} /> }
  ];

  return (
    <div style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
      <div className="bg-grid"></div>
      <div className="glow-top"></div>

      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="nav-container">
          <a href="#" className="logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z"/></svg>
            DesignVerse
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#manifesto">Manifesto</a>
          </div>
          <div className="nav-actions">
            {/* 
            <button 
              onClick={toggleTheme} 
              className="btn btn-secondary btn-sm" 
              style={{ width: '32px', padding: 0, borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button> 
            */}
            <a href="#waitlist" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); setIsWaitlistModalOpen(true); }}>Join Waitlist</a>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <motion.div 
            className="container text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="hero-badge">
              <span className="badge-dot"></span>
              Private Beta
            </motion.div>
            <motion.h1 className="hero-title">
              <motion.span variants={fadeUp} style={{ display: 'block' }}>See how great designers think.</motion.span>
              <motion.span variants={fadeUp} className="text-glow" style={{ display: 'block', marginTop: '8px' }}>Not just what they ship.</motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-subtitle">
              A network for designers to share ideas, seek feedback, and document their creative journey in public.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-cta">
              <a href="#waitlist" className="btn btn-primary btn-lg group" onClick={(e) => { e.preventDefault(); setIsWaitlistModalOpen(true); }}>
                Join the Waitlist
                <ArrowRight size={18} className="arrow-icon" style={{ marginLeft: '8px', transition: 'transform 0.3s ease' }} />
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="waitlist-meta" style={{ marginTop: '32px' }}>
              <span className="status-dot"></span>
              {displayCount.toLocaleString()} designers on waitlist
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ y: yParallax, width: '100%', display: 'flex', justifyContent: 'center' }}>
            {/* Premium UI Mockup */}
            <div className="app-mockup">
              <div className="app-header">
                <div className="app-tabs">
                  <div className={`app-tab ${activeTab === 'for-you' ? 'active' : ''}`} onClick={() => setActiveTab('for-you')}>For you</div>
                  <div className={`app-tab ${activeTab === 'following' ? 'active' : ''}`} onClick={() => setActiveTab('following')}>Following</div>
                  <div className={`app-tab ${activeTab === 'architecture' ? 'active' : ''}`} onClick={() => setActiveTab('architecture')}>Architecture</div>
                  <div className={`app-tab ${activeTab === 'product' ? 'active' : ''}`} onClick={() => setActiveTab('product')}>Product</div>
                </div>
              </div>
              <div className="app-feed">
                {posts.filter(post => post.categories.includes(activeTab)).map((post, i) => (
                  <motion.div 
                    className="post" 
                    key={post.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="post-sidebar">
                      <div className="avatar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </div>
                      <div className="thread-line"></div>
                    </div>
                    <div className="post-content">
                      <div className="post-header">
                        <span className="author">{post.author}</span>
                        <span className="handle">{post.handle}</span>
                        <span className="dot">·</span>
                        <span className="time">{post.time}</span>
                      </div>
                      <p className="post-text">{post.text}</p>
                      
                      {post.mediaClass && (
                        <div 
                          className={`post-media ${post.mediaClass}`} 
                          style={post.mediaImage ? { backgroundImage: `url(${post.mediaImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                        >
                          <div className="media-tag">{post.mediaTag}</div>
                        </div>
                      )}

                      <div className="post-actions">
                        <div className="action"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> {post.likes}</div>
                        <div className="action"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> {post.comments}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            </motion.div>
          </motion.div>

        </section>

        {/* Scrolling Marquee */}
        <div className="scrolling-marquee">
          <div className="marquee-content">
            {designFields.map((field, idx) => (
              <div className="marquee-pill" key={`field-1-${idx}`}>
                <span style={{ display: 'flex', opacity: 0.6, marginRight: '8px' }}>{field.icon}</span>
                {field.name}
              </div>
            ))}
            {/* Duplicate for infinite scroll loop */}
            {designFields.map((field, idx) => (
              <div className="marquee-pill" key={`field-2-${idx}`}>
                <span style={{ display: 'flex', opacity: 0.6, marginRight: '8px' }}>{field.icon}</span>
                {field.name}
              </div>
            ))}
          </div>
        </div>

        {/* Manifesto / Comparison */}
        <motion.section 
          id="manifesto" 
          className="manifesto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="container flex-row">
            <motion.div variants={fadeUp} className="manifesto-content">
              <h2 className="section-title">
                Design has places to <span className="text-glow">share work</span>.<br/>
                Design has places to <span className="text-glow">build careers</span>.
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#a6c1ee', fontWeight: 500, fontSize: '1.25rem' }}>
                Where do designers discuss ideas?
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="manifesto-visual">
              <div className="comparison-container">
                <div className="compare-row old-way">
                  <div className="compare-icon"><Palette size={18} /></div>
                  <div className="compare-body">
                    <span className="compare-title">Dribbble / Behance</span>
                    <span className="compare-desc">Showcase finished work</span>
                  </div>
                  <div className="compare-status"><Check size={18} /></div>
                </div>
                
                <div className="compare-row old-way">
                  <div className="compare-icon"><Briefcase size={18} /></div>
                  <div className="compare-body">
                    <span className="compare-title">LinkedIn</span>
                    <span className="compare-desc">Build your professional network</span>
                  </div>
                  <div className="compare-status"><Check size={18} /></div>
                </div>

                <div className="compare-row new-way">
                  <div className="glow-effect"></div>
                  <div className="compare-icon highlight"><Zap size={18} /></div>
                  <div className="compare-body">
                    <span className="compare-title highlight-text">DesignVerse</span>
                    <span className="compare-desc text-white">Discuss ideas before they become products</span>
                  </div>
                  <div className="compare-status highlight"><Check size={18} /></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          id="features" 
          className="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="container">
            <div className="bento-grid">
              <motion.div variants={fadeUp} className="bento-item span-2">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><PenTool size={22} /></div>
                </div>
                <h3>Design Journals</h3>
                <p>Document your thinking, experiments, failures, and discoveries over time.</p>
                <div className="bento-glow"></div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><MessageSquare size={22} /></div>
                </div>
                <h3>Critique Threads</h3>
                <p>Get feedback before shipping instead of collecting likes after launch.</p>
                <div className="bento-glow"></div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><User size={22} /></div>
                </div>
                <h3>Living Profile</h3>
                <p>Every discussion, insight, and contribution builds a profile that reflects how you think.</p>
                <div className="bento-glow"></div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item span-2">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><Users size={22} /></div>
                </div>
                <h3>Cross-Discipline Discovery</h3>
                <p>Learn from architects, product designers, industrial designers, artists, and creators outside your niche.</p>
                <div className="bento-glow"></div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Social Proof */}
        <motion.section 
          className="testimonials"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="container">
            <motion.h2 variants={fadeUp} className="section-title text-center" style={{ marginBottom: '3rem' }}>Why Designers Are Joining</motion.h2>
            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <motion.div variants={fadeUp} className="bento-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', flexGrow: 1, fontSize: '1.1rem', lineHeight: 1.6 }}>"I learn more from unfinished work than polished portfolios."</p>
                <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   — Product Designer
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', flexGrow: 1, fontSize: '1.1rem', lineHeight: 1.6 }}>"I want to see how people arrive at decisions, not just the final screen."</p>
                <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   — UX Designer
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', flexGrow: 1, fontSize: '1.1rem', lineHeight: 1.6 }}>"Finally a place for design discussions instead of self-promotion."</p>
                <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   — Architect
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {isWaitlistModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWaitlistModalOpen(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setIsWaitlistModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              
              <div className="text-center">
                <h2 className="section-title" style={{ fontSize: '2rem' }}>Join the Private Beta</h2>
                <p className="text-muted mt-4 mb-8">
                  Secure your username and get early access to the private beta.
                </p>
                <div className="waitlist-card">
                  {submitStatus === 'success' ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Check size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>You're on the list.</h3>
                      <p style={{ color: 'var(--text-muted)' }}>We'll notify you when Knot launches.</p>
                    </div>
                  ) : (
                    <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={submitStatus === 'loading'}
                      />
                      
                      <div className="custom-select-wrapper">
                        <div 
                          className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
                          onClick={() => !submitStatus.includes('loading') && setIsDropdownOpen(!isDropdownOpen)}
                          style={{ opacity: submitStatus === 'loading' ? 0.6 : 1, cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer' }}
                        >
                          {selectedIndustry ? selectedIndustry : <span className="placeholder">Select Design Industry...</span>}
                          <svg className="select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        
                        {isDropdownOpen && (
                          <>
                            <div className="dropdown-overlay" onClick={() => setIsDropdownOpen(false)}></div>
                            <div className="custom-select-menu">
                              {designFields.map((field, idx) => (
                                <div 
                                  key={idx} 
                                  className="custom-select-option"
                                  onClick={() => {
                                    setSelectedIndustry(field.name);
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  <span style={{ display: 'flex', opacity: 0.6, marginRight: '8px' }}>{field.icon}</span>
                                  {field.name}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg" 
                        style={{ width: '100%', marginTop: '8px', borderRadius: '8px', opacity: submitStatus === 'loading' ? 0.7 : 1 }}
                        disabled={submitStatus === 'loading'}
                      >
                        {submitStatus === 'loading' ? 'Joining...' : 'Reserve My Spot'}
                      </button>
                      {submitStatus === 'error' && (
                        <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', textAlign: 'center' }}>Something went wrong. Please try again.</p>
                      )}
                    </form>
                  )}
                </div>
                <div className="waitlist-meta">
                  <span className="status-dot"></span>
                  {waitlistCount.toLocaleString()} designers on waitlist
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Footer */}
      <footer className="mobile-footer">
        <div className="mobile-footer-brand">
          <h2>designVerse</h2>
          <p>Where creative ideas connect</p>
        </div>
        
        <div className="mobile-footer-social">
          <a href="#">Twitter</a>
          <a href="#">Github</a>
          <a href="#">Dribbble</a>
        </div>
        
        <div className="mobile-footer-copy">
          © {new Date().getFullYear()} designVerse
        </div>
      </footer>

      {/* Desktop Footer (Cosmic Parallax) */}
      <footer className="desktop-footer relative w-full h-[100vh] min-h-[600px] flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CosmicParallaxBg 
            head="designVerse" 
            text="Where creative ideas connect" 
            loop={true}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
