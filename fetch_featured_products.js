
document.addEventListener('DOMContentLoaded', function () {
    fetch('fetch_products.php')
        .then(response => response.json())
        .then(data => {
            const featuredProductsList = document.getElementById('featured-products-list');
            data.forEach(product => {
                const listItem = document.createElement('li');
                listItem.classList.add('scrollbar-item');
                listItem.innerHTML = `
                    <div class="product-card text-center">
                        <div class="card-banner">
                            <figure class="product-banner img-holder" style="--width: 448; --height: 470;">
                                <img src="${product.image_url}" width="448" height="470" loading="lazy" alt="${product.product_name}" class="img-cover">
                            </figure>
                            <a href="#" class="btn product-btn" onclick="addToCart(${product.id}, '${product.product_name}', ${product.price})">
                                <ion-icon name="bag" aria-hidden="true"></ion-icon>
                                <span class="span">Add To Cart</span>
                            </a>
                        </div>
                        <div class="card-content">
                            <h3 class="h4 title">
                                <a href="#" class="card-title">${product.product_name}</a>
                            </h3>
                            <span class="price">$${product.price}</span>
                        </div>
                    </div>
                `;
                featuredProductsList.appendChild(listItem);
            });
        });
});

function addToCart(id, name, price) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cartItems.push({ id, name, price, quantity: 1 }); // Add new item to cart
    }

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Save cart to localStorage
    alert(`${name} has been added to your cart!`);
}


