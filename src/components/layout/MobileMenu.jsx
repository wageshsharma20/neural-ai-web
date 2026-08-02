import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { NAV_LINKS } from "../../data/mockData";
import "./MobileMenu.css";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  const containerRef = useRef(null);
  const location = useLocation();

  const handleForceNavigation = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    
    // Fallback: If React Router is failing to push state inside this animated modal on iOS,
    // we force the browser to physically navigate to the page.
    setTimeout(() => {
      window.location.href = href;
    }, 10);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // 2. Shape Hover
      const menuItems = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        if (window.matchMedia("(hover: hover)").matches) {
            item.addEventListener("mouseenter", onEnter);
            item.addEventListener("mouseleave", onLeave);
            
            item._cleanup = () => {
                item.removeEventListener("mouseenter", onEnter);
                item.removeEventListener("mouseleave", onLeave);
            };
        }
      });
      
    }, containerRef);

    const currentContainer = containerRef.current;
    
    return () => {
      ctx.revert();
      if (currentContainer) {
        const items = currentContainer.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  const tlRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const menu = containerRef.current.querySelector(".menu-content");
      const overlay = containerRef.current.querySelector(".overlay");
      const menuLinks = containerRef.current.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current.querySelectorAll("[data-menu-fade]");
      
      const tl = gsap.timeline({ 
        paused: true,
        onStart: () => { /* removed */ 
          
        },
        onReverseComplete: () => { /* removed */ 
          
        }
      });
      tlRef.current = tl;
      
      tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0)
        .fromTo(menu, { xPercent: 120 }, { xPercent: 0, duration: 0.5, ease: "power3.out" }, 0)
        .fromTo(menuLinks, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: "power3.out", clearProps: "all" }, 0.2);
        
      if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, 0.2);
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (isMenuOpen) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen, setIsMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className={`nav-overlay-wrapper ${isMenuOpen ? "open" : ""}`}>
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {NAV_LINKS.map((item, index) => (
                    <li key={item.href} className="menu-list-item" data-menu-fade data-shape={(index % 5) + 1}>
                        <a
                            href={item.href}
                            className="nav-link"
                            onClick={(e) => handleForceNavigation(e, item.href)}
                            onTouchEnd={(e) => handleForceNavigation(e, item.href)}
                        >
                            <span className="nav-link-number">0{index + 1}</span>
                            <span className="nav-link-text">{item.label}</span>
                        </a>
                    </li>
                ))}
                <li className="menu-list-item" data-menu-fade data-shape="1" style={{ marginTop: '2rem' }}>
                    <a
                        href="/login"
                        className="nav-link"
                        onClick={(e) => handleForceNavigation(e, "/login")}
                        onTouchEnd={(e) => handleForceNavigation(e, "/login")}
                    >
                        <span className="nav-link-number">0{NAV_LINKS.length + 1}</span>
                        <span className="nav-link-text">Member Login</span>
                    </a>
                </li>
              </ul>
              
              <div className="mobile-menu-footer">
                <a
                  href="/login"
                  className="mobile-login-btn"
                  onClick={(e) => handleForceNavigation(e, "/login")}
                  onTouchEnd={(e) => handleForceNavigation(e, "/login")}
                >
                  Member Login
                </a>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
