/* =========================
   DOM CONTENT LOADED
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FILTER FUNCTION
  ========================== */
  const filterLinks = document.querySelectorAll(".filter-nav a");
  const items = document.querySelectorAll(".grid-item");

  function applyFilter(filter) {
    filterLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`.filter-nav a[data-filter="${filter}"]`);
    if (activeLink) activeLink.classList.add("active");

    items.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  filterLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const filter = e.target.dataset.filter;
      applyFilter(filter);
    });
  });

  /* =========================
     HEADER SCROLL BACKGROUND
  ========================== */
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

});

  /* =========================
    COLLAPSIBLE FILTER MENU (Mobile)
  ========================= */
  const filterToggle = document.querySelector(".filter-toggle");
  const filterList = document.querySelector(".filter-nav ul");

  if (filterToggle && filterList) {
    filterToggle.addEventListener("click", () => {
      filterList.classList.toggle("show");
      filterToggle.classList.toggle("active");
    });
  }
  
/* =========================
   HIDE FILTER WHEN FOOTER VISIBLE
========================= */
const filterNav = document.querySelector(".filter-nav");
const footer = document.querySelector(".footer-section");

if (filterNav && footer) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        filterNav.classList.add("filter-hidden");
      } else {
        filterNav.classList.remove("filter-hidden");
      }
    });
  }, { threshold: 0.1 });

  observer.observe(footer);
}


/* =========================
   LIGHTBOX FUNCTION
========================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-btn");

if (lightbox && lightboxImg && closeBtn) {
  document.querySelectorAll(".grid-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  // Tutup lightbox dengan tombol X
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Tutup jika klik area luar
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}