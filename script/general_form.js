
    function showWarning(warnText, wait = 2000) {
        divWarning = document.createElement("div");
        divWarning.style = "height:30%; width:22%; background-color:rgb(2, 26, 2); green;position :fixed; color:rgb(217, 255, 220);  left: 37%;top:32%; box-shadow:0 0 20px green; border-radius:4%;padding:30px;";
        divWarning.id = "addedNow";
        temp = document.createElement("p");
        temp1 = document.createTextNode(warnText);
        temp.appendChild(temp1);
        divWarning.appendChild(temp);
  
        fix = document.getElementById("warning");
        fix.appendChild(divWarning);
        setTimeout(function () { document.getElementById("addedNow").remove() }, wait);
        return;
      }
  
      function checkFormat() {
        name = document.getElementById("name").value;
        sid = document.getElementById("sid").value;
        email = document.getElementById("email").value;
  
  
        if (name == "" || sid == "") {
          showWarning("please fill form");
          return;
        }
  
        for (let alpha of name) {
  
          if (!(alpha.match(/[a-z]|[A-Z]|\s/))) {
            showWarning("Please give valid name with alphabets only");
            return;
          }
        }
  
        for (let digit of sid) {
          if (!(digit.match(/[a-z]|[A-Z]|[0-9]/)) || sid == "") {
            showWarning("Please give valid sid with alphanumeric numbers only");
            return;
          }
        }
  
        isMail = /\S+@\S+\.+\S/.test(email);
  
  
        if (!isMail) {
          showWarning("please provide a valid email address");
          return;
        }
  
  
        document.getElementById("form").remove();
  
        showWarning("Hello " + name + ", your registered sid is " + sid + ". We will contact you soon at " + email + ". Have a great day!", 100000000);
  
  
  
      }