"use client";
import React from 'react';
import { MessageCircle, FileText, HelpCircle, Rocket, Shield, Globe, ExternalLink } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import {FaDiscord, FaTelegram } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  
  // Simplified data structure
  const footerLinks = {
    product: [
      { label: 'Explore Campaigns', href: '/campaigns', icon: Rocket },
      { label: 'Start a Campaign', href: '/create', icon: Rocket },
      { label: 'How It Works', href: '/learn', icon: HelpCircle },
      { label: 'Success Stories', href: '/success', icon: Shield }
    ],
    resources: [
      { label: 'Documentation', href: '/docs', icon: FileText },
      { label: 'Help Center', href: '/help', icon: HelpCircle },
      { label: 'Smart Contract', href: '/contract', icon: FileText },
      { label: 'Blog', href: '/blog', icon: MessageCircle }
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: FaXTwitter, href: 'https://twitter.com/crowdmint', label: 'Twitter' },
    { icon: FaDiscord, href: 'https://discord.gg/crowdmint', label: 'Discord', isReactIcon: true },
    { icon: FaTelegram, href: 'https://t.me/crowdmint', label: 'Telegram', isReactIcon: true },
  ];

  const supportedNetworks = [
    { name: 'Ethereum', color: 'purple' },
    { name: 'Polygon', color: 'indigo' },
    { name: 'Base', color: 'blue' },
    { name: 'Arbitrum', color: 'cyan' }
  ];

  const contractAddress = '0x7a3...c9f';

  // Theme helper
  const theme = {
    bg: isDark ? 'bg-black' : 'bg-white',
    border: isDark ? 'border-gray-800' : 'border-gray-200',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      hover: isDark ? 'hover:text-white' : 'hover:text-gray-900'
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <footer className={`${theme.bg} border-t ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <Globe className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${theme.text.primary}`}>CrowdMint</h3>
                <p className={`text-sm ${theme.text.secondary}`}>Web3 Crowdfunding</p>
              </div>
            </div>
            <p className={`${theme.text.secondary} text-sm leading-relaxed`}>
              Decentralized crowdfunding platform where creators meet supporters in a trustless environment.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    aria-label={social.label}
                  >
                    {social.isReactIcon ? (
                      <IconComponent className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className={`font-semibold mb-4 ${theme.text.primary} flex items-center gap-2`}>
                <Rocket className="w-4 h-4" />
                Platform
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 text-sm ${theme.text.secondary} ${theme.text.hover} transition-colors`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${theme.text.primary} flex items-center gap-2`}>
                <FileText className="w-4 h-4" />
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 text-sm ${theme.text.secondary} ${theme.text.hover} transition-colors`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Web3 Section - Compact and Unique */}
        <div className={`mb-8 p-6 rounded-xl ${
          isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className={`font-medium mb-2 ${theme.text.primary} flex items-center gap-2`}>
                <Shield className="w-4 h-4" />
                On-Chain Transparency
              </h4>
              <div className="flex items-center gap-2">
                <code className={`text-sm font-mono ${theme.text.secondary}`}>
                  {contractAddress}
                </code>
                <button
                  onClick={() => copyToClipboard(contractAddress)}
                  className={`p-1 rounded ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                  aria-label="Copy contract address"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div>
              <p className={`text-sm mb-2 ${theme.text.secondary}`}>Supported Networks</p>
              <div className="flex flex-wrap gap-2">
                {supportedNetworks.map((network, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      isDark 
                        ? 'bg-gray-800 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {network.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${theme.border}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              <p className={theme.text.secondary}>
                © {new Date().getFullYear()} CrowdMint —{' '}
                <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Decentralized Crowdfunding
                </span>
              </p>
            </div>
            
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`${theme.text.secondary} ${theme.text.hover} transition-colors`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className={`text-xs ${theme.text.secondary} max-w-md text-center md:text-right`}>
              Smart contracts are audited but use at your own risk. Always DYOR.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;