import React, { useEffect, useState } from 'react';

const SearchPage = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await fetch('hk_attraction.json'); // Ensure the path is correct
            const data = await response.json();
            console.log('Fetched data:', data); // Log fetched data
            setLocations(data);
            setFilteredLocations(data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const filterLocations = () => {
        let filtered = locations;

        if (searchTerm) {
            filtered = filtered.filter(location =>
                location.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log('Filtered after search:', filtered); // Log filtered results
        }

        // Price filter logic (if applicable)
        if (priceFilter) {
            filtered = filtered.filter(location => {
                if (priceFilter === 'low') return location.price < 50; // Example threshold
                if (priceFilter === 'high') return location.price >= 50;
                return true;
            });
        }

        // Location type filter
        if (locationFilter) {
            filtered = filtered.filter(location => location.type.includes(locationFilter));
        }

        setFilteredLocations(filtered);
    };

    useEffect(() => {
        filterLocations();
        console.log('Filtered locations:', filteredLocations); // Log filtered locations
    }, [searchTerm, priceFilter, locationFilter, locations]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', padding: '15px', backgroundColor: '#f4f4f4' }}>
                <button>SEARCH</button>
                <button>SHOPPING CART</button>
                <button>MAP</button>
                <button>USER PROFILE</button>
            </div>
            <div style={{ flex: 1, padding: '15px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <label htmlFor="priceFilter">Filter by Price:</label>
                    <select id="priceFilter" onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
                        <option value="">Select Price Filter</option>
                        <option value="low">Low to High</option>
                        <option value="high">High to Low</option>
                    </select>
                    <label htmlFor="locationFilter">Filter by Type:</label>
                    <select id="locationFilter" onChange={(e) => setLocationFilter(e.target.value)} value={locationFilter}>
                        <option value="">Select Type</option>
                        <option value="tourist_attraction">Tourist Attraction</option>
                        <option value="park">Park</option>
                        <option value="place_of_worship">Place of Worship</option>
                        {/* Add more location types as needed */}
                    </select>
                </div>
                <div>
                    {filteredLocations.length === 0 ? (
                        <p>No results found.</p> // Feedback for no results
                    ) : (
                        filteredLocations.map(location => (
                            <div key={location.site_id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                                <h3>{location.name}</h3>
                                <p>{location.description || 'No description available.'}</p>
                                <p>Price: ${location.price}</p>
                                <img src={location.picture[0] || 'default_image.jpg'} alt={location.name} style={{ width: '100%' }} />
                                <a href="#">More Details</a>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                Chat with us!
            </div>
        </div>
    );
};

export default SearchPage;
