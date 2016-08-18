// When color value is set on text box
function setColor(color, value) {
	if (value == "") value = 0;
	document.getElementById(color).value = value;
	
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
	} else {
		document.getElementById("body").className = "light";
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

	
	document.getElementById('red').value = r;
	document.getElementById('green').value = g;
	document.getElementById('blue').value = b;

	updateColor();
}

// When SPACE is pressed, generates random color
document.body.onkeyup = function (e) {
	if (e.keyCode == 32) {
		randomColor();
	}
}