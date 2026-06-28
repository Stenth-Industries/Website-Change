import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { motion } from 'motion/react';

const locations = [
  { name: 'USA', coords: [-95.7129, 37.0902] },
  { name: 'Canada', coords: [-106.3468, 56.1304], cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
  { name: 'Australia', coords: [133.7751, -25.2744], cities: ['Melbourne', 'Sydney', 'Brisbane', 'Perth'] },
  { name: 'Dominican Republic', coords: [-70.1627, 18.7357] },
  { name: 'India', coords: [78.9629, 20.5937] },
];

export default function GlobalMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 1200;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', 'auto');

    const projection = d3.geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Fetch world map data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
      const countries = topojson.feature(data, data.objects.countries) as any;

      svg.append('g')
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#1a1a1a')
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5);

      // Highlight target countries
      const targetCountries = ['United States of America', 'Canada', 'Australia', 'Dominican Republic', 'India'];
      
      svg.selectAll('.country-highlight')
        .data(countries.features.filter((d: any) => targetCountries.includes(d.properties.name)))
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#6F9CEB')
        .attr('opacity', 0.1);

      // Add glowing points
      const points = svg.append('g');

      locations.forEach(loc => {
        const [x, y] = projection(loc.coords as [number, number]) || [0, 0];
        
        // Outer glow
        points.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 8)
          .attr('fill', '#6F9CEB')
          .attr('opacity', 0.4)
          .append('animate')
          .attr('attributeName', 'r')
          .attr('values', '4;12;4')
          .attr('dur', '2s')
          .attr('repeatCount', 'indefinite');

        // Inner point
        points.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 3)
          .attr('fill', '#6F9CEB');

        // Label
        points.append('text')
          .attr('x', x)
          .attr('y', y - 15)
          .attr('text-anchor', 'middle')
          .attr('fill', '#fff')
          .attr('font-size', '10px')
          .attr('font-family', 'Inter')
          .attr('font-weight', 'bold')
          .attr('text-transform', 'uppercase')
          .attr('letter-spacing', '1px')
          .text(loc.name);

        // City hubs (smaller dots)
        if (loc.cities) {
          loc.cities.forEach((city, i) => {
            // Randomly offset slightly for visual effect of hubs
            const ox = x + (Math.cos(i) * 15);
            const oy = y + (Math.sin(i) * 15);
            points.append('circle')
              .attr('cx', ox)
              .attr('cy', oy)
              .attr('r', 1.5)
              .attr('fill', '#6F9CEB')
              .attr('opacity', 0.6);
          });
        }
      });
    });
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-accent mb-4">Global Presence</p>
            <h2 className="text-5xl md:text-7xl leading-none">Available <br /> <span className="text-brand-accent">Everywhere</span> It Matters.</h2>
          </div>
          <div className="max-w-xs text-right">
            <p className="text-brand-muted text-sm italic">
              "From Toronto to Mumbai, we help businesses scale across borders with localized growth strategies."
            </p>
          </div>
        </div>

        <div className="relative rounded-[40px] border border-brand-light/5 bg-brand-light/[0.02] p-8 md:p-12 overflow-hidden">
          <svg ref={svgRef} className="w-full h-auto" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
