import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019", projects: 12 },
  { year: "2020", projects: 18 },
  { year: "2021", projects: 25 },
  { year: "2022", projects: 42 },
  { year: "2023", projects: 68 },
  { year: "2024", projects: 95 },
  { year: "2025", projects: 120 },
  { year: "2026", projects: 150 },
];

const StatsChart: React.FC = () => {
  return (
    <section
      id="growth"
      className="py-14 sm:py-16 lg:py-20 bg-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="lg:w-1/3 w-full text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              Growing Stronger Every Year
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
              At SSV Developers, our consistent growth reflects our commitment
              to reliability and client satisfaction. We've scaled from small
              residential units to massive commercial infrastructures, with 150+
              projects currently active or delivered.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg border-l-4 border-amber-500">
                <span className="block text-2xl sm:text-3xl font-bold text-slate-900">
                  150+
                </span>
                <span className="text-xs sm:text-sm text-slate-500">
                  Total Projects
                </span>
              </div>

              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                <span className="block text-2xl sm:text-3xl font-bold text-slate-900">
                  250+
                </span>
                <span className="text-xs sm:text-sm text-slate-500">
                  Expert Workforce
                </span>
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="lg:w-2/3 w-full bg-white rounded-xl shadow-md border border-slate-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">
                Project Portfolio Growth
              </h3>

              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                COMPLETED / ONGOING
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorProjects"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontWeight: "bold", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontWeight: "bold", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fbbf24", fontWeight: "bold" }}
                />

                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorProjects)"
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsChart;
