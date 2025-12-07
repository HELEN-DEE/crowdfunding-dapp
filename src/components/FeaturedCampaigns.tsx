"use client";
import React from 'react';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

const campaigns = [
{
    id: 1,
    title: "AI-Powered Education Platform",
    creator: "0x742d...3f4a",
    goal: "50 ETH",
    raised: "38.5 ETH",
    percentage: 77,
    backers: 124,
    daysLeft: 15
},
{
    id: 2,
    title: "Sustainable Fashion Marketplace",
    creator: "0x9a1b...7c2d",
    goal: "30 ETH",
    raised: "28.2 ETH",
    percentage: 94,
    backers: 89,
    daysLeft: 8
},
{
    id: 3,
    title: "Blockchain Gaming Studio",
    creator: "0x3e5f...9d1a",
    goal: "100 ETH",
    raised: "45.8 ETH",
    percentage: 46,
    backers: 203,
    daysLeft: 22
}
];


export default function FeaturedCampaigns() {
    const { isDark } = useTheme();
    return (
        <section className={` ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Featured Campaigns
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Support innovative projects launching on CrowdMint
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
                <div
                key={campaign.id}
                className={`rounded-2xl border p-6 hover:scale-105 transition-transform cursor-pointer ${
                    isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
                }`}
                >
                <div className={`h-48 rounded-xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
                
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {campaign.title}
                </h3>
                
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {campaign.creator}
                </p>

                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        {campaign.raised}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        of {campaign.goal}
                    </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}>
                    <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${campaign.percentage}%` }}
                    />
                    </div>
                </div>

                <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                    <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {campaign.backers} backers
                    </span>
                    </div>
                    <div className="flex items-center gap-1">
                    <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {campaign.daysLeft} days left
                    </span>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all inline-flex items-center gap-2">
                View All Campaigns
                <ArrowRight className="w-5 h-5" />
            </button>
            </div>
        </div>
        </section>
  );
}