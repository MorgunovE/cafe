// Add to scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cart-modal');
    const paymentModal = document.getElementById('payment-modal');
    const thankYouModal = document.getElementById('thank-you-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    const payButton = document.querySelector('.pay-btn');
    let cartItems = 0;

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
        });
    });

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    payButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
        });
    });

    document.querySelector('.submit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        thankYouModal.style.display = 'block';
    });

    const gallery = document.querySelector('.gallery_main-block');
    const images = document.querySelectorAll('.gallery_main-block img');
    const prevBtn = document.querySelector('.prev-btn_main-block');
    const nextBtn = document.querySelector('.next-btn_main-block');
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }
        gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startSlideShow() {
        slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 2000); // Change slide every 3 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        showSlide(currentIndex - 1);
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        showSlide(currentIndex + 1);
        startSlideShow();
    });

    showSlide(currentIndex);
    startSlideShow();
});
