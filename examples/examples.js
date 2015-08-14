// CodecDetect initializes itself automatically.


// You can obtain the different supported codecs as objects:
// - video codecs
var videoSupport = CodecDetect.getVideoSupport();
console.log('videoSupport: ', videoSupport);

// - audio codecs
var audioSupport = CodecDetect.getAudioSupport();
console.log('audioSupport: ', audioSupport);


// You can also be more granular in your use:
// - video codecs
console.log('video: is MPEG4 supported?: ' + (CodecDetect.isMPEG4VideoSupported()));
console.log('video: is H264 supported?: ' + (CodecDetect.isH264VideoSupported()));
console.log('video: is OGG supported?: ' + (CodecDetect.isOGGVideoSupported()));
console.log('video: is WEBM supported?: ' + (CodecDetect.isWEBMVideoSupported()));

// - audio codecs
console.log('audio: is MP3 supported?: ' + (CodecDetect.isMP3AudioSupported()));
console.log('audio: is AAC supported?: ' + (CodecDetect.isAACAudioSupported()));
console.log('audio: is OGG (Vorbis) supported?: ' + (CodecDetect.isOGGVorbisAudioSupported()));
console.log('audio: is OGG (Opus) supported?: ' + (CodecDetect.isOGGOpusAudioSupported()));
console.log('audio: is WEBM supported?: ' + (CodecDetect.isWEBMAudioSupported()));
console.log('audio: is Wave supported?: ' + (CodecDetect.isWaveAudioSupported()));


// As you noticed, browsers use 'probably' and 'maybe' as values for support,
// which is not ideal.
// By default, CodecDetect will return the exact value obtained when checking
// for the codec support.
console.log('exact/default check: is MP3 supported?: ' + (CodecDetect.isMP3AudioSupported()));

// However, you may wish to go a more optimistic way. This means that whenever
// the `canPlayType` method returns something that is not false,
// the value returned by a CodecDetect method will be true.
// In order to do so, simply set the method type (or mood) for CodecDetect:
CodecDetect.method = 'optimistic';
console.log('optimistic check: is MP3 supported?: ' + (CodecDetect.isMP3AudioSupported()));

// There may be moments where a more defensive or safe approach is what you prefer,
// in this case, simply set CodecDetect as such:
CodecDetect.method = 'pessimistic';
console.log('pessimistic check: is MP3 supported?: ' + (CodecDetect.isMP3AudioSupported()));


// Choose how you need to obtain your information from there.