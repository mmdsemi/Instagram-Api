let menu_btn = document.querySelector(".menu-btn");
let close_btn = document.querySelector(".closebtn");
let nav = document.querySelector(".navigation-menu");
let overley = document.querySelector(".overley");
menu_btn.addEventListener("click", opennav);
close_btn.addEventListener("click", closenav);
overley.addEventListener("click", closenav);
function opennav() {
  nav.style.right = "0";
  overley.style.zIndex = "1";
  overley.style.opacity = "0.5";
}
function closenav() {
  nav.style.right = "-250px";
  overley.style.zIndex = "-1";
  overley.style.opacity = "0";
}
