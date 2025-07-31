import express from "express";
import { OpenAI } from "openai";
import { ProductModel } from "../Models/Product.js"; // אל תשכח לוודא שהנתיב מדויק

console.log('--- In Rag.js (before creating OpenAI client) ---');
console.log('The value of OPENAI_API_KEY is:', process.env.OPENAI_API_KEY);
console.log('-------------------------------------------------');
const router = express.Router();
const openai = new OpenAI({ apiKey:process.env.OPENAI_API_KEY});



router.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const results = await ProductModel.find({
      $text: { $search: question }
    }).limit(3);

    const context = results.map(p => `
🪑 שם: ${p.prodName}
תיאור: ${p.description}
מחיר: ${p.price}
`).join("\n---\n");

    const prompt = `
לקוח שאל: "${question}"
הנה מידע על מוצרים רלוונטיים:
${context}
ענה תשובה שירותית וקצרה.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error("RAG ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
