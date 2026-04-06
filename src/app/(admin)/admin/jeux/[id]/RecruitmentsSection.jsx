import { supabase } from "@/lib/supabase/client";
import RecruitmentForm from "./RecruitmentForm";

export default function RecruitmentsSection({ recruitments }) {
  const save = async (type, data) => {
  const { data: result, error } = await supabase
    .from("project_recruitments")
    .update({
      title: data.title,
      roles: data.roles,
      contact: data.contact,
      description: data.description,
      is_active: data.is_active,
    })
    .eq("id", data.id)
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return result;
};



  return (
    <div className="grid grid-cols-2 gap-6">
      <RecruitmentForm
        label="Recrutement projet"
        data={recruitments.project}
        onSave={(data) => save("project", data)}
      />

      <RecruitmentForm
        label="Recrutement site"
        data={recruitments.other}
        onSave={(data) => save("other", data)}
      />
    </div>
  );
}
