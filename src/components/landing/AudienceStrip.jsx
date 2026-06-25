import React from "react";

export default function AudienceStrip() {
  const audience = ["Freelancers", "Agencies", "Consultants", "Studios", "Small Teams"];

  return (
    <section className="border-y border-taskor-mist bg-taskor-cloud/60">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-taskor-slate">
            Built for modern client work
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            {audience.map((item) => (
              <span
                key={item}
                className="rounded-full border border-taskor-mist bg-white px-4 py-2 text-sm font-medium text-taskor-slate"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}