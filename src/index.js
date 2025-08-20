// index.js
import "./styles.css";

const dropDownButton = document.getElementById("dropdown-button");

const dropDownContent = document.getElementById("dropdown-content");

dropDownButton.addEventListener("click", () => {
    dropDownContent.classList.toggle("show");
});
window.addEventListener("click",(event) => {
    if(!dropDownButton.contains(event.target)){
        if(dropDownContent.classList.contains("show")){
            dropDownContent.classList.remove("show");
            
        }
    }
})
  