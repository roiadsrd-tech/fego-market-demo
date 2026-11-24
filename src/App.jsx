import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  MapPin,
  Instagram,
  Menu,
  X,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import {
  EditorialSurface,
  RevealText,
  ClipRevealImage,
  MagneticButton,
  ScrollProgressBar,
  EditorialMarquee,
  EditorialAccordion,
  CounterMetric,
  CRAFT_EASE,
  CRAFT_VIEWPORT
} from './craft';

// Verified Brand Data from brief.md
const SERVICES_DATA = [
  {
    number: "01",
    title: "FEGO Kids: Suplementación Infantil",
    slug: "suplementacion-infantil-fego-kids",
    kicker: "Nutrición y desarrollo infantil",
    description: "Formulaciones especializadas para niños diseñadas para complementar su nutrición diaria: Genius Shake (batido multivitamínico con proteína, omega 3, hierro y prebióticos), SmartBiotics (10 cepas probióticas y enzimas) y D-Fenz (vitamina C, magnesio y zinc).",
    photos: ["./media/ai_service_1.webp", "./media/post_6.jpg"],
    features: [
      {
        title: "Genius Shake",
        desc: "Batido sabor chocolate con 400g netos, proteína, fibra prebiótica, omega 3, hierro, calcio y vegetales con frutas, sin azúcar añadida."
      },
      {
        title: "SmartBiotics",
        desc: "Suplemento sabor mango natural con 10 cepas de probióticos, 2 fibras prebióticas, 3 enzimas digestivas, colina y L-treonato de magnesio."
      },
      {
        title: "D-Fenz",
        desc: "Fórmula en polvo sabor lima natural que integra vitamina C, magnesio, tetrazimas y zinc para reforzar las defensas diarias."
      }
    ],
    specs: [
      { label: "Formato", val: "Polvo soluble y batidos funcionales" },
      { label: "Azúcar añadida", val: "0% — Endulzado naturalmente" },
      { label: "Población objetivo", val: "Niños en etapa de crecimiento escolar" },
      { label: "Entrega", val: "Pago contra entrega en todo el país" }
    ]
  },
  {
    number: "02",
    title: "Nutrición Funcional y Energía para Adultos",
    slug: "nutricion-funcional-adultos",
    kicker: "Rendimiento diario y recuperación",
    description: "Línea diseñada para la vida activa y ocupada, liderada por VitalPro: batido nutricional con 16 gramos de proteína, enriquecido con superalimentos como reishi, espirulina y ácidos grasos omega 3.",
    photos: ["./media/ai_service_2.webp"],
    features: [
      {
        title: "16g de Proteína Funcional",
        desc: "Aporte balanceado para mantener la saciedad y proteger la masa muscular sin necesidad de ser deportista de alto rendimiento."
      },
      {
        title: "Complejo con Espirulina y Reishi",
        desc: "Adaptógenos y superalimentos orientados al soporte inmunológico y a la recuperación física durante jornadas intensas."
      },
      {
        title: "Keto Friendly y Sin Azúcar",
        desc: "Formulación limpia que evita picos glucémicos y se integra a diferentes estilos de alimentación."
      }
    ],
    specs: [
      { label: "Aporte Proteico", val: "16g por porción verificada" },
      { label: "Superalimentos", val: "Espirulina + Hongo Reishi + Omega 3" },
      { label: "Perfil", val: "Keto Friendly · Libre de azúcar" },
      { label: "Despacho", val: "Envíos directos a toda República Dominicana" }
    ]
  },
  {
    number: "03",
    title: "Productos Prácticos para el Hogar y Rutina",
    slug: "soluciones-para-el-hogar",
    kicker: "Comercio electrónico y utilidad diaria",
    description: "Catálogo seleccionado de artículos y herramientas cotidianas orientadas a resolver necesidades concretas en el hogar y en la rutina diaria, distribuidos bajo el estándar de comercio seguro de FEGO.",
    photos: ["./media/ai_service_3.webp"],
    features: [
      {
        title: "Selección de Utilidad Práctica",
        desc: "Curaduría enfocada exclusivamente en artículos que resuelven fricciones habituales de orden, limpieza o rutina doméstica."
      },
      {
        title: "Pago Contra Entrega",
        desc: "Seguridad total para el cliente al abonar el importe únicamente cuando el producto llega a sus manos."
      },
      {
        title: "Despacho a Nivel Nacional",
        desc: "Logística coordinada a cualquier punto de la República Dominicana directamente desde fegomarket.com."
      }
    ],
    specs: [
      { label: "Garantía", val: "Inspección previa al pago en mano" },
      { label: "Logística", val: "Envíos a todas las provincias de RD" },
      { label: "Soporte", val: "Atención personalizada por Instagram" },
      { label: "Modalidad", val: "Comercio directo seguro y transparente" }
    ]
  }
];

const FAQS_DATA = [
  {
    question: "¿Cómo funciona el pago contra entrega de FEGO?",
    answer: "Realizas tu pedido en línea o por mensaje directo en Instagram y abonas en efectivo o método habilitado al recibir tu paquete."
  },
  {
    question: "¿Hacen envíos a todo el territorio dominicano?",
    answer: "Sí, realizamos envíos coordinados a todas las provincias y localidades de República Dominicana."
  },
  {
    question: "¿Qué componentes integran la línea FEGO Kids?",
    answer: "Genius Shake (proteína, omega 3, hierro y prebióticos sabor chocolate), SmartBiotics (10 cepas probióticas sabor mango) y D-Fenz (vitamina C, magnesio y zinc sabor lima)."
  },
  {
    question: "¿VitalPro contiene azúcar añadida?",
    answer: "No, VitalPro es keto friendly, sin azúcar añadida, con 16g de proteína, omega 3, espirulina y reishi por porción."
  }
];

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoutineTab, setActiveRoutineTab] = useState('kids');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentHash(hash);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  // Router parsing
  const isHome = currentHash === '#/' || currentHash === '';
  const isServices = currentHash === '#/servicios';
  const isServiceDetail = currentHash.startsWith('#/servicios/');
  const serviceSlug = isServiceDetail ? currentHash.replace('#/servicios/', '') : null;
  const currentService = serviceSlug ? SERVICES_DATA.find((s) => s.slug === serviceSlug) : null;
  const isCases = currentHash === '#/casos';
  const isAbout = currentHash === '#/nosotros';
  const isContact = currentHash === '#/contacto';

  const instagramUrl = "https://www.instagram.com/fego_market/";

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgressBar color="var(--accent)" />

      {/* HEADER BESPOKE NAVEGACIÓN */}
      <header className="site-header">
        <div className="site-container">
          <nav className="navbar" aria-label="Navegación principal">
            <a href="#/" className="brand-emblem-wrap" onClick={(e) => { e.preventDefault(); navigateTo('#/'); }}>
              <img
                src="./media/logo_real.jpg"
                alt="FEGO Logo"
                className="brand-logo-img"
              />
              <span>FEGO</span>
            </a>

            <div className="nav-links-desktop">
              <button
                type="button"
                className={`nav-link-item ${isHome ? 'is-active' : ''}`}
                onClick={() => navigateTo('#/')}
              >
                Inicio
              </button>
              <button
                type="button"
                className={`nav-link-item ${isServices || isServiceDetail ? 'is-active' : ''}`}
                onClick={() => navigateTo('#/servicios')}
              >
                Catálogo
              </button>
              <button
                type="button"
                className={`nav-link-item ${isCases ? 'is-active' : ''}`}
                onClick={() => navigateTo('#/casos')}
              >
                Casos Reales
              </button>
              <button
                type="button"
                className={`nav-link-item ${isAbout ? 'is-active' : ''}`}
                onClick={() => navigateTo('#/nosotros')}
              >
                Nosotros
              </button>
              <button
                type="button"
                className={`nav-link-item ${isContact ? 'is-active' : ''}`}
                onClick={() => navigateTo('#/contacto')}
              >
                Contacto
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta-btn"
              >
                <span>Pedir por WhatsApp</span>
                <ArrowRight size={15} />
              </a>

              <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: CRAFT_EASE }}
              className="mobile-menu-drawer"
            >
              <button
                type="button"
                className="mobile-menu-link"
                onClick={() => navigateTo('#/')}
              >
                Inicio
              </button>
              <button
                type="button"
                className="mobile-menu-link"
                onClick={() => navigateTo('#/servicios')}
              >
                Catálogo de Productos
              </button>
              <button
                type="button"
                className="mobile-menu-link"
                onClick={() => navigateTo('#/casos')}
              >
                Casos y Resultados
              </button>
              <button
                type="button"
                className="mobile-menu-link"
                onClick={() => navigateTo('#/nosotros')}
              >
                Nosotros y Espacio
              </button>
              <button
                type="button"
                className="mobile-menu-link"
                onClick={() => navigateTo('#/contacto')}
              >
                Cobertura y Contacto
              </button>
              <div style={{ paddingTop: 12 }}>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-cta-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Pedir por WhatsApp</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN VIEWPORT ROUTER */}
      <main style={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          {/* VISTA 1: INICIO (#/) */}
          {isHome && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* SECCIÓN 1: HERO (split-immersive-frame 52/48) */}
              <EditorialSurface variant="mesh" tone="primary" id="hero">
                <div className="site-container">
                  <div className="hero-split-grid">
                    <div className="hero-narrative">
                      <RevealText as="h1" immediate className="hero-title-text">
                        Nutrición real para tu rutina
                      </RevealText>

                      <p className="hero-subtitle-text">
                        Suplementos y soluciones para tu hogar con pago contra entrega.
                      </p>

                      <div className="hero-actions-wrap">
                        <MagneticButton
                          variant="primary"
                          href="#/servicios"
                          onClick={(e) => { e.preventDefault(); navigateTo('#/servicios'); }}
                        >
                          Ver catálogo
                        </MagneticButton>
                        <MagneticButton
                          variant="secondary"
                          href={instagramUrl}
                          target="_blank"
                        >
                          Pedir ahora
                        </MagneticButton>
                      </div>

                      <div className="hero-trust-bar">
                        <div className="trust-item">
                          <Truck size={17} color="var(--accent)" />
                          <span>Pago contra entrega nacional</span>
                        </div>
                        <div className="trust-item">
                          <ShieldCheck size={17} color="var(--accent)" />
                          <span>0% azúcar añadida</span>
                        </div>
                      </div>
                    </div>

                    <div className="hero-stage-card">
                      <ClipRevealImage
                        src="./media/post_6.jpg"
                        alt="FEGO Kids Suplementos Nutricionales"
                        aspectRatio="4/4.5"
                        priority
                      />
                      <div className="hero-floating-badge">
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}>
                            Tríada FEGO Kids · 3 fórmulas
                          </div>
                          <div style={{ fontSize: '0.82rem', opacity: 0.85, marginTop: 2 }}>
                            Genius Shake · SmartBiotics · D-Fenz · 0% azúcar
                          </div>
                        </div>
                        <button
                          type="button"
                          className="hero-badge-btn"
                          onClick={() => navigateTo('#/servicios/suplementacion-infantil-fego-kids')}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialSurface>

              {/* MARQUEE DINÁMICO DE BENEFICIOS VERIFICADOS */}
              <EditorialMarquee
                items={[
                  "Pago Contra Entrega en todo RD",
                  "16g de Proteína Funcional en VitalPro",
                  "10 Cepas Probióticas en SmartBiotics",
                  "0% Azúcar Añadida",
                  "Fórmulas Limpias FEGO Kids",
                  "Envíos a Todo el País"
                ]}
                durationSeconds={32}
              />

              {/* SECCIÓN 2: FEGO KIDS: NUTRICIÓN INFANTIL */}
              <EditorialSurface variant="ambient" tone="secondary" id="coleccion-kids" style={{ paddingBlock: 'var(--section-pad-y)' }}>
                <div className="site-container">
                  <div className="section-header-editorial section-header-editorial--split">
                    <div>
                      <h2>Trilogía de nutrición infantil</h2>
                    </div>
                    <MagneticButton
                      variant="secondary"
                      href="#/servicios/suplementacion-infantil-fego-kids"
                      onClick={(e) => { e.preventDefault(); navigateTo('#/servicios/suplementacion-infantil-fego-kids'); }}
                    >
                      Explorar Kids
                    </MagneticButton>
                  </div>

                  <div className="kids-showcase-layout">
                    <div className="kids-visual-stage">
                      <ClipRevealImage
                        src="./media/ai_service_1.webp"
                        alt="Colección FEGO Kids Suplementación Infantil"
                        aspectRatio="4/4"
                        parallax
                      />
                    </div>

                    <div className="kids-grid-staggered">
                      {/* Card 1: Genius Shake */}
                      <div className="kids-card">
                        <div className="kids-card-header">
                          <h3>Genius Shake</h3>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>400g · Chocolate</span>
                        </div>
                        <p className="kids-card-desc">
                          Batido multivitamínico con proteína, omega 3, hierro y fibra prebiótica.
                        </p>
                        <div className="kids-meta-line">
                          <span>Proteína · Omega 3 · Prebióticos</span>
                          <a
                            href="#/servicios/suplementacion-infantil-fego-kids"
                            onClick={(e) => { e.preventDefault(); navigateTo('#/servicios/suplementacion-infantil-fego-kids'); }}
                            className="craft-link-underline"
                            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
                          >
                            <span>Ver ficha</span>
                            <ChevronRight size={15} />
                          </a>
                        </div>
                      </div>

                      {/* Card 2: SmartBiotics */}
                      <div className="kids-card">
                        <div className="kids-card-header">
                          <h3>SmartBiotics</h3>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sabor Mango</span>
                        </div>
                        <p className="kids-card-desc">
                          10 cepas probióticas, enzimas digestivas, colina y L-treonato de magnesio.
                        </p>
                        <div className="kids-meta-line">
                          <span>10 cepas · Enzimas · Magnesio</span>
                          <a
                            href="#/servicios/suplementacion-infantil-fego-kids"
                            onClick={(e) => { e.preventDefault(); navigateTo('#/servicios/suplementacion-infantil-fego-kids'); }}
                            className="craft-link-underline"
                            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
                          >
                            <span>Ver ficha</span>
                            <ChevronRight size={15} />
                          </a>
                        </div>
                      </div>

                      {/* Card 3: D-Fenz */}
                      <div className="kids-card">
                        <div className="kids-card-header">
                          <h3>D-Fenz</h3>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sabor Lima</span>
                        </div>
                        <p className="kids-card-desc">
                          Vitamina C, magnesio, tetrazimas y zinc para el soporte diario.
                        </p>
                        <div className="kids-meta-line">
                          <span>Vitamina C · Zinc · Tetrazimas</span>
                          <a
                            href="#/servicios/suplementacion-infantil-fego-kids"
                            onClick={(e) => { e.preventDefault(); navigateTo('#/servicios/suplementacion-infantil-fego-kids'); }}
                            className="craft-link-underline"
                            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
                          >
                            <span>Ver ficha</span>
                            <ChevronRight size={15} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialSurface>

              {/* SECCIÓN 3: VITALIDAD Y NUTRICIÓN ADULTOS (Contrast Dark 60/40) */}
              <EditorialSurface variant="contrast" tone="contrast" id="adultos-energia">
                <div className="site-container">
                  <div className="adults-split-container">
                    <div className="adults-narrative">
                      <h2 style={{ color: '#FFFFFF' }}>Vitalidad funcional para tu rutina</h2>
                      <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        VitalPro combina 16g de proteína limpia con superalimentos y cero azúcar añadida.
                      </p>

                      <div className="adults-specs-list">
                        <div className="adult-spec-item">
                          <div className="spec-icon-box">
                            <Check size={16} />
                          </div>
                          <div>
                            <div className="spec-text-title">16g de proteína por porción</div>
                            <div className="spec-text-desc">Saciedad y soporte muscular para jornadas activas.</div>
                          </div>
                        </div>

                        <div className="adult-spec-item">
                          <div className="spec-icon-box">
                            <Check size={16} />
                          </div>
                          <div>
                            <div className="spec-text-title">Espirulina, Reishi y Omega 3</div>
                            <div className="spec-text-desc">Superalimentos funcionales para recuperación e inmunidad.</div>
                          </div>
                        </div>

                        <div className="adult-spec-item">
                          <div className="spec-icon-box">
                            <Check size={16} />
                          </div>
                          <div>
                            <div className="spec-text-title">Keto friendly y sin azúcar</div>
                            <div className="spec-text-desc">Energía limpia sin picos glucémicos durante el día.</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingTop: 12 }}>
                        <MagneticButton
                          variant="primary"
                          href="#/servicios/nutricion-funcional-adultos"
                          onClick={(e) => { e.preventDefault(); navigateTo('#/servicios/nutricion-funcional-adultos'); }}
                        >
                          Conocer VitalPro
                        </MagneticButton>
                      </div>
                    </div>

                    <div className="adults-image-frame">
                      <ClipRevealImage
                        src="./media/ai_service_2.webp"
                        alt="Nutrición funcional para adultos VitalPro"
                        aspectRatio="4/4"
                        parallax
                      />
                    </div>
                  </div>
                </div>
              </EditorialSurface>

              {/* SECCIÓN 4: SOLUCIONES PARA EL HOGAR (Tactile Grain Surface) */}
              <EditorialSurface variant="grain" tone="primary" id="hogar-rutina" style={{ paddingBlock: 'var(--section-pad-y)' }}>
                <div className="site-container">
                  <div className="section-header-editorial section-header-editorial--split">
                    <div>
                      <h2>Soluciones prácticas para el hogar</h2>
                      <p className="section-subtext">
                        Artículos funcionales seleccionados para simplificar tu rutina diaria en casa.
                      </p>
                    </div>
                    <MagneticButton
                      variant="secondary"
                      href="#/servicios/soluciones-para-el-hogar"
                      onClick={(e) => { e.preventDefault(); navigateTo('#/servicios/soluciones-para-el-hogar'); }}
                    >
                      Ver hogar
                    </MagneticButton>
                  </div>

                  <div className="home-mosaic-grid">
                    <div className="home-image-col">
                      <ClipRevealImage
                        src="./media/ai_service_3.webp"
                        alt="Artículos prácticos para el hogar FEGO"
                        aspectRatio="4/3"
                        parallax
                      />
                    </div>

                    <div className="home-features-col">
                      <div className="home-feature-card">
                        <span className="feature-num-label">01</span>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Utilidad comprobada</h3>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                            Artículos pensados para resolver tareas cotidianas de orden y comodidad.
                          </p>
                        </div>
                      </div>

                      <div className="home-feature-card">
                        <span className="feature-num-label">02</span>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Pago contra entrega</h3>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                            Recibes tu pedido en mano antes de realizar el pago.
                          </p>
                        </div>
                      </div>

                      <div className="home-feature-card">
                        <span className="feature-num-label">03</span>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Envíos a todo el país</h3>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                            Despacho coordinado a cualquier provincia de República Dominicana.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialSurface>

              {/* SECCIÓN 5: MOMENTO FIRMA — MÓDULO INTERACTIVO DE BIO-RUTINA DIARIA */}
              <EditorialSurface variant="ambient" tone="secondary" id="rutina-fego" style={{ paddingBlock: 'var(--section-pad-y)' }}>
                <div className="site-container">
                  <div className="section-header-editorial section-header-editorial--split">
                    <div>
                      <h2>Optimiza tu rutina diaria</h2>
                      <p className="section-subtext">
                        Compara las fórmulas y elige la combinación ideal para tu familia.
                      </p>
                    </div>

                    <div className="routine-tabs-nav">
                      <button
                        type="button"
                        className={`routine-tab-btn ${activeRoutineTab === 'kids' ? 'is-active' : ''}`}
                        onClick={() => setActiveRoutineTab('kids')}
                      >
                        Desarrollo Infantil
                      </button>
                      <button
                        type="button"
                        className={`routine-tab-btn ${activeRoutineTab === 'vitalpro' ? 'is-active' : ''}`}
                        onClick={() => setActiveRoutineTab('vitalpro')}
                      >
                        VitalPro Adultos
                      </button>
                      <button
                        type="button"
                        className={`routine-tab-btn ${activeRoutineTab === 'digestive' ? 'is-active' : ''}`}
                        onClick={() => setActiveRoutineTab('digestive')}
                      >
                        Salud Digestiva
                      </button>
                    </div>
                  </div>

                  <div className="routine-box">
                    {activeRoutineTab === 'kids' && (
                      <div className="routine-content-view">
                        <div>
                          <span className="section-kicker">Rutina Mañana Escolar</span>
                          <h3 style={{ marginTop: 8, fontSize: '1.6rem' }}>Genius Shake + D-Fenz</h3>
                          <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.96rem', lineHeight: 1.6 }}>
                            La combinación idónea antes de salir a clases: aporte energético de lenta absorción para el foco mental junto a antioxidantes y minerales que protegen las defensas en el colegio.
                          </p>
                          <div style={{ marginTop: 24 }}>
                            <table className="routine-specs-table">
                              <tbody>
                                <tr>
                                  <td>Momento sugerido</td>
                                  <td>En el desayuno o merienda escolar</td>
                                </tr>
                                <tr>
                                  <td>Ingredientes activos</td>
                                  <td>Proteína vegetal, Omega 3, Vitamina C, Zinc quelado</td>
                                </tr>
                                <tr>
                                  <td>Sabor</td>
                                  <td>Chocolate suave y lima refrescante</td>
                                </tr>
                                <tr>
                                  <td>Endulzante</td>
                                  <td>0% Azúcar añadida</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <ClipRevealImage
                            src="./media/ai_service_1.webp"
                            alt="Suplementos infantiles FEGO Kids"
                            aspectRatio="4/3"
                          />
                          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                            <MagneticButton
                              variant="primary"
                              href={instagramUrl}
                              target="_blank"
                            >
                              Pedir combo Kids por WhatsApp
                            </MagneticButton>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeRoutineTab === 'vitalpro' && (
                      <div className="routine-content-view">
                        <div>
                          <span className="section-kicker">Rutina Activa & Recuperación</span>
                          <h3 style={{ marginTop: 8, fontSize: '1.6rem' }}>VitalPro Functional Protein</h3>
                          <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.96rem', lineHeight: 1.6 }}>
                            Formulado para profesionales, padres activos y personas que buscan energía constante sin bajones de azúcar. 16g de proteína de alta asimilación con espirulina y reishi.
                          </p>
                          <div style={{ marginTop: 24 }}>
                            <table className="routine-specs-table">
                              <tbody>
                                <tr>
                                  <td>Momento sugerido</td>
                                  <td>Media mañana o post-entrenamiento ligero</td>
                                </tr>
                                <tr>
                                  <td>Concentración</td>
                                  <td>16 gramos de proteína limpia por servida</td>
                                </tr>
                                <tr>
                                  <td>Adaptógenos</td>
                                  <td>Hongo Reishi y Espirulina deshidratada</td>
                                </tr>
                                <tr>
                                  <td>Compatibilidad</td>
                                  <td>Keto Friendly · Sin azúcar añadida</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <ClipRevealImage
                            src="./media/ai_service_2.webp"
                            alt="VitalPro Nutrición Funcional Adultos"
                            aspectRatio="4/3"
                          />
                          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                            <MagneticButton
                              variant="primary"
                              href={instagramUrl}
                              target="_blank"
                            >
                              Pedir VitalPro por WhatsApp
                            </MagneticButton>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeRoutineTab === 'digestive' && (
                      <div className="routine-content-view">
                        <div>
                          <span className="section-kicker">Equilibrio Intestinal & Foco</span>
                          <h3 style={{ marginTop: 8, fontSize: '1.6rem' }}>SmartBiotics Microbiome</h3>
                          <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.96rem', lineHeight: 1.6 }}>
                            10 cepas probióticas viables que colonizan favorablemente el tracto gastrointestinal, asociadas con fibras prebióticas y L-treonato de magnesio para el balance digestivo integral.
                          </p>
                          <div style={{ marginTop: 24 }}>
                            <table className="routine-specs-table">
                              <tbody>
                                <tr>
                                  <td>Momento sugerido</td>
                                  <td>En ayunas o antes de la cena</td>
                                </tr>
                                <tr>
                                  <td>Complejo activo</td>
                                  <td>10 cepas probióticas + 3 enzimas digestivas</td>
                                </tr>
                                <tr>
                                  <td>Soporte neurológico</td>
                                  <td>L-treonato de magnesio y colina</td>
                                </tr>
                                <tr>
                                  <td>Disolución</td>
                                  <td>Fácil integración en agua o batidos</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <ClipRevealImage
                            src="./media/ai_studio_space.webp"
                            alt="Espacio FEGO y suplementos funcionales"
                            aspectRatio="4/3"
                          />
                          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                            <MagneticButton
                              variant="primary"
                              href={instagramUrl}
                              target="_blank"
                            >
                              Pedir ahora
                            </MagneticButton>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </EditorialSurface>

              {/* SECCIÓN 6: COMPRA SEGURA Y ENVÍOS (Mesh Surface) */}
              <EditorialSurface variant="mesh" tone="primary" id="garantias-envio">
                <div className="site-container">
                  <div className="trust-strip-grid">
                    <div className="trust-module-box">
                      <Truck size={24} color="var(--accent)" />
                      <div className="trust-module-title">Pago Contra Entrega</div>
                      <p className="trust-module-desc">
                        Pagas tu pedido al recibirlo físicamente en República Dominicana.
                      </p>
                    </div>

                    <div className="trust-module-box">
                      <ShieldCheck size={24} color="var(--accent)" />
                      <div className="trust-module-title">Calidad Verificada</div>
                      <p className="trust-module-desc">
                        Ingredientes funcionales y artículos prácticos seleccionados con rigor.
                      </p>
                    </div>

                    <div className="trust-module-box">
                      <HeartHandshake size={24} color="var(--accent)" />
                      <div className="trust-module-title">Atención Directa</div>
                      <p className="trust-module-desc">
                        Coordinamos tus envíos y dudas directamente en nuestro canal oficial.
                      </p>
                    </div>
                  </div>
                </div>
              </EditorialSurface>
            </motion.div>
          )}

          {/* VISTA 2: CATÁLOGO COMPLETO (#/servicios) */}
          {isServices && (
            <motion.div
              key="view-services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <EditorialSurface variant="mesh" tone="primary" className="subpage-hero">
                <div className="site-container">
                  <button
                    type="button"
                    className="subpage-back-btn"
                    onClick={() => navigateTo('#/')}
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Inicio</span>
                  </button>
                  <span className="section-kicker">Catálogo Completo</span>
                  <h1 style={{ marginTop: 12 }}>Nuestras líneas de producto</h1>
                  <p className="section-subtext" style={{ marginTop: 12 }}>
                    Soluciones integrales de nutrición infantil, suplementación funcional para adultos y artículos prácticos para el hogar.
                  </p>
                </div>
              </EditorialSurface>

              <EditorialSurface variant="ambient" tone="secondary">
                <div className="site-container">
                  <div className="catalog-services-stack">
                    {SERVICES_DATA.map((srv, idx) => (
                      <div
                        key={srv.slug}
                        className={`service-catalog-card ${idx % 2 === 1 ? 'is-reversed' : ''}`}
                      >
                        <div className="service-card-visual">
                          <img
                            src={srv.photos[0]}
                            alt={srv.title}
                            loading="lazy"
                          />
                        </div>

                        <div className="service-card-info">
                          <span className="section-kicker">{srv.kicker}</span>
                          <h2>{srv.title}</h2>
                          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                            {srv.description}
                          </p>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBlock: 8 }}>
                            {srv.features.map((f) => (
                              <div key={f.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <Check size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 4 }} />
                                <div>
                                  <strong style={{ fontSize: '0.94rem' }}>{f.title}:</strong>{' '}
                                  <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{f.desc}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', paddingTop: 8 }}>
                            <MagneticButton
                              variant="primary"
                              href={`#/servicios/${srv.slug}`}
                              onClick={(e) => { e.preventDefault(); navigateTo(`#/servicios/${srv.slug}`); }}
                            >
                              Ver ficha completa
                            </MagneticButton>
                            <MagneticButton
                              variant="secondary"
                              href={instagramUrl}
                              target="_blank"
                            >
                              Pedir por WhatsApp
                            </MagneticButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </EditorialSurface>
            </motion.div>
          )}

          {/* VISTA 2.1: SUBPÁGINA DEDICADA DE SERVICIO (#/servicios/:slug) */}
          {isServiceDetail && currentService && (
            <motion.div
              key={`view-service-${currentService.slug}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <EditorialSurface variant="contrast" tone="contrast" className="subpage-hero">
                <div className="site-container">
                  <button
                    type="button"
                    className="subpage-back-btn"
                    style={{ color: '#CBD5E1' }}
                    onClick={() => navigateTo('#/servicios')}
                  >
                    <ArrowLeft size={16} />
                    <span>Volver al Catálogo</span>
                  </button>
                  <span className="section-kicker section-contrast-kicker">{currentService.kicker}</span>
                  <h1 style={{ marginTop: 12, color: '#FFFFFF' }}>{currentService.title}</h1>
                  <p style={{ color: '#CBD5E1', fontSize: '1.1rem', maxWidth: '64ch', marginTop: 14, lineHeight: 1.6 }}>
                    {currentService.description}
                  </p>
                </div>
              </EditorialSurface>

              <EditorialSurface variant="architectural" tone="primary">
                <div className="site-container">
                  <div className="service-detail-container">
                    <div>
                      <h2>Especificaciones & Beneficios</h2>
                      <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '1.02rem' }}>
                        Formulaciones limpias, ingredientes activos seleccionados y entrega con pago en mano.
                      </p>

                      <div className="detail-features-grid">
                        {currentService.features.map((feat, index) => (
                          <div key={feat.title} className="detail-feature-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)' }}>
                                0{index + 1}
                              </span>
                              <h3 style={{ fontSize: '1.15rem' }}>{feat.title}</h3>
                            </div>
                            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                              {feat.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: 36, padding: 24, background: '#FFFFFF', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-hairline)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Ficha Técnica del Producto</h3>
                        <table className="routine-specs-table">
                          <tbody>
                            {currentService.specs.map((item) => (
                              <tr key={item.label}>
                                <td>{item.label}</td>
                                <td>{item.val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <div style={{ borderRadius: 'var(--radius-media)', overflow: 'hidden', border: '1px solid var(--border-hairline)', background: '#0A2F64' }}>
                        <img
                          src={currentService.photos[0]}
                          alt={currentService.title}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>

                      <div style={{ marginTop: 24, background: '#FFFFFF', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-hairline)', padding: 24 }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>¿Deseas ordenar este producto?</h3>
                        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 20 }}>
                          Contáctanos por WhatsApp para verificar disponibilidad de stock y coordinar el despacho con pago contra entrega en tu dirección.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <MagneticButton
                            variant="primary"
                            href={instagramUrl}
                            target="_blank"
                            style={{ width: '100%', textAlign: 'center' }}
                          >
                            Pedir por WhatsApp ahora
                          </MagneticButton>
                          <MagneticButton
                            variant="secondary"
                            href="#/contacto"
                            onClick={(e) => { e.preventDefault(); navigateTo('#/contacto'); }}
                            style={{ width: '100%', textAlign: 'center' }}
                          >
                            Ver condiciones de envío
                          </MagneticButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialSurface>
            </motion.div>
          )}

          {/* VISTA 3: CASOS REALES / RESULTADOS (#/casos) */}
          {isCases && (
            <motion.div
              key="view-cases"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <EditorialSurface variant="mesh" tone="primary" className="subpage-hero">
                <div className="site-container">
                  <button
                    type="button"
                    className="subpage-back-btn"
                    onClick={() => navigateTo('#/')}
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Inicio</span>
                  </button>
                  <span className="section-kicker">Evidencia de Calidad</span>
                  <h1 style={{ marginTop: 12 }}>Casos y resultados verificados</h1>
                  <p className="section-subtext" style={{ marginTop: 12 }}>
                    Diseño y desarrollo de fórmulas pediátricas de alto impacto nutricional en República Dominicana.
                  </p>
                </div>
              </EditorialSurface>

              <EditorialSurface variant="ambient" tone="secondary">
                <div className="site-container">
                  <div className="cases-gallery-grid">
                    <div className="case-card-massive">
                      <div className="case-media-side">
                        <img
                          src="./media/post_6.jpg"
                          alt="Caso FEGO Kids Suplementación Infantil"
                        />
                      </div>

                      <div className="case-content-side">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)' }}>
                            CASO 01
                          </span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Nutrición Pediátrica · República Dominicana
                          </span>
                        </div>

                        <h2>Línea de Suplementación Infantil FEGO Kids</h2>

                        <div>
                          <strong style={{ display: 'block', fontSize: '0.94rem', marginBottom: 4, color: 'var(--text-primary)' }}>
                            El Reto Nutricional:
                          </strong>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                            Desarrollar y presentar una tríada de suplementación pediátrica que aborde simultáneamente el aporte proteico y vitamínico (Genius Shake), la microbiota y digestión (SmartBiotics), y el sistema inmune (D-Fenz) sin azúcares añadidos ni colorantes nocivos.
                          </p>
                        </div>

                        <div>
                          <strong style={{ display: 'block', fontSize: '0.94rem', marginBottom: 4, color: 'var(--text-primary)' }}>
                            La Solución FEGO:
                          </strong>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                            Composición de producto presentada en envases sellados con especificación detallada de nutrientes, sabores naturales (mango, chocolate y lima) y dosificación pensada para la rutina familiar con total garantía de entrega nacional.
                          </p>
                        </div>

                        <div style={{ paddingTop: 8 }}>
                          <MagneticButton
                            variant="primary"
                            href={instagramUrl}
                            target="_blank"
                          >
                            Consultar disponibilidad de la tríada
                          </MagneticButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialSurface>
            </motion.div>
          )}

          {/* VISTA 4: NOSOTROS Y ESPACIO (#/nosotros) */}
          {isAbout && (
            <motion.div
              key="view-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <EditorialSurface variant="mesh" tone="primary" className="subpage-hero">
                <div className="site-container">
                  <button
                    type="button"
                    className="subpage-back-btn"
                    onClick={() => navigateTo('#/')}
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Inicio</span>
                  </button>
                  <span className="section-kicker">Filosofía & Equipo</span>
                  <h1 style={{ marginTop: 12 }}>Dirección General · FEGO Market</h1>
                  <p className="section-subtext" style={{ marginTop: 12 }}>
                    Comercio electrónico transparente y bienestar cotidiano en República Dominicana.
                  </p>
                </div>
              </EditorialSurface>

              <EditorialSurface variant="ambient" tone="secondary">
                <div className="site-container">
                  <div className="about-hero-grid">
                    <div>
                      <span className="section-kicker">Nuestra Historia</span>
                      <h2 style={{ marginTop: 8 }}>Comercio transparente y seguro</h2>
                      <p style={{ marginTop: 16, color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.65 }}>
                        FEGO nace en República Dominicana como una plataforma de comercio electrónico orientada a transformar la experiencia de compra en línea, superando la falta de claridad en entregas y la desconfianza en el pago. Su catálogo integra productos prácticos y funcionales para el hogar, la nutrición y el ritmo de vida actual.
                      </p>
                      <p style={{ marginTop: 14, color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.65 }}>
                        La marca enfoca su selección en estándares de calidad y conveniencia diaria, abarcando desde nutrición activa y suplementos infantiles formulados con ingredientes funcionales hasta soluciones directas para el hogar, respaldadas por un esquema de pago contra entrega con cobertura nacional.
                      </p>

                      <div className="about-quote-box">
                        <p className="about-quote-text">
                          "Comprar online debería ser un proceso simple y seguro. Buscamos los productos, los elegimos y te los llevamos a casa."
                        </p>
                        <div style={{ marginTop: 12, fontSize: '0.85rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                          — Dirección General · FEGO Market
                        </div>
                      </div>
                    </div>

                    <div>
                      <ClipRevealImage
                        src="./media/ai_studio_space.webp"
                        alt="Espacio y Experiencia FEGO"
                        aspectRatio="4/4"
                        parallax
                      />
                    </div>
                  </div>

                  {/* STATS REALES VERIFICADAS */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32, paddingBottom: 72 }}>
                    <CounterMetric
                      value="100%"
                      label="Cobertura nacional con pago contra entrega"
                      note="Envíos coordinados a todas las provincias de RD"
                    />
                    <CounterMetric
                      value="16g"
                      label="Proteína funcional por porción"
                      note="Concentración verificada en batido VitalPro"
                    />
                    <CounterMetric
                      value="10"
                      label="Cepas probióticas vivas"
                      note="Formulación activa en SmartBiotics Kids"
                    />
                  </div>
                </div>
              </EditorialSurface>
            </motion.div>
          )}

          {/* VISTA 5: CONTACTO Y COBERTURA (#/contacto) */}
          {isContact && (
            <motion.div
              key="view-contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <EditorialSurface variant="mesh" tone="primary" className="subpage-hero">
                <div className="site-container">
                  <button
                    type="button"
                    className="subpage-back-btn"
                    onClick={() => navigateTo('#/')}
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Inicio</span>
                  </button>
                  <span className="section-kicker">Despacho & Pedidos</span>
                  <h1 style={{ marginTop: 12 }}>Cobertura en toda República Dominicana</h1>
                  <p className="section-subtext" style={{ marginTop: 12 }}>
                    Coordina tu orden directamente con nuestro equipo de atención y abona al recibir tu producto.
                  </p>
                </div>
              </EditorialSurface>

              <EditorialSurface variant="ambient" tone="secondary">
                <div className="site-container">
                  <div className="contact-layout-grid">
                    <div className="contact-card-box">
                      <div>
                        <span className="section-kicker">Canales Oficiales</span>
                        <h2 style={{ marginTop: 6, fontSize: '1.8rem' }}>Atención personalizada</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 8 }}>
                          Respondemos tus consultas de dosificación, catálogo y coordinamos tu ruta de entrega.
                        </p>
                      </div>

                      <div className="contact-info-row">
                        <div className="contact-icon-pill">
                          <Instagram size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>Instagram Oficial</div>
                          <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent-hover)', fontSize: '0.94rem' }}
                          >
                            @fego_market
                          </a>
                        </div>
                      </div>

                      <div className="contact-info-row">
                        <div className="contact-icon-pill">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>Cobertura Nacional</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                            República Dominicana (Santo Domingo, Santiago y todas las provincias)
                          </div>
                        </div>
                      </div>

                      <div className="contact-info-row">
                        <div className="contact-icon-pill">
                          <Truck size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>Modalidad de Pago</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                            Pago contra entrega al recibir el producto en mano
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingTop: 8 }}>
                        <MagneticButton
                          variant="primary"
                          href={instagramUrl}
                          target="_blank"
                          style={{ width: '100%', textAlign: 'center' }}
                        >
                          Escribirnos por WhatsApp / DM
                        </MagneticButton>
                      </div>
                    </div>

                    <div>
                      <div className="section-header-editorial">
                        <span className="section-kicker">Dudas Frecuentes</span>
                        <h2>Preguntas & Respuestas</h2>
                      </div>
                      <EditorialAccordion items={FAQS_DATA} defaultOpen={0} />
                    </div>
                  </div>
                </div>
              </EditorialSurface>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER ARQUITECTÓNICO BESPOKE */}
      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <div className="brand-emblem-wrap" style={{ color: '#FFFFFF' }}>
                <img
                  src="./media/logo_real.jpg"
                  alt="FEGO Logo"
                  className="brand-logo-img"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                />
                <span>FEGO</span>
              </div>
              <p className="footer-brand-desc">
                Soluciones prácticas para tu día a día con productos funcionales para el hogar y la rutina personal en República Dominicana.
              </p>
              <div style={{ display: 'flex', gap: 14 }}>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#CBD5E1',
                    fontSize: '0.88rem'
                  }}
                >
                  <Instagram size={17} />
                  <span>@fego_market</span>
                </a>
              </div>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Catálogo</span>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/servicios/suplementacion-infantil-fego-kids')}
              >
                FEGO Kids
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/servicios/nutricion-funcional-adultos')}
              >
                VitalPro Adultos
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/servicios/soluciones-para-el-hogar')}
              >
                Hogar & Rutina
              </button>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Empresa</span>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/')}
              >
                Inicio
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/casos')}
              >
                Casos Reales
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/nosotros')}
              >
                Nosotros
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={() => navigateTo('#/contacto')}
              >
                Contacto
              </button>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Garantía</span>
              <span style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                Pago contra entrega disponible en todo el país. Envíos coordinados a nivel nacional.
              </span>
              <div style={{ marginTop: 8 }}>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#34D399',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <span>Pedir por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>
              © {new Date().getFullYear()} FEGO Market. Todos los derechos reservados.
            </div>
            <div>
              República Dominicana · Comercio Funcional Directo
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
