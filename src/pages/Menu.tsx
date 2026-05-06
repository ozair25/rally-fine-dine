/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { MenuItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
  const { addToCart, cart, totalPrice } = useCart();
  const { t, language } = useLanguage();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'menu_items'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[];
      if (data.length > 0) {
        setItems(data);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'menu_items');
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const categories = ['All', ...new Set(items.map(item => item.category))];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-32">
      {/* Menu Header */}
      <div className="bg-brand-surface py-24 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-[8rem] font-black text-white uppercase tracking-tighter mb-4 leading-none italic">
              {t('menu.header.title1')} <span className="text-brand-orange">{t('menu.header.title2')}</span>
            </h1>
            <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
              {t('menu.header.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 shadow-sm",
                  activeCategory === cat 
                    ? "bg-brand-orange text-white border-brand-orange shadow-lg scale-105" 
                    : "text-neutral-500 hover:text-white border-white/5 bg-white/5 hover:border-brand-orange/30"
                )}
              >
                {cat === 'All' ? t('menu.categories.all') : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        {loading && items.length === 0 ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-brand-surface group rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-500 border border-white/5 hover:border-brand-orange/20"
                  id={`item-${item.id}`}
                >
                  <div className="relative h-80 overflow-hidden bg-brand-bg">
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-1 bg-brand-orange/10 backdrop-blur-md rounded-full text-[9px] font-black text-brand-orange uppercase tracking-[0.2em] border border-brand-orange/30">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">{item.name[language]}</h3>
                    </div>
                    <div className="flex items-center space-x-2 mb-6">
                      <span className="text-brand-orange font-black text-2xl tracking-tighter">€{item.price.toFixed(2)}</span>
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{t('menu.item.fixedParameter')}</span>
                    </div>
                    <p className="text-neutral-400 text-xs mb-10 leading-relaxed font-medium italic opacity-80 h-12 overflow-hidden">
                      {item.description[language]}
                    </p>
                    
                    <button
                      onClick={() => handleAdd(item)}
                      className={cn(
                        "w-full py-5 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest text-[10px] transition-all duration-300",
                        addedId === item.id 
                          ? "bg-green-600 text-white shadow-lg" 
                          : "bg-white/5 text-white hover:bg-brand-orange border border-white/10 hover:border-brand-orange shadow-xl hover:scale-[1.02]"
                      )}
                    >
                      {addedId === item.id ? (
                        <>
                          <Check size={14} className="mr-2" /> {t('menu.item.added')}
                        </>
                      ) : (
                        <>
                          <Plus size={14} className="mr-2" /> {t('menu.item.add')}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Floating Cart bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className="fixed bottom-0 left-0 z-50 w-full"
          >
            <div className="max-w-3xl mx-auto px-4 pb-12">
              <Link
                to="/cart"
                className="bg-brand-surface-2/90 backdrop-blur-xl text-white p-6 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex items-center justify-between group border border-white/10"
              >
                <div className="flex items-center ml-4">
                  <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mr-6 text-brand-orange border border-brand-orange/20">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500 mb-1">{t('menu.cartBar.status')}</p>
                    <p className="text-2xl font-black tracking-tighter uppercase italic">{cart.reduce((acc, item) => acc + item.quantity, 0)} {t('menu.cartBar.units')}</p>
                  </div>
                </div>
                <div className="bg-brand-orange px-10 py-5 rounded-[1.5rem] text-center shadow-2xl group-hover:scale-105 transition-transform">
                  <p className="text-[9px] font-black uppercase tracking-widest mb-1">{t('menu.cartBar.cta')}</p>
                  <p className="text-2xl font-black tracking-tighter italic">
                    €{totalPrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
