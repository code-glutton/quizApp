function toggleNav(){
    let navUl = document.getElementById("navUl");
    navUl.classList.toggle("open");
}

let btn = document.getElementById("hamburgerBtn");
btn.onclick = toggleNav;