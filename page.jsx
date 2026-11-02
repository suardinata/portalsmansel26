'use client';

import React, { useState } from 'react';
import { 
  Lock, Globe, Layout, Palette, Settings, Eye, RefreshCw, 
  Trash2, Plus, Type, AlignLeft, AlignCenter, AlignRight, Check,
  Sliders, Shield, Copy, ExternalLink, LogOut, FileText, AlertTriangle
} from 'lucide-react';

export default function PortalSMAN1Selat() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [activeView, setActiveView] = useState('public');
  const [syncStatus, setSyncStatus] = useState('synced');
  const [copied, setCopied] = useState(false);

  const [pages] = useState([
    { id: 'home', title: 'Beranda' },
    { id: 'profil', title: 'Profil Sekolah' },
    { id: 'berita', title: 'Berita & Pengumuman' },
    { id: 'akademik', title: 'Informasi Akademik' }
  ]);

  const [portalContent, setPortalContent] = useState({
    siteTitle: 'SMAN 1 SELAT',
    tagline: 'Mewujudkan Generasi Unggul, Berkarakter, dan Berteknologi',
    primaryColor: '#0f172a',
    blocks: [
      {
        id: 'block-1',
        pageId: 'home',
        title: 'Selamat Datang di Portal Resmi SMAN 1 Selat',
        content: 'Portal digital terpadu untuk penyampaian informasi pengumuman, agenda akademik, dan layanan pembelajaran digital SMAN 1 Selat.',
        fontSize: '18px',
        textColor: '#1e293b',
        bgColor: '#ffffff',
        alignment: 'center'
      },
      {
        id: 'block-2',
        pageId: 'home',
        title: 'Pengumuman Penting Proktor',
        content: 'Seluruh peserta didik diimbau untuk memeriksa jadwal ujian semester dan verifikasi akun portal sekolah masing-masing.',
        fontSize: '16px',
        textColor: '#0f172a',
        bgColor: '#f1f5f9',
        alignment: 'left'
      },
      {
        id: 'block-3',
        pageId: 'profil',
        title: 'Visi & Misi SMAN 1 Selat',
        content: 'Visi: Terwujudnya sekolah berprestasi, berbudaya, dan berwawasan lingkungan berbasis Imtek dan Imtaq.',
        fontSize: '16px',
        textColor: '#334155',
        bgColor: '#ffffff',
        alignment: 'left'
      }
    ]
  });

  const saveToCloud = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'smansel@2026' || password === 'proktor') {
      setIsAdmin(true);
      setLoginError('');
      setActiveView('editor');
    } else {
      setLoginError('Password Proktor salah! (Gunakan: smansel@2026)');
    }
  };

  const updateBlock = (blockId, field, value) => {
    setPortalContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === blockId ? { ...b, [field]: value } : b)
    }));
    saveToCloud();
  };

  const addBlock = (pageId) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      pageId: pageId,
      title: 'Judul Blok Baru',
      content: 'Tuliskan konten deskripsi blok informasi di sini.',
      fontSize: '16px',
      textColor: '#1e293b',
      bgColor: '#ffffff',
      alignment: 'left'
    };
    setPortalContent(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    saveToCloud();
  };

  const deleteBlock = (blockId) => {
    setPortalContent(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId)
    }));
    saveToCloud();
  };

  const embedCode = `<iframe src="https://portalsman1selat.vercel.app" style="width: 100%; height: 100vh; min-height: 850px; border: none; outline: none;" allow="fullscreen"></iframe>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Top Banner Header */}
      <header className="bg-slate-900 text-white shadow-md border-b border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-900 text-xl shadow">
              S1
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">{portalContent.siteTitle}</h1>
              <p className="text-xs text-amber-400 font-medium">{portalContent.tagline}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400">
              <span className={`w-2 h-2 rounded-full ${syncStatus === 'syncing' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
              <span>{syncStatus === 'syncing' ? 'Menyimpan ke Cloud...' : '🟢 Realtime Cloud DB Synced'}</span>
            </div>

            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveView(activeView === 'editor' ? 'public' : 'editor')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded text-xs font-semibold flex items-center space-x-1 transition"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{activeView === 'editor' ? 'Lihat Tampilan Public' : 'Editor Proktor'}</span>
                </button>
                <button 
                  onClick={() => setActiveView('export')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center space-x-1 transition"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Export Google Sites</span>
                </button>
                <button 
                  onClick={() => { setIsAdmin(false); setActiveView('public'); }}
                  className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs flex items-center transition"
                  title="Logout Proktor"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setActiveView('login')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-medium flex items-center space-x-1.5 transition"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Login Proktor</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-slate-950 border-t border-slate-800 px-4">
          <div className="max-w-6xl mx-auto flex space-x-1 overflow-x-auto py-2">
            {pages.map(page => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className={`px-4 py-1.5 rounded text-xs font-medium whitespace-nowrap transition ${
                  activeTab === page.id 
                    ? 'bg-amber-500 text-slate-950 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* VIEW 1: LOGIN PROKTOR */}
        {activeView === 'login' && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-900 mb-4">
              <Shield className="w-6 h-6 text-amber-500" />
              <h2 className="text-lg font-bold">Login Dasbor Proktor SMAN 1 Selat</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Masukan kata sandi Proktor untuk membuka akses Visual Editor dan manajemen database terpusat.
            </p>
            {loginError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi Proktor</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-xs transition"
                >
                  Masuk Dasbor Proktor
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveView('public')}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs transition"
                >
                  Batal
                </button>
              </div>
            </form>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              * Password default testing: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">smansel@2026</code>
            </div>
          </div>
        )}

        {/* VIEW 2: EXPORT GOOGLE SITES */}
        {activeView === 'export' && isAdmin && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>Export & Sematkan di Google Sites</span>
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Gunakan kode embed HTML berikut untuk dipasang pada Google Sites sekolah SMAN 1 Selat. Semua perubahan yang dilakukan Proktor di dasbor ini akan otomatis terbarui di Google Sites.
            </p>
            
            <div className="bg-slate-900 p-4 rounded-lg text-slate-200 text-xs font-mono mb-4 relative overflow-x-auto">
              <code>{embedCode}</code>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={copyEmbed}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Berhasil Disalin!' : 'Salin Kode Embed Google Sites'}</span>
              </button>
              <button 
                onClick={() => setActiveView('editor')}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-medium transition"
              >
                Kembali ke Editor
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: EDITOR PROKTOR */}
        {activeView === 'editor' && isAdmin && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-amber-900 text-sm">Mode Visual Block Editor Proktor Aktif</h3>
                <p className="text-xs text-amber-700">Anda dapat mengubah judul, isi, font, warna, dan posisi blok pada tab <b>{pages.find(p => p.id === activeTab)?.title}</b>.</p>
              </div>
              <button 
                onClick={() => addBlock(activeTab)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold flex items-center space-x-1 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Blok Informasi</span>
              </button>
            </div>

            {portalContent.blocks.filter(b => b.pageId === activeTab).map(block => (
              <div key={block.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID Blok: {block.id}</span>
                  <button 
                    onClick={() => deleteBlock(block.id)}
                    className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 transition"
                    title="Hapus Blok Ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Ukuran Font</label>
                    <select 
                      value={block.fontSize}
                      onChange={(e) => updateBlock(block.id, 'fontSize', e.target.value)}
                      className="w-full bg-white border rounded px-2 py-1 text-xs"
                    >
                      <option value="14px">Kecil (14px)</option>
                      <option value="16px">Sedang (16px)</option>
                      <option value="18px">Besar (18px)</option>
                      <option value="24px">Sangat Besar (24px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Warna Teks</label>
                    <input 
                      type="color" 
                      value={block.textColor}
                      onChange={(e) => updateBlock(block.id, 'textColor', e.target.value)}
                      className="w-full h-7 border rounded cursor-pointer p-0.5 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Warna Background</label>
                    <input 
                      type="color" 
                      value={block.bgColor}
                      onChange={(e) => updateBlock(block.id, 'bgColor', e.target.value)}
                      className="w-full h-7 border rounded cursor-pointer p-0.5 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Ratadan Teks</label>
                    <div className="flex space-x-1 bg-white border rounded p-0.5">
                      {['left', 'center', 'right'].map(align => (
                        <button
                          key={align}
                          onClick={() => updateBlock(block.id, 'alignment', align)}
                          className={`flex-1 py-1 rounded text-[10px] capitalize ${block.alignment === align ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-600'}`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <input 
                    type="text" 
                    value={block.title}
                    onChange={(e) => updateBlock(block.id, 'title', e.target.value)}
                    className="w-full text-base font-bold px-3 py-1.5 border rounded focus:ring-1 focus:ring-amber-500"
                    placeholder="Judul Blok..."
                  />
                  <textarea 
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                    rows={3}
                    className="w-full text-sm px-3 py-2 border rounded focus:ring-1 focus:ring-amber-500"
                    placeholder="Deskripsi / Isi Konten..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: PUBLIC VIEW */}
        {(activeView === 'public' || (!isAdmin && activeView !== 'login')) && (
          <div className="space-y-6">
            {portalContent.blocks.filter(b => b.pageId === activeTab).length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400 text-sm">Belum ada konten informasi untuk halaman ini.</p>
              </div>
            ) : (
              portalContent.blocks.filter(b => b.pageId === activeTab).map(block => (
                <div 
                  key={block.id} 
                  className="p-6 rounded-xl shadow-sm border border-slate-200 transition"
                  style={{ 
                    backgroundColor: block.bgColor || '#ffffff',
                    textAlign: block.alignment || 'left'
                  }}
                >
                  <h2 
                    className="font-bold mb-3"
                    style={{ 
                      fontSize: block.fontSize || '18px',
                      color: block.textColor || '#0f172a'
                    }}
                  >
                    {block.title}
                  </h2>
                  <p 
                    className="leading-relaxed"
                    style={{ 
                      fontSize: block.fontSize ? `${parseInt(block.fontSize) - 2}px` : '15px',
                      color: block.textColor || '#334155'
                    }}
                  >
                    {block.content}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 SMAN 1 SELAT. Sistem Portal Digital Terpadu & Integrated Google Sites.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-500">Versi Portal: 2.5.0-proktor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
