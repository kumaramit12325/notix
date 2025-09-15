import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Plus } from 'lucide-react';

type Feature = { label: string; };
type Plan = {
  name: string;
  price: string;
  subText: string;
  highlight?: boolean;
  features: Feature[];
  cta?: string;
};

const plans: Plan[] = [
  {
    name: 'BASIC PLAN',
    price: '₹1,199 / 6 Months',
    subText: 'For small projects getting started',
    features: [
      { label: '10 Domains' },
      { label: 'Unlimited Subscribers' },
      { label: 'Customise Alert Prompt' },
      { label: 'Unlimited Push' },
      { label: 'Campaigns' },
      { label: 'AMP Support' },
      { label: 'Audience Segmentation' },
      { label: 'WordPress Plugin' },
      { label: 'Email Support' },
      { label: 'Export Subscribers' },
      { label: 'Import Subscribers' },
    ],
    cta: 'Choose Basic',
  },
  {
    name: 'ADVANCE PLAN',
    price: '₹2,199 / Year',
    subText: 'Best value for growing teams',
    highlight: true,
    features: [
      { label: '10 Domains' },
      { label: 'Unlimited Subscribers' },
      { label: 'Customise Alert Prompt' },
      { label: 'Unlimited Push' },
      { label: 'Campaigns' },
      { label: 'AMP Support' },
      { label: 'Audience Segmentation' },
      { label: 'WordPress Plugin' },
      { label: 'Email Support' },
      { label: 'Export Subscribers' },
      { label: 'Import Subscribers' },
    ],
    cta: 'Get Advance',
  },
  {
    name: 'LIFETIME PLAN',
    price: '₹29,999',
    subText: 'Unlimited everything. One-time payment.',
    features: [
      { label: 'Unlimited Domains' },
      { label: 'Unlimited Subscribers' },
      { label: 'Customise Alert Prompt' },
      { label: 'Unlimited Push' },
      { label: 'Campaigns' },
      { label: 'AMP Support' },
      { label: 'Audience Segmentation' },
      { label: 'WordPress Plugin' },
      { label: 'Email Support' },
      { label: 'Export Subscribers' },
      { label: 'Import Subscribers' },
    ],
    cta: 'Buy Lifetime',
  },
];

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  return (
    <Card className={plan.highlight ? 'relative border-primary/40 shadow-md bg-gradient-to-b from-primary/10 to-background' : ''}>
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription className="text-base">{plan.subText}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-2xl font-semibold">{plan.price}</div>
        </div>
        <ul className="space-y-3">
          {plan.features.map((f, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          {plan.cta ?? 'Choose Plan'}
        </Button>
      </CardFooter>
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow">
          Most Popular
        </div>
      )}
    </Card>
  );
};

const PricingComparison: React.FC = () => {
  const rows = [
    { tool: 'OneSignal', subs: '10 Million', cost: '₹24,78,464 + Taxes / Year' },
    { tool: 'Gravitec', subs: '10 Million', cost: '₹8,26,155 + Taxes / Year' },
    { tool: 'Notix', subs: '10 Million', cost: '₹8,26,155 + Taxes / Year' },
    { tool: 'iZooto', subs: '30k', cost: '₹20,653 / Month' },
    { tool: 'Webpushr', subs: '150k', cost: '₹8,178 / Month' },
    { tool: 'LaraPush', subs: '10 Million', cost: '₹61,687 Lifetime' },
    { tool: 'PushRocket', subs: 'Unlimited', cost: '₹29,999 Lifetime (Buy Now)' },
  ];

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold mb-6 text-center">Most Affordable in Price</h3>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/60">
            <TableHead>Push Notification Tool</TableHead>
            <TableHead>Push Subscribers</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i} className={r.tool === 'PushRocket' ? 'bg-emerald-100/60 dark:bg-emerald-900/20' : ''}>
              <TableCell className="font-medium">{r.tool}</TableCell>
              <TableCell>{r.subs}</TableCell>
              <TableCell>{r.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MiniFaq: React.FC = () => {
  const items = [
    { q: "Unleash Your Website's Potential with PushRocket!", a: 'Send unlimited campaigns, collect subscribers on unlimited domains.' },
    { q: 'One-Time Payment, Unlimited Possibilities!', a: 'Pay once, use forever. No recurring charges.' },
    { q: 'Go Beyond Boundaries', a: 'No limits on subscribers, domains, or campaigns in Lifetime.' },
    { q: 'PushRocket - Where Features Thrive', a: 'Everything you need: segmentation, AMP, plugins, imports/exports.' },
    { q: 'Take Control of Your Reach', a: 'Own your audience and messaging with reliable delivery.' },
  ];
  return (
    <div className="mt-16 space-y-3">
      {items.map((it, idx) => (
        <Collapsible key={idx} className="rounded-lg border px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">{it.q}</p>
            <CollapsibleTrigger className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm">
              <Plus className="h-4 w-4" />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
            {it.a}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

const PricingPlansub: React.FC = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Pricing and Plans (Only Subscription)</h2>
          <p className="mt-3 text-muted-foreground">
            One-time payment, no recurring charges, no hidden costs. Unlock unlimited access to our push platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>

        <PricingComparison />
        <MiniFaq />
      </div>
    </section>
  );
};

export default PricingPlansub;
