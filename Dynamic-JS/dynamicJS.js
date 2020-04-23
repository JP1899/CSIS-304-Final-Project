var turn = document.getElementById("turn")
// Set X or O by box
var boxes = document.querySelectorAll("#main div"), X_or_O = 0;

//Takes inputted boxes, changes color to red and prints winner statement
function selectWinningBoxes(b1, b2, b3)
{
    b1.style.background =  "tomato";
    b2.style.background =  "tomato";
    b3.style.background =  "tomato";
    turn.innerHTML = "Congratulations! " + b1.innerHTML + " is the winner!"
}

//Gets box elements from HTML
function getWinner() 
{
    var box1 = document.getElementById("box1"),
        box2 = document.getElementById("box2"),
        box3 = document.getElementById("box3"),
        box4 = document.getElementById("box4"),
        box5 = document.getElementById("box5"),
        box6 = document.getElementById("box6"),
        box7 = document.getElementById("box7"),
        box8 = document.getElementById("box8"),
        box9 = document.getElementById("box9");


    // get all possibilities for a win
    if (box1.innerHTML !== "" && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML)
    {
        selectWinningBoxes(box1, box2, box3);
    }
    if (box4.innerHTML !== "" && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML)
    {
        selectWinningBoxes(box4, box5, box6);
    }
    if (box7.innerHTML !== "" && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML)
    {
        selectWinningBoxes(box7, box8, box9);
    }
    if (box1.innerHTML !== "" && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML)
    {
        selectWinningBoxes(box1, box4, box7);
    }
    if (box2.innerHTML !== "" && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML)
    {
        selectWinningBoxes(box2, box5, box8);
    }
    if (box3.innerHTML !== "" && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML)
    {
        selectWinningBoxes(box3, box6, box9);
    }
    if (box1.innerHTML !== "" && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML)
    {
        selectWinningBoxes(box1, box5, box9);
    }
    if (box3.innerHTML !== "" && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML)
    {
        selectWinningBoxes(box3, box5, box7);
    }
}


    // set event onclick
    for(var i = 0; i < boxes.length; i++) 
    {
        boxes[i].onclick = function() {
            // Only allow each box to be selected once
            if (this.innerHTML !== "X" && this.innerHTML !== "O")
            {
                if (X_or_O % 2 === 0) {
                    console.log(X_or_O);
                    this.innerHTML = "X";
                    turn.innerHTML = "O's Turn";
                    getWinner();
                    X_or_O += 1;

                }
                else
                {
                    console.log(X_or_O);
                    this.innerHTML = "O";
                    turn.innerHTML = "X's Turn";
                    getWinner();
                    X_or_O += 1;
                }
            }
        };
    }

    //Resets the play board to empty and propmpts user to select a box
    function replay()
    {
        for(var i = 0; i < boxes.length; i++) 
        {
            boxes[i].style.background = "none";
            boxes[i].innerHTML = "";
            turn.innerHTML = "Select any box to begin";
        }
    }
© 2020 GitHub, Inc.
