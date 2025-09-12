export default function RecruitmentCard({ title, image, roles, contact, description }) {
  return (
    <div className="bg-bg-tertiary rounded-2xl shadow-lg overflow-hidden border border-bg-secondary flex flex-col w-full max-w-7xl">
      {/* Title */}
      <div className="bg-bg-secondary px-6 py-3">
        <h3 className="text-xl font-bold text-accent">{title}</h3>
      </div>

      {/* Middle: image + roles */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-60 lg:w-72">
          <img
            src={image}
            alt={`Affiche de ${title}`}
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
        </div>

        {/* Rôles / contenu */}
        <div className="flex-1 bg-bg-secondary rounded-md p-4">
          <h4 className="text-lg font-semibold mb-2">Nous recrutons :</h4>
          <ul className="list-disc list-inside space-y-1 text-text-secondary">
            {roles.map((role, idx) => (
              <li key={idx}>{role}</li>
            ))}
          </ul>
        </div>
      </div>




      {/* Contact */}
      {contact && (
        <div className="bg-bg-secondary px-4 py-2 text-text-secondary text-sm">
          <span className="font-semibold text-accent">Contact du projet sur Discord :</span> {contact}
        </div>
      )}

      {/* Description */}
      <div className="bg-bg-secondary p-4 rounded-b-2xl text-text-secondary text-sm flex-grow text-justify">
        {description}
      </div>
    </div>
  );
}
