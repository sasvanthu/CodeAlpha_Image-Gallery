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
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img1.png', // Corrected example for Image 1
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img2.png', // Corrected example for Image 2
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img3.jpg', // Corrected example for Image 3
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img4.jpg', // Corrected example for Image 4
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img5.png', // Corrected example for Image 5
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img6.png', // Assuming you have img6.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img7.png', // Assuming you have img7.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img8.png', // Assuming you have img8.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img9.png', // Assuming you have img9.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img10.png', // Assuming you have img10.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img11.png', // Assuming you have img11.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img12.png', // Assuming you have img12.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img13.png', // Assuming you have img13.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img14.png', // Assuming you have img14.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img15.png', // Assuming you have img15.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img16.png', // Assuming you have img16.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img17.jpeg', // Corrected example for Image 17
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img18.png', // Assuming you have img18.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img19.png', // Assuming you have img19.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img20.png'  // Assuming you have img20.png
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
