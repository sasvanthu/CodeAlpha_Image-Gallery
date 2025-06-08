document.addEventListener('DOMContentLoaded', () => {
    const carousel1 = document.getElementById('carousel1');
    const carousel2 = document.getElementById('carousel2');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close-button');
    const caption = document.querySelector('.caption');

    // --- IMPORTANT: Update this with the actual path to your logo ---
    const logoSrc = 'https://github.com/sasvanthu/CodeAlpha_Image-Gallery/blob/b7e5d9550969e4aca24cb5719668b9bd2f5879bd/image/images.png';
    document.querySelector('.gallery-logo').src = logoSrc;

    // Array of your image URLs
    // Replace these placeholder URLs with your actual image paths
    const images = [
        'https://via.placeholder.com/200/FF5733/FFFFFF?text=Image+1',
        'https://via.placeholder.com/200/33FF57/FFFFFF?text=Image+2',
        'https://via.placeholder.com/200/3357FF/FFFFFF?text=Image+3',
        'https://via.placeholder.com/200/FFFF33/000000?text=Image+4',
        'https://via.placeholder.com/200/FF33FF/FFFFFF?text=Image+5',
        'https://via.placeholder.com/200/33FFFF/000000?text=Image+6',
        'https://via.placeholder.com/200/FF0000/FFFFFF?text=Image+7',
        'https://via.placeholder.com/200/00FF00/FFFFFF?text=Image+8',
        'https://via.placeholder.com/200/0000FF/FFFFFF?text=Image+9',
        'https://via.placeholder.com/200/FFA500/FFFFFF?text=Image+10',
        'https://via.placeholder.com/200/800080/FFFFFF?text=Image+11',
        'https://via.placeholder.com/200/008080/FFFFFF?text=Image+12',
        'https://via.placeholder.com/200/FFC0CB/000000?text=Image+13',
        'https://via.placeholder.com/200/A52A2A/FFFFFF?text=Image+14',
        'https://via.placeholder.com/200/D2691E/FFFFFF?text=Image+15',
        'https://via.placeholder.com/200/4B0082/FFFFFF?text=Image+16',
        'https://github.com/sasvanthu/CodeAlpha_Image-Gallery/blob/3e202a72af43bd5777493176ff56cf1ad599e9ac/image/img%2017.jpeg',
        'https://via.placeholder.com/200/2F4F4F/FFFFFF?text=Image+18',
        'https://via.placeholder.com/200/006400/FFFFFF?text=Image+19',
        'https://via.placeholder.com/200/B22222/FFFFFF?text=Image+20'
    ];

    const totalImages = images.length;
    const imagesPerDeck = totalImages / 2;
    const rotationAngle = 360 / imagesPerDeck; // Angle between each image
    const carouselRadius = 150; // Half of the carousel-deck width/height (300px / 2)
    let currentImageIndex = 0; // For lightbox navigation

    function createCarousel(deckElement, startIndex) {
        for (let i = 0; i < imagesPerDeck; i++) {
            const img = document.createElement('img');
            img.src = images[startIndex + i];
            img.alt = `Gallery Image ${startIndex + i + 1}`;

            const angleRad = (i * rotationAngle) * (Math.PI / 180); // Convert angle to radians

            // Calculate x and z positions for a circular arrangement
            // x represents horizontal position, z represents depth
            const x = carouselRadius * Math.sin(angleRad);
            const z = carouselRadius * Math.cos(angleRad);

            // Position the image. The translate(-50%, -50%) from CSS ensures it's centered.
            // The rotateY makes the image face outwards from the center of the wheel.
            // The translateZ moves it to the edge of the circle.
            img.style.transform = `
                translateX(${x}px)
                translateZ(${z}px)
                rotateY(${-i * rotationAngle}deg) /* Rotate image itself to face viewer, counteracting wheel rotation */
            `;
            // Note: The `rotateY` applied here to the image helps keep its front facing roughly forward
            // relative to the viewer as the parent carousel spins. Adjust as needed for desired effect.


            deckElement.appendChild(img);

            // Add click listener for lightbox
            img.addEventListener('click', () => {
                openLightbox(startIndex + i);
            });
        }
    }

    // Populate the carousels
    createCarousel(carousel1, 0);
    createCarousel(carousel2, imagesPerDeck);

    let currentRotation1 = 0;
    let currentRotation2 = 0;
    const rotationSpeed = 0.3; // Adjust for desired rotation speed (degrees per frame)

    function rotateCarousels() {
        currentRotation1 += rotationSpeed; // First carousel rotates clockwise
        currentRotation2 -= rotationSpeed; // Second carousel rotates counter-clockwise

        carousel1.style.transform = `rotateY(${currentRotation1}deg)`;
        carousel2.style.transform = `rotateY(${currentRotation2}deg)`;

        requestAnimationFrame(rotateCarousels); // Continue animation
    }

    rotateCarousels(); // Start the rotation animation

    // Lightbox functionality
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = images[currentImageIndex];
        caption.textContent = `Image ${currentImageIndex + 1} of ${totalImages}`;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    closeButton.addEventListener('click', closeLightbox);

    // Close lightbox if clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') { // Only navigate if lightbox is open
            if (e.key === 'ArrowRight' || e.key === ' ') { // Right arrow or spacebar
                currentImageIndex = (currentImageIndex + 1) % totalImages;
                openLightbox(currentImageIndex);
            } else if (e.key === 'ArrowLeft') { // Left arrow
                currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
                openLightbox(currentImageIndex);
            } else if (e.key === 'Escape') { // Escape key
                closeLightbox();
            }
        }
    });
});
