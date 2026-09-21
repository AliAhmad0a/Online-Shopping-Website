import React from 'react';

const ChartPlaceholder = ({ title, type = 'bar', height = 'h-80' }) => {
  const renderBarChart = () => (
    <div className="flex items-end justify-between w-full h-full pb-6 pt-2 px-4 gap-2">
      {[40, 70, 45, 90, 65, 85, 100, 60, 80, 50, 75, 95].map((val, i) => (
        <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
          <div 
            className="w-full bg-primary-200 dark:bg-primary-900/40 rounded-t-sm group-hover:bg-primary-400 dark:group-hover:bg-primary-600 transition-all duration-300 relative overflow-hidden"
            style={{ height: `${val}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary-600 to-primary-400 opacity-80 rounded-t-sm"></div>
          </div>
          <span className="text-[10px] text-gray-400">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="w-full h-full relative overflow-hidden flex items-end pb-8 pt-4">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full border-t border-gray-100 dark:border-gray-800"></div>
        ))}
      </div>
      
      {/* Line graph visualization using SVG */}
      <svg className="w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Fill under line */}
        <path 
          d="M0,100 L0,70 Q10,60 20,75 T40,50 T60,65 T80,30 T100,40 L100,100 Z" 
          fill="url(#gradient)" 
          className="animate-fade-in"
        />
        
        {/* The line */}
        <path 
          d="M0,70 Q10,60 20,75 T40,50 T60,65 T80,30 T100,40" 
          fill="none" 
          stroke="#4F46E5" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        <circle cx="20" cy="75" r="2" fill="#fff" stroke="#4F46E5" strokeWidth="1" />
        <circle cx="40" cy="50" r="2" fill="#fff" stroke="#4F46E5" strokeWidth="1" />
        <circle cx="60" cy="65" r="2" fill="#fff" stroke="#4F46E5" strokeWidth="1" />
        <circle cx="80" cy="30" r="2" fill="#fff" stroke="#4F46E5" strokeWidth="1" />
        <circle cx="100" cy="40" r="2" fill="#fff" stroke="#4F46E5" strokeWidth="1" />
      </svg>
      
      {/* X-axis labels */}
      <div className="absolute bottom-1 left-0 w-full flex justify-between text-[10px] text-gray-400 px-2">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );

  const renderPieChart = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-48 h-48 rounded-full shadow-inner bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
           style={{
             background: 'conic-gradient(#4F46E5 0% 35%, #06B6D4 35% 65%, #F59E0B 65% 85%, #EC4899 85% 100%)'
           }}>
        {type === 'doughnut' && (
          <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-full shadow-inner flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">100%</span>
            <span className="text-xs text-gray-500">Total</span>
          </div>
        )}
      </div>
      
      <div className="ml-8 flex flex-col gap-3">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-600"></div><span className="text-sm text-gray-600 dark:text-gray-400">Electronics (35%)</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-cyan-500"></div><span className="text-sm text-gray-600 dark:text-gray-400">Clothing (30%)</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-sm text-gray-600 dark:text-gray-400">Home (20%)</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-pink-500"></div><span className="text-sm text-gray-600 dark:text-gray-400">Sports (15%)</span></div>
      </div>
    </div>
  );

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md">Chart visualization</span>
      </div>
      
      <div className={`${height} w-full relative flex-1`}>
        {type === 'bar' && renderBarChart()}
        {type === 'line' && renderLineChart()}
        {(type === 'pie' || type === 'doughnut') && renderPieChart()}
      </div>
    </div>
  );
};

export default ChartPlaceholder;
