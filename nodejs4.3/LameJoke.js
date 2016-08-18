var https = require('https');
var jokes = ["I tried to catch some fog. I mist.",
	"When chemists die, they barium.",
	"Jokes about German sausage are the wurst.",
	"A soldier who survived mustard gas and pepper spray is now a seasoned veteran.",
	"I know a guy who's addicted to brake fluid. He says he can stop any time.",
	"How does Moses make his tea? Hebrews it.",
	"I stayed up all night to see where the sun went. Then it dawned on me.",
	"This girl said she recognized me from the vegetarian club, but I'd never met herbivore.",
	"I'm reading a book about anti-gravity. I can't put it down.",
	"I did a theatrical performance about puns. It was a play on words.",
	"They told me I had type A blood, but it was a type-O.",
	"This dyslexic man walks into a bra.",
	"I didn't like my beard at first. Then it grew on me.",
	"A cross-eyed teacher lost her job because she couldn't control her pupils.",
	"When you get a bladder infection, urine trouble.",
	"What does a clock do when it's hungry? It goes back four seconds.",
	"I wondered why the ball was getting bigger. Then it hit me!",
	"Broken pencils are pointless",
	"What do you call a dinosaur with an extensive vocabulary? A thesaurus.",
	"England has no kidney bank, but it does have a Liverpool.",
	"I used to be a banker, but then I lost interest.",
	"I dropped out of communism class because of lousy Marx.",
	"I took the job at a bakery because I kneaded dough.",
	"Velcro - what a rip off!",
	"Cartoonist found dead in home. Details are sketchy."];


exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION");
    }

    switch (event.request.type) {
        
        case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Hello im your own personal comedian", true),
            {}
          )
        )
        break;

     
      case "IntentRequest":
        // Intent Request
        console.log("INTENT REQUEST");
         switch(event.request.intent.name) {
          case "GetJoke":
          		var joke = jokes[Math.floor(Math.random()*jokes.length)];
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(joke, true),
                    {}
                  )
                );
            break;

          default:
            throw "Invalid intent"
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

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
