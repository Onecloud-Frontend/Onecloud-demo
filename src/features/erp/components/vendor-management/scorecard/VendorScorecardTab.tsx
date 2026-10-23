import { Award, CheckCircle2, Star, TrendingUp } from "lucide-react";
import { Panel } from "../shared";

const metrics = [
  {
    name: "On-time delivery rate",
    score: 96,
    detail: "96 out of 100 purchase orders delivered on schedule.",
    color: "bg-emerald-400",
    text: "text-emerald-300",
  },
  {
    name: "Quality compliance",
    score: 92,
    detail: "Low return rate on goods receipt inspection checks.",
    color: "bg-[var(--brand-primary)]",
    text: "text-indigo-300",
  },
  {
    name: "Pricing competitiveness",
    score: 88,
    detail: "Benchmarked against current market index rates.",
    color: "bg-amber-400",
    text: "text-amber-300",
  },
];

export function VendorScorecardTab() {
  return (
    <div className="space-y-5">
      <Panel>
        <div className="flex flex-col gap-5 border-b border-[var(--border-subtle)] pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
              <Award className="h-4 w-4" aria-hidden="true" />
              Supplier performance
            </div>
            <h2 className="mt-2 text-lg font-bold text-[var(--text-primary)]">
              Vendor Performance Scorecard
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Evaluated for:{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                ACME Tech Solutions
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 md:self-auto">
            <div>
              <p className="text-2xl font-black text-[var(--brand-primary)]">
                4.8 <span className="text-sm font-semibold">/ 5.0</span>
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Overall rating
              </p>
            </div>
            <Star
              className="h-8 w-8 fill-amber-300 text-amber-300"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-5 lg:grid-cols-3">
          {metrics.map(({ name, score, detail, color, text }) => (
            <div
              key={name}
              className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-[var(--text-primary)]">
                  {name}
                </span>
                <span className={`font-bold ${text}`}>{score}%</span>
              </div>
              <div
                className="h-2.5 overflow-hidden rounded-full bg-[var(--bg-elevated)]"
                role="progressbar"
                aria-label={name}
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Panel className="flex items-center gap-4">
          <span className="rounded-xl bg-emerald-500/10 p-3 text-emerald-300">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Evaluation status
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              No open performance concerns.
            </p>
          </div>
        </Panel>
        <Panel className="flex items-center gap-4">
          <span className="rounded-xl bg-[var(--brand-primary)]/10 p-3 text-indigo-300">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Score trend
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Strong delivery and quality performance.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
