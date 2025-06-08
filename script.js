document.addEventListener('DOMContentLoaded', () => {
    const carousel1 = document.getElementById('carousel1');
    const carousel2 = document.getElementById('carousel2');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close-button');
    const caption = document.querySelector('.caption');

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
        'https://via.placeholder.com/200/8B0000/FFFFFF?text=Image+17',
        'https://via.placeholder.com/200/2F4F4F/FFFFFF?text=Image+18',
        'https://via.placeholder.com/200/006400/FFFFFF?text=Image+19',
        'https://via.placeholder.com/200/B22222/FFFFFF?text=Image+20'
    ];

    const totalImages = images.length;
    const imagesPerDeck = totalImages / 2;
    const rotationAngle = 360 / imagesPerDeck;
    let currentImageIndex = 0; // For lightbox navigation

    function createCarousel(deckElement, startIndex) {
        for (let i = 0; i < imagesPerDeck; i++) {
            const img = document.createElement('img');
            img.src = images[startIndex + i];
            img.alt = `Gallery Image ${startIndex + i + 1}`;
            const angle = i * rotationAngle;
            img.style.transform = `rotateY(${angle}deg) translateZ(250px)`; // Adjust translateZ for depth
            deckElement.appendChild(img);

            img.addEventListener('click', () => {
                openLightbox(startIndex + i);
            });
        }
    }

    createCarousel(carousel1, 0);
    createCarousel(carousel2, imagesPerDeck);

    let currentRotation1 = 0;
    let currentRotation2 = 0;

    function rotateCarousels() {
        currentRotation1 += 0.2; // Adjust speed
        currentRotation2 -= 0.2; // Adjust speed, rotate in opposite direction
        carousel1.style.transform = `rotateY(${currentRotation1}deg)`;
        carousel2.style.transform = `rotateY(${currentRotation2}deg)`;
        requestAnimationFrame(rotateCarousels);
    }

    rotateCarousels();

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

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
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
