function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageName).classList.add('active');
    window.scrollTo(0, 0);
    document.getElementById('cart-sidebar').classList.remove('open');
    
    if (pageName === 'checkout') {
        updateCheckoutSummary();
    }
}

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!checkoutItems) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutTax.textContent = `$${tax.toFixed(2)}`;
    checkoutTotal.textContent = `$${total.toFixed(2)}`;

    checkoutItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-info">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div style="font-weight: 600; font-size: 15px;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function selectPaymentMethod(element) {
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    element.classList.add('selected');
}

function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return false;
    }

    const orderNumber = 'DL-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const orderDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 9.99 + (subtotal * 0.08);

    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-date').textContent = orderDate;
