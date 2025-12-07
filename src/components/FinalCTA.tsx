"use client";
import { useTheme } from "./ThemeContext";
import { ArrowRight } from "lucide-react";


export default function FinalCTA() {
    const {isDark} = useTheme()
    return(
        <section className={`py-20 ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                Ready to Launch Your Campaign?
                </h2>
                
                <p className={`text-xl mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Join thousands of creators who have successfully funded their projects on CrowdMint
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2">
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                </button>
                
                <button className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all ${
                    isDark 
                    ? 'border-white text-white hover:bg-white hover:text-black' 
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}>
                    Learn More
                </button>
                </div>
            </div>
    </section>
    )
}