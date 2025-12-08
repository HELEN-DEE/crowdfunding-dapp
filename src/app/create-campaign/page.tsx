'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Info, Upload, X, Calendar, Target, FileText, Image } from 'lucide-react';
import {useTheme} from '../../components/ThemeContext';

// Define types for form data
interface FormData {
    title: string;
    description: string;
    goalAmount: string;
    duration: string;
    category: string;
    imageUrl: string;
}

interface Errors {
    title?: string;
    description?: string;
    goalAmount?: string;
    category?: string;
    image?: string;
}

export default function CreateCampaign() {
    const { isDark } = useTheme();

    const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    goalAmount: '',
    duration: '30',
    category: '',
    imageUrl: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const categories: string[] = [
    'Technology',
    'Art & Design',
    'Gaming',
    'Education',
    'Health & Wellness',
    'Environment',
    'Social Impact',
    'Business',
    'Other'
    ];

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
        if (file.size > 5000000) {
        setErrors({ ...errors, image: 'Image must be less than 5MB' });
        return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      // Remove image error if it exists
        const newErrors = { ...errors };
        delete newErrors.image;
        setErrors(newErrors);
    }
  };

    const removeImage = (): void => {
    setImageFile(null);
    setImagePreview('');
  };

    const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.title.trim() || formData.title.length < 10) {
        newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.description.trim() || formData.description.length < 100) {
      newErrors.description = 'Description must be at least 100 characters';
    }

    if (!formData.goalAmount || parseFloat(formData.goalAmount) <= 0) {
        newErrors.goalAmount = 'Please enter a valid funding goal';
    }

    if (!formData.category) {
        newErrors.category = 'Please select a category';
    }

    if (!imageFile) {
      newErrors.image = 'Please upload a campaign image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here I would:
      // 1. Upload image to IPFS or storage
      // 2. Call smart contract createCampaign function
      // 3. Wait for transaction confirmation
        
        console.log('Creating campaign:', formData);
        
      // Simulate transaction
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        alert('Campaign created successfully!');
    
      // Reset form
    setFormData({
        title: '',
        description: '',
        goalAmount: '',
        duration: '30',
        category: '',
        imageUrl: '',
        });
        setImageFile(null);
        setImagePreview('');
        setErrors({});
        
    } catch (error) {
        console.error('Error creating campaign:', error);
        alert('Failed to create campaign. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof Errors]) {
        const newErrors = { ...errors };
        delete newErrors[name as keyof Errors];
        setErrors(newErrors);
    }
    };

    const calculateDeadline = (): string => {
        const days = parseInt(formData.duration);
        if (isNaN(days) || days <= 0) return '';
        
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + days);
        return deadline.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
        });
    };

  // Handle back button click
    const handleBack = (): void => {
        if (window.history.length > 1) {
        window.history.back();
        } else {
        window.location.href = '/';
        }
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} py-12`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="mb-12">
            <h1 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                Start a Campaign
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your vision with the world and get funded on the blockchain
            </p>
            </div>

            {/* Info Banner */}
            <div className={`p-4 rounded-lg mb-8 border ${
            isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
            }`}>
            <div className="flex gap-3">
                <Info className={`w-5 h-5 mt-0.5 shrink-0 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <div>
                <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                    Your campaign will be deployed as a smart contract. Make sure all details are correct before submitting. 
                    If your goal isn't met by the deadline, all contributions will be automatically refunded.
                </p>
                </div>
            </div>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Campaign Image */}
            <div>
                <label className={`block text-sm font-medium mb-3 ${
                isDark ? 'text-white' : 'text-black'
                }`}>
                Campaign Image *
                </label>
                
                {!imagePreview ? (
                <div>
                    <label className={`border-2 border-dashed rounded-lg p-12 cursor-pointer transition-colors flex flex-col items-center justify-center ${
                    isDark 
                        ? 'border-gray-700 hover:border-gray-600 bg-gray-900' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                    } ${errors.image ? 'border-red-500' : ''}`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    <Image className={`w-12 h-12 mb-4 ${
                        isDark ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-medium mb-1 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        Click to upload campaign image
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        PNG, JPG up to 5MB
                    </p>
                    </label>
                    {errors.image && (
                    <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                    )}
                </div>
                ) : (
                <div className="relative">
                    <img
                    src={imagePreview}
                    alt="Campaign preview"
                    className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="Remove image"
                    >
                    <X className="w-5 h-5 text-white" />
                    </button>
                </div>
                )}
            </div>

            {/* Campaign Title */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-white' : 'text-black'
                }`}>
                Campaign Title *
                </label>
                <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your campaign a clear, memorable title"
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500'
                } ${errors.title ? 'border-red-500' : ''} outline-none`}
                />
                {errors.title && (
                <p className="text-red-500 text-sm mt-2">{errors.title}</p>
                )}
            </div>

            {/* Category */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-white' : 'text-black'
                }`}>
                Category *
                </label>
                <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-black focus:border-blue-500'
                } ${errors.category ? 'border-red-500' : ''} outline-none`}
                >
                <option value="">Select a category</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
                {errors.category && (
                <p className="text-red-500 text-sm mt-2">{errors.category}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-white' : 'text-black'
                }`}>
                Campaign Description *
                </label>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                placeholder="Tell people about your project. What makes it special? What will you do with the funds?"
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                    isDark 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500'
                } ${errors.description ? 'border-red-500' : ''} outline-none`}
                />
                <div className="flex justify-between items-center mt-2">
                {errors.description ? (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                ) : (
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {formData.description.length} / 100 minimum
                    </p>
                )}
                </div>
            </div>

            {/* Funding Goal and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Funding Goal */}
                <div>
                <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white' : 'text-black'
                }`}>
                    Funding Goal (ETH) *
                </label>
                <div className="relative">
                    <Target className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                    type="number"
                    name="goalAmount"
                    value={formData.goalAmount}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-black placeholder-gray-400 focus:border-blue-500'
                    } ${errors.goalAmount ? 'border-red-500' : ''} outline-none`}
                    />
                </div>
                {errors.goalAmount && (
                    <p className="text-red-500 text-sm mt-2">{errors.goalAmount}</p>
                )}
                </div>

                {/* Duration */}
                <div>
                <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white' : 'text-black'
                }`}>
                    Campaign Duration (days) *
                </label>
                <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    max="90"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                        ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-black focus:border-blue-500'
                    } outline-none`}
                    />
                </div>
                {formData.duration && (
                    <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ends on {calculateDeadline()}
                    </p>
                )}
                </div>
            </div>

            {/* Summary Card */}
            {formData.title && formData.goalAmount && (
                <div className={`p-6 rounded-lg border ${
                isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
                }`}>
                <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    Campaign Summary
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Goal</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {parseFloat(formData.goalAmount).toFixed(2)} ETH
                    </span>
                    </div>
                    <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Duration</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {formData.duration} days
                    </span>
                    </div>
                    <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Deadline</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {calculateDeadline()}
                    </span>
                    </div>
                </div>
                </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
                <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-4 rounded-lg font-semibold text-white transition-all ${
                    isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                >
                {isSubmitting ? 'Creating Campaign...' : 'Launch Campaign'}
                </button>
                <button
                type="button"
                onClick={handleBack}
                className={`px-8 py-4 rounded-lg font-semibold border-2 transition-all ${
                    isDark 
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-900' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                >
                Cancel
                </button>
            </div>

            </form>

        </div>
        </div>
    );
}