export const confirmOrder = (mainContentCart) => {
   createOrderModal();
}

 // Close the modal if the user clicks outside the modal content
 window.addEventListener("click", (event) => {
    const modalContainer = document.querySelector('.modal-container');
    console.log(modalContainer);
    
    if (event.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });


const createOrderModal = () => {
     const body = document.querySelector('body');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.setAttribute('id','order-modal');

    const modalBox = document.createElement('div');
    modalBox.classList.add('modal-box');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    const startNewBtn  = document.createElement('div');
    startNewBtn.classList.add('confirm-btn');
    startNewBtn.textContent = "Start New Order"


    modalBox.append(modalHeader,modalBody,startNewBtn);
    modalContainer.appendChild(modalBox);
    body.appendChild(modalContainer);
}