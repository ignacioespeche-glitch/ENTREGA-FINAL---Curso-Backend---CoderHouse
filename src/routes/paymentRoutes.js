import express from "express";
import TicketModel from "../models/ticket.js";
import { sendSMS } from "../utils/sms.js";

const router = express.Router();

router.post("/webhook", async (req, res) => {
  console.log("Webhook recibido de Stripe");

  const event = req.body;

  console.log("Evento:", event.type);

  if (event.type === "payment_intent.succeeded") {
    console.log("Pago confirmado");

    const paymentIntent = event.data.object;

    const ticket = await TicketModel.create({
      code: Math.random().toString(36).substring(2, 10),
      amount: paymentIntent.amount / 100,
      purchaser: "cliente@example.com"
    });

    console.log("Ticket creado");

    await sendSMS(
      "+5492610000000",
      `Tu compra fue confirmada. Ticket: ${ticket.code}`
    );
  }

  res.status(200).send("ok");
});

export default router;