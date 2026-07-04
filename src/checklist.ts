/* The 2026 B2B Funnel Checklist, as interactive data.
   Mirrors public/stenth-funnel-checklist.pdf: 30 checks across 5 sections,
   same scoring bands. gapPriority orders sections by how directly an
   unticked box touches revenue (deeper in the funnel costs more). */

export interface ChecklistItem {
  id: number;
  text: string;
  detail: string;
}

export interface ChecklistSection {
  n: number;
  title: string;
  tagline: string;
  items: ChecklistItem[];
}

export const SECTIONS: ChecklistSection[] = [
  {
    n: 1,
    title: 'Foundation & Tracking',
    tagline: "If you can't measure it, every other fix is a guess.",
    items: [
      { id: 1, text: 'GA4 is installed and receiving data', detail: 'With internal traffic filtered out.' },
      { id: 2, text: 'Every conversion is defined as an event', detail: 'Form submits, calls, bookings, downloads.' },
      { id: 3, text: 'Google Tag Manager owns every tag', detail: 'No orphan pixels pasted into the theme.' },
      { id: 4, text: 'Ad platforms import conversions from one source of truth', detail: 'Never counted twice.' },
      { id: 5, text: 'Your CRM records the original source of every lead', detail: 'First touch and last.' },
      { id: 6, text: 'Revenue connects back to spend', detail: "You can state last month's true ROAS in one number." },
    ],
  },
  {
    n: 2,
    title: 'Top of Funnel',
    tagline: 'Getting found by the right strangers, not the most strangers.',
    items: [
      { id: 7, text: 'Your ideal customer profile is written down', detail: 'Industry, deal size, and buying trigger.' },
      { id: 8, text: 'Keywords are mapped by intent', detail: 'You know which terms are buyers and which are browsers.' },
      { id: 9, text: 'Paid campaigns are split by intent tier', detail: 'High-intent search isolated from prospecting.' },
      { id: 10, text: 'Your Google Business Profile is complete and active', detail: 'Photos and answered reviews.' },
      { id: 11, text: 'Technical SEO passes', detail: 'Indexable, mobile friendly, Core Web Vitals in the green.' },
      { id: 12, text: 'One content asset exists for every buying question', detail: 'The questions prospects ask before they call.' },
      { id: 13, text: 'The negative keyword list is reviewed monthly', detail: 'Spend never leaks to junk queries.' },
    ],
  },
  {
    n: 3,
    title: 'Middle of Funnel',
    tagline: 'Earning trust. Most B2B deals are lost here, silently.',
    items: [
      { id: 14, text: 'Every campaign lands on a dedicated page', detail: 'The message matches the ad, one goal per page.' },
      { id: 15, text: 'Landing pages load in under 3 seconds on mobile', detail: 'Tested on a real phone.' },
      { id: 16, text: 'Proof sits near every ask', detail: 'Testimonials, results, or client logos beside each form.' },
      { id: 17, text: 'Your lead magnet is worth a real email address', detail: 'Specific and useful, not a brochure.' },
      { id: 18, text: 'An email nurture sequence exists', detail: 'At least four sends that teach before they sell.' },
      { id: 19, text: 'Retargeting is segmented by page visited', detail: 'Pricing visitors see different ads than readers.' },
      { id: 20, text: 'Forms ask only for what you will actually use', detail: 'Every extra field costs you leads.' },
    ],
  },
  {
    n: 4,
    title: 'Bottom of Funnel',
    tagline: 'Closing. Speed and friction decide more deals than price does.',
    items: [
      { id: 21, text: 'New leads get a human response within 24 hours', detail: 'Faster is measurably better.' },
      { id: 22, text: 'Booking a call takes two clicks or fewer', detail: 'A calendar link, not email ping-pong.' },
      { id: 23, text: 'A written follow-up cadence exists', detail: 'Leads hear from you five times before going cold.' },
      { id: 24, text: 'Proposals go out within 48 hours of the call', detail: 'And state the price plainly.' },
      { id: 25, text: 'Every lost deal gets a reason logged', detail: 'You know your top three objections cold.' },
      { id: 26, text: 'Reviews are requested systematically', detail: 'Every happy client, every time.' },
    ],
  },
  {
    n: 5,
    title: 'Measurement',
    tagline: 'One dashboard. One truth. Reviewed on a schedule.',
    items: [
      { id: 27, text: 'One dashboard shows spend, leads, and revenue together', detail: 'Not three reports that disagree.' },
      { id: 28, text: 'You know your cost per qualified lead by channel', detail: 'Not blended.' },
      { id: 29, text: 'Customer lifetime value is calculated', detail: 'You know what a customer is worth to acquire.' },
      { id: 30, text: 'A 30-minute funnel review happens weekly', detail: 'Same metrics, same order, decisions logged.' },
    ],
  },
];

export const TOTAL = SECTIONS.reduce((s, x) => s + x.items.length, 0);

export interface ScoreBand {
  min: number;
  max: number;
  label: string;
  color: string;
  copy: string;
}

export const BANDS: ScoreBand[] = [
  { min: 0, max: 10, label: 'Leaking Badly', color: '#f87171', copy: "You're funding guesswork. Start with Section 1. Nothing else matters until tracking is honest." },
  { min: 11, max: 20, label: 'Foundations, No Engine', color: '#fbbf24', copy: "The basics exist but they don't compound yet. Fix the middle of your funnel first." },
  { min: 21, max: 26, label: 'Close. Tighten the Gaps', color: '#6F9CEB', copy: "You're ahead of most competitors. The remaining boxes are where the next 30% hides." },
  { min: 27, max: 30, label: 'Compounding', color: '#4ade80', copy: 'Rare air. Protect it by re-running this checklist quarterly and after every big campaign.' },
];

export const bandFor = (score: number): ScoreBand =>
  BANDS.find((b) => score >= b.min && score <= b.max) ?? BANDS[0];

/* Three biggest gaps: unticked boxes that touch revenue most directly.
   Low scores point at tracking first (per the PDF's own advice); otherwise
   deeper funnel stages outrank earlier ones. */
export const gapsFor = (checked: Set<number>, score: number): ChecklistItem[] => {
  const order = score <= 10 ? [1, 4, 3, 5, 2] : [4, 3, 5, 1, 2];
  const out: ChecklistItem[] = [];
  for (const n of order) {
    const section = SECTIONS.find((s) => s.n === n)!;
    for (const item of section.items) {
      if (!checked.has(item.id) && out.length < 3) out.push(item);
    }
  }
  return out;
};
