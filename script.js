// Solusi scroll paling kuat: paksa ke atas setelah halaman selesai dimuat
window.addEventListener("load", () => {
  // Memberi jeda 1 milidetik untuk memastikan semua skrip lain selesai
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 1);
});

document.addEventListener("DOMContentLoaded", function () {
  // --- Logika Animasi Mengetik Bolak-Balik ---
  const typingTitle = document.getElementById("typing-title");
  const textToType = "Dewa Satria";
  let charIndex = 0;
  let isDeleting = false;

  function typeAnimation() {
    const currentText = textToType;

    if (isDeleting) {
      typingTitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 200;
    if (isDeleting) {
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      typeSpeed = 500;
      isDeleting = false;
    }
    setTimeout(typeAnimation, typeSpeed);
  }

  if (typingTitle) {
    typeAnimation();
  }

  // --- Logika untuk Dark Mode / Theme Switcher ---
  const themeSwitcher = document.getElementById("theme-switcher");
  const themeIcon = themeSwitcher.querySelector("i");
  const body = document.body;

  const setTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  }

  themeSwitcher.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme === "light" ? "dark" : "light");
  });

  // --- Logika untuk Filter Portofolio ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.tagName === "A") {
        return;
      }
      e.preventDefault();
      filterButtons.forEach((btn) => {
        if (btn.hasAttribute("data-filter")) {
          btn.classList.remove("active");
        }
      });
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        item.style.display = "none";
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        }
      });
    });
  });

  // --- Logika untuk Hamburger Menu (Mobile) ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
});
