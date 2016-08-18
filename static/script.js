var savedColors = [];

// When color value is set on text box
function setColor(color, value) {
	if (value == "") value = 0;
	document.getElementById(color).value = value;
	
	updateColor();
}

function setFinal(r, g, b) {
	document.getElementById('red').value = r;
	document.getElementById('green').value = g;
	document.getElementById('blue').value = b;

	updateColor();
}

// Takes the value from the text boxes and sets the background color, as well as HEX indicator
function updateColor() {
	var red = parseInt(document.getElementById('red').value);
	var green = parseInt(document.getElementById('green').value);
	var blue = parseInt(document.getElementById('blue').value);
	
	document.getElementById("red-label").value = red;
	document.getElementById("green-label").value = green;
	document.getElementById("blue-label").value = blue;
	
	// http://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
	if ((red*0.299 + green*0.587 + blue*0.114)/255 < 0.5) {
		document.getElementById("body").className = "dark";
		if (savedColors.length > 0) {
			document.getElementById('palette').style.borderRight = "1px solid #ececec";
			document.getElementById('palette').style.backgroundColor = "#ececec";
		}
	} else {
		document.getElementById("body").className = "light";
		if (savedColors.length > 0) {
			document.getElementById('palette').style.borderRight = "1px solid #333";
			document.getElementById('palette').style.backgroundColor = "#333";
		}
	}
	
	document.getElementById("hex").innerHTML = ("#" + ((red > 15) ? "" : "0") + red.toString(16) + ((green > 15) ? "" : "0") + green.toString(16) + ((blue > 15) ? "" : "0") + blue.toString(16)).toUpperCase();
	
	document.getElementById("body").style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
}

// Selects the HEX color on click
function select(el) {
	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.select();
	}
}

function randomColor() {
	var r = '' + (Math.random() * 1000) % 255,
		g = '' + (Math.random() * 1000) % 255,
		b = '' + (Math.random() * 1000) % 255;

	
	setFinal(r, g, b);
}

function saveColor() {
	var hex = document.getElementById("hex").innerHTML;
	var r = document.getElementById('red').value,
		g = document.getElementById('green').value,
		b = document.getElementById('blue').value;

	document.getElementById("palette").innerHTML += "<a href='javascript:setFinal(" + r + "," + g + "," + b + ");'><div class='paletteColor " + (((r*0.299 + g*0.587 + b*0.114)/255 < 0.5) ? "dark" : "light") + "' style='background-color: " + hex + ";'>" + hex + "</div></a>"
	
	savedColors.push(hex);
}

// When SPACE is pressed, generates random color
// When S is pressed, save current color to palette.
document.body.onkeyup = function (e) {
	if (e.keyCode == 32) {
		randomColor();
	} else if (e.keyCode == 83) {
		saveColor();
	}
}