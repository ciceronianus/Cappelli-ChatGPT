
document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const results = abbreviations.filter(function(abbr) {
        const characters = typeof abbr.characters === 'string' ? abbr.characters.toLowerCase() : '';
        const transcription = typeof abbr.transcription === 'string' ? abbr.transcription.toLowerCase() : '';
        return characters.includes(searchTerm) || transcription.includes(searchTerm);
    });
    displayResults(results);
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(function(abbr) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${abbr.characters || 'N/A'}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${abbr.transcription || 'N/A'}</h6>
                <p class="card-text">Category: ${abbr.category || 'N/A'}</p>
                <p class="card-text">Period: ${abbr.period || 'N/A'}</p>
                <p class="card-text">Language: ${abbr.language || 'N/A'}</p>
                <img src="${abbr.image_url}" class="card-img-top" alt="${abbr.characters || ''}">
            </div>
        `;
        resultsDiv.appendChild(card);
    });
}

// Load the JSON data
let abbreviations = [];
fetch('abbreviations.json')
    .then(response => response.json())
    .then(data => abbreviations = data);
