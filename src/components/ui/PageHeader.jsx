import React from "react";
import Button from "./Button";

export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">

      <div>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="text-taskor-slate mt-2">
          {description}
        </p>

      </div>

      {action && (
        <Button>
          {action}
        </Button>
      )}

    </div>
  );
}
