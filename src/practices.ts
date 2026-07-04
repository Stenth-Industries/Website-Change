/* Practice-area variants of the law-firms landing page.
   Each entry drives /law-firms/<slug> plus its meta in scripts/postbuild-meta.mjs
   (keep titles and descriptions in sync when editing). */

export interface Practice {
  slug: string;
  name: string;
  firmsNoun: string;
  searchQuery: string;
  clientNoun: string;
  title: string;
  pains: string[];
}

export const PRACTICES: Practice[] = [
  {
    slug: 'family-law',
    name: 'Family Law',
    firmsNoun: 'family law firms',
    searchQuery: 'family lawyer melbourne',
    clientNoun: 'a family lawyer',
    title: 'Family Law Firm Marketing Melbourne — Stenth',
    pains: [
      'Parenting and property matters start with a Google search, usually late at night.',
      "You're invisible in the map pack for family law searches in your suburbs.",
      'Directories and comparison sites outrank your own website for your own practice areas.',
      'Enquiries arrive stressed and urgent, and they book whoever answers first.',
      'Competitors run ads on searches like "divorce lawyer near me" while you wait on referrals.',
    ],
  },
  {
    slug: 'immigration-law',
    name: 'Immigration Law',
    firmsNoun: 'immigration law firms',
    searchQuery: 'immigration lawyer melbourne',
    clientNoun: 'an immigration lawyer',
    title: 'Immigration Law Firm Marketing Melbourne — Stenth',
    pains: [
      'Visa applicants research for weeks, and they shortlist the firms they keep seeing.',
      "You're invisible for the visa subclasses your best matters come from.",
      'Migration agents with better SEO win work that actually needs a lawyer.',
      'Whole communities of ideal clients never come across your name.',
      'Competitors run ads on "partner visa lawyer" while you rely on word of mouth.',
    ],
  },
  {
    slug: 'personal-injury',
    name: 'Personal Injury',
    firmsNoun: 'personal injury firms',
    searchQuery: 'personal injury lawyer melbourne',
    clientNoun: 'an injury lawyer',
    title: 'Personal Injury Firm Marketing Melbourne — Stenth',
    pains: [
      'Injured people search once, call the top two results, and sign the same week.',
      'National no-win-no-fee brands outspend you on every keyword that matters.',
      "You're invisible in the map pack where the high-value claims start.",
      'Referral fees eat margins that better visibility would keep in the firm.',
      'The phone rings, but nobody knows which marketing made it ring.',
    ],
  },
  {
    slug: 'conveyancing',
    name: 'Conveyancing',
    firmsNoun: 'conveyancing practices',
    searchQuery: 'conveyancer melbourne',
    clientNoun: 'a conveyancer',
    title: 'Conveyancing Marketing Melbourne — Stenth',
    pains: [
      'Buyers price-shop three conveyancers in ten minutes, and the visible ones get the call.',
      "You're invisible in the map pack when settlement season peaks in your suburbs.",
      'Comparison platforms take a cut of work that should come to you directly.',
      'Agent referrals dry up the moment the property market slows.',
      'Competitors run ads on "conveyancing quote" while you compete on price alone.',
    ],
  },
];

export const getPractice = (slug: string): Practice | null =>
  PRACTICES.find((p) => p.slug === slug) ?? null;
