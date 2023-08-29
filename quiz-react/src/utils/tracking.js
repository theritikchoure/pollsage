const { default: api } = require("../services/api.service");
const { sessionId } = require("./session");
const { identifySource } = require('../helpers/common.js');
const { getUserIp } = require("./user_ip");

// Function to send page views data to the server
async function trackPageView(data) {
  try {
    // get the user geo location
    let geo = await getUserIp();
    
        let payload = {
            session_id: sessionId,
            // source: identifySource(data.referrer),
            source: 'social',
            url: data.url,
            referrer: data.referrer || null,
            geo_location: geo.geo_location || null,
        }
        console.log(payload);
      const res = await api.post('/analytics/track/pageviews', payload);

      console.log(res);

  } catch (error) {
    console.error(error);
  }
}

module.exports = { trackPageView };