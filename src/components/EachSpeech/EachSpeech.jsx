import './EachSpeech.css';
import speak from '../../utilities/speak';
import voiceSettings from '../../utilities/voiceSettings';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({ speech, empty, languageCodes }) {
  // to darken old dialogues(Not used)
  // if (length >= 0) {
  //   nameOfClass += ` focus`;
  // }

  // Decode object for it's flagCode
  let inputFlagCode, outputFlagCode;
  languageCodes.forEach(function (c) {
    if (speech && c.value == speech.inputLanguage) {
      inputFlagCode = c.flagCode;
    }
    if (speech && c.value == speech.outputLanguage) {
      outputFlagCode = c.flagCode;
    }
  });

  function handleSayAgain() {
    const lang = voiceSettings(speech.outputLanguage);
    speak(speech.outputText, lang);
  }

  function handleSaveSpeech() {
    console.log('Saving: ', speech);
  }
  return (
    <div className='eachSpeech'>
      {/* <div className='speakerButton'>🔈</div> */}
      <div className='starButton' onClick={handleSaveSpeech}>
        {' '}
        ★
      </div>
      <div className='speechDate'>
        {speech.timeCreated ? speech.timeCreated.toLocaleString() : ''}
      </div>
      <div onClick={handleSayAgain}>
        <div className='input'>
          <div className='flag'>
            <ReactCountryFlag
              countryCode={inputFlagCode}
              svg
              cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
            />
          </div>
          &nbsp;&nbsp;
          <div className={empty ? 'emptyPrompt' : 'textBubble inputTextBubble'}>
            {speech.inputText}
          </div>
        </div>
        <div className='output'>
          {speech.outputText ? (
            <div className='textBubble outputTextBubble'>
              {speech.outputText}
            </div>
          ) : (
            <div className='textBubble outputTextBubble outputTextBlink'>
              . . .{' '}
            </div>
          )}
          &nbsp;&nbsp;
          <div className='flag'>
            <ReactCountryFlag
              countryCode={outputFlagCode}
              svg
              cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
