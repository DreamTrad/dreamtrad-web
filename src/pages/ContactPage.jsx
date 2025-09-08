import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: form.name,
      email: form.email,
      title: form.title,
      message: form.message,
    };

    emailjs
      .send(
        "service_ojinfwk",      // ID de service
        "template_wgl7rth",     // ID du template
        templateParams,         // variables envoyées
        "4XQDzQMfhKf5nKZW9"     // clé publique
      )
      .then(() => setStatus("Message envoyé"))
      .catch(() => setStatus("Erreur, réessayez plus tard"));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-bg-tertiary rounded-xl shadow-lg text-text">
      <h1 className="text-2xl font-bold mb-4">Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          className="w-full p-2 rounded-md bg-bg-secondary mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-md bg-bg-secondary mb-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Sujet du mail"
          className="w-full p-2 rounded-md bg-bg-secondary mb-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          rows="5"
          className="w-full p-2 rounded-md bg-bg-secondary mb-2"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80"
        >
          Envoyer
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
