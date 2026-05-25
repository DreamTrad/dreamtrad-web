"use client";

import { useEffect, useState } from "react";

export default function TransfersManager() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchTransfers = async () => {
    setLoading(true);

    const res = await fetch(
      "/api/admin/drive/pending-transfers"
    );

    const data = await res.json();

    setTransfers(data.transfers || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const acceptTransfer = async (fileId) => {
    setProcessing(true);

    await fetch("/api/admin/drive/accept-transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileId }),
    });

    await fetchTransfers();

    setProcessing(false);
  };

  const acceptAll = async () => {
    setProcessing(true);

    await fetch(
      "/api/admin/drive/accept-all-transfers",
      {
        method: "POST",
      }
    );

    await fetchTransfers();

    setProcessing(false);
  };

  return (
    <div className="bg-bg-secondary border-hover-tertiary rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          Transferts en attente
        </h2>

        <button
          onClick={acceptAll}
          disabled={processing || !transfers.length}
          className="bg-accent rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Tout accepter
        </button>
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {transfers.map((transfer) => (
            <div
              key={transfer.fileId}
              className="bg-bg-tertiary border-hover-tertiary flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {transfer.name}
                </span>

                <span className="text-text-tertiary text-sm">
                  {transfer.owner}
                </span>
              </div>

              <button
                onClick={() =>
                  acceptTransfer(transfer.fileId)
                }
                disabled={processing}
                className="bg-success rounded px-4 py-2 text-white"
              >
                Accepter
              </button>
            </div>
          ))}

          {!transfers.length && (
            <div className="text-text-tertiary text-sm">
              Aucun transfert en attente
            </div>
          )}
        </div>
      )}
    </div>
  );
}