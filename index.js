const API_KEY = 'AIzaSyAryEjRrE75XLHhNa-0u9s-r0t2FWq4eA0'; // Replace with your actual Gemini API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Industry benchmarks (example data)
const industryBenchmarks = {
    ecommerce: {
        ctr: "1.5%",
        cpm: "$15",
        cvr: "3%",
        thumbStopRatio: "6%",
        roas: "3x",
        engagementRate: "2.5%",
        cpc: "$1.20",
        conversionValue: "$50",
        adFrequency: "3.5",
        adReach: "10,000"
    },
    healthcare: {
        ctr: "1.2%",
        cpm: "$20",
        cvr: "2%",
        thumbStopRatio: "5%",
        roas: "2.5x",
        engagementRate: "2%",
        cpc: "$1.50",
        conversionValue: "$75",
        adFrequency: "4.0",
        adReach: "8,000"
    },
    education: {
        ctr: "1.8%",
        cpm: "$12",
        cvr: "4%",
        thumbStopRatio: "7%",
        roas: "4x",
        engagementRate: "3%",
        cpc: "$1.00",
        conversionValue: "$40",
        adFrequency: "3.0",
        adReach: "12,000"
    },
    travel: {
        ctr: "2%",
        cpm: "$18",
        cvr: "5%",
        thumbStopRatio: "8%",
        roas: "5x",
        engagementRate: "3.5%",
        cpc: "$1.80",
        conversionValue: "$100",
        adFrequency: "2.5",
        adReach: "15,000"
    },
    finance: {
        ctr: "1.3%",
        cpm: "$22",
        cvr: "2.5%",
        thumbStopRatio: "5.5%",
        roas: "3.5x",
        engagementRate: "2.2%",
        cpc: "$1.70",
        conversionValue: "$90",
        adFrequency: "3.8",
        adReach: "9,000"
    }
};

async function analyzeAd() {
    const adObjective = document.getElementById('adObjective').value;
    const industry = document.getElementById('industry').value;
    const platform = document.getElementById('platform').value;
    const imageURL = document.getElementById('imageURL').value;

    if (!imageURL) {
        alert("Please enter a valid image URL.");
        return;
    }

    try {
        // Show loading message
        document.getElementById('loading').style.display = 'block';
        document.getElementById('result').classList.add('hidden');

        // Step 1: Fetch the image and convert it to Base64
        const response = await fetch(imageURL);
        if (!response.ok) throw new Error("Failed to fetch image.");
        const blob = await response.blob();
        const base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract base64 data
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        // Step 2: Display the image
        document.getElementById('imagePreview').src = imageURL;

        // Step 3: Prepare the request body for the Gemini API
        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: `Analyze this image for an ad campaign. The ad objective is ${adObjective}, the industry is ${industry}, and the platform is ${platform}. Provide the following:
1. A detailed description of the image.
2. Whether the image aligns with the ad objective.
3. What's missing in the image to better achieve the ad objective.
4. Additional instructions for improving the image.` },
                        { inlineData: { mimeType: blob.type, data: base64Image } }
                    ]
                }
            ]
        };

        // Step 4: Send the request to the Gemini API
        const apiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!apiResponse.ok) {
            const errorResponse = await apiResponse.json();
            console.error("API Error:", errorResponse);
            throw new Error(`API request failed: ${errorResponse.error.message}`);
        }

        // Step 5: Parse the API response
        const result = await apiResponse.json();
        console.log("API Response:", result);

        // Step 6: Extract and display the results
        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response available.";
        const [description, alignment, missing, instructions] = responseText.split('\n').filter(Boolean);

        document.getElementById('adObjectiveResult').textContent = adObjective;
        document.getElementById('industryResult').textContent = industry;
        document.getElementById('platformResult').textContent = platform;
        document.getElementById('imageDescription').textContent = description;
        document.getElementById('alignment').textContent = alignment;
        document.getElementById('missing').textContent = missing;
        document.getElementById('instructions').textContent = instructions;

        // Step 7: Fetch advanced analytics (simulated data for now)
        const advancedAnalytics = await fetchAdvancedAnalytics(adObjective, industry, platform);
        document.getElementById('budgetRecommendation').textContent = advancedAnalytics.budgetRecommendation;
        document.getElementById('aspectRatio').textContent = advancedAnalytics.aspectRatio;
        document.getElementById('adFatigue').textContent = advancedAnalytics.adFatigue;
        document.getElementById('cpmTrend').textContent = advancedAnalytics.cpmTrend;
        document.getElementById('ctr').textContent = advancedAnalytics.ctr;
        document.getElementById('cpm').textContent = advancedAnalytics.cpm;
        document.getElementById('cvr').textContent = advancedAnalytics.cvr;
        document.getElementById('thumbStopRatio').textContent = advancedAnalytics.thumbStopRatio;
        document.getElementById('roas').textContent = advancedAnalytics.roas;

        // Step 8: Display additional metrics
        document.getElementById('engagementRate').textContent = advancedAnalytics.engagementRate;
        document.getElementById('cpc').textContent = advancedAnalytics.cpc;
        document.getElementById('conversionValue').textContent = advancedAnalytics.conversionValue;
        document.getElementById('adFrequency').textContent = advancedAnalytics.adFrequency;
        document.getElementById('adReach').textContent = advancedAnalytics.adReach;

        // Step 9: Display industry benchmarks
        const benchmarks = industryBenchmarks[industry];
        document.getElementById('ctrBenchmark').textContent = benchmarks.ctr;
        document.getElementById('cpmBenchmark').textContent = benchmarks.cpm;
        document.getElementById('cvrBenchmark').textContent = benchmarks.cvr;
        document.getElementById('thumbStopRatioBenchmark').textContent = benchmarks.thumbStopRatio;
        document.getElementById('roasBenchmark').textContent = benchmarks.roas;

        // Step 10: Show the result section
        document.getElementById('result').classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to analyze ad: ${error.message}`);
    } finally {
        // Hide loading message
        document.getElementById('loading').style.display = 'none';
    }
}

// Simulated function to fetch advanced analytics
async function fetchAdvancedAnalytics(adObjective, industry, platform) {
    // Simulate API call to external tools or in-house models
    return {
        budgetRecommendation: "$5,000/month",
        aspectRatio: "1:1 (Square)",
        adFatigue: "Low",
        cpmTrend: "Decreasing",
        ctr: "2.5%",
        cpm: "$10",
        cvr: "5%",
        thumbStopRatio: "8%",
        roas: "4.5x",
        engagementRate: "3.2%",
        cpc: "$1.10",
        conversionValue: "$60",
        adFrequency: "3.2",
        adReach: "12,500"
    };
}
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });
});
