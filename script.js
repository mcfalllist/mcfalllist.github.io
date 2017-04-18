// Code goes here
// Dennis McFall
// Spring 2017
// Web233 Javascript
// Date: 4/16/2017
// Assignment #13
//Shopping List Version 4.2

/*
It should have ability to create new cookie file from shoppinglist array
It should have ability to read cookie file and update shoppinglist array
It should have ability to delete cookie file 
It should have ability to save new cookie file after displayshoppinglist function
It should have ability to load & read cookie file function on Windows load
It should have ability to populate shoppinglist array from cookie file
*/


var shoppinglist = [];
var addtocart = [];

var MyItems = {
  name:""
};



//In .JS file
//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
  debugger;
  populateshoppinglistonload();
   displayShoppinglists();
};

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
  //spit array by comma %2C
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
   }
}



//v 3.0 Update function addShoppinglist by adding objects
function addShoppinglist(item) {
  
  //v 3.0 declare variable for groc string
  var groc="";
  //v 3.0 v 3.0 declare variable for loop count
  var count=0;
  //v 3.0 edit value for MyItems.name
  MyItems.name=item;
  //v 3.0 for loop through object propterties and 
  for (var x in MyItems){
    if (count===1){
      groc += "$";
    }
    //add to groc string from object array item
    groc += MyItems[x];
    if (count===0){
      groc += " | ";
    }
    //increment count by 1
   count++;
  }
  //push to shoppinglist
  shoppinglist.push(groc);
  //display shoppinglist
  displayShoppinglists();
  
  //v 4.0 save cookie
  savecookie();
  
//v 2.1: call function 'clearFocus'
   clearFocus();
}


function changeShoppinglist(position) {
  //document.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  shoppinglist[position] = eitem;
  displayShoppinglists();
  
  //v 4.0 save cookie
  savecookie();
  
  displayShoppingCart();
  
}


function addbacktoshoppinglist(item,num) {
  //push to deleteShoppingCar
   deleteShoppingCart(num);
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();
  
   //v 4.0 save cookie
  savecookie();
  
//v3.1 display displayShoppingCart() 
  displayShoppingCart()
 
  clearFocus();
}

//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
    deleteShoppinglists(num);
    addtocart.push(item);
  //display shoppinglist
  displayShoppinglists();
  
    //v 4.0 save cookie
  savecookie();

//v3.1 display displayShoppingCart() 
  displayShoppingCart();

  //Clear
  clearFocus();
}


function displayShoppinglists() {
var TheList = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < arrayLength; i++) {
var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  ' <input class="checkbox" name="add" type="checkbox" value="Add to Purchased List" onclick="addtoshopcart('+arrays+','+ i +')" />';
TheList = TheList + shoppinglist[i] + btndelete + ' ' + btnaddcart + '<br>';
}
document.getElementById("MyList").innerHTML = '<h4>Shopping List</h4>' + '<br>' + TheList;
}

function displayShoppingCart() {
var TheList = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {
var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
var arrays = addtocart[i];
arrays = "'"+arrays+"'";
 var btnaddlist =  ' <input class="checkbox" name="add" type="checkbox" checked value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" />';
TheList = TheList + addtocart[i] + btndelete + ' ' + btnaddlist + '<br>';
}
document.getElementById("MyCart").innerHTML = '<h4>Shopping Cart</h4>' + '<br>' + TheList;
}


function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  
  //v 4.0 save cookie
  savecookie();
  
  displayShoppingCart();
}


function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  
    //v 4.0 save cookie
  savecookie();

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





/*


Main();

function Main()
{
  var end = 0;
  var input;
  var itemInput;
  var itemNum;
  var newItemName;
  
  var promptText = "Shopping List Application 2.0\n";
  promptText += "Enter A to Add an item to the list\n";
  promptText += "Enter C to Change an item in the list\n";
  promptText += "Enter D to Delete an item from the list\n";
  promptText += "Enter Q to Quit\n";
  
  do
  {
    input = prompt(promptText);
    switch(input.toUpperCase())
    {
      case "A": //add item
        itemInput = prompt("Enter a new item");
        if(itemInput.length > 0)
        {
           addShoppinglistItem(itemInput);
        }
        else
        {
          alert("invalid input - name is 0 length");
        }
        break;
      case "C": //change item 
        itemNum = Number(prompt("Enter item number to change."));
        //validate user input using regular expression
        if(/[0-9]/.test(itemNum))
        {
            newItemName = prompt("Enter new item text.")
            if(newItemName.length > 0)
            {
              changeShoppinglistItem(itemNum,newItemName);
            }
            else
            {
              alert("invalid input - name is 0 length");
            }
        }
        else
        {
          alert("invalid input - not a number");
        }
        break;
      case "D"://delete item
         itemNum = Number(prompt("Enter item number to delete."));
         if(!isNaN(itemNum))
         {
            deleteShoppinglistItem(itemNum);
         }
         else
         {
           alert("invalid input - not a number");
         }
        break;
      case "Q"://quit program
        displayShoppinglist();
        end = 1;
        break;
      default:
        displayShoppinglist();
        end = 1;
        break;
    }
    
  }while(end === 0)
  
}

function addShoppinglistItem(newItem)
{
    SHOPPINGLIST.push(newItem);
}

function changeShoppinglistItem(position, newValue) 
{
    SHOPPINGLIST[position] = newValue;
}
 
 


function displayShoppinglist()
{
    document.write("<div align='center'>" + formatDate() + "</div><br>");
    document.write("<div align='center'>" + SHOPPINGLIST + "</div><br>");
    document.write("<br><br>");
}
*/
