import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Layout, Box, Building2, Wrench, PenTool, Scissors, Sofa, MousePointer2,
  Video, Type, Award, Package, Gamepad2, Glasses, Car, HeartHandshake,
  Cuboid, Brush, Palette, Briefcase, Zap, X, Check,
  MessageSquare, Users, Activity, User
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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
      text: 'Exploring parametric facades for the new cultural center. The light play at golden hour completely changes our material choices. Moving away from standard glass.',
      mediaClass: 'mock-media-1',
      mediaTag: 'WIP - 02.obj',
      likes: 24,
      comments: 4
    },
    {
      id: 2,
      categories: ['for-you', 'product'],
      author: 'Marcus Chen',
      handle: '@marcus_ui',
      time: '5h',
      text: 'Why does every B2B dashboard look the same? Working on a concept that brings editorial layouts into complex data tables. Here\'s a WIP of the density toggle.',
      mediaClass: 'mock-media-2',
      mediaTag: 'Figma prototype',
      likes: 89,
      comments: 12
    },
    {
      id: 3,
      categories: ['for-you', 'following'],
      author: 'Sarah Jenkins',
      handle: '@sjenkins',
      time: '1d',
      text: 'Struggling with the visual hierarchy on my thesis project. The data density is high, but reducing it feels like hiding important context. Anyone have good references for medical dashboards?',
      mediaClass: null,
      mediaTag: null,
      likes: 12,
      comments: 5
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
    <>
      <div className="bg-grid"></div>
      <div className="glow-top"></div>

      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
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
            <a href="#waitlist" className="btn btn-primary btn-sm">Join Waitlist</a>
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
              DesignVerse Private Beta
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-title">
              The social network<br/>
              for <span className="text-glow">design thinkers</span>.
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-subtitle">
              Move beyond portfolios. Discover what top designers are thinking, debating, and exploring in real-time. The hub for process, not just pixels.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-cta">
              <a href="#waitlist" className="btn btn-primary btn-lg">Join the Waitlist</a>
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
                        <div className={`post-media ${post.mediaClass}`}>
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
          className="manifesto border-y"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="container flex-row">
            <motion.div variants={fadeUp} className="manifesto-content">
              <h2 className="section-title">Ditch the polished portfolio.<br/>Share how you actually think.</h2>
              <p className="text-muted mt-4 text-lg">
                Most networks optimize for likes on finished pixels. We optimize for raw ideas, broken prototypes, and architectural debates. Join a community that values the messy process behind great design.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="manifesto-visual">
              <div className="comparison-container">
                <div className="compare-row old-way">
                  <div className="compare-icon"><Palette size={18} /></div>
                  <div className="compare-body">
                    <span className="compare-title">Dribbble / Behance</span>
                    <span className="compare-desc">Final pixels & hollow likes</span>
                  </div>
                  <div className="compare-status"><X size={18} /></div>
                </div>
                
                <div className="compare-row old-way">
                  <div className="compare-icon"><Briefcase size={18} /></div>
                  <div className="compare-body">
                    <span className="compare-title">LinkedIn</span>
                    <span className="compare-desc">Recruiter spam & self-promotion</span>
                  </div>
                  <div className="compare-status"><X size={18} /></div>
                </div>

                <div className="compare-row new-way">
                  <div className="glow-effect"></div>
                  <div className="compare-icon highlight"><Zap size={18} /></div>
                  <div className="compare-body">
                    <span className="compare-title highlight-text">DesignVerse</span>
                    <span className="compare-desc text-white">Raw process, context, & learning</span>
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
                  <div className="bento-icon"><MessageSquare size={22} /></div>
                </div>
                <h3>Meaningful Discourse</h3>
                <p>Designed for thoughtful conversations. Less "Nice work bro", more "How did you solve the navigation constraints?"</p>
                <div className="bento-glow"></div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><Users size={22} /></div>
                </div>
                <h3>Cross-Discipline</h3>
                <p>Learn from architects, product designers, and creators outside your niche.</p>
                <div className="bento-glow"></div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><Activity size={22} /></div>
                </div>
                <h3>Real-time Pulse</h3>
                <p>Follow emerging trends, debates, and innovations as they happen.</p>
                <div className="bento-glow"></div>
              </motion.div>
              <motion.div variants={fadeUp} className="bento-item span-2">
                <div className="bento-icon-wrapper">
                  <div className="bento-icon"><User size={22} /></div>
                </div>
                <h3>Living Profile</h3>
                <p>Every post contributes to a living profile that shows how you think and reason, not just what you make.</p>
                <div className="bento-glow"></div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Waitlist Section */}
        <motion.section 
          id="waitlist" 
          className="cta-section border-t"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="container text-center max-w-sm">
            <h2 className="section-title">Join the Private Beta</h2>
            <p className="text-muted mt-4 mb-8">
              We're slowly rolling out invites to early supporters. Reserve your spot today to secure your handle.
            </p>
            <div className="waitlist-card">
              <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                
                <div className="custom-select-wrapper">
                  <div 
                    className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px', borderRadius: '8px' }}>Reserve Spot</button>
              </form>
            </div>
            <div className="waitlist-meta">
              <span className="status-dot"></span>
              4,208 designers on waitlist
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="logo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z"/></svg>
              DesignVerse
            </div>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
