document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // ============================================================
    // 1. HERO PARALLAX EFFECT
    // ============================================================
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
                if (getComputedStyle(icon).transform === "none") {
                    icon.style.transform = `translateX(${-xPos * parallaxIntensity}px) translateY(${-yPos * parallaxIntensity}px)`;
                } else {
                    icon.style.transform += ` translateX(${-xPos * parallaxIntensity}px) translateY(${-yPos * parallaxIntensity}px)`;
                }
            });
        });
        heroSection.addEventListener('mouseleave', () => {
            visualContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
            floatingIcons.forEach(icon => {
                icon.style.transform = "translateX(0px) translateY(0px)";
            });
        });
    }

    // ============================================================
    // 2. HEADER + MOBILE MENU
    // ============================================================
     const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');
    const hamburgerOpen = document.getElementById('hamburger-open');
    const hamburgerClose = document.getElementById('hamburger-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    if (topBar) {
        window.addEventListener('scroll', () => {
            topBar.classList.toggle('top-bar--hidden', window.scrollY > 50);
        });
    }
    const toggleMenu = (show) => {
        mobileMenuOverlay?.classList.toggle('active', show);
        body.classList.toggle('no-scroll', show);
    };
    hamburgerOpen?.addEventListener('click', () => toggleMenu(true));
    hamburgerClose?.addEventListener('click', () => toggleMenu(false));
    mobileMenuOverlay?.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) toggleMenu(false);
    });

    // ============================================================
    // 3. JOB LISTINGS + MODAL
    // ============================================================
    // ============================================================
// 3. JOB LISTINGS + MODAL
// ============================================================
const applicationModalOverlay = document.getElementById('application-modal');
const modalJobTitle = document.getElementById('modal-job-title');
const closeModalBtn = applicationModalOverlay?.querySelector('.application-modal-close-btn');
const jobListingsContainer = document.getElementById('job-listings-container');

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

closeModalBtn?.addEventListener('click', closeApplicationModal);
applicationModalOverlay?.addEventListener('click', (e) => {
    if (e.target === applicationModalOverlay) closeApplicationModal();
});

const loadJobs = async () => {
    try {
        const res = await fetch('https://company-website-beta-six.vercel.app/api/careers');
        const jobs = await res.json();
        console.log("Fetched jobs:", jobs);
        if (Array.isArray(jobs) && jobs.length > 0) {
            jobListingsContainer.innerHTML = jobs.map(job => `
                <div class="job-listing">
                    <div class="job-info">
                        <h3>${job.title}</h3>
                        <div class="job-details">
                            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                            <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                        </div>
                    </div>
                    <a href="#" class="apply-button">Apply Now</a>
                </div>
            `).join('');

            // ✅ Attach listeners after rendering
            document.querySelectorAll('.job-listing').forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    openApplicationModal(card);
                });
            });

        } else {
            jobListingsContainer.innerHTML = `<p>No openings available.</p>`;
        }
    } catch (err) {
        console.error("Error loading jobs:", err);
        jobListingsContainer.innerHTML = `<p>Unable to load jobs.</p>`;
    }
};

loadJobs();
  

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
    let chosenService = '';
    let chosenSub = '';

    if(chatboxContainer) { // Run chatbox logic only if it exists
        const scrollToBottom = () => { if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight; };
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
        const addMessage = (text, sender) => {
            if (!messagesContainer) return;
            const messageDiv = document.createElement('div');
            messageDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            scrollToBottom();
        };

        const showOptions = (element) => { if(element) element.classList.remove('hidden'); };
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
        const handleSubmit = async () => {
            const nameInput = document.getElementById('chat-name');
            const contactInput = document.getElementById('chat-contact');
            const emailInput = document.getElementById('chat-email');
            const messageInput = document.getElementById('chat-message');

            const name = nameInput ? nameInput.value.trim() : '';
            const contact = contactInput ? contactInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            const name = nameInput ? nameInput.value.trim() : '';
            const contact = contactInput ? contactInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !contact || !email) {
                addMessage("Please fill in all required fields (Name, Contact, Email).", 'bot');
                return;
            }
            if (!name || !contact || !email) {
                addMessage("Please fill in all required fields (Name, Contact, Email).", 'bot');
                return;
            }

            const formDataText = `Name: ${name}\nContact: ${contact}\nEmail: ${email}\nMessage: ${message}`;
            addMessage(formDataText, 'user');
            hideAllOptions();
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
        const handleSubOptionClick = (e) => {
            if (!e.target.matches('.choice-btn')) return;
            const choice = e.target.dataset.sub;
            chosenSub = choice;
            addMessage(choice, 'user');
            showForm("To discuss this further, please provide your details and our team will get in touch.");
        };

        if (devOptions) devOptions.addEventListener('click', handleSubOptionClick);
        if (dmOptions) dmOptions.addEventListener('click', handleSubOptionClick);
        if (devOptions) devOptions.addEventListener('click', handleSubOptionClick);
        if (dmOptions) dmOptions.addEventListener('click', handleSubOptionClick);

        autoOpenTimer = setTimeout(openChatbox, 10000);
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


    // ============================================================
    // 5. CONTACT FORM (FOOTER)
    // ============================================================
    function showToast(msg, duration = 4000, bgColor = "#4BB543") {
        let toast = document.getElementById("toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.cssText = `
            visibility: visible;
            min-width: 250px;
            background:${bgColor}; color:#fff;
            text-align:center; padding:16px;
            border-radius:5px; position:fixed;
            left:50%; bottom:30px;
            transform:translateX(-50%);
            z-index:1000; font-size:17px;
        `;
        setTimeout(() => toast.style.visibility = "hidden", duration);
    }
    const form = document.getElementById("footer-form");
    form?.addEventListener("submit", async (e) => {
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
            if (res.ok) {
                showToast("✅ Query received!");
                form.reset();
            } else {
                showToast("❌ Something went wrong", 4000, "#FF4C4C");
            }
        } catch (err) {
            showToast("⚠️ Server not reachable", 4000, "#FF4C4C");
        }
    });
});

