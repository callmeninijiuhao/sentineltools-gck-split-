import React, { useState, useEffect } from 'react';
import {
    Monitor,
    Smartphone,
    RefreshCw,
    Code,
    Settings,
    Copy,
    LayoutTemplate,
    PlayCircle
} from 'lucide-react';
import { Button } from '../components/Button';

// Extend window interface for Google Tag
declare global {
    interface Window {
        googletag: any;
    }
}

// Ad Unit Definitions
interface AdUnit {
    divId: string;
    name: string;
    sizes: number[][]; // e.g., [[300, 250], [300, 600]]
    description: string;
    isVideo?: boolean;
}

const AD_SLOTS: Record<string, AdUnit> = {
    leaderboard: {
        // UPDATED: Using the real ID provided
        divId: 'div-gpt-ad-1765264736790-0',
        name: 'Top Leaderboard',
        sizes: [[728, 90], [970, 90], [970, 250]],
        description: 'Primary header placement. Supports Billboard.'
    },
    video_instream: {
        // UPDATED: Using the real ID provided
        divId: 'div-gpt-ad-1765264565617-0',
        name: 'In-Stream Video Player',
        sizes: [[640, 360]], // 16:9 aspect ratio
        description: 'VAST/VPAID video player container.',
        isVideo: true
    },
    sidebar: {
        // UPDATED: Using the real ID provided (Note: updated size to match your snippet 160x250)
        divId: 'div-gpt-ad-1765264693974-0',
        name: 'Sidebar Skyscraper',
        sizes: [[160, 250], [160, 600], [300, 250], [300, 600]],
        description: 'Sticky sidebar unit.'
    },
    mpu_1: {
        divId: 'div-gpt-ad-content-1',
        name: 'In-Content MPU 1',
        sizes: [[300, 250], [336, 280]],
        description: 'Standard medium rectangle inside article content.'
    },
    mpu_2: {
        divId: 'div-gpt-ad-content-2',
        name: 'In-Content MPU 2',
        sizes: [[300, 250], [336, 280]],
        description: 'Secondary rectangle lower in content.'
    },
    mobile_sticky: {
        divId: 'div-gpt-ad-mobile-sticky',
        name: 'Mobile Sticky Footer',
        sizes: [[320, 50], [320, 100]],
        description: 'Fixed position overlay for mobile devices.'
    }
};

// Component to render the actual GPT Slot
const GPTAdSlot: React.FC<{ unit: AdUnit }> = ({ unit }) => {
    useEffect(() => {
        // This hook runs once when the component mounts, effectively replacing the inline <script> tag
        if (window.googletag && window.googletag.cmd) {
            window.googletag.cmd.push(function () {
                // Clear the slot if it already exists to prevent duplication issues on re-renders
                window.googletag.destroySlots([unit.divId]);
                window.googletag.display(unit.divId);
            });
        }
    }, [unit.divId]);

    return (
        <div
            id={unit.divId}
            style={{
                minWidth: `${unit.sizes[0][0]}px`,
                minHeight: `${unit.sizes[0][1]}px`,
                // We let the container handle margins
            }}
        />
    );
};

const AdPlaceholder: React.FC<{ unit: AdUnit; className?: string }> = ({ unit, className }) => {
    const isVideo = unit.isVideo;

    return (
        <div className={`flex flex-col items-center justify-center w-full my-4 ${className}`}>
            <div className="flex items-center justify-between w-full mb-2 px-1 max-w-[970px]">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{unit.name}</span>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                    #{unit.divId}
                </span>
            </div>

            {/* Visual Container Wrapper */}
            <div
                className={`
            w-full rounded-lg flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden bg-gray-50 border border-gray-200
            ${isVideo ? 'bg-black border-gray-800' : ''}
        `}
                style={{
                    minHeight: unit.sizes[0][1] + 20,
                    maxWidth: isVideo ? '640px' : '100%', // Limit container width for visual neatness
                }}
            >
                {/* 
            RENDER THE REAL AD HERE 
            We wrap it in a div to center it within our styled container
         */}
                <div className="z-10 relative">
                    <GPTAdSlot unit={unit} />
                </div>

                {/* Background label (visible if ad fails to load or is transparent) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="text-center opacity-30">
                        <p className={`font-bold ${isVideo ? 'text-gray-600' : 'text-gray-300'}`}>
                            {unit.sizes.map(s => `${s[0]}x${s[1]}`).join(' | ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const IntegrationTest: React.FC = () => {
    const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

    const handleRefreshAds = () => {
        if (window.googletag && window.googletag.pubads) {
            window.googletag.pubads().refresh();
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-pubmatic-navy tracking-tight">Integration Testing Suite</h1>
                    <p className="text-gray-500 mt-2">Test ad rendering, Prebid integration, and layout stability.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-1 flex items-center shadow-sm">
                        <button
                            onClick={() => setDeviceMode('desktop')}
                            className={`p-2 rounded-md transition-all ${deviceMode === 'desktop' ? 'bg-pubmatic-blue text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Desktop View"
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => setDeviceMode('mobile')}
                            className={`p-2 rounded-md transition-all ${deviceMode === 'mobile' ? 'bg-pubmatic-blue text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Mobile View"
                        >
                            <Smartphone size={18} />
                        </button>
                    </div>
                    <Button
                        icon={<RefreshCw size={16} />}
                        variant="outline"
                        onClick={handleRefreshAds}
                    >
                        Refresh Ads
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Main Layout Area - Simulates a Publisher Site */}
                <div className={`lg:col-span-9 transition-all duration-300 ${deviceMode === 'mobile' ? 'max-w-[375px] mx-auto border-x border-gray-200 bg-white shadow-2xl min-h-[800px]' : ''}`}>

                    <div className="bg-white rounded-xl shadow-card border border-pubmatic-border overflow-hidden min-h-[800px] flex flex-col">
                        {/* Mock Nav */}
                        <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between bg-white sticky top-0 z-10">
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                            <div className="flex space-x-4">
                                <div className="w-16 h-3 bg-gray-100 rounded hidden md:block"></div>
                                <div className="w-16 h-3 bg-gray-100 rounded hidden md:block"></div>
                                <div className="w-16 h-3 bg-gray-100 rounded hidden md:block"></div>
                            </div>
                        </div>

                        {/* Page Content */}
                        <div className="p-6 space-y-8 bg-white flex-1">

                            {/* Top Leaderboard */}
                            <section className="flex justify-center border-b border-gray-50 pb-6">
                                <AdPlaceholder unit={AD_SLOTS.leaderboard} className={deviceMode === 'mobile' ? 'scale-75 origin-top' : ''} />
                            </section>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Main Article Content */}
                                <div className="flex-1 space-y-6">
                                    <div className="space-y-3">
                                        <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-50 rounded w-full"></div>
                                        <div className="h-4 bg-gray-50 rounded w-full"></div>
                                        <div className="h-4 bg-gray-50 rounded w-5/6"></div>
                                    </div>

                                    {/* MPU 1 */}
                                    <div className="float-left mr-6 mb-4">
                                        <AdPlaceholder unit={AD_SLOTS.mpu_1} />
                                    </div>

                                    <div className="space-y-3 text-justify text-gray-400 text-sm leading-relaxed">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>

                                    {/* In-Stream Video Placement */}
                                    <div className="py-2">
                                        <AdPlaceholder unit={AD_SLOTS.video_instream} />
                                    </div>

                                    <div className="space-y-3 text-justify text-gray-400 text-sm leading-relaxed">
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                    </div>

                                    {/* MPU 2 */}
                                    <div className="py-6 flex justify-center">
                                        <AdPlaceholder unit={AD_SLOTS.mpu_2} />
                                    </div>

                                    <div className="space-y-3 text-justify text-gray-400 text-sm leading-relaxed">
                                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                                    </div>
                                </div>

                                {/* Right Sidebar (Hidden on Mobile) */}
                                {deviceMode === 'desktop' && (
                                    <aside className="w-[300px] shrink-0 border-l border-gray-50 pl-6 space-y-8">
                                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                            <h4 className="font-bold text-gray-400 text-xs uppercase mb-2">Sticky Sidebar</h4>
                                            <p className="text-xs text-gray-400 mb-4">Testing sticky ad behavior.</p>
                                            <AdPlaceholder unit={AD_SLOTS.sidebar} />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                            <div className="h-20 bg-gray-50 rounded w-full"></div>
                                            <div className="h-20 bg-gray-50 rounded w-full"></div>
                                        </div>
                                    </aside>
                                )}
                            </div>
                        </div>

                        {/* Mobile Sticky Footer */}
                        {deviceMode === 'mobile' && (
                            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg z-20">
                                <div className="flex justify-center">
                                    <AdPlaceholder unit={AD_SLOTS.mobile_sticky} className="my-0" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Configuration / Console Panel (Right Side) */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Ad Slots Summary */}
                    <div className="bg-white rounded-xl shadow-card border border-pubmatic-border p-4">
                        <div className="flex items-center mb-4">
                            <LayoutTemplate size={18} className="text-pubmatic-blue mr-2" />
                            <h3 className="font-bold text-pubmatic-navy text-sm">Placement Config</h3>
                        </div>
                        <div className="space-y-3">
                            {Object.values(AD_SLOTS).map((slot) => (
                                <div key={slot.divId} className="group relative bg-gray-50 p-3 rounded border border-gray-100 hover:border-pubmatic-blue/30 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-xs text-gray-700">{slot.name}</span>
                                        <button className="text-gray-400 hover:text-pubmatic-blue" title="Copy Div ID">
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                    <code className="block text-[10px] text-gray-500 font-mono mb-1 break-all">{slot.divId}</code>
                                    <div className="flex flex-wrap gap-1">
                                        {slot.sizes.map((s, i) => (
                                            <span key={i} className="text-[9px] bg-white border border-gray-200 px-1 rounded text-gray-500">
                                                {s[0]}x{s[1]}
                                            </span>
                                        ))}
                                    </div>
                                    {slot.isVideo && (
                                        <span className="absolute top-3 right-3 text-[9px] bg-black text-white px-1.5 py-0.5 rounded">VIDEO</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Debug Console Placeholder */}
                    <div className="bg-pubmatic-navy rounded-xl shadow-card border border-pubmatic-navy overflow-hidden flex flex-col h-[300px]">
                        <div className="bg-black/20 p-3 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center text-white text-xs font-mono">
                                <Code size={14} className="mr-2 text-green-400" />
                                Prebid / GPT Console
                            </div>
                            <Settings size={14} className="text-gray-400 cursor-pointer hover:text-white" />
                        </div>
                        <div className="p-4 font-mono text-[10px] text-green-400/80 overflow-y-auto flex-1 space-y-1">
                            <p><span className="text-gray-500">00:00:00</span> [System] Console ready.</p>
                            <p><span className="text-gray-500">00:00:00</span> [System] Waiting for gpt.js injection...</p>
                            <p><span className="text-yellow-500/80">00:00:01</span> [Warn] Ensure gpt.js is in &lt;HEAD&gt;</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};