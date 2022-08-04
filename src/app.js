import React from 'react';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/header';
import ProjectList from './components/project/project-list';
import Register from './components/auth/register';
import ProjectDetails from './components/project/project-details';
import Login from './components/auth/login';
import Condition from './components/auth/termsConditions';
import ProjectNew from './components/project/project-new';
import Home from './components/home/home';

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/termsAndConditions" element={<Condition />} />
        <Route path="/project/new" element={<ProjectNew />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
