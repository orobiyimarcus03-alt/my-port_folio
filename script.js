// Select the mobile menu elements.
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');

// Toggle the mobile navigation when the menu button is clicked.
if (mobileMenu && menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu when a nav link is clicked.
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close the menu if the user clicks outside of it.
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Select the custom cursor elements.
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

// Keep the custom cursor only for desktop devices with a fine pointer.
if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Move the glowing dot to the cursor position.
    const updateCursor = (x, y) => {
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;
        cursorDot.style.opacity = '1';
    };

    // Track the mouse movement and update the position of the custom cursor.
    document.addEventListener('pointermove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        updateCursor(mouseX, mouseY);
    });

    // Shrink the cursor slightly during click interaction.
    document.addEventListener('pointerdown', () => {
        cursorDot.classList.add('active');
        cursorRing.classList.add('active');
    });

    document.addEventListener('pointerup', () => {
        cursorDot.classList.remove('active');
        cursorRing.classList.remove('active');
    });

    // Expand the cursor ring when hovering interactive elements.
    document.querySelectorAll('a, button, img').forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });

    // Smoothly follow the pointer with the outer ring.
    const animateRing = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        cursorRing.style.opacity = '1';

        requestAnimationFrame(animateRing);
    };

    updateCursor(mouseX, mouseY);
    requestAnimationFrame(animateRing);
}