import React from 'react';
import SearchPage from './searchpage';

const App = () => {
    return (
        <div>
            <SearchPage />
        </div>
    );
};

export default App;
}

// Fetch the data when the page loads
window.onload = fetchSites;
