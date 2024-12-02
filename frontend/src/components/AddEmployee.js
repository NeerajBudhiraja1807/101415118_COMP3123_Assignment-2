import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        department: '',
        date_of_joining: '',
    });

    const navigate = useNavigate();

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/v1/emp/employees', form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Employee added successfully!');
            navigate('/employees');
        } catch (error) {
            alert('Failed to add employee.');
        }
    };

    // Inline styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Add Employee</h1>
            <form onSubmit={handleAddEmployee}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        style={styles.input}
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Position</label>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Position"
                        value={form.position}
                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Salary</label>
                    <input
                        type="number"
                        style={styles.input}
                        placeholder="Salary"
                        value={form.salary}
                        onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Department</label>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Date of Joining</label>
                    <input
                        type="date"
                        style={styles.input}
                        value={form.date_of_joining}
                        onChange={(e) => setForm({ ...form, date_of_joining: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
