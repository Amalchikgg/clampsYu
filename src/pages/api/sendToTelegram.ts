import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { name, phone } = req.body;

    const token = "8113757758:AAEE1Iney-VpfLKkxc6lSEd0bFvNU78uGZA";
    const chat_id = "229432828";
    const text = `Имя: ${name}\nТелефон: ${phone}`;

    try {
      const telegramRes = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: text,
          }),
        }
      );

      const data = await telegramRes.json();

      if (data.ok) {
        res.status(200).json({ message: "Сообщение успешно отправлено!" });
      } else {
        res
          .status(500)
          .json({ error: "Ошибка отправки сообщения в Telegram." });
      }
    } catch (error) {
      res.status(500).json({ error: "Ошибка: " + (error as Error).message });
    }
  } else {
    res.status(405).json({ message: "Метод не разрешен." });
  }
}
