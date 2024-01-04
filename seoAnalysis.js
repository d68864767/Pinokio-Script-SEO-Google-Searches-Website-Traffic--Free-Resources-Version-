// Importing required modules
const PageSpeedInsights = require('psi');
const MobileFriendlyTest = require('mobile-friendly');

// SEO Analysis Module
const seoAnalysis = {
  tools: ["PageSpeedInsights", "MobileFriendlyTest"],

  // Function to analyze the collected data
  analyze: async function(data) {
    try {
      // Use PageSpeed Insights to analyze website performance
      const psiResults = await PageSpeedInsights(data.url);

      // Use Mobile-Friendly Test to analyze website's mobile friendliness
      const mftResults = await MobileFriendlyTest.analyze(data.url);

      // Evaluate keyword relevance and usage on the website
      const keywordEvaluation = this.evaluateKeywords(data.keywords, data.content);

      // Return the analysis results
      return {
        psiResults: psiResults,
        mftResults: mftResults,
        keywordEvaluation: keywordEvaluation
      };
    } catch (error) {
      console.error("Error during SEO analysis: ", error);
    }
  },

  // Function to evaluate keyword relevance and usage on the website
  evaluateKeywords: function(keywords, content) {
    const keywordEvaluation = {};

    // For each keyword, count its occurrences in the website content
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const count = (content.match(regex) || []).length;
      keywordEvaluation[keyword] = count;
    });

    return keywordEvaluation;
  }
};

module.exports = seoAnalysis;

