
<script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async defer>
    
  const button = new Crate({
  server: '681458022811566139',
  channel: '681458023280934960',
  shard: 'https://disweb.dashflo.net'
  })

  button.notify('Transcription is Starting!')

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

  var grammar = '#JSGF V1.0;'; 

  const recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  let p = document.createElement('p');
  let words = document.createElement('words')
  var br = document.createElement('br');
  words.appendChild(br);
  words.appendChild(p);

  recognition.addEventListener('result', e=> {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

      p.textContent = transcript;
      
      if(e.results[0].isFinal) {
          console.log(p.textContent)
          console.log(words.textContent)
          button.notify(p.textContent)
          button.emit('sendMessage', p.textContent)
          p = document.createElement('p');
          words.appendChild(br);
          words.appendChild(p)
      }
  });
  recognition.addEventListener('end', recognition.start);

  recognition.start();

</script>