export const addCart = (e) => {
    const parent = e.target.closest('.main-content-img-area');
    let img = parent.querySelector('.img-area');    
    const btnParent = parent.querySelector('.main-content-img-cart');
    const btn = btnParent.querySelector('.img-cart-container');
    const existingBtnContainer = btnParent.querySelector('.btn-flex');
    

        //function to add things in the product card
        const addItemsToProductCart = () => {
            //remove the content that empty cart content
            const cartBody = document.querySelector('.main-content-cart-body');
            if (cartBody) {
                cartBody.remove();
            }
            

            const mainContentCart = document.querySelector('.main-content-cart');

            // Selecting the parent container of the item being clicked
            const parentContainer = parent.closest('.main-content-area-products');
            const item = parentContainer.querySelector('h4');
            const itemP = parentContainer.querySelector('.price');
            
            
            const itemNameText = item.textContent;
            const itemPriceNumber =  parseFloat(itemP.textContent.replace(/[^0-9.]/g, ''));
            
            

            // Check if a cart container for the item already exists
            let existingCartContainer = Array.from(mainContentCart.querySelectorAll('.cart-container')).find(cart => {
                return cart.querySelector('.item-name')?.textContent === itemNameText;
            });

            if (existingCartContainer) {
                // Update the count in the existing container
                let itemCount = existingCartContainer.querySelector('.item-count');
                let itemPriceTotal = existingCartContainer.querySelector('.item-price-total');
                itemCount.textContent = `${parseInt(itemCount.textContent) + 1}x`;
                itemPriceTotal.textContent = parseFloat(itemCount.textContent.replace(/[^0-9.]/g, '')) * itemPriceNumber;
            } else {
                // Create a new cart container for the item
                const cartContainer = document.createElement('div');
                cartContainer.classList.add('cart-container');

                const itemDetails = document.createElement('div');
                itemDetails.classList.add('item-details');

                const itemName = document.createElement('div');
                itemName.classList.add('item-name');
                itemName.textContent = itemNameText;

                const itemCount = document.createElement('div');
                itemCount.classList.add('item-count');
                itemCount.textContent = `${1}x`; // Initial count when the item is first added

                //Add item price
                const itemPrice = document.createElement('div');
                itemPrice.classList.add('item-price');
                itemPrice.textContent = `@$${itemPriceNumber}`;

                //price total
                const itemPriceTotal = document.createElement('div');
                itemPriceTotal.classList.add('item-price-total');
                itemPriceTotal.textContent = 1 * itemPriceNumber;

                //the price container
                const itemPriceContainer = document.createElement('div');
                itemPriceContainer.classList.add('item-price-container');
                itemPriceContainer.append(itemCount,itemPrice,itemPriceTotal)
            
                // Append itemName and itemCount to itemDetails
                itemDetails.append(itemName,itemPriceContainer);

                // Add a remove button (optional)
                const removeBtn = document.createElement('i');
                removeBtn.classList.add('fa-regular', 'fa-circle-xmark');

                // Append itemDetails and remove button to cartContainer
                cartContainer.append(itemDetails, removeBtn);

                // Append the new cartContainer to mainContentCart
                mainContentCart.appendChild(cartContainer);
            }

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
