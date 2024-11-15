export const addCart = (e) => {
    const parent = e.target.closest('.main-content-img-area');
    const img = parent.querySelector('.img-area');
    const btnParent = parent.querySelector('.main-content-img-cart');
    const btn = btnParent.querySelector('.img-cart-container');
    const existingBtnContainer = btnParent.querySelector('.btn-flex');
    img.classList.add('selected');
   
    



    //change content of the button when clicked
    const changeBtnCartContent = () => {
        if (!existingBtnContainer) {
        btn.style.display = "none";
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-flex');
        btnParent.classList.add('selected-btn');
        const divSub = document.createElement('div');
        let prodNumber = document.createElement('div');
        const divAdd = document.createElement('div');
        
        btnContainer.classList.add('btn-container');
        divSub.classList.add('div-sub');
        prodNumber.classList.add('div-num');
        divAdd.classList.add('div-add');

        divSub.textContent = "-";
        prodNumber.textContent = 1;
        divAdd.textContent = "+";

        btnContainer.appendChild(divSub)
        btnContainer.appendChild(prodNumber);
        btnContainer.appendChild(divAdd)
        btnParent.appendChild(btnContainer)

        //add event listeners to increament or decrement the product number
        divAdd.addEventListener("click", ()=> {
            let productNumber = prodNumber.textContent;
            productNumber++;
            prodNumber.textContent = productNumber;
            
        })

        divSub.addEventListener("click", ()=> {
            let productNumber = prodNumber.textContent;
            productNumber--;
            prodNumber.textContent = productNumber;

            
            

            if (productNumber < 1) {
                btnContainer.style.display ="none";
                btn.style.display = "flex";
                
                
                //img.classList.remove('selected');
                btnParent.classList.remove('selected-btn');
                btnContainer.remove();
                
            }
            
        })
        }   
    }


    changeBtnCartContent(); 

}

