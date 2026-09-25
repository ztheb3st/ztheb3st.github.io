/* ==========================================================================
   Cris — Portafolio
   Lógica de interfaz: navbar, contenido dinámico y contacto.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavbarScroll();
  initMobileMenu();
  renderTrayectoria();
  renderServicios();
  initDiscordCopy();
});

/* ---------- Año en el footer ---------- */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Navbar: fondo sólido al hacer scroll ---------- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Menú hamburguesa (móvil) ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove("is-open");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cierra el menú al elegir una opción
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ==========================================================================
   TRAYECTORIA
   Para añadir un nuevo proyecto o experiencia, agrega un objeto más
   a este arreglo con los mismos campos.
   ========================================================================== */
const trayectoriaData = [
  {
    nombre: "PandaMC",
    rol: "Media Manager",
    descripcion:
      "Servidor de Minecraft",
    info: "pandamc.us | 19132",
  },
  {
    nombre: "EskMC Network",
    rol: "Media Manager",
    descripcion:
      "Servidor de Minecraft.",
    info: "eskmc.net | 19132",
  },
  {
    nombre: "NautilusMC",
    rol: "Media Manager",
    descripcion:
      "Servidor de Minecraft.",
    info: "nautilumc.us | 19132",
  },
  {
    nombre: "KronixMC",
    rol: "Media Manager",
    descripcion:
      "Servidor de Minecraft.",
    info: "kronixmc.net",
  },
  {
    nombre: "MineGhoul",
    rol: "Media Manager",
    descripcion:
      "Servidor de Minecraft.",
    info: "mineghoul.us",
  },
];

function renderTrayectoria() {
  const grid = document.getElementById("trayectoriaGrid");
  if (!grid) return;

  grid.innerHTML = trayectoriaData
    .map(
      (item) => `
      <article class="card">
        <span class="card__role">${item.rol}</span>
        <h3 class="card__title">${item.nombre}</h3>
        <p class="card__desc">${item.descripcion}</p>
        <p class="card__meta">${item.info}</p>
      </article>
    `
    )
    .join("");
}

/* ==========================================================================
   SERVICIOS
   Para añadir un nuevo servicio, agrega un objeto más a este arreglo.
   El campo "icono" acepta cualquier SVG en línea.
   ========================================================================== */
const serviciosData = [
  {
    titulo: "Administración Buena",
    descripcion: "Orden.",
    icono: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.5"/><path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor"/></svg>`,
  },
  {
    titulo: "Servicio Organizado",
    descripcion: "Sin problemas.",
    icono: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16v10H8l-4 4V5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  },
  {
    titulo: "Habilidades de moderación",
    descripcion: "Justo.",
    icono: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="1.4" fill="currentColor"/><path d="M5 17l5-5 4 4 3-3 2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  
];

function renderServicios() {
  const grid = document.getElementById("serviciosGrid");
  if (!grid) return;

  grid.innerHTML = serviciosData
    .map(
      (item) => `
      <article class="card service-card">
        <div class="service-card__icon">${item.icono}</div>
        <h3 class="card__title">${item.titulo}</h3>
        <p class="card__desc">${item.descripcion}</p>
      </article>
    `
    )
    .join("");
}

/* ---------- Contacto: copiar usuario de Discord ---------- */
function initDiscordCopy() {
  const card = document.getElementById("discordCard");
  const handleEl = document.getElementById("discordHandle");
  const hintEl = document.getElementById("discordHint");
  if (!card || !handleEl || !hintEl) return;

  const discordUser = handleEl.textContent.trim();
  const defaultHint = hintEl.textContent;

  card.addEventListener("click", async () => {
    try {
      await copyToClipboard(discordUser);
      hintEl.textContent = "¡Copiado!";
    } catch (err) {
      hintEl.textContent = "No se pudo copiar";
    }

    setTimeout(() => {
      hintEl.textContent = defaultHint;
    }, 2000);
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  // Alternativa para navegadores sin soporte de Clipboard API
  return new Promise((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  });
}
