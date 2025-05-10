import React from "react";
import { useLocation } from "react-router-dom";
import AnalysisResultPage from "../components/ResultPage/AnalysisResultPage";
import Navbar from "../components/nav/Navbar"; // ✅ 네비게이션 바 추가
import mockData from "../data/mockAnalysisData";

export default function ResultPage() {
    const location = useLocation();
    const resultData = location.state ?? mockData;

    return (
        <>
            <Navbar /> {/* ✅ 상단에 항상 고정될 내비게이션 */}
            <AnalysisResultPage data={resultData} />
        </>
    );
}
