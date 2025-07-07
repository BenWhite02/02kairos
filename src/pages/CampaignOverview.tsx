// =============================================================================
// KAIROS FRONTEND - CAMPAIGN OVERVIEW PAGE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/CampaignOverview.tsx
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { BoltIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CampaignOverview() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Campaign Overview
          </h1>
          <p className="text-gray-400 mt-1">
            Monitor and manage your marketing campaigns
          </p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 transition-opacity">
          <PlusIcon className="w-4 h-4 inline mr-2" />
          New Campaign
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center"
      >
        <BoltIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Campaign Management</h2>
        <p className="text-gray-400 mb-4">
          Comprehensive campaign monitoring and optimization tools
        </p>
        <div className="text-sm text-gray-500">
          Coming soon: Campaign analytics, A/B testing, and performance optimization
        </div>
      </motion.div>
    </div>
  );
}