
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Network, Maximize, Download } from 'lucide-react';

interface MindMapVisualizationProps {
  data: any;
  onNodeClick: (rule: any) => void;
}

export const MindMapVisualization: React.FC<MindMapVisualizationProps> = ({ 
  data, 
  onNodeClick 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    const svg = svgRef.current;
    svg.innerHTML = '';

    // Set up SVG dimensions
    const width = 800;
    const height = 600;
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Create simple mind map layout
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 200;

    // Central node
    const centralNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    centralNode.innerHTML = `
      <circle cx="${centerX}" cy="${centerY}" r="40" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <text x="${centerX}" y="${centerY}" text-anchor="middle" dy="0.35em" fill="white" font-size="12" font-weight="bold">
        Policy
      </text>
      <text x="${centerX}" y="${centerY + 15}" text-anchor="middle" dy="0.35em" fill="white" font-size="10">
        Analysis
      </text>
    `;
    svg.appendChild(centralNode);

    // Rule nodes
    data.rules.forEach((rule: any, index: number) => {
      const angle = (index * 2 * Math.PI) / data.rules.length;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Connection line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX.toString());
      line.setAttribute('y1', centerY.toString());
      line.setAttribute('x2', x.toString());
      line.setAttribute('y2', y.toString());
      line.setAttribute('stroke', '#e5e7eb');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);

      // Rule node
      const ruleNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      ruleNode.style.cursor = 'pointer';
      ruleNode.innerHTML = `
        <circle cx="${x}" cy="${y}" r="30" fill="#10b981" stroke="#059669" stroke-width="2"/>
        <text x="${x}" y="${y}" text-anchor="middle" dy="0.35em" fill="white" font-size="10" font-weight="bold">
          Rule ${rule.id}
        </text>
      `;
      
      ruleNode.addEventListener('click', () => onNodeClick(rule));
      ruleNode.addEventListener('mouseenter', () => {
        const circle = ruleNode.querySelector('circle');
        if (circle) circle.setAttribute('r', '35');
      });
      ruleNode.addEventListener('mouseleave', () => {
        const circle = ruleNode.querySelector('circle');
        if (circle) circle.setAttribute('r', '30');
      });
      
      svg.appendChild(ruleNode);

      // Pros and cons sub-nodes
      const prosX = x + 60 * Math.cos(angle - 0.5);
      const prosY = y + 60 * Math.sin(angle - 0.5);
      const consX = x + 60 * Math.cos(angle + 0.5);
      const consY = y + 60 * Math.sin(angle + 0.5);

      // Pros node
      const prosLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      prosLine.setAttribute('x1', x.toString());
      prosLine.setAttribute('y1', y.toString());
      prosLine.setAttribute('x2', prosX.toString());
      prosLine.setAttribute('y2', prosY.toString());
      prosLine.setAttribute('stroke', '#d1d5db');
      prosLine.setAttribute('stroke-width', '1');
      svg.appendChild(prosLine);

      const prosNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      prosNode.innerHTML = `
        <circle cx="${prosX}" cy="${prosY}" r="15" fill="#22c55e" stroke="#16a34a" stroke-width="1"/>
        <text x="${prosX}" y="${prosY}" text-anchor="middle" dy="0.35em" fill="white" font-size="8">
          +${rule.pros.length}
        </text>
      `;
      svg.appendChild(prosNode);

      // Cons node
      const consLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      consLine.setAttribute('x1', x.toString());
      consLine.setAttribute('y1', y.toString());
      consLine.setAttribute('x2', consX.toString());
      consLine.setAttribute('y2', consY.toString());
      consLine.setAttribute('stroke', '#d1d5db');
      consLine.setAttribute('stroke-width', '1');
      svg.appendChild(consLine);

      const consNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      consNode.innerHTML = `
        <circle cx="${consX}" cy="${consY}" r="15" fill="#ef4444" stroke="#dc2626" stroke-width="1"/>
        <text x="${consX}" y="${consY}" text-anchor="middle" dy="0.35em" fill="white" font-size="8">
          -${rule.cons.length}
        </text>
      `;
      svg.appendChild(consNode);
    });

  }, [data, onNodeClick]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Network className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Interactive Mind Map</h3>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Maximize className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg bg-gray-50 flex items-center justify-center" style={{ minHeight: '600px' }}>
        <svg ref={svgRef} className="max-w-full max-h-full"></svg>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>Click on rule nodes to view detailed analysis</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Pros</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Cons</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Rules</span>
          </div>
        </div>
      </div>
    </div>
  );
};
