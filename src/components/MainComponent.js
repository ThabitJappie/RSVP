import React, { useState, useEffect } from 'react'; 
import FieldSelection from './FieldSelection';
import CSVUpload from './CSVUpload';
import { generateCSVTemplate } from '../utils/generateCSVTemplate';
import RecordList from './RecordList';
import { useLocation } from 'react-router-dom'; // To receive state from EventPreview

const MainComponent = () => {
    const [selectedFields, setSelectedFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [records, setRecords] = useState([]);
    const location = useLocation(); // Get eventDetails from location.state
    const [eventDetails, setEventDetails] = useState(null); // Store event data

    // Fetch eventDetails from location.state
    useEffect(() => {
        if (location.state && location.state.eventDetails) {
            setEventDetails(location.state.eventDetails); // Set eventDetails from location.state
        }
    }, [location.state]);

    const handleCSVUpload = (uploadedRecords) => {
        setRecords([...records, ...uploadedRecords]);
    };

    const handleFieldChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add event details to formData and submit it
        const updatedFormData = {
            ...formData,
            eventId: eventDetails?.eventId, // Include eventId in the records
            eventName: eventDetails?.eventName, // Pass event name, etc.
        };

        setRecords([...records, updatedFormData]);
        setFormData({}); // Clear form data after submission
    };

    const handleReset = () => {
        setRecords([]); // Clear all records
    };

    const handleDeleteRecord = (indexToDelete) => {
        setRecords(records.filter((_, index) => index !== indexToDelete)); // Delete specific record
    };

    const handleEditRecord = (indexToEdit, updatedRecord) => {
        const updatedRecords = records.map((record, index) => {
            if (index === indexToEdit) {
                return updatedRecord; // Update the specific record
            }
            return record;
        });
        setRecords(updatedRecords);
    };

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <h1>Add Invitees for {eventDetails?.eventName || 'Event'}</h1> {/* Display event name */}
                <FieldSelection
                    selectedFields={selectedFields}
                    setSelectedFields={setSelectedFields}
                />
                <button 
                    onClick={() => generateCSVTemplate(selectedFields)} 
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
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff3b2f'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF6F61'}
                >
                    Download CSV Template
                </button>
                <CSVUpload onFileUpload={handleCSVUpload} />
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    {selectedFields.includes('quantity') && (
                        <input
                            type="number"
                            value={formData.quantity || ''}
                            onChange={(e) => handleFieldChange('quantity', e.target.value)}
                            placeholder="Quantity"
                            min="1"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                marginBottom: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />
                    )}
                    {selectedFields.map((field) => (
                        field !== 'quantity' && (
                            <input
                                key={field}
                                type="text"
                                value={formData[field] || ''}
                                onChange={(e) => handleFieldChange(field, e.target.value)}
                                placeholder={field}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    marginBottom: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        )
                    ))}
                    <div style={{ marginTop: '20px' }}>
                        <button 
                            type="Submit"
                            style={{
                                backgroundColor: '#28a745',
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
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                        >
                            Add
                        </button>
                        <button 
                            type="button" 
                            onClick={handleReset} 
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '15px 30px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                        >
                            Reset Records
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ flex: 1 }}>
                <RecordList
                    records={records}
                    selectedFields={selectedFields}
                    handleDeleteRecord={handleDeleteRecord}
                    handleEditRecord={handleEditRecord}
                    eventDetails={eventDetails} // Pass eventDetails to RecordList
                />
            </div>
        </div>
    );
};

export default MainComponent;
