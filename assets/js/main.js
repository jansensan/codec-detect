/* --- CONSTANTS --- */

var GOOGLE_ANALYTICS_ID = "UA-35968025-1";


/* --- VARIABLES --- */

var videoNotSupported;
var videoCodecTiles;

var videoMPEG4Label;
var videoH264Tile;
var videoOGGTile;
var videoWEBMTile;

var videoMPEG4Label;
var videoH264Label;
var videoOGGLabel;
var videoWEBMLabel;

var isMPEG4VideoSupported;
var isH264VideoSupported;
var isOGGVideoSupported;
var isWEBMVideoSupported;

var video;


var audioNotSupported;
var audioCodecTiles;

var audioMP3Tile;
var audioMP4Tile;
var audioAACTile;
var audioOGGVorbisTile;
var audioOGGOpusTile;
var audioWEBMTile;
var audioWaveTile;

var audioMP3Label;
var audioMP4Label;
var audioAACLabel;
var audioOGGVorbisLabel;
var audioOGGOpusLabel;
var audioWEBMLabel;
var audioWaveLabel;

var isMP3AudioSupported;
var isMP4AudioSupported;
var isAACAudioSupported;
var isOGGVorbisAudioSupported;
var isOGGOpusAudioSupported;
var isWEBMAudioSupported;
var isWaveAudioSupported;

var audio;


var yourName;
var yourEmail;
var recipientsEmail;
var sendDetailsButton;


var isTrackingEnabled = true;	// set to false while debugging
var analytics;


/* --- METHODS --- */

function initCodecDetect()
{
	initGoogleAnalyticsTracker();
	getDOMElements();
	detectVideoSupport();
	detectAudioSupport();
}


function initGoogleAnalyticsTracker()
{
	if(isTrackingEnabled)
	{
		analytics = [['_setAccount', GOOGLE_ANALYTICS_ID], ['_trackPageview']];
		(function(d, t)
		{
			var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
			g.src = ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js';
			s.parentNode.insertBefore(g, s)
		}(document, 'script'));
	}
}


function addAnalyticsVariable(name, value)
{
	// reference: https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingCustomVariables#sessionLevel
	if(isTrackingEnabled)
	{
		analytics.push	(	[
								"_setCustomVar",
								name,
								value,
								2
							]
						);
	}
}


function trackEvent(name)
{
	
}


function getDOMElements()
{
	// video tiles
	videoCodecTiles = $("#videoCodecTiles");
	videoNotSupported = $("#videoNotSupported");
	
	videoMPEG4Tile = $("#videoMPEG4Tile");
	videoH264Tile = $("#videoH264Tile");
	videoOGGTile = $("#videoOGGTile");
	videoWEBMTile = $("#videoWEBMTile");
	
	videoMPEG4Label = $("#videoMPEG4Label");
	videoH264Label = $("#videoH264Label");
	videoOGGLabel = $("#videoOGGLabel");
	videoWEBMLabel = $("#videoWEBMLabel");
	
	// audio tiles
	audioCodecTiles = $("#audioCodecTiles");
	audioNotSupported = $("#audioNotSupported");
	
	audioMP3Tile = $("#audioMP3Tile");
	audioMP4Tile = $("#audioMP4Tile");
	audioAACTile = $("#audioAACTile");
	audioOGGVorbisTile = $("#audioOGGVorbisTile");
	audioOGGOpusTile = $("#audioOGGOpusTile");
	audioWEBMTile = $("#audioWEBMTile");
	audioWaveTile = $("#audioWaveTile");
	
	audioMP3Label = $("#audioMP3Label");
	audioMP4Label = $("#audioMP4Label");
	audioAACLabel = $("#audioAACLabel");
	audioOGGVorbisLabel = $("#audioOGGVorbisLabel");
	audioOGGOpusLabel = $("#audioOGGOpusLabel");
	audioWEBMLabel = $("#audioWEBMLabel");
	audioWaveLabel = $("#audioWaveLabel");
	
	// send inputs and button
	yourName = $("#yourName");
	yourEmail = $("#yourEmail");
	recipientsEmail = $("#recipientsEmail");
	sendDetailsButton = $("#sendDetailsButton");
	sendDetailsButton.on("click", onSendClicked);
}


function detectVideoSupport()
{
	// create a video element to use for testing
	video = document.createElement("video");
	
	if(video)
	{
		// get supported video codecs
		isMPEG4VideoSupported = "" !== video.canPlayType('video/mp4; codecs="mp4v.20.8"');
		isH264VideoSupported = "" !== (video.canPlayType('video/mp4; codecs="avc1.42E01E"') || video.canPlayType( 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
		isOGGVideoSupported = "" !== video.canPlayType('video/ogg; codecs="theora"');
		isWEBMVideoSupported = "" !== video.canPlayType('video/webm; codecs="vp8, vorbis"');
		
		// tracking
		addAnalyticsVariable("Video tag supported", true);
		addAnalyticsVariable("Video codec: MPEG4 supported", isMPEG4VideoSupported);
		addAnalyticsVariable("Video codec: H264 supported", isH264VideoSupported);
		addAnalyticsVariable("Video codec: OGG supported", isOGGVideoSupported);
		addAnalyticsVariable("Video codec: WEBM supported", isWEBMVideoSupported);
		
		// display what is supported
		var label;
		var cssClass;
		
		label = (isMPEG4VideoSupported) ? "MPEG4 supported" : "MPEG4 not supported";
		cssClass = (isMPEG4VideoSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		videoMPEG4Label.text(label);
		videoMPEG4Tile.addClass(cssClass);
		
		label = (isH264VideoSupported) ? "H264 supported" : "H264 not supported";
		cssClass = (isH264VideoSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		videoH264Label.text(label);
		videoH264Tile.addClass(cssClass);
		
		label = (isOGGVideoSupported) ? "OGG supported" : "OGG not supported";
		cssClass = (isOGGVideoSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		videoOGGLabel.text(label);
		videoOGGTile.addClass(cssClass);
		
		label = (isWEBMVideoSupported) ? "WEBM supported" : "WEBM not supported";
		cssClass = (isWEBMVideoSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		videoWEBMLabel.text(label);
		videoWEBMTile.addClass(cssClass);
	}
	else
	{
		videoCodecTiles.css("display", "none");
		videoNotSupported.css("display", "block");
		
		// tracking
		addAnalyticsVariable("Video tag supported", false);
	}
}


function detectAudioSupport()
{
	// create a audio element to use for testing
	audio = document.createElement("audio");
	
	if(audio)
	{
		// get supported video codecs
		isMP3AudioSupported = "" !== audio.canPlayType('audio/mp3; codecs="mpeg 4, mp3"');
		isMP4AudioSupported = "" !== audio.canPlayType('audio/mp4; codecs="m4a"');
		isAACAudioSupported = "" !== audio.canPlayType('audio/aac; codecs="mpeg 4, aac"');
		isOGGVorbisAudioSupported = "" !== audio.canPlayType('audio/ogg; codecs="vorbis"');
		isOGGOpusAudioSupported = "" !== audio.canPlayType('audio/ogg; codecs="opus"');
		isWEBMAudioSupported = "" !== audio.canPlayType('audio/webm; codecs="vorbis"');
		isWaveAudioSupported = "" !== audio.canPlayType('audio/wave; codecs="wave, pcm"');
		
		// tracking
		addAnalyticsVariable("Audio tag supported", true);
		addAnalyticsVariable("Audio codec: MP3 supported", isMP3AudioSupported);
		addAnalyticsVariable("Audio codec: H264 supported", isMP4AudioSupported);
		addAnalyticsVariable("Audio codec: AAC supported", isAACAudioSupported);
		addAnalyticsVariable("Audio codec: OGG (Vorbis) supported", isOGGVorbisAudioSupported);
		addAnalyticsVariable("Audio codec: OGG (Opus) supported", isOGGOpusAudioSupported);
		addAnalyticsVariable("Audio codec: WEBM supported", isWEBMAudioSupported);
		addAnalyticsVariable("Audio codec: Wave supported", isWaveAudioSupported);
		
		// display what is supported
		var label;
		var cssClass;
		
		label = (isMP3AudioSupported) ? "MP3 supported" : "MP3 not supported";
		cssClass = (isMP3AudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioMP3Label.text(label);
		audioMP3Tile.addClass(cssClass);
		
		label = (isMP4AudioSupported) ? "MP4 supported" : "MP4 not supported";
		cssClass = (isMP4AudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioMP4Label.text(label);
		audioMP4Tile.addClass(cssClass);
		
		label = (isAACAudioSupported) ? "AAC supported" : "AAC not supported";
		cssClass = (isAACAudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioAACLabel.text(label);
		audioAACTile.addClass(cssClass);
		
		label = (isWEBMAudioSupported) ? "WEBM supported" : "WEBM  not supported";
		cssClass = (isWEBMAudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioWEBMLabel.text(label);
		audioWEBMTile.addClass(cssClass);
		
		label = (isOGGVorbisAudioSupported) ? "OGG (Vorbis) supported" : "OGG (Vorbis) not supported";
		cssClass = (isOGGVorbisAudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioOGGVorbisLabel.text(label);
		audioOGGVorbisTile.addClass(cssClass);
		
		label = (isOGGOpusAudioSupported) ? "OGG (Opus) supported" : "OGG (Opus) not supported";
		cssClass = (isOGGOpusAudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioOGGOpusLabel.text(label);
		audioOGGOpusTile.addClass(cssClass);
		
		label = (isWaveAudioSupported) ? "Wave supported" : "Wave not supported";
		cssClass = (isWaveAudioSupported) ? "supportedCodecTile" : "unsupportedCodecTile";
		audioWaveLabel.text(label);
		audioWaveTile.addClass(cssClass);
	}
	else
	{
		audioCodecTiles.css("display", "none");
		audioNotSupported.css("display", "block");
		
		// tracking
		addAnalyticsVariable("Audio tag supported", true);
	}
}


function validateEmail(email)
{
	var regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regexp.test(email);
}


function getEmailBody()
{
	var body = "";
	
	if(video)
	{
		body += "<strong>Supported video codecs</strong>";
		body += "<ul>";
		body += "<li>" + videoMPEG4Label.text() + "</li>";
		body += "<li>" + videoH264Label.text() + "</li>";
		body += "<li>" + videoOGGLabel.text() + "</li>";
		body += "<li>" + videoWEBMLabel.text() + "</li>";
		body += "</ul>";
	}
	else
	{
		body += '<strong><p>HTML <a href="http://www.w3schools.com/tags/tag_video.asp" target="_blank">video</a> tag not supported</p></strong>';
	}
	body += "<br/>";
	
	if(audio)
	{
		body += "<strong>Supported audio codecs</strong>";
		body += "<ul>";
		body += "<li>" + audioMP3Label.text() + "</li>";
		body += "<li>" + audioMP4Label.text() + "</li>";
		body += "<li>" + audioAACLabel.text() + "</li>";
		body += "<li>" + audioWEBMLabel.text() + "</li>";
		body += "<li>" + audioOGGVorbisLabel.text() + "</li>";
		body += "<li>" + audioOGGOpusLabel.text() + "</li>";
		body += "<li>" + audioWaveLabel.text() + "</li>";
		body += "</ul>";
	}
	else
	{
		body += '<strong><p>HTML <a href="http://www.w3schools.com/tags/tag_audio.asp" target="_blank">audio</a> tag not supported</p></strong>';
	}
	body += "<br/>";
	
	body += "<strong>Browser technical details</strong>";
	body += "<ul>";
	body += "<li>App Name: " + navigator.appName + "</li>";
	body += "<li>App Code Name: " + navigator.appCodeName + "</li>";
	body += "<li>App Version: " + navigator.appVersion + "</li>";
	body += "<li>User Agent: " + navigator.userAgent + "</li>";
	body += "<li>Platform: " + navigator.platform + "</li>";
	body += "</ul>";
	
	return body;
}


/* --- event handlers --- */

function onSendClicked(_)
{
	var isYourEmailValid = validateEmail(yourEmail.val());
	var isRecipientsEmailValid = validateEmail(recipientsEmail.val());
	
	var shouldAlert = false;
	var message;
	if(!isYourEmailValid && !isRecipientsEmailValid)
	{
		shouldAlert = true;
		message = "Neither yours nor the recipient's email is not valid. Please verify and try again.";
	}
	else if(!isYourEmailValid)
	{
		shouldAlert = true;
		message = "Your email is not valid. Please verify and try again.";
	}
	else if(!isRecipientsEmailValid)
	{
		shouldAlert = true;
		message = "The recipient's email is not valid. Please verify and try again.";
	}
	
	if(shouldAlert)
	{
		alert(message);
	}
	else
	{
		var url = "assets/php/email-details.php";
		url += "?yourName=" + escape(yourName.val());
		url += "&yourEmail=" + escape(yourEmail.val());
		url += "&recipientsEmail=" + escape(recipientsEmail.val());
		url += "&body=" + escape(getEmailBody());
		
		$.ajax(
		{
			url: url,
			success: function(data)
			{
				if(data == "success")
				{
					console.log("email sent");
				}
				else
				{
					console.log("error happened");
				}
			}
		}
	);
	}
}