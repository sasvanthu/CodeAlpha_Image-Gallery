const carousel = document.getElementById('carouselContainer');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const carouselItems = Array.from(carousel.querySelectorAll('.carousel__item img'));

let currentIndex = 0;

// Position items in 3D circle
const totalItems = carouselItems.length;
const angle = 360 / totalItems;
carouselItems.forEach((img, i) => {
  img.parentElement.style.transform = `rotateY(${angle * i}deg) translateZ(400px)`;
});

// Open lightbox
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
  document.body.style.overflow = 'hidden';
  carousel.style.animationPlayState = 'paused';
}

// Close lightbox with animation
function closeLightbox() {
  lightbox.classList.add('closing');
  setTimeout(() => {
    lightbox.classList.remove('active', 'closing');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    carousel.style.animationPlayState = 'running';
  }, 300);
}

// Close on button or background
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    openLightbox(currentIndex);
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    openLightbox(currentIndex);
  }
});
