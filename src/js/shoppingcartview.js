export default class ShoppingCartView{

    constructor(){
        console.log("making a shopping cart");
        this.cart = document.getElementById("viewcart");
        this.products = theApp.bestBuyWebService.getProducts
        this.initShoppingCartView();

    }


    initShoppingCartView() {
       $(document).on('click', '#cart',function(evt){
       		console.log("I clicked the damn cart!");
          this.showCartPopUp();
        	$("#viewcart").toggle(); 
        	$(".overlay").toggle();         
    	});
       $(document).on('click', '#close, .overlay',function(evt){
       		console.log("I clicked the damn cart!");
        	$("#viewcart").toggle(); 
        	$(".overlay").toggle();         
    	});
   }

   showCartPopUp (){
    let ViewCart = $('#viewcart');
    let output = "";
    if (sessionStorage.length == 0) {
      return;
    }
    for (let i=0; i < sessionStorage.length; i++){
      let currentSku = sessionStorage.key(i);
      let currentQty = sessionStorage.getItem(currentSku);
    for (let p=0; p< this.Products.length; p++){
      let currentProduct = products[p];
      let productSku = currentProduct.sku;
      productSku = productSku.toString();
      if(productSku == currentSku){
        console.log("final layer matched items : "+productSku+" : "+currentSku);
        let img = currentProduct.image;
        let make = currentProduct.manufacturer;
        let name = currentProduct.name;
        let price = currentProduct.price;
        output+=`
        <div id="close" class="close">close (x)</div>
          <h3>your cart</h3>
        <div>
        <div id="cart-product-img" src="${img}" alt="${name}"></div>
        <div id="cart-make-name flex">
          <p id="cart-make">${make}</p>
          <p id="cart-name">${name}</p>
        </div>
        <div id="cart-price">${price}</div>
        <div id="cart-quantity">
          <p>quantity</p>
          <input id="increment" type="button" name="increment" value="+">
          <input id="quantity-field" type="text" name="quantity" value=1>
          <input id="decrement" type="button" name="decrement" value="-">
        </div>
        <div id="cart-update-remove-buttons">
          <input id="update" type="button" name="update" value="Update">
          <input id="remove" type="button" name="remove" Value="Remove">
        </div>
        <hr>
        <input id="clearcart" type="button" name="clearcart" value="clear cart">
        <input id="checkout" type="button" name="checkout" value="checkout">
      </div>
      `;
      }
      ViewCart.append(output); 
    }
    
    }

   }
}