Promise.all([
  faceapi.nets.faceExpressionNet.loadFromUri('models'),
  faceapi.nets.tinyFaceDetector.loadFromUri('models')
]).then(startVideo)


function startVideo() {

    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

let phrase = document.createElement('phrase');


video.addEventListener('play', () => {

  setInterval(async () => {
    const detectionsWithExpressions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({inputSize: 128, scoreThreshold: 0.65})).withFaceExpressions()
    
    var emotion = {
    angry: {
        nickname: "angry",
        score: detectionsWithExpressions[0].expressions.angry,
        rank: 1
    },
    digusted: {
        nickname: "disgusted",
        score: detectionsWithExpressions[0].expressions.disgusted,
        rank: 2
    },
    fearful: {
        nickname: "fearful",
        score: detectionsWithExpressions[0].expressions.fearful,
        rank: 3
    },
    happy: {
        nickname: "happy",
        score: detectionsWithExpressions[0].expressions.happy,
        rank: 4
    },
    neutral: {
        nickname: "neutral",
        score: detectionsWithExpressions[0].expressions.neutral,
        rank: 5
    },
    sad: {
        nickname: "sad",
        score: detectionsWithExpressions[0].expressions.sad,
        rank: 6
    },
    surprised: {
        nickname: "surprised",
        score: detectionsWithExpressions[0].expressions.surprised,
        rank: 7
    }
};


    var array = [];
    
    for (var key in emotion) {
      array.push(emotion[key]);

    }

    array.sort(function(a, b){
    return b.score - a.score;
    });

    var rank = 1;
    for (var i = 0; i < array.length; i++) {
      // increase rank only if current score less than previous
      if (i > 0 && array[i].score < array[i - 1].score) {
        rank++;
      }
      array[i].rank = rank;
    }

    //console.log(array[0]);
    console.log(detectionsWithExpressions[0].expressions)
    phrase.textContent = array[0].nickname + "(" + parseFloat(array[0].score).toFixed(2) + ")";
    const SentimentOutput = document.querySelector('.SentimentOutput');
    SentimentOutput.appendChild(phrase);
    array = [0];
}, 500)
})