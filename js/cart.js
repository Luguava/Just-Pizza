document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT SELECTION ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartContainer = document.querySelector('.cart-container');
    const cartBody = document.querySelector('.cart-body');
    const cartItemCount = document.querySelector('.cart-item-count');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const clearCartBtn = document.querySelector('.btn-clear-cart');
    const checkoutBtn = document.querySelector('.btn-checkout');

    // --- CART STATE ---
    let cart = [];

    // --- EVENT LISTENERS ---

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            addItemToCart(menuItem);
        });
    });
    
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
        cartContainer.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            localStorage.setItem('pizzaCart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        } else {
            alert("Your cart is empty!");
        }
    });

    cartBody.addEventListener('click', (e) => {
        const target = e.target;
        const cartItemId = target.closest('.cart-item')?.dataset.id;
        if (!cartItemId) return;

        if (target.classList.contains('quantity-increase')) {
            changeItemQuantity(cartItemId, 1);
        } else if (target.classList.contains('quantity-decrease')) {
            changeItemQuantity(cartItemId, -1);
        } else if (target.classList.contains('remove-item-btn')) {
            removeItemFromCart(cartItemId);
        }
    });

    // --- FUNCTIONS ---

    /**
     * Validates selections and adds an item to the cart.
     * @param {HTMLElement} menuItem - The menu item card element.
     */
    function addItemToCart(menuItem) {
        const sizeEl = menuItem.querySelector('.pizza-size');
        const crustEl = menuItem.querySelector('.pizza-crust');
        const errorMessageEl = menuItem.querySelector('.error-message');

        const size = sizeEl.value;
        const crust = crustEl.value;

        // Validation: Check if size and crust are selected
        if (!size || !crust) {
            showError(errorMessageEl, 'Please select size and crust.');
            return; // Stop the function if validation fails
        }
        
        // If validation passes, clear any existing error message
        hideError(errorMessageEl);

        // Show the cart if it's hidden
        if (cartContainer.classList.contains('hidden')) {
            cartContainer.classList.remove('hidden');
        }

        const name = menuItem.querySelector('h3').textContent;
        const price = parseFloat(menuItem.querySelector('.price').dataset.price);
        const image = menuItem.querySelector('img').src;
        
        // Create a unique ID for the cart item based on its options
        const cartItemId = `${name}-${size}-${crust}`;

        const existingItem = cart.find(item => item.id === cartItemId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ 
                id: cartItemId,
                name: `${name} (${size}", ${crust})`, 
                price: price, 
                image: image, 
                quantity: 1 
            });
        }

        updateCart();
        showAddedToCartFeedback(menuItem.querySelector('.add-to-cart-btn'));
    }
    
    /**
     * Displays an error message in the specified element.
     * @param {HTMLElement} element - The element to display the error in.
     * @param {string} message - The error message.
     */
    function showError(element, message) {
        element.textContent = message;
    }

    /**
     * Hides the error message from the specified element.
     * @param {HTMLElement} element - The element to hide the error from.
     */
    function hideError(element) {
        element.textContent = '';
    }

    /**
     * Re-renders the entire cart UI based on the current cart array state.
     */
    function updateCart() {
        cartBody.innerHTML = '';
        cart.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-increase">+</button>
                    </div>
                    <ion-icon name="trash-outline" class="remove-item-btn"></ion-icon>
                </div>
            `;
            cartBody.insertAdjacentHTML('beforeend', cartItemHTML);
        });
        updateCartTotals();
    }
    
    /**
     * Calculates and updates the total price and item count badge.
     */
    function updateCartTotals() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartItemCount.textContent = totalItems;
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function changeItemQuantity(id, amount) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                removeItemFromCart(id);
            } else {
                updateCart();
            }
        }
    }

    function removeItemFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
        
        if (cart.length === 0) {
            cartContainer.classList.add('hidden');
        }
    }
    
    function showAddedToCartFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.backgroundColor = 'var(--black)';
        button.style.color = 'var(--themeyellow)';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 1000);
    }
});