var CodecDetect = CodecDetect || (function CodecDetectIIFE() {

  // constants
  var Support = {
    PENDING: 'pending',
    PROBABLY: 'probably',
    MAYBE: 'maybe'
  };
  var Method = {
    OPTIMISTIC: 'optimistic',
    PESSIMISTIC: 'pessimistic',
    EXACT: 'exact'
  };

  // vars
  var _video;
  var _videoSupport = {
    mpeg4: Support.PENDING,
    h264: Support.PENDING,
    ogg: Support.PENDING,
    webm: Support.PENDING
  };
  var _audio;
  var _audioSupport = {
    mp3: Support.PENDING,
    aac: Support.PENDING,
    oggVorbis: Support.PENDING,
    oggOpus: Support.PENDING,
    webm: Support.PENDING,
    wave: Support.PENDING
  };

  // public api
  var cd = {
    // constants
    VERSION: '1.1.3',
    // properties
    method: Method.EXACT,
    // video methods
    getVideoSupport: getVideoSupport,
    isMPEG4VideoSupported: isMPEG4VideoSupported,
    isH264VideoSupported: isH264VideoSupported,
    isOGGVideoSupported: isOGGVideoSupported,
    isWEBMVideoSupported: isWEBMVideoSupported,
    // audio methods
    getAudioSupport: getAudioSupport,
    isMP3AudioSupported: isMP3AudioSupported,
    isAACAudioSupported: isAACAudioSupported,
    isOGGVorbisAudioSupported: isOGGVorbisAudioSupported,
    isOGGOpusAudioSupported: isOGGOpusAudioSupported,
    isWEBMAudioSupported: isWEBMAudioSupported,
    isWaveAudioSupported: isWaveAudioSupported
  };

  // auto initialization
  init();

  // return public api
  return cd;

  // private methods
  function init() {
    detectVideoSupport();
    detectAudioSupport();
  }

  function getVideoSupport() {
    return _videoSupport;
  }

  function isMPEG4VideoSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _videoSupport.mpeg4 !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _videoSupport.mpeg4 === true;
        break;

      default:
        isSupported = _videoSupport.mpeg4;
        break;
    }
    return isSupported;
  }

  function isH264VideoSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _videoSupport.h264 !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _videoSupport.h264 === true;
        break;

      default:
        isSupported = _videoSupport.h264;
        break;
    }
    return isSupported;
  }

  function isOGGVideoSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _videoSupport.ogg !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _videoSupport.ogg === true;
        break;

      default:
        isSupported = _videoSupport.ogg;
        break;
    }
    return isSupported;
  }

  function isWEBMVideoSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _videoSupport.webm !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _videoSupport.webm === true;
        break;

      default:
        isSupported = _videoSupport.webm;
        break;
    }
    return isSupported;
  }

  function detectVideoSupport() {
    // create a video element to use for testing
    _video = document.createElement('video');

    // get supported video codecs
    if (_video) {
      _videoSupport.mpeg4 = _video.canPlayType('video/mp4; codecs="mp4v.20.8"');
      _videoSupport.h264 = _video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      _videoSupport.ogg = _video.canPlayType('video/ogg; codecs="theora"');
      _videoSupport.webm = _video.canPlayType('video/webm; codecs="vp8, vorbis"');
      convertEmptyStringsToFalse(_videoSupport);

    // video dom element couldn't be created, video is not supported
    } else {
      _videoSupport.mpeg4 = false;
      _videoSupport.h264 = false;
      _videoSupport.ogg = false;
      _videoSupport.webm = false;
    }

    // memory management
    _video = null;
  }

  function getAudioSupport() {
    return _audioSupport;
  }

  function isMP3AudioSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _audioSupport.mp3 !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _audioSupport.mp3 === true;
        break;

      case Method.EXACT:
        isSupported = _audioSupport.mp3;
        break;

      default:
        isSupported = _audioSupport.mp3;
        break;
    }
    return isSupported;
  }

  function isAACAudioSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _audioSupport.aac !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _audioSupport.aac === true;
        break;

      default:
        isSupported = _audioSupport.aac;
        break;
    }
    return isSupported;
  }

  function isOGGVorbisAudioSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _audioSupport.oggVorbis !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _audioSupport.oggVorbis === true;
        break;

      default:
        isSupported = _audioSupport.oggVorbis;
        break;
    }
    return isSupported;
  }

  function isOGGOpusAudioSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _audioSupport.oggOpus !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _audioSupport.oggOpus === true;
        break;

      default:
        isSupported = _audioSupport.oggOpus;
        break;
    }
    return isSupported;
  }

  function isWEBMAudioSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _audioSupport.webm !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _audioSupport.webm === true;
        break;

      default:
        isSupported = _audioSupport.webm;
        break;
    }
    return isSupported;
  }

  function isWaveAudioSupported() {
    var isSupported;
    switch (CodecDetect.method) {
      case Method.OPTIMISTIC:
        isSupported = _audioSupport.wave !== false;
        break;

      case Method.PESSIMISTIC:
        isSupported = _audioSupport.wave === true;
        break;

      default:
        isSupported = _audioSupport.wave;
        break;
    }
    return isSupported;
  }

  function detectAudioSupport() {
    // create a audio element to use for testing
    _audio = document.createElement('audio');

    // get supported audio codecs
    if (_audio) {
      _audioSupport.mp3 = _audio.canPlayType('audio/mpeg');
      _audioSupport.aac = _audio.canPlayType('audio/mp4; codecs="mp4a.40.2"');
      _audioSupport.oggVorbis = _audio.canPlayType('audio/ogg; codecs="vorbis"');
      _audioSupport.oggOpus = _audio.canPlayType('audio/ogg; codecs="opus"');
      _audioSupport.webm = _audio.canPlayType('audio/webm; codecs="vorbis"');
      _audioSupport.wave = _audio.canPlayType('audio/wav; codecs="1"');
      convertEmptyStringsToFalse(_audioSupport);

    // audio dom element couldn't be created, audio is not supported
    } else {
      _audioSupport.mp3 = false;
      _audioSupport.aac = false;
      _audioSupport.oggVorbis = false;
      _audioSupport.oggOpus = false;
      _audioSupport.webm = false;
      _audioSupport.wave = false;
    }

    // memory management
    _audio = null;
  }

  // utils
  function convertEmptyStringsToFalse(support) {
    // iterate through codecs, set as not supported if is empty string
    _.forEach(support, setAsFalseIfEmpty);

    // iterator method
    function setAsFalseIfEmpty(n, key) {
      if (_.isEmpty(n)) {
        support[key] = false;
      }
    }
  }

})();
