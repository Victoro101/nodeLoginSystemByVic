// alert("ready");
// console.log("ready");

var closeMessage=document.getElementById("#loginMesssage");
var closeMessageIcon=document.querySelector("#closeE");

closeMessageIcon.addEventListener("click",function() {
    // closeMessage.style.display="none";
    closeMessage.classList.add("#loginMessage");
})