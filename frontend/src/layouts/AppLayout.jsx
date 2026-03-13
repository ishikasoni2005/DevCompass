import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { navigationItems } from "../utils/constants";


export default function AppLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <aside className="surface section-grid rounded-3xl p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-80">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora-400 to-emerald-300 text-lg font-bold text-slate-950">
              DC
            </div>
            <div>
              <p className="font-display text-xl font-bold">DevCompass</p>
              <p className="text-sm text-slate-400">Career navigation for developers</p>
            </div>
          </div>

          <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="mt-1 font-semibold text-white">{user?.name}</p>
            <p className="mt-1 text-sm text-aurora-200">{user?.career_goal || "Set your target role"}</p>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition",
                    isActive
                      ? "bg-gradient-to-r from-aurora-500/20 to-emerald-400/10 text-white shadow-glow"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-500">{item.shortcut}</span>
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={logout}
            className="mt-8 w-full rounded-2xl border border-ember-400/40 bg-ember-500/10 px-4 py-3 text-sm font-semibold text-ember-200 transition hover:bg-ember-500/20"
          >
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

