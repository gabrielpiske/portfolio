const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 40)
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    navlist.classList.toggle('open');
    if(window.scrollY < 90){
        header.classList.toggle ("sticky");
    }
    
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

const topo = document.getElementById("top");

window.addEventListener("scroll", function() {
    topo.classList.toggle ("show-top", window.scrollY > 140)
    topo.classList.toggle ("hide-top", window.scrollY < 140);
});

window.onload = () => {
    topo.classList.toggle ("hide-top");
}

window.addEventListener("DOMContentLoaded", () => {
    const mainSection = document.getElementById('home');
    const toggleButton = document.getElementById("toggle-theme");
    const icon = toggleButton.querySelector("i");

    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark-mode");
        icon.classList.add("bx-sun");
        icon.classList.remove("bx-moon");
        mainSection.style.backgroundImage = "url('/img/background-dark.png')";
    } else {
        document.body.classList.remove("dark-mode");
        icon.classList.add("bx-moon");
        icon.classList.remove("bx-sun");
        mainSection.style.backgroundImage = "url('/img/background-light.jpg')";
    }

    const toggleTheme = () => {
        const isNowDark = document.documentElement.classList.toggle("dark");
        document.body.classList.toggle("dark-mode");
        icon.classList.toggle("bx-sun");
        icon.classList.toggle("bx-moon");

        if (isNowDark) {
            mainSection.style.backgroundImage = "url('/img/background-dark.png')";
            localStorage.setItem("theme", "dark");
        } else {
            mainSection.style.backgroundImage = "url('/img/background-light.jpg')";
            localStorage.setItem("theme", "light");
        }
    };

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleTheme);
    }
});
