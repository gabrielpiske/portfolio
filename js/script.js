document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const topLink = document.getElementById("top-link");
  const menuBtn = document.getElementById("menu-icon");
  const navContainer = document.getElementById("nav-container");
  const navLinks = document.querySelectorAll(".navlist a");
  const sections = document.querySelectorAll("main section[id]");
  const themeToggleBtn = document.getElementById("theme-toggle");

  // 1. Tema Claro / Escuro (padrão: claro)
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("portfolio-theme", nextTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    if (!icon) return;
    icon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
  }

  // 2. Menu Mobile
  if (menuBtn && navContainer) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navContainer.classList.toggle("open");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "bx bx-x" : "bx bx-menu";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navContainer.classList.remove("open");
        const icon = menuBtn.querySelector("i");
        if (icon) icon.className = "bx bx-menu";
      });
    });
  }

  // 3. Scroll: Header, Voltar ao Topo e Link Ativo
  function handleScroll() {
    const scrollY = window.scrollY;

    if (header) {
      header.classList.toggle("sticky", scrollY > 20);
    }

    if (topLink) {
      topLink.classList.toggle("show-top", scrollY > 240);
      topLink.classList.toggle("hide-top", scrollY <= 240);
    }

    let currentSectionId = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentSectionId}`);
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 4. Filtro de Projetos
  const filterContainer = document.getElementById("project-filters");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterContainer && projectCards.length) {
    const buttons = filterContainer.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");
        projectCards.forEach((card) => {
          const categories = (card.getAttribute("data-category") || "").split(/\s+/);
          const matches = filterValue === "all" || categories.includes(filterValue);
          card.classList.toggle("hidden-item", !matches);
        });
      });
    });
  }

  // 5. Copiar E-mail
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const emailTextEl = document.getElementById("email-text");

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = "Copiado!";
        setTimeout(() => {
          copyEmailBtn.textContent = "Copiar";
        }, 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }
});
