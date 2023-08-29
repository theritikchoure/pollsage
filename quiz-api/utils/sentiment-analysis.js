const tf = require('@tensorflow/tfjs');
// require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

// Sample text for sentiment analysis
const textToAnalyze = "I love using this library. It's amazing!";

// Load the Universal Sentence Encoder model
async function loadModel() {
  const model = await use.load();
  return model;
}

// Analyze the sentiment of the text
async function analyzeSentiment(text, model) {
  const embeddings = await model.embed([text]);
  const embeddingsArray = await embeddings.array();
  const sentenceEmbedding = embeddingsArray[0];

  // Use the sentence embedding to classify sentiment
  const modelPath = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json';
  const sentimentModel = await tf.loadLayersModel(modelPath);
  const input = tf.tensor2d(sentenceEmbedding, [1, 512]);
  const prediction = sentimentModel.predict(input);
  const score = prediction.dataSync()[0];
  return score;
}

function getSentimentCategory(sentimentScore) {
    const positiveThreshold = 0.3;
    const negativeThreshold = -0.3;
  
    if (sentimentScore > positiveThreshold) {
      return "Positive";
    } else if (sentimentScore < negativeThreshold) {
      return "Negative";
    } else {
      return "Neutral";
    }
}

// Perform sentiment analysis
async function runSentimentAnalysis() {
  try {
    const model = await loadModel();
    const score = await analyzeSentiment(textToAnalyze, model);
    const sentimentCategory = getSentimentCategory(score);
    console.log('Sentiment Score:', score);
    console.log('Sentiment:', sentimentCategory);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runSentimentAnalysis();
