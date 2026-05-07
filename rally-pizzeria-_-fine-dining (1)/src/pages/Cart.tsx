/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t, language } = useLanguage();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-32 h-32 bg-brand-surface rounded-3xl flex items-center justify-center mb-10 shadow-2xl border border-white/5">
          <ShoppingBag className="text-neutral-600" size={48} />
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">
          {t('cart.empty.title1')} <span className="text-brand-orange">{t('cart.empty.title2')}</span>
        </h2>
        <p className="text-neutral-400 max-w-sm mb-12 font-medium italic">
          {t('cart.empty.description')}
        </p>
        <Link to="/menu" className="flex items-center space-x-3 px-10 py-5 bg-brand-orange text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-brand-orange/90 transition-all shadow-2xl">
          <span>{t('cart.empty.cta')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
              {t('cart.header.title1')} <span className="text-brand-orange">{t('cart.header.title2')}</span>
            </h1>
            <p className="mt-4 text-neutral-500 font-black uppercase tracking-widest text-sm">{t('cart.header.subtitle')}</p>
          </div>
          <Link to="/menu" className="flex items-center text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-white/10">
            <ArrowLeft className="mr-3" size={14} /> {t('cart.header.back')}
          </Link>
        </div>

        <div className="space-y-6 mb-20">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brand-surface border border-white/5 rounded-3xl p-6 md:p-8 flex items-center justify-between group transition-all hover:shadow-2xl"
              >
                <div className="flex items-center space-x-10">
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 border border-white/5 transition-all">
                    <img
                      src={item.image || `https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400`}
                      alt={item.name[language]}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 italic">{item.name[language]}</h3>
                    <p className="text-neutral-500 text-[10px] uppercase font-black tracking-[0.2em] mb-4">{item.category}</p>
                    <p className="text-brand-orange font-black text-xl">€{item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-12">
                  <div className="flex items-center bg-brand-bg rounded-2xl border border-white/5 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-3 text-neutral-500 hover:text-white transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center text-white font-black text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-3 text-neutral-500 hover:text-white transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-4 text-neutral-600 hover:text-brand-orange transition-all"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Totals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-brand-surface p-12 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
               <ShoppingBag size={200} className="text-white" />
             </div>
             <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-10 relative z-10">{t('cart.totals.logs')}</h4>
             <div className="space-y-6 relative z-10">
               <div className="flex items-center space-x-4">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 italic">{t('cart.totals.coverage')}</p>
               </div>
               <div className="flex items-center space-x-4">
                 <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                 <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 italic">{t('cart.totals.estimate')}</p>
               </div>
             </div>
          </div>

          <div className="bg-brand-surface-2 p-12 rounded-3xl shadow-2xl text-white border border-white/5">
            <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-10">{t('cart.totals.title')}</h4>
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-neutral-500 uppercase tracking-widest text-[10px] font-black">
                <span>{t('cart.totals.base')}</span>
                <span className="text-white font-mono text-lg">€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-500 uppercase tracking-widest text-[10px] font-black">
                <span>{t('cart.totals.factor')}</span>
                <span className="text-green-500 font-mono text-lg">{t('cart.totals.factorValue')}</span>
              </div>
              <div className="h-px bg-white/10 my-8"></div>
              <div className="flex justify-between items-end">
                <span className="text-white text-3xl font-black uppercase tracking-tighter italic">{t('cart.totals.total')}</span>
                <span className="text-5xl font-black text-brand-orange tracking-tighter italic">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/order"
              className="group w-full flex items-center justify-center px-12 py-6 bg-brand-orange text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-brand-orange/90 transition-all shadow-2xl"
            >
              {t('cart.totals.cta')}
              <Plus className="ml-4 group-hover:rotate-90 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
