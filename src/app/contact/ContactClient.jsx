"use client";

import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import emailjs from "@emailjs/browser";

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    captcha: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCaptcha(form.captcha)) {
      setStatus("CAPTCHA incorrect");
      return;
    }

    emailjs
      .send(
        "service_ojinfwk",
        "template_wgl7rth",
        {
          name: form.name,
          email: form.email,
          title: form.title,
          message: form.message,
        },
        "4XQDzQMfhKf5nKZW9",
      )
      .then(() => {
        setStatus("Message envoyé");
        setForm({
          name: "",
          email: "",
          title: "",
          message: "",
          captcha: "",
        });
        loadCaptchaEnginge(6);
      })
      .catch(() => setStatus("Erreur, réessayez plus tard"));
  };

  return (
    <div className="p-2">
      <div className="bg-bg-tertiary mx-auto mb-8 max-w-2xl rounded-xl p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Contactez-nous par mail</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            className="bg-bg-secondary mb-2 w-full rounded-md p-2"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="bg-bg-secondary mb-2 w-full rounded-md p-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Sujet du mail"
            className="bg-bg-secondary mb-2 w-full rounded-md p-2"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Message"
            rows="5"
            className="bg-bg-secondary mb-2 w-full rounded-md p-2"
            value={form.message}
            onChange={handleChange}
            required
          />

          <LoadCanvasTemplate />

          <input
            type="text"
            placeholder="Entrez le code"
            className="bg-bg-secondary mt-2 w-full rounded-md p-2"
            value={form.captcha}
            onChange={handleChange}
            required
          />

          <button type="submit" className="bg-accent mt-2 rounded-lg px-4 py-2">
            Envoyer
          </button>
        </form>

        <p
          className={`mt-2 text-sm ${status.includes("Erreur") ? "text-red-500" : "text-green-500"}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
