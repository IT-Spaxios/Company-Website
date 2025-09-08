document.addEventListener("DOMContentLoaded", () => {

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
    // webDevContactForm submission
    // ----------------------
    const webform = document.getElementById('webDevContactForm');

    webform.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(webform);

    // Collect checkbox groups into arrays
    const purpose = Array.from(document.querySelectorAll('input[name="purpose"]:checked')).map(i => i.value);
    const source  = Array.from(document.querySelectorAll('input[name="source"]:checked')).map(i => i.value);

    const payload = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      mobile: formData.get('mobile')?.trim(),
      purpose,
      source,
      message: formData.get('message')?.trim()
    };

    try {
      const res = await fetch('https://company-website-beta-six.vercel.app/api/main/maincontact', { // if your backend is on another origin, use full URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to submit');
       showToast("Thank you! Your message has been sent. We will contact you soon.");
        webform.reset();
        document.querySelectorAll(".form-group1").forEach(g => g.classList.remove("focused"));
    } catch (err) {
      console.error(err);
     showToast(`There was a problem: ${err.message || "unknown error"}`, 5000, "#FF4C4C");
    }
  });

    
    // ----------------------
    // Focus/blur animation
    // ----------------------
    document.querySelectorAll('.form-group1 .line-input').forEach(input => {
        const parent = input.parentElement;

        input.addEventListener('focus', () => parent.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) parent.classList.remove('focused');
        });

        if (input.value) parent.classList.add('focused');
    });

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
            const res = await fetch("https://company-website-beta-six.vercel.app/api/contact", {
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