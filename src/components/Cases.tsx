import React from 'react';
import { motion } from 'motion/react';

const categories = ['SAAS', 'EXPERT', 'PRODUCT', 'DIGITAL AGENCY'];

const cases = [
  {
    title: 'Smart Home Battery',
    category: 'SAAS',
    result: '+240% Revenue',
    image: 'https://picsum.photos/seed/case1/1200/800',
    desc: 'Challenge: Drive installs and bundle sales'
  },
  {
    title: 'HeartSync App',
    category: 'PRODUCT',
    result: '-60% Ops Cost',
    image: 'https://picsum.photos/seed/case2/1200/800',
    desc: 'Challenge: Launch new product in break-neck fast'
  },
  {
    title: 'ModuleOne Platform',
    category: 'DIGITAL AGENCY',
    result: '4x Lead Gen',
    image: 'https://picsum.photos/seed/case3/1200/800',
    desc: 'Challenge: Scale B2B lead generation'
  }
];

export default function Cases() {
  const [activeTab, setActiveTab] = React.useState('SAAS');

  return (
    <section id="cases" className="py-24 px-6 md:px-12 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-4">Selected Work</p>
            <h2 className="text-6xl md:text-9xl leading-none">Case Studies</h2>
          </div>
          <div className="max-w-xs text-right">
            <p className="text-brand-muted text-sm italic">
              "We don't do 'one-size-fits-all'. Each funnel, ad, and campaign is tailored to the unique DNA of your business."
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-8 mb-16 border-b border-brand-light/10 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${activeTab === cat ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-light'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cases.filter(c => activeTab === 'SAAS' || c.category === activeTab || activeTab === 'DIGITAL AGENCY').map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-8 bg-brand-light/5 border border-brand-light/5 p-4">
                <div className="w-full h-full overflow-hidden rounded-2xl relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="absolute top-8 right-8">
                  <div className="bg-brand-accent text-brand-dark px-4 py-2 rounded-full">
                    <span className="text-sm font-display uppercase">{item.result}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl mb-2">{item.title}</h3>
                  <p className="text-brand-muted text-xs font-medium">{item.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-brand-light/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-dark transition-all">
                  <span className="text-lg">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
