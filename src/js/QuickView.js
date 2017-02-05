export default class QuickView{

    constructor(){
        console.log("Let's do a quickview of some gadget");
        this.quickview = document.getElementById("quickview");

        this.initQuickView();

    }
    
    initQuickView(){
     
    $(document).on('click', '#quickViewButton',function(evt){
       		console.log("Let the preview begin!");
        	$("#quickview").toggle(); 
        	$(".overlay").toggle();         
    });
       
      /* $(document).on('click', '#close, .overlay',function(evt){
       		console.log("Give me the quickview!");
        	$("#quickview").toggle(); 
        	$(".overlay").toggle();         
    	}); */
  }
}