/* --- CONSTANTS --- */

var GOOGLE_ANALYTICS_ID = "UA-35968025-1";

var HTML_TAG_SUPPORT = "HTML tag support";
var VIDEO_CODEC_SUPPORT = "Video codec support";
var AUDIO_CODEC_SUPPORT = "Audio codec support";


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
var audioAACTile;
var audioOGGVorbisTile;
var audioOGGOpusTile;
var audioWEBMTile;
var audioWaveTile;

var audioMP3Label;
var audioAACLabel;
var audioOGGVorbisLabel;
var audioOGGOpusLabel;
var audioWEBMLabel;
var audioWaveLabel;

var isMP3AudioSupported;
var isAACAudioSupported;
var isOGGVorbisAudioSupported;
var isOGGOpusAudioSupported;
var isWEBMAudioSupported;
var isWaveAudioSupported;

var audio;


var sendDetailsForm;
var yourName;
var yourEmail;
var recipientsEmail;
var sendDetailsButton;
var sendDetailsConfirmation;
var sendDetailsError;


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


function trackEvent(categories, actions, labels)
{
	// reference: https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
	if(isTrackingEnabled)
	{
		analytics.push	(	[
								"_trackEvent", 
								categories, 
								actions, 
								labels
							]
						);
	}
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
	sendDetailsForm = $("#sendDetailsForm");
	yourName = $("#yourName");
	yourEmail = $("#yourEmail");
	recipientsEmail = $("#recipientsEmail");
	sendDetailsButton = $("#sendDetailsButton");
	sendDetailsButton.on("click", onSendClicked);
	sendDetailsConfirmation = $("#sendDetailsConfirmation");
	sendDetailsError = $("#sendDetailsError");
}


function detectVideoSupport()
{
	// create a video element to use for testing
	video = document.createElement("video");
	
	if(video)
	{
		// get supported video codecs
		isMPEG4VideoSupported = video.canPlayType('video/mp4; codecs="mp4v.20.8"');
		isH264VideoSupported = video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
		isOGGVideoSupported = video.canPlayType('video/ogg; codecs="theora"');
		isWEBMVideoSupported = video.canPlayType('video/webm; codecs="vp8, vorbis"');
		
		// tracking
		trackEvent(HTML_TAG_SUPPORT, "Video tag supported", true);
		trackEvent(VIDEO_CODEC_SUPPORT, "MPEG4", isMPEG4VideoSupported !== "" );
		trackEvent(VIDEO_CODEC_SUPPORT, "H264", isH264VideoSupported !== "" );
		trackEvent(VIDEO_CODEC_SUPPORT, "OGG", isOGGVideoSupported !== "" );
		trackEvent(VIDEO_CODEC_SUPPORT, "WEBM", isWEBMVideoSupported !== "" );
		
		// display what is supported
		var value;

		value = (isMPEG4VideoSupported === "" ? "not" : isMPEG4VideoSupported);
		videoMPEG4Label.text( "MPEG4 " + value + " supported" );
		videoMPEG4Tile.addClass( value );
		
		value = (isH264VideoSupported === "" ? "not" : isH264VideoSupported);
		videoH264Label.text( "H.264 " + value + " supported" );
		videoH264Tile.addClass( value );
		
		value = (isOGGVideoSupported === "" ? "not" : isOGGVideoSupported);
		videoOGGLabel.text( "Ogg " + value + " supported" );
		videoOGGTile.addClass( value );
		
		value = (isWEBMVideoSupported === "" ? "not" : isWEBMVideoSupported);
		videoWEBMLabel.text( "WebM " + value + " supported" );
		videoWEBMTile.addClass( value );
	}
	else
	{
		videoCodecTiles.css("display", "none");
		videoNotSupported.css("display", "block");
		
		// tracking
		trackEvent(HTML_TAG_SUPPORT, "Video tag supported", false);
	}
}


function detectAudioSupport()
{
	// create a audio element to use for testing
	audio = document.createElement("audio");
	
	if(audio)
	{
		isMP3AudioSupported = audio.canPlayType('audio/mpeg');
		isAACAudioSupported = audio.canPlayType('audio/mp4; codecs="mp4a.40.2"');
		isOGGVorbisAudioSupported = audio.canPlayType('audio/ogg; codecs="vorbis"');
		isOGGOpusAudioSupported = audio.canPlayType('audio/ogg; codecs="opus"');
		isWEBMAudioSupported = audio.canPlayType('audio/webm; codecs="vorbis"');
		isWaveAudioSupported = audio.canPlayType('audio/wav; codecs="1"');
		
		// tracking
		trackEvent(HTML_TAG_SUPPORT, "Audio tag supported", true );
		trackEvent(AUDIO_CODEC_SUPPORT, "MP3", isMP3AudioSupported !== "" );
		trackEvent(AUDIO_CODEC_SUPPORT, "AAC", isAACAudioSupported !== "" );
		trackEvent(AUDIO_CODEC_SUPPORT, "OGG (Vorbis)", isOGGVorbisAudioSupported !== "" );
		trackEvent(AUDIO_CODEC_SUPPORT, "OGG (Opus)", isOGGOpusAudioSupported !== "" );
		trackEvent(AUDIO_CODEC_SUPPORT, "WEBM", isWEBMAudioSupported !== "" );
		trackEvent(AUDIO_CODEC_SUPPORT, "Wave", isWaveAudioSupported !== "" );

		// display what is supported
		var value;

		value = (isMP3AudioSupported === "" ? "not" : isMP3AudioSupported);
		audioMP3Label.text( "MP3 " + value + " supported" );
		audioMP3Tile.addClass( value );
		
		value = (isAACAudioSupported === "" ? "not" : isAACAudioSupported);
		audioAACLabel.text( "MP4 (AAC) " + value + " supported" );
		audioAACTile.addClass( value );
		
		value = (isWEBMAudioSupported === "" ? "not" : isWEBMAudioSupported);
		audioWEBMLabel.text( "WebM " + value + " supported" );
		audioWEBMTile.addClass( value );
		
		value = (isOGGVorbisAudioSupported === "" ? "not" : isOGGVorbisAudioSupported);
		audioOGGVorbisLabel.text( "Ogg (Vorbis) " + value + " supported" );
		audioOGGVorbisTile.addClass( value );
		
		value = (isOGGOpusAudioSupported === "" ? "not" : isOGGOpusAudioSupported);
		audioOGGOpusLabel.text( "Ogg (Opus) " + value + " supported" );
		audioOGGOpusTile.addClass( value );
		
		value = (isWaveAudioSupported === "" ? "not" : isWaveAudioSupported);
		audioWaveLabel.text( "Wave " + value + " supported" );
		audioWaveTile.addClass( value );
	}
	else
	{
		audioCodecTiles.css("display", "none");
		audioNotSupported.css("display", "block");
		
		// tracking
		trackEvent(HTML_TAG_SUPPORT, "Audio tag supported", false );
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
				var duration = 375;
				var targetOpacity = 0
				if(data == "success")
				{
					sendDetailsForm.fadeTo	(	duration,
												targetOpacity,
												onFormHiddenForSuccess
											);
				}
				else
				{
					sendDetailsForm.fadeTo	(	duration,
												targetOpacity,
												onFormHiddenForError
											);
				}
			}
		}
	);
	}
}


function onFormHiddenForSuccess()
{
	trackEvent("Email", "Success", "Success");
	
	sendDetailsForm.css("display", "none");
	sendDetailsConfirmation.css("display", "block");
	sendDetailsConfirmation.fadeTo(575, 1);
}


function onFormHiddenForError()
{
	trackEvent("Email", "Error", "Error");
	
	sendDetailsForm.css("display", "none");
	sendDetailsError.css("display", "block");
	sendDetailsError.fadeTo(575, 1);
}