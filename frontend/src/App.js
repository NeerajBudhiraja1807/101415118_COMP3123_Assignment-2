import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/employees/edit/:id" element={<EditEmployee />} />
            </Routes>
        </Router>
    );
};

export default App;
