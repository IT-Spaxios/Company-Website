document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // 1.(ANIMATION OBSERVERS)
    // ===================================================================hero animated fonts
    

    // இந்த Observer, ஒருமுறை மட்டும் ஸ்க்ரோல் செய்யும்போது இயங்கும் அனிமேஷன்களைக் கையாளும்.
    const observerOnce = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'is-visible', 'in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

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
    const onceAnimated = document.querySelectorAll('.about-section, .zigzag-row, .section-service-headline, .tech-heading-container, .showcase-heading, .showcase-paragraph, .portfolio-section .section-headline, .faq-section-final, .section-workflow-headline, .portfolio-item-stacked');
    onceAnimated.forEach(el => observerOnce.observe(el));

    // மீண்டும் மீண்டும் இயங்க வேண்டிய உறுப்புகள்:
    const repeatAnimated = document.querySelectorAll('.slide-left, .service-grid, .promo-card, .identify-left-content, .split-stats-section');
    repeatAnimated.forEach(el => observerRepeat.observe(el));

/* --- EXAMPLE FIX --- */
const myElements = document.querySelectorAll('.box');

// 1. First, READ the single value you need and store it in a variable.
let containerWidth = document.querySelector('.container').offsetWidth;

// 2. Then, loop and perform all the WRITES.
for (let i = 0; i < myElements.length; i++) {
  myElements[i].style.opacity = '1';
  myElements[i].style.width = (containerWidth / 2) + 'px';
}
    // ===================================================================
    // 2.(HEADER & MOBILE MENU)
    // ===================================================================
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');
    const hamburgerOpen = document.getElementById('hamburger-open');
    const hamburgerClose = document.getElementById('hamburger-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (topBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                topBar.classList.add('top-bar--hidden');
            } else {
                topBar.classList.remove('top-bar--hidden');
            }
        });
    }

    const toggleMenu = (show) => {
        if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active', show);
        if (body) body.classList.toggle('no-scroll', show);
    };

    if (hamburgerOpen) {
        hamburgerOpen.addEventListener('click', () => toggleMenu(true));
    }
    if (hamburgerClose) {
        hamburgerClose.addEventListener('click', () => toggleMenu(false));
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                toggleMenu(false);
            }
        });
    }


    // ===================================================================
// 3.(LOTTIE ANIMATIONS - LAZY LOADED FOR PERFORMANCE)
// ===================================================================
let lottieScriptLoaded = false;

const lottieAnimations = [
    { id: 'website-build-vector', path: 'https://lottie.host/8807d9f9-5777-4a0b-9366-f51952e96eb0/8vH98yQv61.json' },
    { id: 'website-vector', path: 'https://assets1.lottiefiles.com/packages/lf20_ikvz7qhc.json' }
];

const loadLottieScript = (callback) => {
    if (lottieScriptLoaded) {
        callback();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js';
    script.onload = () => {
        lottieScriptLoaded = true;
        callback();
    };
    document.body.appendChild(script);
};

const lottieObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            const animData = lottieAnimations.find(anim => anim.id === container.id);
            if (animData) {
                loadLottieScript(() => {
                    lottie.loadAnimation({
                        container: container,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: animData.path
                    });
                });
                observer.unobserve(container); // Load each animation only once
            }
        }
    });
}, { rootMargin: '100px' }); // Start loading when it's 100px away from the screen

// Observe all Lottie containers
lottieAnimations.forEach(anim => {
    const el = document.getElementById(anim.id);
    if (el) {
        lottieObserver.observe(el);
    }
});
    
// ===================================================================
// COUNTER SECTION (UPDATED FOR DESKTOP REPEAT)
// ===================================================================
const counters = document.querySelectorAll('.distraction-counter');

// The function that makes the numbers count up
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    counter.dataset.isAnimating = 'true'; // Prevents multiple animations at once
    
    const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / 200; // Speed of the count
        
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

// The Intersection Observer that checks if the counters are on screen
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const counter = entry.target;

        // --- LOGIC FOR DESKTOP (repeats animation) ---
        if (window.innerWidth > 768) {
            if (entry.isIntersecting && counter.dataset.isAnimating !== 'true') {
                // If it's on screen and not already running, start it.
                animateCounter(counter);
            } else if (!entry.isIntersecting) {
                // If it's off-screen, reset it for the next time.
                counter.innerText = '0';
                counter.dataset.isAnimating = 'false';
            }
        } 
        // --- LOGIC FOR MOBILE (runs only once) ---
        else {
            if (entry.isIntersecting) {
                animateCounter(counter);
                observer.unobserve(counter); // This makes it run only one time on mobile
            }
        }
    });
}, {
    threshold: 0.1 // Start when 50% of the element is visible
});

// Attach the observer to all counters
counters.forEach(counter => counterObserver.observe(counter));
    // ===================================================================
    // 5.(TECHNOLOGIES FILTER)
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


    // ===================================================================
    // 6. (PORTFOLIO POPUP)
    // ===================================================================
    const portfolioItems = document.querySelectorAll('.portfolio-item-stacked');
    const popupOverlay = document.querySelector('.coverflow-popup-overlay');
    const carousel = document.querySelector('.coverflow-carousel');
    const popupTitle = document.getElementById('popup-title');
    const popupCategory = document.getElementById('popup-category');
    const closeBtn = document.querySelector('.popup-close-btn');
    const prevBtn = document.querySelector('.popup-nav-btn.prev');
    const nextBtn = document.querySelector('.popup-nav-btn.next');

    if (portfolioItems.length > 0 && popupOverlay && carousel) {
        let slides = [];
        let currentIndex = 0;
        let scrollPosition = 0;

        portfolioItems.forEach(item => {
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
                } else if (index < currentIndex) {
                    slide.classList.add('hide-left');
                } else {
                     slide.classList.add('hide-right');
                }
            });
        }
        
        function showNext() { if(slides.length > 0) { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); } }
        function showPrev() { if(slides.length > 0) { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); } }

        function closePopup() {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-active');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }

        if (nextBtn) nextBtn.addEventListener('click', showNext);
        if (prevBtn) prevBtn.addEventListener('click', showPrev);
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        popupOverlay.addEventListener('click', (e) => { if (e.target === popupOverlay) { closePopup(); }});

        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) { showNext(); }
            if (touchEndX - touchStartX > 50) { showPrev(); }
        }, { passive: true });
    }

    // ===================================================================
    // 7. மற்ற செயல்பாடுகள் (OTHER FUNCTIONALITY)
    // ===================================================================
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

    // ===================================================================
    // 8. (CHATBOX)
    // ===================================================================
    const chatFab = document.getElementById('chat-fab');
    const chatboxContainer = document.getElementById('chatbox-container');
    const chatboxCloseBtn = document.getElementById('chatbox-close-btn');
    const messagesContainer = document.getElementById('chatbox-messages');
    const chatInputContainer = document.querySelector('.chatbox-input');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const firstOptions = document.getElementById('first-options');
    const devOptions = document.getElementById('dev-options');
    const dmOptions = document.getElementById('dm-options');
    const formWrap = document.getElementById('form-wrap');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    let autoOpenTimer;
    let hasChatBeenOpened = false;

    const scrollToBottom = () => { if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight; };
    
    const addMessage = (text, sender) => {
        if (!messagesContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    };

    const showOptions = (element) => { if(element) element.classList.remove('hidden'); };

    const hideAllOptions = () => {
        if (firstOptions) firstOptions.classList.add('hidden');
        if (devOptions) devOptions.classList.add('hidden');
        if (dmOptions) dmOptions.classList.add('hidden');
        if (formWrap) formWrap.classList.add('hidden');
    };
    
    const openChatbox = () => {
        if (hasChatBeenOpened && chatboxContainer.classList.contains('active')) return;
        hasChatBeenOpened = true;
        clearTimeout(autoOpenTimer);
        
        chatboxContainer.classList.add('active');
        chatFab.classList.add('hidden');
        messagesContainer.innerHTML = '';
        hideAllOptions();
        chatInputContainer.style.display = 'flex';
        chatboxContainer.classList.remove('form-active');
        addMessage("Hello! Welcome to Spaxios Innovation. How can I assist you today?", 'bot');
        setTimeout(() => showOptions(firstOptions), 1000);
    };

    const closeChatbox = () => {
        chatboxContainer.classList.remove('active');
        chatFab.classList.remove('hidden');
        clearTimeout(autoOpenTimer);
    };

    const showForm = (message) => {
        hideAllOptions();
        chatInputContainer.style.display = 'none';
        chatboxContainer.classList.add('form-active');
        setTimeout(() => {
            addMessage(message, 'bot');
            showOptions(formWrap);
            scrollToBottom();
        }, 1000);
    };

    const handleSubmit = async () => {
    const nameInput = document.getElementById('name');
    const contactInput = document.getElementById('contact');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const contact = contactInput ? contactInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // ✅ Check all fields including message
    if (!name || !contact || !email || !message) {
        addMessage("Please fill in all required fields (Name, Contact, Email, Message).", 'bot');
        return;
    }

    // ✅ Show user submission in chat
    const formData = `Name: ${name}\nContact: ${contact}\nEmail: ${email}\nMessage: ${message}`;
    addMessage(formData, 'user');
    hideAllOptions();

    try {
        const res = await fetch("https://company-website-beta-six.vercel.app/api/chat/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                serviceCategory: chosenService || "General", // ✅ added
                subCategory: chosenSub || "",                // ✅ added
                name,
                contact,
                email,
                message
            })
        });

        const data = await res.json();

        if (res.ok) {
            addMessage("✅ Thank you for submitting. Our team will reach out to you soon!", 'bot');
            setTimeout(closeChatbox, 3000);
        } else {
            addMessage("❌ Oops! Something went wrong. Please try again later.", 'bot');
            console.error("API Error:", data);
        }
    } catch (err) {
        addMessage("⚠️ Network error. Please try again later.", 'bot');
        console.error("Network error:", err);
    }
};

    if (chatFab) chatFab.addEventListener('click', openChatbox);
    if (chatboxCloseBtn) chatboxCloseBtn.addEventListener('click', closeChatbox);
    
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if (text) {
                addMessage(text, 'user');
                chatInput.value = '';
                setTimeout(() => addMessage("Please select one of the options to proceed.", 'bot'), 1000);
            }
        });
    }

    if (firstOptions) {
        firstOptions.addEventListener('click', (e) => {
            if (!e.target.matches('.option-btn')) return;
            const choice = e.target.dataset.service;
             chosenService = choice; // ✅ save it
            addMessage(choice, 'user');
            hideAllOptions();
            if (choice === 'Website Development') {
                setTimeout(() => {
                    addMessage("Great! What would you like to know about our Website Development services?", 'bot');
                    showOptions(devOptions);
                }, 1000);
            } else {
                setTimeout(() => {
                    addMessage("Excellent! Which area of Digital Marketing are you interested in?", 'bot');
                    showOptions(dmOptions);
                }, 1000);
            }
        });
    }

    const handleSubOptionClick = (e) => {
        if (!e.target.matches('.choice-btn')) return;
        const choice = e.target.dataset.sub;
        chosenSub = choice; // ✅ save it
        addMessage(choice, 'user');
        showForm("To discuss this further, please provide your details and our team will get in touch.");
    };

    if (devOptions) devOptions.addEventListener('click', handleSubOptionClick);
    if (dmOptions) dmOptions.addEventListener('click', handleSubOptionClick);
    if (formSubmitBtn) formSubmitBtn.addEventListener('click', handleSubmit);

    // Auto-open timer after 10 seconds
    if (chatboxContainer) { // Only set the timer if the chatbox exists on the page
        autoOpenTimer = setTimeout(openChatbox, 10000);
    }
});


    // ----------------------
    // Toast function
    // ----------------------
    function showToast(message, duration = 4000, bgColor = "#4BB543") {
        let toast = document.getElementById("toast");
        if (!toast) {
            // Create toast if it doesn't exist
            toast = document.createElement("div");
            toast.id = "toast";
            toast.style.cssText = `
                visibility: hidden;
                min-width: 250px;
                background-color: ${bgColor};
                color: white;
                text-align: center;
                border-radius: 5px;
                padding: 16px;
                position: fixed;
                z-index: 1000;
                left: 50%;
                bottom: 30px;
                transform: translateX(-50%);
                font-size: 17px;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.backgroundColor = bgColor;
        toast.style.visibility = "visible";

        setTimeout(() => {
            toast.style.visibility = "hidden";
        }, duration);
    }

   
    // ----------------------
    // contactForm submission with backend API
    // ----------------------
   const form = document.getElementById("footer-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            const res = await fetch("https://company-website-beta-six.vercel.app/api/contact/addcontact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            console.log("Response:", res);
            const data = await res.json();
            console.log("Data:", data);

            if (res.ok) {
                showToast("Thank you! Your query has been received. We will get back to you soon.");

                form.reset();

                // Remove focused class if using focus animation
                document.querySelectorAll('.form-group1').forEach(group => group.classList.remove('focused'));
            } else {
                showToast("Something went wrong. Please try again!", 4000, "#FF4C4C");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Server not reachable!", 4000, "#FF4C4C");
        }
    });
  }