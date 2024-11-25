import { container } from 'webpack';
import carbonImg from '../../assets/images/icon-carbon-neutral.svg';
import { confirmOrder } from './orderConfirm';


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
                cartBody.style.display = "none";
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
            
            updateOrAddCartItem(existingCartContainer, itemNameText, itemPriceNumber, mainContentCart);

           

        }


        const updateOrAddCartItem = (existingCartContainer, itemNameText, itemPriceNumber, mainContentCart) => {
            if (existingCartContainer) {
                // Update the count and total price in the existing container
                const itemCount = existingCartContainer.querySelector('.item-count');
                const itemPriceTotal = existingCartContainer.querySelector('.item-price-total');
        
                // Update item count
                const currentCount = parseInt(itemCount.textContent);
                itemCount.textContent = `${currentCount + 1}x`;
        
                // Update item price total
                itemPriceTotal.textContent = `$${(parseFloat(itemCount.textContent.replace(/[^0-9.]/g, '')) * itemPriceNumber).toFixed(2)}`;
            } else {
                // Create a new cart container for the item
                const cartContainer = document.createElement('div');
                cartContainer.classList.add('cart-container');
        
                // Item details container
                const itemDetails = document.createElement('div');
                itemDetails.classList.add('item-details');
        
                // Item name
                const itemName = document.createElement('div');
                itemName.classList.add('item-name');
                itemName.textContent = itemNameText;
        
                // Item count
                const itemCount = document.createElement('div');
                itemCount.classList.add('item-count');
                itemCount.textContent = `1x`; // Initial count when the item is first added
        
                // Item price
                const itemPrice = document.createElement('div');
                itemPrice.classList.add('item-price');
                itemPrice.textContent = `@$${itemPriceNumber}`;
        
                // Item total price
                const itemPriceTotal = document.createElement('div');
                itemPriceTotal.classList.add('item-price-total');
                itemPriceTotal.textContent = `$${(1 * itemPriceNumber).toFixed(2)}`;
        
                // Price container
                const itemPriceContainer = document.createElement('div');
                itemPriceContainer.classList.add('item-price-container');
                itemPriceContainer.append(itemCount, itemPrice, itemPriceTotal);
        
                // Append item details and price container
                itemDetails.append(itemName, itemPriceContainer);
        
                // Add a remove button (optional)
                const removeBtn = document.createElement('i');
                removeBtn.classList.add('fa-regular', 'fa-circle-xmark');
        
                // Append itemDetails and remove button to cartContainer
                cartContainer.append(itemDetails, removeBtn);
        
                // Append the new cart container to mainContentCart
                mainContentCart.appendChild(cartContainer);
        
                // Update the total price of the cart
                updateCartTotal(mainContentCart);

                //add carbon neutral card
                addCarbonNeutralCard(mainContentCart);

                //add the confrim button
                addConfirmButton(mainContentCart);

                //Update heading quantity
                updateCartHeading(mainContentCart);

            }
        }


        const  updateCartTotal = (mainContentCart) => {
            // Check if the full-price-total container already exists
            let existingFullPriceTotalContainer = mainContentCart.querySelector('.full-price-total');
            const firstSubTotal = mainContentCart.querySelector('.item-price-total').textContent;
           
        
            if (!existingFullPriceTotalContainer) {
                // Create the total price container and its children
                const fullPriceTotalContainer = document.createElement('div');
                fullPriceTotalContainer.classList.add('full-price-total');
        
                const fullPriceTotalText = document.createElement('div');
                fullPriceTotalText.classList.add('full-price-text');
                fullPriceTotalText.textContent = "Order Total";
        
                const fullPriceTotal = document.createElement('div');
                fullPriceTotal.classList.add('full-price');
                fullPriceTotal.textContent = firstSubTotal;
        
                // Append children to the container
                fullPriceTotalContainer.append(fullPriceTotalText, fullPriceTotal);
        
                // Append the full price total container to the mainContentCart
                mainContentCart.appendChild(fullPriceTotalContainer);
            } else {
                // Select all cart-container elements
                const cartContainers = mainContentCart.querySelectorAll('.cart-container');
                let totalPrice = 0;
        
                // Loop through each cart-container to calculate the total price
                cartContainers.forEach(cart => {
                    const itemTotalPriceElement = cart.querySelector('.item-price-total');
        
                    if (itemTotalPriceElement) {
                        // Extract the price as a number and add it to the total
                        const itemPrice = parseFloat(itemTotalPriceElement.textContent.replace(/[^0-9.]/g, ''));
                        totalPrice += itemPrice;
                    }
                });
        
                // Update the total price in the existing container
                const fullPriceTotal = mainContentCart.querySelector('.full-price');
                if (fullPriceTotal) {
                    fullPriceTotal.textContent = `$${totalPrice.toFixed(2)}`;
                }
        
    
                  // Append all cart containers first to ensure their correct order
                    cartContainers.forEach(cart => mainContentCart.appendChild(cart));

                    // Place the total price container directly after the cart containers
                    mainContentCart.appendChild(existingFullPriceTotalContainer);

                    // Ensure the carbon-neutral container (if it exists) is placed after the total price container
                    const carbonNeutralContainer = mainContentCart.querySelector('.carbon-container');
                    if (carbonNeutralContainer) {
                        mainContentCart.appendChild(carbonNeutralContainer);
                    }

                    const confirmButton = mainContentCart.querySelector('.confirm-btn');
                    if (confirmButton) {
                        mainContentCart.appendChild(confirmButton);
                    }


            }
        }

        const addCarbonNeutralCard = (mainContentCart) => {
            //Adding the carbon neutral card
            const existingCarbonContainer = mainContentCart.querySelector('.carbon-container');

            if (!existingCarbonContainer) {
                // Create the carbon container
                const carbonNeutralContainer = document.createElement('div');
                carbonNeutralContainer.classList.add('carbon-container');
            
                // Create the image element
                const carbonNImg = document.createElement('img');
                carbonNImg.classList.add('carbon-img'); // No dot prefix for class name here
                carbonNImg.src = carbonImg; // Ensure carbonImg is a valid URL or path
            
                // Create the text element
                const carbonText = document.createElement('div');
                carbonText.classList.add('carbon-img-text');
                carbonText.textContent = "This is a carbon-neutral delivery";
            
                // Append image and text to the container
                carbonNeutralContainer.append(carbonNImg, carbonText);

                mainContentCart.appendChild(carbonNeutralContainer);
            } else {
                 // Append the container to the main content cart
                 mainContentCart.appendChild(existingCarbonContainer);
            }

        }

        const addConfirmButton = (mainContentCart) => {

            const exisitingConfirmBtn = document.querySelector('.confirm-btn');

            if (!exisitingConfirmBtn ) {
                const confirmButton = document.createElement('button');
                confirmButton.classList.add('confirm-btn');

                confirmButton.textContent = "Confirm Order";

                mainContentCart.appendChild(confirmButton);
            } else {
                mainContentCart.appendChild(exisitingConfirmBtn);
            }
            
        }

        const updateCartHeading = (mainContentCart) => {
           // Select all cart-container elements
           const cartContainers = mainContentCart.querySelectorAll('.cart-container');   
           let totalQuantity = 0;
   
           // Loop through each cart-container to calculate the total price
           cartContainers.forEach(cart => {
               const itemTotalCountElement = cart.querySelector('.item-count');
              
               if (itemTotalCountElement) {
                   // Extract the price as a number and add it to the total
                   const itemQ = parseFloat(itemTotalCountElement.textContent.replace(/[^0-9.]/g, ''));
                   totalQuantity += itemQ;
               }
           });
           
           const heading = mainContentCart.querySelector('h2');
           heading.textContent = `Your Cart(${totalQuantity})`; 
        }




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
        
        //add items to cart
        addItemsToProductCart();
        
        //add event listeners to increament or decrement the product number
        divAdd.addEventListener("click", ()=> {
            let productNumber = prodNumber.textContent;
            productNumber++;
            prodNumber.textContent = productNumber;    


            addItemsToProductCart();
            const mainContentCart = document.querySelector('.main-content-cart');
            updateCartTotal(mainContentCart);
            //Update heading quantity
            updateCartHeading(mainContentCart);     
        })


        // Event listener for decrementing product number and updating price
divSub.addEventListener("click", (e) => {
    
   // Find the cart container for the current product
   const productName = parent.closest('.main-content-area-products').querySelector('h4').textContent;

   // Find the corresponding cart container by product name
   const cartContainer = Array.from(document.querySelectorAll('.cart-container')).find(cart => {
       return cart.querySelector('.item-name').textContent === productName;
   });

   if (!cartContainer) return;

   const prodNumber = cartContainer.querySelector('.item-count');
   let productNumber = parseInt(prodNumber.textContent.replace(/[^0-9]/g, ''), 10);
   const priceText = cartContainer.querySelector('.item-price').textContent;
   const itemPriceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));

   // Decrease the product number if greater than 1
   if (productNumber > 1) {
       productNumber--;
       prodNumber.textContent = `${productNumber}x`;

       //update the imageprice area
       const imageQuantity = parent.closest('.main-content-area-products').querySelector('.div-num');
       imageQuantity.textContent = productNumber;
       

       // Update the total price for this product
       const itemPriceTotal = cartContainer.querySelector('.item-price-total');
       itemPriceTotal.textContent = (productNumber * itemPriceNumber).toFixed(2);

       //update the total price
       const mainContentCart = document.querySelector('.main-content-cart');
       updateCartTotal(mainContentCart);
       //Update heading quantity
       updateCartHeading(mainContentCart);
       
   } else {
        // If product number is less than 1, remove the item from the cart
        // Remove visual indicators and container itself
            
        parent.querySelector('.img-cart-container').style.display = "flex";
        parent.querySelector('.img-area').classList.remove('selected');
        parent.querySelector('.main-content-img-cart').classList.remove('selected-btn');
        const btnContainer = parent.querySelector('.btn-flex');
        setTimeout(() => {
            btnContainer.remove();
        }, 0);
            
                // Optionally, you could remove the cart container if the quantity is 0
                let existingCartContainer = cartContainer;
                if (existingCartContainer) {
                    existingCartContainer.remove() 
                    
                    const allCartContainer = document.querySelectorAll('.cart-container'); 

                    if (allCartContainer.length === 0) {
                        const cartBody = document.querySelector('.main-content-cart-body');                        
                        cartBody.style.display = "block"   
                    }              
                  }
                }
        });

      }
    }


    changeBtnCartContent(); 

    //Confirm Event listerners
    const confirmButton = document.querySelector('.confirm-btn');
    const mainContentCart = document.querySelector('.main-content-cart');

    confirmButton.addEventListener("click",() => {
        confirmOrder(mainContentCart);
    });

}


