export const addCart = (e) => {
    const parent = e.target.closest('.main-content-img-area');
    let img = parent.querySelector('.img-area');    
    const btnParent = parent.querySelector('.main-content-img-cart');
    const btn = btnParent.querySelector('.img-cart-container');
    const existingBtnContainer = btnParent.querySelector('.btn-flex');
    const cartBody = document.querySelector('.main-content-cart-body');
        cartBody.remove();

        //function to add things in the product card
        const addItemsToProductCart = () => {
            const mainContentCart = document.querySelector('.main-content-cart');
            const cartContainer = document.createElement('div');
            cartContainer.classList.add('cart-container');
                    
            const itemDetails = document.createElement('div');
            itemDetails.classList.add('item-details');
                    
            const removeBtn = document.createElement('i');
            removeBtn.classList.add('fa-regular', 'fa-circle-xmark');


            mainContentCart.append(cartContainer,itemDetails,removeBtn);
        }


        addItemsToProductCart();
    
  
    
   
    



    //change content of the button when clicked
    const changeBtnCartContent = () => {
        if (!existingBtnContainer) {    
        btn.style.display = "none";
        img.classList.add('selected');
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
                btn.style.display = "flex";    
                img.classList.remove('selected');
                btnParent.classList.remove('selected-btn');
                 
             
                setTimeout(() => {
                    btnContainer.remove(); 
                }, 0);

            }
            
        })
        }   
    }


    changeBtnCartContent(); 

}
