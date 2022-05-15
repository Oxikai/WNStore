const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

function toggleMenu() {
    if(menu.style.height == "500px") {
        //menu.style.display = "none";
        menu.style.height = "1px";
        nav.style.display = "none";
        return;
    }
    else {
        //menu.style.display = "block";
        menu.style.height = "500px";
        nav.style.display = "block";
        return;
    }
}