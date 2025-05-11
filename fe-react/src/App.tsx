import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/ContractUploadPage";
import ResultPage from "./pages/ResultPage";
import MainPage from "./components/MainPage/MainPage"; // 결과 페이지 import

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
        </Router>
    );
}

export default App;
