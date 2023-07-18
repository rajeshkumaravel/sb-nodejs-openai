const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * @param  {Response} res - Response Object
 * @param  {string} model - OpenAI Model name
 * @param  {string} query - Search query
 * @description - Function to initiate chat with OpenAI
 */
const chat = async (res, model, query) => {
  try {
    const system_rules = 'I want you to act as an book creator and content creator';
    const response = await openai.createChatCompletion({
      model: model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: system_rules },
        { role: 'user', content: query },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });
    return res.status(200).json({
      success: true,
      message: response?.data?.choices[0]?.message?.content,
    });
  } catch (error) {
    console.log('OpenAI : ask - Error while fetching data');
    if (error.response) {
      return res.status(error?.response?.status || 400).json({ error: error?.response?.data?.error?.message });
    } else {
      return res.status(503).json({ error: error?.message });
    }
  }
};

/**
 * @param  {string} query - Search query
 * @description - Function to prompt query with OpenAI
 */
const ask = async (query) => {
  console.log('Query : ', query); // TODO: log!
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: query,
      max_tokens: 2000,
      temperature: 0.5
    });
    return completion?.data?.choices[0]['text'];
  } catch (error) {
    console.log('OpenAI : ask - Error while fetching data');
    if (error.response) {
      return { error: error?.response?.data?.error?.message };
    } else {
      return { error: error?.message };
    }
  }
};

/**
 * @param  {string} query - Search query for image
 * @description - Function to query image with OpenAI
 */
const image = async (query) => {
  console.log('Query : ', query); // TODO: log!
  try {
    const imgResponse = await openai.createImage({
      prompt: query,
      n: 5,
      size: '1024x1024',
    });
    return imgResponse?.data?.data;
  } catch (error) {
    console.log('OpenAI : ask - Error while fetching data');
    if (error.response) {
      return { error: error?.response?.data?.error?.message };
    } else {
      return { error: error?.message };
    }
  }
};

module.exports = {
  ask,
  chat,
  image,
};
