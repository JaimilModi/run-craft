"use client";

import { useEffect, useState } from "react";

interface ContributionGridProps {
  data: { date: string; count: number }[];
  isPro: boolean;
}

export default function ContributionGrid({
  data,
  isPro,
}: ContributionGridProps) {
  const map = new Map(data.map((d) => [d.date, d.count]));

  const [maxDays, setMaxDays] = useState(365);

  useEffect(() => {
    const updateDays = () => {
      const width = window.innerWidth;

      if (width < 640)
        setMaxDays(90); // ~3 months
      else if (width < 1024)
        setMaxDays(180); // ~6 months
      else if (width < 1280)
        setMaxDays(270); // ~9 months
      else setMaxDays(365); // full year
    };

    updateDays();
    window.addEventListener("resize", updateDays);
    return () => window.removeEventListener("resize", updateDays);
  }, []);

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - (maxDays - 1));

  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  for (let i = 0; i < maxDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const formatted = d.toISOString().split("T")[0];
    const count = map.get(formatted) ?? 0;

    currentWeek.push({
      date: formatted,
      count,
    });

    if (d.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length) weeks.push(currentWeek);

  const getColor = (count: number) => {
    if (count === 0) return "bg-[#1f1f2e]";

    if (isPro) {
      if (count < 2) return "bg-purple-400/40";
      if (count < 4) return "bg-purple-500/60";
      if (count < 7) return "bg-purple-500/80";
      return "bg-purple-500";
    } else {
      if (count < 2) return "bg-emerald-400/40";
      if (count < 4) return "bg-emerald-500/60";
      if (count < 7) return "bg-emerald-500/80";
      return "bg-emerald-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Month Labels */}
      <div className="flex gap-[6px] ml-6 mb-2">
        {weeks.map((week, i) => {
          const firstDay = week[0];
          const dateObj = new Date(firstDay.date);

          const showMonth =
            dateObj.getDate() <= 7 &&
            (i === 0 ||
              dateObj.getMonth() !== new Date(weeks[i - 1][0].date).getMonth());

          return (
            <div key={i} className="w-[11px]">
              {showMonth && (
                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  {dateObj.toLocaleString("default", { month: "short" })}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekday + Grid */}
      <div className="flex gap-3">
        {/* Weekday Labels */}
        <div className="flex flex-col justify-between text-[10px] text-gray-500 py-[2px]">
          <span></span>
          <span>Mon</span>
          <span></span>
          <span>Wed</span>
          <span></span>
          <span>Fri</span>
          <span></span>
        </div>

        {/* Grid */}
        <div className="flex gap-[6px]">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[6px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date} • ${day.count} activities`}
                  className={`w-[11px] h-[11px] rounded-sm transition-all duration-200 
                    ${getColor(day.count)}
                    ${day.count > 0 ? "hover:scale-110" : ""}
                  `}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
