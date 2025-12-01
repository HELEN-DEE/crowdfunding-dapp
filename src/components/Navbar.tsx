// import React from 'react'

// const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Create Campaign', path: '/create-campaign' },
//     { name: 'My Campaigns', path: '/my-campaigns' },
//     { name: 'Profile', path: '/profile' },
// ];

// const Navbar = () => {
//   return (
//     <section className='flex items-center justify-between py-4 px-12'>
//         <h1 className='text-4xl'>
//             CrowdMint
//         </h1>
//         <nav>
//             <ul className='flex gap-3'>
//                 {navLinks.map((link) => (
//                     <li key={link.name}>
//                         <a href={link.path}>{link.name}</a>
//                     </li>
//                 ))}
//             </ul>
//         </nav>

//     </section>
//   )
// }

// export default Navbar
"use client";
import React, { useState } from 'react';
import { Coins, Sun, Moon, Wallet } from 'lucide-react';
import { useTheme } from './ThemeContext';

declare global {
  interface Window {
    ethereum?: number;
  }
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Create Campaign', path: '/create-campaign' },
  { name: 'My Campaigns', path: '/my-campaigns' },
  { name: 'Profile', path: '/profile' },
];

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <nav className={`sticky top-0  ${
      isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    } border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Coins className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
            <h1 className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              CrowdMint
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className={`${
                      isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                    } transition-colors`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'
              } hover:opacity-80 transition-all`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Connect Wallet Button */}
            <button
              onClick={connectWallet}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              <Wallet className="w-5 h-5" />
              <span>{isConnected ? formatAddress(address) : 'Connect Wallet'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}