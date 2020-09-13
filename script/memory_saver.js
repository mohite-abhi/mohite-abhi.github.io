
  //this function creates a new page to showcase the entered details by first flushing the contents alreadt
  //present and then adding new things
  function showcase_input() {
    var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var image = document.getElementById("file").files[0];
    
  //won't process untill we get all the input
    if(name =="" || document.getElementById("file").value=="")
    {
      return;
    }


  //now if all input recieved then remove all the contents already present on the screen
    document.getElementById("form").remove();
    document.getElementById("div1").remove();

  //now create a page node by node
    name_para = document.createElement("p");
    name_text = document.createTextNode(name);
    name_para.style = "font-family:cursive;font-size:30px;font-color:purple;"

    city_para = document.createElement("p");
    city_text = document.createTextNode(city);
    city_para.style = "font-family:cursive;font-size:30px;font-color:purple;"


    name_para.appendChild(name_text);
    city_para.appendChild(city_text);

    selected_image = document.createElement("img");
    if (image) {
    //this one was very difficult as the browser was returning any pseudo address of the picture so couldn't directly use
    //in the src, i saw this one from https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript
      selected_image.src = URL.createObjectURL(image);
    }
    selected_image.style = "width:60%; border-radius:10px;box-shadow:10px 10px 15px #1a01a2";
    bdy = document.body

    name_label = document.createElement("label");
    name_text = document.createTextNode("Description : ")
    name_label.style = "float:left;margin:22px 30px 0 0;"
    name_label.appendChild(name_text)

    citylabel = document.createElement("label");
    citytext = document.createTextNode("City : ")
    citylabel.style = "float:left;margin-right:60px;"
    citylabel.appendChild(citytext)


    heading_name = document.createTextNode("Your Memory")
    heading_1 = document.createElement("h1")
    heading_1.appendChild(heading_name)
    bdy.appendChild(heading_1)
    heading_1.style = "font-size:30px; color:rgba(52, 69, 143, 0.678);text-align:center;";

    bdy.appendChild(name_label);
    bdy.appendChild(name_para);

    bdy.appendChild(citylabel)
    bdy.appendChild(city_para)
    bdy.appendChild(selected_image);
  }