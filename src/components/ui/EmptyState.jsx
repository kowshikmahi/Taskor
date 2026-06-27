import React from "react";
import Button from "./Button";

export default function EmptyState({
  title,
  description,
  button,
}) {
  return (
    <div className="glass rounded-3xl py-20 text-center">

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-taskor-slate">
        {description}
      </p>

      {button && (
        <Button className="mt-8">
          {button}
        </Button>
      )}

    </div>
  );
}
