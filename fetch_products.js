document.addEventListener('DOMContentLoaded', function () {
    fetch('fetch_products.php')
        .then(response => response.json())
        .then(data => {
            const productHistoryBody = document.getElementById('product-history-body');
            productHistoryBody.innerHTML = ''; // Clear existing content
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.product_name}</td>
                    <td>$${product.price}</td>
                    <td>${product.description}</td>
                    <td><img src="${product.image_url}" alt="${product.product_name}" width="100"></td>
                    <td>
                        <button onclick="editProduct(${product.id}, '${product.product_name}', ${product.price}, '${product.description}', '${product.image_url}')">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                productHistoryBody.appendChild(row);
            });
        });
});

function editProduct(id, name, price, description, image) {
    document.getElementById('product_id').value = id;
    document.getElementById('product_name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('description').value = description;
    // Optionally, you can show the image or set a placeholder
}

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        fetch('delete_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${id}`,
        })
        .then(response => response.text())
        .then(() => {
            alert('Product deleted successfully');
            location.reload(); // Refresh the page to see changes
        });
    }
}

