// Carousel functionality for portfolio page
class PortfolioCarousel {
    constructor() {
        this.photosByAddress = {
            '270palisades': [
                { src: 'carousel_photos/270palisades_living.jpg', alt: 'Professional Home Staging - Palisades Living Room Design' }
            ],
            '2298midwick': [
                { src: 'carousel_photos/2298midwick_living.jpeg', alt: 'Professional Home Staging - Midwick Living Room Design' },
                { src: 'carousel_photos/2298midwick_dining.jpeg', alt: 'Modern Home Staging - Midwick Dining Area' },
                { src: 'carousel_photos/2298midwick_bed.jpeg', alt: 'Elegant Home Staging - Midwick Bedroom Suite' },
                { src: 'carousel_photos/2298midwick_patio.jpeg', alt: 'Beautiful Home Staging - Midwick Patio and Outdoor Space' }
            ],
            '2308Galbreth': [
                { src: 'carousel_photos/2308Galbreth_Living1.jpg', alt: 'Elegant Home Staging - Galbreth Living Room' },
                { src: 'carousel_photos/2308Galbreth_Living2.jpg', alt: 'Modern Home Staging - Galbreth Living Area' },
                { src: 'carousel_photos/2308Galbreth_Living3.jpg', alt: 'Professional Home Staging - Galbreth Living Space' },
                { src: 'carousel_photos/2308Galbreth_living.jpg', alt: 'Beautiful Home Staging - Galbreth Living Room View' },
                { src: 'carousel_photos/2308Galbreth_Dining.jpg', alt: 'Elegant Home Staging - Galbreth Dining Room' },
                { src: 'carousel_photos/2308Galbreth_Dining (1).jpg', alt: 'Modern Home Staging - Galbreth Dining Area View 1' },
                { src: 'carousel_photos/2308Galbreth_Dining (2).jpg', alt: 'Professional Home Staging - Galbreth Dining Area View 2' },
                { src: 'carousel_photos/2308Galbreth_dining2.jpg', alt: 'Beautiful Home Staging - Galbreth Dining Space' },
                { src: 'carousel_photos/2308Galbreth_Kitchen1.jpg', alt: 'Modern Home Staging - Galbreth Kitchen Design' },
                { src: 'carousel_photos/2308Galbreth_Kitchen2.jpg', alt: 'Professional Home Staging - Galbreth Kitchen View 2' },
                { src: 'carousel_photos/2308Galbreth_Kitchen3.jpg', alt: 'Elegant Home Staging - Galbreth Kitchen View 3' },
                { src: 'carousel_photos/2308Galbreth_Kitchen4.jpg', alt: 'Beautiful Home Staging - Galbreth Kitchen View 4' },
                { src: 'carousel_photos/2308Galbreth_Kitchen5.jpg', alt: 'Modern Home Staging - Galbreth Kitchen View 5' },
                { src: 'carousel_photos/2308Galbreth_Kitchen6.jpg', alt: 'Professional Home Staging - Galbreth Kitchen View 6' },
                { src: 'carousel_photos/2308Galbreth_Family1.jpg', alt: 'Elegant Home Staging - Galbreth Family Room' },
                { src: 'carousel_photos/2308Galbreth_Family2.jpg', alt: 'Beautiful Home Staging - Galbreth Family Area View 2' },
                { src: 'carousel_photos/2308Galbreth_Family3.jpg', alt: 'Modern Home Staging - Galbreth Family Space View 3' }
            ]
        };
        
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.totalSlides = 0;
        this.autoAdvanceInterval = null;
    }

    // Shuffle array function using Fisher-Yates algorithm
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Create carousel slides based on address grouping
    createCarouselSlides() {
        const carouselTrack = document.getElementById('carouselTrack');
        if (!carouselTrack) return;
        
        const addresses = Object.keys(this.photosByAddress);
        const shuffledAddresses = this.shuffleArray(addresses);
        let slideIndex = 0;
        
        shuffledAddresses.forEach((address) => {
            const photos = this.shuffleArray(this.photosByAddress[address]);
            
            if (photos.length === 1) {
                // Single photo display
                const slide = document.createElement('div');
                slide.className = slideIndex === 0 ? 'carousel-slide active' : 'carousel-slide';
                slide.innerHTML = `
                    <img src="${photos[0].src}" alt="${photos[0].alt}" class="carousel-image single-photo" loading="lazy">
                `;
                carouselTrack.appendChild(slide);
                slideIndex++;
            } else {
                // Multiple slides with 2x2 grids (4 photos per slide)
                for (let i = 0; i < photos.length; i += 4) {
                    const slidePhotos = photos.slice(i, i + 4);
                    const slide = document.createElement('div');
                    slide.className = slideIndex === 0 ? 'carousel-slide active' : 'carousel-slide';
                    
                    if (slidePhotos.length === 4) {
                        // Full 2x2 grid
                        slide.innerHTML = `
                            <div class="photo-grid">
                                ${slidePhotos.map(photo => `
                                    <img src="${photo.src}" alt="${photo.alt}" class="grid-image" loading="lazy">
                                `).join('')}
                            </div>
                        `;
                    } else {
                        // Partial grid for remaining photos
                        slide.innerHTML = `
                            <div class="photo-grid partial-grid-${slidePhotos.length}">
                                ${slidePhotos.map(photo => `
                                    <img src="${photo.src}" alt="${photo.alt}" class="grid-image" loading="lazy">
                                `).join('')}
                            </div>
                        `;
                    }
                    
                    carouselTrack.appendChild(slide);
                    slideIndex++;
                }
            }
        });
    }

    // Create navigation indicators
    createIndicators() {
        const indicatorContainer = document.getElementById('carouselIndicators');
        if (!indicatorContainer) return;
        
        let totalSlides = 0;
        
        // Calculate total number of slides
        Object.values(this.photosByAddress).forEach(photos => {
            if (photos.length === 1) {
                totalSlides += 1;
            } else {
                totalSlides += Math.ceil(photos.length / 4);
            }
        });
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = i === 0 ? 'indicator active' : 'indicator';
            indicator.onclick = () => this.goToSlide(i);
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicatorContainer.appendChild(indicator);
        }
    }

    // Initialize carousel
    initializeCarousel() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        this.setupTouchEvents();
        this.startAutoAdvance();
    }

    // Show specific slide function
    showSlide(index) {
        // Remove active class from all slides and indicators
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (this.slides[index]) this.slides[index].classList.add('active');
        if (this.indicators[index]) this.indicators[index].classList.add('active');
    }

    // Navigate between photos
    changePhoto(direction) {
        this.currentSlide += direction;
        
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        } else if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        
        this.showSlide(this.currentSlide);
    }

    // Go to specific slide
    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
    }

    // Start auto-advance
    startAutoAdvance() {
        this.stopAutoAdvance(); // Clear any existing interval
        this.autoAdvanceInterval = setInterval(() => {
            if (this.slides && this.slides.length > 0) {
                this.changePhoto(1);
            }
        }, 5000);
    }

    // Stop auto-advance
    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }

    // Setup touch/swipe support
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        const carousel = document.querySelector('.carousel-wrapper');
        if (!carousel) return;
        
        // Handle touch start
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        // Handle touch end and determine swipe direction
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    // Process swipe gesture
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.changePhoto(1); // Swipe left - next photo
            } else {
                this.changePhoto(-1); // Swipe right - previous photo
            }
        }
    }

    // Initialize everything
    init() {
        this.createCarouselSlides();
        this.createIndicators();
        this.initializeCarousel();
    }

    // Cleanup when leaving page
    destroy() {
        this.stopAutoAdvance();
    }
}

// Global functions for backward compatibility
window.changePhoto = function(direction) {
    if (window.portfolioCarousel) {
        window.portfolioCarousel.changePhoto(direction);
    }
};

// Export for use in layout manager
window.PortfolioCarousel = PortfolioCarousel;