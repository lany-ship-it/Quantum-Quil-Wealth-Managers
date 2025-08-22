// ========== Mobile Menu Toggle (for #menu-bar on small screens) ==========
const menuBar = document.querySelector('#menu-bar');
const navMenu = document.querySelector('.navbar__menu');

if (menuBar && navMenu) {
  menuBar.addEventListener('click', () => {
    menuBar.classList.toggle('fa-times');
    navMenu.classList.toggle('active');
  });
}

// Close the mobile menu when a non-submenu link is clicked
document.querySelectorAll('.navbar__links').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 960) {
      const li = link.closest('.navbar__item');
      // If this item doesn't have a submenu (or user clicked a submenu item link),
      // then close the main mobile menu so the page can scroll to the anchor.
      if (!li.classList.contains('has-submenu')) {
        navMenu.classList.remove('active');
        menuBar.classList.remove('fa-times');
        // also close any open submenus
        document.querySelectorAll('.navbar__item.open').forEach(o => o.classList.remove('open'));
      }
    }
  });
});


// ========== Search Bar Toggle ==========
const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('.search-bar-container');

if (searchBtn && searchBar) {
  searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
  });
}

// ========== Login Form Toggle ==========
const loginBtn = document.querySelector('#login-btn');
const loginForm = document.querySelector('.login-form-container');
const formClose = document.querySelector('#form-close');

if (loginBtn && loginForm && formClose) {
  loginBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
  });

  formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
  });

  // Optional: Close login popup when clicking outside the form
  window.addEventListener('click', (e) => {
    if (
      loginForm.classList.contains('active') &&
      !loginForm.querySelector('form').contains(e.target) &&
      !loginBtn.contains(e.target)
    ) {
      loginForm.classList.remove('active');
    }
  });
}

// ========== Close All Popups/Icons on Scroll ==========
window.addEventListener('scroll', () => {
  if (searchBtn) searchBtn.classList.remove('fa-times');
  if (searchBar) searchBar.classList.remove('active');
  if (menuBar) menuBar.classList.remove('fa-times');
  if (navMenu) navMenu.classList.remove('active');
  if (loginForm) loginForm.classList.remove('active');
});

// ========== Login Form Validation ==========
const loginFormElement = document.getElementById('login-form');

if (loginFormElement) {
  loginFormElement.addEventListener('submit', function (e) {
    const email = this.email.value.trim();
    const password = this.password.value;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      e.preventDefault();
    }
  });
}

// Home Image Slider with Auto Slide
const imageBtns = document.querySelectorAll('.img-btn');
const homeImage = document.getElementById('image-slider');

let currentIndex = 0;
let imageSources = [];

// Initialize image sources and add click event listeners
if (imageBtns.length && homeImage) {
  imageBtns.forEach((btn, index) => {
    imageSources.push(btn.getAttribute('data-src'));

    btn.addEventListener('click', () => {
      currentIndex = index;
      updateImage();
      resetAutoSlide(); // reset the timer when manually changed
    });
  });

  // Auto-slide every 5 seconds
  let autoSlide = setInterval(nextImage, 5000);

  function nextImage() {
    currentIndex = (currentIndex + 1) % imageSources.length;
    updateImage();
  }

  function updateImage() {
    homeImage.src = imageSources[currentIndex];
    imageBtns.forEach(btn => btn.classList.remove('active'));
    imageBtns[currentIndex].classList.add('active');
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 5000);
  }
}

// ========== Mobile Sub-Menu Toggle ==========
document.querySelectorAll('.navbar__item').forEach(item => {
  const subMenu = item.querySelector('.sub-menu');

  if (subMenu) {
    item.querySelector('.navbar__links').addEventListener('click', e => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        document.querySelectorAll('.navbar__item.open').forEach(openItem => {
          if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open');
      }
    });
  }
});

// About Section Slideshow
const aboutBtns = document.querySelectorAll('.about-btn');
const aboutImage = document.getElementById('about-slider');

let aboutIndex = 0;
let aboutSources = [];

if (aboutBtns.length && aboutImage) {
  aboutBtns.forEach((btn, index) => {
    aboutSources.push(btn.getAttribute('data-src'));

    btn.addEventListener('click', () => {
      aboutIndex = index;
      updateAboutImage();
      resetAboutSlide();
    });
  });

  // Auto-slide every 4s
  let aboutSlide = setInterval(nextAboutImage, 4000);

  function nextAboutImage() {
    aboutIndex = (aboutIndex + 1) % aboutSources.length;
    updateAboutImage();
  }

  function updateAboutImage() {
    aboutImage.src = aboutSources[aboutIndex];
    aboutBtns.forEach(btn => btn.classList.remove('active'));
    aboutBtns[aboutIndex].classList.add('active');
  }

  function resetAboutSlide() {
    clearInterval(aboutSlide);
    aboutSlide = setInterval(nextAboutImage, 4000);
  }

  // Init first image
  updateAboutImage();
}
