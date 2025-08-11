// =================================== //
// SLIDE-IN ANIMATION FOR ABOUT SECTION //
// =================================== //
const aboutSectionFinal = document.querySelector('.about-section-final');

if (aboutSectionFinal) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSectionFinal.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    observer.observe(aboutSectionFinal);
}
document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Menu Logic ---
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
    // --- Lottie Animations ---
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
});
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
// ======================================================== //
// FINAL SCROLL-DRIVEN ZIGZAG LOGIC (CONTENT ONLY)          //
// ======================================================== //
const centerTimelineContainer = document.getElementById('center-timeline-container');

if (centerTimelineContainer) {
    const marker = document.getElementById('timeline-marker');
    const timelineItems = document.querySelectorAll('.timeline-item');
    let revealedCount = 0;
    let isScrolling = false;

    const revealContent = () => {
        if (revealedCount >= timelineItems.length) {
            window.removeEventListener('wheel', handleScroll);
            return;
        }

        // Reveal content for the next two items
        const nextItem1 = timelineItems[revealedCount];
        const nextItem2 = timelineItems[revealedCount + 1];

        if (nextItem1) {
            nextItem1.classList.add('is-visible');
        }
        if (nextItem2) {
            nextItem2.classList.add('is-visible');
        }

        // Move marker to the latest revealed item's position
        const targetItem = nextItem2 || nextItem1;
        if (targetItem) {
            const newTop = targetItem.offsetTop + (targetItem.offsetHeight / 2);
            marker.style.top = `${newTop}px`;
        }
        
        revealedCount += 2;
    };

    const handleScroll = (event) => {
        if (event.deltaY < 0) return; // Only scroll down
        
        if (!isScrolling) {
            isScrolling = true;
            revealContent();
            setTimeout(() => {
                isScrolling = false;
            }, 1000); // 1-second cooldown between scrolls
        }
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            window.addEventListener('wheel', handleScroll);
        } else {
            window.removeEventListener('wheel', handleScroll);
        }
    }, { threshold: 0.1 });

    // --- Initial Setup ---
    // Reveal the first item's CONTENT by default
    if (timelineItems[0]) {
        timelineItems[0].classList.add('is-visible');
        revealedCount = 1;

        // Position marker at the first item
        const firstItemTop = timelineItems[0].offsetTop + (timelineItems[0].offsetHeight / 2);
        marker.style.top = `${firstItemTop}px`;
    }

    // Start observing the container
    observer.observe(centerTimelineContainer);
}
// ======================================================== //
// FINAL PORTFOLIO (3D COVER FLOW GALLERY)                  //
// ======================================================== //
const portfolioSectionCoverflow = document.querySelector('.portfolio-section');
if (portfolioSectionCoverflow) {
    const portfolioItems = document.querySelectorAll('.portfolio-item-stacked');
    const popup = document.querySelector('.coverflow-popup-overlay');
    const carouselContainer = document.querySelector('.coverflow-carousel');
    const popupTitle = document.getElementById('popup-title');
    const popupCategory = document.getElementById('popup-category');
    const closeBtn = document.querySelector('.popup-close-btn');
    const nextBtn = document.querySelector('.popup-nav-btn.next');
    const prevBtn = document.querySelector('.popup-nav-btn.prev');

    let projectData = [];
    let currentImageIndex = 0;
    let slides = [];

    // 1. Collect data from all portfolio items
    portfolioItems.forEach(item => {
        projectData.push({
            title: item.querySelector('.project-info h3').textContent,
            category: item.querySelector('.project-info p').textContent,
            images: Array.from(item.querySelectorAll('.stack-card img')).map(img => img.src).reverse()
        });
    });

    const updateCarousel = () => {
        slides.forEach((slide, i) => {
            slide.className = 'carousel-slide'; // Reset classes
            if (i === currentImageIndex) {
                slide.classList.add('center');
            } else if (i === currentImageIndex - 1) {
                slide.classList.add('left');
            } else if (i === currentImageIndex + 1) {
                slide.classList.add('right');
            } else if (i < currentImageIndex) {
                slide.classList.add('hide-left');
            } else {
                slide.classList.add('hide-right');
            }
        });
    };
    
    const openPopup = (projectIndex) => {
        const project = projectData[projectIndex];
        currentImageIndex = 0;

        popupTitle.textContent = project.title;
        popupCategory.textContent = project.category;
        
        carouselContainer.innerHTML = '';
        slides = project.images.map(src => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const img = document.createElement('img');
            img.src = src;
            slide.appendChild(img);
            carouselContainer.appendChild(slide);
            return slide;
        });

        updateCarousel();
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showNext = () => {
        if (currentImageIndex < slides.length - 1) {
            currentImageIndex++;
            updateCarousel();
        }
    };

    const showPrev = () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateCarousel();
        }
    };

    // Event Listeners
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => openPopup(index));
    });

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
}
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