import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Autocomplete } from '@react-google-maps/api';

const DynamicForm = ({ selectedFields, formData, handleFieldChange }) => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleLocationSelect = (autocomplete) => {
        const place = autocomplete.getPlace();
        setLocation(place.formatted_address || '');
        handleFieldChange('location', place.formatted_address || '');
    };

    return (
        <div>
            <form>
                {selectedFields.includes('location') && (
                    <Autocomplete onLoad={(autocomplete) => handleLocationSelect(autocomplete)}>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                        />
                    </Autocomplete>
                )}

                {selectedFields.includes('date') && (
                    <DatePicker
                        selected={date}
                        onChange={(date) => {
                            setDate(date);
                            handleFieldChange('date', date);
                        }}
                        placeholderText="Select a date"
                    />
                )}

                {selectedFields.includes('startTime') && (
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            handleFieldChange('startTime', e.target.value);
                        }}
                        placeholder="Start Time"
                    />
                )}

                {selectedFields.includes('endTime') && (
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => {
                            setEndTime(e.target.value);
                            handleFieldChange('endTime', e.target.value);
                        }}
                        placeholder="End Time"
                    />
                )}

                {selectedFields.includes('quantity') && (
                    <input
                        type="number"
                        value={formData.quantity || ''}
                        onChange={(e) => handleFieldChange('quantity', e.target.value)}
                        placeholder="Quantity"
                        min="1"
                    />
                )}

                {selectedFields.map(field => (
                    field !== 'location' && field !== 'date' && field !== 'startTime' && field !== 'endTime' && field !== 'quantity' && (
                        <input
                            key={field}
                            type="text"
                            value={formData[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            placeholder={field}
                        />
                    )
                ))}
            </form>
        </div>
    );
};

export default DynamicForm;
