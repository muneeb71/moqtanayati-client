"use client";

import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Positive", value: 52.1, color: "#00FF7F" },
  { name: "Neutral", value: 22.8, color: "#C8FFC8" },
  { name: "Negative", value: 13.9, color: "#FF9999" },
  { name: "Nil", value: 11.2, color: "#C0C0C0" },
];

const RatingReviewsCard = ({ ratings = data }) => {
  return (
    <div className="flex flex-col gap-5 rounded-[30px] bg-[#F9F9FA] px-8 py-8">
      <h2 className="text-2xl text-black font-bold">Ratings & Reviews</h2>
      <div className="flex flex-col md:flex-row h-full items-center gap-6">
        <div className="min-w-[250px]">
          <PieChart width={250} height={250}>
            <Pie
              data={ratings}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={125}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {ratings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <ul className="flex w-full flex-col gap-6 text-xl">
          {ratings.map((item) => (
            <li
              key={item.name}
              className="flex w-full items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name}
              </div>
              {item.value}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RatingReviewsCard;
