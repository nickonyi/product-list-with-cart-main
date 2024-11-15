import '../styles/style.css'
import products from '../../data.json'

const productGrid = document.querySelector('#product-grid');
console.log(products[0].image.desktop);
console.log(window.innerWidth);

const productDisplay = () => { 
   if (window.innerWidth < 440) {
    products.forEach((product) => {
      productGrid.innerHTML += `
        <!-- Main image area-->
        <div class="main-content-area-products">
        <div class="main-content-img-area" >
          <img class="img-area" src="${product.image.mobile}" alt="${product.category}">
          <div class="main-content-img-cart">
           <img src="../assets/images/icon-add-to-cart.svg" alt="">
           <span>Add to cart</span>
          </div>
       </div>   
    <!--Description area-->
         <div class="main-content-description">
            <h4>${product.name}</h4>
            <h3>${product.category}</h3>
            <p class="price">$${product.price}</p>
         </div>
        </div> 
      
      `
  })
   }
  
    products.forEach((product) => {
        productGrid.innerHTML += `
          <!-- Main image area-->
          <div class="main-content-area-products">
          <div class="main-content-img-area" >
            <img class="img-area" src="${product.image.desktop}" alt="${product.category}">
            <div class="main-content-img-cart">
             <img src="../assets/images/icon-add-to-cart.svg" alt="">
             <span>Add to cart</span>
            </div>
         </div>   
      <!--Description area-->
           <div class="main-content-description">
              <h4>${product.name}</h4>
              <h3>${product.category}</h3>
              <p class="price">$${product.price}</p>
           </div>
          </div> 
        
        `
    })
}


productDisplay();

