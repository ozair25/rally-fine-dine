/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, MapPin, Clock, Pizza, User as UserIcon, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { itemsCount } = useCart();
  const { user, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.menu'), path: '/menu' },
    { name: t('nav.cart'), path: '/cart' },
  ];

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setShowLoginModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    // Map "admin" to "admin@rally.com" for technical compatibility
    const email = loginForm.id === 'admin' ? 'admin@rally.com' : loginForm.id;
    
    try {
      await signInWithEmailAndPassword(auth, email, loginForm.password);
      setShowLoginModal(false);
      setLoginForm({ id: '', password: '' });
    } catch (error: any) {
      console.error(error);
      setLoginError('Invalid ID or Password. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <nav className="h-20 border-b border-white/5 flex items-center bg-[#111111] sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Pizza className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-brand-orange transition-colors leading-none">
              Rally <span className="text-brand-red">Fine Dine</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Gießen, Germany</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "transition-all duration-300 pb-1 border-b-2",
                location.pathname === link.path ? "text-brand-orange border-brand-orange" : "text-neutral-400 border-transparent hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-white/10"></div>

          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 rounded-full px-2 py-1">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "px-2 py-1 rounded-full text-[10px] transition-all",
                language === 'en' ? "bg-brand-orange text-white" : "text-neutral-500 hover:text-white"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={cn(
                "px-2 py-1 rounded-full text-[10px] transition-all",
                language === 'de' ? "bg-brand-orange text-white" : "text-neutral-500 hover:text-white"
              )}
            >
              DE
            </button>
          </div>

          <div className="h-4 w-px bg-white/10"></div>

          {user ? (
            <div className="flex items-center space-x-6">
              {isAdmin && (
                <Link to="/admin" className="text-[10px] text-brand-orange border border-brand-orange/40 px-3 py-1 rounded-full hover:bg-brand-orange hover:text-white transition-all">
                  ADMIN
                </Link>
              )}
               <button 
                onClick={() => auth.signOut()}
                className="text-neutral-400 hover:text-white transition-all flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                <span className="text-[10px]">LOGOUT</span>
              </button>
            </div>
          ) : (
             <button 
              onClick={() => setShowLoginModal(true)}
              className="text-neutral-400 hover:text-white transition-all flex items-center"
            >
              <UserIcon size={16} className="mr-2" />
              <span className="text-[10px]">LOGIN</span>
            </button>
          )}

          <Link
            to="/cart"
            className="flex items-center space-x-2 bg-brand-orange px-5 py-2 rounded-full text-[11px] font-black uppercase text-white hover:bg-brand-orange/90 transition-all shadow-xl"
          >
            <ShoppingBag size={14} className="mr-1" />
            <span>{t('nav.cart')}</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full ml-1 tracking-tighter">({itemsCount})</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <div className="flex items-center bg-white/5 rounded-full px-1.5 py-0.5">
            <button onClick={() => setLanguage(language === 'en' ? 'de' : 'en')} className="p-1">
              <Globe size={18} className="text-brand-orange" />
            </button>
          </div>
          <Link to="/cart" className="relative p-2 text-white">
            <ShoppingBag size={24} />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#111111]">
                {itemsCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#1a1a1a] w-full max-w-md rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-wider">
                    {t('login.title')} <span className="text-brand-orange">{t('login.portal')}</span>
                  </h3>
                  <button onClick={() => setShowLoginModal(false)} className="text-neutral-500 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleIdLogin} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block mb-2">{t('login.id')}</label>
                    <input
                      type="text"
                      placeholder={t('login.idPlaceholder')}
                      value={loginForm.id}
                      onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange transition-all font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block mb-2">{t('login.password')}</label>
                    <input
                      type="password"
                      placeholder={t('login.passwordPlaceholder')}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange transition-all font-medium"
                      required
                    />
                  </div>

                  {loginError && (
                    <p className="text-brand-red text-[10px] font-bold uppercase tracking-wider">{loginError}</p>
                  )}

                  <button
                    disabled={isLoggingIn}
                    type="submit"
                    className="w-full bg-brand-orange text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-brand-orange/90 transition-all shadow-lg flex items-center justify-center"
                  >
                    {isLoggingIn ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : t('login.button')}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase text-neutral-500 text-center mb-4 tracking-widest italic">{t('login.or')}</p>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white text-black py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-lg flex items-center justify-center"
                  >
                    Google Account
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-[#111111] border-b border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-4 text-base font-black tracking-widest uppercase",
                    location.pathname === link.path ? "text-brand-orange bg-brand-orange/10 rounded-lg" : "text-neutral-500 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-4"></div>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-4 text-base font-black tracking-widest uppercase text-brand-orange"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { auth.signOut(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-4 text-base font-black tracking-widest uppercase text-neutral-500 hover:text-white"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setShowLoginModal(true); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-4 text-base font-black tracking-widest uppercase text-neutral-500 hover:text-white"
                >
                  {t('nav.login')}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#111111] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg">
                <Pizza className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                  Rally <span className="text-brand-red">Fine Dine</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Gießen, Germany</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs font-medium">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8">{t('footer.location')}</h4>
            <address className="not-italic text-neutral-400 text-sm space-y-3 font-semibold">
              <p className="flex items-center"><MapPin className="mr-3 text-brand-orange" size={16} /> Wetzlarer Str. 81</p>
              <p className="ml-7 opacity-70">35398 Gießen</p>
            </address>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8">{t('footer.hours')}</h4>
            <div className="text-neutral-400 text-sm space-y-3 font-semibold">
              <p className="flex items-center"><Clock className="mr-3 text-brand-orange" size={16} /> {t('footer.monFri')}</p>
              <p className="flex items-center"><Clock className="mr-3 text-brand-orange" size={16} /> {t('footer.satSun')}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-8">{t('footer.contact')}</h4>
            <div className="text-neutral-400 text-sm space-y-3 font-semibold">
              <p className="flex items-center"><Phone className="mr-3 text-brand-orange" size={16} /> +49 641 123456</p>
              <p className="text-white hover:text-brand-orange transition-colors cursor-pointer">order@rallyfinedine.de</p>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-40">
          <p className="text-xs font-black uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} RALLY FINE DINE
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-4 md:mt-0">
            EST. 2010 • HANDCRAFTED IN GIESSEN
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
