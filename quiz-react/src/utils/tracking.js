const { default: api } = require("../services/api.service");
const { sessionId } = require("./session");
const { identifySource } = require('../helpers/common.js')
// Function to send page views data to the server
async function trackPageView(data) {
  try {
        let payload = {
            session_id: sessionId,
            source: identifySource(data.referrer),
            url: data.url,
            referrer: data.referrer || null,
        }
        console.log(payload);
      const res = await api.post('/analytics/track/pageviews', payload);

      console.log(res);

  } catch (error) {
    console.error(error);
  }
}

module.exports = { trackPageView };