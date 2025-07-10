import React from "react";

function WellnessTips({ calorieTarget, totalCalories }) {
  if (!calorieTarget) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Wellness Tips</h2>
      <ul>
        <li>Stay hydrated: Drink at least 8 glasses of water.</li>
        <li>Get at least 7-8 hours of sleep.</li>
        <li>Try to include a variety of foods for balanced nutrition.</li>
        <li>Stay active with regular exercise.</li>
        <li>Don’t skip meals; maintain consistent eating times.</li>
      </ul>
    </div>
  );
}

export default WellnessTips;
