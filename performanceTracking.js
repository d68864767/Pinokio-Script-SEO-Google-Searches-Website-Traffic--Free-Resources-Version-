// Importing required module
const {google} = require('googleapis');

// Google Analytics View ID
const VIEW_ID = 'G-ZDL6ZB3MB9'; // Replace with your Google Analytics View ID

// Initialize the Analytics Reporting API V4
const analyticsreporting = google.analyticsreporting('v4');

// Performance Tracking Module
const performanceTracking = {
  tool: "GoogleAnalytics",
  reportType: "basic",

  // Initialize Google Analytics API
  initialize: function() {
    google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    }).then(client => {
      google.options({
        auth: client
      });
    });
  },

  // Get Report from Google Analytics
  getReport: function() {
    return new Promise((resolve, reject) => {
      analyticsreporting.reports.batchGet({
        requestBody: {
          reportRequests: [
            {
              viewId: VIEW_ID,
              dateRanges: [
                {
                  startDate: "30daysAgo",
                  endDate: "today"
                }
              ],
              metrics: [
                {
                  expression: "ga:sessions"
                }
              ]
            }
          ]
        }
      }, (err, res) => {
        if (err) {
          console.error("Failed to fetch report from Google Analytics: ", err);
          reject(err);
        } else {
          console.log("Report fetched from Google Analytics successfully.");
          resolve(res.data.reports[0].data.totals[0].values[0]);
        }
      });
    });
  },

  // Track Performance
  track: async function(suggestions) {
    this.initialize();
    const report = await this.getReport();
    console.log("Website Traffic (Last 30 days): ", report);
    return report;
  }
};

module.exports = performanceTracking;

