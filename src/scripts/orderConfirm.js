import iconOrderConfirmed from '../../assets/images/icon-order-confirmed.svg';
import products from '../../data.json'

export const confirmOrder = (mainContentCart) => {
    if (!document.querySelector('.modal-container')) {
        createOrderModal(); // Only create the modal if it doesn't already exist
      };

   // New order when user clicks button
 const confirmButton = document.querySelector('.confirm-btn-new');
 confirmButton.addEventListener("click", () => {
    location.reload();
  });

}

 

const createOrderModal = () => {
     const body = document.querySelector('body');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.setAttribute('id','order-modal');

    const modalBox = document.createElement('div');
    modalBox.classList.add('modal-box');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const iconOrder = document.createElement('img');
    iconOrder.classList.add('icon-order');
    iconOrder.src = iconOrderConfirmed;
    const orderBigText = document.createElement('p');
    orderBigText.classList.add('order-big-text');
    orderBigText.textContent = "Order Confirmed";
    const orderSmallText = document.createElement('p');
    orderSmallText.classList.add('order-small-text');
    orderSmallText.textContent = "We hope you enjoy your food!"
    modalHeader.append(iconOrder,orderBigText,orderSmallText);




    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    getGoodsOrdered(modalBody);

    const startNewBtn  = document.createElement('button');
    startNewBtn.classList.add('confirm-btn-new');
    startNewBtn.textContent = "Start New Order"


    modalBox.append(modalHeader,modalBody,startNewBtn);
    modalContainer.appendChild(modalBox);
    body.appendChild(modalContainer);
}


const getGoodsOrdered = (modalBody) => {
    const productsOrdered = document.querySelectorAll('.cart-container');
    const fullPrice = document.querySelector('.full-price').textContent;
    

    productsOrdered.forEach((product)  => {
        const productWrapper = document.createElement('div');
        productWrapper.classList.add('wrapper');
    
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
    
        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = getImageByName(product.querySelector('.item-name').textContent);
        
    
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
        const productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.textContent = product.querySelector('.item-name').textContent;


        const productPriceDetailsContainer = document.createElement('div');
        productPriceDetailsContainer.classList.add('product-price-details');
        const productCount = document.createElement('p');
        productCount.textContent = product.querySelector('.item-count').textContent;
        const productPrice = document.createElement('P');
        productPrice.textContent = product.querySelector('.item-price').textContent
        productPriceDetailsContainer.append(productCount,productPrice);
        productDetails.append(productName,productPriceDetailsContainer);
    
        const productTotalPrice = document.createElement('p');
        productTotalPrice.classList.add('product-total-price');
        productTotalPrice.textContent = product.querySelector('.item-price-total').textContent
    
    
    
        productContainer.append(productImage,productDetails,productTotalPrice);  
        modalBody.appendChild(productContainer);
    })
    
    const exisistingOrderTContainer = document.querySelector('.order-total-container');

    if (!exisistingOrderTContainer) {
        const orderTotalContainer = document.createElement('div');
        orderTotalContainer.classList.add('order-total-container');
    
        const orderText = document.createElement('p');
        orderText.textContent = "Order Total"
        const orderPrice = document.createElement('p');
        orderPrice.textContent = fullPrice;
    
        orderTotalContainer.append(orderText,orderPrice);
        modalBody.appendChild(orderTotalContainer);
    } else {
        modalBody.appendChild(exisistingOrderTContainer);
    }

    
}



const getImageByName = (name) => {

    const product = products.find((item)  => item.category === name);

    return product ? product.image.thumbnail : null;
}