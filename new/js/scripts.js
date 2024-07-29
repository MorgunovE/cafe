// Add to scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cart-modal');
    const paymentModal = document.getElementById('payment-modal');
    const thankYouModal = document.getElementById('thank-you-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    const returnButtons = document.querySelectorAll('.return-btn');
    const payButton = document.querySelector('.pay-btn');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
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

    // Function to clear the cart and reset the counter
    function clearCart() {
        cart.items = [];
        cart.total = 0;
        cartItems = 0;
        cartCount.textContent = cartItems;
        updateCartDisplay();
    }

    // Update payButton event listener
    payButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'block';
        clearCart(); // Clear the cart and reset the counter
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
        });
    });

    returnButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
        });
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

    // List of products
    const products = [
        { id: 1, name: 'Café', price: 3 },
        { id: 2, name: 'Thé', price: 2.5 },
        { id: 3, name: 'Chocolat chaud', price: 3.5 },
        { id: 4, name: 'Croissant', price: 1.5 },
        { id: 5, name: 'Tarte aux pommes', price: 3 },
        { id: 6, name: 'Muffin au chocolat', price: 2.5 },
        { id: 7, name: 'Special offer #1', price: 10.99 },
        { id: 8, name: 'Special offer #2', price: 9.99 },
        { id: 9, name: 'Special offer #3', price: 5.99 }
    ];

    // Cart object
    const cart = {
        items: [],
        total: 0
    };

    // Function to update cart display
    function updateCartDisplay() {
        const cartModal = document.querySelector('.cart-modal');
        cartModal.innerHTML = ''; // Clear current cart items

        if (cart.items.length === 0) {
            cartModal.innerHTML = '<p>Rien n\'a encore été commandé.</p>';
            cart.total = 0;
            payButton.disabled = true; // Disable pay button
            payButton.classList.add('disabled'); // Add disabled style
        } else {
            cart.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <p class="name_cart-item">${item.name}</p>
                    <p class="price_cart-item">${item.price}$</p>
                    <button class="remove-btn" data-id="${item.id}"> - </button>
                    <p class="count_cart-item">${item.quantity}</p>
                    <button class="add-btn" data-id="${item.id}"> + </button>
                `;
                cartModal.appendChild(cartItem);
            });
            payButton.disabled = false; // Enable pay button
            payButton.classList.remove('disabled'); // Remove disabled style
        }
        document.querySelector('.total-price').textContent = cart.total.toFixed(2);
    }

    // Initial check to disable pay button if cart is empty
    if (cart.items.length === 0) {
        payButton.disabled = true;
        payButton.classList.add('disabled');
    }

    // Function to add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.items.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.items.push({ ...product, quantity: 1 });
        }
        cart.total += product.price;
        updateCartDisplay();
        animateCartIcon(); // Trigger animation
    }

    // Function to remove product from cart
    function removeFromCart(productId) {
        const cartItem = cart.items.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity--;
            cart.total -= cartItem.price;
            if (cartItem.quantity === 0) {
                cart.items = cart.items.filter(item => item.id !== productId);
            }
            updateCartDisplay();
            animateCartIcon(); // Trigger animation
        }
    }

    // Event listeners for order buttons
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.id.replace('order', ''));
            addToCart(productId);
        });
    });

    // Event listeners for add and remove buttons
    document.querySelector('.cart-modal').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-btn')) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId);
            cartItems++;
        } else if (event.target.classList.contains('remove-btn')) {
            const productId = parseInt(event.target.dataset.id);
            removeFromCart(productId);
            cartItems--;
        }
        cartCount.textContent = cartItems;
    });

    // Function to trigger cart icon animation
    function animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('animate');
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 2000);
    }

    document.querySelector('.submit-btn').addEventListener('click', (e) => {

        let isValid = true;

        // Clear previous error styles
        [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('invalid');
        });

        // Validate name
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            isValid = false;
        }

        // Validate phone (simple regex for demonstration)
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneInput.classList.add('invalid');
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault();
            thankYouModal.style.display = 'block';
            [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
                input.value = '';});
        }
    });

});
