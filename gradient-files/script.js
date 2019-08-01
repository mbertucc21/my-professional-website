let rgbOut = document.getElementById("rgbOut");
let hexOut = document.getElementById("hexOut");
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.getElementById("gradient");
let randomButton = document.getElementById("random");
let updateButton = document.getElementById("update");
let radioHEX = document.getElementById("radioHEX");
let radioRGB = document.getElementById("radioRGB");
let leftGradient = document.getElementById("left");
let rightGradient = document.getElementById("right");
let compStyles = window.getComputedStyle(body);


// console.log(randomButton);
// console.log(compStyles.getPropertyValue('background-image'));
rgbOut.textContent = "Left Color: " + "255,0,0" + " || " + "Right Color: " + "0,0,255";
hexOut.textContent = "Left Color: " + "#FF0000" + " || " + "Right Color: " + "#0000FF";
// console.log(color1.value);
// console.log(color2.value);

//////////////////////////////////////////////////////
// SHOW HEX INPUT
//////////////////////////////////////////////////////
function showHEX(){
  document.getElementById('inputsRGB').className="hide";
	document.getElementById('inputsHEX').className="show";
  document.querySelector(".activeRGB").className="btn btn-secondary activeRGB";
  document.querySelector(".activeHEX").className="btn btn-secondary active activeHEX";
}

//////////////////////////////////////////////////////
// SHOW RGB INPUT
//////////////////////////////////////////////////////
function showRGB(){
  document.getElementById('inputsHEX').className="hide";
	document.getElementById('inputsRGB').className="show";
  document.querySelector(".activeHEX").className="btn btn-secondary activeHEX";
  document.querySelector(".activeRGB").className="btn btn-secondary active activeRGB";
}

//////////////////////////////////////////////////////
// RGB TO HEX
//////////////////////////////////////////////////////
const rgbToHex = (input) => {

  let inputLength = input.length;

	let threeValues = true;
  if (inputLength !== 3) {threeValues = false}
  input.forEach(i => {
    if (typeof i !== "number"){threeValues = false}
  })

  let betweenMinMax = true;
  input.forEach(i => {
    if (i < 0 || i > 255){betweenMinMax = false}
  })

  let valsHEX = '0123456789ABCDEF';
  let outputHEX = [];
  if (threeValues && betweenMinMax){
    input.forEach(i => {
      outputHEX.push(valsHEX[Math.floor(i / 16)]);
      outputHEX.push(valsHEX[i % 16]);
    })
	let hexValues = outputHEX.join('');
	// console.log(`RGB(${input}) = #${hexValues}`);
	return ('#' + hexValues);  // returns String
} else {
    // console.log("INVALID RGB Input")
  };
}

//////////////////////////////////////////////////////
// HEX TO RGB
//////////////////////////////////////////////////////
const hexToRgb = (input) => {

	let inputLength = input.length;
  let valsHEX = '0123456789ABCDEF';

  let hasHASH = false;
  if (input[0] === '#') {hasHASH = true}

  let sixHEX = false;
  if (input.slice(1).length === 6) {sixHEX = true}

  let validHEX = true;
  for (var i=1; i<inputLength; i++){
    if (!valsHEX.includes(input[i])){validHEX = false}
  }

  if (hasHASH && sixHEX && validHEX){
    let r = 0
    let g = 0
    let b = 0
    let hexVal = 0

    for (var i=1; i<inputLength; i++){
      hexVal = valsHEX.indexOf(input[i]);
      if(i===1){r += hexVal * 16}
      if(i===2){r += hexVal}
      if(i===3){g += hexVal * 16}
      if(i===4){g += hexVal}
      if(i===5){b += hexVal * 16}
      if(i===6){b += hexVal}
    }

    // console.log(`${input} = RBG(${r},${g},${b})`);
		rgbARR = [r, g, b]
		return rgbARR;  // returns Array

  } else {
      // console.log("INVALID HEX Input")
    }
}

//////////////////////////////////////////////////////
// Selected Color Update
//////////////////////////////////////////////////////
function selectedColorUpdate() {
  // IF RGB CHECKED
  if (radioRGB.checked) {

		let r = document.getElementById('valR').value;
		let g = document.getElementById('valG').value;
		let b = document.getElementById('valB').value;

    // Ensure Numbers Are Entered
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      alert("Invalid RGB Values!  Please enter values between 0-255");
    } else {
      r = Number(r);
      g = Number(g);
      b = Number(b);
      // Ensure Numbers are between 0-255
      if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255){
        // console.log("INVALID RGB VALUES!")
        alert("Invalid RGB Values!  Please enter values between 0-255");
      } else {
        if (leftGradient.selected) {
          color1.value = rgbToHex([r, g, b]);
        } else if (rightGradient.selected) {
          color2.value = rgbToHex([r, g, b]);
        }
      }
    }


  // IF HEX CHECKED
	} else if (radioHEX.checked) {
		let hex = document.getElementById('valHEX').value;
    let valsHEX = '0123456789ABCDEF';
    let validHEX = true;

    for (var i=1; i<hex.length; i++){
      if (!valsHEX.includes(hex[i].toUpperCase())){validHEX = false}
    }
    if (hex.length !== 6 || !validHEX){
      alert("Invalid HEX Value!  Please enter values six values that include the following: '0123456789ABCDEF'");
      // console.log("INVALID HEX VALUE!")
    } else {
      if (leftGradient.selected) {
        color1.value = ('#' + hex);
      } else if (rightGradient.selected) {
        color2.value = ('#' + hex);
      }
    }
	}
	setGradient();
}


//////////////////////////////////////////////////////
// Random Color Update
//////////////////////////////////////////////////////
function randomColorUpdate() {
	color1.value = getRandomColor();
	color2.value = getRandomColor();
	setGradient();
}

//////////////////////////////////////////////////////
// Get A Random Color
//////////////////////////////////////////////////////
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//////////////////////////////////////////////////////
// Set Gradient
//////////////////////////////////////////////////////
function setGradient() {
	body.style.background =
	"linear-gradient(to right, "
	+ color1.value
	+ ", "
	+ color2.value
	+ ")";

	// console.log(body.style.background);

	let colorLeftHEX = color1.value.toUpperCase();
	let colorRightHEX = color2.value.toUpperCase();

	let colorLeftRGB = hexToRgb(colorLeftHEX);
	let colorRightRGB = hexToRgb(colorRightHEX);

  if (leftGradient.selected) {
    document.getElementById('valR').value = colorLeftRGB[0];
    document.getElementById('valG').value = colorLeftRGB[1];
    document.getElementById('valB').value = colorLeftRGB[2];
    document.getElementById('valHEX').value = colorLeftHEX.slice(1,7);
  } else if (rightGradient.selected) {
    document.getElementById('valR').value = colorRightRGB[0];
    document.getElementById('valG').value = colorRightRGB[1];
    document.getElementById('valB').value = colorRightRGB[2];
    document.getElementById('valHEX').value = colorRightHEX.slice(1,7);
  }

	rgbOut.textContent = "Left Color: " + colorLeftRGB + " || " + "Right Color: " + colorRightRGB;
	hexOut.textContent = "Left Color: " + colorLeftHEX + " || " + "Right Color: " + colorRightHEX;
}

radioHEX.addEventListener("click", showHEX);
radioRGB.addEventListener("click", showRGB);
updateButton.addEventListener("click", selectedColorUpdate);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
randomButton.addEventListener("click", randomColorUpdate);
