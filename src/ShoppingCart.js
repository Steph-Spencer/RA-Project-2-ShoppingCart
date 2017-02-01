/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            // you can create a shoppingCart!
            this.initShoppingCart();
        } else
        {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.
        console.log("finished creating shopping cart");
    }

    addItemToCart(sku){

    }

    removeItemFromCart(sku){
   // replace value of session data-sku quantity with null//

    }

    updateQuantityofItemInCart(sky,qty){

    }

    clearCart(){
        sessionStorage.clear();
        // clear the entire cart
    }


}
