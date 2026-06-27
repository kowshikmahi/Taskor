import { motion } from "framer-motion";
import React from "react";

const activities = [
  {
    title: "New Client Added",
    time: "2 min ago",
  },
  {
    title: "Project Completed",
    time: "15 min ago",
  },
  {
    title: "Task Assigned",
    time: "1 hour ago",
  },
  {
    title: "Invoice Generated",
    time: "Yesterday",
  },
];

export default function ActivityCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-[28px] p-8 shadow-card"
    >
      <h2 className="text-2xl font-bold mb-8">

        Recent Activity

      </h2>

      <div className="space-y-7">

        {activities.map((activity) => (

          <div
            key={activity.title}
            className="flex gap-4"
          >

            <div className="mt-1">

              <div className="h-3 w-3 rounded-full bg-taskor-purple"></div>

            </div>

            <div>

              <h3 className="font-semibold">

                {activity.title}

              </h3>

              <p className="text-sm text-slate-500">

                {activity.time}

              </p>

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
}