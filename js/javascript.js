// Détails du produit
function productDetails(event) {
    const clickedProduct = event.currentTarget; 

    const productImage = clickedProduct.getElementsByTagName('img')[0]; 
    const productTitle = clickedProduct.getElementsByTagName('h4')[0]; 
    const productPrice = clickedProduct.getAttribute('data-price'); 

    if (productImage) {
        const imageSrc = productImage.src; 
        localStorage.setItem('productImageSrc', imageSrc);
    }
    if (productTitle) {
        localStorage.setItem('productTitle', productTitle.innerText);
    }
    if (productPrice) {
        localStorage.setItem('productPrice', productPrice);
    }
    console.log("test")

    // Redirection vers la page des détails
    window.location.href = "product-detail.html"; 
}

// Ajouter des écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes("product-detail.html")) {
        const storedImageSrc = localStorage.getItem('productImageSrc');
        const productTitle = localStorage.getItem('productTitle');
        const productPrice = localStorage.getItem('productPrice');

        const imageDetailed = document.getElementById('product-img');
        const titleDetailed = document.getElementById('detailed_prodect_title');
        const priceDetailed = document.getElementById('detailed_prodect_price');

        if (imageDetailed && storedImageSrc) {
            imageDetailed.src = storedImageSrc;
            console.log('Image mise à jour :', storedImageSrc);
        }
        if (titleDetailed) {
            titleDetailed.innerText = productTitle; 
            console.log('Titre mis à jour :', productTitle);
        }
        if (priceDetailed) {
            priceDetailed.innerText =` $${productPrice}`; 
            console.log('Prix mis à jour :', productPrice);
        }
    }
});
function getAllLocalStorageItems() {
    const itemsArray = []; // Initialize an empty array

    // Iterate through each key in local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key
        const value = localStorage.getItem(key); // Get the value
        itemsArray.push({ key, value }); // Add to the array
    }

    return itemsArray; // Return the array
}


// Adding to cart
let productCounter = 1;

// Saving product data in localStorage
function addToCart(event,Id) {
    const buttonClicked = event.currentTarget; // The clicked product element
    const clickedProduct=buttonClicked.closest('.product');

    // Access the first <img>, <h4>, and data-price attributes
    const productImage = clickedProduct.getElementsByTagName('img')[0].src; // Get the first <img> element
    const productTitle = clickedProduct.getElementsByTagName('h4')[0].textContent; // Get the text content of the first <h4> element
    const productPrice = clickedProduct.getAttribute('data-price'); // Get the price from the data attribute

    // check if product not in cart
    const localStorageItems=getAllLocalStorageItems();

    let found=false;
    for (let i = 0; i<localStorageItems.length; i++) {
        const localStorageItem = localStorageItems[i];
        if (localStorageItem.key.includes("productInCart")) {
            // Parse existing product to update it
            const existingProduct = JSON.parse(localStorageItem.value); // Ensure value is parsed correctly
            if(existingProduct.productId===Id){
                console.log('Current Product Quantity:', existingProduct.productQuantity); // Log the current productQuantity correctly
                existingProduct.productQuantity++; // Increment quantity
                localStorage.setItem(localStorageItem.key, JSON.stringify(existingProduct)); // Update the existing product in local storage
                found = true;
                break; // Exit the loop if product is found and updated
            }
        }
    }

    // If product was not found in the cart, add it as a new entry
    if (!found) {
        const productToSave = {
            productId:Id,
            productImage: productImage,
            productTitle: productTitle,
            productPrice: productPrice,
            productQuantity: 1,
        };
        // Save the product as a JSON string in localStorage
        const newProductKey = 'productInCart' + productCounter;
        localStorage.setItem(newProductKey, JSON.stringify(productToSave));
        console.log('New product added:', newProductKey);


        // Increment cart item count
        productCounter++;
        
        console.log(productCounter);
    }
    // Redirect to the cart page
    window.location.href = "cart.html"; 
}

// adding to cart page
window.onload = function() {
    // Check if the current URL contains "product-detail.html"
    if (window.location.href.includes("cart.html")) {
        const localStorageItems=getAllLocalStorageItems();
        const cartProducts=localStorageItems.filter(function(product){
            return product.key.includes("productInCart");
        })
        console.log(cartProducts);
    }}