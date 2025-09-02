document.addEventListener('DOMContentLoaded', function() {
    // இந்த Observer, ஒருமுறை மட்டும் ஸ்க்ரோல் செய்யும்போது இயங்கும் அனிமேஷன்களைக் கையாளும்.
    const observerOnce = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'is-visible', 'in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    // இந்த Observer, ஸ்க்ரோல் செய்யும்போது அனிமேஷன்கள் மீண்டும் மீண்டும் நிகழ உதவும்.
    const observerRepeat = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'is-visible', 'in-view');
            } else {
                entry.target.classList.remove('visible', 'is-visible', 'in-view');
            }
        });
    }, { threshold: 0.1 });
    // ஒருமுறை மட்டும் இயங்க வேண்டிய உறுப்புகள்:
    const onceAnimated = document.querySelectorAll('.about-section, .zigzag-row, .section-service-headline, .tech-heading-container, .showcase-heading, .showcase-paragraph, .portfolio-section .section-headline, .faq-section-final, .section-workflow-headline');
    onceAnimated.forEach(el => observerOnce.observe(el));
    // மீண்டும் மீண்டும் இயங்க வேண்டிய உறுப்புகள்:
    const repeatAnimated = document.querySelectorAll('.slide-left, .service-grid, .promo-card, .identify-left-content, .split-stats-section');
    repeatAnimated.forEach(el => observerRepeat.observe(el));
    // ===================================================================
    // 2. ஹெட்டர் மற்றும் மொபைல் மெனு (HEADER & MOBILE MENU)
    // ===================================================================
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');
    const hamburgerOpen = document.getElementById('hamburger-open');
    const hamburgerClose = document.getElementById('hamburger-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
// ========================================== hideheader=====

// ==================

    const toggleMenu = (show) => {
        if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active', show);
        if (body) body.classList.toggle('no-scroll', show);
    };
    if (hamburgerOpen) {hamburgerOpen.addEventListener('click', () => toggleMenu(true));}
    if (hamburgerClose) { hamburgerClose.addEventListener('click', () => toggleMenu(false)); }
    if (mobileMenuOverlay) {mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {toggleMenu(false);}});}
    // ===================================================================
    // 3. LOTTIE அனிமேஷன்கள் (LOTTIE ANIMATIONS)
    // ===================================================================
    const lottieAnimations = [
        { id: 'website-build-vector', path: 'https://lottie.host/8807d9f9-5777-4a0b-9366-f51952e96eb0/8vH98yQv61.json' },
        { id: 'website-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_ikvz7qhc.json' }
        // தேவைப்பட்டால் மற்ற Lottie அனிமேஷன்களையும் இங்கே சேர்க்கவும்
    ];
    lottieAnimations.forEach(anim => {
        const container = document.getElementById(anim.id);
        if (container && typeof lottie !== 'undefined') {
            lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: anim.path
            });
        }
    });
    // ===================================================================
    // 4. கவுண்டர் செக்‌ஷன் (COUNTER SECTION)
    // ===================================================================
    const counters = document.querySelectorAll('.distraction-counter');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        counter.dataset.isAnimating = 'true';
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / 200; // வேகம்
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
                counter.dataset.isAnimating = 'false';
            }
        };
        updateCount();
    };
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // ஒருமுறை மட்டுமே இயங்கும்
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
    // ===================================================================
    // (TECHNOLOGIES FILTER)
    // ===================================================================
    const filterButtons = document.querySelectorAll('.tech-filter-nav li');
    const techItems = document.querySelectorAll('.tech-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            document.querySelector('.tech-filter-nav li.active').classList.remove('active');
            this.classList.add('active');
            techItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
    // FAQ Accordion
    const faqItemsFinal = document.querySelectorAll('.faq-section-final .faq-item');
    if (faqItemsFinal.length > 0) {
        faqItemsFinal.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            const answerDiv = item.querySelector('.faq-answer');
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItemsFinal.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                });
                if (!isActive) {
                    item.classList.add('active');
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
                }
            });
        });
    }
    // Chatbox
    const chatboxContainer = document.getElementById('chatbox-container');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatCloseButton = document.getElementById('chatbox-close-btn');
    if (chatToggleButton && chatboxContainer && chatCloseButton) {
        chatToggleButton.addEventListener('click', () => chatboxContainer.classList.add('active'));
        chatCloseButton.addEventListener('click', () => chatboxContainer.classList.remove('active'));
    }});
document.addEventListener('DOMContentLoaded', function () {
    // ======================================================== //
    // SCRIPT TO FIX PORTFOLIO SECTION LAG/STUTTER              //
    // ======================================================== //
    const portfolioItemsForAnimation = document.querySelectorAll(".portfolio-item-stacked");

    if (portfolioItemsForAnimation.length > 0) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const itemIndex = Array.from(portfolioItemsForAnimation).indexOf(entry.target);
                        // Add a staggered delay to each item for a smooth loading effect
                        entry.target.style.transitionDelay = `${itemIndex * 100}ms`;
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target); // Stop watching this item once it's visible
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the item is visible
            }
        );

        portfolioItemsForAnimation.forEach((item) => {
            observer.observe(item);
        });
    }
    // ======================================================== //
    // ISOLATED SCRIPT FOR PORTFOLIO POPUP                      //
    // ======================================================== //
    const portfolioItemsForPopup = document.querySelectorAll('.portfolio-item-stacked');
    const popupOverlay = document.querySelector('.coverflow-popup-overlay');
    const carousel = document.querySelector('.coverflow-carousel');
    const popupTitle = document.getElementById('popup-title');
    const popupCategory = document.getElementById('popup-category');
    const closeBtn = document.querySelector('.popup-close-btn');
    const prevBtn = document.querySelector('.popup-nav-btn.prev');
    const nextBtn = document.querySelector('.popup-nav-btn.next');

    if (!portfolioItemsForPopup.length || !popupOverlay || !carousel) {
        return; // Exit if popup elements aren't found
    }

    let slides = [];
    let currentIndex = 0;
    let scrollPosition = 0;

    portfolioItemsForPopup.forEach(item => {
        item.addEventListener('click', () => {
            const imageCards = item.querySelectorAll('.stack-card');
            if (imageCards.length === 0) return;

            createCarousel(imageCards);

            scrollPosition = window.pageYOffset;
            document.body.style.top = `-${scrollPosition}px`;
            document.body.classList.add('popup-active');

            popupOverlay.classList.add('active');
        });
    });
    function createCarousel(imageCards) {
        carousel.innerHTML = '';
        slides = [];
        const reversedCards = Array.from(imageCards).reverse();
        reversedCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                // We will get the title and category from the main portfolio item's info, not the card
                const projectInfo = card.closest('.portfolio-item-stacked').querySelector('.project-info');
                const title = projectInfo ? projectInfo.querySelector('h3').textContent : 'Project Image';
                const category = projectInfo ? projectInfo.querySelector('p').textContent : 'Website';

                slide.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
                slide.dataset.title = title;
                slide.dataset.category = category;
                
                carousel.appendChild(slide);
                slides.push(slide);
            }
        });
        currentIndex = 0;
        updateCarousel();
    }
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('center', 'left', 'right', 'hide-left', 'hide-right');
            if (index === currentIndex) {
                slide.classList.add('center');
                if (popupTitle) popupTitle.textContent = slide.dataset.title;
                if (popupCategory) popupCategory.textContent = slide.dataset.category;
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('left');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('right');
            } else {
                // This logic ensures items far away are hidden correctly
                if (index < currentIndex) {
                    slide.classList.add('hide-left');
                } else {
                    slide.classList.add('hide-right');
                }
            }
        });
    }
    function showNext() { if (slides.length > 0) { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); } }
    function showPrev() { if (slides.length > 0) { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); } }
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.classList.remove('popup-active');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) { showNext(); }
        if (touchEndX - touchStartX > 50) { showPrev(); }
    }, { passive: true });
});
// =============================================== //
//  SCRIPT FOR PROMO CARD 3D MOUSE PARALLAX EFFECT //
// =============================================== //
document.addEventListener("DOMContentLoaded", function () {
    const promoCard = document.querySelector(".promo-card");
    const imageToAnimate = document.querySelector(".popup-img");
    // Only run this script if the necessary elements exist
    if (promoCard && imageToAnimate) {
        const handleMouseMove = (e) => {
            // Check if the screen is wide enough (not a mobile device)
            if (window.innerWidth <= 900) {
                // On mobile, ensure transform is reset and do nothing else
                imageToAnimate.style.transform = 'none';
                return;
            }
            const rect = promoCard.getBoundingClientRect();
            // Get mouse position relative to the card's center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Define the intensity of the effect
            const intensity = 15;
            // Calculate rotation and translation values
            const rotateY = (x / (rect.width / 2)) * intensity;
            const rotateX = -(y / (rect.height / 2)) * intensity;
            const translateX = (x / (rect.width / 2)) * (intensity * 1.5);
            const translateY = (y / (rect.height / 2)) * (intensity * 1.5);
            // Apply the 3D transform to the image
            // Note: The base subtle-float animation still runs, and this JS transform is applied on top of it.
            imageToAnimate.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;};
        const handleMouseLeave = () => {
             if (window.innerWidth > 900) {
                // Smoothly reset the image to its default state
                imageToAnimate.style.transform = 'translate(0,0) rotateX(0deg) rotateY(0deg)';}};
        promoCard.addEventListener("mousemove", handleMouseMove);
        promoCard.addEventListener("mouseleave", handleMouseLeave);}});