// Select elements
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;

// Show image in lightbox by index
function showImage(index) {
  currentIndex = index;
  const img = galleryItems[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
}

// Show next image
function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showImage(currentIndex);
}

// Show previous image
function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage(currentIndex);
}

// Event listeners on gallery images to open lightbox
galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => {
    showImage(index);
  });
});

// Close button click
closeBtn.addEventListener('click', closeLightbox);

// Next / Prev button clicks
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') {
    showNext();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Filtering gallery by category
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(img => {
      const item = img.parentElement;
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
