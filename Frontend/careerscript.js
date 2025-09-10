document.addEventListener('DOMContentLoaded', () => {

    // Common variable used in multiple places
    const body = document.body;

    // =============================================== //
    // 1. 3D HERO PARALLAX EFFECT (DESKTOP ONLY)       //
    // =============================================== //
    const heroSection = document.querySelector('.career-hero-section');
    const visualContainer = document.querySelector('.hero-3d-visual');
    const floatingIcons = document.querySelectorAll('.floating-icon');

    if (heroSection && visualContainer) {
        heroSection.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 992) return;
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            const xPos = (clientX / offsetWidth) - 0.5;
            const yPos = (clientY / offsetHeight) - 0.5;
            const tiltIntensity = 15;
            const parallaxIntensity = 30;
            visualContainer.style.transform = `rotateY(${xPos * tiltIntensity}deg) rotateX(${-yPos * tiltIntensity}deg)`;
            floatingIcons.forEach(icon => {
                const zDepth = parseFloat(getComputedStyle(icon).transform.split(',')[13] || 0);
                icon.style.transform = `translateZ(${zDepth}px) translateX(${-xPos * parallaxIntensity}px) translateY(${-yPos * parallaxIntensity}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            visualContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
            floatingIcons.forEach(icon => {
                const zDepth = parseFloat(getComputedStyle(icon).transform.split(',')[13] || 0);
                icon.style.transform = `translateZ(${zDepth}px) translateX(0px) translateY(0px)`;
            });
        });
    }

    // ===================================================================
    // 2. HEADER & MOBILE MENU
    // ===================================================================
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');
    const hamburgerOpen = document.getElementById('hamburger-open');
    const hamburgerClose = document.getElementById('hamburger-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

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
    // 3. JOB APPLICATION MODAL
    // ===================================================================
    const jobListings = document.querySelectorAll('.job-listing');
    const applicationModalOverlay = document.getElementById('application-modal');

    if (applicationModalOverlay && jobListings.length > 0) {
        const closeModalBtn = applicationModalOverlay.querySelector('.application-modal-close-btn');
        const modalJobTitle = document.getElementById('modal-job-title');

        const openApplicationModal = (card) => {
            const jobTitle = card.querySelector('.job-info h3').textContent;
            modalJobTitle.textContent = jobTitle;
            applicationModalOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        };

        const closeApplicationModal = () => {
            applicationModalOverlay.classList.remove('active');
            body.style.overflow = '';
        };

        jobListings.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.apply-button')) {
                    e.preventDefault();
                }
                openApplicationModal(card);
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeApplicationModal);
        }

        applicationModalOverlay.addEventListener('click', (e) => {
            if (e.target === applicationModalOverlay) {
                closeApplicationModal();
            }
        });
    }

    // ===================================================================
    // 4. SCROLL-IN ANIMATIONS (for multiple sections)
    // ===================================================================
    const animatedElements = document.querySelectorAll(
        '.perk-card, .job-listing, .cardssection-title h2, .cardssection-title p, .jobsection-title h2, .jobsection-title p'
    );

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===================================================================
    // 5. CHATBOX
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
    let chosenService = '';
    let chosenSub = '';

    if(chatboxContainer) { // Run chatbox logic only if it exists
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
            const nameInput = document.getElementById('chat-name');
            const contactInput = document.getElementById('chat-contact');
            const emailInput = document.getElementById('chat-email');
            const messageInput = document.getElementById('chat-message');

            const name = nameInput ? nameInput.value.trim() : '';
            const contact = contactInput ? contactInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !contact || !email) {
                addMessage("Please fill in all required fields (Name, Contact, Email).", 'bot');
                return;
            }

            const formDataText = `Name: ${name}\nContact: ${contact}\nEmail: ${email}\nMessage: ${message}`;
            addMessage(formDataText, 'user');
            hideAllOptions();

            try {
                const res = await fetch("https://company-website-beta-six.vercel.app/api/chat/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        serviceCategory: chosenService || "General",
                        subCategory: chosenSub || "",
                        name, contact, email, message
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    addMessage("✅ Thank you for submitting. Our team will reach out to you soon!", 'bot');
                    setTimeout(closeChatbox, 3000);
                } else {
                    addMessage("❌ Oops! Something went wrong. Please try again later.", 'bot');
                }
            } catch (err) {
                addMessage("⚠️ Network error. Please try again later.", 'bot');
            }
        };

        if (chatFab) chatFab.addEventListener('click', openChatbox);
        if (chatboxCloseBtn) chatboxCloseBtn.addEventListener('click', closeChatbox);
        if (formSubmitBtn) formSubmitBtn.addEventListener('click', handleSubmit);
        
        if (firstOptions) {
            firstOptions.addEventListener('click', (e) => {
                if (!e.target.matches('.option-btn')) return;
                const choice = e.target.dataset.service;
                chosenService = choice;
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
            chosenSub = choice;
            addMessage(choice, 'user');
            showForm("To discuss this further, please provide your details and our team will get in touch.");
        };

        if (devOptions) devOptions.addEventListener('click', handleSubOptionClick);
        if (dmOptions) dmOptions.addEventListener('click', handleSubOptionClick);

        autoOpenTimer = setTimeout(openChatbox, 10000);
    }
    
    // ===================================================================
    // 6. CONTACT FORM SUBMISSION
    // ===================================================================
    const footerForm = document.getElementById("footer-form");
    
    if (footerForm) {
        function showToast(message, duration = 4000, bgColor = "#4BB543") {
            let toast = document.getElementById("toast");
            if (!toast) {
                toast = document.createElement("div");
                toast.id = "toast";
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.style.cssText = `
                visibility: visible;
                min-width: 250px; background-color: ${bgColor}; color: white;
                text-align: center; border-radius: 5px; padding: 16px;
                position: fixed; z-index: 1000; left: 50%; bottom: 30px;
                transform: translateX(-50%); font-size: 17px;
            `;
            setTimeout(() => { toast.style.visibility = "hidden"; }, duration);
        }

        footerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = {
                name: footerForm.name.value,
                email: footerForm.email.value,
                message: footerForm.message.value
            };
            try {
                const res = await fetch("https://company-website-beta-six.vercel.app/api/contact/addcontact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
                if (res.ok) {
                    showToast("Thank you! Your query has been received.");
                    footerForm.reset();
                    document.querySelectorAll('.form-group1').forEach(group => group.classList.remove('focused'));
                } else {
                    showToast("Something went wrong. Please try again!", 4000, "#FF4C4C");
                }
            } catch (error) {
                showToast("Server not reachable!", 4000, "#FF4C4C");
            }
        });
    }
});