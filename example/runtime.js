console.log("[TOS] STARTING RUNTIME");

//set stuff
let firmwareWasmOpts = {
	
};
let firmwareURL = "data:application/wasm;base64,AGFzbQEAAAABDwNgAX8AYAJ/fwF/YAABfwIrAgdjb25zb2xlCGxvZ0ludDMyAAAHY29uc29sZQxwdXRDaGFyQXNjaWkAAAMDAgECBwgBBG1haW4AAwofAgcAIAAgAWoLFQBBAUECEAJBARACEABBwQAQAUEACw==";

//import apis
let finalFirmwareWasmOpts = Object.assign(firmwareWasmOpts, logAPI);

const firmwareReq = new XMLHttpRequest();
firmwareReq.open("GET", firmwareURL);
firmwareReq.responseType = "arraybuffer";
firmwareReq.send();

firmwareReq.onload = function() {
	const buffer = firmwareReq.response;
	WebAssembly.instantiate(buffer, finalFirmwareWasmOpts).then(function(e) {
		alert(e.instance.exports.main());
	});
};

console.log("[TOS] RUNTIME LOADED!");