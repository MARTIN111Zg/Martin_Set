const btn = document.querySelector(".nav__btn");
const overlay = document.querySelector(".nav__overlay");
const navUl = document.querySelector(".nav__ul");
const list = document.querySelectorAll(".nav__ul__li");
const links = document.querySelectorAll(".nav__a")



btn.addEventListener('click', () => {
    btn.classList.toggle("toogle");
    overlay.classList.toggle("block");
    navUl.classList.toggle("block");
    list.forEach((item, index) => {
        item.style.animation = `movelink 1.4s ease  ${index / 5}s`;

    });
})

links.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            overlay.classList.toggle("block");
            navUl.classList.toggle("block");

        }, 1100);
        btn.classList.toggle("toogle");
    })
})