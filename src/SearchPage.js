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
            const response = await fetch('http://localhost:5000/api/locations'); // Update with your backend URL
            const data = await response.json();
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
        }

        if (priceFilter) {
            filtered = filtered.filter(location => {
                if (priceFilter === 'low') return location.price < 50;
                if (priceFilter === 'high') return location.price >= 50;
                return true;
            });
        }

        if (locationFilter) {
            filtered = filtered.filter(location => location.type.includes(locationFilter));
        }

        setFilteredLocations(filtered);
    };

    useEffect(() => {
        filterLocations();
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
                    <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
                        <option value="">Filter by Price</option>
                        <option value="low">Low to High</option>
                        <option value="high">High to Low</option>
                    </select>
                    <select onChange={(e) => setLocationFilter(e.target.value)} value={locationFilter}>
                        <option value="">Filter by Location</option>
                        <option value="city1">City 1</option>
                        <option value="city2">City 2</option>
                        {/* Add more locations as needed */}
                    </select>
                </div>
                <div>
                    {filteredLocations.map(location => (
                        <div key={location.pictureId} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                            <h3>{location.name}</h3>
                            <p>{location.description}</p>
                            <p>Price: ${location.price}</p>
                            <img src={`https://your-cloudinary-url/${location.pictureId}`} alt={location.name} style={{ width: '100%' }} />
                            <a href="#">More Details</a>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                Chat with us!
            </div>
        </div>
    );
};

export default SearchPage;