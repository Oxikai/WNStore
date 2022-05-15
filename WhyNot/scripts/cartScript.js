var cart = [];
//var cart = [["name", "#", "$", "img", "amount"]];
var cartArray = [];
var temp = localStorage.getItem("cart").split(",");
const CONTAINER = document.getElementById("items");
var total = 0;
window.onload = setupCart();

function setupCart() {
    for(var x = 0; x <= temp.length - 1; x++) {
        cart[x] = temp[x].split("*");
    }
    loadCart();
}

function loadCart() {
    //if(cart != null) {
        for(var x = 0; x <= cart.length - 1; x++) {
            var outerContainer = document.createElement("div");
            outerContainer.setAttribute("class", cart[x][1]);
            outerContainer.setAttribute("id", "shell");
            var item = document.createElement("div");
            item.setAttribute("class", "item");
            item.setAttribute("onclick", `Redirect('${cart[x][1]}')`);
            outerContainer.appendChild(item);
            var img = document.createElement("img");
            img.setAttribute("src", `../media/${cart[x][3]}`);
            item.appendChild(img);
            const name = document.createElement("p");
            const nodeTxt = document.createTextNode(`${cart[x][0]}`);
            name.appendChild(nodeTxt);
            item.appendChild(name);
            var price = document.createElement("h3");
            price.innerHTML = `Total: $${cart[x][2]}`;
            item.appendChild(price);
            /*const quantity = document.createElement("p");
            const txt = document.createTextNode(`Quantity: ${cart[x][4]}`);
            quantity.appendChild(txt);
            item.appendChild(quantity);*/
            total += parseInt(cart[x][2]);

            var Amt = document.createElement("div");
            Amt.setAttribute("id", "amounts");
            outerContainer.appendChild(Amt);
            const minus = document.createElement("p");
            const minusTxt = document.createTextNode("-");
            minus.setAttribute("onclick", "updateCart('-')");
            minus.setAttribute("class", "change");
            minus.appendChild(minusTxt);
            Amt.appendChild(minus);
            const qut = document.createElement("p");
            const qutTxt = document.createTextNode(cart[x][4]);
            qut.appendChild(qutTxt);
            Amt.appendChild(qut);
            const plus = document.createElement("p");
            const plusTxt = document.createTextNode("+");
            plus.setAttribute("onclick", "updateCart('+')");
            plus.setAttribute("class", "change");
            plus.appendChild(plusTxt);
            Amt.appendChild(plus);
            const button = document.createElement("button");
            button.setAttribute("onclick", "deleteItem()");
            const buttonTxt = document.createTextNode("Delete Item");
            button.appendChild(buttonTxt);
            CONTAINER.appendChild(outerContainer);
            outerContainer.appendChild(button);
        }
        if(total > 0) {
            document.getElementById("total").innerHTML = `Total: $${total}`;
        }
    //}
}

function deleteItem() {
    var id = event.target.parentElement.className;
    for(var x = 0; x <= cart.length - 1; x++) {
        if(id == cart[x][1]) {
            cart.splice(x, 1);
            cartArray[x] = cart[x].join("*");
            localStorage.setItem("cart", cartArray);
            if(localStorage.getItem("cart") == "") {
                localStorage.removeItem("cart");
            }
        }
    }
    event.target.parentElement.remove();
    //console.log(event.target.tagName);
}

function updateCart(sign) {
    var id = event.target.parentElement.parentElement.className;
    console.log(id);
    var price = 0;
    for(var x = 0; x <= cart.length - 1; x++) {
        if(id == cart[x][1]) {
            price = parseInt(cart[x][2]) / parseInt(cart[x][4]);
            if(sign == "-") {
                cart[x][4] = parseInt(cart[x][4]) - 1;
                cart[x][2] = parseInt(cart[x][4]) * price;
                if(cart[x][4] == "0") {
                    cart.splice(x, 1);
                    event.target.parentElement.parentElement.remove();
                }
                for(var x = 0; x <= cart.length - 1; x++) {
                    cartArray[x] = cart[x].join("*");
                }
                localStorage.setItem("cart", cartArray.join());
                if(localStorage.getItem("cart") == "") {
                localStorage.removeItem("cart");
                }
                location.reload();
            } else if(sign == "+") {
                cart[x][4] = parseInt(cart[x][4]) + 1;
                cart[x][2] = parseInt(cart[x][4]) * price;
                for(var x = 0; x <= cart.length - 1; x++) {
                    cartArray[x] = cart[x].join("*");
                }
                localStorage.setItem("cart", cartArray.join());
                location.reload();
            }
        }
    }
}