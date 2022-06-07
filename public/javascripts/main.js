const recipientList = document.querySelectorAll(".messageColor");
const recipientInput =  document.getElementById("recipient");

recipientList.forEach( listItem => {
    listItem.addEventListener("click", () => {
        recipientInput.value = listItem.innerHTML;
    });
});
