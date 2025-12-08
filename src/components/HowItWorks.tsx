"use client";
import React from 'react';
import { Rocket, DollarSign, Target, CheckCircle } from 'lucide-react';
import { useTheme } from './ThemeContext';


const steps = [
        {
        number: "01",
        icon: Rocket,
        title: "Create Your Campaign",
        description: "Set your funding goal, deadline, and tell your story. Deploy your campaign to the blockchain in minutes."
        },
        {
        number: "02",
        icon: DollarSign,
        title: "Receive Contributions",
        description: "Backers support your project with cryptocurrency. All transactions are transparent and recorded on-chain."
        },
        {
        number: "03",
        icon: Target,
        title: "Reach Your Goal",
        description: "Once you hit your funding goal by the deadline, withdraw the funds and bring your vision to life."
        },
        {
        number: "04",
        icon: CheckCircle,
        title: "Deliver Results",
        description: "Use the funds to execute your project. If you don't reach your goal, all contributions are refunded to backers."
        }
    ];

export default function HowItWorks() {
    const { isDark } = useTheme();
    return (
        <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                How It Works
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Launch your campaign in four simple steps
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
                <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                }`}>
                    <step.icon className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                
                <span className='flex gap-2 items-center justify-center'>
                    <div className={`text-xl font-bold mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {step.number}
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                    {step.title}
                </h3>
                </span>
                
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                </p>
                </div>
            ))}
            </div>
        </div>
    </section>
    )
}