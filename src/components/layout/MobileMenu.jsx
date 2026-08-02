import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        item._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, containerRef);

    return () => {
        ctx.revert();
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
            items.forEach((item) => item._cleanup && item._cleanup());
        }
    };
  }, []);

  // Menu Open/Close Animation Effect
  const tlRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current.querySelector(".menu-content");
      const overlay = containerRef.current.querySelector(".overlay");
      const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
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
                {NAV_LINKS.map((link, index) => (
                  <li className="menu-list-item" data-shape={(index % 5) + 1} key={link.id}>
                    <Link to={link.href} className="nav-link w-inline-block">
                      <p className="nav-link-text">{link.label}</p>
                      <div className="nav-link-hover-bg"></div>
                    </Link>
                  </li>
                ))}
                <li className="menu-list-item" data-shape="5">
                  <a href="/login" className="nav-link w-inline-block">
                    <p className="nav-link-text">Member Login</p>
                    <div className="nav-link-hover-bg"></div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
