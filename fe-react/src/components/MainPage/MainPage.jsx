import React from "react";
import HeroSection from "./HeroSection";
import FeatureCards from "./FeatureCards";
import UploadSection from "./UploadSection";
import ResultSection from "./ResultSection";
import TrustBanner from "./TrustBanner";
import FinalCTA from "./FinalCTA";
import "../../styles/MainPage.css";
import Navbar from "../nav/Navbar";
export default function MainPage() {
    return (
        <div className="main-container">
            <Navbar/>
            <HeroSection />
            <FeatureCards />
            <UploadSection />
            <ResultSection />
            <TrustBanner />
            <FinalCTA />
        </div>
    );
}
