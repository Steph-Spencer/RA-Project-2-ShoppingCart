export default class ShoppingCartView{

    constructor(){
        this.cart = document.getElementById("viewcart");

        this.initShoppingCartView();

    }


    initShoppingCartView() {
       $(document).on('click', '#cart',function(evt){
       		console.log("I clicked the damn cart!");
        	$("#viewcart").toggle(); 
        	$(".overlay").toggle();         
    	});
       $(document).on('click', '#close',function(evt){
       		console.log("I clicked the damn cart!");
        	$("#viewcart").toggle(); 
        	$(".overlay").toggle();         
    	});
   }
}