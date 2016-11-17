// Grab all the relevant elements
var s = document.getElementById("seconds"),
    m = document.getElementById("minutes"),
    h = document.getElementById("hours"),
    shadow = document.getElementById("shadow");

// Extend the Date object with new methods
Date.prototype.getSecondsAngle = function() {
  return this.getSeconds() * 6; // return the angle of the seconds hand
}

Date.prototype.getMinutesAngle = function() {
  return this.getMinutes() * 6; // return the angle of the minutes hand
}

Date.prototype.getHoursAngle = function() {
  return this.getHours() * 30 + Math.round(this.getMinutes() / 2); // return the angle of the hours hand
}

Date.prototype.getElapsedMinutes = function() {
  return this.getHours() * 60 + this.getMinutes(); // get the amount of minutes elapsed today
}

Date.prototype.getShadowData = function() {
  var opacity = 0.2, // default opacity/angle values
      angle = -45;
  if (this.getElapsedMinutes() < 1140 && this.getElapsedMinutes() > 300) {
    // calculate opacity based on minutes elapsed today
    opacity = (Math.sin((this.getElapsedMinutes() / 4 - 90) * Math.PI / 180)).toFixed(2); // opacity best described by a sine function
    opacity = opacity < 0.2 ? 0.2 : opacity; // we don't want the shadow opacity to be less than 0.2
    // the angle varies from -90 to +90 during the "day"
    angle = (((1 - (this.getElapsedMinutes() - 300) / 840) * 180) - 90).toFixed(2);
  } 
  return {
    opacity: opacity,
    angle: angle
  };
}

function setBackground(minutes) {
  var r = 76,
      g = 107,
      b = 169,
      angle = minutes / 4 - 90, // used to calculate bg color variation
      p = Math.sin(angle * Math.PI / 180), // yay! trigonometry again!
      body = document.getElementsByTagName("body")[0], // grab the body element
      rgbvalue = "rgb(" + Math.floor(r + 25 * p) + ',' + Math.floor(g + 36 * p) + ',' + Math.floor(b + 58 * p) + ")"; // calculate the rgb value based on the percentage (result of the sine function)
  body.style.background = rgbvalue; // apply the value to the body element
}

// this function sets the shadow opacity and angle of rotation
function setShadow(data) {
  rotateElement(shadow, data.angle);
  shadow.style.opacity = data.opacity;
}

// generic rotation function
function rotateElement(el, amount) {
  el.style.webkitTransform = "rotate(" + amount + "deg)";
  el.style.MozTransform = "rotate(" + amount + "deg)";
  el.style.msTransform = "rotate(" + amount + "deg)";
  el.style.OTransform = "rotate(" + amount + "deg)";
  el.style.transform = "rotate(" + amount + "deg)";
}

// Move the hands and the shadow and adjust the background
// based on the date object parameter
function tickTock(date) {
  // Use the custom methods on the date object
  rotateElement(s, date.getSecondsAngle());
  rotateElement(m, date.getMinutesAngle()); 
  rotateElement(h, date.getHoursAngle()); 
  setShadow(date.getShadowData());
  setBackground(date.getElapsedMinutes());
}

// Update the clock every second with a new date object
setInterval(function() {
  var date = new Date();
  tickTock(date);
}, 1000);