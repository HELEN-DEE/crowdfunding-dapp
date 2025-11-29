'use client';

import React from 'react';
import { Shield, TrendingUp, Users } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section className={`${
      isDark ? 'bg-black' : 'bg-white'
    } transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Decentralized
            <br />
            <span className={`${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Crowdfunding Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Launch your campaign on the blockchain. Transparent, secure, and trustless fundraising for your next big idea.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-all">
              Create Campaign
            </button>
            <button className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all ${
              isDark 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}>
              Explore Campaigns
            </button>
          </div>

          {/* Features Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            Feature 1
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <Shield className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Secure & Trustless
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Smart contracts ensure funds are only released when goals are met. No intermediaries needed.
              </p>
            </div>

            Feature 2
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <TrendingUp className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Transparent Funding
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Track every contribution on-chain. Complete transparency for backers and creators.
              </p>
            </div>

            Feature 3
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <Users className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Automatic Refunds
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Contributors get automatic refunds if campaigns don&apos;t reach their goals.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
