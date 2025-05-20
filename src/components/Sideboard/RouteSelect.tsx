import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { FiHome, FiUsers } from "react-icons/fi";

const routes: { to: string; title: string; Icon: IconType }[] = [
  { to: "/dashboard", title: "Dashboard", Icon: FiHome },
  { to: "/calendar  ", title: "Puntajes",  Icon: FiUsers },
  { to: "/assestment  ", title: "Autoevaluacion",  Icon: FiUsers },
  { to: "/assestment  ", title: "Crear Autoevaluacion",  Icon: FiUsers },
];

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      {routes.map((r) => (
        <RouteButton key={r.to} {...r} />
      ))}
    </div>
  );
};

function RouteButton({
  to,
  title,
  Icon,
}: {
  to: string;
  title: string;
  Icon: IconType;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selected = pathname === to;

  const base = "flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm transition";
  const active   = "bg-white text-stone-950 shadow";
  const inactive = "hover:bg-stone-200 bg-transparent text-stone-500";

  return (
    <button
      onClick={() => navigate(to)}
      className={`${base} ${selected ? active : inactive}`}
    >
      {/* AQUÍ ya pasas un string, no una función */}
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
}
