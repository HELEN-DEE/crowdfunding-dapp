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
      <div className='py-6'>
        <div className='text-center'>
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-center pt-20 ${
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 ">
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
        </div>
      </div>
      
      {/* <div className="mx-auto px-4 sm:px-4 lg:px-6 py-6 ">
        <div className="text-center">
          Main Heading
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

          Subtitle
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Launch your campaign on the blockchain. Transparent, secure, and trustless fundraising for your next big idea.
          </p>

          CTA Buttons
          <div className="flex flex-col sm:flex-row justify-center gap-4 ">
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
        </div>
      </div> */}

      
    </section>
  );
};
