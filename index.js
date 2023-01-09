let housingArr = [
    {
        streetAddress: "123 Blueberry Street",
        type: "house",
        city: "Sacramento",
        state: "CA"
    },
    {
        streetAddress: "50 Bark Street",
        type: "apartment",
        city: "New York",
        state: "NY"
    },
    {
        streetAddress: "933 Leet Street",
        type: "loft",
        city: "Harrisburg",
        state: "PA"
    }
]

// create a class to hold all Properties on the market
class PropLibrary {
    constructor(){
        this.library = [];
    }
    Render(){
        //create the elements to display
        const housingTable = document.querySelector("#housingTable");
	    let container = document.createElement("div");
        container.setAttribute("id", "container");
        container.classList.add('w-50');
        container.classList.add('form-group')
	    let streetAddress = document.createElement("h2");
	    let type = document.createElement("h3");
        let city = document.createElement("h3");
        let state = document.createElement("h3");

        // creating comment for the house in question
        let comment = document.createElement("textarea");
        comment.setAttribute("maxlength", 280);
        // adds bootstrap styling
        comment.classList.add('form-control')
        let addComment = document.createElement("button");
        addComment.setAttribute("type", "button");
        addComment.classList.add("btn");
        addComment.classList.add("btn-success");
        addComment.innerText = "Add Comment";

        // adds visible dynamic counter for charCount
        let countRemaining = document.createElement("div");
        countRemaining.style.textAlign = "right";
        countRemaining.innerText = "280 characters remaining";
        let maxChars = 280;
        comment.addEventListener('input', () => {
            // code in here will run every time anything is typed into the textbox
            // change color if text is less than 10%
            const remaining = maxChars - comment.value.length; // myTextArea.value.length measures length of chars;
            // ternary operator: if less than 10%, text color turns red
            const color = remaining < maxChars * .1 ? 'red' : null;
            countRemaining.innerText = `${remaining} characters remaining`; // change text dynamically
            countRemaining.style.color = color;
        });

        this.library.map(function (element) {
            streetAddress.innerText = element.streetAddress;
            type.innerText = element.type;
            city.innerText = element.city;
            state.innerText = element.state;

            // combine
            container.append(streetAddress, type, city, state, comment, countRemaining, addComment);
        housingTable.append(container);
        });
    }
    Add(currProperty){
        this.library.push(currProperty);
        // note: when calling a method within a class, don't add the ()
        this.library.Render;
    }
    Remove(currProperty){
        // iterate through library
        for (let i = 0; i < this.library.length; i++){
            let iteratedProp = this.library[i];
            
            // if index = Property to remove...
            if (iteratedProp.streetAddress === currProperty.streetAddress){
                // remove Property
                this.library.splice(i, 1);
            }             
        } 
        // note: when calling a method within a class, don't add the ()
        this.library.Render;
    }
}

// create a class that defines a basic property listing
class Property{
    constructor(streetAddress, type, city, state){
        this.streetAddress = streetAddress;
        this.type = type;
        this.city = city;
        this.state = state;
    }
    
}
// creating new library 
const PropLibrary1 = new PropLibrary();


// Trying Add Function on client side
document.querySelector("#submitAdd").addEventListener("click", function (){
    let newAddress = document.querySelector("#addStreetAddress").value;
    let newType = document.querySelector("#addHouseType").value;
    let newCity = document.querySelector("#addCity").value;
    let addState = document.querySelector("#addState").value;
    // create new prop
    const newProp = new Property(newAddress, newType, newCity, addState);
    PropLibrary1.Add(newProp);
    PropLibrary1.Render();
    document.querySelector("#newPropForm").reset();
})// ✅🥳
console.log(housingArr);
// Trying Remove Function Form on client side... it removes it from array...
// but DOM elements don't remove
document.querySelector("#submitRemove").addEventListener("click", function (){
    let removeAddress = document.querySelector("#removeStreetAddress").value;
    let removeType = document.querySelector("#removeHouseType").value;
    let removeCity = document.querySelector("#removeCity").value;
    let removeState = document.querySelector("#removeState").value;
    for(let i = 0; i < housingArr.length; i++){
        let currProp = housingArr[i];
        if (removeAddress === currProp.streetAddress){
            console.log("Gotcha!");
            housingArr.splice(i, 1);
            console.log(currProp);
            console.log(housingArr);
        }
    }
    PropLibrary1.Render();
    pagePrinter();
    document.querySelector("#removePropForm").reset();
})



// Always keep last
// lets try adding all Properties:
let pagePrinter = () => {
    for(let i = 0; i < housingArr.length; i++){
        let currProp = housingArr[i];
        let prop = new Property(currProp.streetAddress, currProp.type, currProp.city, currProp.state);
        // add property to PropertyLibrary
        PropLibrary1.Add(prop);
        PropLibrary1.Render();
    }
}

// Remove function works! Just need to find a way to 
let clearHousingTable = () => {
    let housingTable = document.querySelector("#housingTable");
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

pagePrinter();
