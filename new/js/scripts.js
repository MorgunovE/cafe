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
});
