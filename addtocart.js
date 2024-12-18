document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://655f2b37879575426b44b8f7.mockapi.io/productss"; 
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || []; 
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    function displayProducts(products) {
        productList.innerHTML = ''; 
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', '${product.image}', ${product.price})">
                    Add to Cart
                </button>
            `;
            productList.appendChild(productElement);
        });
    }
    function addToCart(id, name, image, price) {
        const product = { id, name, image, price };
        const existingProductIndex = cart.findIndex(item => item.id === id);

        if (existingProductIndex === -1) {
            cart.push({ ...product, quantity: 1 });
        } else {
            cart[existingProductIndex].quantity += 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
    function displayCart() {
        cartItems.innerHTML = ''; 
        let total = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        }
    }
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
    function checkout() {
        alert("Proceeding to checkout...");
        console.log(cart);
    }
    displayCart();
});
