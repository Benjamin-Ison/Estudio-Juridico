import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';

const areas = [
  ['Derecho Civil', 'Contratos, daños y perjuicios, propiedad y responsabilidad civil.', '/derecho-civil'],
  ['Derecho Laboral', 'Despidos, accidentes de trabajo, reclamos salariales y negociación.', '/derecho-laboral'],
  ['Derecho Penal', 'Defensa penal, querellas y asistencia urgente las 24 horas.', '/derecho-penal'],
  ['Derecho Comercial', 'Sociedades, contratos comerciales, concursos y compliance.', '/derecho-comercial'],
  ['Derecho de Familia', 'Divorcios, cuota alimentaria, régimen de comunicación y violencia familiar.', '/derecho-familia'],
  ['Sucesiones', 'Declaratoria de herederos, testamentos, particiones y trámites hereditarios.', '/sucesiones'],
];

const faqs = [
  ['¿La primera consulta tiene costo?', 'No. La primera consulta de treinta minutos es sin cargo, presencial o por videollamada.'],
  ['¿Cómo se calculan los honorarios?', 'Depende del tipo de caso. Siempre presentamos la propuesta por escrito antes de iniciar.'],
  ['¿Atienden casos fuera de la Ciudad de Buenos Aires?', 'Sí. Trabajamos en CABA, Provincia de Buenos Aires y fuero federal mediante corresponsales.'],
  ['¿Puedo hacer la consulta por videollamada?', 'Sí. Podés reunirte con tu abogado por videollamada y firmar la documentación digitalmente.'],
  ['¿Cuánto tardan en responder una consulta?', 'Toda consulta recibida por formulario o correo se responde dentro de las 24 horas hábiles.'],
  ['¿Trabajan con urgencias penales?', 'Sí. Contamos con una guardia penal disponible las 24 horas, todos los días.'],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido principal</a>
    <header className="header" role="banner">
      <div className="container header__inner">
        <Link className="brand" to="/" aria-label="Ferrer & Asociados, ir al inicio">
          <img className="brand__mark" src="/assets/logo/logo.png" alt="Escudo con el monograma F&A" width="40" height="40" />
          <span className="brand__text"><span className="brand__name">Ferrer & Asociados</span><span className="brand__sub">Estudio Jurídico</span></span>
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="nav">
            <NavItem to="/" label="Inicio" />
            <NavItem to="/nosotros" label="Nosotros" />
            <li className={`nav__item ${servicesOpen ? 'is-open' : ''}`}>
              <button className="nav__link nav__toggle" type="button" onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen}>Servicios <span aria-hidden="true">⌄</span></button>
              <ul className="submenu"><li><Link to="/servicios">Todos los servicios</Link></li>{areas.map(([name, , path]) => <li key={path}><Link to={path}>{name}</Link></li>)}</ul>
            </li>
            <NavItem to="/equipo" label="Equipo" />
            <NavItem to="/casos" label="Casos" />
            <NavItem to="/faq" label="Preguntas frecuentes" />
          </ul>
        </nav>
        <Link className="btn btn--gold btn--sm header__cta" to="/contacto">Solicitar consulta</Link>
        <button className={`burger ${open ? 'is-active' : ''}`} type="button" onClick={() => setOpen(!open)} aria-label="Abrir menú de navegación" aria-expanded={open} aria-controls="menu-movil"><span></span><span></span><span></span></button>
      </div>
    </header>
    <nav className={`mobile-nav ${open ? 'is-open' : ''}`} id="menu-movil" aria-label="Navegación móvil">
      <MobileLink to="/" label="Inicio" /><MobileLink to="/nosotros" label="Nosotros" /><MobileLink to="/servicios" label="Servicios" />
      <div className="mobile-nav__sub">{areas.map(([name, , path]) => <MobileLink key={path} to={path} label={name} />)}</div>
      <MobileLink to="/equipo" label="Equipo" /><MobileLink to="/casos" label="Casos de éxito" /><MobileLink to="/faq" label="Preguntas frecuentes" /><MobileLink to="/contacto" label="Contacto" />
      <Link className="btn btn--gold" to="/contacto">Solicitar consulta</Link>
    </nav>
  </>;
}

function NavItem({ to, label }) { return <li><NavLink className="nav__link" to={to} end={to === '/'}>{label}</NavLink></li>; }
function MobileLink({ to, label }) { return <Link to={to}>{label}</Link>; }

function Footer() {
  return <footer className="footer" role="contentinfo"><div className="container"><div className="footer__grid">
    <div className="footer__brand"><Link className="brand" to="/"><img className="brand__mark" src="/assets/logo/logo.png" alt="" width="40" height="40" /><span className="brand__text"><span className="brand__name">Ferrer & Asociados</span><span className="brand__sub">Estudio Jurídico</span></span></Link><p className="footer__about">Compromiso, experiencia y soluciones legales. Más de 20 años acompañando a personas y empresas.</p></div>
    <div><h3>Contacto</h3><p>Av. Corrientes 1450, Piso 8<br />CABA · +54 11 4321-0000</p><Link className="link-arrow" to="/contacto">Solicitar consulta →</Link></div>
    <div><h3>Áreas de práctica</h3>{areas.slice(0, 3).map(([name, , path]) => <Link className="footer__link" key={path} to={path}>{name}</Link>)}</div>
  </div><div className="footer__bottom"><span>© {new Date().getFullYear()} Ferrer & Asociados</span><span>Todos los derechos reservados</span></div></div></footer>;
}

function Layout() { return <><Header /><main id="contenido"><Routes><Route path="/" element={<Home />} /><Route path="/faq" element={<Faq />} /><Route path="/contacto" element={<Contact />} /><Route path="*" element={<GenericPage />} /></Routes></main><Footer /></>; }

function PageHero({ eyebrow, title, text }) { return <section className="page-hero"><div className="container page-hero__inner"><ol className="breadcrumb"><li><Link to="/">Inicio</Link></li><li>{title}</li></ol><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>; }

function Home() {
  return <>
    <section className="hero"><div className="hero__media"><img src="/assets/img/hero.jpg" alt="Abogados analizando documentación" width="1920" height="1280" /></div><div className="container hero__inner"><p className="eyebrow">Buenos Aires · Desde 2004</p><h1>Defendemos tus derechos con <em>rigor y cercanía</em></h1><p className="hero__sub">Compromiso, experiencia y soluciones legales. Un estudio boutique especializado en las principales áreas del derecho.</p><div className="hero__actions"><Link className="btn btn--gold" to="/contacto">Solicitar consulta</Link><Link className="btn btn--outline-light" to="/servicios">Conocer servicios</Link></div><div className="hero__meta"><div><strong>20+</strong><span>Años de trayectoria</span></div><div><strong>350+</strong><span>Casos resueltos</span></div><div><strong>24 h</strong><span>Respuesta garantizada</span></div></div></div></section>
    <section className="section"><div className="container split"><div><p className="eyebrow">El estudio</p><h2>Estrategia jurídica pensada caso por caso</h2><p className="lead">Cada expediente esconde una historia personal o un proyecto empresarial que merece atención real.</p><p>Trabajamos con equipos reducidos y dedicados. Combinamos litigio de alta complejidad con una práctica preventiva que evita conflictos antes de que existan.</p><p className="quote-box">“La mejor sentencia es la que nunca hizo falta pedir.”</p><Link className="link-arrow" to="/nosotros">Conocer nuestra historia →</Link></div><figure className="media media--gold"><img src="/assets/img/oficina.jpg" alt="Biblioteca jurídica del estudio" width="1440" height="960" /></figure></div></section>
    <section className="section section--gray"><div className="container"><div className="section-head section-head--center"><p className="eyebrow">Áreas de práctica</p><h2>Seis especialidades, un mismo estándar</h2><p className="lead">Tu consulta llega directamente a quien domina el área.</p></div><div className="grid grid-3">{areas.map(([name, description, path]) => <Link className="card card--link" key={path} to={path}><span className="card__icon">✦</span><h3>{name}</h3><p>{description}</p><span className="link-arrow mt-32">Ver servicio →</span></Link>)}</div></div></section>
    <section className="section section--navy"><div className="container section-head section-head--center"><p className="eyebrow">Hablemos</p><h2>¿Tenés una consulta?</h2><p className="lead">La primera consulta de treinta minutos es sin cargo.</p><Link className="btn btn--gold" to="/contacto">Contactar al estudio</Link></div></section>
  </>;
}

function Faq() { const [active, setActive] = useState(null); return <><PageHero eyebrow="Ayuda" title="Preguntas frecuentes" text="Las consultas que más nos hacen sobre honorarios, plazos y modalidades de atención." /><section className="section"><div className="container" style={{ maxWidth: 900 }}><div className="accordion">{faqs.map(([question, answer], index) => <div className="accordion__item" key={question}><h3 className="mb-0"><button className="accordion__trigger" type="button" aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}><span>{question}</span><span className="accordion__icon" aria-hidden="true">+</span></button></h3><div className="accordion__panel" style={{ height: active === index ? 'auto' : 0 }}><p>{answer}</p></div></div>)}</div><div className="card mt-48 text-center"><h3>¿No encontraste tu respuesta?</h3><p>Escribinos y te contestamos dentro de las 24 horas hábiles.</p><Link className="btn btn--primary" to="/contacto">Hacer una consulta</Link></div></div></section></>; }

function Contact() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', area: '', mensaje: '', privacidad: false });
  const [status, setStatus] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  const submit = (event) => { event.preventDefault(); if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.area || form.mensaje.length < 10 || !form.privacidad) { setStatus('Revisá los campos obligatorios antes de enviar.'); return; } setStatus('¡Gracias! Recibimos tu consulta y te contactaremos dentro de las próximas 24 horas hábiles.'); };
  return <><PageHero eyebrow="Hablemos" title="Solicitá tu consulta" text="Completá el formulario o comunicate directamente con el estudio." /><section className="section"><div className="container split" style={{ alignItems: 'start' }}><div><p className="eyebrow">Formulario</p><h2>Contanos tu caso</h2><p className="lead">Los datos que compartas son confidenciales.</p><form className="form mt-32" onSubmit={submit} noValidate><div className="form__row"><Field name="nombre" label="Nombre" value={form.nombre} onChange={update} /><Field name="apellido" label="Apellido" value={form.apellido} onChange={update} /></div><div className="form__row"><Field name="email" label="Correo electrónico" type="email" value={form.email} onChange={update} /><Field name="telefono" label="Teléfono" value={form.telefono} onChange={update} /></div><div className="field"><label htmlFor="area">Área de consulta *</label><select id="area" name="area" value={form.area} onChange={update}><option value="">Seleccioná un área</option>{areas.map(([name]) => <option key={name}>{name}</option>)}<option>Otra consulta</option></select></div><div className="field"><label htmlFor="mensaje">Mensaje *</label><textarea id="mensaje" name="mensaje" maxLength="1000" value={form.mensaje} onChange={update} placeholder="Contanos brevemente qué te pasa y desde cuándo." /><span style={{ display: 'block', textAlign: 'right', fontSize: '0.76rem', color: 'var(--gray-400)' }}>{form.mensaje.length} / 1000</span></div><div className="form__check"><input type="checkbox" id="privacidad" name="privacidad" checked={form.privacidad} onChange={update} /><label htmlFor="privacidad">Acepto que el estudio utilice mis datos para responder esta consulta. *</label></div>{status && <div className={`form__status is-visible ${status.startsWith('¡') ? 'is-success' : 'is-error'}`} role="status">{status}</div>}<button className="btn btn--gold" type="submit">Enviar consulta</button></form></div><aside><p className="eyebrow">Información</p><h2>Datos de contacto</h2><ul className="info-list mt-32"><li><div><strong>Dirección</strong><span>Av. Corrientes 1450, Piso 8<br />CABA</span></div></li><li><div><strong>Teléfono</strong><a href="tel:+541143210000">+54 11 4321-0000</a></div></li><li><div><strong>Correo</strong><a href="mailto:consultas@ferrerasociados.com.ar">consultas@ferrerasociados.com.ar</a></div></li><li><div><strong>Horario</strong><span>Lunes a viernes de 9:00 a 18:00 h<br />Guardia penal: 24 horas</span></div></li></ul></aside></div></section></>;
}
function Field({ name, label, type = 'text', value, onChange }) { return <div className="field"><label htmlFor={name}>{label} *</label><input id={name} name={name} type={type} value={value} onChange={onChange} required /></div>; }

function GenericPage() { const location = useLocation(); const area = areas.find(([, , path]) => path === location.pathname); const title = area?.[0] || ({ '/nosotros': 'Nosotros', '/equipo': 'Nuestro equipo', '/casos': 'Casos de éxito', '/servicios': 'Servicios' }[location.pathname] || 'Página'); return <><PageHero eyebrow={area ? 'Áreas de práctica' : 'Ferrer & Asociados'} title={title} text={area?.[1] || 'Experiencia, compromiso y una estrategia legal pensada para cada situación.'} /><section className="section"><div className="container split"><div><p className="eyebrow">Nuestra forma de trabajar</p><h2>Claridad para tomar buenas decisiones</h2><p className="lead">Analizamos cada caso con rigor, explicamos las alternativas y acompañamos todo el proceso.</p><p>Un equipo responsable y un canal directo para que siempre sepas cuál es el próximo paso.</p><Link className="btn btn--gold mt-32" to="/contacto">Solicitar consulta</Link></div><figure className="media media--gold"><img src="/assets/img/oficina.jpg" alt="Oficina del estudio jurídico" /></figure></div></section></>; }

export default function App() { return <Layout />; }
