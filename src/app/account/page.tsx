'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthGate } from '@/components/account/AuthGate';
import MyAccountDashboard from '@/components/account/MyAccountDashboard';

export default function AccountPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin" />
        <span className="orbitron uppercase tracking-widest text-xs text-cyan-400">
          Synchronizing Console...
        </span>
      </div>
    );
  }

  if (!user) {
    return <AuthGate />;
  }

  return <MyAccountDashboard />;
}
