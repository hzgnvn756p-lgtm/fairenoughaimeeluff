// Create bubbles that burst on click
function createBubbles() {
    const container = document.getElementById('bubblesContainer');
    const bubbleCount = window.innerWidth > 768 ? 15 : 8;

    for (let i = 0; i < bubbleCount; i++) {
        createBubble(container);
    }
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Random size between 30px and 120px
    const size = Math.random() * 90 + 30;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';

    // Random position
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.top = Math.random() * 100 + '%';

    // Slightly random opacity for depth
    bubble.style.opacity = Math.random() * 0.6 + 0.4;

    // Add burst effect on click - bubble disappears
    bubble.addEventListener('click', (e) => {
        e.stopPropagation();
        burstBubble(bubble, container);
    });

    container.appendChild(bubble);

    // Randomly generate new bubbles periodically
    setTimeout(() => {
        if (container.contains(bubble)) {
            bubble.style.opacity = '0';
            bubble.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (container.contains(bubble)) {
                    bubble.remove();
                    createBubble(container);
                }
            }, 500);
        }
    }, 8000 + Math.random() * 4000);
}

function burstBubble(bubble, container) {
    bubble.classList.add('burst');
    bubble.style.pointerEvents = 'none';

    // Remove the bubble after animation (don't create a new one)
    setTimeout(() => {
        bubble.remove();
    }, 600);
}

// Initialize bubbles when page loads
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();

    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Recreate bubbles on window resize
    window.addEventListener('resize', () => {
        const container = document.getElementById('bubblesContainer');
        if (container.children.length < 5) {
            createBubbles();
        }
    });
});

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const form = e.target;

    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Create mailto link (simple solution without backend)
    const mailtoLink = `mailto:hello@fairenoughaimeeluff.com?subject=Website%20Contact:%20${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `From: ${data.name} (${data.email})\n\n${data.message}`
    )}`;

    // Show success message
    formMessage.textContent = 'Thank you for reaching out! Your email client will open shortly.';
    formMessage.classList.add('success');
    formMessage.classList.remove('error');

    // Open email client
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 1000);

    // Reset form
    form.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success');
    }, 5000);
}

// Add subtle parallax effect to bubbles on mouse move
document.addEventListener('mousemove', (e) => {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        if (index % 3 === 0) {
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;
            bubble.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});