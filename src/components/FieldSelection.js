import React, { useState } from 'react';

const FieldSelection = ({ selectedFields, setSelectedFields }) => {
    // Assuming these are the fields you had
    const fields = [
        { label: 'Name', value: 'name' },
        { label: 'Surname', value: 'surname' },
        { label: 'Quantity', value: 'quantity' },
        { label: 'Mobile Number', value: 'mobileNumber' },
        { label: 'Email', value: 'email' },

      
    ];

    const handleCheckboxChange = (field) => {
        if (selectedFields.includes(field)) {
            setSelectedFields(selectedFields.filter(f => f !== field));
        } else {
            setSelectedFields([...selectedFields, field]);
        }
    };

    return (
        <div>
            <h3>Select Fields to Include in the Form</h3>
            {fields.map((field) => (
                <div key={field.value}>
                    <input
                        type="checkbox"
                        id={field.value}
                        checked={selectedFields.includes(field.value)}
                        onChange={() => handleCheckboxChange(field.value)}
                    />
                    <label htmlFor={field.value}>{field.label}</label>
                </div>
            ))}
        </div>
    );
};

export default FieldSelection;
