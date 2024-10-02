import React, { useState, useEffect } from 'react'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import Modal from 'react-modal';
import axios from 'axios'; 
import { useNavigate, useLocation } from 'react-router-dom'; // Navigation and location hooks
import { v4 as uuidv4 } from 'uuid'; // For generating a unique ID

const libraries = ['places'];
const PEXELS_API_KEY = 'ncQOlhvP4IAxTce9xqmVUZD55EXSBT8jkciQAcB8kRfK2GuDwVx5chHC';
const GIPHY_API_KEY = 'erHNBV3BJHDx7BlQzpcXti5lTqROPeoL';

const templates = [
    { id: 1, name: 'Template 1', imageUrl: '/templates/Template1.jpg' },
    { id: 2, name: 'Template 2', imageUrl: '/templates/Template2.jpg' },
    { id: 3, name: 'Template 3', imageUrl: '/templates/Template3.jpg' },
];

const currenciesWithCountries = [
    { currency: "USD", country: "United States Dollar" },
    { currency: "EUR", country: "Euro" },
    { currency: "GBP", country: "British Pound" },
    { currency: "AUD", country: "Australian Dollar" },
    { currency: "CAD", country: "Canadian Dollar" },
];

const EventCreation = () => {
    const [eventId] = useState(uuidv4()); // Generate a unique ID for the event
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [maxGuestsPerInvitee, setMaxGuestsPerInvitee] = useState(''); // New field for max guests per invitee
    const [currency, setCurrency] = useState('USD');
    const [costPerPerson, setCostPerPerson] = useState('');
    const [isCostApplicable, setIsCostApplicable] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [pexelsResults, setPexelsResults] = useState([]);
    const [giphyResults, setGiphyResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [apiType, setApiType] = useState('pexels');
    const navigate = useNavigate();
    const locationState = useLocation();

    // Restore data when navigating back from EventPreview
    useEffect(() => {
        if (locationState.state && locationState.state.previewData) {
            const data = locationState.state.previewData;
            setEventName(data.eventName);
            setDescription(data.description);
            setDate(data.date ? new Date(data.date) : null);
            setStartTime(data.startTime);
            setEndTime(data.endTime);
            setLocation(data.location);
            setCurrency(data.currency);
            setCostPerPerson(data.costPerPerson);
            setIsCostApplicable(data.isCostApplicable);
            setSelectedTemplate(data.selectedTemplate ? { imageUrl: data.selectedTemplate } : null);
        }
    }, [locationState.state]);

    const fetchPexelsImages = async (initial = false) => {
        try {
            const query = initial ? 'events' : searchQuery;
            const response = await axios.get(`https://api.pexels.com/v1/search`, {
                headers: { Authorization: PEXELS_API_KEY },
                params: { query, per_page: 100 },
            });
            setPexelsResults(response.data.photos);
        } catch (error) {
            console.error('Error fetching images from Pexels:', error);
        }
    };

    const fetchGiphyGIFs = async (initial = false) => {
        try {
            const query = initial ? 'events' : searchQuery;
            const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
                params: { api_key: GIPHY_API_KEY, q: query, limit: 100 },
            });
            setGiphyResults(response.data.data);
        } catch (error) {
            console.error('Error fetching GIFs from Giphy:', error);
        }
    };

    useEffect(() => {
        fetchPexelsImages(true);
        fetchGiphyGIFs(true);
    }, []);

    const handleLocationSelect = (autocomplete) => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
            setLocation(place.formatted_address); // Set the full address from Autocomplete
        } else {
            setLocation('Select location'); // Handle cases where no address is selected
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleTemplateSelect = (imageUrl) => {
        setSelectedTemplate({ id: null, imageUrl });
        setUploadedImage(null);
        closeModal();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
            setSelectedTemplate(null);
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
        setSelectedTemplate(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (apiType === 'pexels') {
            fetchPexelsImages();
        } else {
            fetchGiphyGIFs();
        }
    };

    // Save and pass event data to EventPreview and to invitees
    const handleSaveAndPreview = () => {
        const previewData = {
            eventId,  
            eventName,
            description,
            date,
            startTime,
            endTime,
            location,
            privacy,
            maxAttendees,
            maxGuestsPerInvitee,  // Now added here
            isCostApplicable,
            selectedTemplate: uploadedImage ? uploadedImage : selectedTemplate?.imageUrl,
        };

        localStorage.setItem(eventId, JSON.stringify(previewData));

        navigate('/eventpreview', { state: { previewData } });
    };

    return (
        <div className="event-creation-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <form style={{ width: '50%', marginRight: '50px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h1 style={{ textAlign: 'center' }}>Create Event</h1>
                <h2 style={{ marginBottom: '20px' }}>Event Details</h2>

                {/* Event Name */}
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Event Name"
                    required
                    style={{ width: '100%', height: '50px', fontSize: '18px', marginBottom: '20px' }}
                />

                {/* Event Description */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Event Description"
                    rows="4"
                    style={{ width: '100%', height: '100px', fontSize: '18px', marginBottom: '20px' }}
                />

                {/* Date and Time */}
                <section style={{ marginBottom: '20px' }}>
                    <h3>Date and Time</h3>
                    <DatePicker selected={date} onChange={setDate} placeholderText="Select a date" style={{ width: '50%' }} />
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        placeholder="Start Time"
                        style={{ width: '100%', height: '40px', marginTop: '10px' }}
                    />
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="End Time"
                        style={{ width: '100%', height: '40px', marginTop: '10px' }}
                    />
                </section>

                {/* Location */}
                <section style={{ marginBottom: '20px' }}>
                    <h3>Location</h3>
                    <LoadScript googleMapsApiKey="AIzaSyBSV-f2NIQPj9e8H1GJiKXsnEDUGxP1BXc" libraries={libraries}>
                        <Autocomplete onLoad={(autocomplete) => autocomplete.addListener('place_changed', () => handleLocationSelect(autocomplete))}>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)} 
                                placeholder="Enter location"
                                style={{ width: '100%', height: '50px', fontSize: '18px' }}
                            />
                        </Autocomplete>
                    </LoadScript>
                </section>

                {/* Cost per Person */}
                <section style={{ marginBottom: '20px' }}>
                    <h3>Cost per Person</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={!isCostApplicable}
                            onChange={() => setIsCostApplicable(!isCostApplicable)}
                        />
                        Not Applicable
                    </label>
                    {isCostApplicable && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                style={{ width: '50%', height: '50px', fontSize: '18px' }}
                            >
                                {currenciesWithCountries.map(({ currency, country }) => (
                                    <option key={currency} value={currency}>
                                        {country} ({currency})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={costPerPerson}
                                onChange={(e) => setCostPerPerson(e.target.value)}
                                placeholder="Cost"
                                style={{ width: '45%', height: '50px', fontSize: '18px' }}
                            />
                        </div>
                    )}
                </section>

                {/* Max Guests Allowed Per Invitee */}
                <section style={{ marginBottom: '20px' }}>
                    <h3>Max Guests Allowed Per Invitee</h3>
                    <input
                        type="number"
                        value={maxGuestsPerInvitee}
                        onChange={(e) => setMaxGuestsPerInvitee(e.target.value)}
                        placeholder="Enter maximum number of guests allowed per invitee"
                        style={{ width: '100%', height: '40px', fontSize: '18px', marginTop: '10px' }}
                        min="1"
                    />
                </section>

                <button type="button" onClick={handleSaveAndPreview} style={{ backgroundColor: '#6c63ff', color: 'white', padding: '10px 20px', width: '100%' }}>
                    Save & Preview
                </button>
            </form>

            {/* Template Preview */}
            <div className="template-preview" style={{ width: '40%', textAlign: 'center' }}>
                {uploadedImage || selectedTemplate?.imageUrl ? (
                    <img
                        src={uploadedImage ? uploadedImage : selectedTemplate?.imageUrl}
                        alt={selectedTemplate?.name}
                        style={{ width: '500px', height: '500px', border: '2px solid #ccc', borderRadius: '10px' }}
                    />
                ) : (
                    <p>No image selected</p>
                )}
                <button
                    type="button"
                    onClick={openModal}
                    style={{
                        backgroundColor: '#6c63ff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Select from Library
                </button>
                <label
                    htmlFor="imageUpload"
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#f0f0f0',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Select my own image
                </label>
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
                {(uploadedImage || selectedTemplate) && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                            backgroundColor: '#ff4b4b',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        Remove Image
                    </button>
                )}
            </div>

            {/* Modal for Template Selection */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Select Invitation Template"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        position: 'absolute',
                        top: '150px',
                        left: '20%',
                        width: '60%',
                        height: '65%',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        overflow: 'auto',
                    },
                }}
            >
                <h2>Select a Template</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <button 
                        onClick={() => setApiType('pexels')} 
                        style={{
                            backgroundColor: '#FF6F61', 
                            color: 'white', 
                            padding: '15px 30px', 
                            fontSize: '16px', 
                            marginRight: '10px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            cursor: 'pointer',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Search Images
                    </button>
                    <button 
                        onClick={() => setApiType('giphy')} 
                        style={{
                            backgroundColor: '#6A5ACD', 
                            color: 'white', 
                            padding: '15px 30px', 
                            fontSize: '16px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            cursor: 'pointer',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Search GIFs
                    </button>
                </div>
                <form onSubmit={handleSearch} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search for ${apiType === 'pexels' ? 'images' : 'GIFs'}`}
                        style={{
                            padding: '10px',
                            width: '60%',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            marginRight: '10px',
                        }}
                    />
                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            padding: '12px 24px', 
                            fontSize: '16px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            cursor: 'pointer',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Search
                    </button>
                </form>

                <div className="template-selection-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {apiType === 'pexels' ? (
                        pexelsResults.map((result) => (
                            <div key={result.id} className="template-option" onClick={() => handleTemplateSelect(result.src.large)}>
                                <img src={result.src.medium} alt={result.alt} style={{ width: '100px', height: '100px', margin: '10px' }} />
                            </div>
                        ))
                    ) : (
                        giphyResults.map((gif) => (
                            <div key={gif.id} className="template-option" onClick={() => handleTemplateSelect(gif.images.original.url)}>
                                <img src={gif.images.fixed_height.url} alt={gif.title} style={{ width: '100px', height: '100px', margin: '10px' }} />
                            </div>
                        ))
                    )}
                </div>
                <button 
                    onClick={closeModal} 
                    style={{
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        padding: '15px 30px', 
                        fontSize: '16px', 
                        borderRadius: '8px', 
                        border: 'none', 
                        cursor: 'pointer',
                        marginTop: '20px',
                        display: 'block',
                        margin: '0 auto',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Close
                </button>

            </Modal>
        </div>
    );
};

export default EventCreation;
