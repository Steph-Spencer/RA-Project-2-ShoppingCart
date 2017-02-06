
export default class CatalogView{

    constructor(){
        this.carousel = document.getElementById("productroll");
        this.theApp = null;

    }

    initCarousel(){
        console.log("initializing carousel");
       $(document).ready(function(){
           $('.owl-carousel').owlCarousel({
               items:1,
               loop:true,
               responsive : {
                   0:{
                       items:1
                   }, //from zero to 600 screen
                   601:{
                       items:2
                   }, //from 600 to 1050 screen
                   1050:{
                       items:4
                   } //from 1050 to 1240 screen
               }

           });
       });
        
    }

    onClickCartButton(theApp){
    return function(e){
        console.log(e.target.getAttribute("data-sku"));
        let theSku = e.target.getAttribute("data-sku");
        theApp.shoppingCart.addItemToCart(theSku);
    }
}
    addProductsToCarousel(products,theApp){

        this.theApp = theApp;

        if (products === undefined || products == null){
            return ; // do not do anything! there is no data
        }

        for (let p=0; p<products.length; p++){
            let product = products[p];
            console.log(product);
            // each product is a product object
            // use it to create the element

            // create the DIV tag with class 'product-wrapper'
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","product-wrapper");

            // create a new IMG tag. Suggest to add data-sku attribute here too
            // so that if you 'click' on the image, it would pop up a quick-view
            // window and you can use the sku.
            let newImg = document.createElement("div");
           newImg.setAttribute("style",`background-image: url('${product.image}');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;`);
           newImg.setAttribute("alt", `${product.name}`); // this works too
            newImg.setAttribute("data-sku",product.sku);
            // create a set attribute "style" `

            let hr = document.createElement("hr");

            // create a new Paragraph to show a manufacturer
            let newPara = document.createElement("p");
            newPara.setAttribute("class","productmake");
            let newParaTextNode = document.createTextNode(product.manufacturer);
            newPara.appendChild(newParaTextNode);

            // create a new H3 tag to show the name
            let newH3Tag = document.createElement("h3");
            let newH3TagTextNode = document.createTextNode(product.name);
            newH3Tag.appendChild(newH3TagTextNode);

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class","price");
            let newPriceParaTextNode = document.createTextNode("$"+product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            let quickViewButton = document.createElement("button");
            quickViewButton.setAttribute("id",`qv_${product.sku}`);
            quickViewButton.setAttribute("data-sku",product.sku);
            quickViewButton.setAttribute("class","quickViewButton")
            let quickViewTextNode = document.createTextNode("Quick View");
            quickViewButton.appendChild(quickViewTextNode);

            let addToCartButton = document.createElement("button");
            addToCartButton.setAttribute("id",`cart_${product.sku}`);
            addToCartButton.setAttribute("data-sku",product.sku);
            addToCartButton.setAttribute("class","addToCartButton")
            let addToCartTextNode = document.createTextNode("Add to Cart");
            addToCartButton.appendChild(addToCartTextNode);
            addToCartButton.addEventListener("click",this.onClickCartButton(this.theApp),false);



            newDiv.appendChild(newImg);
            newDiv.appendChild(hr);
            newDiv.appendChild(newPara);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(quickViewButton);
            newDiv.appendChild(addToCartButton);
            this.carousel.appendChild(newDiv);
        }
            this.initCarousel();
    }

}
