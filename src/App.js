import React, { useState, useEffect } from "react";
import WelcomePage from "./components/WelcomePage";
import AppContent from "./components/AppContent";

function App() {
  const [profile, setProfile] = useState(null);

  // Load saved profile on app start
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Handle when user completes profile setup
  const handleProfileComplete = (profileData) => {
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setProfile(profileData);
  };

  return (
    <>
      {profile ? (
        <AppContent profile={profile} />
      ) : (
        // Pass the prop name `onLogin` as expected by WelcomePage
        <WelcomePage onLogin={handleProfileComplete} />
      )}
    </>
  );
}

export default App;
