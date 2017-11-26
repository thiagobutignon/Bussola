# Import file "legalhack-app-bussola-total"
sketch = Framer.Importer.load("imported/legalhack-app-bussola-total@2x", scale: 1)


StatusBarLayer = require "statusbarlayer/StatusBarLayer"
# Import file "legalhack-app-bussola-total (2)"

InputModule = require "input-framer/input"
# Import file "legalhack-app-bussola-total"

# Import file "legalhack-app-bussola-total"

myStatusBar = new StatusBarLayer
	# iOS version
	version: 11
	
	# Text
	carrier: "Vivo"
	percent: 100
	
	# Show or hide status items
	signal: true
	wifi: true
	powered: false
	showPercentage: true
	# Colors
	style: "light"


flow = new FlowComponent
flow.showNext(sketch.TA)
sketch.TA.onSwipe ->
	flow.showNext(sketch.TB)
	
sketch.TB.onSwipe ->
	flow.showNext(sketch.TC)

sketch.PB.onClick ->
	flow.showOverlayRight(sketch.TD, animate: true)  
sketch.PH.onClick ->
	flow.showOverlayRight(sketch.TD, animate: true)
sketch.PO.onClick ->
	flow.showOverlayRight(sketch.TD, animate: true)
sketch.PP.onClick ->
	flow.showOverlayRight(sketch.TD, animate: true)
sketch.PC.onClick ->
	flow.showOverlayRight(sketch.TD, animate: true)
sketch.PI.onClick ->
	flow.showOverlayRight(sketch.TD, animate: true)

sketch.PPPP_A.onClick ->
	flow.showNext(sketch.TE)
sketch.PP_D.onClick ->
	flow.showNext(sketch.TG)
# sketch.PP_Z.onClick ->
# 	flow.showNext(sketch.)

input = new InputModule.Input
  setup: false # Change to true when positioning the input so you can see it
  virtualKeyboard: false # Enable or disable virtual keyboard for when viewing on computer
  placeholder: "Busque por termos" # Text visible before the user type
  placeholderColor: "#fff" # Color of the placeholder text
  text: "" # Initial text in the input
  textColor: "#FFF" # Color of the input text
  type: "text" # Use any of the available HTML input types. Take into account that on the computer the same keyboard image will appear regarding the type used.
  backgroundColor: "transparent" # e.g. "#ffffff" or "blue"
  fontSize: 19 # Size in px
  fontFamily: "-apple-system" # Font family for placeholder and input text
  fontWeight: "500" # Font weight for placeholder and input text
  lineHeight: 1 # Line height in em
  tabIndex: 5 # Tab index for the input (default is 0)
  padding: 10 # Padding in px, multiple values are also supported via string, e.g. "10 5 16 2"
  autofocus: false # Change to true to enable autofocus
  goButton: false # Set true here in order to use "Go" instead of "Return" as button (only works on real devices)
  submit: false # Change to true if you want to enable form submission
  y: 205 # y position
  x: 90  # x position
  width: 500
  height: 50
  parent: sketch.TD
 
 home = new Layer
  parent: sketch.TE
  x: Align.center
  y: 440
  backgroundColor: "transparent"
  height: 70
  width: 300

home.onClick ->
 flow.showNext(sketch.TF)
  
sketch.PP_Z.onClick ->
	flow.showNext(sketch.TH)

sketch.PPP_S.onClick ->
	trans = new Layer
		parent: sketch.TH
		y: Align.center
		x: Align.center
		height: 736
		width: 414
	popUp = new Layer
		parent: sketch.TH
		y: Align.center
		x: Align.center
		height: 200
		width: 300
		backgroundColor: "#FFF"
	textopop = new TextLayer
		parent: popUp
		text: "Fazer Upgrade"
		fontSize: 20
		color: "#000"
		x: Align.center
		y: 16
	textopop = new TextLayer
		parent: popUp
		text: "Fazer Upgrade"
		fontSize: 16
		color: "#000"
		x: Align.center
		y: 50
		text: "Você está pagando R$1,00 pelo acesso antecipado"
		width: 200
		textAlign: "center"
	
	bottonConfirmar = new TextLayer
		parent: popUp
		text: "Fazer Upgrade"
		fontSize: 16
		color: "#007AFF"
		x: Align.center
		y: Align.bottom
		text: "Confirmar"
		width: 200
		height: 40
		textAlign: "center"
	bottonConfirmar.onClick ->
		flow.showOverlayLeft(sketch.TD)

	
	

	