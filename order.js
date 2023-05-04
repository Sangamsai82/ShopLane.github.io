let count = $("#count");
//getting values from local storage using json.parse
let value = JSON.parse(localStorage.getItem("Products"));

value.splice(0);
localStorage.setItem("Products", JSON.stringify(value));
value = JSON.parse(localStorage.getItem("Products"));

//displaying number count for items added in cart
if(value==""||value==null){
    count.text("0")
}
$("#add2cart").click(function(){
    location.assign("./index.html");
})