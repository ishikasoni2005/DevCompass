import { useEffect, useState } from "react";

import Button from "../components/Button";
import SectionCard from "../components/SectionCard";
import { useAuth } from "../context/AuthContext";


export default function ProfilePage() {
  const { user, saveProfile } = useAuth();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        career_goal: user.career_goal || "",
        experience_level: user.experience_level || "beginner",
        skills: (user.skills || []).join(", "),
        bio: user.bio || "",
        github_username: user.github_username || "",
        leetcode_username: user.leetcode_username || "",
        codeforces_username: user.codeforces_username || "",
      });
    }
  }, [user]);

  if (!form) {
    return <p className="text-sm text-slate-400">Loading profile...</p>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await saveProfile({
        ...form,
        skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      });
    } catch {
      setMessage("Unable to update profile.");
      setSaving(false);
      return;
    }
    setSaving(false);
    setMessage("Profile updated.");
  };

  const statusTone = message === "Profile updated." ? "text-emerald-200" : "text-ember-200";

  return (
    <SectionCard title="Profile" subtitle="Manage your role target, skill tags, and coding handles.">
      <form className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Career goal</span>
          <input
            type="text"
            value={form.career_goal}
            onChange={(event) => setForm((current) => ({ ...current, career_goal: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Experience level</span>
          <select
            value={form.experience_level}
            onChange={(event) => setForm((current) => ({ ...current, experience_level: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Skills</span>
          <input
            type="text"
            value={form.skills}
            onChange={(event) => setForm((current) => ({ ...current, skills: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-slate-300">Bio</span>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">GitHub username</span>
          <input
            type="text"
            value={form.github_username}
            onChange={(event) => setForm((current) => ({ ...current, github_username: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">LeetCode username</span>
          <input
            type="text"
            value={form.leetcode_username}
            onChange={(event) => setForm((current) => ({ ...current, leetcode_username: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Codeforces username</span>
          <input
            type="text"
            value={form.codeforces_username}
            onChange={(event) => setForm((current) => ({ ...current, codeforces_username: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
          />
        </label>
        <div className="md:col-span-2 flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save profile"}
          </Button>
          {message ? <p className={`text-sm ${statusTone}`}>{message}</p> : null}
        </div>
      </form>
    </SectionCard>
  );
}
