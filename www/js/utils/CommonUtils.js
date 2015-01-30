// angular.module('com.tts.App')

/**
 * Converts an image to
 * a base64 string.
 * 
 * If you want to use the 
 * outputFormat or quality param
 * I strongly recommend you read the docs 
 * @ mozilla for `canvas.toDataURL()`
 * 
 * @param 	{String} 	url
 * @param 	{Function}	callback
 * @param 	{String}	[outputFormat='image/png']
 * @param 	{Float}   	[quality=0.0 to 1.0]
 * @url 	https://gist.github.com/HaNdTriX/7704632/
 * @docs 	https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Methods
 * @author 	HaNdTriX
 * @example
 * 			imgToDataURL('http://goo.gl/AOxHAL', function(err, base64Img){
 * 				console.log('IMAGE:',base64Img);
 * 			})
 */
App.factory('commonUtils', function(){
	var service = {};

	service.convertImgToBase64 = function(url, callback, outputFormat, quality){
		var canvas = document.createElement('CANVAS'),
		ctx = canvas.getContext('2d'),
		img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function() {
			var dataURL;
			canvas.height = img.height;
			canvas.width = img.width;
			try {
				ctx.drawImage(img, 0, 0);
				dataURL = canvas.toDataURL(outputFormat || 'image/jpg', quality || 1);
				callback(null, dataURL);
			} catch (e) {
				callback(e, null);
			}
			canvas = img = null;
		};
		img.onerror = function() {
			callback(new Error('Could not load image'), null);
		};
		img.src = url;
	};

	service.imgToBase64Str = function(url, outputFormat, quality) {
		service.convertImgToBase64(url, function(err, base64Img){
			// if(err == null){
				return base64Img;
			// }else{
			// 	return err;
			// }
		}, outputFormat, quality);	
	};

	return service;
});