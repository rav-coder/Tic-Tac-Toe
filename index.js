
var btn = document.getElementById("restart-btn");
if(btn) btn.addEventListener("click", displayText);

/**
 * 
 */
function displayText(){

    if(document.getElementById("msg")) {
        document.getElementById("msg").innerHTML = "Clicked"
    };
}  

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function sum(a, b) {
  return a + b;
}

module.exports = sum;