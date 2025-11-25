import { useState, useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import emailjs from "@emailjs/browser";
import MetaTags from "../components/MetaTags";
import MarkdownSection from "../components/ui/MarkdownSection";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    captcha: "",
  });
  const [status, setStatus] = useState("");
  const file = "../../data/contact-global";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCaptcha(form.captcha)) {
      setStatus("CAPTCHA incorrect");
      return;
    }

    const templateParams = {
      name: form.name,
      email: form.email,
      title: form.title,
      message: form.message,
    };

    emailjs
      .send(
        "service_ojinfwk",
        "template_wgl7rth",
        templateParams,
        "4XQDzQMfhKf5nKZW9",
      )
      .then(() => {
        setStatus("Message envoyé");
        setForm({ name: "", email: "", title: "", message: "", captcha: "" }); // reset form
        loadCaptchaEnginge(6); // reload new captcha
      })
      .catch(() => setStatus("Erreur, réessayez plus tard"));
  };

  // helper to localize validation messages
  const handleInvalid = (e) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity("Ce champ est requis");
    } else if (e.target.type === "email" && e.target.validity.typeMismatch) {
      e.target.setCustomValidity("Veuillez entrer une adresse e-mail valide");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleInput = (e) => e.target.setCustomValidity("");

  return (
    <>
      <MetaTags
        title="Contact"
        description="Envoyez-nous un message."
        url="contact"
      />
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-accent mb-8 text-center text-3xl font-bold">
          Contact
        </h1>
        <div className="mt-16">
          <MarkdownSection
            file={file}
            className="text-justify leading-relaxed"
          />
        </div>
      </div>
      <div className="p-2">
        <div className="bg-bg-tertiary text-text mx-auto mb-8 max-w-2xl rounded-xl p-6 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Contactez-nous par mail</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom"
              className="bg-bg-secondary mb-2 w-full rounded-md p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onInvalid={handleInvalid}
              onInput={handleInput}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-bg-secondary mb-2 w-full rounded-md p-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onInvalid={handleInvalid}
              onInput={handleInput}
              required
            />
            <input
              type="text"
              placeholder="Sujet du mail"
              className="bg-bg-secondary mb-2 w-full rounded-md p-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              onInvalid={handleInvalid}
              onInput={handleInput}
              required
            />
            <textarea
              placeholder="Message"
              rows="5"
              className="bg-bg-secondary mb-2 w-full rounded-md p-2"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onInvalid={handleInvalid}
              onInput={handleInput}
              required
            />
            <div className="mb-2">
              <LoadCanvasTemplate
                reloadText="Recharger le captcha"
                reloadColor="var(--color-accent-secondary)"
              />
              <input
                type="text"
                placeholder="Entrez le code"
                className="bg-bg-secondary mt-2 w-full rounded-md p-2"
                value={form.captcha}
                onChange={(e) => setForm({ ...form, captcha: e.target.value })}
                onInvalid={handleInvalid}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-accent hover:bg-accent/80 text-text mt-2 rounded-lg px-4 py-2"
            >
              Envoyer
            </button>
          </form>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </div>
      </div>
    </>
  );
}
