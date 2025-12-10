'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Clock, Users, Target } from 'lucide-react';
import { useTheme } from '../../components/ThemeContext';
import { BrowserProvider, Contract, formatEther } from 'ethers';

const CONTRACT_ABI = [
  "function campaignCount() view returns (uint256)",
  "function getCampaign(uint256 id) view returns (address creator, uint256 goal, uint256 deadline, uint256 totalFunded, bool claimed)"
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

interface Campaign {
  id: number;
  creator: string;
  goal: string;
  deadline: number;
  totalFunded: string;
  claimed: boolean;
  title: string;
  category: string;
  image: string;
  percentage: number;
  backers: number;
  daysLeft: number;
  isActive: boolean;
}

const CATEGORIES = ['All', 'Technology', 'Art & Design', 'Gaming', 'Education', 'Health & Wellness', 'Environment', 'Social Impact', 'Business'];
const MOCK_CAMPAIGNS = [
  { id: 1, creator: '0x742d...3f4a', goal: '50', totalFunded: '38.5', title: 'AI Education Platform', category: 'Technology', backers: 124, daysLeft: 15 },
  { id: 2, creator: '0x9a1b...7c2d', goal: '30', totalFunded: '28.2', title: 'Sustainable Fashion', category: 'Environment', backers: 89, daysLeft: 8 },
  { id: 3, creator: '0x3e5f...9d1a', goal: '100', totalFunded: '45.8', title: 'Blockchain Gaming', category: 'Gaming', backers: 203, daysLeft: 22 },
  { id: 4, creator: '0x5b2c...8e9f', goal: '25', totalFunded: '22.1', title: 'Digital Art NFTs', category: 'Art & Design', backers: 156, daysLeft: 5 },
  { id: 5, creator: '0x7d4a...2b1c', goal: '75', totalFunded: '12.3', title: 'Online Learning', category: 'Education', backers: 67, daysLeft: 30 },
  { id: 6, creator: '0x1f8e...5c3d', goal: '40', totalFunded: '35.7', title: 'Health Tech Wearable', category: 'Health & Wellness', backers: 112, daysLeft: 12 }
];

export default function ExploreCampaigns() {
  const { isDark } = useTheme();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filtered, setFiltered] = useState<Campaign[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [loading, setLoading] = useState(true);

  const createCampaign = useCallback((data: any, id: number, fromContract = false) => {
    const goal = fromContract ? formatEther(data.goal) : data.goal;
    const funded = fromContract ? formatEther(data.totalFunded) : data.totalFunded;
    const percentage = (parseFloat(funded) / parseFloat(goal)) * 100;
    const now = Math.floor(Date.now() / 1000);
    const deadline = fromContract ? Number(data.deadline) : (now + (data.daysLeft * 86400));
    const daysLeft = Math.max(0, Math.ceil((deadline - now) / 86400));
    const isActive = now < deadline && (fromContract ? !data.claimed : true);

    return {
      id,
      creator: fromContract ? data.creator : data.creator,
      goal,
      deadline,
      totalFunded: funded,
      claimed: fromContract ? data.claimed : false,
      title: fromContract ? `Campaign #${id}` : data.title,
      category: fromContract ? 'Technology' : data.category,
      image: '',
      percentage: Math.min(percentage, 100),
      backers: fromContract ? Math.floor(Math.random() * 200) : data.backers,
      daysLeft,
      isActive
    };
  }, []);

  const loadCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No wallet');
      }

      if (!CONTRACT_ADDRESS) {
        throw new Error('No contract address');
      }

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      const count = Number(await contract.campaignCount());
      const loaded = [];

      // Use Promise.all for parallel loading
      const loadPromises = Array.from({ length: count }, (_, i) => i + 1)
        .map(id => contract.getCampaign(id)
          .then(data => createCampaign(data, id, true))
          .catch(() => null) // Skip failed campaigns
        );

      const results = await Promise.all(loadPromises);
      loaded.push(...results.filter(Boolean) as Campaign[]);

      setCampaigns(loaded.length > 0 ? loaded : getMockCampaigns());
    } catch {
      setCampaigns(getMockCampaigns());
    } finally {
      setLoading(false);
    }
  }, [createCampaign]);

  const getMockCampaigns = useCallback(() => {
    return MOCK_CAMPAIGNS.map(data => createCampaign(data, data.id, false));
  }, [createCampaign]);

  const filterAndSort = useCallback(() => {
    let result = [...campaigns];

    if (search) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      result = result.filter(c => c.category === category);
    }

    switch (sortBy) {
      case 'trending': result.sort((a, b) => b.percentage - a.percentage); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      case 'ending': result.sort((a, b) => a.daysLeft - b.daysLeft); break;
      case 'funded': result.sort((a, b) => parseFloat(b.totalFunded) - parseFloat(a.totalFunded)); break;
    }

    setFiltered(result);
  }, [campaigns, search, category, sortBy]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  useEffect(() => {
    filterAndSort();
  }, [filterAndSort]);

  const theme = (dark: string, light: string) => isDark ? dark : light;

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className={`rounded-xl border p-6 animate-pulse ${theme('bg-gray-900 border-gray-800', 'bg-gray-50 border-gray-200')}`}>
          <div className={`h-48 rounded-lg mb-4 ${theme('bg-gray-800', 'bg-gray-200')}`} />
          <div className={`h-6 rounded mb-2 ${theme('bg-gray-800', 'bg-gray-200')}`} />
          <div className={`h-4 rounded mb-4 w-2/3 ${theme('bg-gray-800', 'bg-gray-200')}`} />
        </div>
      ))}
    </div>
  );

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <div
      onClick={() => window.location.href = `/campaign/${campaign.id}`}
      className={`rounded-xl border p-6 hover:scale-105 transition-all cursor-pointer ${theme('bg-gray-900 border-gray-800 hover:border-gray-700', 'bg-gray-50 border-gray-200 hover:border-gray-300')}`}
    >
      <div className={`h-48 rounded-lg mb-4 flex items-center justify-center ${theme('bg-gray-800', 'bg-gray-200')}`}>
        <Target className={`w-12 h-12 ${theme('text-gray-600', 'text-gray-400')}`} />
      </div>

      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${theme('bg-blue-900/30 text-blue-400', 'bg-blue-100 text-blue-700')}`}>
        {campaign.category}
      </span>

      <h3 className={`text-xl font-semibold mb-2 ${theme('text-white', 'text-black')}`}>
        {campaign.title}
      </h3>

      <p className={`text-sm mb-4 ${theme('text-gray-400', 'text-gray-600')}`}>
        by {campaign.creator}
      </p>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className={`font-semibold ${theme('text-white', 'text-black')}`}>
            {campaign.totalFunded} ETH
          </span>
          <span className={`text-sm ${theme('text-gray-400', 'text-gray-600')}`}>
            of {campaign.goal} ETH
          </span>
        </div>
        <div className={`w-full h-2 rounded-full ${theme('bg-gray-800', 'bg-gray-300')}`}>
          <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${Math.min(campaign.percentage, 100)}%` }} />
        </div>
        <p className={`text-sm mt-2 ${theme('text-gray-400', 'text-gray-600')}`}>
          {campaign.percentage.toFixed(0)}% funded
        </p>
      </div>

      <div className="flex justify-between text-sm pt-4 border-t ${theme('border-gray-800', 'border-gray-200')}">
        <div className="flex items-center gap-1">
          <Users className={`w-4 h-4 ${theme('text-gray-400', 'text-gray-600')}`} />
          <span className={theme('text-gray-400', 'text-gray-600')}>
            {campaign.backers} backers
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className={`w-4 h-4 ${theme('text-gray-400', 'text-gray-600')}`} />
          <span className={theme('text-gray-400', 'text-gray-600')}>
            {campaign.daysLeft} days left
          </span>
        </div>
      </div>

      {campaign.percentage >= 100 && (
        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            ✓ Funded
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${theme('bg-black', 'bg-white')} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-3 ${theme('text-white', 'text-black')}`}>
            Explore Campaigns
          </h1>
          <p className={`text-lg ${theme('text-gray-400', 'text-gray-600')}`}>
            Discover and support innovative projects
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme('text-gray-500', 'text-gray-400')}`} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border outline-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')}`}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : theme('bg-gray-800 text-gray-300 hover:bg-gray-700', 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className={`text-sm ${theme('text-gray-400', 'text-gray-600')}`}>
              {filtered.length} campaign{filtered.length !== 1 ? 's' : ''} found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border cursor-pointer outline-none ${theme('bg-gray-900 border-gray-700 text-white', 'bg-white border-gray-300 text-black')}`}
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="ending">Ending Soon</option>
              <option value="funded">Most Funded</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-lg ${theme('text-gray-400', 'text-gray-600')}`}>
              No campaigns found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}