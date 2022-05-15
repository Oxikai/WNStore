const container = document.getElementById("images");
const IMAGE = document.getElementById("bigImg");
var images = [];
var counter = 0;
var quantity = 1;
var maxQuantity = 5;

var add;

for(var x = 0; x < container.children.length; x++) {
    images[x] = container.children[x].src;
}
IMAGE.src = images[counter]

function scrollR() {
    counter++;
    if(counter >= images.length) {
        counter = 0;
    }
    IMAGE.src = images[counter];
}

function scrollL() {
    counter--;
    if(counter < 0) {
        counter = images.length - 1;
    }
    IMAGE.src = images[counter];
}

function GoCart() {
    window.location = "../cart.html";
}

function AddToCart(name, id, price, img) {
    add = event.target;
    add.innerHTML = "Added to Cart ✔";
    add.style.backgroundColor = "lime";
    add.style.borderColor = "white";
    add.style.width = "200px";
    var cartArray = `${name}*${id}*${price * quantity}*${img}*${quantity}`;
    if(localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", `${cartArray}`);
    } else {
        var temp = localStorage.getItem("cart").split(",");
        var BREAK = false;
        var y = [];
        for(var x = 0; x <= temp.length - 1; x++) {
            y = temp[x].split("*");
            if(id == y[1]) {
                y[4] = parseInt(y[4]) + quantity;
                y[2] = price * parseInt(y[4]);
                temp[x] = y.join("*");
                BREAK = true;
                break;
            }
        }
        if(!BREAK) {
            localStorage.setItem("cart", `${localStorage.getItem("cart")},${cartArray}`);
        }
        else {
            localStorage.setItem("cart", `${temp.join(",")}`);
        }
    }
    setTimeout("message()", 2000);
}

function updateQuantity(symbol) {
    if(symbol == "+") {
        quantity++;
        if(quantity > maxQuantity) {
            quantity = maxQuantity;
        }
        document.getElementById("quantityTxt").innerHTML = quantity;
    } else if(symbol == "-") {
        quantity--;
        if(quantity < 1) {
            quantity = 1;
        }
        document.getElementById("quantityTxt").innerHTML = quantity;
    }
}

function message() {
    add.innerHTML = "Add to Cart";
    add.style.backgroundColor = "white";
    add.style = borderColor = "rgb(255, 136, 0)";
    add.style.width = "150px";
}

//setInterval("scroll()", 10000);