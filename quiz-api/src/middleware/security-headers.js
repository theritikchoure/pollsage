
const setSecurityHeaders = (req, res, next) => {
  // Content Security Policy (CSP)
  // Content Security Policy helps prevent Cross-Site Scripting (XSS) attacks by
  // specifying which sources of content are allowed to be loaded. Here, we allow
  // scripts and styles to be loaded from the same origin ('self') and allow inline
  // scripts and styles ('unsafe-inline' and 'unsafe-eval'). Adjust this based on
  // your application's requirements and consider using nonces or hashes instead.
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self';"
  );

  // X-Frame-Options
  // X-Frame-Options prevents your website from being loaded inside an iframe on
  // another domain, which helps protect against clickjacking attacks. By setting
  // it to 'SAMEORIGIN', we allow the site to be framed only by pages from the same origin.
  // Consider 'DENY' to completely disallow framing or adjust it based on your needs.
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // X-Content-Type-Options
  // X-Content-Type-Options prevents browsers from interpreting files as a different MIME type
  // than declared, reducing the risk of MIME-sniffing attacks. By setting it to 'nosniff',
  // we force the browser to stick with the declared content-type.
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Referrer-Policy
  // Referrer-Policy controls how much referrer information is sent in the HTTP headers
  // when navigating away from a page. By setting it to 'strict-origin-when-cross-origin',
  // we send the full referrer to the same origin but only the origin part when navigating to other origins.
  // This helps protect sensitive information from being leaked in the referrer header.
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions-Policy
  // Permissions-Policy allows a website to control which features and APIs can be used
  // in the browser. Here, we set a sample policy allowing geolocation for the same origin
  // ('self') and no access to the microphone API. Adjust the policy based on your application's requirements.
  res.setHeader(
    "Permissions-Policy",
    'geolocation=(self "https://example.com"), microphone=()'
  );

  next();
};

module.exports = setSecurityHeaders;
