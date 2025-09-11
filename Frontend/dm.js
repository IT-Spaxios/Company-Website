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
        const res = await fetch("https://company-website-8ib6.vercel.app/api/chat/submit", {
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
            const res = await fetch("https://company-website-8ib6.vercel.app/api/contact/addcontact", {
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
// JavaScript Code for 1st section
       document.addEventListener("DOMContentLoaded", function() {
            const wordsToAnimate = document.querySelectorAll('.word-animation');
            const totalDuration = 0.7;
            
            // Check if screen width is greater than 768px (tablet/desktop)
            if (window.innerWidth > 768) {
                wordsToAnimate.forEach(wordElement => {
                    const text = wordElement.textContent.trim();
                    wordElement.textContent = '';
                    const letters = text.split('');
                    const letterCount = letters.length;

                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        const delay = (index / letterCount) * totalDuration;
                        span.style.setProperty('--delay', `${delay}s`);
                        wordElement.appendChild(span);
                    });
                });
            }
            
            // Handle window resize
            window.addEventListener('resize', function() {
                const wordsToAnimate = document.querySelectorAll('.word-animation');
                
                if (window.innerWidth <= 768) {
                    // Remove animation spans on mobile
                    wordsToAnimate.forEach(wordElement => {
                        if (wordElement.querySelector('span')) {
                            wordElement.textContent = wordElement.textContent;
                        }
                    });
                }
            });
        });




        //script for second  section  ---about section


         document.addEventListener('DOMContentLoaded', function() {
            const headlineLines = document.querySelectorAll('.headline-line');
            const aboutSection = document.querySelector('.about-section');
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                    rect.bottom >= 0
                );
            }
            
            // Function to handle scroll event with throttling
            let scrollTimeout;
            function handleScroll() {
                if (scrollTimeout) {
                    cancelAnimationFrame(scrollTimeout);
                }
                
                scrollTimeout = requestAnimationFrame(function() {
                    if (isInViewport(aboutSection)) {
                        headlineLines.forEach(line => {
                            line.classList.add('animate');
                        });
                        
                        // Remove event listener after animation is triggered
                        window.removeEventListener('scroll', handleScroll);
                    }
                });
            }
            
            // Only add the scroll effect on desktop screens
            if (window.innerWidth > 992) {
                window.addEventListener('scroll', handleScroll);
                
                // Check on initial load in case section is already in view
                handleScroll();
            } else {
                // On mobile, show the text immediately without animation
                headlineLines.forEach(line => {
                    line.classList.add('animate');
                });
            }
        });


// ===================================================
// --------------why it spaxios section--------------


 // Intersection Observer for scroll-triggered animations
       
         if (window.innerWidth > 768) {
            document.addEventListener('DOMContentLoaded', function() {
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.2
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const section = entry.target;
                            
                            // Animate header elements
                            const subtitle = section.querySelector('.section-subtitle');
                            const title = section.querySelector('.section-title');
                            const description = section.querySelector('.section-description');
                            
                            if (subtitle) subtitle.classList.add('animate');
                            if (title) title.classList.add('animate');
                            if (description) description.classList.add('animate');
                            
                            // Animate visual content
                            const visualContent = section.querySelector('.visual-content');
                            if (visualContent) visualContent.classList.add('animate');
                            
                            // Animate text content
                            const textContent = section.querySelector('.text-content');
                            if (textContent) textContent.classList.add('animate');
                            
                            // Animate feature points with delay
                            const featurePoints = section.querySelectorAll('.feature-point');
                            featurePoints.forEach((point, index) => {
                                setTimeout(() => {
                                    point.classList.add('animate');
                                }, index * 200);
                            });
                            
                            // Animate CTA button with delay
                            const ctaContainer = section.querySelector('.cta-container');
                            if (ctaContainer) {
                                setTimeout(() => {
                                    ctaContainer.classList.add('animate');
                                }, 600);
                            }
                            
                            // Stop observing once animated
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                // Start observing the section
                const whyDifferentSection = document.querySelector('.why-different-section');
                if (whyDifferentSection) {
                    observer.observe(whyDifferentSection);
                }
            });
        }

// <!-- -------------OUR DIGITAL MARKETING-------------
//     --------------SERVICES SECTION-------------- -->


 // Check if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Initialize animations only for desktop
    function initializeAnimations() {
        if (!isMobileDevice()) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        } else {
            // For mobile, immediately show all content without animation
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('animate');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }
    }
    
    // Initialize animations on page load
    document.addEventListener('DOMContentLoaded', function() {
        initializeAnimations();
    });
    
    // Reinitialize on window resize
    window.addEventListener('resize', function() {
        initializeAnimations();
    });
    
    // Floating elements parallax effect - only for desktop
    window.addEventListener('scroll', () => {
        if (!isMobileDevice()) {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('.floating-circle').forEach((circle, index) => {
                const speed = 0.2 + (index * 0.1);
                circle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
    
    // CTA hover effects - works on both desktop and mobile
    document.querySelectorAll('.cta-button-service').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(-3px) scale(1)';
        });
    });
    
    // SMM Slider - works on both desktop and mobile
    document.addEventListener('DOMContentLoaded', function() {
        const slider = document.querySelector('.smm-slider');
        const slides = document.querySelectorAll('.smm-slide');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        function updateSlider() {
            if (slider) {
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
        }
        
        function nextSlide() {
            if (slides.length > 0) {
               currentSlide = (currentSlide + 1) % slideCount;
                updateSlider(); 
            }
        }
        
        setInterval(nextSlide, 3000);
    });
        // =============================================
        // ---------------digital marketing cards-----------

        const data = {
            GOOGLE_MY_BUSINESS: {
                title: "Why Google My Business Page?",
                desc: `Many businesses want to pull customers to their doorstep. For those, Google My Business profile is key to their business. If someone searches for services and products that you provide in your area, <span class="highlight-themes">your business profile appears on maps</span> with accurate business details, reviews, updates, directions, your location, working hours, and photos. so they can choose your business with confidence.`,
                img: "./Images/googlemybusiness service in chennai.webp",
                alt:"googlemybusiness service in chennai, gmb service in chennai",
                benefits: [
                    "More visibility in local Google searches & Maps results",
                    "Build trust with authentic reviews & ratings",
                    "Drive more calls, enquiries, and store visits",
                    "Upload offers, updates, and photos on Google",
                    "Stay ahead of local competitors"
                ],
                ctaTagline: "Ready to boost your local presence?",
                ctaButtonText: "Get GMB Profile",
                imageTagline: "Your business, discovered locally"
            },
            EMAIL_MARKETING_SERVICE: {
                title: "Why Email Marketing Service?",
                desc: `Email marketing is more than newsletters. It’s cost-effective, measurable, and one of the best ways to drive repeat sales. You can <span class="highlight-themes">reach your customers with personalized email marketing campaigns, automation, updates and offers</span>, and you can turn customers into one-time buyers to loyal customers.`,
                img: "./Images/emailmarketing service in chennai.webp",
                alt: "emailmarketing service in chennai, EM service in chennai",
                benefits: [
                    "Directly reach your customers in their inbox",
                    "Build long-term relationships & loyalty",
                    "Cost-effective with huge ROI",
                    "Better engagement",
                    "Increase repeat purchases & sales conversions"
                ],
                ctaTagline: "Start connecting with your audience today!",
                ctaButtonText: "Start Email Marketing",
                imageTagline: "Direct communication, better results"
            },
            LOCAl_SEO_SERVICE: {
                title: "Why Local SEO Service?",
                desc: `Show your business in front of nearby people who are searching for services/products that you provide. Whether it’s “best salon in Chennai” or “electronic spare parts in Chennai”, <span class="highlight-themes">Local SEO ensures your business is at the top position.</span> It’s a perfect strategy for small and medium businesses that want to focus on location-based lead generation and increase visibility and traffic.`,
                img: "./Images/localseo service in chennai.webp",
                alt:"localseo service in chennai, LS service in chennai",
                benefits: [
                    "Top rank in location-based searches",
                    "Attract in-market customers",
                    "Increase calls, visits and enquiries from locals",
                    "Strengthen trust with local reviews & citations",
                    "Compete effectively with bigger brands"
                ],
                ctaTagline: "Dominate your local market now!",
                ctaButtonText: "Get Local SEO",
                imageTagline: "Be the first choice in local searches"
            },
        };

        function updateContent(tab) {
            // Update tab buttons
            document.querySelectorAll(".tab-btn").forEach(b => {
                b.classList.remove("active-btn");
            });

            const activeBtn = [...document.querySelectorAll(".tab-btn")].find(btn => btn.getAttribute("data-tab") === tab);
            activeBtn.classList.add("active-btn");

            // Custom headings for each service
            const benefitHeadings = {
                'GOOGLE_MY_BUSINESS': 'Advantages of Google My Business',
                'EMAIL_MARKETING_SERVICE': 'Advantages of Email Marketing',
                'LOCAl_SEO_SERVICE': 'Advantages of Local SEO'
            };

            // Fade out current content
            document.querySelectorAll('.content-wrapper').forEach(el => {
                el.classList.remove('active');
            });

            // After a brief delay, update content and fade in
            setTimeout(() => {
                document.getElementById("leftContent").innerHTML = `
                    <div class="description-box">
                        <h2 class="text-2xl font-bold mb-4 text-[#0D2A81]">${data[tab].title}</h2>
                        <p class="text-gray-600">${data[tab].desc}</p>
                    </div>
                `;
                
                document.getElementById("centerContent").innerHTML = `
                    <div class="flex flex-col justify-center items-center">
                        <img src="${data[tab].img}" alt="${tab} Image" class="w-48 h-48 object-contain">
                        <p class="images-tagline mt-2">${data[tab].imageTagline}</p>
                    </div>
                `;
                
                const benefitsContainer = document.querySelector('.benefits-container');
                benefitsContainer.innerHTML = `
                    <h3 class="text-xl font-semibold mb-4 text-[#0D2A81]">${benefitHeadings[tab]}</h3>
                    <div class="space-y-3">
                        ${data[tab].benefits.map(benefit => `
                            <div class="benefit-item">${benefit}</div>
                        `).join("")}
                    </div>
                `;
                
                const ctaSection = document.querySelector('.cta-section-card');
                ctaSection.innerHTML = `
                    <p class="cta-tagline-card">${data[tab].ctaTagline}</p>
                    <button class="cta-button-card">${data[tab].ctaButtonText}</button>
                `;
                
                // Fade in new content
                document.querySelectorAll('.content-wrapper').forEach(el => {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, 50);
                });
            }, 300);
        }

        // Tab button click handler
        document.querySelectorAll(".tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                updateContent(btn.getAttribute("data-tab"));
            });
        });

        // Default selection on load
        window.addEventListener("DOMContentLoaded", () => {
            updateContent("GOOGLE_MY_BUSINESS");
            
            // Fade in initial content after a brief delay
            setTimeout(() => {
                document.querySelectorAll('.content-wrapper').forEach(el => {
                    el.classList.add('active');
                });
            }, 100);
        });
        

    // ======================================================== //
// FINAL SCROLL-DRIVEN ZIGZAG LOGIC (CONTENT ONLY)          //
// ======================================================== //



//   Running logos

 document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('partnersSlider');
            const logos = slider.innerHTML;
            
            // Double the logos for seamless infinite loop
            slider.innerHTML = logos + logos;
            
            // Pause on hover
            slider.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            // Resume on mouse leave
            slider.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
            
            // Adjust animation speed based on screen size
            function adjustAnimationSpeed() {
                if (window.innerWidth < 768) {
                    slider.style.animationDuration = '65s';
                } else {
                    slider.style.animationDuration = '75s';
                }
            }
            
            // Initial adjustment
            adjustAnimationSpeed();
            
            // Adjust on resize
            window.addEventListener('resize', adjustAnimationSpeed);
            
            // Touch support for mobile devices
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                this.style.animationPlayState = 'paused';
            }, {passive: true});
            
            slider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                // If user didn't swipe significantly, resume animation after delay
                if (Math.abs(touchEndX - touchStartX) < 50) {
                    setTimeout(() => {
                        this.style.animationPlayState = 'running';
                    }, 1000);
                }
            }, {passive: true});
        });



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

    //   ===========================================
    // ------------ROAPMAP--------------------