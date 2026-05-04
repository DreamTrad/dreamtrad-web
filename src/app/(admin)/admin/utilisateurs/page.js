// app/admin/utilisateurs/page.js

import InviteUserForm from "./InviteUserForm";

export default function UtilisateursAdminPage() {

  return (
    <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-accent mb-4 text-2xl font-bold">
            Gestion des utilisateurs
        </h1>
        <InviteUserForm />
    </div>
  );
}
