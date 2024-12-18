document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://655f2b37879575426b44b8f7.mockapi.io/productss"; 
    const productList = document.getElementById("product-list");
    const wishlistItems = document.getElementById("wishlist-items");
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; 
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
                <button class="wishlist-btn" onclick="addToWishlist('${product.id}', '${product.name}', '${product.image}', ${product.price})">
                    Add to Wishlist
                </button>
            `;
            productList.appendChild(productElement);
        });
    }
    function addToWishlist(id, name, image, price) {
        const product = { id, name, image, price };
        if (!wishlist.some(item => item.id === id)) {
            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            displayWishlist();
        }
    }
    function displayWishlist() {
        wishlistItems.innerHTML = '';
        if (wishlist.length === 0) {
            wishlistItems.innerHTML = "<p>Your wishlist is empty.</p>";
        } else {
            wishlist.forEach(product => {
                const wishlistItem = document.createElement("div");
                wishlistItem.classList.add("wishlist-item");

                wishlistItem.innerHTML = `
                    <span>${product.name}</span>
                    <button class="remove-btn" onclick="removeFromWishlist('${product.id}')">Remove</button>
                `;
                wishlistItems.appendChild(wishlistItem);
            });
        }
    }
    function removeFromWishlist(id) {
        wishlist = wishlist.filter(item => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        displayWishlist();
    }
    displayWishlist();
});
