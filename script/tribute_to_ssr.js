//setting page to slide-1 to properly handle slides
window.location.href = "#slide-1";


//transition acc. to whatever transitionTo function toLeft or to right 
function transitionTo(giveNewSlideNo) {

    flashEffect();//lasts 900ms

    var currentSlideNo = parseInt(window.location.href.slice(-1));

    //wait to execute until the flash visual effect is brightest
    setTimeout(
        function () {
            window.location.href = "#slide-" + giveNewSlideNo(currentSlideNo);
        },
        450
    )

}

//decrease slide no. but on reaching 1 make it 6
function prevSlideNo(currentSlideNo) {
    return (currentSlideNo == 1) ? 6 : (currentSlideNo - 1);
}

//increase slide no. but on reaching 6 make it 1
function nextSlideNo(currentSlideNo) {
    return (currentSlideNo == 6) ? 1 : (currentSlideNo + 1);
}




function flashEffect() {
    document.getElementById("sliderEnvelop").className = "flashEffect";
    setTimeout(function () { document.getElementById("sliderEnvelop").className = "reloadFlashAnimation"; }, 900);
}

//to get the xml file from the same directory, it was made synchronous because we are not dealing with server
var httpFileTransferTool = new XMLHttpRequest;
httpFileTransferTool.open("GET", "../xml/helpline.xml", false);
httpFileTransferTool.send();

var str1 = httpFileTransferTool.responseXML;

function makeTable() {
    
    var row, data1, data2,
    
    rowsLength = str1.childNodes[0].childNodes.length,   //str1.childNodes[0] is root, whose children are multiple organisation tags 
    
    finalTable = document.createElement("table");   //creating table with dom 
    
    finalTable.style = "margin:auto;color:rgb(8, 32, 15);font-family:monospace;font-size:16px";


    //placing rows in table acc. to the length of aquired xml object
    for (var i = 0; i < rowsLength; i++) {

        //create a row
        row = document.createElement("tr");

        //create two data cell
        data1 = document.createElement("td");
        data2 = document.createElement("td");

        //add data to cells from xml object
        data1.appendChild(document.createTextNode(str1.childNodes[0].childNodes[i].childNodes[0].innerHTML + ":"));
        data2.appendChild(document.createTextNode(str1.childNodes[0].childNodes[i].childNodes[1].innerHTML));

        //insert the cells into the above row 
        row.appendChild(data1);
        row.appendChild(data2);

        //add the row to into the final table
        finalTable.appendChild(row);
    }

    //place the table in the table area already researved in html
    var tableArea = document.getElementById("tableAreaDiv");
    tableArea.appendChild(finalTable);

    //remove the button after one click when the table is visible, so that multiple click do not add more data
    document.getElementById("moreInfoButton").remove();
}
