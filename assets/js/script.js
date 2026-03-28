// Theme Toggle 
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light</span>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (root.hasAttribute('data-theme')) {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> <span>Dark</span>';
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light</span>';
            }
        });
    }
})();

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        const expanded = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', expanded);
    });
}

// ✅ Close menu on nav link click (FIX)
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Remove hash and scroll to top on reload
window.addEventListener('load', function () {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
        window.scrollTo(0, 0);
    }
});

// FAQ
document.querySelectorAll('.faq-item').forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', function() {
            const expanded = item.classList.toggle('active');
            question.setAttribute('aria-expanded', expanded);
        });
    }
});

// Solution Tabs
const menuItems = document.querySelectorAll('.solution-menu-item');
const featureCards = document.querySelectorAll('.solution-feature-card');

function showFeatures(category) {
    featureCards.forEach(function(card) {
        card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
    });
}

menuItems.forEach(function(item) {
    item.addEventListener('click', function() {
        menuItems.forEach(m => m.classList.remove('active'));
        this.classList.add('active');
        showFeatures(this.getAttribute('data-menu'));
    });
});

showFeatures('dashboard');

// Notification
const names = ["Rahul", "Amit", "Sneha", "Pooja", "Vikas"];
const notification = document.getElementById("joinNotification");

function showNotification() {
    if (notification) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        notification.innerHTML = `${randomName} just joined Marble Ledgers`;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 8000);
    }
}

setInterval(showNotification, 80000);
setTimeout(showNotification, 10000);

// Top Button
const topBtn = document.querySelector('.topbtn');
if (topBtn) {
    window.addEventListener('scroll', () => {
        topBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================= FORM SUBMIT (FINAL) =================

const form = document.getElementById("your-form-id");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        bookDemo();
    });
}

async function bookDemo() {
    const payload = {
        firstName: document.getElementById("inputFirstName").value,
        lastName: document.getElementById("inputLastName").value,
        email: document.getElementById("exampleInputEmail1").value,
        phoneNo: document.getElementById("exampleInputPassword1").value,
        description: document.getElementById("Description").value,
    };

    try {
        const response = await fetch("https://admin.marbleledgers.com/api/bookDemo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("API Error");

        showToast("Demo booked successfully. We will contact you soon.", "success");
        form.reset();

    } catch (error) {
        showToast("Failed to book demo. Please try again.", "error");
    }
}

// Toast
function showToast(message, type) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}

// Modal
const modal = document.getElementById("demoModal");
const closeBtn = document.getElementById("closeModal");
const demoBtn = document.querySelector(".modal-btn");

setTimeout(() => {
    if (modal) modal.classList.add("active");
}, 90000);

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

if (demoBtn) {
    demoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("active");

        setTimeout(() => {
            document.querySelector("#contact-section")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// loader script 
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    if (!loader) return; 

    setTimeout(function () {
        loader.classList.add("loader-hidden");
    }, 300);
});

  
window.addEventListener("load", function () {
    if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);

        if (element) {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: "smooth"
                });
            }, 500); 
        }
    }
});

// top hero text 
const badgeTexts = [
    "Welcome to Marble Ledgers",
    "Simplify Your Stone Business",
    "Smart Inventory & Accounting",
    "Built for Marble Traders",
    "Your Digital Partner in Stone Industry"
];

let currentIndex = 0;
const badgeElement = document.getElementById("badgeText");

setInterval(() => {
    currentIndex = (currentIndex + 1) % badgeTexts.length;
    badgeElement.textContent = badgeTexts[currentIndex];
}, 5000);