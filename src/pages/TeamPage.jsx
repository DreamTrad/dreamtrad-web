import { useEffect, useState } from "react";
import TeamMemberCard from "../components/game/TeamMemberCard";

export default function TeamPage() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("/data/team.json")
            .then((res) => res.json())
            .then((data) => setTeam(data))
            .catch((err) => console.error("Erreur chargement équipe :", err));
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-accent mb-8 text-center">
                Notre Équipe
            </h1>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-1">
                {team.map((member) => (
                    <TeamMemberCard key={member.id} {...member} />
                ))}
            </div>

        </div>
    );
}
