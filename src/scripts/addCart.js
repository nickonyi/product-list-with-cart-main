export const addCart = (e) => {
    const parent = e.target.closest('.main-content-img-area');
    const img = parent.querySelector('.img-area');
    const btn = parent.querySelector('.main-content-img-cart');
    img.classList.toggle('selected');
    btn.classList.toggle('selected-btn');
    



    //change content of the button when clicked
    const changeBtnCartContent = () => {
        btn.textContent = '';
        btn.classList.add('btn-flex');
        const divSub = document.createElement('div');
        const prodNumber = document.createElement('div');
        const divAdd = document.createElement('div');

        divSub.classList.add('div-sub');
        prodNumber.classList.add('div-num');
        divAdd.classList.add('div-add');

        divSub.textContent = "-";
        prodNumber.textContent = 1;
        divAdd.textContent = "+";

        btn.appendChild(divSub)
        btn.appendChild(prodNumber);
        btn.appendChild(divAdd)
    }

    changeBtnCartContent(); 

}

