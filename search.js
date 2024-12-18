document.getElementById("search-button").addEventListener("click", searchProducts);
function searchProducts() {
    const searchQuery = document.getElementById("search").value;
    const apiUrl = "https://655f2b37879575426b44b8f7.mockapi.io/productss"; 
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            displayResults(filteredProducts);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayResults(products) {
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = ''; 
    if (products.length > 0) {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
            `;
            resultsDiv.appendChild(productElement);
        });
    } else {
        resultsDiv.innerHTML = "<p>No products found</p>";
    }
}
