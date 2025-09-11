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
                if (!icon.style.transform || icon.style.transform === "") {
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
    const applicationModalOverlay = document.getElementById('application-modal');
    const modalJobTitle = document.getElementById('modal-job-title');
    const closeModalBtn = applicationModalOverlay?.querySelector('.application-modal-close-btn');
    const jobListingsContainer = document.getElementById('job-listings-container');

    const openApplicationModal = (card) => {
        const jobTitle = card.querySelector('.job-info h3').textContent;
        if (modalJobTitle) modalJobTitle.textContent = jobTitle;
        applicationModalOverlay?.classList.add('active');
        body.style.overflow = 'hidden';
    };

    const closeApplicationModal = () => {
        applicationModalOverlay?.classList.remove('active');
        body.style.overflow = '';
    };

    closeModalBtn?.addEventListener('click', closeApplicationModal);
    applicationModalOverlay?.addEventListener('click', (e) => {
        if (e.target === applicationModalOverlay) closeApplicationModal();
    });

    const loadJobs = async () => {
        if (!jobListingsContainer) return;

        try {
            const res = await fetch('https://company-website-8ib6.vercel.app/api/careers');
            const jobs = await res.json();

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

    // ============================================================
    // 4. SCROLL-IN ANIMATIONS
    // ============================================================
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
        }, { threshold: 0.1 });

        animatedElements.forEach(element => observer.observe(element));
    }

    // ============================================================
    // 5. CHATBOX
    // ============================================================
    const chatFab = document.getElementById('chat-fab');
    const chatboxContainer = document.getElementById('chatbox-container');
    const chatboxCloseBtn = document.getElementById('chatbox-close-btn');
    const messagesContainer = document.getElementById('chatbox-messages');
    const chatInputContainer = document.querySelector('.chatbox-input');
    const firstOptions = document.getElementById('first-options');
    const devOptions = document.getElementById('dev-options');
    const dmOptions = document.getElementById('dm-options');
    const formWrap = document.getElementById('form-wrap');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    let autoOpenTimer;
    let hasChatBeenOpened = false;
    let chosenService = '';
    let chosenSub = '';

    if (chatboxContainer) {
        const scrollToBottom = () => { if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight; };
        const addMessage = (text, sender) => {
            if (!messagesContainer) return;
            const messageDiv = document.createElement('div');
            messageDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            scrollToBottom();
        };

        const hideAllOptions = () => {
            firstOptions?.classList.add('hidden');
            devOptions?.classList.add('hidden');
            dmOptions?.classList.add('hidden');
            formWrap?.classList.add('hidden');
        };

        const showOptions = (element) => { element?.classList.remove('hidden'); };

        const openChatbox = () => {
            if (hasChatBeenOpened && chatboxContainer.classList.contains('active')) return;
            hasChatBeenOpened = true;
            clearTimeout(autoOpenTimer);
            chatboxContainer.classList.add('active');
            chatFab?.classList.add('hidden');
            if (messagesContainer) messagesContainer.innerHTML = '';
            hideAllOptions();
            if (chatInputContainer) chatInputContainer.style.display = 'flex';
            chatboxContainer.classList.remove('form-active');
            addMessage("Hello! Welcome to Spaxios Innovation. How can I assist you today?", 'bot');
            setTimeout(() => showOptions(firstOptions), 1000);
        };

        const closeChatbox = () => {
            chatboxContainer.classList.remove('active');
            chatFab?.classList.remove('hidden');
            clearTimeout(autoOpenTimer);
        };

        const showForm = (message) => {
            hideAllOptions();
            if (chatInputContainer) chatInputContainer.style.display = 'none';
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

            const name = nameInput?.value.trim() || '';
            const contact = contactInput?.value.trim() || '';
            const email = emailInput?.value.trim() || '';
            const message = messageInput?.value.trim() || '';

            if (!name || !contact || !email) {
                addMessage("Please fill in all required fields (Name, Contact, Email).", 'bot');
                return;
            }

            addMessage(`Name: ${name}\nContact: ${contact}\nEmail: ${email}\nMessage: ${message}`, 'user');
            hideAllOptions();

            try {
                const res = await fetch("https://company-website-8ib6.vercel.app/api/chat/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ serviceCategory: chosenService || "General", subCategory: chosenSub || "", name, contact, email, message })
                });

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

        chatFab?.addEventListener('click', openChatbox);
        chatboxCloseBtn?.addEventListener('click', closeChatbox);
        formSubmitBtn?.addEventListener('click', handleSubmit);

        firstOptions?.addEventListener('click', (e) => {
            if (!e.target.matches('.option-btn')) return;
            chosenService = e.target.dataset.service;
            addMessage(chosenService, 'user');
            hideAllOptions();
            if (chosenService === 'Website Development') {
                setTimeout(() => { addMessage("Great! What would you like to know about our Website Development services?", 'bot'); showOptions(devOptions); }, 1000);
            } else {
                setTimeout(() => { addMessage("Excellent! Which area of Digital Marketing are you interested in?", 'bot'); showOptions(dmOptions); }, 1000);
            }
        });

        const handleSubOptionClick = (e) => {
            if (!e.target.matches('.choice-btn')) return;
            chosenSub = e.target.dataset.sub;
            addMessage(chosenSub, 'user');
            showForm("To discuss this further, please provide your details and our team will get in touch.");
        };

        devOptions?.addEventListener('click', handleSubOptionClick);
        dmOptions?.addEventListener('click', handleSubOptionClick);

        autoOpenTimer = setTimeout(openChatbox, 10000);
    }

    // ============================================================
    // 6. CONTACT FORM (FOOTER)
    // ============================================================
    const form = document.getElementById("footer-form");

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

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = { name: form.name.value, email: form.email.value, message: form.message.value };
        try {
            const res = await fetch("https://company-website-8ib6.vercel.app/api/contact/addcontact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                showToast("✅ Thank you! Your query has been received.");
                form.reset();
            } else {
                showToast("❌ Something went wrong", 4000, "#FF4C4C");
            }
        } catch (err) {
            showToast("⚠️ Server not reachable", 4000, "#FF4C4C");
        }
    });
});
