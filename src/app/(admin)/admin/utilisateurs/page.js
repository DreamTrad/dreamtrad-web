// app/admin/utilisateurs/page.js

import InviteUserForm from "./InviteUserForm";
import UsersManager from "./UsersManager";

export default function UtilisateursAdminPage() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-accent mb-6 text-2xl font-bold">
        Gestion des utilisateurs
      </h1>

      <div className="mb-10">
        <InviteUserForm />
      </div>

      <UsersManager />
    </div>
  );
}