import iconOrderConfirmed from '../../assets/images/icon-order-confirmed.svg'

export const confirmOrder = (mainContentCart) => {
   createOrderModal();

   // Close the modal if the user clicks outside the modal content
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

    const startNewBtn  = document.createElement('button');
    startNewBtn.classList.add('confirm-btn-new');
    startNewBtn.textContent = "Start New Order"


    modalBox.append(modalHeader,modalBody,startNewBtn);
    modalContainer.appendChild(modalBox);
    body.appendChild(modalContainer);
}