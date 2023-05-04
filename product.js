// to get the id from url (it returns anything in url after ? in the form of string)
let indexPos = Number(location.search.split("=")[1]); 

//function to render DOM Tree
function getDOMTree(obj){
    let mainSection = document.getElementById("product-detail");
    mainSection.innerHTML = `<div id="left-section">
                            <img id="image-preview" src="${obj.preview}" alt="Preview-Image">
                            </div>
                            <div id="right-section">
                            <h1 id="name">${obj.name}</h1>
                            <h3 id="brand">${obj.brand}</h3>
                            <h3 id="price-header">Price: Rs <span id="price">${obj.price}</span></h3>
                            <h3>Description</h3>
                            <p id="description">${obj.description}</p>
                            <h3>Product Preview</h3>
                            <div id="thumbnail"></div>
                            <button id="add2cart" >Add to Cart</button></div>`
    let thumbnail = document.getElementById("thumbnail");
    let cartButton = document.getElementById("add2cart");
    let count = $("#count");
    let foundAtIndex = -1;
    let emptyArr = [];
    let value = JSON.parse(localStorage.getItem("Products"));
    if(value==""||value==null){
        count.text("0")
    }
    else{
        let index = (value.length)-1;
        count.text(value[index].allProductsCount);
    }

    // function cartValue(){
        
    //     if(value==""||value==null){
    //         count.text("0")
    //     }
    //     else{
    //         count.text(value[0].allProductsCount)
    //     }
    // }

    function itemsInCart(items){
        // console.log(items)
        let newValue = JSON.parse(localStorage.getItem("Products"));
        // console.log(newValue)
        if(newValue==null || newValue==undefined || newValue==""){
            items.quantity = 1;
            items.allProductsCount = 1
            emptyArr.push(items);
            localStorage.setItem("Products", JSON.stringify(emptyArr));
            newValue = JSON.parse(localStorage.getItem("Products"));
            // count.text(newValue.allProductsCount)
            console.log(newValue[0].allProductsCount)
            count.text(newValue[0].allProductsCount)
        }
        else if(newValue != null || newValue != undefined){
            // newValue = JSON.parse(localStorage.getItem("Products"));
            for(let i=0; i<newValue.length;i++){
                if(items.id == newValue[i].id){
                    foundAtIndex= i;
                    break;
                }
            }
            if(foundAtIndex>=0){
                newValue[foundAtIndex].quantity += 1;
                newValue[foundAtIndex].allProductsCount += 1;
                localStorage.setItem("Products", JSON.stringify(newValue));
                newValue = JSON.parse(localStorage.getItem("Products"));
                count.text(newValue[foundAtIndex].allProductsCount);
            }
            else{
                
                items.quantity = 1;
                let index = (newValue.length)-1;
                items.allProductsCount = (newValue[index].allProductsCount)+1;
                count.text(items.allProductsCount);
                newValue.push(items);

                localStorage.setItem("Products",JSON.stringify(newValue));
                newValue = JSON.parse(localStorage.getItem("Products"));
                
            }
        }
    }
    cartButton.onclick = function(){
        itemsInCart(obj);
    }
    

    //Loop to add tiny thumbnail images in right section                 
    for(let i =0; i<obj.photos.length; i++){
        thumbnail.innerHTML += `<img id="img${i}" class="${ i == 0 ? 'border' : ''} imgData" src="${obj.photos[i]}" alt="preview${i}" >`
    }  

    let imageSelect = document.querySelectorAll(".imgData");
    let lhsImage = document.getElementById("image-preview");

    //Function to remove the class from all the thumbnail images
    function removeBorder(){
        for(let l = 0; l<obj.photos.length; l++){
            imageSelect[l].classList.remove("border");
        }
    }

    //Loop to add Onclick Event listener for each thumbnail image
    for(let k=0; k<imageSelect.length; k++){
        imageSelect[k].addEventListener("click", function(){
            removeBorder();
            imageSelect[k].className = "border"; //adding border to only the clicked thumbnail image
            lhsImage.src = imageSelect[k].src; //giving clicked thumbnail image src to preview image 
        });
    }
}

$.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${indexPos}`, function(res){
    getDOMTree(res)
})