'use strict';
/*
  - Randomly put 2 goats on the screen
  - When a user clicks on any goat, both images change randomly
  - After the user have a total of 5 clicks, stop the application from changing the images, and show results as following:
    - How many times was each image displayed?
    - How many times was each image clicked?
  - Make sure left and right images are unique
  - Prevent last picked goats from being picked
*/


/*
1 - Images - object for each (constructor)
2 - Array to contain all objects
3 - Random number function
4 - Global variable to track total clicks
5 - event listeners
*/

var productsSection = document.getElementById('all_products');
var allProducts = [];
var totalClicks = 0;

var leftImage = document.getElementById('left_product_img');
var middleImage = document.getElementById('middle_product_img');
var rightImage = document.getElementById('right_product_img');

var currentLeftImage;
var currentMiddleImage;
var currentRightImage;

var previousLeftImageIndex;
var previousMiddleImageIndex;
var previousrightImageIndex;

function ProductPicture(name, url) {
  this.name = name;
  this.url = url;
  this.numberOfClicks = 0;
  this.timesShown = 0;
  allProducts.push(this);
}

new ProductPicture('bag', 'images/bag.jpg');
new ProductPicture('banana', 'images/banana.jpg');
new ProductPicture('bathroom', 'images/bathroom.jpg');
new ProductPicture('boots', 'images/boots.jpg');
new ProductPicture('breakfast', 'images/breakfast.jpg');
new ProductPicture('bubblegum', 'images/bubblegum.jpg');
new ProductPicture('chair', 'images/chair.jpg');
new ProductPicture('cthulhu', 'images/cthulhu.jpg');
new ProductPicture('dog-duck', 'images/dog-duck.jpg');
new ProductPicture('dragon', 'images/dragon.jpg');
new ProductPicture('pen', 'images/pen.jpg');
new ProductPicture('pet-sweep', 'images/pet-sweep.jpg');
new ProductPicture('scissors', 'images/scissors.jpg');
new ProductPicture('shark', 'images/shark.jpg');
new ProductPicture('sweep', 'images/sweep.png');
new ProductPicture('tauntaun', 'images/tauntaun.jpg');
new ProductPicture('unicorn', 'images/unicorn.jpg');
new ProductPicture('usb', 'images/usb.gif');
new ProductPicture('water-can', 'images/water-can.jpg');
new ProductPicture('wine-glass', 'images/wine-glass.jpg');





// all products [img1, img2, img3, img4,......., img20]
function displayRandomImages() {

  var forbiddenIndex=[];

  if(totalClicks > 0){
    forbiddenIndex = [previousLeftImageIndex, previousrightImageIndex , previousMiddleImageIndex];
  }

  var leftIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(leftIndex);
  var middleIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(middleIndex);
  var rightIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(rightIndex);
  


  previousLeftImageIndex = leftIndex;
  previousrightImageIndex = rightIndex;
  previousMiddleImageIndex = middleIndex;


  currentLeftImage = allProducts[leftIndex];
  currentRightImage = allProducts[rightIndex];
  currentMiddleImage = allProducts[middleIndex];


  leftImage.setAttribute('src', currentLeftImage.url);
  middleImage.setAttribute('src', currentMiddleImage.url);
  rightImage.setAttribute('src', currentRightImage.url);


  currentLeftImage.timesShown += 1;
  currentMiddleImage.timesShown += 1;
  currentRightImage.timesShown += 1;

}

function generateRandomNumber(forbiddenIndex) {

  var allowed;
  var randomNumber;

  do{
    randomNumber = Math.floor(Math.random() * allProducts.length);
    allowed = true;
    for(var i = 0; i < forbiddenIndex.length ; i++){
      if(forbiddenIndex[i] === randomNumber){
        allowed = false;
      }
    }
  } while(!allowed);

  return randomNumber;
}

displayRandomImages();

productsSection.addEventListener('click', handleProductClick);

function handleProductClick(event) {
  if (totalClicks < 25) {
    var clickedElement = event.target;
    var clickedElementId = clickedElement.id;

    if (clickedElementId === 'left_product_img' || clickedElementId === 'middle_product_img' || clickedElementId === 'right_product_img') {
      totalClicks++;

      if (clickedElementId === 'left_product_img') {
        currentLeftImage.numberOfClicks += 1;
      }

      if (clickedElementId === 'middle_product_img') {
        currentMiddleImage.numberOfClicks += 1;
      }

      if (clickedElementId === 'right_product_img') {
        currentRightImage.numberOfClicks += 1;
      }

     

      displayRandomImages();
    }
  }else {
    // add a code to display results
    var resultsList = document.getElementById('finalResult');

    for (var i = 0; i < allProducts.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = allProducts[i].name + ' had ' + allProducts[i].numberOfClicks + ' votes , and was shown ' + allProducts[i].timesShown + ' times';
      resultsList.appendChild(listItem);
    }

    productsSection.removeEventListener('click', handleProductClick);
  }
}

