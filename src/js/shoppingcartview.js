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
}