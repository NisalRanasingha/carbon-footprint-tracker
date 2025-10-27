"use client";
import { useState, useEffect } from "react";
import { calculateCarbon } from "@/lib/utils"; // small util (see below)

export default function CalculatorPage() {
  const [form, setForm] = useState({
    travelMode: "car",
    distancePerDay: 10,
    electricityKwh: 200,
    dietType: "meat",
    householdSize: 1,
  });

  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleCalculate = (e) => {
    e?.preventDefault();
    // convert numeric fields
    const data = {
      ...form,
      distancePerDay: Number(form.distancePerDay),
      electricityKwh: Number(form.electricityKwh),
      householdSize: Number(form.householdSize),
    };
    const kgCO2 = calculateCarbon(data);
    setResult({ value: kgCO2, data });
    setMessage("");
  };

  const handleSave = async () => {
    if (!user) {
      setMessage("You must be logged in to save results. Please sign in or register.");
      return;
    }
    if (!result) {
      setMessage("Please calculate first before saving.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // include token if you use auth token
          // "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user.id,
          result: result.value,
          inputs: result.data,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to save");
      setMessage("Saved successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Save failed. Try again later.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLocally = () => {
    // option for guests: save locally
    const saved = JSON.parse(localStorage.getItem("guestResults") || "[]");
    saved.push({ result, createdAt: new Date().toISOString() });
    localStorage.setItem("guestResults", JSON.stringify(saved));
    setMessage("Saved locally in your browser (guest). Sign up to save in your account.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Carbon Footprint Calculator</h1>

      <form onSubmit={handleCalculate} className="space-y-4 bg-white p-6 rounded-lg shadow">
        {/* Travel */}
        <div>
          <label className="block text-sm font-medium mb-1">Travel Mode</label>
          <select name="travelMode" value={form.travelMode} onChange={handleChange}
                  className="w-full border p-2 rounded">
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="bike">Bike</option>
            <option value="walk">Walk</option>
            <option value="electricCar">Electric Car</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Distance per day (km)</label>
          <input name="distancePerDay" value={form.distancePerDay} onChange={handleChange} type="number"
                 className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Monthly Electricity (kWh)</label>
          <input name="electricityKwh" value={form.electricityKwh} onChange={handleChange} type="number"
                 className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Diet Type</label>
          <select name="dietType" value={form.dietType} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="meat">Meat-based</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Household Size</label>
          <input name="householdSize" value={form.householdSize} onChange={handleChange} type="number"
                 className="w-full border p-2 rounded" />
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Calculate</button>
          <button type="button" onClick={() => {
            setForm({
              travelMode: "car",
              distancePerDay: 10,
              electricityKwh: 200,
              dietType: "meat",
              householdSize: 1,
            });
            setResult(null);
            setMessage("");
          }} className="border px-4 py-2 rounded">Reset</button>
        </div>
      </form>

      {/* Result */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        {result ? (
          <div>
            <h2 className="text-xl font-semibold">Estimated emissions</h2>
            <p className="text-3xl font-bold text-green-700 my-2">{result.value.toFixed(2)} kg CO₂ / month</p>

            <div className="flex gap-3">
              {user ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save to my account"}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveLocally}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                  >
                    Save locally (guest)
                  </button>
                  <a href="/register" className="inline-block bg-green-600 text-white px-4 py-2 rounded">
                    Sign up to save
                  </a>
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No calculation yet — enter your details and click Calculate.</p>
        )}

        {message && <p className="mt-4 text-sm text-indigo-700">{message}</p>}
      </div>
    </div>
  );
}
