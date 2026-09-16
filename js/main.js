/**
 * AF HVAC & Electrical - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('mainNav');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    // Mobile dropdown accordion toggles
    document.querySelectorAll('.nav-item.has-dropdown > .nav-item-link').forEach(dropdownLink => {
      dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          const parentItem = dropdownLink.parentElement;
          parentItem.classList.toggle('mobile-open');
        }
      });
    });
  }

  // Sticky Header Elevation on Scroll
  const header = document.getElementById('siteNavBar');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 120) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    });
  }

  // FAQ Accordion Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other FAQ items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Testimonials Carousel Slider Logic (3-Card Layout)
  const proofTrack = document.getElementById('proofCardsTrack');
  const proofSlides = document.querySelectorAll('.proof-cards-slide');
  const prevProofBtn = document.getElementById('prevProofBtn');
  const nextProofBtn = document.getElementById('nextProofBtn');
  const proofDots = document.querySelectorAll('.p-dot');

  if (proofTrack && proofSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = proofSlides.length;

    function getVisibleCards() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1100) return 2;
      return 3;
    }

    function goToSlide(index) {
      const visibleCount = getVisibleCards();
      const maxIndex = Math.max(0, totalSlides - visibleCount);

      if (index < 0) {
        currentSlide = maxIndex;
      } else if (index > maxIndex) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      const card = proofSlides[0];
      const cardRect = card.getBoundingClientRect();
      let gap = 20;
      if (proofSlides.length > 1) {
        const nextRect = proofSlides[1].getBoundingClientRect();
        const calcGap = nextRect.left - cardRect.right;
        if (calcGap > 0) gap = calcGap;
      }

      const moveAmount = currentSlide * (cardRect.width + gap);
      proofTrack.style.transform = `translateX(-${moveAmount}px)`;

      // Update active dot
      proofDots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    window.addEventListener('resize', () => {
      goToSlide(currentSlide);
    });

    if (nextProofBtn) {
      nextProofBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }

    if (prevProofBtn) {
      prevProofBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }

    proofDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    proofTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    proofTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 40;
      if (touchEndX < touchStartX - swipeThreshold) {
        goToSlide(currentSlide + 1);
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Smooth Link Scroll & Prevent Dead Placeholders
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
