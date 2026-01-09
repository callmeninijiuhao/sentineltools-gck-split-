import React, { useState } from 'react';
import {
    Search,
    AlertTriangle,
    Check,
    Globe,
    ArrowRight,
    Building2,
    Database,
    ShieldAlert
} from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { fetchSellersJson, searchBSellers, SellerResult } from '../services/sellerService';

export const Troubleshooter: React.FC = () => {
    // Inputs
    const [competitorDomain, setCompetitorDomain] = useState('');
    const [entityName, setEntityName] = useState('');

    // State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<SellerResult[]>([]);
    const [searched, setSearched] = useState(false);
    const [fetchedDomain, setFetchedDomain] = useState('');

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!competitorDomain || !entityName) {
            setError("Please provide both Competitor Domain and Entity Name.");
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);
        setSearched(false);

        try {
            const sellers = await fetchSellersJson(competitorDomain);
            const matches = searchBSellers(sellers, entityName);

            setResults(matches);
            setFetchedDomain(competitorDomain);
            setSearched(true);
        } catch (err: any) {
            setError(err.message || "Failed to fetch or parse sellers.json");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-pubmatic-navy tracking-tight">Troubleshooter</h1>
                    <p className="text-gray-500 mt-2">Tools for diagnosing and resolving supply path and inventory issues.</p>
                </div>
            </div>

            <div className="space-y-8">

                {/* Main Module: Seller Domain Shooter */}
                <div className="w-full space-y-6">
                    <div className="bg-white rounded-xl shadow-card border border-pubmatic-border overflow-hidden">
                        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex justify-between items-center">
                            <h3 className="font-bold text-pubmatic-navy flex items-center gap-2">
                                <ShieldAlert size={18} className="text-pubmatic-teal" />
                                Seller Domain Shooter
                            </h3>

                        </div>

                        <div className="p-8">
                            <p className="text-sm text-gray-500 mb-6">
                                Verify if a specific publisher entity exists in a competitor's <code>sellers.json</code> file to troubleshoot domain mismatches.
                            </p>

                            <form onSubmit={handleAnalyze} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Competitor Domain / URL"
                                        placeholder="e.g. inmobi.com"
                                        value={competitorDomain}
                                        onChange={(e) => setCompetitorDomain(e.target.value)}
                                        icon={<Globe size={16} />}
                                    />
                                    <Input
                                        label="Developer / Entity Name"
                                        placeholder="e.g. Learnings"
                                        value={entityName}
                                        onChange={(e) => setEntityName(e.target.value)}
                                        icon={<Building2 size={16} />}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        isLoading={loading}
                                        icon={<Search size={16} />}
                                    >
                                        Shoot & Analyze
                                    </Button>
                                </div>
                            </form>

                            {error && (
                                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm flex items-start animate-fade-in-up">
                                    <div className="mr-3 bg-red-100 p-1.5 rounded-full shrink-0"><AlertTriangle size={14} /></div>
                                    <span>{error}</span>
                                </div>
                            )}

                            {searched && (
                                <div className="mt-8 animate-fade-in-up">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                            Results for "{entityName}"
                                        </h4>
                                        <span className={`text-xs px-2 py-1 rounded-full border ${results.length > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                            {results.length} Matches Found
                                        </span>
                                    </div>

                                    {results.length > 0 ? (
                                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                                    <tr>
                                                        <th className="px-4 py-3">Seller ID</th>
                                                        <th className="px-4 py-3">Name</th>
                                                        <th className="px-4 py-3">Domain</th>
                                                        <th className="px-4 py-3">Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 bg-white">
                                                    {results.map((r, i) => (
                                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                                            <td className="px-4 py-3 font-mono text-xs text-gray-600 select-all">{r.sellerId}</td>
                                                            <td className="px-4 py-3 font-medium text-pubmatic-navy">{r.name}</td>
                                                            <td className="px-4 py-3 text-gray-600">{r.domain}</td>
                                                            <td className="px-4 py-3">
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                                    {r.sellerType}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            <Database size={32} className="mx-auto text-gray-300 mb-2" />
                                            <p className="text-gray-500 font-medium">No matching sellers found.</p>
                                            <p className="text-xs text-gray-400 mt-1">Try refining your entity name search (e.g. "Learning" instead of "Learnings")</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

