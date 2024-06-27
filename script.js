const imageContainerEl = document.getElementById("image-container");
const spinnerEl = document.getElementById("loader");

const count = 30;
const apiKey = "Tf5KHj7nOYccfG7Qh_oCeZZuN5ZwHTDu-hz16A2MbeE";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let imagesLoaded  = 0 
let totalImage = 0 ;
let ready = false;


// checking if  all the images are loaded and tracking image count
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImage){
        ready = true;
    }
}

// function to set attributes for the element
function settingAttributes(element,attributesObj){
    for (const key in attributesObj){
        element.setAttribute(key,attributesObj[key]);    
    }
   
}

// function for creating elements dynamically and display it
function createAndDisplayPhotos(){
    console.log("calling create and display()")
    imagesLoaded = 0 ;
    totalImage = photosArray.length;
    
    
    photosArray.forEach(photo => {
        
        // creating anchor element 
        const item = document.createElement("a");
        // calling helper function to set attributes for element to reduce repeated codes 
        settingAttributes(item,{
            "href":photo.links.html, 
            "target":"_blank"});

        // creating image element 
        const image = document.createElement("img");
        // calling helper function to set attributes for element to reduce repeated codes 
        settingAttributes(image,{
            "src":photo.urls.regular,
            "alt":photo.alt_description,
            "title":photo.alt_description
        });
        

        // CALLING load() to check if each image is loaded and then only it should append in the item
        image.addEventListener("load" ,imageLoaded);

        // appending image element inside the anchor element & anchor inside the figure element
        item.appendChild(image);
        imageContainerEl.appendChild(item);

    });

    spinnerEl.hidden = true;
    
   
    


}

// asynchronus function to get photos from api using fetch
async function getPhotosFromApi () {
    
    try{
        let response = await fetch(apiUrl);
        photosArray = await response.json();
        createAndDisplayPhotos();  
        

    }catch(error){
       console.log(error);
    }
   
}


// scroll event occurs when the user scrolls to bottom of the page scroll event occurrs

this.addEventListener("scroll" , function(){
    
    if(this.innerHeight + this.scrollY >= document.body.offsetHeight -1000 && ready){
        ready = false;
        console.log("scroll event occured");
        createAndDisplayPhotos();
        
    }
})



getPhotosFromApi();

