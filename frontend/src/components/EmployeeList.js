import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchEmployee from './SearchEmployee';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]); // State to store employee data

    // Fetch employees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch all employees from the backend
    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await axios.get('http://localhost:3001/api/v1/emp/employees', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data); // Update state with employee data
        } catch (error) {
            alert('Failed to fetch employees.');
        }
    };

    // Delete an employee by ID
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            await axios.delete(`http://localhost:3001/api/v1/emp/employees?eid=${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Employee deleted!');
            fetchEmployees(); // Refresh employee list
        } catch (error) {
            alert('Failed to delete employee.');
        }
    };

    // Inline styles
    const styles = {
        container: {
            maxWidth: '800px',
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
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            textAlign: 'left',
            padding: '10px',
            borderBottom: '2px solid #ddd',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        actions: {
            display: 'flex',
            gap: '10px',
        },
        noEmployees: {
            textAlign: 'center',
            padding: '20px',
            fontStyle: 'italic',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Employee List</h1>

            {/* Link to Add Employee page */}
            <Link to="/employees/add">
                <button
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add Employee
                </button>
            </Link>

            {/* Search Employee Component */}
            <SearchEmployee setEmployees={setEmployees} />

            {/* Employee Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Position</th>
                        <th style={styles.th}>Department</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <tr key={emp._id}>
                                <td style={styles.td}>
                                    {emp.first_name} {emp.last_name}
                                </td>
                                <td style={styles.td}>{emp.position}</td>
                                <td style={styles.td}>{emp.department}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        {/* Link to Edit Employee page */}
                                        <Link to={`/employees/edit/${emp._id}`}>
                                            <button
                                                style={styles.button}
                                                onMouseOver={(e) =>
                                                    (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
                                                }
                                                onMouseOut={(e) =>
                                                    (e.target.style.backgroundColor = styles.button.backgroundColor)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </Link>

                                        {/* Delete Employee Button */}
                                        <button
                                            style={styles.button}
                                            onMouseOver={(e) =>
                                                (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
                                            }
                                            onMouseOut={(e) =>
                                                (e.target.style.backgroundColor = styles.button.backgroundColor)
                                            }
                                            onClick={() => handleDelete(emp._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={styles.noEmployees}>
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
