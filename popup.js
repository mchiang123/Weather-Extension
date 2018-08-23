window.onload = function() {
	
	var lat;
	var long;

	// get user's location using geolocation
	var startPos;
	var geoOptions = {
		maximumAge: 5 * 60 * 1000,
		timeout: 10 * 1000,
	}
	var geoSuccess = function(position) {
		startPos = position;
		lat = startPos.coords.latitude;
		long = startPos.coords.longitude;

		// call getWeather function (see below)
		getWeather(lat, long);
	};
	var geoError = function(error) {
		console.log('Error occurred. Error code: ' + error.code);
		// error.code can be:
		//   0: unknown error
		//   1: permission denied
		//   2: position unavailable (error response from location provider)
		//   3: timed out
	};
	
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

	// get weather conditions in current location
	function getWeather(lat, long) {
		var API_key = "6e62c94aa3edb1a5"; // alternate API_key = "8e89558cffdf7c1a"
		var url = "http://api.wunderground.com/api/" + "8e89558cffdf7c1a" + "/geolookup/forecast/conditions/q/" + lat + "," + long + ".json";

		$(document).ready(function() {
			$.ajax({
		    // The URL for the request
		    url: url,
		    // Whether this is a POST or GET request
		    type: "GET",
		    // The type of data we expect back
		    dataType : "json",
			})
		  
			// Code to run if the request succeeds (is done);
			// the response is passed to the function
			.done(function(json) {
				// get information from json file from wunderground
				var state = json['location']['state'];
					// if json returns empty
					if (typeof(state) == 'undefined')
					{
						alert( "Sorry, the weather information is updating. We'll be back in a few moments!" );
					}
				var city = json['location']['city'];
				var img_src = json['current_observation']['icon_url'];
				var temp_f = json['current_observation']['temp_f'];
				var chancePrecipitation = json['forecast']['txt_forecast']['forecastday'][0]['pop'];
				var feelsLike = json['current_observation']['feelslike_f'];
				var humidity = json['current_observation']['relative_humidity'];
				var wind = json['current_observation']['wind_gust_mph'];
				var icon = json['current_observation']['icon'];


				// write information to html
				$('#img_src').attr("src", img_src);
				document.getElementById('city,state').innerHTML = city + ", " + state;
				document.getElementById('temperature').innerHTML = temp_f + "\xB0"
				document.getElementById('feels_like').innerHTML = "(feels like " + feelsLike + "\xB0)";
				document.getElementById('humidity').innerHTML = humidity;
				document.getElementById('CoP').innerHTML = chancePrecipitation + "%";
				document.getElementById('wind').innerHTML = wind + " mph";
			
				// variables for clothing recommendations
				var top;
				var bottom;
				var jacket;
				var str;
				var precip;
				var snow;

				// definitions of suggestion parameters
				// top layer
				if (feelsLike >= 65) {
					top = "T-shirt";
					// display icon
					$('#clothes1').attr("src", "shirt2.png");
				}
				else if (feelsLike >= 40) {
					top = "long sleeve";
					$('#clothes1').attr("src", "longsleeves.png");
				}
				else {
					top = "sweater";
					$('#clothes1').attr("src", "sweater.png");
				}
				// bottom layer
				if (feelsLike >= 65) {
					bottom = "shorts";
					$('#clothes3').attr("src", "shorts.png");
				}
				else if (feelsLike >= 30) {
					bottom = "long pants";
					$('#clothes3').attr("src", "longpants.png");
				}
				else {
					bottom = "a baselayer under your long pants";
					$('#clothes3').attr("src", "longpants.png");
				}
				// jacket
				if (feelsLike >= 70) {
					jacket = "smile";
					$('#clothes2').attr("src", "smile.png");
				}
				else if (feelsLike >= 50) {
					jacket = "light jacket";
					$('#clothes2').attr("src", "lightjacket.png");
				}
				else if (feelsLike >= 30) {
					jacket = "heavy jacket";
					$('#clothes2').attr("src", "heavyjacket.png");
				}
				else {
					jacket = "snow jacket";
					$('#clothes2').attr("src", "heavyjacket.png");
				}

				// descriptive string
				if (feelsLike >= 90) {
					str = "really hot";
				}
				else if (feelsLike >= 80) {
					str = "hot";
				}
				else if (feelsLike >= 60) {
					str = "moderate";
				}
				else if (feelsLike >= 50) {
					str = "chilly";
				}
				else if (feelsLike >= 40) {
					str = "cold";
				}
				else {
					str = "really cold";
				}

				// in the case of rain
				if (chancePrecipitation >= 80) {
					rain = "Also, bring an umbrella! ";
				}
				else {
					rain = "";
				}

				// in the case of snow
				if (icon == 'snow') {
					snow = "It's also snowing.";
				}
				else {
					snow = "";
				}
				
				// print final recommendations to html
				document.getElementById('string').innerHTML = "It's " + str + " outside. Wear a " + top + ", " + bottom + ", and a " + jacket + ". " + rain + snow;
			})
	 
			// in case of error
			.fail(function( xhr, status, errorThrown ) {
			    alert( "Sorry, there was a problem!" );
			})
		})
	};


};


