import React from "react";
import {
  FolderKanban,
  CheckCircle2,
  Users,
  MessageSquare,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: FolderKanban,
    title: "Project Updated",
    description: "Taskor Landing Page progress updated to 92%",
    time: "5 min ago",
  },
  {
    id: 2,
    icon: CheckCircle2,
    title: "Task Completed",
    description: "Authentication module completed",
    time: "18 min ago",
  },
  {
    id: 3,
    icon: Users,
    title: "New Client",
    description: "TechNova has been added",
    time: "42 min ago",
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Comment Added",
    description: "New discussion in Dashboard project",
    time: "1 hour ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="glass rounded-[30px] p-7 shadow-card">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold text-taskor-ink">
          Recent Activity
        </h2>

        <button className="text-taskor-purple text-sm font-medium">
          View All
        </button>

      </div>

      <div className="space-y-6">

        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >

              <div className="w-11 h-11 rounded-xl bg-taskor-gradient text-white flex items-center justify-center flex-shrink-0">

                <Icon size={18} />

              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-taskor-ink">
                  {activity.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {activity.description}
                </p>

                <span className="text-xs text-slate-400 mt-2 block">
                  {activity.time}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
