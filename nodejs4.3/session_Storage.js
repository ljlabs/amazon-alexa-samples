var https = require('https');

/**
the whole point of this app is to get a joke from the user and then ask him who funny it is then finally we will return both of these statements concatenated
**/

exports.handler = (event, context) => {
  var sessionAttributes = event.session.attributes;
  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION");
    }

    switch (event.request.type) {
        case "LaunchRequest":
        // Launch Request
        console.log('LAUNCH REQUEST');
         context.succeed(
                  generateResponse(
                    buildSpeechletResponse("Welcome please tell me a joke.", false),
                    {}
                  )
                );
        break;

     
      case "IntentRequest":
        // Intent Request
        console.log("INTENT REQUEST");
         switch(event.request.intent.name) {
          case "GetJoke":
                sessionAttributes = event.request.intent.slots.SpokenJoke;  // the string that was hended to me by the user
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Awesome joke. How Good would You say it is?", false),
                        {theJokeis : sessionAttributes.value}
                    )
                );
            break;

          case "FunnyLevel":
                  context.succeed(
                  generateResponse(
                    buildSpeechletResponse(sessionAttributes.theJokeis + " is said to be a level " + event.request.intent.slots.laughLevel.value + " Joke" , true),
                    {}
                  )
                );
            break;

          default:
            throw "Invalid intent";
        }
        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log("SESSION ENDED REQUEST");
        break;

      default:
        context.fail("INVALID REQUEST TYPE: ${event.request.type}");

    }

  } catch(error) {
      context.fail(error);
      }

};

// Helpers
/**
this will build the speach that the alexa device will speak
*/
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  };

};


/**
will generate the actual data the is returned from the lamda funtion
and will be passed on to the device

*/
generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };

};
