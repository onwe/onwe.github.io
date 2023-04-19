// JavaScript Document

//https://playground-f6a2e-default-rtdb.firebaseio.com/
//import { initializeApp } from "./functions.js"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings = {
	databaseURL : "https://realtime-database-9b261-default-rtdb.firebaseio.com/"
	}
const app = initializeApp(appSettings);
//console.log(app);

const database = getDatabase(app);
const shoppingListInDb = ref(database,"shoppingList");

//console.log(app);

const inputFieldElememt = document.getElementById("input-field");
const addButtonElememt = document.getElementById("add-button");
const shoppingListElememt = document.getElementById("shopping-list");


onValue(shoppingListInDb, function(snapshot){
								   
	if(snapshot.exists()){
	
		//console.log(snapshot.val());
		//Turns snapshot values into array values
		let shopListArray = Object.entries(snapshot.val());
	
		//console.log(shopListArray);
		clearListItems();
	
		for(let w = 0; w < shopListArray.length; w++){
		
			let currentItem = shopListArray[w];
		
			//let currentID = currentItem[0];
			//let currentValue = currentItem[1];
			//appendBookToBookListElement(currentItem);
			//console.log(currentItem);
			appendDisplayList(currentItem)
		
		}
	
	}	
	
	else{
		
		shoppingListElememt.innerHTML = "No Items here .... yet!";
		
	}

});

addButtonElememt.addEventListener("click", function(){

let inputValue = inputFieldElememt.value;

push(shoppingListInDb,inputValue);

clearTextField();
//displayList(inputValue);
									 
console.log(inputValue+ ' added to database');
//console.log(add(8,9));

}
)

function clearTextField(){
	
	inputFieldElememt.value = "";
	
}

function clearListItems(){
	
	shoppingListElememt.innerHTML = "";
	
}

function appendDisplayList(item){
	
	//shoppingListElememt.innerHTML += `<li>${valueForFunction}</li>`;
	
	let itemID = item[0];
	let itemValue = item[1];

	let newElement = document.createElement("li");
	newElement.textContent = itemValue;
	
	
	newElement.addEventListener("click", function(){
		
		let exactLocationOfItemInDB = ref(database, `/shoppingList/${itemID}`);
		
		//console.log(itemID);
		remove(exactLocationOfItemInDB);
		console.log(`${itemValue} successfully removed`);
		
																
	})
	
	
	shoppingListElememt.append(newElement);
	
	
}
		