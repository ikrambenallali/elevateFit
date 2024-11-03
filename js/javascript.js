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
// Fonction pour récupérer tous les articles du LocalStorage
function getAllLocalStorageItems() {
    return JSON.parse(localStorage.getItem("cartProducts")) || []; // Retournez un tableau vide si aucun produit n'est trouvé
}

// Fonction pour ajouter un produit au panier
function addToCart(event, Id) {
    const buttonClicked = event.currentTarget;
    const clickedProduct = buttonClicked.closest('.product');

    // Récupérez les détails du produit
    const productImage = clickedProduct.getElementsByTagName('img')[0].src;
    const productTitle = clickedProduct.getElementsByTagName('h4')[0].textContent;
    const productPrice = clickedProduct.getAttribute('data-price');

    // Récupérez les produits existants dans le panier
    let cartProducts = getAllLocalStorageItems();

    // Vérifiez si le produit est déjà dans le panier
    let found = false;
    for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].productId === Id) {
            // Si le produit existe, augmentez la quantité
            cartProducts[i].productQuantity++;
            found = true;
            break;
        }
    }

    // Si le produit n'est pas trouvé, ajoutez-le au panier
    if (!found) {
        const productToSave = {
            productId: Id,
            productImage: productImage,
            productTitle: productTitle,
            productPrice: productPrice,
            productQuantity: 1,
        };
        cartProducts.push(productToSave);
    }

    // Enregistrez les produits mis à jour dans le LocalStorage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    // Redirigez vers la page du panier
    window.location.href = "cart.html";
}

// Fonction pour afficher les produits dans le panier
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Effacez le contenu existant

    // Obtenez les articles du LocalStorage
    const cartProducts = getAllLocalStorageItems();

    // Affichez chaque produit
    cartProducts.forEach(function (product) {
        const productHTML = `
            <div class="cart-item">
                <img src="${product.productImage}" alt="${product.productTitle}">
                <h4>${product.productTitle}</h4>
                <p>Prix : ${product.productPrice} €</p>
                <p>Quantité : ${product.productQuantity}</p>
                <button onclick="removeFromCart('${product.productId}')">Retirer</button>
            </div>
        `;
        cartContainer.innerHTML += productHTML;
    });
}

// Appelez cette fonction lorsque la page du panier est chargée
if (window.location.href.includes("cart.html")) {
    displayCartItems();
}





const placeOrderButton = document.getElementById('place_order_button');

placeOrderButton.addEventListener('click',function(){
    const firstName=document.getElementById('first_name');
    const lastName=document.getElementById('last_name');
    const country=document.getElementById('country');
    const streetAdress=document.getElementById('street_adress');
    const townCity=document.getElementById('town_city');
    const stateCounty=document.getElementById('state_county');
    const zip=document.getElementById('zip');
    const phoneNumber=document.getElementById('phone_number');
    const email = document.getElementById('email');
    if(NameValidate(firstName) && NameValidate(lastName) && requiredInput(country) && requiredInput(streetAdress) && requiredInput(townCity) && requiredInput(stateCounty) && ZipValidate(zip) && phoneValidate(phoneNumber) && emailValidate(email)){
        console.log("form valid");
        window.location.href = "index.html"; 
    }
})


// validation functions
function showInputError(element,message){
    const pError = element.parentElement.nextElementSibling;
    pError.innerText=message;
}
// required function
function requiredInput(element){
    if (element.value.trim() === ''){
        showInputError(element,"This element is requierd !");
        return false;
    }
    else{
        return true;
    }
}

// only alphabets function
function onlyAlphabet(element,str) {
    const isValid = /^[A-Za-z]+$/.test(str); // Check if the string contains only alphabets
    if(!isValid){
        showInputError(element, "only alphabets!");
    }
    else{
        showInputError(element, "");
    }
    return isValid;
}

// function of first and last name validation
function NameValidate(element){
    if(requiredInput(element) && onlyAlphabet(element,element.value) && validateNameLength(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}
function validateNameLength(element, str) { // first and last name has to be between 2 and 30 characters
    if (str.length > 30 || str.length < 2) {
        showInputError(element, "Length must be between 2 and 30 characters.");
        return false;
    } else {
        showInputError(element, "");
        return true;
    }
}

// zip length
function zipLength(element, str) { // first and last name has to be between 2 and 30 characters
    if (str.length > 10 || str.length < 5) {
        showInputError(element, "Length must be between 5 and 10 characters.");
        return false;
    } else {
        showInputError(element, "");
        return true;
    }
}
function onlyAlphaNums(element, str) {
    const isValid = /^(?=.*[0-9])[A-Za-z0-9]+$/.test(str); // Requires at least one digit and allows letters and numbers
    if (!isValid) {
        showInputError(element, "Must contain at least one number and only alphanumeric characters!");
    } else {
        showInputError(element, "");
    }
    return isValid;
}

// function of zip validation
function ZipValidate(element){
    if(requiredInput(element) && onlyAlphaNums(element,element.value) && zipLength(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}


// phone number chars
function phoneNumChars(element,str) {
    const isValid = /^[0-9+\s()-]+$/.test(str);// nums whitespace + - and *()
     if(!isValid){
        showInputError(element, "Enter a valid phone number!");
    }
    else{
        showInputError(element, "");
    }
    return isValid;
}
// phone number length
function phoneNumLength(element, str) { // first and last name has to be between 2 and 30 characters
    if (str.length > 15 || str.length < 8) {
        showInputError(element, "Length must be between 8 and 15 characters.");
        return false;
    } else {
        showInputError(element, "");
        return true;
    }
}
// function of phone number validation
function phoneValidate(element){
    if(requiredInput(element) && phoneNumChars(element,element.value) && phoneNumLength(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}

// phone number chars
function emailChars(element,str) {
    const isValid = /^(?=.*[@])(?=.*[.])[a-z0-9+\s()\-@.]+$/.test(str);
     if(!isValid){
        showInputError(element, "Enter a valid email");
    }
    else{
        showInputError(element, "");
    }
    return isValid;
}

// function of phone number validation
function emailValidate(element){
    if(requiredInput(element) && emailChars(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}
document.querySelector('.fa-bars').addEventListener('click', function() {
    const menu = document.querySelector('.menu-bar-side');
    menu.classList.toggle('active'); // Ajoute ou enlève la classe 'active'
});
