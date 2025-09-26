import { useState, useEffect } from "react";

/**
 * Hook générique pour fetcher des données avec loader et erreur
 * @param {string} url URL à fetcher
 * @param {any} initialValue valeur initiale pour `data`
 */
export default function useFetchWithLoader(url, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
