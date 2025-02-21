const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const prev = document.getElementById("prev-btn");
const next = document.getElementById("next-btn");
const list = document.getElementById("item-list");
const itemWidth = 300;
const padding = 10;

menu.addEventListener("click", function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})


prev.addEventListener("click", ()=> {
    list.scrollLeft -= (itemWidth + padding);
})

next.addEventListener("click", ()=> {
    list.scrollLeft += (itemWidth + padding);
})