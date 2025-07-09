import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { foodDatabase } from "../data/foodDB";
import { saveTextFile } from "../utils/fileSaver";
import { FaPlus, FaDownload } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

export default function FoodLogger({ onCaloriesChange }) {
  const [foodLog, setFoodLog] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedLog = localStorage.getItem("foodLog");
    if (storedLog) setFoodLog(JSON.parse(storedLog));
  }, []);

  useEffect(() => {
    localStorage.setItem("foodLog", JSON.stringify(foodLog));
  }, [foodLog]);

  useEffect(() => {
    const total = foodLog.reduce((sum, food) => sum + food.calories, 0);
    onCaloriesChange(total);
  }, [foodLog, onCaloriesChange]);

  const filteredFoods = foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddFood = (food) => {
    const newEntry = { ...food, id: uuidv4() };
    setFoodLog((prev) => [...prev, newEntry]);
  };

  const handleClearLog = () => {
    setFoodLog([]);
    localStorage.removeItem("foodLog");
  };

  const handleSaveLog = () => {
    if (foodLog.length === 0) return alert("No food entries to save!");
    let content = "Calorie Chef Food Log\n\n";
    foodLog.forEach(({ name, calories, mealType }, i) => {
      content += `${i + 1}. ${name} (${calories} kcal) - ${mealType}\n`;
    });
    saveTextFile(content, `food_log_${new Date().toISOString().slice(0, 10)}.txt`);
  };

  const pieData = [
    { name: "Calories", value: foodLog.reduce((a, c) => a + c.calories, 0) },
    { name: "Remaining", value: Math.max(0, 2000 - foodLog.reduce((a, c) => a + c.calories, 0)) },
  ];

  return (
    <div className="card" aria-label="Food logger section">
      <h2 className="section-title">🧾 Food Logger</h2>

      <input
        type="search"
        placeholder="Search food..."
        aria-label="Search food"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "16px" }}
      />

      <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 16 }}>
        {filteredFoods.slice(0, 10).map((food) => (
          <div key={food.name} className="food-item" tabIndex={0}>
            <span>{food.name} ({food.calories} kcal)</span>
            <button
              onClick={() => handleAddFood(food)}
              aria-label={`Add ${food.name} to food log`}
              className="button"
              style={{ padding: "6px 14px", fontSize: "0.9rem" }}
            >
              <FaPlus className="icon" /> Add
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleClearLog}
        className="button"
        style={{ background: "#ef4444", marginBottom: 14, width: "100%" }}
        aria-label="Clear all food logs"
      >
        Clear Log
      </button>

      <button
        onClick={handleSaveLog}
        className="button"
        style={{ background: "#10b981", marginBottom: 20, width: "100%" }}
        aria-label="Save food log as text file"
      >
        <FaDownload className="icon" /> Save Log as Text File
      </button>

      <h3>Today's Food Log</h3>
      {foodLog.length === 0 ? (
        <p>No food logged yet. Start adding!</p>
      ) : (
        <ul className="food-log-list" style={{ listStyle: "none", padding: 0 }}>
          {foodLog.map(({ id, name, calories, mealType }) => (
            <li key={id} className="food-item" tabIndex={0}>
              {name} — {calories} kcal ({mealType})
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: 24 }}>Calorie Intake Chart</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            fill="#2563eb"
            paddingAngle={5}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
