// Code goes here
// Dennis McFall
// Spring 2017
// Web233 Javascript
// Date: 4/30/2017
// Assignment #15
//Non Profit Organization Donor List

/*
Add ability to convert shared URL to a bitly link
Work on CSS
Work on webpage content (photos, descriptions, title tag, etc.)
Make web app yours! 
Make list different than shopping list (examples: idea list, book list, movie list, etc.)
Change title to fit that list
Update "about" description of app!
Submit bitly link below using pre-populated list showing how list could be used
*/


var shoppinglist = [];
var addtocart = [];

var MyItems = {
  name:"",
  price:""
};


function showAppDescription()
{
  var message = "";
  
  message = "Non Profit Organization Donor List\n";
  message += " This convenient app was created during my javascript class - Spring 2017";
  alert(message);
}

//v4.1 ShareList via bitly api
function passlist()
{
   var getshorturl=0;
   var login = "mcfalldm02";
   var api_key = "R_f6a9516f492a46ca9d6fa7484b68f66a";
   var long_url = "https://mcfalllist.github.io/index.html?list="+ shoppinglist;
    try{
            $.getJSON(
             "https://api-ssl.bitly.com/v3/shorten?callback=?",
              {
                  "format": "json",
                  "apiKey": api_key,
                  "login": login,
                  "longUrl": long_url
              },
             function(response)
             {
                getshorturl = 1;
                document.getElementById("sharelist").innerHTML = 'Share List:\n' + response.data.url;
                copyToClipboard(response.data.url);
                // copyToClipboard('sharelist');
                 //alert("ShoppingList URL Copied");
             });
        } 
        catch(err) 
        {
            //alert("Error : "+ err);
            document.getElementById("sharelist").innerHTML = 'Share List:\n' + long_url;
            //copyToClipboard("sharelist");
            copyToClipboard(long_url);
            //alert("ShoppingList URL Copied");
        }
}

//v4.1 share function
function share()
{
   passlist();
}

//v4.1 prompt message to copy URL
function copyToClipboard(text) {
   window.prompt("Copy & Share List!", text);
}


//In .JS file
//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
    alert("Welcome to the 'Donor List' App");
    populateshoppinglistonload();
    displayShoppinglists();
    clearFocus();
}

function get(name){
    var url = window.location.search;
    var num = url.search(name);
    var namel = name.length;
    var frontlength = namel+num+1; 
    var front = url.substring(0, frontlength);
    url = url.replace(front, "");
    num = url.search("&");
    if(num>=0) return url.substr(0,num);
    if(num<0)  return url;
}

function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('mcfalllist');
  //remove unwanted chars and format
  y = remove_unwanted(y); 
  //spit array by comma %2C
  
  var geturllistvalue = get("list");
    if (geturllistvalue) {
        geturllistvalue = remove_unwanted(geturllistvalue);
      geturllistvalue = geturllistvalue.split(',');
      shoppinglist = geturllistvalue;
  }else if (y){
       y = y.split('%2C');
      shoppinglist = y;
  }
}




//v 3.0 Update function addShoppinglist by adding objects
function addShoppinglist(item) {

  if (item != "")
  {
    document.getElementById("sharelist").innerHTML = ' ';
    shoppinglist.push(item);
    displayShoppinglists();
    displayShoppingCart(); 
    clearFocus();
    savecookie();
  }else
  {
      alert("Donor Name Required: Please enter now :)");
      clearFocus();
  }
}


function changeShoppinglist(position) {
  //document.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var eitem = prompt("Please enter new item", e1);
  shoppinglist[position] = eitem + ",";
  
  displayShoppinglists();
  
  displayShoppingCart();
  
}


function addbacktoshoppinglist(item,num) {
  //push to deleteShoppingCar
   deleteShoppingCart(num);
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();

//v3.1 display displayShoppingCart() 
  displayShoppingCart()
 
  clearFocus();
}

//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
    document.getElementById("sharelist").innerHTML = ' ';
    deleteShoppinglists(num);
    addtocart.push(item);
    
    displayShoppinglists();
    displayShoppingCart(); 
    clearFocus();

   savecookie();
}

function displayShoppinglists() {
    document.getElementById("MyList").innerHTML = '';
    var tableStart = "<table class='tableList'>";
    var tableStop = "</table>";
    var TheList = "";
    var TheRow = "";
    var arrayLength = shoppinglist.length;
    for (var i = 0; i < shoppinglist.length; i++) {
          //v 3.1 change button name to btndelete
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteShoppinglists(' + i + ')" />';
        var arrays = shoppinglist[i];
        arrays = "'"+arrays+"'";
        var btnaddcart =  '<input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />';
        var btnsharelist = '<input class="button" id="sharebutton" name="shares" type="submit" value="Share List" onclick="share()" />';
        
        TheList = TheList + '<tr class="row"><td class="item">' + btnaddcart + '</td><td class="item">' + shoppinglist[i] + '</td><td class="item">' + btndelete + '</td></tr>';
    }
    
    TheList = tableStart + TheList + tableStop;

  if (arrayLength > 0)
  {
    document.getElementById("MyList").innerHTML = '<h4>Qualified Donors</h4>' + TheList;
    document.getElementById("sharebutton").innerHTML = btnsharelist;
  }else
  {
    document.getElementById("MyList").innerHTML = ' ';
    document.getElementById("sharebutton").innerHTML = ' ';
    document.getElementById("sharelist").innerHTML = ' ';
  }
  
}

function displayShoppingCart() {
  //debugger;
  var TheList = "";
    var tableStart = "<table class='tableCart'>";
    var tableStop = "</table>";
  var arrayLength = addtocart.length;
  for (var i = 0; i < arrayLength; i++) { 
    var arrays = addtocart[i];
    arrays = "'"+arrays+"'";
    var btnaddlist =  ' <input class="checkbox" name="add" type="checkbox" checked value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" />';
    var btndelete =  ' <input class="button" name="delete" type="button" value="Remove" onclick="deleteShoppingCart(' + i + ')" />';
   
    TheList = TheList + '<tr class="row"><td class="item">' + btnaddlist + '</td><td class="item">' + addtocart[i] + '</td><td class="item">' +  btndelete +  '</td></tr>';
  }
  
  TheList = tableStart + TheList + tableStop;

document.getElementById("MyCart").innerHTML = '<h4>Disqualified Donors</h4>' + TheList;

}

function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}


function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();

}


 //v 2.1 add function 'clearFocus'
function clearFocus()
{
    document.getElementById("item").value = "";
    document.getElementById("item").focus();
}


//v 4.0 save cookie
function savecookie()
{
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'mcfalllist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//In .JS file
function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//In .JS file
//v. 4.0remove and format cookie
function remove_unwanted(str) {  
    
  if ((str===null) || (str===''))  
       return false;  
 else  
   str = str.toString();  
   str = str.replace(/%20/g, "");
   str = str.replace(/%24/g, "$"); 
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');  
} 
