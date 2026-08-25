import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  KeyRound, 
  Sparkles, 
  FileJson, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Mail,
  User
} from 'lucide-react';
import { useAdminData } from '../AdminDataContext';
import { useAdminAuth } from '../AdminAuthContext';
import { WebsiteSettings } from '../../types/database';
import { ConfirmModal } from '../components/ConfirmModal';

export const WebsiteSettingsView: React.FC = () => {
  const { 
    db, 
    saveWebsiteSettings, 
    exportBackupJson, 
    importBackupJson, 
    resetToDefaults, 
    isSaving, 
    showToast 
  } = useAdminData();

  const { changeCredentials, user } = useAdminAuth();

  // Settings State
  const [settings, setSettings] = useState<WebsiteSettings>({ ...db.websiteSettings });
  
  // Password / Credentials change state
  const [credForm, setCredForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newName: user?.name || db.business.ownerName || 'Ankit Kumar',
    newUsername: user?.username || 'admin',
    newEmail: user?.email || 'admin@3aauto.com'
  });
  const [isChangingCreds, setIsChangingCreds] = useState(false);

  // Modals
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false);
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null);

  const handleSettingsChange = (field: keyof WebsiteSettings, val: any) => {
    setSettings(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveWebsiteSettings(settings);
  };

  const handleImportFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPendingImportFile(e.target.files[0]);
      setIsImportConfirmOpen(true);
    }
  };

  const handleConfirmImport = async () => {
    if (pendingImportFile) {
      await importBackupJson(pendingImportFile);
      setPendingImportFile(null);
      setIsImportConfirmOpen(false);
    }
  };

  const handleConfirmReset = async () => {
    await resetToDefaults();
    setIsResetConfirmOpen(false);
  };

  const handleCredsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credForm.newPassword !== credForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (credForm.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    setIsChangingCreds(true);
    const res = await changeCredentials({
      currentPassword: credForm.currentPassword,
      newPassword: credForm.newPassword,
      newEmail: credForm.newEmail,
      newUsername: credForm.newUsername,
      newName: credForm.newName
    });

    setIsChangingCreds(false);
    if (res.success) {
      showToast('Admin login credentials successfully updated!', 'success');
      setCredForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } else {
      showToast(res.error || 'Failed to update credentials', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1224] border border-amber-500/30">
        <div>
          <h2 className="text-lg font-black text-white flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>Website Settings, SEO & Database Backups</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage global search meta tags, top announcement ticker, export/import JSON backups, and admin password.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Global SEO & Ticker Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SEO & Meta */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Search Engine Optimization (SEO) & Title</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Browser Title Bar Text (HTML Title) *
              </label>
              <input
                type="text"
                required
                value={settings.websiteTitle}
                onChange={(e) => handleSettingsChange('websiteTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Search Engine Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => handleSettingsChange('metaDescription', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Keywords (Comma Separated)
              </label>
              <textarea
                rows={2}
                value={settings.keywords}
                onChange={(e) => handleSettingsChange('keywords', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
            </div>
          </div>

          {/* Header Notice Banner */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Top Header Announcement Bar</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Notice Ticker Announcement Message
              </label>
              <input
                type="text"
                value={settings.headerNotice}
                onChange={(e) => handleSettingsChange('headerNotice', e.target.value)}
                placeholder="Special Offer: Up to 30% Off on Full Makeover Packages..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNoticeBar}
                  onChange={(e) => handleSettingsChange('enableNoticeBar', e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                />
                <span className="text-xs font-bold text-white">Enable Announcement Bar on Public Website</span>
              </label>
            </div>
          </div>

          {/* Change Admin Password */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Change Admin Account Credentials</span>
            </h3>

            <form onSubmit={handleCredsSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Admin Username</label>
                  <input
                    type="text"
                    required
                    value={credForm.newUsername}
                    onChange={(e) => setCredForm(prev => ({ ...prev, newUsername: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={credForm.newEmail}
                    onChange={(e) => setCredForm(prev => ({ ...prev, newEmail: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={credForm.currentPassword}
                  onChange={(e) => setCredForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">New Password (min 6 chars)</label>
                  <input
                    type="password"
                    required
                    value={credForm.newPassword}
                    onChange={(e) => setCredForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={credForm.confirmPassword}
                    onChange={(e) => setCredForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingCreds}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                {isChangingCreds ? 'Updating...' : 'Update Login Credentials'}
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Database Backups & Factory Reset (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Backup & Export */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <FileJson className="w-4 h-4" />
              <span>Full Data Backup & Restore</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Export your entire website state (all 16+ products, categories, reviews, gallery items, owner information, and texts) to a single portable JSON file.
            </p>

            <button
              type="button"
              onClick={exportBackupJson}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold flex items-center justify-center space-x-2 border border-slate-700 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Full JSON Backup</span>
            </button>

            <div className="pt-2 border-t border-white/5">
              <label className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold flex items-center justify-center space-x-2 border border-slate-700 shadow-md transition-all cursor-pointer">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Restore Database From JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportFileSelect}
                />
              </label>
            </div>
          </div>

          {/* Reset to Factory Defaults */}
          <div className="bg-[#0A1224] rounded-2xl p-6 border border-rose-500/20 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Factory Reset Database</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Resets all store data back to the default seeded state with luxury demo products and initial settings.
            </p>

            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 text-xs font-bold flex items-center justify-center space-x-2 border border-rose-500/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>

        </div>

      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset All Website Data?"
        message="This will wipe any custom products or reviews you created and restore the default 3A Auto Accessories dataset. Are you sure?"
        confirmLabel="Yes, Reset to Defaults"
        isDanger={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />

      <ConfirmModal
        isOpen={isImportConfirmOpen}
        title="Restore Database Backup?"
        message={`Are you sure you want to restore "${pendingImportFile?.name}"? This will overwrite existing products and store settings with the contents of the backup file.`}
        confirmLabel="Yes, Restore Backup"
        isDanger={false}
        onConfirm={handleConfirmImport}
        onCancel={() => {
          setPendingImportFile(null);
          setIsImportConfirmOpen(false);
        }}
      />

    </div>
  );
};
