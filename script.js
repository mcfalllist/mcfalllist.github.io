// Code goes here
// Dennis McFall
// Spring 2017
// Web233 Javascript
// Date: 4/19/2017
// Assignment #13
//Shopping List application

/*
1) Remove Cost Field

2) Remove "Add" text next to checkbox

3) Remove Version ?? from home page.

4) Add ability to submit new item when [enter] key pressed

5) Add popup describing app when visitors load webpage the first time
*/


var shoppinglist = [];
var addtocart = [];

var MyItems = {
  name:""
};


function showAppDescription()
{
  var message = "";
  
  message = "Shopping List Phone Application\n\n";
  message += " This convenient app was created during my javascript class - Spring 2017"
}


//In .JS file
//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
    alert("Welcome to the 'Shopping List' App");
    populateshoppinglistonload();
    displayShoppinglists();
    clearFocus();
}

//In .JS file
//v 4.0 populateshoppinglistonload()
function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('mcfalllist');
  //remove unwanted chars and format
  y = remove_unwanted(y); 
}



//v 3.0 Update function addShoppinglist by adding objects
function addShoppinglist(item) {
  //debugger;
  //v 3.0 declare variable for groc string
  var groc="";
  //v 3.0 v 3.0 declare variable for loop count
  var count=0;
  //v 3.0 edit value for MyItems.name
  MyItems.name=item;

  //v 3.0 for loop through object propterties and 
  for (var x in MyItems){
    //add to groc string from object array item
    groc += MyItems[x];
    //increment count by 1
   count++;
  }
  
  //push to shoppinglist
  shoppinglist.push(groc);
  
  //display shoppinglist
  displayShoppinglists();
  
   clearFocus();
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
  //debugger;
    deleteShoppinglists(num);
    addtocart.push(item);
    
  //display shoppinglist
  displayShoppinglists();

//v3.1 display displayShoppingCart() 
  displayShoppingCart();

  //Clear
  clearFocus();
}


function displayShoppinglists() {
  //debugger;
  var TheList = "";
  var arrayLength = shoppinglist.length;
  for (var i = 0; i < arrayLength; i++) {
    var arrays = shoppinglist[i];
    arrays = "'"+arrays+"'";
    var btnaddcart =  ' <input class="checkbox" name="add" type="checkbox" value="Add to Purchased List" onclick="addtoshopcart('+arrays+','+ i +')" />';
    var btndelete =  ' <input class="button" name="delete" type="button" value="Remove" onclick="deleteShoppinglists(' + i + ')" />';

    TheList = TheList + btnaddcart + ' ' + shoppinglist[i] + btndelete + '<br>';
  }

  document.getElementById("MyList").innerHTML = '<h4>Shopping List</h4>' + '<br>' + TheList;

}

function displayShoppingCart() {
  //debugger;
  var TheList = "";
  var arrayLength = addtocart.length;
  for (var i = 0; i < arrayLength; i++) { 
    var arrays = addtocart[i];
    arrays = "'"+arrays+"'";
    var btnaddlist =  ' <input class="checkbox" name="add" type="checkbox" checked value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" />';
    var btndelete =  ' <input class="button" name="delete" type="button" value="Remove" onclick="deleteShoppingCart(' + i + ')" />';
   
    TheList = TheList + btnaddlist + ' ' + addtocart[i] + btndelete + '<br>';
  }

document.getElementById("MyCart").innerHTML = '<h4>Shopping Cart</h4>' + '<br>' + TheList;

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
    //v 2.1: clear inputbox value out by id
    //v 2.1: http://stackoverflow.com/questions/4135818/how-to-clear-a-textbox-using-javascript 
    document.getElementById("item").value = "";
    //v 2.1: http://stackoverflow.com/questions/17500704/javascript-set-focus-to-html-form-element 
    document.getElementById("item").focus();
}


//v 4.0 save cookie
function savecookie()
{
  delete_cookie('mcfalllist');
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'mcfalllist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

//In .JS file
//v 4.0 read cookie and return
function readCookie(name) {
debugger;
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
//v 4.0 delete cookie
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
