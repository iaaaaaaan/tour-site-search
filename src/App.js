const apiUrl = 'hk_attractions.json';
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
        resultsContainer.innerHTML = '<p>No results found.</p>'; // Message for no results
        return;
    }

    results.forEach(site => {
        const resultDiv = document.createElement('div'); // Create a new div for each result
        resultDiv.className = 'result-item'; // Assign a class for styling
        resultDiv.innerHTML = `
            <h2>${site.name}</h2> <!-- Site name -->
            <p>${site.address}</p> <!-- Site address -->
            ${site.description ? `<p>${site.description}</p>` : ''} <!-- Site description if available -->
            <p><strong>Opening Hours:</strong> ${site.opening_hour ? site.opening_hour.join(', ') : 'N/A'}</p>
            <img src="${site.picture[0] || 'default_image.jpg'}" alt="${site.name}" /> <!-- Site image -->
        `;
        resultsContainer.appendChild(resultDiv); // Append the result div to the results container
    });
}

// Fetch the data when the page loads
window.onload = fetchSites;
