var watson = require('watson-developer-cloud');

var speech_to_text = watson.speech_to_text({
  username: '{andrew.p.bresee@gmail.com}',
  password: '{speechdoctor499}',
  version: 'v1'
});

speech_to_text.getModels({}, function(err, models) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(models, null, 2));
});

speech_to_text.getModel({model_id: 'WatsonModel'}, function(err, model) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(model, null, 2));
});

speech_to_text.createSession({}, function(err, session) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(session, null, 2));
});
