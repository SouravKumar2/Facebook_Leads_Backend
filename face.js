const FB = require("fb");

// Replace with your Facebook App credentials
const appId = "YOUR_APP_ID";
const appSecret = "YOUR_APP_SECRET";
const accessToken = "YOUR_ACCESS_TOKEN";

// Set the default access token
FB.setAccessToken(accessToken);

// Example: Reading Insights
const pageId = "PAGE_ID";

FB.api(`${pageId}/insights`, "get", function (res) {
  if (!res || res.error) {
    console.log(!res ? "error occurred" : res.error);
    return;
  }
  console.log("Insights:", res);
});

// Example: Managing Ads
const adAccountId = "AD_ACCOUNT_ID";
const adSetId = "AD_SET_ID";
const adCreativeId = "AD_CREATIVE_ID";

// Read Ads
FB.api(`${adAccountId}/ads`, "get", function (res) {
  if (!res || res.error) {
    console.log(!res ? "error occurred" : res.error);
    return;
  }
  console.log("Ads:", res);
});

// Create an Ad
FB.api(
  `${adAccountId}/ads`,
  "post",
  {
    name: "New Ad",
    adset_id: adSetId,
    creative: { creative_id: adCreativeId },
  },
  function (res) {
    if (!res || res.error) {
      console.log(!res ? "error occurred" : res.error);
      return;
    }
    console.log("New Ad:", res);
  }
);

// Business Management
const businessId = "BUSINESS_ID";

FB.api(businessId, "get", function (res) {
  if (!res || res.error) {
    console.log(!res ? "error occurred" : res.error);
    return;
  }
  console.log("Business:", res);
});
