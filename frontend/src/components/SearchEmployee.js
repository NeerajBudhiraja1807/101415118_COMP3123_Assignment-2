import React, { useState } from 'react';
import axios from 'axios';

const SearchEmployee = ({ setEmployees }) => {
    const [search, setSearch] = useState({ department: '', position: '' });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const query = new URLSearchParams(search).toString();
            const response = await axios.get(`http://localhost:3001/api/v1/emp/employees/search?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data); 
        } catch (error) {
            alert('Failed to search employees.');
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Department"
                value={search.department}
                onChange={(e) => setSearch({ ...search, department: e.target.value })}
            />
            <input
                type="text"
                placeholder="Position"
                value={search.position}
                onChange={(e) => setSearch({ ...search, position: e.target.value })}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchEmployee;
