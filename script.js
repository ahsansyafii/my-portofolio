// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation for hero title
const typingText = document.querySelector('.typing-text');
const text = "Halo, Saya Ahsan Syafi'i Rusdin";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typingText.textContent = '';
    setTimeout(typeWriter, 1000);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
  
        }
    });
}, observerOptions);

// Add fade-in class to sections and observe them
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling dengan EmailJS
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Mohon lengkapi semua field!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    // Template parameters untuk EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,
        to_name: 'Ahsan Syafii'
    };
    
    // Kirim email menggunakan EmailJS
    emailjs.send('service_ahsan23', 'template_ahsan23', templateParams) // GANTI dengan ID Anda
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('✅ Pesan berhasil terkirim! Terima kasih, saya akan segera membalas.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email.', 'error');
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Function untuk menampilkan notifikasi
function showNotification(message, type) {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Project cards tilt effect
// Project Cards Fade-in Animation
const projectObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
}

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add fade-in class - semua card animasi sama
      entry.target.classList.add("fade-in-visible")

      // Stop observing once animated
      projectObserver.unobserve(entry.target)
    }
  })
}, projectObserverOptions)

// Observe all project cards
document.querySelectorAll(".project-card").forEach((card) => {
  projectObserver.observe(card)
})

// Update project cards hover effect (mengganti yang lama)
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (card.classList.contains("fade-in-visible")) {
      card.style.transform = "translateY(-10px) scale(1.02)"
      card.style.boxShadow = "0 20px 40px rgba(99, 102, 241, 0.3)"
      card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }
  })

  card.addEventListener("mouseleave", () => {
    if (card.classList.contains("fade-in-visible")) {
      card.style.transform = "translateY(0) scale(1)"
      card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)"
      card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }
  })
})

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Konami Code activated! You found the easter egg!');
        }, 2000);
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization - Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #6366f1, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0.7;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursor2 = document.querySelector('.custom-cursor');
    cursor2.style.left = e.clientX - 10 + 'px';
    cursor2.style.top = e.clientY - 10 + 'px';
});

// Hide custom cursor when leaving window
document.addEventListener('mouseleave', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.opacity = '0';
    }
});

document.addEventListener('mouseenter', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.opacity = '0.7';
    }
});