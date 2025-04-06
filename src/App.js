const apiUrl = 'hk_attraction.json'; // Path to your JSON file
let sitesData = [];

// Function to fetch site data from the JSON file
async function fetchSites() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        sitesData = await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredResults = sitesData.filter(site => 
        site.name.toLowerCase().includes(input) || 
        site.address.toLowerCase().includes(input)
    );
    displayResults(filteredResults);
});

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(site => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        resultDiv.innerHTML = `
            <h2>${site.name}</h2>
            <p>${site.address}</p>
            <img src="${site.picture[0] || 'default_image.jpg'}" alt="${site.name}" />
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

// Fetch the data when the page loads
window.onload = fetchSites;
