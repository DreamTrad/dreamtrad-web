import TeamRoleCategory from "./TeamRoleCategory";

export default function TeamRoleSection({ data }) {
  return (
<>
    <h2 className="text-2xl font-bold text-accent mb-4 text-center">L’équipe ayant travaillé sur le patch</h2>
    <p className="text-justify">Si une information est incorrecte, ou manquante, ou que vous souhaitez transmettre un lien vers un réseau ou site internet en lien avec vous qui sera affiché à côté de votre pseudo, n’hésitez pas à nous contacter !</p>
    <br></br>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {data
        .filter((cat) => cat.people && cat.people.length > 0)
        .map((cat, idx) => (
          <TeamRoleCategory key={idx} category={cat} />
        ))}
    </div>
  </>
  );
}
