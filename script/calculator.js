let inp = document.getElementById('input');
let inpHis = document.getElementById('inputHistory');
function increase(str) {
    inp.value = inp.value + str;
}



function checkAndProcess() {
    var sum;

    if (inpHis.innerHTML == "sin(") {
        inpHis.innerHTML = "sin(" + inp.value + ")=";
        inp.value = Math.sin(inp.value);
        animateALittle();
        return;
    }

    if (inpHis.innerHTML == "cos(") {
        inpHis.innerHTML = "cos(" + inp.value + ")=";
        inp.value = Math.cos(inp.value);
        animateALittle();
        return;
    }

    if (inpHis.innerHTML == "tan(") {
        inpHis.innerHTML = "tan(" + inp.value + ")=";
        inp.value = Math.tan(inp.value);
        animateALittle();
        return;
    }

    if (inpHis.innerHTML == "sqrt(") {
        inpHis.innerHTML = "&#8730;" + "  (" + inp.value + ")=";
        inp.value = Math.sqrt(inp.value);
        animateALittle();
        return;
    }

    try {
        sum = Function('"use strict";return (' + inp.value + ')')();
    }
    catch (err) {
        alert("syntax error");
        return;
    }
    inpHis.innerHTML = inp.value + "=";
    inp.value = sum;
    animateALittle();

}

function animateALittle() {
    inpHis.className = "animate";
    setTimeout(function () { inpHis.className = "normal"; }, 200);
}

function clearThis() {
    inp.value = "";
    inpHis.innerHTML = "Ans=";
    inp.placeholder = "";


}

function backspaceThis() {
    var str = inp.value;
    var str1 = "";
    for (i = 0; i < str.length - 1; i++) {
        str1 += str[i];
    }
    inp.value = str1;
}

function showSymb(trig) {
    inpHis.innerHTML = trig + "(";
    inp.placeholder = "[give value ]";
}