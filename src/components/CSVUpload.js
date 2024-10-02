import React, { useState } from 'react';

const CSVUpload = ({ onFileUpload }) => {
    const [csvFile, setCsvFile] = useState(null);
    const [csvData, setCsvData] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
    };

    const handleRemoveFile = () => {
        setCsvFile(null);  // Clear the selected file
        setCsvData(null);   // Clear the parsed CSV data
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (csvFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvText = event.target.result;
                const parsedRecords = parseCSV(csvText);
                setCsvData(parsedRecords);  // Save parsed data to state
                onFileUpload(parsedRecords);  // Call the parent's upload handler to update records
            };
            reader.readAsText(csvFile);
        }
    };

    const parseCSV = (csvText) => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const records = lines.slice(1).map(line => {
            const values = line.split(',');
            const record = {};
            headers.forEach((header, index) => {
                record[header.trim()] = values[index]?.trim();
            });
            return record;
        });
        return records;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    name="csvFile" 
                    accept=".csv" 
                    onChange={handleFileChange}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        display: 'block',
                        margin: '10px 0',
                    }}
                />
                {csvFile && (
                    <div>
                        <p>Selected File: {csvFile.name}</p>
                        <button 
                            type="button" 
                            onClick={handleRemoveFile}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '14px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                marginRight: '20px', // Added margin to create gap
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                        >
                            Remove File
                        </button>
                        <button 
                            type="submit" 
                            disabled={!csvFile}
                            style={{
                                backgroundColor: csvFile ? '#28a745' : '#6c757d',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: csvFile ? 'pointer' : 'not-allowed',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => csvFile && (e.currentTarget.style.backgroundColor = '#218838')}
                            onMouseOut={(e) => csvFile && (e.currentTarget.style.backgroundColor = '#28a745')}
                        >
                            Upload CSV
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CSVUpload;
