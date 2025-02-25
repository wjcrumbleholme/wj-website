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

fetch("projects/assets/projects.json")
    .then(response => response.json())
    .then(projects => {
        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("scroll__item");

            projectDiv.innerHTML = `
                <div class="scroll__item-img">
                    <img src="${project.image}" alt="PLACEHOLDER">
                </div>
                <div class="scroll__item-title">
                <h2>${project.title}</h2>
                </div>
                <div class="scroll__item-desc">
                <p>${project.description}</p>
                <a href="${project.link}" class="fill-div"></a>
                </div>
            `;

            list.appendChild(projectDiv);
        });
    })
    .catch(error => console.error("Error loading projects: ", error));