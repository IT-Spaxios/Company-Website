// ==============================================
 // This script makes animations trigger every time they scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // This line makes the animation happen again
                entry.target.classList.remove('is-visible');
            }
        });
    });

document.addEventListener('DOMContentLoaded', function() {
            const header = document.querySelector('.header');
            const hamburgerOpen = document.getElementById('hamburger-open');
            const hamburgerClose = document.getElementById('hamburger-close');
            const mobileMenu = document.getElementById('mobile-menu');

            // Sticky header scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });

            // Mobile menu toggle
            hamburgerOpen.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.classList.add('no-scroll');
            });

            hamburgerClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
            
            // Close menu if clicking outside of it
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });






    // Tell the observer which elements to watch
    const animatedElements = document.querySelectorAll('.hero-section'); // Add other section classes here if they also need animation, e.g., ('.hero-section, .about-zigzag-section')
    animatedElements.forEach((el) => observer.observe(el));
    // ===========================================
    /**
 * Loads a Lottie animation into a specified container.
 * @param {string} containerId The ID of the HTML element to host the animation.
 * @param {string} path The URL path to the Lottie JSON file.
 */
const loadLottieAnimation = (containerId, path) => {
    const container = document.getElementById(containerId);
    if (container) {
        const player = document.createElement('lottie-player');
        player.setAttribute('src', path);
        player.setAttribute('background', 'transparent');
        player.setAttribute('speed', '1');
        player.setAttribute('loop', '');
        player.setAttribute('autoplay', '');
        container.appendChild(player);
    } else {
        console.error(`Container with ID "${containerId}" not found.`);
    }
};

// Load all animations once the document's main content has been parsed.
document.addEventListener('DOMContentLoaded', () => {
    loadLottieAnimation('website-build-vector', 'https://lottie.host/e35990a8-b570-4732-8493-5133f9381869/ABNBxYp2I1.json');
    loadLottieAnimation('html-vector', 'https://lottie.host/287d3a40-2782-48f8-952a-ab03b6d39f75/5U3G3x22m7.json');
    loadLottieAnimation('css-vector', 'https://lottie.host/7b8f8f23-dfa3-44f9-8687-3b5a10367332/kABHlGfA1s.json');
    loadLottieAnimation('js-vector', 'https://lottie.host/87061f5c-d389-4b69-8f0a-36402773f91d/l2n4L2Xxxh.json');
});
// ======================================================== //
// RE-TRIGGERING SLIDE-IN ANIMATION FOR HERO SECTION        //
// ======================================================== //
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the class when the section is visible
                    heroSection.classList.add('is-visible');
                } else {
                    // REMOVE the class when the section is not visible
                    // This allows the animation to play again
                    heroSection.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the section is visible
        });

        observer.observe(heroSection);
    }
});
// ======================================================== //
// HERO HEADLINE TEXT ANIMATION LOGIC (FASTER & SYNCED)    //
// ======================================================== //
document.addEventListener('DOMContentLoaded', function () {
    const headline = document.getElementById('animated-headline');
    const subHeadline = document.querySelector('.sub-headline');

    if (headline && subHeadline) {
        // Wrap letters in spans for animation
        const wrapLetters = (element) => {
            const text = element.textContent.trim();
            element.innerHTML = '';
            for (let i = 0; i < text.length; i++) {
                const letter = text[i];
                const span = document.createElement('span');
                span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
                element.appendChild(span);
            }
        };

        // Animate letters with custom speed
        const animateLetters = (element, speed, delay = 0) => {
            const letters = element.querySelectorAll('span');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('visible');
                }, delay + (index * speed));
            });
        };

        // Process main headline (h1)
        const mainTextNodes = Array.from(headline.childNodes).filter(node => node.nodeType === 3);
        mainTextNodes.forEach(node => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'inline';
            const text = node.textContent.trim();
            for (let i = 0; i < text.length; i++) {
                const letter = text[i];
                const span = document.createElement('span');
                span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
                wrapper.appendChild(span);
            }
            node.parentNode.replaceChild(wrapper, node);
        });

        // Process sub-headline
        wrapLetters(subHeadline.querySelector('b'));

        // Animation settings
        const MAIN_SPEED = 20; // Speed for h1 (ms per letter)
        const SUB_SPEED = 1;  // 2x faster than h1 (adjust as needed)
        const START_DELAY = 100; // Short delay before sub-headline starts

        // Animate main headline
        animateLetters(headline, MAIN_SPEED); 
        
        // Animate sub-headline FASTER and immediately after h1 starts
        animateLetters(subHeadline, SUB_SPEED, START_DELAY);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    
    // --- Mobile Menu Logic (Your existing code, unchanged) ---
    const body = document.body;
    const openBtn = document.getElementById('hamburger-open');
    const closeBtn = document.getElementById('hamburger-close');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = (show) => {
        if (mobileMenu) mobileMenu.classList.toggle('active', show);
        if (body) body.classList.toggle('no-scroll', show);
    };

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(true);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(false);
        });
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                toggleMenu(false);
            }
        });
    }

    // --- Lottie Animations (Your existing code, unchanged) ---
    const heroAnimations = [
        { id: 'desktop-screen', path: 'https://assets1.lottiefiles.com/packages/lf20_5tkzkblw.json' },
        { id: 'css-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_2cwifzvd.json' }
    ];

    const aboutAnimations = [
        { id: 'website-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_ikvz7qhc.json' },
        { id: 'responsive-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_ismypfdn.json' },
        { id: 'seo-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_vybwn7df.json' },
        { id: 'coding-vector', path: 'https://assets5.lottiefiles.com/packages/lf20_sk5h1kfn.json' },
        { id: 'server-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_qp1q3mcb.json' }
    ];

    const loadAnimations = (animations) => {
        animations.forEach(anim => {
            const el = document.getElementById(anim.id);
            if (el) {
                lottie.loadAnimation({
                    container: el,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: anim.path
                });
            }
        });
    };

    loadAnimations(heroAnimations);
    loadAnimations(aboutAnimations);


    // ======================================================== //
    // RE-TRIGGERING SLIDE-IN ANIMATION FOR ABOUT SECTION       //
    // ======================================================== //
    const aboutSection = document.querySelector('.about-section');

    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('is-visible');
                } else {
                    aboutSection.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the section is visible
        });

        observer.observe(aboutSection);
    }

    // --- Add any other JavaScript for other sections here ---

});
    // --- Dropdown Toggle Logic ---
    const menuItems = document.querySelectorAll('.mobile-nav-links .dropdown, .mobile-nav-links .submenu-trigger');
    menuItems.forEach(item => {
        const link = item.querySelector(':scope > a');
        if (link) {
            link.addEventListener('click', function (e) {
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

   // ======================================================== //
// RE-TRIGGERING SLIDE-IN ANIMATION FOR SERVICE GRID        //
// ======================================================== //
const serviceGrid = document.querySelector('.service-grid');

if (serviceGrid) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class when the section is visible
                serviceGrid.classList.add('is-visible');
            } else {
                // REMOVE the class when the section is not visible
                serviceGrid.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    observer.observe(serviceGrid);
}

  // Counter Animation with Reset Functionality
// --- Distraction Stats Counter Logic (Runs every time it's visible) ---
    const distractionSection = document.querySelector('.distraction-stats-section');

    if (distractionSection) {
        const distractionCounters = distractionSection.querySelectorAll('.distraction-counter');

        const startDistractionCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            counter.innerText = '0'; // Reset to 0
            
            const duration = 2000; // Animation duration
            const startTime = performance.now();
            
            const update = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentCount = Math.floor(progress * target);
                
                counter.innerText = currentCount.toLocaleString(); // Adds commas to large numbers
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            requestAnimationFrame(update);
        };

        const distractionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When visible, start animation
                    distractionCounters.forEach(startDistractionCounter);
                } else {
                    // When not visible, reset to 0
                    distractionCounters.forEach(counter => {
                        counter.innerText = '0';
                    });
                }
            });
        }, {
            threshold: 0.8 // Trigger when 80% of the element is in view
        });

        distractionObserver.observe(distractionSection);
    }
    
// --- Technologies Section Logic (Filtering and Sticky Nav) ---
    const techSection = document.querySelector('.tech-section');
    if (techSection) {
        const filterNav = document.getElementById('tech-filters');
        const filterButtons = filterNav.querySelectorAll('li');
        const techItems = document.querySelectorAll('.tech-item');
        const navOffsetTop = filterNav.offsetTop;

        // Filtering Logic
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Set active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Show/hide tech items
                techItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category.includes(filter)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });

       
    }
   // --- 3D Chatbox Logic ---
    const chatboxContainer = document.getElementById('chatbox-container');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatCloseButton = document.getElementById('chatbox-close-btn');

    if (chatToggleButton && chatboxContainer && chatCloseButton) {
        // Open chatbox on button click
        chatToggleButton.addEventListener('click', () => {
            chatboxContainer.classList.add('active');
        });

        // Close chatbox
        chatCloseButton.addEventListener('click', () => {
            chatboxContainer.classList.remove('active');
        });

        // --- NEW: Automatically open chatbox after 20 seconds ---
        setTimeout(() => {
            chatboxContainer.classList.add('active');
        }, 20000); // 20000 milliseconds = 20 seconds
    }
    
    // ======================================================== //
// FINAL WORKFLOW SECTION (AUTO-SLIDE ANIMATION)            //
// ======================================================== //
const workflowSection = document.querySelector('.final-workflow-section');

if (workflowSection) {
    const timelineItems = workflowSection.querySelectorAll('.timeline-item');
    const marker = workflowSection.querySelector('#timeline-marker');
    let animationInterval;

    const runAnimation = () => {
        // Hide all content first
        timelineItems.forEach(item => item.classList.remove('is-visible'));

        // Animate in pairs
        let delay = 0;
        for (let i = 0; i < timelineItems.length; i += 2) {
            const item1 = timelineItems[i];
            const item2 = timelineItems[i + 1];

            setTimeout(() => {
                if (item1) item1.classList.add('is-visible');
                if (item2) item2.classList.add('is-visible');

                // Move marker to the last item in the pair
                const targetItem = item2 || item1;
                if (targetItem && marker) {
                    const newTop = targetItem.offsetTop + (targetItem.offsetHeight / 2);
                    marker.style.top = `${newTop}px`;
                }
            }, delay);
            
            delay += 1200; // Time between revealing each pair
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's already running, clear the old timer
                clearInterval(animationInterval);
                // Start the animation
                runAnimation();
                // Set an interval to re-run the animation every 8 seconds
                animationInterval = setInterval(runAnimation, 8000);
            } else {
                // Stop the animation when not visible
                clearInterval(animationInterval);
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(workflowSection);
}
// ======================================================== //
// FINAL PORTFOLIO (3D COVER FLOW GALLERY) - Corrected      //
// ======================================================== //
document.addEventListener('DOMContentLoaded', function () {
    const portfolioSection = document.querySelector('.portfolio-section');
    
    // Run script only if the portfolio section exists on the page
    if (!portfolioSection) {
        return;
    }

    const portfolioItems = document.querySelectorAll('.portfolio-item-stacked');
    const popupOverlay = document.querySelector('.coverflow-popup-overlay');
    const carousel = document.querySelector('.coverflow-carousel');
    const popupTitle = document.getElementById('popup-title');
    const popupCategory = document.getElementById('popup-category');
    const closeBtn = document.querySelector('.popup-close-btn');
    const prevBtn = document.querySelector('.popup-nav-btn.prev');
    const nextBtn = document.querySelector('.popup-nav-btn.next');

    let slides = [];
    let currentIndex = 0;

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageCards = item.querySelectorAll('.stack-card');
            createCarousel(imageCards);
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function createCarousel(imageCards) {
        carousel.innerHTML = '';
        slides = [];
        
        // Reverse the order to match the visual stack (middle card is most prominent)
        const reversedCards = Array.from(imageCards).reverse();

        reversedCards.forEach(card => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            slide.innerHTML = `<img src="${card.querySelector('img').src}" alt="${card.querySelector('img').alt}">`;
            
            // Store data from the card for the popup info
            slide.dataset.title = card.dataset.title;
            slide.dataset.category = card.dataset.category;

            carousel.appendChild(slide);
            slides.push(slide);
        });
        
        // The middle card of the stack is visually on top, which is now the first in our array
        currentIndex = 0;
        updateCarousel();
    }

    function updateCarousel() {
        if (slides.length === 0) return;

        slides.forEach((slide, index) => {
            slide.classList.remove('center', 'left', 'right', 'hide-left', 'hide-right');
            
            if (index === currentIndex) {
                slide.classList.add('center');
                popupTitle.textContent = slide.dataset.title;
                popupCategory.textContent = slide.dataset.category;
            } else if (index === currentIndex - 1) {
                slide.classList.add('left');
            } else if (index === currentIndex + 1) {
                slide.classList.add('right');
            } else if (index < currentIndex) {
                slide.classList.add('hide-left');
            } else {
                slide.classList.add('hide-right');
            }
        });
    }

    function showNext() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Event Listeners for popup controls
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        if (touchEndX < touchStartX - swipeThreshold) { // Swiped left
            showNext();
        }
        if (touchEndX > touchStartX + swipeThreshold) { // Swiped right
            showPrev();
        }
    }
});

// =================================== //
// SLIDE-IN ANIMATION FOR SHOWCASE SECTION //
// =================================== //
const showcaseSection = document.querySelector('.responsive-showcase-section');

if (showcaseSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class when the section is visible
                showcaseSection.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    observer.observe(showcaseSection);
}
// =================================== //
// FAQ ACCORDION LOGIC                 //
// =================================== //
const accordionItems = document.querySelectorAll('.accordion-item');

if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // First, close all other items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
            });

            // If the clicked item was not active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}
// =================================== //
// HIDE TOP BAR ON SCROLL LOGIC        //
// =================================== //
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // When scrolled more than 50px
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
});
// ======================================================== //
// FINAL 3D CARD ANIMATED FAQ LOGIC                         //
// ======================================================== //
const faqItemsFinal = document.querySelectorAll('.faq-section-final .faq-item');

if (faqItemsFinal.length > 0) {
    faqItemsFinal.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items first
            faqItemsFinal.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                otherItem.querySelector('.faq-answer').style.paddingTop = '0px';
            });

            // If the clicked item was not already active, open it
            if (!isActive) {
                item.classList.add('active');
                answerDiv.style.paddingTop = '20px';
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
            }
        });
    });
}
// ======================================================== //
// RE-TRIGGERING SLIDE-IN ANIMATION FOR ZIGZAG SECTION      //
// ======================================================== //
const aboutZigzagSection = document.querySelector('.about-zigzag-section');

if (aboutZigzagSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutZigzagSection.classList.add('is-visible');
            } else {
                aboutZigzagSection.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(aboutZigzagSection);
}
