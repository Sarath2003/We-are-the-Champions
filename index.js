import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://endorsements-e641d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListinDB = ref(database, "endorsements")

const inputEl = document.getElementById("newEndorsement")
const publishEl = document.getElementById("publish")
const endorsementsEl = document.getElementById("endorsements")

publishEl.addEventListener("click", function(){
    push(endorsementsListinDB, inputEl.value)
    clearInputValue()
})

onValue(endorsementsListinDB, function(snapshot){
    if(snapshot.exists()){
        endorsementsEl.textContent = ""
        let endorsementsArray = Object.entries(snapshot.val())

        for(let i=0; i<endorsementsArray.length; i++){
            appendEndorsement(endorsementsArray[i])
        }
    }
    else{
        endorsementsEl.textContent = ""
    }
})

function clearInputValue(){
    inputEl.value = ""
}

function appendEndorsement(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("p")
    newEl.textContent = itemValue
    newEl.classList.add("endorsement")
    newEl.addEventListener("dblclick", function(){
        let endorsementLocationinDB = ref(database, `endorsements/${itemID}`)
        remove(endorsementLocationinDB)
    })
    endorsementsEl.append(newEl)
}
