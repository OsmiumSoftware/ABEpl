/*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	pl.js
	ABE Payload Loader (4.0.0-pre0.1)
	
	Copyright 2024 OsmiumSoftware
    Licenced under GNU LGPL-3.0-or-later
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of ABEpl.

    ABEpl is free software: you can redistribute it and/or modify it under
    the terms of the GNU General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option) 
    any later version.

    ABEpl is distributed in the hope that it will be useful, but WITHOUT ANY 
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS 
    FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along 
    with ABEpl. If not, see <https://www.gnu.org/licenses/>.
*/
console.log("[ABEpl4] Script Loading Started");

const map = {
	startMachine: document.getElementById("machine_start"),
	help: {
		readme: document.getElementById("popup_readme"),
		license: document.getElementById("popup_license")
	},
	preferences: {
		JSON: {
			input: document.getElementById("json_preferences"),
			save: document.getElementById("save_json_preferences"),
			load: document.getElementById("load_json_preferences"),
			purge: document.getElementById("purge_json_preferences"),
			minify: document.getElementById("minify_json_preferences"),
			status: document.getElementById("status_json_preferences")
		}
	}
};

function getValueFromTextInput(input) {
	return input.value === "" ? (input.placeholder === "" ? "" : input.placeholder) : input.value;
}

//ABEPOPUP
function popup(title, width, height, icon="about:blank", x=0, y=0, url="about:blank") {
	var win = window.open(url, "_blank", "popup,width=" + width + ",height=" + height + ",top=" + y + ",left=" + x);
	win.document.title = title;
	let favicon = win.document.createElement("link");
	favicon.setAttribute("rel", "icon");
	favicon.setAttribute("href", icon);
	favicon.setAttribute("id", "favicon");
	win.document.getElementsByTagName('head')[0].appendChild(favicon);
	return win;
}

function abCloak(win, url) {
	//clean up css
	win.document.body.style.margin = '0';
	win.document.body.style.height = '100vh';
	
	//AB CLOAK :>
	let iframe = document.createElement("iframe");
	
	iframe.style.border = 'none';
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.margin = '0';
	
	iframe.src = url;
	win.document.body.appendChild(iframe);
	return win;
}

function changeFileNameFromFullURL(newFileName) {
	return (window.location.origin + window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/'))) + newFileName;
}

//popup README
map.help.readme.addEventListener("click", function() {
	console.log(`[ABEpl4 - Help] Opening README.MD`);
	let win = popup("ABEpl Readme", 600, 400);
	abCloak(win, changeFileNameFromFullURL("/README.md"));
});

//popup license
map.help.license.addEventListener("click", function() {
	console.log(`[ABEpl4 - Help] Opening LICENSE.TXT`);
	let win = popup("GNU GPLv3", 600, 400);
	abCloak(win, changeFileNameFromFullURL("/COPYING.txt"));
});

//JSON preference input controls
map.preferences.JSON.save.addEventListener("click", function() {
	const val = getValueFromTextInput(map.preferences.JSON.input);
	console.log(`[ABEpl4 - Preferences] Saving JSON Preferences to localstorage <JSONPREF = "${val}">`);
	localStorage.setItem("JSONPREF", val);
	map.preferences.JSON.status.innerText = "SAVED TO QUICKSTORE! (READY TO BOOT)";
	map.preferences.JSON.status.style.color = "lime";
});

map.preferences.JSON.load.addEventListener("click", function() {
	console.log(`[ABEpl4 - Preferences] Loading JSON Preferences from localstorage <JSONPREF>`);
	map.preferences.JSON.input.value = localStorage.getItem("JSONPREF");
	map.preferences.JSON.status.innerText = "LOADED FROM QUICKSTORE!";
	map.preferences.JSON.status.style.color = "darkblue";
});

map.preferences.JSON.purge.addEventListener("click", function() {
	const val = getValueFromTextInput(map.preferences.JSON.input);
	console.log(`[ABEpl4 - Preferences] Purging JSON Preferences from localstorage <JSONPREF>`);
	localStorage.removeItem("JSONPREF", val);
	map.preferences.JSON.status.innerText = "PURGED QUICKSTORE!";
	map.preferences.JSON.status.style.color = "darkred";
});

map.preferences.JSON.minify.addEventListener("click", function() {
	const val = getValueFromTextInput(map.preferences.JSON.input);
	console.log(`[ABEpl4 - Preferences] Minifying JSON Preferences from input. DONT FORGET TO CLICK <SAVE>!!!`);
	map.preferences.JSON.input.value = JSON.stringify(JSON.parse(val));
	map.preferences.JSON.status.innerText = "INPUT MINIFIED! (DONT FORGET TO SAVE)";
	map.preferences.JSON.status.style.color = "yellow";
});

//starting machine
map.startMachine.addEventListener("click", function() {
	let jsonPrefs = localStorage.getItem("JSONPREF");
	let parsedPrefs = JSON.parse(jsonPrefs);

	console.log("[ABEpl4] Loading machine with prefs: ", parsedPrefs)

	//creating popup and setting defaults based on prefs
	let win = popup(parsedPrefs.win && parsedPrefs.win.title ? parsedPrefs.win.title : "Web Machine [ABEpl]",
		parsedPrefs.win && parsedPrefs.win.width ? parsedPrefs.win.width : 600, 
		parsedPrefs.win && parsedPrefs.win.height ? parsedPrefs.win.height : 400,
		parsedPrefs.win && parsedPrefs.win.icon ? parsedPrefs.win.icon : "about:blank",
		parsedPrefs.win && parsedPrefs.win.x ? parsedPrefs.win.x : 0,
		parsedPrefs.win && parsedPrefs.win.y ? parsedPrefs.win.y : 0
		);
	win.document.body.style.backgroundColor = parsedPrefs.win && parsedPrefs.win.defaultBackground ? parsedPrefs.win.defaultBackground : "white";

	if (parsedPrefs.win && parsedPrefs.win.defaultCSS) {
		win.document.body.style.backgroundColor = "black";
		win.document.body.style.color = "white";
		win.document.body.style.fontFamily = "Monospace";
		win.document.body.style.margin = '0';
		win.document.body.style.height = '100vh';
	}
	
	//runs before payload script
	let abeScript = document.createElement("script");
	abeScript.innerText = `\
		console.log("[ABEpl4] Running preload script"); \
		let parsedPrefs = ${jsonPrefs}; \
		console.log("[ABEpl4] preload script finished!"); \
		\
		let logAPI = { \
			console: { \
				logInt32: function(value) { \
					console.log("[ABE Log API] int32: " + value); \
				}, \
				putCharAscii: function(value) { \
					console.log("[ABE Log API] ascii char: " + String.fromCharCode(value)); \
				} \
			} \
		}; \
	`;
	console.log(abeScript);
	win.document.body.appendChild(abeScript);
	
	//payload runtime
	let payloadScript = document.createElement("script");
	payloadScript.src = parsedPrefs.runtimeURL ? parsedPrefs.runtimeURL : "";
	win.document.body.appendChild(payloadScript);
});

console.log("[ABEpl4] Script LOADED!");
console.log("[ABEpl4] DocMap: ", map);