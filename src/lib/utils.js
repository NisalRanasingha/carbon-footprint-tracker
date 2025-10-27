// lib/utils.js
export function calculateCarbon({ travelMode, distancePerDay, electricityKwh, dietType, householdSize }) {
  // simple emission factors (kg CO2)
  const travelFactors = {
    car: 0.21,         // per km
    bus: 0.05,
    bike: 0,
    walk: 0,
    electricCar: 0.06,
  };

  const dietFactors = {
    meat: 7.0,         // per meal/week estimate contribution -> simplified
    vegetarian: 3.5,
    vegan: 2.0,
  };

  // monthly travel emissions (distancePerDay * 30 days)
  const monthlyTravel = (Number(distancePerDay) * 30) * (travelFactors[travelMode] || 0);

  // electricity emissions: assume 0.5 kg CO2 per kWh (adjust by your country).
  const monthlyElectricity = Number(electricityKwh) * 0.5;

  // diet: simplified: diet factor per week -> monthly estimate
  const monthlyDiet = (dietFactors[dietType] || 0) * 4; // approximate

  // divide household electricity by household members (optional)
  const perPersonElectricity = monthlyElectricity / Math.max(1, Number(householdSize));

  const totalKgCO2 = monthlyTravel + perPersonElectricity + monthlyDiet;
  return totalKgCO2;
}
