document.addEventListener('DOMContentLoaded', () => {

    // =============================================== //
    // 1. 3D HERO PARALLAX EFFECT (DESKTOP ONLY)       //
    // =============================================== //
    const heroSection = document.querySelector('.career-hero-section');
    const visualContainer = document.querySelector('.hero-3d-visual');
    const floatingIcons = document.querySelectorAll('.floating-icon');

    if (heroSection && visualContainer) {
        heroSection.addEventListener('mousemove', (e) => {
            // Only run on desktop
            if (window.innerWidth < 992) return;

            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            
            // Calculate mouse position from the center of the section
            const xPos = (clientX / offsetWidth) - 0.5;
            const yPos = (clientY / offsetHeight) - 0.5;
            
            const tiltIntensity = 15;
            const parallaxIntensity = 30;

            // Tilt the entire container
            visualContainer.style.transform = `rotateY(${xPos * tiltIntensity}deg) rotateX(${-yPos * tiltIntensity}deg)`;
            
            // Apply parallax effect to each icon
            floatingIcons.forEach(icon => {
                const zDepth = parseFloat(getComputedStyle(icon).transform.split(',')[13] || 0);
                icon.style.transform = `translateZ(${zDepth}px) translateX(${-xPos * parallaxIntensity}px) translateY(${-yPos * parallaxIntensity}px)`;
            });
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
             visualContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
             floatingIcons.forEach(icon => {
                const zDepth = parseFloat(getComputedStyle(icon).transform.split(',')[13] || 0);
                icon.style.transform = `translateZ(${zDepth}px) translateX(0px) translateY(0px)`;
            });
        });
    }

    // =============================================== //
    // 2. SCROLL-IN ANIMATIONS                         //
    // =============================================== //
    const animatedElements = document.querySelectorAll('.perk-card, .job-listing');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: stop observing after it's visible
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});
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
    // Modal
document.addEventListener('DOMContentLoaded', () => {
    // UPDATED: Select the entire job listing card, not just the button
    const jobListings = document.querySelectorAll('.job-listing');
    const applicationModalOverlay = document.getElementById('application-modal');
    const body = document.body;

    if (applicationModalOverlay && jobListings.length > 0) {
        
        const closeModalBtn = applicationModalOverlay.querySelector('.application-modal-close-btn');
        const modalJobTitle = document.getElementById('modal-job-title');

        const openApplicationModal = (card) => {
            // Find the title within the clicked card
            const jobTitle = card.querySelector('.job-info h3').textContent;
            modalJobTitle.textContent = jobTitle;
            
            applicationModalOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        };

        const closeApplicationModal = () => {
            applicationModalOverlay.classList.remove('active');
            body.style.overflow = '';
        };

        // --- Event Listeners ---
        // UPDATED: Add listener to each card
        jobListings.forEach(card => {
            card.addEventListener('click', (e) => {
                // Check if the click was on the apply button itself to prevent link navigation
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
});
 // ===================================================================
    // 8. (CHATBOX)
    // ===================================================================
    document.addEventListener('DOMContentLoaded', () => {
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
        console.log("✅ handleSubmit triggered");  // add this
    const nameInput = document.getElementById('chat-name');
const contactInput = document.getElementById('chat-contact');
const emailInput = document.getElementById('chat-email');
const messageInput = document.getElementById('chat-message');


    const name = nameInput ? nameInput.value.trim() : '';
    const contact = contactInput ? contactInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

 

    // ✅ Check all fields including message
    if (!name || !contact || !email ) {
        addMessage("Please fill in all required fields (Name, Contact, Email).", 'bot');
        return;
    }

    // ✅ Show user submission in chat
    const formData = `Name: ${name}\nContact: ${contact}\nEmail: ${email}\nMessage: ${message}`;
    addMessage(formData, 'user');
    hideAllOptions();
    console.log("Submitting chat form:", {
    serviceCategory: chosenService,
    subCategory: chosenSub,
    name, contact, email, message
});


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
        console.log("Collected values:", data);


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
    
    // if (sendBtn) {
    //     sendBtn.addEventListener('click', () => {
    //         const text = chatInput.value.trim();
    //         if (text) {
    //             addMessage(text, 'user');
    //             chatInput.value = '';
    //             setTimeout(() => addMessage("Please select one of the options to proceed.", 'bot'), 1000);
    //         }
    //     });
    // }

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
//perksectionfontstyle
document.addEventListener('DOMContentLoaded', () => {
    // Select ALL elements that need the scroll animation
    const animatedElements = document.querySelectorAll(
        '.cardssection-title h2, .cardssection-title p, .perk-card'
    );

    // This observer will add the 'is-visible' class to each element
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When an element is on screen...
            if (entry.isIntersecting) {
                // Add the class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing it so the animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Animation triggers when 10% of the element is visible
    });

    // Tell the observer to watch each of the selected elements
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
});
// jobopeningfontstyle
document.addEventListener('DOMContentLoaded', () => {
    // Select the headings that need to be animated
    const jobTitleElements = document.querySelectorAll(
        '.jobsection-title h2, .jobsection-title p'
    );

    // This observer will watch for the headings
    const jobTitleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When a heading is on the screen...
            if (entry.isIntersecting) {
                // Add the class to trigger the animation
                entry.target.classList.add('is-visible');
                // Stop watching it so the animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the heading is visible
    });

    // Tell the observer to watch each heading
    jobTitleElements.forEach(el => {
        jobTitleObserver.observe(el);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const jobListings = document.querySelectorAll('.job-listing');
    const modalOverlay = document.querySelector('.application-modal-overlay');
    const closeModalBtn = document.querySelector('.application-modal-close-btn');
    const htmlElement = document.documentElement; // The <html> tag
    const body = document.body;

    const openModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            // FIX: Add 'no-scroll' to BOTH html and body to be safe
            htmlElement.classList.add('no-scroll');
            body.classList.add('no-scroll');
        }
    };

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            // FIX: Remove 'no-scroll' from BOTH html and body
            htmlElement.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
        }
    };

    // This check prevents errors if the elements aren't found
    if (jobListings.length > 0 && modalOverlay) {
        jobListings.forEach(job => {
            job.addEventListener('click', openModal);
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
});
// ----------------------
    // contactForm submission with backend API
    // ----------------------
    document.addEventListener('DOMContentLoaded', () => {

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
    });