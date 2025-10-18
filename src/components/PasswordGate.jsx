import { useEffect, useState } from "react";

/**
 * PasswordGate
 * Props:
 *  - storedHash: SHA-256 hex string of the correct password
 *  - children: app content to reveal after correct password
 *  - storageKey: localStorage key used to remember access
 */
export default function PasswordGate({
  storedHash = "9e030b92dbdf627234345fadec73adf8fa6f004f88e727f568557504fedf5e0b",
  children,
  storageKey = "access_granted_v1",
}) {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check stored flag on mount
    const ok = localStorage.getItem(storageKey);
    if (ok === "true") setAccessGranted(true);
  }, [storageKey]);

  // Convert string to SHA-256 hex
  async function sha256Hex(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    setError("");
    try {
      const h = await sha256Hex(password);
      if (h === storedHash) {
        localStorage.setItem(storageKey, "true");
        setAccessGranted(true);
        setPassword("");
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem(storageKey);
    // keep user on page but locked again
    setAccessGranted(false);
  }

  if (accessGranted) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-primary z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-bg-secondary p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4 text-accent">Accès restreint</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-2 rounded-md mb-3 text-white"
        />

        {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-accent text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Entrer
          </button>
          <button
            type="button"
            onClick={() => setPassword("")}
            className="px-4 py-2 rounded-md border border-bg-primary text-white"
          >
            Effacer
          </button>
        </div>
      </form>
    </div>
  );
}
