import React, { useState } from "react";
import ProfileForm from "../ProfileForm";
import MealPlanner from "./MealPlanner";
import FoodLogger from "./FoodLogger";
import WellnessTips from "./WellnessTips";
import ProgressTracker from "./ProgressTracker";
import { FaUndo } from "react-icons/fa";

function AppContent() {
  const [calorieTarget, setCalorieTarget] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const resetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="container" role="main" aria-label="Calorie Chef Dashboard" style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      
      {/* Logo at the top */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <img
          src="/chef-logo.png"
          alt="Calorie Chef Logo"
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            objectFit: "contain",
          }}
        />
      </div>

      <h1 style={{ textAlign: "center", marginBottom: 30, userSelect: "none", fontWeight: "700", fontFamily: "'Poppins', sans-serif", color: "#333" }}>
        🍽 Calorie Chef Dashboard
      </h1>

      <button
        className="button"
        onClick={resetAll}
        aria-label="Reset all data and reload app"
        style={{ marginBottom: 20, display: "block", marginLeft: "auto", backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: "600", transition: "background-color 0.3s" }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#c0392b"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
      >
        <FaUndo className="icon" style={{ marginRight: 6 }} /> Reset All Data
      </button>

      {/* Pass correct prop name here */}
      <ProfileForm onCalorieCalculated={setCalorieTarget} />

      {calorieTarget && (
        <>
          <MealPlanner calorieTarget={calorieTarget} />
          <FoodLogger onCaloriesChange={setTotalCalories} />
          <WellnessTips calorieTarget={calorieTarget} totalCalories={totalCalories} />
          <ProgressTracker />
        </>
      )}
    </div>
  );
}

export default AppContent;
