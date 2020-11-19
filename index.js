let colorsArray = ["white", "red", "black", "green", "blue", "yellow", "orange", "purple", "white", "red", "black", "green", "blue", "yellow", "orange", "purple"]
let shuffledColors = shuffle(colorsArray);
let counter = 0;
let remainingPairs = 8;
let moveNum = 1;
let clickedItems = [];

function shuffle(array) {
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
  element.addEventListener("click", handleClick);
  function handleClick() {
    element.style.backgroundColor = shuffledColors[index];
    element.style.transition = "1s";
    clickedItems.push(element.id);
    ++counter;
    if (counter === 2) {
      checkReply();
    }
  };
});

function checkReply() {
  counter = 0;
  let square1Style = document.getElementById(clickedItems[0]).style.backgroundColor;
  let square2Style = document.getElementById(clickedItems[1]).style.backgroundColor;
  if (square1Style === square2Style) {
    setTimeout(hideSquares, 1000);
    function hideSquares() {
      document.getElementById(clickedItems[0]).style.visibility = "hidden";
      document.getElementById(clickedItems[1]).style.visibility = "hidden";
      clickedItems = [];
      if (--remainingPairs === 0) {
        document.getElementById("headerId").innerHTML = "You are the Winner!";
        document.getElementById("tryAgainLink").style.display = "inline";
        document.getElementById("gridBox").style.display = "none";
      } else {
        ++moveNum;
        document.getElementById("moveId").innerHTML = "Move " + moveNum;
      }
    }
  } else {
    setTimeout(moveBack, 1500);
    function moveBack() {
      document.getElementById(clickedItems[0]).style.backgroundColor = "";
      document.getElementById(clickedItems[1]).style.backgroundColor = "";
      clickedItems = [];
      ++moveNum;
      document.getElementById("moveId").innerHTML = "Move " + moveNum;
    }
  }
}
