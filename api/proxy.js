// export default async function handler(req, res) {
//   const bybitUrl =
//     "https://api.bybit.com/v5/market/kline?category=linear&symbol=BTCUSDT&interval=15&limit=200";
//   try {
//     const response = await fetch(bybitUrl);
//     const data = await response.json();
//     res.send({ data: "Fucking Shit" });
//   } catch (error) {
//     console.error("Proxy error:", error);
//     res.status(500).json({ error: "WTF???" });
//   }
// }
export default async function handler(req, res) {
  console.log("Simple test endpoint hit");
  res.status(200).json({ message: "Hello, world!" });
}
