document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the confirmed order from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('pizzaOrderConfirmation'));

    if (orderDetails) {
        // --- Populate Customer Details ---
        document.getElementById('order-number').textContent = orderDetails.orderNumber;
        document.getElementById('customer-name').textContent = orderDetails.customer.name;
        document.getElementById('customer-email').textContent = orderDetails.customer.email;
        document.getElementById('customer-phone').textContent = orderDetails.customer.phone;
        document.getElementById('customer-pickup-time').textContent = orderDetails.customer.pickupTime;

        // --- Populate Order Summary ---
        const finalItemsContainer = document.getElementById('final-summary-items');
        const finalTotalPriceEl = document.getElementById('final-total-price');
        let totalPrice = 0;

        orderDetails.cart.forEach(item => {
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
            finalItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            totalPrice += item.price * item.quantity;
        });

        finalTotalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;

        // Clear the order from storage so it doesn't show again on refresh
        localStorage.removeItem('pizzaOrderConfirmation');
    } else {
        // If no order is found, display a message
        const confirmationContainer = document.querySelector('.confirmation-container');
        confirmationContainer.innerHTML = '<h1>No Order Found</h1><p>Please go to our menu to start a new order.</p><a href="menu.html" class="btn-back-to-menu">Go to Menu</a>';
    }
});