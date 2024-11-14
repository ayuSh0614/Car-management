import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';

const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch car details
    const fetchCar = useCallback(async () => {
        try {
            const res = await API.get(`/cars/${id}`);
            setCar(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch car details');
            setLoading(false);
        }
    }, [id]);  // useCallback ensures that fetchCar doesn't change unless `id` changes

    // Run fetch on mount or when the car id changes
    useEffect(() => {
        fetchCar();
    }, [fetchCar]);  // Add fetchCar as a dependency

    // Display loading indicator
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    // Display error message
    if (error) {
        return (
            <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '40px', padding: '20px' }}>
            <h1>{car.title}</h1>

            {/* Car Images */}
            {car.images && car.images.length > 0 ? (
    <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px' }}>
        {car.images.map((img, index) => (
            <img
                key={index}
                src={`http://localhost:5000/uploads/${img}`} // Ensure the path matches your backend static file configuration
                alt={`car-${index}`}
                width={300}
                height={200}
                style={{
                    objectFit: 'cover',
                    marginRight: '10px',
                    borderRadius: '4px',
                    border: '2px solid red', // Added border for testing visibility
                }}
            />
        ))}
    </div>
) : (
    <p>No images available for this car.</p>
)}


            {/* Car Description */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Description</h3>
                <p>{car.description}</p>
            </div>

            {/* Car Tags */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Tags</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {car.tags.map((tag, index) => (
                        <span key={index} style={tagStyle}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Edit Button */}
            <Link to={`/edit-car/${car._id}`}>
                <button style={buttonStyle}>Edit Car</button>
            </Link>
        </div>
    );
};

// Custom styles for the tags and buttons
const tagStyle = {
    padding: '5px 10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '20px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default CarDetail;
