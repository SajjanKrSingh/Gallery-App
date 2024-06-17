import React, { useState } from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Gallery from "../src/Components/Gallery";
import UploadForm from "../src/Components/UploadForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/upload" element={<UploadForm />} />
      </Routes>
    </Router>
  );
};

export default App;
