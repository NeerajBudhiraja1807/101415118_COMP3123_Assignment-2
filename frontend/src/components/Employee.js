import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ name: '', department: '', position: '', salary: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/api/v1/employees', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data);
        } catch (error) {
            alert('Failed to fetch employees.');
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/v1/employees', form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Employee added successfully!');
            fetchEmployees(); // Refresh employee list
            setForm({ name: '', department: '', position: '', salary: '' }); // Clear form
        } catch (error) {
            alert('Failed to add employee.');
        }
    };

    return (
        <div>
            <h1>Employee Management</h1>

            {/* Add Employee Form */}
            <form onSubmit={handleAddEmployee}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
                <button type="submit">Add Employee</button>
            </form>

            {/* Employee Table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;
