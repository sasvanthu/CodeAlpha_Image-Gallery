const carousel = document.getElementById('carouselContainer');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const carouselItems = Array.from(carousel.querySelectorAll('.carousel__item img'));

let currentIndex = 0;

// Open lightbox on image click
carouselItems.forEach((img, i) => {
  img.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = i;
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  lightboxImg.src = carouselItems[index].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
  carousel.style.animationPlayState = 'paused';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
  document.body.style.overflow = '';
  carousel.style.animationPlayState = 'running';
}

// Close on close button or clicking outside image
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard controls for lightbox
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  }
  else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    lightboxImg.src = carouselItems[currentIndex].src;
  }
  else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    lightboxImg.src = carouselItems[currentIndex].src;
  }
});

// Pause carousel spin on hover
carousel.addEventListener('mouseenter', () => {
  carousel.style.animationPlayState = 'paused';
});
carousel.addEventListener('mouseleave', () => {
  if (!lightbox.classList.contains('active')) {
    carousel.style.animationPlayState = 'running';
  }
});
