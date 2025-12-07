"use client";
import React from "react";
import { Zap, CheckCircle, DollarSign } from "lucide-react";
import { useTheme } from "./ThemeContext";


const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Deploy campaigns in minutes with our streamlined smart contract system."
    },
    {
      icon: CheckCircle,
      title: "Built-in Protection",
      description: "Automatic refunds if goals aren't met. Your backers are always protected."
    },
    {
      icon: DollarSign,
      title: "Lower Fees",
      description: "Pay only blockchain gas fees. No platform commissions or hidden charges."
    }
  ];


export default function WhyChoose() {
    const {isDark} = useTheme()
    return (
        <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Why Choose CrowdMint
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The most transparent and secure way to fund your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border text-center ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                isDark ? 'bg-gray-900' : 'bg-gray-100'
              }`}>
                <benefit.icon className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              
              <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {benefit.title}
              </h3>
              
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    )
}