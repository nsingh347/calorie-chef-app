import React, { useState, useEffect } from "react";
import {
  FaCoffee,
  FaAppleAlt,
  FaHamburger,
  FaLeaf,
  FaCarrot,
} from "react-icons/fa";

const vegetarianMeals = [
  {
    mealType: "Breakfast",
    icon: <FaCoffee />,
    dishes: [
      "Oatmeal with berries and honey",
      "Avocado toast with tomatoes",
      "Greek yogurt with granola",
      "Vegetable omelette",
      "Smoothie bowl with fruits and nuts",
      "Chia pudding with almond milk",
    ],
  },
  {
    mealType: "Lunch",
    icon: <FaLeaf />,
    dishes: [
      "Quinoa salad with roasted veggies",
      "Paneer tikka wrap",
      "Lentil soup with bread",
      "Veggie stir fry with tofu",
      "Chickpea curry with rice",
      "Caprese salad",
    ],
  },
  {
    mealType: "Dinner",
    icon: <FaCarrot />,
    dishes: [
      "Vegetable lasagna",
      "Stuffed bell peppers",
      "Grilled vegetable kebabs",
      "Palak paneer with naan",
      "Mushroom risotto",
      "Veggie burger with sweet potato fries",
    ],
  },
  {
    mealType: "Snacks",
    icon: <FaAppleAlt />,
    dishes: [
      "Hummus with carrot sticks",
      "Roasted chickpeas",
      "Fruit salad",
      "Trail mix",
      "Yogurt parfait",
      "Baked kale chips",
    ],
  },
];

const nonVegetarianMeals = [
  {
    mealType: "Breakfast",
    icon: <FaCoffee />,
    dishes: [
      "Scrambled eggs with spinach",
      "Chicken sausage with toast",
      "Smoked salmon bagel",
      "Egg muffins",
      "Bacon and eggs",
      "Chicken breakfast burrito",
    ],
  },
  {
    mealType: "Lunch",
    icon: <FaHamburger />,
    dishes: [
      "Grilled chicken salad",
      "Turkey sandwich",
      "Beef stir fry with veggies",
      "Tuna pasta salad",
      "Chicken curry with rice",
      "Shrimp tacos",
    ],
  },
  {
    mealType: "Dinner",
    icon: <FaCarrot />,
    dishes: [
      "Grilled salmon with quinoa",
      "Steak with roasted potatoes",
      "Chicken Alfredo pasta",
      "Lamb chops with veggies",
      "Fish curry",
      "BBQ chicken wings",
    ],
  },
  {
    mealType: "Snacks",
    icon: <FaAppleAlt />,
    dishes: [
      "Beef jerky",
      "Deviled eggs",
      "Chicken skewers",
      "Tuna salad cups",
      "Shrimp cocktail",
      "Hard-boiled eggs",
    ],
  },
];

export default function MealPlanner({ calorieTarget }) {
  const [dietType, setDietType] = useState("vegetarian");
  const [dailyPlan, setDailyPlan] = useState({});

  useEffect(() => {
    generateMealPlan(dietType);
  }, [dietType]);

  function generateMealPlan(type) {
    const meals = type === "vegetarian" ? vegetarianMeals : nonVegetarianMeals;
    const plan = {};
    meals.forEach(({ mealType, dishes, icon }) => {
      const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
      plan[mealType] = { dish: randomDish, icon };
    });
    setDailyPlan(plan);
  }

  return (
    <div className="card" aria-label="Meal planner section">
      <h2 className="section-title">🍽 Meal Planner</h2>

      <label
        htmlFor="diet-select"
        style={{ fontWeight: 600, marginBottom: 8, display: "block" }}
      >
        Choose your diet type:
      </label>
      <select
        id="diet-select"
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
        aria-label="Select diet type"
        style={{ marginBottom: 20 }}
      >
        <option value="vegetarian">Vegetarian</option>
        <option value="non-vegetarian">Non-Vegetarian</option>
      </select>

      <p style={{ fontWeight: "600", marginBottom: 16 }}>
        Your estimated daily calorie target:{" "}
        <span style={{ color: "#3b82f6" }}>{calorieTarget} kcal</span>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 20,
        }}
      >
        {Object.entries(dailyPlan).map(([meal, { dish, icon }]) => (
          <div
            key={meal}
            style={{
              background: "#e0e7ff",
              borderRadius: 18,
              padding: 20,
              textAlign: "center",
              fontWeight: 600,
              color: "#1e293b",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.15)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 36px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.15)";
            }}
            tabIndex={0}
            aria-label={`${meal} meal suggestion: ${dish}`}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 10, color: "#2563eb" }}>
              {icon}
            </div>
            <h3>{meal}</h3>
            <p>{dish}</p>
          </div>
        ))}
      </div>

      <button
        className="button"
        style={{ marginTop: 30, width: "100%" }}
        onClick={() => generateMealPlan(dietType)}
        aria-label="Generate new meal plan"
      >
        Generate New Plan
      </button>
    </div>
  );
}
