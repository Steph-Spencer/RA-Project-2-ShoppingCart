export default class ShoppingCartView{

    constructor(){
        console.log("making a shopping cart");
        this.cart = document.getElementById("viewcart");

        this.initShoppingCartView();

    }


    initShoppingCartView() {
       $(document).on('click', '#cart',function(evt){
       		console.log("I clicked the damn cart!");
        	$("#viewcart").toggle(); 
        	$(".overlay").toggle();         
    	});
       $(document).on('click', '#close, .overlay',function(evt){
       		console.log("I clicked the damn cart!");
        	$("#viewcart").toggle(); 
        	$(".overlay").toggle();         
    	});
   }

   showCartPopUp (products){
    let ViewCart = $('#viewcart');
    let output = "";
    if (sessionStorage.length == 0) {
      return;
    }
    for (let i=0; p< sessionStorage.length; i++){
      let currentSku = sessionStorage.key(i);
      let currentQty = sessionStorage.getItem(currentSku);
    for (let p=0; p< products.length; p++){
      let currentProduct = products [p];
      let productSku = currentProduct.sku;
      productSku = productSku.toString();
    if(productSku == currentSku){
      let img = currentProduct.image;
      let make = currentProduct.manufacturer;
      let name = currentProduct.name;
      let price = currentProduct.price;
      //output+=` < PUT THE CART HTML HERE WITH BINDERS AS PLACEHOLDERS >`;
    }
      $('#ViewCart') .append (output); 
    }
    
    }

   }
}