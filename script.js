document.addEventListener('DOMContentLoaded', () => {More actions
    const carousel1 = document.getElementById('carousel1');
    const carousel2 = document.getElementById('carousel2');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close-button');
    const caption = document.querySelector('.caption');

    // --- IMPORTANT: Update this with the actual RAW or GITHUB PAGES URL for your logo ---
    // Example using GitHub Pages permalink:
    const logoSrc = 'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/images.png';
    // Example using GitHub Raw content URL:
    // const logoSrc = 'https://raw.githubusercontent.com/sasvanthu/CodeAlpha_Image-Gallery/main/image/images.png';
    document.querySelector('.gallery-logo').src = logoSrc;

    // Array of your image URLs
    // REPLACE ALL THESE URLs with your actual RAW or GITHUB PAGES image links
    const images = [
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img1.jpg', // Corrected example for Image 1
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img2.png', // Corrected example for Image 2
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img3.jpg', // Corrected example for Image 3
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img4.jpg', // Corrected example for Image 4
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img5.jpeg', // Corrected example for Image 5
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img6.jpeg', // Assuming you have img6.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img7.jpeg', // Assuming you have img7.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img8.jpeg', // Assuming you have img8.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img9.jpeg', // Assuming you have img9.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img10.jpeg', // Assuming you have img10.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img11.jpeg', // Assuming you have img11.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img12.jpeg', // Assuming you have img12.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img13.jpeg', // Assuming you have img13.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img14.jpeg', // Assuming you have img14.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img15.jpeg', // Assuming you have img15.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img16.jpeg', // Assuming you have img16.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img17.jpg', // Corrected example for Image 17
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img18.jpeg', // Assuming you have img18.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img19.jpeg', // Assuming you have img19.png
        'https://sasvanthu.github.io/CodeAlpha_Image-Gallery/image/img20.jpeg'  // Assuming you have img20.png
    ];

    const totalImages = images.length;
    const imagesPerDeck = totalImages / 2;
    const rotationAngle = 360 / imagesPerDeck;
    const carouselRadius = 150;
    let currentImageIndex = 0;

    function createCarousel(deckElement, startIndex) {
        for (let i = 0; i < imagesPerDeck; i++) {
            const img = document.createElement('img');
            img.src = images[startIndex + i];
            img.alt = `Gallery Image ${startIndex + i + 1}`;

            const angleRad = (i * rotationAngle) * (Math.PI / 180);

            const x = carouselRadius * Math.sin(angleRad);
            const z = carouselRadius * Math.cos(angleRad);

            img.style.transform = `
                translateX(${x}px)
                translateZ(${z}px)
                rotateY(${-i * rotationAngle}deg)
            `;

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
    const rotationSpeed = 0.3;

    function rotateCarousels() {
        currentRotation1 += rotationSpeed;
        currentRotation2 -= rotationSpeed;

        carousel1.style.transform = `rotateY(${currentRotation1}deg)`;
        carousel2.style.transform = `rotateY(${currentRotation2}deg)`;

        requestAnimationFrame(rotateCarousels);
    }

    rotateCarousels();

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

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                currentImageIndex = (currentImageIndex + 1) % totalImages;
                openLightbox(currentImageIndex);
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
                openLightbox(currentImageIndex);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});
