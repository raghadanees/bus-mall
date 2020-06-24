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
var productsName = [];
//var storProduct = document.getElementById('divProducts') ///////////line for 13


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
  productsName.push(this.name);
  
}

if(localStorage.getItem('AllProducts')){
  allProducts=JSON.parse(localStorage.getItem('AllProducts')); //////////////////////////////////////////////////////////
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

  var forbiddenIndex = [];

  if (totalClicks > 0) {
    forbiddenIndex = [previousLeftImageIndex, previousrightImageIndex, previousMiddleImageIndex];
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

//currentLeftImage.timesShown = Number(localStorage.getItem(currentLeftImage.name+ ' timesOfShown'));     
  currentLeftImage.timesShown += 1;
localStorage.setItem(currentLeftImage.name+ ' timeOfShown', currentLeftImage.timesShown);

//currentMiddleImage.timesShown = Number(localStorage.getItem(currentMiddleImage.name+ ' timesOfShown'));
  currentMiddleImage.timesShown += 1;
localStorage.setItem(currentMiddleImage.name+ ' timeOfShown', currentMiddleImage.timesShown);

  //currentRightImage.timesShown = Number(localStorage.getItem(currentRightImage.name+ ' timesOfShown'));
  currentRightImage.timesShown += 1;
localStorage.setItem(currentRightImage.name+ ' timeOfShown', currentRightImage.timesShown);
}

function generateRandomNumber(forbiddenIndex) {

  var allowed;
  var randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * allProducts.length);
    allowed = true;
    for (var i = 0; i < forbiddenIndex.length; i++) {
      if (forbiddenIndex[i] === randomNumber) {
        allowed = false;
      }
    }
  } while (!allowed);

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
       // currentLeftImage.numberOfClicks = Number(localStorage.getItem(currentLeftImage.name));
        currentLeftImage.numberOfClicks += 1;
        localStorage.setItem(currentLeftImage, currentLeftImage.numberOfClicks);
      }

      if (clickedElementId === 'middle_product_img') {
        //currentMiddleImage.numberOfClicks = Number(localStorage.getItem(currentMiddleImage.name));
        currentMiddleImage.numberOfClicks += 1;
        localStorage.setItem(currentMiddleImage, currentMiddleImage.numberOfClicks);
      }


      if (clickedElementId === 'right_product_img') {
       // currentRightImage.numberOfClicks = Number(localStorage.getItem(currentRightImage.name));
        currentRightImage.numberOfClicks += 1;
        localStorage.setItem(currentRightImage, currentRightImage.numberOfClicks);
      }

      displayRandomImages();
    }
  } else {
    //add a code to display results
    var resultsList = document.getElementById('finalResult');

    // for (var i = 0; i < allProducts.length; i++) {
    //   var listItem = document.createElement('li');
    //   listItem.textContent = allProducts[i].name + ' had ' + allProducts[i].numberOfClicks + ' votes , and was shown ' + allProducts[i].timesShown + ' times';
    //   resultsList.appendChild(listItem);
    // }

    localStorage.setItem('AllProducts', JSON.stringify(allProducts));
   // console.log(JSON.parse(localStorage.getItem('AllProducts')));

    //allProducts = JSON.parse(localStorage.getItem('AllProducts'));//////////

    productsSection.removeEventListener('click', handleProductClick);
    drawResultChart();
  }
}


//...............................

// var allClicks = [];
// var allTimesShown = [];

function drawResultChart() {

  var allClicks = [];
  var allTimesShown = [];

  for (var i = 0; i < allProducts.length; i++) {
    allClicks.push(allProducts[i].numberOfClicks);
  }

  // console.log('allclicks',allClicks);

  

  for (var j = 0; j < allProducts.length; j++) {
    allTimesShown.push(allProducts[j].timesShown);
    
  }
  // console.log('allTimesShown' ,allTimesShown);



  var ctx = document.getElementById('myChart')//.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsName,
      datasets: [{
        label: '# of Clicks',
        data: allClicks,
        backgroundColor: "#da84c4",
        borderColor: 'rgba(255, 99, 132, 1)',
      
        borderWidth: 1
      },
      {
        label: ' # of times shown',
        data: allTimesShown,
        backgroundColor: "#9f6ed8",
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',

        // ],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]


    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            precision: 0,
            beginAtZero: true
          }
        }]
      }
    }
  });
}


/////////////////
/// Lab 13

