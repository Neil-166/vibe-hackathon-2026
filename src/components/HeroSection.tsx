import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ─── 3-step onboarding strip ─── */
const steps = [
  { num: '1', label: 'Pick a track', desc: 'Full Stack · AI/ML · DSA · more' },
  { num: '2', label: 'Build 60–90 min', desc: 'A real project, every night' },
  { num: '3', label: 'Submit proof', desc: 'GitHub + LinkedIn = visible streak' },
];

function OnboardingStrip() {
  return (
    <div className="flex gap-2">
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
          className="flex-1 rounded-xl border border-border bg-surface p-3 text-center"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">{step.num}</span>
          <p className="mt-1.5 text-[12px] font-bold leading-tight text-foreground">{step.label}</p>
          <p className="mt-0.5 text-[10px] leading-snug text-subtle">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Landing hero — must explain ABTalks within 5 seconds:
 * daily build + GitHub commit + LinkedIn post + public streak + recruiter visibility.
 */
export default function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-[56svh] max-w-[560px] flex-col justify-center px-6 pb-8 pt-20">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
        <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
          60 Days. One Commitment.
        </p>

        <h1 className="mb-4 text-[38px] leading-[1.05] font-bold tracking-[-0.03em] text-foreground sm:text-[46px]">
          Build for 60 days.
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get noticed by recruiters.
          </span>
        </h1>

        <p className="mb-5 max-w-[520px] text-[16px] leading-[1.65] text-muted">
          Spend 60–90 minutes each night building a project, push one GitHub commit,
          publish one LinkedIn post, and grow a public learning streak that recruiters can see.
        </p>

        {/* 3-step onboarding strip */}
        <OnboardingStrip />

        <div className="mt-5 flex max-w-[360px] flex-col gap-3">
          <Link to="/dashboard" className="block">
            <Button variant="cta" size="lg" className="w-full text-[15px]">
              Start Day 1 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link
            to="/day/12"
            className="flex min-h-14 items-center justify-center rounded-2xl border border-border bg-surface text-[15px] font-medium text-foreground transition-colors hover:bg-white/5"
          >
            <Eye className="mr-2 h-4 w-4 text-subtle" /> View Sample Day
          </Link>
        </div>

        <div className="mt-5 card-pad flex items-center gap-4 max-w-[420px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Flame className="h-6 w-6 text-[#111] flame-pulse" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground">The streak is alive.</p>
            <p className="text-[13px] text-muted">5,200+ students are building with you.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
