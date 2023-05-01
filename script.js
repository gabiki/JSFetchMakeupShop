let containerPhoto = document.getElementsByClassName("container")[0];
let alink = document.getElementsByTagName("a");
let mainContent = document.getElementById("mainContent");
let startButton = document.getElementById("startButton");
let closeButton = document.getElementById("closeButton");
let heartButton = document.getElementById("heartButton");
let heartClass = document.getElementsByClassName("heartClass");
let favoritecard = document.getElementById("favoritecard");
let cart = document.getElementById("cart");
let modal = document.querySelector("div.modal");
let productPhoto;
let productText;
let productDetails;
let productPrice;
let productCurrency;
let favoriteadded = [];
let clickedProductArray = [];
let photoToAdd;
let detailsPopup;
let favorites;
let favoritePhoto;
let favoriteText;
let favoritePrice;
let favoriteCurrency;
let divtoadd;
let divtoremove;
let modaldirectButton = [];
let modalRedirectButtonId;
let clickedRedirectArray = [];
let saveddiv = [];
let savedinnerHTML = [];
let contactLink = document.getElementById("contactLink");
const closeModalButtons = document.querySelectorAll("[data-close-button");
const url = "https://makeup-api.herokuapp.com";

newProduct();
function newProduct() {
    fetch(
        `${url}/api/v1/products.json?product_category=liquid&product_type=eyeliner`
    )
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < 12; i++) {
                productPhoto = data[i + 1].image_link;
                productText = data[i + 1].name;
                photoToAdd = document.createElement("div");
                photoToAdd.innerHTML = `<div class="productPhoto"><a class="productLink"><img src="${productPhoto}" alt=""></img><div class="textCard"><p class="productText">${productText}</p></div></a></div>`;
                containerPhoto.appendChild(photoToAdd);
                clickedProductArray.push(data[i]);
            }
        });
}

function showDetails() {
    fetch(
        `${url}/api/v1/products.json?product_category=liquid&product_type=eyeliner`
    )
        .then((response) => response.json())
        .then((data) => {
            for (let i = 6; i < 19; i++) {
                alink[i].onclick = function () {
                    productPhoto = data[i - 5].image_link;
                    productText = data[i - 5].name;
                    productDetails = data[i - 5].description;
                    productPrice = data[i - 5].price;
                    productCurrency = data[i - 5].price_sign;
                    setTimeout(() => {
                        mainContent.style.display = "none";
                        modal.style.display = "block";
                    }, 100);
                    detailsPopup = document.createElement("div");
                    detailsPopup.innerHTML = `<div id="detailsPopupi" class="detailsPopupc"><div id="photoPopupi" class="photoPopupc"><img src="${productPhoto}" alt=""></img></div><div id="textPopupi" class="textPopupc"><p class="productText">${productText}</p><br><p class="productDetails">${productDetails}</p><br><p class="productPrice">${productPrice}${productCurrency}</p></div></div>`;
                    modal.appendChild(detailsPopup);
                    modal.id = `${productText} ${productPrice}${productCurrency}Modal`;
                    saveddiv.push(modal.id);
                    savedinnerHTML.push(detailsPopup.innerHTML);
                    console.log(modal.id);
                    let searchedElement = `${alink[i].lastChild.lastChild.innerHTML} ${productPrice}${productCurrency}`;
                    if (favoriteadded.includes(searchedElement) == true) {
                        heartButton.innerHTML = `<i class="fa fa-heart" aria-hidden="false"></i>`;
                    } else if (
                        favoriteadded.includes(searchedElement) == false
                    ) {
                        heartButton.innerHTML = `<i class="fa fa-heart-o" aria-hidden="false"></i>`;
                    }
                };
            }
        });
}

showDetails();

function closing() {
    setTimeout(() => {
        mainContent.style.display = "block";
        modal.style.display = "none";
        modal.removeChild(detailsPopup);
    }, 100);
}

function addfavorites() {
    let productParent = heartButton.parentElement.parentElement.id;
    let productRealWord = productParent.replace("Modal", "");

    let parentdiv = document.getElementById(productParent);
    let divDetails = parentdiv.lastChild.lastChild.lastChild;
    let divtoadd = `${divDetails.firstChild.innerText} ${divDetails.lastChild.innerText}`;
    console.log(divtoadd);
    if (favoriteadded.indexOf(divtoadd) == -1) {
        favoriteadded.push(divtoadd);
        console.log(favoriteadded);
        favorites = document.createElement("div");
        favorites.innerHTML = `<button id="${divtoadd}Id" class="favoriteDivAdded" onclick="redirectDetails(this)">${divDetails.firstChild.innerText} ${divDetails.lastChild.innerText}</button>`;
        favorites.id = `${divtoadd}Id`;
        favorites.className = "favoriteClass";
        favoritecard.appendChild(favorites);
        heartButton.innerHTML = `<i class="fa fa-heart" aria-hidden="false"></i>`;
    } else if (favoriteadded.indexOf(divtoadd) > -1) {
        let indexToDelete = favoriteadded.indexOf(divtoadd);
        let divtoremove = favoriteadded[indexToDelete];
        let toremove = document.getElementById(`${divtoremove}Id`);
        heartButton.innerHTML = `<i class="fa fa-heart-o" aria-hidden="false"></i>`;
        console.log(favoritecard);
        console.log(toremove);
        favoritecard.removeChild(toremove);
        favoriteadded.splice(indexToDelete, 1);
        console.log(favoriteadded);
    }
}

function showCart() {
    if (favoritecard.style.display !== "none") {
        favoritecard.style.display = "none";
    } else {
        favoritecard.style.display = "block";
    }
}

function redirectDetails(redirect_id) {
    let redirectButtonId = redirect_id.id;
    console.log(redirectButtonId);
    modalRedirectButtonId = redirectButtonId.replace("Id", "Modal");
    console.log(modalRedirectButtonId);
    console.log(saveddiv);
    for (let i = 0; i < 19; i++) {
        if (saveddiv[i] == modalRedirectButtonId) {
            mainContent.style.display = "none";
            modal.style.display = "block";
            detailsPopup = document.createElement("div");
            detailsPopup.innerHTML = savedinnerHTML[i];
            modal.appendChild(detailsPopup);
            heartButton.innerHTML = `<i class="fa fa-heart" aria-hidden="false"></i>`;
        }
    }
}

heartButton.addEventListener("click", addfavorites);
closeButton.addEventListener("click", closing);
