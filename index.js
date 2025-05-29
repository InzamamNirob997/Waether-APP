async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "a7948dcf6d8342bd87370111252905"; // Your actual API key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const weatherBox = document.getElementById("weatherBox");
    const conditionText = data.current.condition.text.toLowerCase();

    // Remove any previous weather classes
    weatherBox.className = "weather";

    // Assign class based on condition keywords
    if (conditionText.includes("sun") || conditionText.includes("clear")) {
      weatherBox.classList.add("sunny");
    } else if (conditionText.includes("rain") || conditionText.includes("drizzle") || conditionText.includes("thunder")) {
      weatherBox.classList.add("rainy");
    } else if (conditionText.includes("cloud") || conditionText.includes("overcast")) {
      weatherBox.classList.add("cloudy");
    } else if (conditionText.includes("snow") || conditionText.includes("sleet") || conditionText.includes("blizzard")) {
      weatherBox.classList.add("snowy");
    } else {
      // Default background if no match
      weatherBox.style.backgroundColor = "#f0f0f0";
      weatherBox.style.color = "#333";
    }

    document.getElementById("weatherBox").style.display = "block";
    document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById("condition").textContent = data.current.condition.text;
    document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;
  } catch (error) {
    alert("Error: " + error.message);
    document.getElementById("weatherBox").style.display = "none";
  }
}
