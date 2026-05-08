import TransfersManager from "./TransfersManager";

export default function DrivePage() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-accent mb-6 text-2xl font-bold">
        Gestion liés à Google Drive
      </h1>

      <TransfersManager />
    </div>
  );
}