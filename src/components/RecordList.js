import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecordList = ({ records, selectedFields, handleDeleteRecord, handleEditRecord }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleEditClick = (index, record) => {
        setEditIndex(index);
        setEditFormData(record); // Set form data to the record being edited
    };

    const handleSaveClick = (index) => {
        handleEditRecord(index, editFormData); // Save the updated record
        setEditIndex(null); // Exit edit mode after saving
    };

    const handleFieldChange = (field, value) => {
        setEditFormData({ ...editFormData, [field]: value }); // Update form data on field change
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Invitee List</h2>

            {records.length === 0 ? (
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#888' }}>No invitees added yet.</p>
            ) : (
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#f7f7f7', color: '#333', textAlign: 'left' }}>
                            {selectedFields.map((field) => (
                                <th
                                    key={field}
                                    style={{
                                        padding: '12px',
                                        borderBottom: '2px solid #ddd',
                                        textTransform: 'capitalize',
                                        fontWeight: '600',
                                    }}
                                >
                                    {field}
                                </th>
                            ))}
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>RSVP Link</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {selectedFields.map((field) => (
                                    <td
                                        key={field}
                                        style={{
                                            padding: '12px',
                                            borderBottom: '1px solid #eee',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editFormData[field] || ''}
                                                onChange={(e) => handleFieldChange(field, e.target.value)}
                                                style={{
                                                    padding: '8px',
                                                    fontSize: '14px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #ddd',
                                                }}
                                            />
                                        ) : (
                                            record[field] || 'N/A' // Display N/A if the field is empty
                                        )}
                                    </td>
                                ))}

                                {/* Add the RSVP link column for each invitee, including the unique eventId */}
                                <td
                                    style={{
                                        borderBottom: '1px solid #eee',
                                        padding: '12px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Link
                                        to={`/rsvp/${record.eventId}`} // Attach the eventId to the RSVP URL
                                        style={{
                                            color: '#007bff',
                                            fontWeight: '600',
                                            textDecoration: 'underline',
                                            transition: 'color 0.3s ease',
                                        }}
                                        onMouseOver={(e) => (e.target.style.color = '#0056b3')}
                                        onMouseOut={(e) => (e.target.style.color = '#007bff')}
                                    >
                                        RSVP
                                    </Link>
                                </td>

                                <td
                                    style={{
                                        borderBottom: '1px solid #eee',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        padding: '12px',
                                    }}
                                >
                                    {editIndex === index ? (
                                        <button
                                            onClick={() => handleSaveClick(index)}
                                            style={{
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                padding: '10px 16px',
                                                fontSize: '14px',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEditClick(index, record)}
                                                style={{
                                                    backgroundColor: '#007bff',
                                                    color: 'white',
                                                    padding: '10px 16px',
                                                    fontSize: '14px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRecord(index)}
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    padding: '10px 16px',
                                                    fontSize: '14px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecordList;
