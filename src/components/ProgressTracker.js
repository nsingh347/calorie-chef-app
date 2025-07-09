import React from "react";

function ProgressTracker({ calorieTarget, totalCalories }) {
  if (!calorieTarget) return null;

  const percentage = Math.min(
    100,
    Math.round((totalCalories / calorieTarget) * 100)
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Progress Tracker</h2>
      <p>
        You've consumed {totalCalories} kcal out of your target {calorieTarget} kcal.
      </p>
      <div
        style={{
          background: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
          height: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: "#4e9af1",
            height: "100%",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p>{percentage}% of your daily goal</p>
    </div>
  );
}

export default ProgressTracker;
