  window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
    setTimeout(() => preloader.remove(), 500);
  });
/*************************************************
 *  DOM READY
 *************************************************/
document.addEventListener("DOMContentLoaded", () => {

    /* =======================
       DEVICE CHECK
    ======================= */
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    /* =======================
       ELEMENT REFERENCES
    ======================= */
    const heroImage      = document.getElementById("heroImage");
    const nameCard       = document.getElementById("nameCard");
    const section        = document.querySelector(".categories");
    const track          = document.getElementById("catTrack");
    const marquee        = document.getElementById("marquee");
    const prevBtn        = document.querySelector(".cat-btn.prev");
    const nextBtn        = document.querySelector(".cat-btn.next");
    const numberParallax = document.getElementById("numberParallax");

    /* =======================
       CATEGORY VISIBILITY TOGGLE
    ======================= */
    function updateCategoryButtons() {
        const rect = section.getBoundingClientRect();
        const visible = rect.top <= window.innerHeight * 0.5 && rect.bottom > 100;
        section.classList.toggle("active", visible);
    }
    window.addEventListener("scroll", updateCategoryButtons);
    updateCategoryButtons();

    /* =======================
       CATEGORY SLIDER BUTTONS
    ======================= */
    if (prevBtn && nextBtn && track) {
        const cardWidth = track.querySelector(".cat-card").offsetWidth + 24;
        prevBtn.addEventListener("click", () => track.scrollLeft -= cardWidth);
        nextBtn.addEventListener("click", () => track.scrollLeft += cardWidth);
    }

    /* =======================
       HEADER SCROLL EFFECT
    ======================= */
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".site-header");
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    /* =======================
       HERO IMAGE + NAME CARD PARALLAX
    ======================= */
    if (!isMobile && window.innerWidth > 1024 && window.matchMedia("(orientation: landscape)").matches) {
    const heroImage = document.querySelector(".hero-media img");
    const nameCard = document.querySelector(".name-card");

    const initialHeroScale = 1.2;
    const initialCardScale = 1.5;

    window.addEventListener("scroll", () => {
        const sc = window.scrollY;

        if (heroImage) {
        if (sc <= 0) {
            heroImage.style.transform = `scale(${initialHeroScale}) translateY(0px)`;
        } else {
            const scale = initialHeroScale + sc * 0.0002;
            heroImage.style.transform = `scale(${scale}) translateY(${sc * 0.05}px)`;
        }
        }

        if (nameCard) {
        if (sc <= 0) {
            nameCard.style.transform = `translate(-50%, -50%) scale(${initialCardScale})`;
        } else {
            const moveY = sc * 0.2;
            const scaleCard = Math.max(1, initialCardScale - sc * 0.0005);
            nameCard.style.transform = `translate(-50%, calc(-50% - ${moveY}px)) scale(${scaleCard})`;
        }
        }
    });
    }

    /* =======================
       MARQUEE CLONE HANDLER
    ======================= */
    if (!isMobile && marquee) {
        const text = marquee.querySelector(".marquee-text");
        if (text) {
            while (marquee.offsetWidth < window.innerWidth * 2) {
                marquee.appendChild(text.cloneNode(true));
            }
        }
    }

    /* =======================
       CATEGORY IMAGE SLIDESHOW ON HOVER
    ======================= */
    if (!isMobile) {
        document.querySelectorAll(".cat-card").forEach(card => {
            const img = card.querySelector(".thumb img");
            const imgList = card.dataset.images?.split(",").map(i => i.trim());
            if (!imgList || imgList.length <= 1) return;

            let index = 0;
            let interval;

            card.addEventListener("mouseenter", () => {
                interval = setInterval(() => {
                    index = (index + 1) % imgList.length;
                    img.src = imgList[index];  
                }, 400);
            });

            card.addEventListener("mouseleave", () => {
                clearInterval(interval);
                index = 0;
                img.src = imgList[0];
            });
        });
    }

});
/*************************************************
 *  END DOM READY
 *************************************************/


/*************************************************
 *  GSAP + SCROLLTRIGGER SECTION
 *************************************************/
    // Nonaktifkan GSAP ScrollTrigger di mobile dan tablet portrait
    if (!/Mobi|Android/i.test(navigator.userAgent) && window.innerWidth > 1024) {
    gsap.registerPlugin(ScrollTrigger);

    /* =======================
        PORTFOLIO PEEK IMAGE REVEAL
    ======================= */
    const images = gsap.utils.toArray(".peek-img");

    let tl = gsap.timeline({
        scrollTrigger: {
        trigger: "#portfolioPeek",
        start: "top top",
        end: "+=2000",
        scrub: true,
        pin: true,
        }
    });

    images.forEach((img, i) => {
        tl.to(img, {
        opacity: 1,
        scale: 1,
        ease: "power3.out",
        duration: 0.6
        }, i * 0.5);
    });

    /* =======================
       NUMBER PARALLAX
    ======================= */
    gsap.to("#numberParallax", {
      y: -300,
      ease: "none",
      scrollTrigger: {
        trigger: ".brands-section",
        scrub: 1,
        start: "top bottom",
        end: "bottom top"
      }
    });
}