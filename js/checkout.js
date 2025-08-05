document.addEventListener('DOMContentLoaded', () => {
    const summaryItemsContainer = document.getElementById('summary-items-container');
    const summaryTotalPrice = document.getElementById('summary-total-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));

    if (cart && cart.length > 0) {
        displayOrderSummary(cart);
    } else {
        summaryItemsContainer.innerHTML = '<p>Your cart is empty. <a href="menu.html">Go back to menu</a>.</p>';
        document.querySelector('.btn-place-order').disabled = true;
    }

    function displayOrderSummary(cartItems) {
        summaryItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach(item => {
            const itemHTML = `
                <div class="summary-item">
                    <div class="summary-item-info">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="summary-item-price">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            `;
            summaryItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            totalPrice += item.price * item.quantity;
        });
        summaryTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Handle form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create an object with the customer and order details
        const orderDetails = {
            customer: {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                pickupTime: document.getElementById('pickup-time').value,
            },
            cart: cart,
            orderNumber: Date.now() // Simple unique order number
        };

        // Save the complete order to localStorage
        localStorage.setItem('pizzaOrderConfirmation', JSON.stringify(orderDetails));
        
        // Clear the old cart
        localStorage.removeItem('pizzaCart');
        
        // Redirect to the confirmation page
        window.location.href = 'confirmation.html';
    });
});