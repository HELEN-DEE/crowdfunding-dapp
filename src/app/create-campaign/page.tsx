'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Info, X, Calendar, Target, Image } from 'lucide-react';
import { useTheme } from '../../components/ThemeContext';
import { BrowserProvider, Contract, parseEther } from 'ethers';

const CONTRACT_ABI = [
  "function createCampaign(uint256 goal, uint256 deadline) external",
  "event CampaignCreated(uint256 indexed id, address indexed creator, uint256 goal, uint256 deadline)"
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const CATEGORIES = ['Technology', 'Art & Design', 'Gaming', 'Education', 'Health & Wellness', 'Environment', 'Social Impact', 'Business', 'Other'];

type FormData = {
  title: string;
  description: string;
  goalAmount: string;
  duration: string;
  category: string;
  imageUrl: string;
};

export default function CreateCampaign() {
  const { isDark } = useTheme();
  const [form, setForm] = useState<FormData>({
    title: '', description: '', goalAmount: '', duration: '30', category: '', imageUrl: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (form.title.length < 10) errs.title = 'Title must be at least 10 characters';
    if (form.description.length < 100) errs.description = 'Description must be at least 100 characters';
    if (!parseFloat(form.goalAmount)) errs.goalAmount = 'Please enter a valid funding goal';
    if (!form.category) errs.category = 'Please select a category';
    if (!imageFile) errs.imageUrl = 'Please upload a campaign image';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5000000) {
      setErrors({ ...errors, imageUrl: 'Image must be less than 5MB' });
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors({ ...errors, imageUrl: undefined });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || typeof window.ethereum === 'undefined') {
      alert(!window.ethereum ? 'Please install MetaMask' : 'Please fix errors');
      return;
    }

    setSubmitting(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const goalWei = parseEther(form.goalAmount);
      const deadline = Math.floor(Date.now() / 1000) + (parseInt(form.duration) * 86400);
      
      const tx = await contract.createCampaign(goalWei, deadline);
      await tx.wait();
      
      alert('Campaign created successfully!');
      setForm({ title: '', description: '', goalAmount: '', duration: '30', category: '', imageUrl: '' });
      setImageFile(null);
      setImagePreview('');
      setErrors({});
    } catch (err: any) {
      console.error(err);
      alert(err.code === 'ACTION_REJECTED' ? 'Transaction rejected' : 'Failed to create campaign');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const deadlineDate = () => {
    const days = parseInt(form.duration);
    if (!days) return '';
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const theme = (dark: string, light: string) => isDark ? dark : light;

  return (
    <div className={`min-h-screen ${theme('bg-black', 'bg-white')} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-3 ${theme('text-white', 'text-black')}`}>Start a Campaign</h1>
          <p className={`text-lg ${theme('text-gray-400', 'text-gray-600')}`}>Share your vision and get funded on the blockchain</p>
        </div>

        <div className={`p-4 rounded-lg mb-8 border ${theme('bg-blue-900/20 border-blue-800', 'bg-blue-50 border-blue-200')}`}>
          <div className="flex gap-3">
            <Info className={`w-5 h-5 mt-0.5 ${theme('text-blue-400', 'text-blue-600')}`} />
            <p className={`text-sm ${theme('text-blue-300', 'text-blue-800')}`}>
              Your campaign will be deployed as a smart contract. All details must be correct.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Image Upload */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${theme('text-white', 'text-black')}`}>Campaign Image *</label>
            {!imagePreview ? (
              <label className={`border-2 border-dashed rounded-lg p-12 cursor-pointer flex flex-col items-center justify-center ${theme('border-gray-700 bg-gray-900', 'border-gray-300 bg-gray-50')} ${errors.imageUrl ? 'border-red-500' : ''}`}>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                <Image className={`w-12 h-12 mb-4 ${theme('text-gray-600', 'text-gray-400')}`} />
                <p className={`text-sm font-medium mb-1 ${theme('text-gray-300', 'text-gray-700')}`}>Click to upload image</p>
                <p className={`text-xs ${theme('text-gray-500', 'text-gray-500')}`}>PNG, JPG up to 5MB</p>
              </label>
            ) : (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="absolute top-2 right-2 p-2 bg-black/50 rounded-full">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
            {errors.imageUrl && <p className="text-red-500 text-sm mt-2">{errors.imageUrl}</p>}
          </div>

          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme('text-white', 'text-black')}`}>Campaign Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Clear, memorable title" 
              className={`w-full px-4 py-3 rounded-lg border outline-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')} ${errors.title ? 'border-red-500' : ''}`} />
            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme('text-white', 'text-black')}`}>Category *</label>
            <select name="category" value={form.category} onChange={handleChange} 
              className={`w-full px-4 py-3 rounded-lg border outline-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')} ${errors.category ? 'border-red-500' : ''}`}>
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme('text-white', 'text-black')}`}>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={6} placeholder="Tell people about your project..." 
              className={`w-full px-4 py-3 rounded-lg border outline-none resize-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')} ${errors.description ? 'border-red-500' : ''}`} />
            <p className={`text-sm mt-2 ${theme('text-gray-500', 'text-gray-500')}`}>{form.description.length} / 100 minimum</p>
          </div>

          {/* Goal & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme('text-white', 'text-black')}`}>Goal (ETH) *</label>
              <div className="relative">
                <Target className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme('text-gray-500', 'text-gray-400')}`} />
                <input type="number" name="goalAmount" value={form.goalAmount} onChange={handleChange} step="0.01" placeholder="0.00" 
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')} ${errors.goalAmount ? 'border-red-500' : ''}`} />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme('text-white', 'text-black')}`}>Duration (days) *</label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme('text-gray-500', 'text-gray-400')}`} />
                <input type="number" name="duration" value={form.duration} onChange={handleChange} min="1" max="90" 
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')}`} />
              </div>
              {form.duration && <p className={`text-sm mt-2 ${theme('text-gray-400', 'text-gray-600')}`}>Ends on {deadlineDate()}</p>}
            </div>
          </div>

          {/* Summary */}
          {form.title && form.goalAmount && (
            <div className={`p-6 rounded-lg border ${theme('bg-gray-900 border-gray-800', 'bg-gray-50 border-gray-200')}`}>
              <h3 className={`font-semibold mb-4 ${theme('text-white', 'text-black')}`}>Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className={theme('text-gray-400', 'text-gray-600')}>Goal</span><span className={theme('text-white', 'text-black')}>{parseFloat(form.goalAmount).toFixed(2)} ETH</span></div>
                <div className="flex justify-between"><span className={theme('text-gray-400', 'text-gray-600')}>Duration</span><span className={theme('text-white', 'text-black')}>{form.duration} days</span></div>
                <div className="flex justify-between"><span className={theme('text-gray-400', 'text-gray-600')}>Deadline</span><span className={theme('text-white', 'text-black')}>{deadlineDate()}</span></div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button type="submit" disabled={submitting} className={`flex-1 py-4 rounded-lg font-semibold text-white ${submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {submitting ? 'Creating...' : 'Launch Campaign'}
            </button>
            <button type="button" onClick={() => window.history.back()} className={`px-8 py-4 rounded-lg font-semibold border-2 ${theme('border-gray-700 text-gray-300', 'border-gray-300 text-gray-700')}`}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}