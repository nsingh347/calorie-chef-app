import React, { useState, useEffect } from "react";

function ProfileForm({ onCalorieCalculated }) {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activityLevel: "sedentary",
    goal: "maintain",
  });

  const [calorieTarget, setCalorieTarget] = useState(null);

  useEffect(() => {
    const { age, weight, height, gender, activityLevel, goal } = form;
    if (!age || !weight || !height) {
      setCalorieTarget(null);
      onCalorieCalculated(null);
      return;
    }

    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      lightly: 1.375,
      moderately: 1.55,
      very: 1.725,
      extra: 1.9,
    };

    let calories = bmr * (activityMultipliers[activityLevel] || 1.2);

    if (goal === "lose") calories -= 500;
    else if (goal === "gain") calories += 500;

    const roundedCalories = Math.round(calories);
    setCalorieTarget(roundedCalories);
    onCalorieCalculated(roundedCalories);
  }, [form, onCalorieCalculated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: "20px" }}>
      <h2>Profile Setup</h2>

      <label>
        Age:
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Weight (kg):
        <input
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Height (cm):
        <input
          name="height"
          type="number"
          value={form.height}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Activity Level:
        <select name="activityLevel" value={form.activityLevel} onChange={handleChange}>
          <option value="sedentary">Sedentary</option>
          <option value="lightly">Lightly Active</option>
          <option value="moderately">Moderately Active</option>
          <option value="very">Very Active</option>
          <option value="extra">Extra Active</option>
        </select>
      </label>
      <br />
      <label>
        Goal:
        <select name="goal" value={form.goal} onChange={handleChange}>
          <option value="maintain">Maintain Weight</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </label>
      <br />
      <p>
        Estimated daily calorie target: <strong>{calorieTarget ?? "N/A"}</strong>
      </p>
    </form>
  );
}

export default ProfileForm;
