# ABE Payload Loader (4.0.0-pre0.1)
## LICENCE
This project is distributed under the GPLv3 or above licence. See COPYING.txt for more details.

## NOTICE!
This product is in VERY early development! Theres a good chance that the API will change.

## Usage:
1. Clone this project and open index.html.
2. Go down to Preferences.JSON and paste the JSON containing the machines preferences (a test machine can be found in tos/options.json)
3. Press SAVE and start the machine.
4. Profit.

Also, place a png called `bg.png` into the extras folder to set a background.

## How to make a custom machine:
NOTE: See notice at the top of the page!
This is mostly just for messing around and testing things until the API is finished.
1. Make an options.json file. This contains the options needed to boot the machine. (see #Options.json)
2. Create a runtime script (runtime.js). This is loaded inside the machines popup. (window.parsedPrefs contains preferences JSObject)
3. Set up runtime.js to load whatever you need. (see tos/runtime.js for a wasm loading example)
5. Load it up with the steps in #Usage.
4. Profit. (until a few update were everything changes :skull:)

## Options.json
As of right now, its just the minimum to do things:
```
{
	"win": {
		"title": "NAME OF WINDOW",
		"width": interger,
		"height": interger,
		"icon": "URL TO PNG ICON FOR WINDOW",
		"defaultBackground": "CSS BACKGROUND COLOR",
		"defaultCSS": boolean (sets some basic css stuff up. look in pl.js)
	},
	"runtimeURL": "URL TO RUNTIME"
}
```