// api/proxy.js
export default async function handler(req, res) {
  const bybitUrl =
    "https://api.bybit.com/v5/market/kline?category=linear&symbol=BTCUSDT&interval=15&limit=200";
  console.log("Fetching:", bybitUrl);

  try {
    const response = await fetch(bybitUrl);
    console.log("Response status:", response.status);

    // Log the content type header for debugging.
    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    // Check if response is OK
    if (!response.ok) {
      // Get the text response for debugging error details.
      const errorText = await response.text();
      console.error("Non-OK response:", errorText);
      return res
        .status(response.status)
        .json({ error: "Non-OK response", details: errorText });
    }

    // Check if the content type indicates JSON.
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Fetched JSON data:", data);
      return res.status(200).json(data);
    } else {
      // Response is not JSON. Log and return the text.
      const text = await response.text();
      console.error("Expected JSON but got HTML/text:", text);
      return res
        .status(500)
        .json({
          error: "Expected JSON but received non-JSON response",
          details: text,
        });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return res
      .status(500)
      .json({
        error: "Error fetching data from Bybit",
        details: error.message,
      });
  }
}
