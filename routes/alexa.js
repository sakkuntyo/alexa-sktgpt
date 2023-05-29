const Alexa = require('alexa-app');
const app = new Alexa.app('Sample');

const UTTERANCES = {
  response: {
    launch: 'こんにちは、エスケーティージーピーティーです',
    foo: 'foo!',
    stopAndCancel: 'エスケーティージーピーティーを終了します。',
  },
  request: {
    stop: ['ストップ', 'キャンセル'],
    help: ['help'],
  },
};

const helpResponse = (req, res) => res.say(UTTERANCES.response.launch).shouldEndSession(false);
const stopAndCancelResponse = (req, res) => res.say(UTTERANCES.response.stopAndCancel);
const fooResponse = (req, res) => foobarResponse(req, res, 'foo');
const foobarResponse = (req, res, type) => res.say(UTTERANCES.response[type]).shouldEndSession(false);

// launch, stop, cancel, help
app.launch((req, res) => {
  res.say(UTTERANCES.response.launch).shouldEndSession(false);
});
app.intent('AMAZON.StopIntent', { utterances: UTTERANCES.request.stop }, stopAndCancelResponse);
app.intent('AMAZON.CancelIntent', { utterances: UTTERANCES.request.stop }, stopAndCancelResponse);
app.intent('AMAZON.HelpIntent', { utterances: UTTERANCES.request.help }, helpResponse);

// add intent routing
app.intent('foo', { utterances: UTTERANCES.request.foo }, fooResponse);

module.exports = app;
