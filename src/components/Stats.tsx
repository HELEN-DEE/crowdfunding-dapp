"use client";
import React from 'react';
import { TrendingUp, CheckCircle, Users, BarChart3 } from 'lucide-react';
import { useTheme } from './ThemeContext';

const stats = [
    { label: "Total Raised", value: "1,234 ETH", icon: TrendingUp },
    { label: "Campaigns Funded", value: "156", icon: CheckCircle },
    { label: "Active Users", value: "2,847", icon: Users },
    { label: "Success Rate", value: "87%", icon: BarChart3 }
  ];


export default function Stats() {
    const {isDark} = useTheme()
    return (
        <section className={`py-20 ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        {stat.value}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                    </div>
                    </div>
                ))}
                </div>
            </div>
    </section>
    )
}