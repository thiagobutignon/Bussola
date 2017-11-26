require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"input-framer/input":[function(require,module,exports){
var _inputStyle, calculatePixelRatio, growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

_inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
  return (value * layer.context.pixelMultiplier) + "px";
}, {
  fontSize: function(layer) {
    return calculatePixelRatio(layer, layer._properties.fontSize);
  },
  lineHeight: function(layer) {
    return layer._properties.lineHeight + "em";
  },
  padding: function(layer) {
    var padding, paddingValue, paddingValues, pixelMultiplier;
    pixelMultiplier = layer.context.pixelMultiplier;
    padding = [];
    paddingValue = layer._properties.padding;
    if (Number.isInteger(paddingValue)) {
      return calculatePixelRatio(layer, paddingValue);
    }
    paddingValues = layer._properties.padding.split(" ");
    switch (paddingValues.length) {
      case 4:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[3]);
        break;
      case 3:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      case 2:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      default:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[0]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[0]);
    }
    return (padding.top * pixelMultiplier) + "px " + (padding.right * pixelMultiplier) + "px " + (padding.bottom * pixelMultiplier) + "px " + (padding.left * pixelMultiplier) + "px";
  }
});

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "rgba(255, 255, 255, .01)";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    if (options.textColor == null) {
      options.textColor = "#000";
    }
    if (options.fontFamily == null) {
      options.fontFamily = "-apple-system";
    }
    if (options.fontWeight == null) {
      options.fontWeight = "500";
    }
    if (options.submit == null) {
      options.submit = false;
    }
    if (options.tabIndex == null) {
      options.tabIndex = 0;
    }
    Input.__super__.constructor.call(this, options);
    this._properties.fontSize = options.fontSize;
    this._properties.lineHeight = options.lineHeight;
    this._properties.padding = options.padding;
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.width = _inputStyle["width"](this);
    this.input.style.height = _inputStyle["height"](this);
    this.input.style.fontSize = _inputStyle["fontSize"](this);
    this.input.style.lineHeight = _inputStyle["lineHeight"](this);
    this.input.style.outline = "none";
    this.input.style.border = "none";
    this.input.style.backgroundColor = options.backgroundColor;
    this.input.style.padding = _inputStyle["padding"](this);
    this.input.style.fontFamily = options.fontFamily;
    this.input.style.color = options.textColor;
    this.input.style.fontWeight = options.fontWeight;
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("tabindex", options.tabindex);
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if ((options.goButton && !options.submit) || !options.submit) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"statusbarlayer/StatusBarLayer":[function(require,module,exports){

/*
	 * USING STATUSBARLAYER

	 * Require the module
	StatusBarLayer = require "StatusBarLayer"

	myStatusBar = new StatusBarLayer
		 * iOS version
		version: <number> (10 || 11)

		 * Text
		carrier: <string>
		time: <string> # if not set, will use local time
		percent: <number>

		 * Show or hide status items
		signal: <boolean>
		wifi: <boolean>
		powered: <boolean>
		showPercentage: <boolean>
		ipod: <boolean> # also affects signal and carrier

		 * Colors
		style: <string> ("light" || "dark")
		foregroundColor: <string> (hex or rgba)
		backgroundColor: <string> (hex or rgba)
		vibrant: <boolean>

		 * Behavior
		hide: <boolean> # initial visibility
		autoHide: <boolean> # hide in landscape where device-appropriate

		 * Simulate call
		myStatusBar.startCall(message, color) # <string>, <string> (hex or rgba)
		myStatusBar.endCall()

		 * Check visibility and call status
		print myStatusBar.hidden
		print myStatusBar.onCall
 */
var StatusBarLayer, defaults,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  style: "light",
  powered: false,
  carrier: "Carrier",
  foregroundColor: "",
  backgroundColor: "",
  time: "",
  percent: 100,
  showPercentage: true,
  wifi: true,
  signal: true,
  ipod: false,
  hide: false,
  autoHide: true,
  onCall: false,
  vibrant: false,
  version: 11
};

StatusBarLayer = (function(superClass) {
  var batteryGreen, onCallColor;

  extend(StatusBarLayer, superClass);

  batteryGreen = "#4cd964";

  onCallColor = "#4cd964";

  function StatusBarLayer(options) {
    var alarmMargin, appleSVGCSS, baseFontSize, battery, batteryColor, battery_v10_2x, battery_v10_3x, battery_v11_2x, battery_v11_3x, canvasSVGCSS, carrier, carrierMargin, colorBattery, colorForeground, device, fontWeight, foregroundItems, getBatteryLevel, getBatteryMargin, getBatterySVG, getBatteryWidth, getScreenWidth, getSignalSVG, getTime, i, ipodMargin, isiPhone, isiPhonePlus, layer, len, letterSpacing, locationMargin, onCallBlock, onCallFontSize, onCallLetterSpacing, onCallMargin, onCallMessage, onCallWordSpacing, percentage, percentageMargin, power, powerMargin, powerSVG, ref, selectForegroundColor, signal, signalMargin, signal_v10_2x, signal_v10_3x, signal_v11_2x, signal_v11_3x, statusBarHeight, styleBar, svg, svgCSS, time, timeFontWeight, timeLetterSpacing, topMargin, wifi, wifiMargin, wifiSVG;
    this.options = options != null ? options : {};
    this.options = _.assign({}, defaults, this.options);
    StatusBarLayer.__super__.constructor.call(this, this.options);
    this.isHidden = this.options.hide;
    isiPhone = function() {
      if (_.includes(Framer.Device.deviceType, "iphone")) {
        return true;
      } else {
        return false;
      }
    };
    isiPhonePlus = function() {
      if (_.includes(Framer.Device.deviceType, "plus")) {
        return true;
      } else {
        return false;
      }
    };
    getBatteryMargin = (function(_this) {
      return function() {
        if (_this.options.powered === false) {
          if (isiPhonePlus() && _this.options.version > 10) {
            return 5;
          } else {
            return 5.5;
          }
        } else {
          return 2.5;
        }
      };
    })(this);
    getBatteryWidth = (function(_this) {
      return function() {
        if (_this.options.version > 10 && isiPhonePlus()) {
          return 26;
        } else if (_this.options.version > 10) {
          return 26.5;
        } else {
          return 24.5;
        }
      };
    })(this);
    getBatterySVG = (function(_this) {
      return function() {
        var size;
        size = isiPhonePlus() ? "at3x" : "at2x";
        return svg["battery"]["v" + _this.options.version][size];
      };
    })(this);
    getSignalSVG = (function(_this) {
      return function() {
        var size;
        size = isiPhonePlus() ? "at3x" : "at2x";
        return svg["signal"]["v" + _this.options.version][size];
      };
    })(this);
    getScreenWidth = function() {
      var orientation;
      if (_.includes(Framer.Device.deviceType, "apple")) {
        orientation = 0;
        if (Utils.isMobile()) {
          orientation = window.orientation;
        } else {
          orientation = Math.abs(Framer.Device.orientation);
        }
        if (orientation === 0) {
          return Math.min(Screen.width, Screen.height);
        } else {
          return Math.max(Screen.width, Screen.height);
        }
      } else {
        return Screen.width;
      }
    };
    topMargin = 3;
    onCallMargin = 18;
    statusBarHeight = 20;
    onCallMargin = topMargin + onCallMargin;
    carrierMargin = 4.5;
    signalMargin = isiPhonePlus() ? 6 : 6.5;
    wifiMargin = 4;
    powerMargin = 5.5;
    percentageMargin = 2.5;
    alarmMargin = 6.5;
    locationMargin = 6;
    ipodMargin = 6;
    baseFontSize = 12;
    onCallFontSize = 13.5;
    letterSpacing = 0;
    timeLetterSpacing = isiPhonePlus() ? 1 : 0;
    onCallLetterSpacing = 0;
    onCallWordSpacing = 0;
    fontWeight = isiPhonePlus() ? 300 : 400;
    timeFontWeight = 500;
    this.height = statusBarHeight;
    if (this.options.ipod === true) {
      this.options.carrier = "iPod";
      this.options.signal = false;
    }
    if (this.options.powered === true) {
      batteryColor = batteryGreen;
    } else {
      batteryColor = this.options.foregroundColor;
    }
    getBatteryLevel = (function(_this) {
      return function(defaultBatteryWidth) {
        var percentageWidth;
        percentageWidth = _this.options.percent / 100 * defaultBatteryWidth;
        percentageWidth = Math.round(percentageWidth);
        return percentageWidth;
      };
    })(this);
    appleSVGCSS = ".svgFit {\n  object-fit: contain;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n}";
    canvasSVGCSS = ".svgFit {\n  object-fit: contain;\n  width: 100%;\n  max-width: 100%;\n  position: absolute;\n  top: 0;\n}";
    svgCSS = _.includes(Framer.Device.deviceType, "apple") ? appleSVGCSS : canvasSVGCSS;
    Utils.insertCSS(svgCSS);
    signal_v10_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 34 16'><circle cx='2.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='9.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='16.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='23.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='30.75' cy='2.75' r='2.5' stroke='" + this.options.foregroundColor + "' stroke-width='0.5' fill-opacity='0' class='stroked' /></svg>";
    signal_v11_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 33 33'><rect x='0' y='11' width='6' height='9' rx='2' fill='" + this.options.foregroundColor + "' /><rect x='9' y='8' width='6' height='12' rx='2' fill='" + this.options.foregroundColor + "' /><rect x='18' y='4' width='6' height='16' rx='2' fill='" + this.options.foregroundColor + "' /><rect x='27' y='0' width='6' height='20' rx='2' fill='" + this.options.foregroundColor + "' /></svg>";
    signal_v10_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 67 32'><circle cx='5.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='19.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='33.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='47.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><path d='M61.5,1A4.5,4.5,0,1,1,57,5.5,4.51,4.51,0,0,1,61.5,1m0-1A5.5,5.5,0,1,0,67,5.5,5.5,5.5,0,0,0,61.5,0Z' fill='" + this.options.foregroundColor + "' /></svg>";
    signal_v11_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 49.5 60'><rect x='0' y='17' width='9' height='13' rx='3' fill='" + this.options.foregroundColor + "' /><rect x='13' y='12' width='9' height='18' rx='3' fill='" + this.options.foregroundColor + "' /><rect x='26' y='6' width='9' height='24' rx='3' fill='" + this.options.foregroundColor + "' /><rect x='39' y='0' width='9' height='30' rx='3' fill='" + this.options.foregroundColor + "' /></svg>";
    wifiSVG = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 24 36'><path d='M 8.085 13.63 L 11.995 18 L 15.905 13.63 C 13.752 11.454 10.238 11.454 8.085 13.63 Z M 4.085 9.16 L 6.085 11.39 C 9.376 8.192 14.614 8.192 17.905 11.39 L 19.905 9.16 C 15.479 4.943 8.521 4.943 4.095 9.16 Z M 11.995 0 C 7.576 0.001 3.322 1.681 0.095 4.7 L 2.095 6.93 C 7.659 1.691 16.341 1.691 21.905 6.93 L 23.905 4.7 C 20.676 1.678 16.418 -0.002 11.995 0 Z' fill='" + this.options.foregroundColor + "' /></svg>";
    battery_v10_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 49 32'><rect x='0.5' y='0.5'  width='44' height='18' rx='3' ry='3' stroke='" + this.options.foregroundColor + "' fill-opacity='0' class='stroked' /><rect x='2' y='2' width='" + (getBatteryLevel(41)) + "' height='15' rx='1.5' ry='1.5' fill='" + batteryColor + "' id='batteryFill' /><path d='M46,6v7a3.28,3.28,0,0,0,3-3.5A3.28,3.28,0,0,0,46,6Z' fill='" + this.options.foregroundColor + "'/></svg>";
    battery_v11_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 53 32'><rect fill='" + batteryColor + "' id='batteryFill' x='4' y='4' width='" + (getBatteryLevel(40)) + "' height='15' rx='2' /><rect stroke='" + this.options.foregroundColor + "' fill-opacity='0' class='stroked' stroke-width='2' opacity='0.4' x='1' y='1' width='46' height='21' rx='5' /><path d='M50,7.25605856 C51.7477886,7.87381317 53,9.54067176 53,11.5 C53,13.4593282 51.7477886,15.1261868 50,15.7439414 L50,7.25605856 Z' fill='" + this.options.foregroundColor + "' opacity='0.4' /></svg>";
    battery_v10_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 73 42'><path d='M62,0H5A5,5,0,0,0,0,5V24a5,5,0,0,0,5,5H62a5,5,0,0,0,5-5V5A5,5,0,0,0,62,0Zm4,24a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V5A4,4,0,0,1,5,1H62a4,4,0,0,1,4,4Z' fill='" + this.options.foregroundColor + "' /><rect x='2' y='2' width='" + (getBatteryLevel(63)) + "' height='25' rx='3' ry='3' fill='" + batteryColor + "' id='batteryFill' /><path d='M69,10.06v9.89A4.82,4.82,0,0,0,73,15,4.82,4.82,0,0,0,69,10.06Z' fill='" + this.options.foregroundColor + "' /></svg>";
    battery_v11_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 78 42'><rect fill='" + batteryColor + "' id='batteryFill' x='6' y='6' width='" + (getBatteryLevel(59)) + "' height='22' rx='3' /><rect stroke='" + this.options.foregroundColor + "' fill-opacity='0' class='stroked' stroke-width='3' opacity='0.4' x='1.5' y='1.5' width='68' height='31' rx='7.5' /><path d='M 74 10.674 C 76.365 11.797 78 14.208 78 17 C 78 19.792 76.365 22.203 74 23.326 L 74 10.674 Z' fill='" + this.options.foregroundColor + "' opacity='0.4'/></svg>";
    powerSVG = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 6 17'><polygon points='6 3.75 3.43 3.75 4.5 0 0.5 5.25 2.98 5.25 1.5 9.5 6 3.75' fill='" + this.options.foregroundColor + "' /></svg>";
    svg = {
      battery: {
        v10: {
          at2x: battery_v10_2x,
          at3x: battery_v10_3x
        },
        v11: {
          at2x: battery_v11_2x,
          at3x: battery_v11_3x
        }
      },
      signal: {
        v10: {
          at2x: signal_v10_2x,
          at3x: signal_v10_3x
        },
        v11: {
          at2x: signal_v11_2x,
          at3x: signal_v11_3x
        }
      },
      wifi: wifiSVG,
      power: powerSVG
    };
    onCallBlock = new Layer({
      parent: this,
      name: "onCallBlock",
      height: statusBarHeight
    });
    this.onCallBlock = onCallBlock;
    onCallMessage = new TextLayer({
      parent: this,
      name: "onCallMessage",
      padding: {
        top: onCallMargin
      },
      text: "",
      fontSize: onCallFontSize,
      fontWeight: fontWeight,
      textAlign: "center",
      color: "white",
      letterSpacing: onCallLetterSpacing,
      wordSpacing: onCallWordSpacing
    });
    this.onCallMessage = onCallMessage;
    carrier = new TextLayer({
      parent: this,
      name: "carrier",
      padding: {
        top: topMargin
      },
      text: this.options.carrier,
      fontSize: baseFontSize,
      fontWeight: fontWeight,
      letterSpacing: letterSpacing
    });
    this.carrier = carrier;
    signal = new Layer({
      parent: this,
      name: "signal",
      width: this.options.version > 10 ? 16.5 : 34,
      height: this.options.version > 10 ? 10 : 6,
      y: Align.center,
      html: getSignalSVG()
    });
    this.signal = signal;
    wifi = new Layer({
      parent: this,
      name: "wifi",
      y: Align.center,
      width: 13,
      height: 9,
      html: wifiSVG
    });
    this.wifi = wifi;
    getTime = (function(_this) {
      return function() {
        var day, hour, minute, second, suffix, today;
        today = new Date;
        day = today.getDay();
        hour = today.getHours();
        minute = today.getMinutes();
        second = today.getSeconds();
        suffix = hour >= 12 ? ' PM' : ' AM';
        hour = hour > 12 ? hour - 12 : hour;
        minute = minute < 10 ? "0" + minute : minute;
        if (_this.options.time === "") {
          return hour + ':' + minute + suffix;
        } else {
          return _this.options.time;
        }
      };
    })(this);
    time = new TextLayer({
      parent: this,
      name: "time",
      width: this.width,
      padding: {
        top: topMargin
      },
      text: getTime(),
      fontSize: baseFontSize,
      fontWeight: timeFontWeight,
      textAlign: "center",
      letterSpacing: timeLetterSpacing
    });
    this.time = time;
    power = new Layer({
      parent: this,
      name: "power",
      y: Align.center,
      width: 5.5,
      height: 9.5,
      html: powerSVG
    });
    this.power = power;
    battery = new Layer({
      parent: this,
      name: "battery",
      y: Align.center,
      width: getBatteryWidth(),
      height: this.options.version > 10 ? 11.5 : 9,
      html: getBatterySVG()
    });
    this.battery = battery;
    percentage = new TextLayer({
      parent: this,
      name: "percentage",
      padding: {
        top: topMargin
      },
      text: this.options.percent + "%",
      fontSize: baseFontSize,
      fontWeight: fontWeight,
      textAlign: "right",
      letterSpacing: letterSpacing
    });
    this.percentage = percentage;
    ref = this.subLayers;
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      layer.backgroundColor = "clear";
    }
    this.hide = (function(_this) {
      return function() {
        _this.isHidden = true;
        return _this.animate({
          properties: {
            y: 0 - statusBarHeight
          },
          time: 0.25
        });
      };
    })(this);
    this.show = (function(_this) {
      return function() {
        _this.isHidden = false;
        return _this.animate({
          properties: {
            y: 0
          },
          time: 0.25
        });
      };
    })(this);
    this.layout = (function(_this) {
      return function(orientation) {
        var layoutWidth;
        if (orientation == null) {
          orientation = 0;
        }
        layoutWidth = getScreenWidth();
        _this.width = layoutWidth;
        if (_this.options.hide === true) {
          _this.hide();
        } else if (_this.options.autoHide === true && orientation > 0 && isiPhone()) {
          _this.hide();
        } else {
          _this.show();
        }
        if (_this.options.carrier === "") {
          carrierMargin = 0;
        }
        if (_this.options.signal === true) {
          signal.visible = true;
          signal.x = signalMargin;
          carrier.x = signal.x + signal.width + carrierMargin;
        } else {
          signal.visible = false;
          carrier.x = ipodMargin;
        }
        if (_this.options.wifi === true) {
          wifi.visible = true;
        } else {
          wifi.visible = false;
        }
        wifi.x = carrier.x + carrier.width + wifiMargin;
        time.width = layoutWidth;
        onCallBlock.width = layoutWidth;
        onCallMessage.width = layoutWidth;
        if (_this.options.powered === true) {
          power.x = Align.right(-powerMargin);
        } else {
          power.x = layoutWidth;
        }
        battery.x = power.x - battery.width - getBatteryMargin();
        if (_this.options.showPercentage === false) {
          percentageMargin = 0;
          percentage.text = "";
        } else {
          percentage.text = _this.options.percent + "%";
        }
        return percentage.maxX = battery.x - percentageMargin;
      };
    })(this);
    getTime();
    this.layout();
    selectForegroundColor = (function(_this) {
      return function() {
        if (_this.options.foregroundColor === "") {
          if (_this.options.style === "dark") {
            return "white";
          } else {
            return "black";
          }
        } else {
          return _this.options.foregroundColor;
        }
      };
    })(this);
    foregroundItems = [percentage, power, time, wifi, signal, carrier, battery];
    colorForeground = (function(_this) {
      return function(color) {
        var SVG, j, k, layerSVG, len1, len2, results, strokedSVG;
        if (color == null) {
          color = "";
        }
        if (color === "") {
          color = selectForegroundColor();
        }
        results = [];
        for (j = 0, len1 = foregroundItems.length; j < len1; j++) {
          layer = foregroundItems[j];
          layer.color = color;
          layerSVG = layer.querySelectorAll('path, circle, rect, polygon');
          strokedSVG = layer.querySelectorAll('.stroked');
          for (k = 0, len2 = layerSVG.length; k < len2; k++) {
            SVG = layerSVG[k];
            SVG.setAttribute('fill', color);
          }
          results.push((function() {
            var l, len3, results1;
            results1 = [];
            for (l = 0, len3 = strokedSVG.length; l < len3; l++) {
              SVG = strokedSVG[l];
              SVG.setAttribute('stroke', color);
              results1.push(SVG.setAttribute('fill-opacity', '0'));
            }
            return results1;
          })());
        }
        return results;
      };
    })(this);
    colorBattery = (function(_this) {
      return function() {
        var SVG, batteryFillSVG, j, k, l, len1, len2, len3, results, results1, results2;
        batteryFillSVG = layer.querySelectorAll('#batteryFill');
        if (_this.options.onCall === true) {
          results = [];
          for (j = 0, len1 = batteryFillSVG.length; j < len1; j++) {
            SVG = batteryFillSVG[j];
            SVG.style.WebkitTransition = 'all 0.25s';
            results.push(SVG.setAttribute('fill', "white"));
          }
          return results;
        } else if (_this.options.powered === true) {
          results1 = [];
          for (k = 0, len2 = batteryFillSVG.length; k < len2; k++) {
            SVG = batteryFillSVG[k];
            SVG.style.WebkitTransition = 'all 0.25s';
            results1.push(SVG.setAttribute('fill', batteryGreen));
          }
          return results1;
        } else {
          results2 = [];
          for (l = 0, len3 = batteryFillSVG.length; l < len3; l++) {
            SVG = batteryFillSVG[l];
            SVG.style.WebkitTransition = 'all 0.25s';
            results2.push(SVG.setAttribute('fill', selectForegroundColor()));
          }
          return results2;
        }
      };
    })(this);
    styleBar = (function(_this) {
      return function(style, backgroundColor) {
        var barColor;
        if (backgroundColor == null) {
          backgroundColor = "";
        }
        if (backgroundColor === "") {
          _this.style = {
            "-webkit-backdrop-filter": "blur(60px)"
          };
          if (style === "dark") {
            _this.backgroundColor = "rgba(0, 0, 0, 0.5)";
          } else {
            _this.backgroundColor = "rgba(255, 255, 255, 0.5)";
          }
        } else {
          _this.backgroundColor = backgroundColor;
        }
        if (_this.options.vibrant === true) {
          barColor = new Color(backgroundColor).alpha(.5);
          _this.backgroundColor = barColor;
          return _this.style = {
            "-webkit-backdrop-filter": "blur(60px)"
          };
        }
      };
    })(this);
    this.applyStyle = (function(_this) {
      return function(style, foregroundColor, backgroundColor) {
        if (style == null) {
          style = _this.options.style;
        }
        if (foregroundColor == null) {
          foregroundColor = _this.options.foregroundColor;
        }
        if (backgroundColor == null) {
          backgroundColor = _this.options.backgroundColor;
        }
        if (style === "light" && foregroundColor === "") {
          foregroundColor = "black";
        }
        if (style === "dark" && foregroundColor === "") {
          foregroundColor = "white";
        }
        styleBar(style, backgroundColor);
        colorForeground();
        return colorBattery();
      };
    })(this);
    this.applyStyle();
    this.startCall = (function(_this) {
      return function(message, color) {
        if (message == null) {
          message = "Touch to return to call 0:30";
        }
        if (color == null) {
          color = onCallColor;
        }
        _this.options.onCall = true;
        colorForeground("white");
        colorBattery();
        onCallBlock.animate({
          properties: {
            backgroundColor: color,
            opacity: 1,
            height: statusBarHeight * 2
          },
          time: 0.25
        });
        return onCallBlock.onAnimationEnd(function() {
          if (_this.options.onCall === true) {
            return onCallMessage.text = message;
          }
        });
      };
    })(this);
    this.endCall = (function(_this) {
      return function() {
        _this.options.onCall = false;
        onCallMessage.text = "";
        onCallBlock.animate({
          properties: {
            opacity: 0,
            height: statusBarHeight
          },
          time: 0.25
        });
        return _this.applyStyle();
      };
    })(this);
    if (Utils.isMobile()) {
      device = "mobile";
      window.addEventListener("orientationchange", (function(_this) {
        return function() {
          return _this.layout(window.orientation);
        };
      })(this));
    } else {
      Framer.Device.on("change:orientation", (function(_this) {
        return function() {
          device = "Framer";
          return _this.layout(Math.abs(Framer.Device.orientation));
        };
      })(this));
    }
  }

  StatusBarLayer.define('hidden', {
    get: function() {
      return this.isHidden;
    }
  });

  StatusBarLayer.define('onCall', {
    get: function() {
      return this.options.onCall;
    }
  });

  return StatusBarLayer;

})(Layer);

module.exports = StatusBarLayer;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RoaWFnb2J1dGlnbm9uL0Rlc2t0b3AvTEVHQUxIQUNLL0xlZ2FsIEhhY2suZnJhbWVyL21vZHVsZXMvc3RhdHVzYmFybGF5ZXIvU3RhdHVzQmFyTGF5ZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGhpYWdvYnV0aWdub24vRGVza3RvcC9MRUdBTEhBQ0svTGVnYWwgSGFjay5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aGlhZ29idXRpZ25vbi9EZXNrdG9wL0xFR0FMSEFDSy9MZWdhbCBIYWNrLmZyYW1lci9tb2R1bGVzL2lucHV0LWZyYW1lci9pbnB1dC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMjI1xuXHQjIFVTSU5HIFNUQVRVU0JBUkxBWUVSXG5cblx0IyBSZXF1aXJlIHRoZSBtb2R1bGVcblx0U3RhdHVzQmFyTGF5ZXIgPSByZXF1aXJlIFwiU3RhdHVzQmFyTGF5ZXJcIlxuXG5cdG15U3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhckxheWVyXG5cdFx0IyBpT1MgdmVyc2lvblxuXHRcdHZlcnNpb246IDxudW1iZXI+ICgxMCB8fCAxMSlcblxuXHRcdCMgVGV4dFxuXHRcdGNhcnJpZXI6IDxzdHJpbmc+XG5cdFx0dGltZTogPHN0cmluZz4gIyBpZiBub3Qgc2V0LCB3aWxsIHVzZSBsb2NhbCB0aW1lXG5cdFx0cGVyY2VudDogPG51bWJlcj5cblxuXHRcdCMgU2hvdyBvciBoaWRlIHN0YXR1cyBpdGVtc1xuXHRcdHNpZ25hbDogPGJvb2xlYW4+XG5cdFx0d2lmaTogPGJvb2xlYW4+XG5cdFx0cG93ZXJlZDogPGJvb2xlYW4+XG5cdFx0c2hvd1BlcmNlbnRhZ2U6IDxib29sZWFuPlxuXHRcdGlwb2Q6IDxib29sZWFuPiAjIGFsc28gYWZmZWN0cyBzaWduYWwgYW5kIGNhcnJpZXJcblxuXHRcdCMgQ29sb3JzXG5cdFx0c3R5bGU6IDxzdHJpbmc+IChcImxpZ2h0XCIgfHwgXCJkYXJrXCIpXG5cdFx0Zm9yZWdyb3VuZENvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0YmFja2dyb3VuZENvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0dmlicmFudDogPGJvb2xlYW4+XG5cblx0XHQjIEJlaGF2aW9yXG5cdFx0aGlkZTogPGJvb2xlYW4+ICMgaW5pdGlhbCB2aXNpYmlsaXR5XG5cdFx0YXV0b0hpZGU6IDxib29sZWFuPiAjIGhpZGUgaW4gbGFuZHNjYXBlIHdoZXJlIGRldmljZS1hcHByb3ByaWF0ZVxuXG5cdFx0IyBTaW11bGF0ZSBjYWxsXG5cdFx0bXlTdGF0dXNCYXIuc3RhcnRDYWxsKG1lc3NhZ2UsIGNvbG9yKSAjIDxzdHJpbmc+LCA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0bXlTdGF0dXNCYXIuZW5kQ2FsbCgpXG5cblx0XHQjIENoZWNrIHZpc2liaWxpdHkgYW5kIGNhbGwgc3RhdHVzXG5cdFx0cHJpbnQgbXlTdGF0dXNCYXIuaGlkZGVuXG5cdFx0cHJpbnQgbXlTdGF0dXNCYXIub25DYWxsXG4jIyNcblxuZGVmYXVsdHMgPVxuXHRzdHlsZTogXCJsaWdodFwiXG5cdHBvd2VyZWQ6IGZhbHNlXG5cdGNhcnJpZXI6IFwiQ2FycmllclwiXG5cdGZvcmVncm91bmRDb2xvcjogXCJcIlxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0dGltZTogXCJcIlxuXHRwZXJjZW50OiAxMDBcblx0c2hvd1BlcmNlbnRhZ2U6IHRydWVcblx0d2lmaTogdHJ1ZVxuXHRzaWduYWw6IHRydWVcblx0aXBvZDogZmFsc2Vcblx0aGlkZTogZmFsc2Vcblx0YXV0b0hpZGU6IHRydWVcblx0b25DYWxsOiBmYWxzZVxuXHR2aWJyYW50OiBmYWxzZVxuXHR2ZXJzaW9uOiAxMVxuXG4jIGlPUyAxMSB1bmZpbGxlZCBzaWduYWwgYmFyIGlzIDI1JVxuIyBpT1MgMTEgYmF0dGVyeSBzdHJva2UgaXMgMzUlXG5cbmNsYXNzIFN0YXR1c0JhckxheWVyIGV4dGVuZHMgTGF5ZXJcblxuXHRiYXR0ZXJ5R3JlZW4gPSBcIiM0Y2Q5NjRcIlxuXHRvbkNhbGxDb2xvciA9IFwiIzRjZDk2NFwiXG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucyA9IF8uYXNzaWduKHt9LCBkZWZhdWx0cywgQG9wdGlvbnMpXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5pc0hpZGRlbiA9IEBvcHRpb25zLmhpZGVcblxuXHRcdGlzaVBob25lID0gKCkgLT5cblx0XHRcdGlmIF8uaW5jbHVkZXMoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLCBcImlwaG9uZVwiKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdGlzaVBob25lUGx1cyA9ICgpIC0+XG5cdFx0XHRpZiBfLmluY2x1ZGVzKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSwgXCJwbHVzXCIpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0Z2V0QmF0dGVyeU1hcmdpbiA9ICgpID0+XG5cdFx0XHRpZiBAb3B0aW9ucy5wb3dlcmVkID09IGZhbHNlXG5cdFx0XHRcdGlmIGlzaVBob25lUGx1cygpIGFuZCBAb3B0aW9ucy52ZXJzaW9uID4gMTBcblx0XHRcdFx0XHRyZXR1cm4gNVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIDUuNVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gMi41XG5cblx0XHRnZXRCYXR0ZXJ5V2lkdGggPSAoKSA9PlxuXHRcdFx0aWYgQG9wdGlvbnMudmVyc2lvbiA+IDEwIGFuZCBpc2lQaG9uZVBsdXMoKVxuXHRcdFx0XHRyZXR1cm4gMjZcblx0XHRcdGVsc2UgaWYgQG9wdGlvbnMudmVyc2lvbiA+IDEwXG5cdFx0XHRcdHJldHVybiAyNi41XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiAyNC41XG5cblx0XHRnZXRCYXR0ZXJ5U1ZHID0gKCkgPT5cblx0XHRcdHNpemUgPSBpZiBpc2lQaG9uZVBsdXMoKSB0aGVuIFwiYXQzeFwiIGVsc2UgXCJhdDJ4XCJcblx0XHRcdHJldHVybiBzdmdbXCJiYXR0ZXJ5XCJdW1widlwiICsgQG9wdGlvbnMudmVyc2lvbl1bc2l6ZV1cblxuXHRcdGdldFNpZ25hbFNWRyA9ICgpID0+XG5cdFx0XHRzaXplID0gaWYgaXNpUGhvbmVQbHVzKCkgdGhlbiBcImF0M3hcIiBlbHNlIFwiYXQyeFwiXG5cdFx0XHRyZXR1cm4gc3ZnW1wic2lnbmFsXCJdW1widlwiICsgQG9wdGlvbnMudmVyc2lvbl1bc2l6ZV1cblxuXHRcdGdldFNjcmVlbldpZHRoID0gKCkgLT5cblx0XHRcdGlmIF8uaW5jbHVkZXMoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLCBcImFwcGxlXCIpXG5cdFx0XHRcdG9yaWVudGF0aW9uID0gMFxuXHRcdFx0XHRpZiBVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSB3aW5kb3cub3JpZW50YXRpb25cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdG9yaWVudGF0aW9uID0gTWF0aC5hYnMoRnJhbWVyLkRldmljZS5vcmllbnRhdGlvbilcblx0XHRcdFx0aWYgb3JpZW50YXRpb24gPT0gMFxuXHRcdFx0XHRcdHJldHVybiBNYXRoLm1pbihTY3JlZW4ud2lkdGgsIFNjcmVlbi5oZWlnaHQpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoU2NyZWVuLndpZHRoLCBTY3JlZW4uaGVpZ2h0KVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gU2NyZWVuLndpZHRoXG5cblx0XHR0b3BNYXJnaW4gPSAzXG5cdFx0b25DYWxsTWFyZ2luID0gMThcblx0XHRzdGF0dXNCYXJIZWlnaHQgPSAyMFxuXHRcdG9uQ2FsbE1hcmdpbiA9IHRvcE1hcmdpbiArIG9uQ2FsbE1hcmdpblxuXHRcdGNhcnJpZXJNYXJnaW4gPSA0LjVcblx0XHRzaWduYWxNYXJnaW4gPSBpZiBpc2lQaG9uZVBsdXMoKSB0aGVuIDYgZWxzZSA2LjVcblx0XHR3aWZpTWFyZ2luID0gNFxuXHRcdHBvd2VyTWFyZ2luID0gNS41XG5cdFx0cGVyY2VudGFnZU1hcmdpbiA9IDIuNVxuXHRcdGFsYXJtTWFyZ2luID0gNi41XG5cdFx0bG9jYXRpb25NYXJnaW4gPSA2XG5cdFx0aXBvZE1hcmdpbiA9IDZcblx0XHRiYXNlRm9udFNpemUgPSAxMlxuXHRcdG9uQ2FsbEZvbnRTaXplID0gMTMuNVxuXHRcdGxldHRlclNwYWNpbmcgPSAwXG5cdFx0dGltZUxldHRlclNwYWNpbmcgPSBpZiBpc2lQaG9uZVBsdXMoKSB0aGVuIDEgZWxzZSAwXG5cdFx0b25DYWxsTGV0dGVyU3BhY2luZyA9IDBcblx0XHRvbkNhbGxXb3JkU3BhY2luZyA9IDBcblx0XHRmb250V2VpZ2h0ID0gaWYgaXNpUGhvbmVQbHVzKCkgdGhlbiAzMDAgZWxzZSA0MDBcblx0XHR0aW1lRm9udFdlaWdodCA9IDUwMFxuXG5cdFx0QC5oZWlnaHQgPSBzdGF0dXNCYXJIZWlnaHRcblxuXHRcdGlmIEBvcHRpb25zLmlwb2QgPT0gdHJ1ZVxuXHRcdFx0QG9wdGlvbnMuY2FycmllciA9IFwiaVBvZFwiXG5cdFx0XHRAb3B0aW9ucy5zaWduYWwgPSBmYWxzZVxuXG5cdFx0aWYgQG9wdGlvbnMucG93ZXJlZCA9PSB0cnVlXG5cdFx0XHRiYXR0ZXJ5Q29sb3IgPSBiYXR0ZXJ5R3JlZW5cblx0XHRlbHNlXG5cdFx0XHRiYXR0ZXJ5Q29sb3IgPSBAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3JcblxuXHRcdGdldEJhdHRlcnlMZXZlbCA9IChkZWZhdWx0QmF0dGVyeVdpZHRoKSA9PlxuXHRcdFx0cGVyY2VudGFnZVdpZHRoID0gQG9wdGlvbnMucGVyY2VudCAvIDEwMCAqIGRlZmF1bHRCYXR0ZXJ5V2lkdGhcblx0XHRcdHBlcmNlbnRhZ2VXaWR0aCA9IE1hdGgucm91bmQocGVyY2VudGFnZVdpZHRoKVxuXHRcdFx0cmV0dXJuIHBlcmNlbnRhZ2VXaWR0aFxuXG5cdFx0YXBwbGVTVkdDU1MgPSBcIlwiXCJcblx0XHRcdC5zdmdGaXQge1xuXHRcdFx0ICBvYmplY3QtZml0OiBjb250YWluO1xuXHRcdFx0ICB3aWR0aDogMTAwJTtcblx0XHRcdCAgaGVpZ2h0OiAxMDAlO1xuXHRcdFx0ICBtYXgtd2lkdGg6IDEwMCU7XG5cdFx0XHQgIG1heC1oZWlnaHQ6IDEwMCU7XG5cdFx0XHR9XG5cdFx0XHRcIlwiXCJcblxuXHRcdGNhbnZhc1NWR0NTUyA9IFwiXCJcIlxuXHRcdFx0LnN2Z0ZpdCB7XG5cdFx0XHQgIG9iamVjdC1maXQ6IGNvbnRhaW47XG5cdFx0XHQgIHdpZHRoOiAxMDAlO1xuXHRcdFx0ICBtYXgtd2lkdGg6IDEwMCU7XG5cdFx0XHQgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdCAgdG9wOiAwO1xuXHRcdFx0fVxuXHRcdFx0XCJcIlwiXG5cdFx0c3ZnQ1NTID0gaWYgXy5pbmNsdWRlcyhGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIFwiYXBwbGVcIikgdGhlbiBhcHBsZVNWR0NTUyBlbHNlIGNhbnZhc1NWR0NTU1xuXHRcdFxuXHRcdFV0aWxzLmluc2VydENTUyhzdmdDU1MpXG5cdFx0c2lnbmFsX3YxMF8yeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCAzNCAxNic+PGNpcmNsZSBjeD0nMi43NScgY3k9JzIuNzUnIHI9JzIuNzUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PSc5Ljc1JyBjeT0nMi43NScgcj0nMi43NScgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxjaXJjbGUgY3g9JzE2Ljc1JyBjeT0nMi43NScgcj0nMi43NScgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxjaXJjbGUgY3g9JzIzLjc1JyBjeT0nMi43NScgcj0nMi43NScgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxjaXJjbGUgY3g9JzMwLjc1JyBjeT0nMi43NScgcj0nMi41JyBzdHJva2U9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgc3Ryb2tlLXdpZHRoPScwLjUnIGZpbGwtb3BhY2l0eT0nMCcgY2xhc3M9J3N0cm9rZWQnIC8+PC9zdmc+XCJcblx0XHRzaWduYWxfdjExXzJ4ID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgY2xhc3M9J3N2Z0ZpdCcgdmlld0JveD0nMCAwIDMzIDMzJz48cmVjdCB4PScwJyB5PScxMScgd2lkdGg9JzYnIGhlaWdodD0nOScgcng9JzInIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48cmVjdCB4PSc5JyB5PSc4JyB3aWR0aD0nNicgaGVpZ2h0PScxMicgcng9JzInIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48cmVjdCB4PScxOCcgeT0nNCcgd2lkdGg9JzYnIGhlaWdodD0nMTYnIHJ4PScyJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nMjcnIHk9JzAnIHdpZHRoPSc2JyBoZWlnaHQ9JzIwJyByeD0nMicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cdFx0c2lnbmFsX3YxMF8zeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCA2NyAzMic+PGNpcmNsZSBjeD0nNS41JyBjeT0nNS41JyByPSc1LjUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PScxOS41JyBjeT0nNS41JyByPSc1LjUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PSczMy41JyBjeT0nNS41JyByPSc1LjUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PSc0Ny41JyBjeT0nNS41JyByPSc1LjUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48cGF0aCBkPSdNNjEuNSwxQTQuNSw0LjUsMCwxLDEsNTcsNS41LDQuNTEsNC41MSwwLDAsMSw2MS41LDFtMC0xQTUuNSw1LjUsMCwxLDAsNjcsNS41LDUuNSw1LjUsMCwwLDAsNjEuNSwwWicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cdFx0c2lnbmFsX3YxMV8zeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCA0OS41IDYwJz48cmVjdCB4PScwJyB5PScxNycgd2lkdGg9JzknIGhlaWdodD0nMTMnIHJ4PSczJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nMTMnIHk9JzEyJyB3aWR0aD0nOScgaGVpZ2h0PScxOCcgcng9JzMnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48cmVjdCB4PScyNicgeT0nNicgd2lkdGg9JzknIGhlaWdodD0nMjQnIHJ4PSczJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nMzknIHk9JzAnIHdpZHRoPSc5JyBoZWlnaHQ9JzMwJyByeD0nMycgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cdFx0d2lmaVNWRyA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCAyNCAzNic+PHBhdGggZD0nTSA4LjA4NSAxMy42MyBMIDExLjk5NSAxOCBMIDE1LjkwNSAxMy42MyBDIDEzLjc1MiAxMS40NTQgMTAuMjM4IDExLjQ1NCA4LjA4NSAxMy42MyBaIE0gNC4wODUgOS4xNiBMIDYuMDg1IDExLjM5IEMgOS4zNzYgOC4xOTIgMTQuNjE0IDguMTkyIDE3LjkwNSAxMS4zOSBMIDE5LjkwNSA5LjE2IEMgMTUuNDc5IDQuOTQzIDguNTIxIDQuOTQzIDQuMDk1IDkuMTYgWiBNIDExLjk5NSAwIEMgNy41NzYgMC4wMDEgMy4zMjIgMS42ODEgMC4wOTUgNC43IEwgMi4wOTUgNi45MyBDIDcuNjU5IDEuNjkxIDE2LjM0MSAxLjY5MSAyMS45MDUgNi45MyBMIDIzLjkwNSA0LjcgQyAyMC42NzYgMS42NzggMTYuNDE4IC0wLjAwMiAxMS45OTUgMCBaJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PC9zdmc+XCJcblx0XHRiYXR0ZXJ5X3YxMF8yeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCA0OSAzMic+PHJlY3QgeD0nMC41JyB5PScwLjUnICB3aWR0aD0nNDQnIGhlaWdodD0nMTgnIHJ4PSczJyByeT0nMycgc3Ryb2tlPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIGZpbGwtb3BhY2l0eT0nMCcgY2xhc3M9J3N0cm9rZWQnIC8+PHJlY3QgeD0nMicgeT0nMicgd2lkdGg9JyN7Z2V0QmF0dGVyeUxldmVsKDQxKX0nIGhlaWdodD0nMTUnIHJ4PScxLjUnIHJ5PScxLjUnIGZpbGw9JyN7YmF0dGVyeUNvbG9yfScgaWQ9J2JhdHRlcnlGaWxsJyAvPjxwYXRoIGQ9J000Niw2djdhMy4yOCwzLjI4LDAsMCwwLDMtMy41QTMuMjgsMy4yOCwwLDAsMCw0Niw2WicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9Jy8+PC9zdmc+XCJcblx0XHRiYXR0ZXJ5X3YxMV8yeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCA1MyAzMic+PHJlY3QgZmlsbD0nI3tiYXR0ZXJ5Q29sb3J9JyBpZD0nYmF0dGVyeUZpbGwnIHg9JzQnIHk9JzQnIHdpZHRoPScje2dldEJhdHRlcnlMZXZlbCg0MCl9JyBoZWlnaHQ9JzE1JyByeD0nMicgLz48cmVjdCBzdHJva2U9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgZmlsbC1vcGFjaXR5PScwJyBjbGFzcz0nc3Ryb2tlZCcgc3Ryb2tlLXdpZHRoPScyJyBvcGFjaXR5PScwLjQnIHg9JzEnIHk9JzEnIHdpZHRoPSc0NicgaGVpZ2h0PScyMScgcng9JzUnIC8+PHBhdGggZD0nTTUwLDcuMjU2MDU4NTYgQzUxLjc0Nzc4ODYsNy44NzM4MTMxNyA1Myw5LjU0MDY3MTc2IDUzLDExLjUgQzUzLDEzLjQ1OTMyODIgNTEuNzQ3Nzg4NiwxNS4xMjYxODY4IDUwLDE1Ljc0Mzk0MTQgTDUwLDcuMjU2MDU4NTYgWicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyBvcGFjaXR5PScwLjQnIC8+PC9zdmc+XCJcblx0XHRiYXR0ZXJ5X3YxMF8zeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCA3MyA0Mic+PHBhdGggZD0nTTYyLDBINUE1LDUsMCwwLDAsMCw1VjI0YTUsNSwwLDAsMCw1LDVINjJhNSw1LDAsMCwwLDUtNVY1QTUsNSwwLDAsMCw2MiwwWm00LDI0YTQsNCwwLDAsMS00LDRINWE0LDQsMCwwLDEtNC00VjVBNCw0LDAsMCwxLDUsMUg2MmE0LDQsMCwwLDEsNCw0WicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxyZWN0IHg9JzInIHk9JzInIHdpZHRoPScje2dldEJhdHRlcnlMZXZlbCg2Myl9JyBoZWlnaHQ9JzI1JyByeD0nMycgcnk9JzMnIGZpbGw9JyN7YmF0dGVyeUNvbG9yfScgaWQ9J2JhdHRlcnlGaWxsJyAvPjxwYXRoIGQ9J002OSwxMC4wNnY5Ljg5QTQuODIsNC44MiwwLDAsMCw3MywxNSw0LjgyLDQuODIsMCwwLDAsNjksMTAuMDZaJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PC9zdmc+XCJcblx0XHRiYXR0ZXJ5X3YxMV8zeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCA3OCA0Mic+PHJlY3QgZmlsbD0nI3tiYXR0ZXJ5Q29sb3J9JyBpZD0nYmF0dGVyeUZpbGwnIHg9JzYnIHk9JzYnIHdpZHRoPScje2dldEJhdHRlcnlMZXZlbCg1OSl9JyBoZWlnaHQ9JzIyJyByeD0nMycgLz48cmVjdCBzdHJva2U9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgZmlsbC1vcGFjaXR5PScwJyBjbGFzcz0nc3Ryb2tlZCcgc3Ryb2tlLXdpZHRoPSczJyBvcGFjaXR5PScwLjQnIHg9JzEuNScgeT0nMS41JyB3aWR0aD0nNjgnIGhlaWdodD0nMzEnIHJ4PSc3LjUnIC8+PHBhdGggZD0nTSA3NCAxMC42NzQgQyA3Ni4zNjUgMTEuNzk3IDc4IDE0LjIwOCA3OCAxNyBDIDc4IDE5Ljc5MiA3Ni4zNjUgMjIuMjAzIDc0IDIzLjMyNiBMIDc0IDEwLjY3NCBaJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIG9wYWNpdHk9JzAuNCcvPjwvc3ZnPlwiXG5cdFx0cG93ZXJTVkcgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNiAxNyc+PHBvbHlnb24gcG9pbnRzPSc2IDMuNzUgMy40MyAzLjc1IDQuNSAwIDAuNSA1LjI1IDIuOTggNS4yNSAxLjUgOS41IDYgMy43NScgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cblx0XHRzdmcgPVxuXHRcdFx0YmF0dGVyeTpcblx0XHRcdFx0djEwOlxuXHRcdFx0XHRcdGF0Mng6IGJhdHRlcnlfdjEwXzJ4XG5cdFx0XHRcdFx0YXQzeDogYmF0dGVyeV92MTBfM3hcblx0XHRcdFx0djExOlxuXHRcdFx0XHRcdGF0Mng6IGJhdHRlcnlfdjExXzJ4XG5cdFx0XHRcdFx0YXQzeDogYmF0dGVyeV92MTFfM3hcblx0XHRcdHNpZ25hbDpcblx0XHRcdFx0djEwOlxuXHRcdFx0XHRcdGF0Mng6IHNpZ25hbF92MTBfMnhcblx0XHRcdFx0XHRhdDN4OiBzaWduYWxfdjEwXzN4XG5cdFx0XHRcdHYxMTpcblx0XHRcdFx0XHRhdDJ4OiBzaWduYWxfdjExXzJ4XG5cdFx0XHRcdFx0YXQzeDogc2lnbmFsX3YxMV8zeFxuXHRcdFx0d2lmaTogd2lmaVNWR1xuXHRcdFx0cG93ZXI6IHBvd2VyU1ZHXG5cblx0XHRvbkNhbGxCbG9jayA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcIm9uQ2FsbEJsb2NrXCJcblx0XHRcdGhlaWdodDogc3RhdHVzQmFySGVpZ2h0XG5cblx0XHRALm9uQ2FsbEJsb2NrID0gb25DYWxsQmxvY2tcblxuXHRcdG9uQ2FsbE1lc3NhZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwib25DYWxsTWVzc2FnZVwiXG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IG9uQ2FsbE1hcmdpblxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0Zm9udFNpemU6IG9uQ2FsbEZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBmb250V2VpZ2h0XG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IG9uQ2FsbExldHRlclNwYWNpbmdcblx0XHRcdHdvcmRTcGFjaW5nOiBvbkNhbGxXb3JkU3BhY2luZ1xuXG5cdFx0QC5vbkNhbGxNZXNzYWdlID0gb25DYWxsTWVzc2FnZVxuXG5cdFx0Y2FycmllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJjYXJyaWVyXCJcblx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdHRvcDogdG9wTWFyZ2luXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy5jYXJyaWVyXG5cdFx0XHRmb250U2l6ZTogYmFzZUZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBmb250V2VpZ2h0XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBsZXR0ZXJTcGFjaW5nXG5cblx0XHRALmNhcnJpZXIgPSBjYXJyaWVyXG5cblx0XHRzaWduYWwgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJzaWduYWxcIlxuXHRcdFx0d2lkdGg6IGlmIEBvcHRpb25zLnZlcnNpb24gPiAxMCB0aGVuIDE2LjUgZWxzZSAzNFxuXHRcdFx0aGVpZ2h0OiBpZiBAb3B0aW9ucy52ZXJzaW9uID4gMTAgdGhlbiAxMCBlbHNlIDZcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aHRtbDogZ2V0U2lnbmFsU1ZHKClcblxuXHRcdEAuc2lnbmFsID0gc2lnbmFsXG5cblx0XHR3aWZpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwid2lmaVwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAxM1xuXHRcdFx0aGVpZ2h0OiA5XG5cdFx0XHRodG1sOiB3aWZpU1ZHXG5cblx0XHRALndpZmkgPSB3aWZpXG5cblx0XHRnZXRUaW1lID0gKCkgPT5cblx0XHRcdHRvZGF5ID0gbmV3IERhdGVcblx0XHRcdGRheSA9IHRvZGF5LmdldERheSgpXG5cdFx0XHRob3VyID0gdG9kYXkuZ2V0SG91cnMoKVxuXHRcdFx0bWludXRlID0gdG9kYXkuZ2V0TWludXRlcygpXG5cdFx0XHRzZWNvbmQgPSB0b2RheS5nZXRTZWNvbmRzKClcblx0XHRcdHN1ZmZpeCA9IGlmIGhvdXIgPj0gMTIgdGhlbiAnIFBNJyBlbHNlICcgQU0nXG5cdFx0XHRob3VyID0gaWYgaG91ciA+IDEyIHRoZW4gaG91ciAtIDEyIGVsc2UgaG91clxuXHRcdFx0bWludXRlID0gaWYgbWludXRlIDwgMTAgdGhlbiBcIjBcIiArIG1pbnV0ZSBlbHNlIG1pbnV0ZVxuXHRcdFx0aWYgQG9wdGlvbnMudGltZSA9PSBcIlwiXG5cdFx0XHRcdHJldHVybiBob3VyICsgJzonICsgbWludXRlICsgc3VmZml4XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBAb3B0aW9ucy50aW1lXG5cblx0XHR0aW1lID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcInRpbWVcIlxuXHRcdFx0d2lkdGg6IEAud2lkdGhcblx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdHRvcDogdG9wTWFyZ2luXG5cdFx0XHR0ZXh0OiBnZXRUaW1lKClcblx0XHRcdGZvbnRTaXplOiBiYXNlRm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IHRpbWVGb250V2VpZ2h0XG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IHRpbWVMZXR0ZXJTcGFjaW5nXG5cblx0XHRALnRpbWUgPSB0aW1lXG5cblx0XHRwb3dlciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcInBvd2VyXCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDUuNVxuXHRcdFx0aGVpZ2h0OiA5LjVcblx0XHRcdGh0bWw6IHBvd2VyU1ZHXG5cblx0XHRALnBvd2VyID0gcG93ZXJcblxuXHRcdGJhdHRlcnkgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJiYXR0ZXJ5XCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IGdldEJhdHRlcnlXaWR0aCgpXG5cdFx0XHRoZWlnaHQ6IGlmIEBvcHRpb25zLnZlcnNpb24gPiAxMCB0aGVuIDExLjUgZWxzZSA5XG5cdFx0XHRodG1sOiBnZXRCYXR0ZXJ5U1ZHKClcblxuXHRcdEAuYmF0dGVyeSA9IGJhdHRlcnlcblxuXHRcdHBlcmNlbnRhZ2UgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwicGVyY2VudGFnZVwiXG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IHRvcE1hcmdpblxuXHRcdFx0dGV4dDogQG9wdGlvbnMucGVyY2VudCArIFwiJVwiXG5cdFx0XHRmb250U2l6ZTogYmFzZUZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBmb250V2VpZ2h0XG5cdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0bGV0dGVyU3BhY2luZzogbGV0dGVyU3BhY2luZ1xuXG5cdFx0QC5wZXJjZW50YWdlID0gcGVyY2VudGFnZVxuXG5cdFx0Zm9yIGxheWVyIGluIEAuc3ViTGF5ZXJzXG5cdFx0XHRsYXllci5iYWNrZ3JvdW5kQ29sb3IgPSBcImNsZWFyXCJcblxuXHRcdEBoaWRlID0gKCkgPT5cblx0XHRcdEAuaXNIaWRkZW4gPSB0cnVlXG5cdFx0XHRALmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHR5OiAwIC0gc3RhdHVzQmFySGVpZ2h0XG5cdFx0XHRcdHRpbWU6XG5cdFx0XHRcdFx0MC4yNVxuXG5cdFx0QHNob3cgPSAoKSA9PlxuXHRcdFx0QC5pc0hpZGRlbiA9IGZhbHNlXG5cdFx0XHRALmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHR5OiAwXG5cdFx0XHRcdHRpbWU6XG5cdFx0XHRcdFx0MC4yNVxuXG5cdFx0QGxheW91dCA9IChvcmllbnRhdGlvbiA9IDApID0+XG5cdFx0XHRsYXlvdXRXaWR0aCA9IGdldFNjcmVlbldpZHRoKClcblx0XHRcdEAud2lkdGggPSBsYXlvdXRXaWR0aFxuXHRcdFx0aWYgQG9wdGlvbnMuaGlkZSA9PSB0cnVlXG5cdFx0XHRcdEBoaWRlKClcblx0XHRcdGVsc2UgaWYgQG9wdGlvbnMuYXV0b0hpZGUgPT0gdHJ1ZSAmJiBvcmllbnRhdGlvbiA+IDAgJiYgaXNpUGhvbmUoKVxuXHRcdFx0XHRAaGlkZSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzaG93KClcblx0XHRcdCMgTGVmdC1zaWRlIGl0ZW1zXG5cdFx0XHRpZiBAb3B0aW9ucy5jYXJyaWVyID09IFwiXCJcblx0XHRcdFx0Y2Fycmllck1hcmdpbiA9IDBcblx0XHRcdGlmIEBvcHRpb25zLnNpZ25hbCA9PSB0cnVlXG5cdFx0XHRcdHNpZ25hbC52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRzaWduYWwueCA9IHNpZ25hbE1hcmdpblxuXHRcdFx0XHRjYXJyaWVyLnggPSBzaWduYWwueCArIHNpZ25hbC53aWR0aCArIGNhcnJpZXJNYXJnaW5cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2lnbmFsLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHRjYXJyaWVyLnggPSBpcG9kTWFyZ2luXG5cdFx0XHRpZiBAb3B0aW9ucy53aWZpID09IHRydWVcblx0XHRcdFx0d2lmaS52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR3aWZpLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0d2lmaS54ID0gY2Fycmllci54ICsgY2Fycmllci53aWR0aCArIHdpZmlNYXJnaW5cblx0XHRcdCMgQ2VudGVyIGN1cnJlbnQgdGltZSBhbmQgb24tY2FsbFxuXHRcdFx0dGltZS53aWR0aCA9IGxheW91dFdpZHRoXG5cdFx0XHRvbkNhbGxCbG9jay53aWR0aCA9IGxheW91dFdpZHRoXG5cdFx0XHRvbkNhbGxNZXNzYWdlLndpZHRoID0gbGF5b3V0V2lkdGhcblx0XHRcdCMgUmlnaHQtc2lkZSBpdGVtc1xuXHRcdFx0aWYgQG9wdGlvbnMucG93ZXJlZCA9PSB0cnVlXG5cdFx0XHRcdHBvd2VyLnggPSBBbGlnbi5yaWdodCgtcG93ZXJNYXJnaW4pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHBvd2VyLnggPSBsYXlvdXRXaWR0aFxuXHRcdFx0YmF0dGVyeS54ID0gcG93ZXIueCAtIGJhdHRlcnkud2lkdGggLSBnZXRCYXR0ZXJ5TWFyZ2luKClcblx0XHRcdGlmIEBvcHRpb25zLnNob3dQZXJjZW50YWdlID09IGZhbHNlXG5cdFx0XHRcdHBlcmNlbnRhZ2VNYXJnaW4gPSAwXG5cdFx0XHRcdHBlcmNlbnRhZ2UudGV4dCA9IFwiXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0cGVyY2VudGFnZS50ZXh0ID0gQG9wdGlvbnMucGVyY2VudCArIFwiJVwiXG5cdFx0XHRwZXJjZW50YWdlLm1heFggPSBiYXR0ZXJ5LnggLSBwZXJjZW50YWdlTWFyZ2luXG5cblx0XHRnZXRUaW1lKClcblx0XHRAbGF5b3V0KClcblxuXHRcdCMgZW5kIGxheW91dCgpXG5cblx0XHRzZWxlY3RGb3JlZ3JvdW5kQ29sb3IgPSAoKSA9PlxuXHRcdFx0aWYgQG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yID09IFwiXCJcblx0XHRcdFx0aWYgQG9wdGlvbnMuc3R5bGUgPT0gXCJkYXJrXCJcblx0XHRcdFx0XHRyZXR1cm4gXCJ3aGl0ZVwiXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gXCJibGFja1wiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3JcblxuXHRcdGZvcmVncm91bmRJdGVtcyA9IFtwZXJjZW50YWdlLCBwb3dlciwgdGltZSwgd2lmaSwgc2lnbmFsLCBjYXJyaWVyLCBiYXR0ZXJ5XVxuXG5cdFx0Y29sb3JGb3JlZ3JvdW5kID0gKGNvbG9yID0gXCJcIikgPT5cblx0XHRcdGlmIGNvbG9yID09IFwiXCIgdGhlbiBjb2xvciA9IHNlbGVjdEZvcmVncm91bmRDb2xvcigpXG5cdFx0XHRmb3IgbGF5ZXIgaW4gZm9yZWdyb3VuZEl0ZW1zXG5cdFx0XHRcdGxheWVyLmNvbG9yID0gY29sb3Jcblx0XHRcdFx0bGF5ZXJTVkcgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCdwYXRoLCBjaXJjbGUsIHJlY3QsIHBvbHlnb24nKVxuXHRcdFx0XHRzdHJva2VkU1ZHID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbCgnLnN0cm9rZWQnKVxuXHRcdFx0XHRmb3IgU1ZHIGluIGxheWVyU1ZHXG5cdFx0XHRcdFx0U1ZHLnNldEF0dHJpYnV0ZSgnZmlsbCcsIGNvbG9yKVxuXHRcdFx0XHRmb3IgU1ZHIGluIHN0cm9rZWRTVkdcblx0XHRcdFx0XHRTVkcuc2V0QXR0cmlidXRlKCdzdHJva2UnLCBjb2xvcilcblx0XHRcdFx0XHRTVkcuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMCcpXG5cblx0XHRjb2xvckJhdHRlcnkgPSAoKSA9PlxuXHRcdFx0YmF0dGVyeUZpbGxTVkcgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKCcjYmF0dGVyeUZpbGwnKVxuXHRcdFx0aWYgQG9wdGlvbnMub25DYWxsID09IHRydWVcblx0XHRcdFx0Zm9yIFNWRyBpbiBiYXR0ZXJ5RmlsbFNWR1xuXHRcdFx0XHRcdFNWRy5zdHlsZS5XZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAwLjI1cyc7XG5cdFx0XHRcdFx0U1ZHLnNldEF0dHJpYnV0ZSgnZmlsbCcsIFwid2hpdGVcIilcblx0XHRcdGVsc2UgaWYgQG9wdGlvbnMucG93ZXJlZCA9PSB0cnVlXG5cdFx0XHRcdGZvciBTVkcgaW4gYmF0dGVyeUZpbGxTVkdcblx0XHRcdFx0XHRTVkcuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMC4yNXMnO1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBiYXR0ZXJ5R3JlZW4pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGZvciBTVkcgaW4gYmF0dGVyeUZpbGxTVkdcblx0XHRcdFx0XHRTVkcuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMC4yNXMnO1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBzZWxlY3RGb3JlZ3JvdW5kQ29sb3IoKSlcblxuXHRcdHN0eWxlQmFyID0gKHN0eWxlLCBiYWNrZ3JvdW5kQ29sb3IgPSBcIlwiKSA9PlxuXHRcdFx0aWYgYmFja2dyb3VuZENvbG9yID09IFwiXCJcblx0XHRcdFx0QC5zdHlsZSA9XG5cdFx0XHRcdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoNjBweClcIlxuXHRcdFx0XHRpZiBzdHlsZSA9PSBcImRhcmtcIlxuXHRcdFx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIlxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0QC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KVwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG5cdFx0XHRpZiBAb3B0aW9ucy52aWJyYW50ID09IHRydWVcblx0XHRcdFx0YmFyQ29sb3IgPSBuZXcgQ29sb3IoYmFja2dyb3VuZENvbG9yKS5hbHBoYSguNSlcblx0XHRcdFx0QC5iYWNrZ3JvdW5kQ29sb3IgPSBiYXJDb2xvclxuXHRcdFx0XHRALnN0eWxlID1cblx0XHRcdFx0XHRcIi13ZWJraXQtYmFja2Ryb3AtZmlsdGVyXCI6IFwiYmx1cig2MHB4KVwiXG5cblxuXHRcdEBhcHBseVN0eWxlID0gKHN0eWxlID0gQG9wdGlvbnMuc3R5bGUsIGZvcmVncm91bmRDb2xvciA9IEBvcHRpb25zLmZvcmVncm91bmRDb2xvciwgYmFja2dyb3VuZENvbG9yID0gQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yKSA9PlxuXHRcdFx0aWYgc3R5bGUgPT0gXCJsaWdodFwiICYmIGZvcmVncm91bmRDb2xvciA9PSBcIlwiXG5cdFx0XHRcdGZvcmVncm91bmRDb2xvciA9IFwiYmxhY2tcIlxuXHRcdFx0aWYgc3R5bGUgPT0gXCJkYXJrXCIgJiYgZm9yZWdyb3VuZENvbG9yID09IFwiXCJcblx0XHRcdFx0Zm9yZWdyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG5cdFx0XHRzdHlsZUJhcihzdHlsZSwgYmFja2dyb3VuZENvbG9yKVxuXHRcdFx0Y29sb3JGb3JlZ3JvdW5kKClcblx0XHRcdGNvbG9yQmF0dGVyeSgpXG5cblx0XHRAYXBwbHlTdHlsZSgpXG5cblx0XHRAc3RhcnRDYWxsID0gKG1lc3NhZ2UgPSBcIlRvdWNoIHRvIHJldHVybiB0byBjYWxsIDA6MzBcIiwgY29sb3IgPSBvbkNhbGxDb2xvcikgPT5cblx0XHRcdEBvcHRpb25zLm9uQ2FsbCA9IHRydWVcblx0XHRcdGNvbG9yRm9yZWdyb3VuZChcIndoaXRlXCIpXG5cdFx0XHRjb2xvckJhdHRlcnkoKVxuXHRcdFx0b25DYWxsQmxvY2suYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0XHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdFx0aGVpZ2h0OiBzdGF0dXNCYXJIZWlnaHQgKiAyXG5cdFx0XHRcdHRpbWU6XG5cdFx0XHRcdFx0MC4yNVxuXHRcdFx0b25DYWxsQmxvY2sub25BbmltYXRpb25FbmQgPT5cblx0XHRcdFx0aWYgQG9wdGlvbnMub25DYWxsID09IHRydWVcblx0XHRcdFx0XHRvbkNhbGxNZXNzYWdlLnRleHQgPSBtZXNzYWdlXG5cblx0XHRAZW5kQ2FsbCA9ICgpID0+XG5cdFx0XHRAb3B0aW9ucy5vbkNhbGwgPSBmYWxzZVxuXHRcdFx0b25DYWxsTWVzc2FnZS50ZXh0ID0gXCJcIlxuXHRcdFx0b25DYWxsQmxvY2suYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0XHRoZWlnaHQ6IHN0YXR1c0JhckhlaWdodFxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblx0XHRcdEBhcHBseVN0eWxlKClcblxuXHRcdCMgQ2hlY2sgd2hldGhlciB0aGUgZGV2aWNlIGlzIG1vYmlsZSBvciBub3QgKHZlcnN1cyBGcmFtZXIpXG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0IyBTZXQgdHlwZVxuXHRcdFx0ZGV2aWNlID0gXCJtb2JpbGVcIlxuXHRcdFx0IyBBZGQgZXZlbnQgbGlzdGVuZXIgb24gb3JpZW50YXRpb24gY2hhbmdlXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcIm9yaWVudGF0aW9uY2hhbmdlXCIsID0+XG5cdFx0XHRcdCMgU2VuZCBldmVudCBoYW5kbGluZyB0byBmdW5jdGlvbiBhbG9uZyB3aXRoIGRldmljZSB0eXBlXG5cdFx0XHRcdEBsYXlvdXQod2luZG93Lm9yaWVudGF0aW9uKVxuXHRcdGVsc2Vcblx0XHRcdCMgTGlzdGVuIGZvciBvcmllbnRhdGlvbiBjaGFuZ2VzIG9uIHRoZSBkZXZpY2Ugdmlld1xuXHRcdFx0RnJhbWVyLkRldmljZS5vbiBcImNoYW5nZTpvcmllbnRhdGlvblwiLCA9PlxuXHRcdFx0XHQjIFNldCB0eXBlXG5cdFx0XHRcdGRldmljZSA9IFwiRnJhbWVyXCJcblx0XHRcdFx0IyBTZW5kIGV2ZW50IGhhbmRsaW5nIHRvIGZ1bmN0aW9uIHdpdGggZGV2aWNlIHR5cGVcblx0XHRcdFx0QGxheW91dChNYXRoLmFicyhGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uKSlcblxuXHRAZGVmaW5lICdoaWRkZW4nLCBnZXQ6ICgpIC0+IEAuaXNIaWRkZW5cblx0QGRlZmluZSAnb25DYWxsJywgZ2V0OiAoKSAtPiBAb3B0aW9ucy5vbkNhbGxcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0dXNCYXJMYXllclxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsImV4cG9ydHMua2V5Ym9hcmRMYXllciA9IG5ldyBMYXllclxuXHR4OjAsIHk6U2NyZWVuLmhlaWdodCwgd2lkdGg6U2NyZWVuLndpZHRoLCBoZWlnaHQ6NDMyXG5cdGh0bWw6XCI8aW1nIHN0eWxlPSd3aWR0aDogMTAwJTsnIHNyYz0nbW9kdWxlcy9rZXlib2FyZC5wbmcnLz5cIlxuXG4jc2NyZWVuIHdpZHRoIHZzLiBzaXplIG9mIGltYWdlIHdpZHRoXG5ncm93dGhSYXRpbyA9IFNjcmVlbi53aWR0aCAvIDczMlxuaW1hZ2VIZWlnaHQgPSBncm93dGhSYXRpbyAqIDQzMlxuXG4jIEV4dGVuZHMgdGhlIExheWVyU3R5bGUgY2xhc3Mgd2hpY2ggZG9lcyB0aGUgcGl4ZWwgcmF0aW8gY2FsY3VsYXRpb25zIGluIGZyYW1lclxuX2lucHV0U3R5bGUgPVxuXHRPYmplY3QuYXNzaWduKHt9LCBGcmFtZXIuTGF5ZXJTdHlsZSxcblx0XHRjYWxjdWxhdGVQaXhlbFJhdGlvID0gKGxheWVyLCB2YWx1ZSkgLT5cblx0XHRcdCh2YWx1ZSAqIGxheWVyLmNvbnRleHQucGl4ZWxNdWx0aXBsaWVyKSArIFwicHhcIlxuXG5cdFx0Zm9udFNpemU6IChsYXllcikgLT5cblx0XHRcdGNhbGN1bGF0ZVBpeGVsUmF0aW8obGF5ZXIsIGxheWVyLl9wcm9wZXJ0aWVzLmZvbnRTaXplKVxuXG5cdFx0bGluZUhlaWdodDogKGxheWVyKSAtPlxuXHRcdFx0KGxheWVyLl9wcm9wZXJ0aWVzLmxpbmVIZWlnaHQpICsgXCJlbVwiXG5cblx0XHRwYWRkaW5nOiAobGF5ZXIpIC0+XG5cdFx0XHR7IHBpeGVsTXVsdGlwbGllciB9ID0gbGF5ZXIuY29udGV4dFxuXHRcdFx0cGFkZGluZyA9IFtdXG5cdFx0XHRwYWRkaW5nVmFsdWUgPSBsYXllci5fcHJvcGVydGllcy5wYWRkaW5nXG5cblx0XHRcdCMgQ2hlY2sgaWYgd2UgaGF2ZSBhIHNpbmdsZSBudW1iZXIgYXMgaW50ZWdlclxuXHRcdFx0aWYgTnVtYmVyLmlzSW50ZWdlcihwYWRkaW5nVmFsdWUpXG5cdFx0XHRcdHJldHVybiBjYWxjdWxhdGVQaXhlbFJhdGlvKGxheWVyLCBwYWRkaW5nVmFsdWUpXG5cblx0XHRcdCMgSWYgd2UgaGF2ZSBtdWx0aXBsZSB2YWx1ZXMgdGhleSBjb21lIGFzIHN0cmluZyAoZS5nLiBcIjEgMiAzIDRcIilcblx0XHRcdHBhZGRpbmdWYWx1ZXMgPSBsYXllci5fcHJvcGVydGllcy5wYWRkaW5nLnNwbGl0KFwiIFwiKVxuXG5cdFx0XHRzd2l0Y2ggcGFkZGluZ1ZhbHVlcy5sZW5ndGhcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1syXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbM10pXG5cblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1syXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cblx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHBhZGRpbmcudG9wID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcucmlnaHQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5ib3R0b20gPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXG5cdFx0XHQjIFJldHVybiBhcyA0LXZhbHVlIHN0cmluZyAoZS5nIFwiMXB4IDJweCAzcHggNHB4XCIpXG5cdFx0XHRcIiN7cGFkZGluZy50b3AgKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLnJpZ2h0ICogcGl4ZWxNdWx0aXBsaWVyfXB4ICN7cGFkZGluZy5ib3R0b20gKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLmxlZnQgKiBwaXhlbE11bHRpcGxpZXJ9cHhcIlxuXHQpXG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMgPVxuXHRzaG93bjpcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIC4wMSlcIiAjIFwidHJhbnNwYXJlbnRcIiBzZWVtcyB0byBjYXVzZSBhIGJ1ZyBpbiBsYXRlc3Qgc2FmYXJpIHZlcnNpb25cblx0XHRvcHRpb25zLmZvbnRTaXplID89IDMwXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDFcblx0XHRvcHRpb25zLnBhZGRpbmcgPz0gMTBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJcIlxuXHRcdG9wdGlvbnMucGxhY2Vob2xkZXIgPz0gXCJcIlxuXHRcdG9wdGlvbnMudmlydHVhbEtleWJvYXJkID89IGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRvcHRpb25zLnR5cGUgPz0gXCJ0ZXh0XCJcblx0XHRvcHRpb25zLmdvQnV0dG9uID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvQ29ycmVjdCA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9Db21wbGV0ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9DYXBpdGFsaXplID89IFwib25cIlxuXHRcdG9wdGlvbnMuc3BlbGxDaGVjayA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9mb2N1cyA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGV4dENvbG9yID89IFwiIzAwMFwiXG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiLWFwcGxlLXN5c3RlbVwiXG5cdFx0b3B0aW9ucy5mb250V2VpZ2h0ID89IFwiNTAwXCJcblx0XHRvcHRpb25zLnN1Ym1pdCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGFiSW5kZXggPz0gMFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0IyBBZGQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXG5cdFx0QF9wcm9wZXJ0aWVzLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZVxuXHRcdEBfcHJvcGVydGllcy5saW5lSGVpZ2h0ID0gb3B0aW9ucy5saW5lSGVpZ2h0XG5cdFx0QF9wcm9wZXJ0aWVzLnBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmdcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cblx0XHQjIEFkZCBzdHlsaW5nIHRvIHRoZSBpbnB1dCBlbGVtZW50XG5cdFx0QGlucHV0LnN0eWxlLndpZHRoID0gX2lucHV0U3R5bGVbXCJ3aWR0aFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5oZWlnaHQgPSBfaW5wdXRTdHlsZVtcImhlaWdodFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5mb250U2l6ZSA9IF9pbnB1dFN0eWxlW1wiZm9udFNpemVcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUubGluZUhlaWdodCA9IF9pbnB1dFN0eWxlW1wibGluZUhlaWdodFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5vdXRsaW5lID0gXCJub25lXCJcblx0XHRAaW5wdXQuc3R5bGUuYm9yZGVyID0gXCJub25lXCJcblx0XHRAaW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAaW5wdXQuc3R5bGUucGFkZGluZyA9IF9pbnB1dFN0eWxlW1wicGFkZGluZ1wiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5mb250RmFtaWx5ID0gb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRAaW5wdXQuc3R5bGUuZm9udFdlaWdodCA9IG9wdGlvbnMuZm9udFdlaWdodFxuXG5cdFx0QGlucHV0LnZhbHVlID0gb3B0aW9ucy50ZXh0XG5cdFx0QGlucHV0LnR5cGUgPSBvcHRpb25zLnR5cGVcblx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcInRhYmluZGV4XCIsIG9wdGlvbnMudGFiaW5kZXhcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvcnJlY3RcIiwgb3B0aW9ucy5hdXRvQ29ycmVjdFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29tcGxldGVcIiwgb3B0aW9ucy5hdXRvQ29tcGxldGVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NhcGl0YWxpemVcIiwgb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgKG9wdGlvbnMuZ29CdXR0b24gJiYgIW9wdGlvbnMuc3VibWl0KSB8fCAhb3B0aW9ucy5zdWJtaXRcblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZUN5Y2xlKClcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFHQUE7QURBQSxJQUFBLDBEQUFBO0VBQUE7OztBQUFBLE9BQU8sQ0FBQyxhQUFSLEdBQTRCLElBQUEsS0FBQSxDQUMzQjtFQUFBLENBQUEsRUFBRSxDQUFGO0VBQUssQ0FBQSxFQUFFLE1BQU0sQ0FBQyxNQUFkO0VBQXNCLEtBQUEsRUFBTSxNQUFNLENBQUMsS0FBbkM7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
