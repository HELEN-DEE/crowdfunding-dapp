"use client";

import React, { useState } from 'react';
import { Coins, Sun, Moon, Wallet, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { MetaMaskInpageProvider } from '@metamask/providers';

interface NavLink {
  name: string;
  path: string;
}

interface Window {
  ethereum?: MetaMaskInpageProvider;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Create', path: '/create-campaign' },
  { name: 'Explore', path: '/explore' },
  { name: 'Dashboard', path: '/dashboard' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const formatAddress = (addr: string): string => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const connectWallet = async (): Promise<void> => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (Array.isArray(accounts)) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error: unknown) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 ${
      isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    } border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Logo isDark={isDark} />

          {/* Desktop Navigation */}
          <DesktopNav navLinks={navLinks} isDark={isDark} />

          {/* Desktop Actions */}
          <DesktopActions 
            isDark={isDark} 
            toggleTheme={toggleTheme}
            connectWallet={connectWallet}
            isConnected={isConnected}
            address={address}
            formatAddress={formatAddress}
          />

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isDark={isDark} 
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        isDark={isDark}
        navLinks={navLinks}
        toggleTheme={toggleTheme}
        connectWallet={connectWallet}
        isConnected={isConnected}
        address={address}
        formatAddress={formatAddress}
        closeMobileMenu={closeMobileMenu}
      />
    </nav>
  );
}

// Logo Component
function Logo({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Coins className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
      <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        CrowdMint
      </h1>
    </div>
  );
}

// Desktop Navigation
interface DesktopNavProps {
  navLinks: NavLink[];
  isDark: boolean;
}

function DesktopNav({ navLinks, isDark }: DesktopNavProps) {
  return (
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
  );
}

// Desktop Actions
interface DesktopActionsProps {
  isDark: boolean;
  toggleTheme: () => void;
  connectWallet: () => void;
  isConnected: boolean;
  address: string;
  formatAddress: (addr: string) => string;
}

function DesktopActions({ 
  isDark, 
  toggleTheme, 
  connectWallet, 
  isConnected, 
  address, 
  formatAddress 
}: DesktopActionsProps) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg ${
          isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'
        } hover:opacity-80 transition-all`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <button
        onClick={connectWallet}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
      >
        <Wallet className="w-5 h-5" />
        <span>{isConnected ? formatAddress(address) : 'Connect Wallet'}</span>
      </button>
    </div>
  );
}

// Mobile Menu Button
interface MobileMenuButtonProps {
  isDark: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

function MobileMenuButton({ isDark, isMobileMenuOpen, toggleMobileMenu }: MobileMenuButtonProps) {
  return (
    <button
      onClick={toggleMobileMenu}
      className={`md:hidden p-2 rounded-lg ${
        isDark ? 'text-white' : 'text-black'
      }`}
      aria-label="Toggle mobile menu"
    >
      {isMobileMenuOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  );
}

// Mobile Menu
interface MobileMenuProps extends Omit<DesktopActionsProps, 'toggleTheme'> {
  isOpen: boolean;
  navLinks: NavLink[];
  closeMobileMenu: () => void;
  toggleTheme: () => void;
}

function MobileMenu({ 
  isOpen, 
  isDark, 
  navLinks, 
  toggleTheme, 
  connectWallet, 
  isConnected, 
  address, 
  formatAddress,
  closeMobileMenu
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={`md:hidden ${
      isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    } border-t`}>
      <div className="px-4 py-6 space-y-6">
        
        {/* Mobile Navigation Links */}
        <nav>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.path}
                  onClick={closeMobileMenu}
                  className={`block text-lg ${
                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                  } transition-colors`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Actions */}
        <div className="space-y-4">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg ${
              isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'
            } hover:opacity-80 transition-all`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            onClick={connectWallet}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <Wallet className="w-5 h-5" />
            <span>{isConnected ? formatAddress(address) : 'Connect Wallet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}