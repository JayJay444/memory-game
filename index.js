let colorsArray = ["white", "red", "black", "green", "blue", "yellow", "orange", "purple", "white", "red", "black", "green", "blue", "yellow", "orange", "purple"]
let shuffledColors = shuffle(colorsArray); // setting the initial position of colors
let counter = 0; // Counter used to check if two grid items have been clicked
let remainingPairs = 8; // Game is over once remainingPairs reaches 0
let moveNumber = 1; // Current move number
let clickedItems = []; // Array holding currently clicked grid items

function shuffle(array) { // function used to randomize the colors
  var m = array.length,
    t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

let gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((element, index) => {
  element.addEventListener("click", handleClick); // setting onClick behavior for all of the grid items

  function handleClick() {
    element.style.pointerEvents = "none"; // avoid clicking on the same element twice in a row
    element.style.backgroundColor = shuffledColors[index]; //set the color of grid item
    element.style.transition = "1s";
    clickedItems.push(element.id); // save clicked item to check if it's color matches the other's color
    ++counter; // increase the count of clicked items
    if (counter === 2) { // if 2 items are clicked start checking procedure
      checkReply();
    }
  };

});


function checkReply() {
  counter = 0; // set counter to 0 to be ready for next move

  let gridItems2 = document.querySelectorAll(".grid-item");
  gridItems2.forEach((element, index) => {
    element.style.pointerEvents = "none"; // block clicking on elements until checking procedure ends
  });

  let square1Style = document.getElementById(clickedItems[0]).style.backgroundColor;
  let square2Style = document.getElementById(clickedItems[1]).style.backgroundColor;
  if (square1Style === square2Style) {
    setTimeout(hideSquares, 1000); //if clicked items match initiate hiding procedure

    function hideSquares() {
      document.getElementById(clickedItems[0]).style.visibility = "hidden";
      document.getElementById(clickedItems[0]).style.transform = "rotateY(180deg)";
      document.getElementById(clickedItems[1]).style.visibility = "hidden";
      document.getElementById(clickedItems[1]).style.transform = "rotateY(180deg)";
      clickedItems = []; //once items are compared they may be removed from clickedItems array
      if (--remainingPairs === 0) { //end the game once there are no items left
        document.getElementById("headerId").innerHTML = "You are the Winner!";
        document.getElementById("tryAgainLink").style.display = "inline";
        document.getElementById("gridBox").style.display = "none";
      } else { //update move number if there are still items left
        ++moveNumber;
        document.getElementById("moveId").innerHTML = "Move " + moveNumber;
      }

      let gridItems3 = document.querySelectorAll(".grid-item");
      gridItems3.forEach((element, index) => {
        element.style.pointerEvents = "auto"; // after checking procedure enable clicking on items
      });

    }
  } else {
    setTimeout(moveBack, 1500); //if clicked items don't match initiate moving back procedure

    function moveBack() { //return the items to initial state
      document.getElementById(clickedItems[0]).style.backgroundColor = "";
      document.getElementById(clickedItems[1]).style.backgroundColor = "";
      clickedItems = []; //once items are compared they may be removed from clickedItems array
      ++moveNumber;
      document.getElementById("moveId").innerHTML = "Move " + moveNumber; //update move number

      let gridItems3 = document.querySelectorAll(".grid-item");
      gridItems3.forEach((element, index) => {
        element.style.pointerEvents = "auto"; // after checking procedure enable clicking on items
      });
    }
  }
}
