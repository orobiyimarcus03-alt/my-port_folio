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
    let animationFrame = null;
    let hasMoved = false;

    const updateCursor = (element, x, y) => {
        element.style.setProperty('--cursor-x', `${x}px`);
        element.style.setProperty('--cursor-y', `${y}px`);
        element.style.opacity = '1';
    };

    const animateRing = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        updateCursor(cursorRing, ringX, ringY);

        if (Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1) {
            ringX = mouseX;
            ringY = mouseY;
            updateCursor(cursorRing, ringX, ringY);
            animationFrame = null;
            return;
        }

        animationFrame = requestAnimationFrame(animateRing);
    };

    // Track the mouse movement and update the position of the custom cursor.
    document.addEventListener('pointermove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        updateCursor(cursorDot, mouseX, mouseY);

        if (!hasMoved) {
            ringX = mouseX;
            ringY = mouseY;
            updateCursor(cursorRing, ringX, ringY);
            hasMoved = true;
            return;
        }

        if (animationFrame === null) {
            animationFrame = requestAnimationFrame(animateRing);
        }
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
}