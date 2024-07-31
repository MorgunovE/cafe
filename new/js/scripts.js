// Script principal pour gérer les fonctionnalités de la page web
document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du DOM
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

    // Ajout d'un produit au panier
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
        });
    });

    // Affichage du modal du panier
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        disableScroll(); // Désactiver le défilement de la page
    });

    // Fonction pour vider le panier et réinitialiser le compteur
    function clearCart() {
        cart.items = [];
        cart.total = 0;
        cartItems = 0;
        cartCount.textContent = cartItems;
        updateCartDisplay(); // Mettre à jour l'affichage
    }

    // Mise à jour de l'événement du bouton de paiement
    payButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'block';
        clearCart(); // Vider le panier et réinitialiser le compteur
    });

    // Fermeture des modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
            enableScroll(); // Activer le défilement de la page
        });
    });

    // Retour aux modals précédents
    returnButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.style.display = 'none';
            enableScroll();     // Activer le défilement de la page
        });
    });

    // Gestion du diaporama
    const gallery = document.querySelector('.gallery_main-block');
    const images = document.querySelectorAll('.gallery_main-block img');
    const prevBtn = document.querySelector('.prev-btn_main-block');
    const nextBtn = document.querySelector('.next-btn_main-block');
    let currentIndex = 0;
    let slideInterval;

    // Affichage d'une diapositive spécifique
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

    // Démarrage du diaporama
    function startSlideShow() {
        slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 2000); // Change slide every 3 seconds
    }

    // Arrêt du diaporama
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Navigation dans le diaporama
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

    showSlide(currentIndex); // Afficher la première diapositive
    startSlideShow(); // Démarrer le diaporama

    // Liste des produits
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

    // Objet panier
    const cart = {
        items: [],
        total: 0
    };

    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
        const cartModal = document.querySelector('.cart-modal');
        cartModal.innerHTML = ''; // Vider les éléments actuels du panier

        if (cart.items.length === 0) {
            cartModal.innerHTML = '<p>Rien n\'a encore été commandé.</p>';
            cart.total = 0;
            payButton.disabled = true; // Désactiver le bouton de paiement
            payButton.classList.add('disabled'); // Ajouter le style désactivé
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
            payButton.disabled = false; // Activer le bouton de paiement
            payButton.classList.remove('disabled'); // Retirer le style désactivé
        }
        document.querySelector('.total-price').textContent = cart.total.toFixed(2);
    }

    // Vérification initiale pour désactiver le bouton de paiement si le panier est vide
    if (cart.items.length === 0) {
        payButton.disabled = true;
        payButton.classList.add('disabled');
    }

    // Fonction pour ajouter un produit au panier
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.items.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.items.push({ ...product, quantity: 1 });
        }
        cart.total += product.price;
        updateCartDisplay(); // Mettre à jour l'affichage
        animateCartIcon(); // Déclencher l'animation
    }

    // Fonction pour retirer un produit du panier
    function removeFromCart(productId) {
        const cartItem = cart.items.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity--;
            cart.total -= cartItem.price;
            if (cartItem.quantity === 0) {
                cart.items = cart.items.filter(item => item.id !== productId);
            }
            updateCartDisplay(); // Mettre à jour l'affichage
            animateCartIcon(); // Déclencher l'animation
        }
    }

    // Écouteurs d'événements pour les boutons de commande
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.id.replace('order', ''));
            addToCart(productId);
        });
    });

    // Écouteurs d'événements pour les boutons d'ajout et de suppression
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

    // Fonction pour déclencher l'animation de l'icône du panier
    function animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('animate');
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 2000);
    }

    // Validation du formulaire de contact
    document.querySelector('.submit-btn').addEventListener('click', (e) => {

        let isValid = true;

        // Effacer les styles d'erreur précédents
        [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('invalid');
        });

        // Valider le nom
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            isValid = false;
        }

        // Valider le téléphone (regex simple pour la démonstration)
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneInput.classList.add('invalid');
            isValid = false;
        }

        // Valider l'email (regex simple pour la démonstration)
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
            disableScroll();
            [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
                input.value = '';});
        }
    });

    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav-mobile');
    const menuLinks = document.querySelectorAll('.menu-nav-mobile a');

    // Ajout d'un écouteur d'événements pour le bouton de menu
    menuToggle.addEventListener('click', () => {
        menuNav.classList.toggle('expanded');
        menuToggle.classList.toggle('expanded');
    });

    // Ajout d'un écouteur d'événements pour les liens du menu
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuNav.classList.remove('expanded');
            menuToggle.classList.remove('expanded');
        });
    });

    // Fonction pour désactiver le défilement
    function disableScroll() {
        document.body.classList.add('no-scroll');
    }

    // Fonction pour activer le défilement
    function enableScroll() {
        document.body.classList.remove('no-scroll');
    }

    // Gestion des modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                enableScroll();
            }
        });
    });

    // Défilement fluide pour les liens de navigation
    const navLinks = document.querySelectorAll('.menu-nav a, .menu-nav-mobile a, .menu-bar a, .offer-block a');

    // Ajout d'un écouteur d'événements pour chaque lien de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });



});
