let btn_burger_menu = document.querySelector(".burger__menu__btn");
let burger_menu = document.querySelector(".burger__menu");
let lines_btn_menu = document.querySelectorAll('.burger__menu__btn img');
let close_btn_menu = document.querySelector('.burger__menu__btn a .line');

let menu_isOpen = false;
btn_burger_menu.addEventListener("click", (event)=>{
    if(!menu_isOpen){
        burger_menu.style.display = 'flex';
        menu_isOpen = !menu_isOpen;
        close_btn_menu.style.display = 'block';
        lines_btn_menu.forEach(item=>{item.style.display = 'none'});
    }
    else{
        burger_menu.style.display = 'none';
        menu_isOpen = !menu_isOpen;
        close_btn_menu.style.display = 'none';
        lines_btn_menu.forEach(item=>{item.style.display = 'flex'});
    }
    event.preventDefault();
});