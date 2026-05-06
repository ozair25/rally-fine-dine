/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';
import { RESTAURANT_ADDRESS } from '../constants';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Order() {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [pincode, setPincode] = useState('');
  const [isServiceable, setIsServiceable] = useState<boolean | null>(null);
  const [zones, setZones] = useState<any[]>([]);
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [isOrdered, setIsOrdered] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'delivery_zones'), (snapshot) => {
      setZones(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, []);

  const checkPincode = () => {
    const zone = zones.find(z => z.pinCodes?.includes(pincode));
    if (zone) {
      if (totalPrice < zone.minOrder) {
        setIsServiceable(false);
        return;
      }
      setIsServiceable(true);
      setDeliveryFee(zone.deliveryFee);
    } else {
      setIsServiceable(false);
    }
  };

  const estimatedTimes = {
    delivery: pincode.startsWith('353') ? '35-45 mins' : '50-65 mins',
    pickup: '15-20 mins'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user?.uid || 'anonymous',
        userName: formData.name,
        userPhone: formData.phone,
        items: cart.map(item => ({
          id: item.id,
          name: item.name[language],
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: totalPrice + (orderType === 'delivery' ? deliveryFee : 0),
        status: 'pending',
        deliveryType: orderType,
        address: orderType === 'delivery' ? formData.address : RESTAURANT_ADDRESS,
        pinCode: pincode,
        createdAt: serverTimestamp()
      });

      setIsOrdered(true);
      setTimeout(() => {
        clearCart();
      }, 3000);
    } catch (error) {
       handleFirestoreError(error, OperationType.WRITE, 'orders');
    }
  };

  if (isOrdered) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-green-500 rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(34,197,94,0.3)]"
        >
          <CheckCircle2 className="text-white" size={64} />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
          {t('order.success.title1')} <span className="text-brand-orange">{t('order.success.title2')}</span>
        </h2>
        <p className="text-neutral-400 max-w-sm mb-12 font-medium italic">
          {t('order.success.description')}
        </p>
        <Link to="/" className="text-brand-orange font-black border-b-2 border-brand-orange pb-1 uppercase tracking-[0.2em] text-xs">
          {t('order.success.cta')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h1 className="text-6xl md:text-[7rem] font-black text-white uppercase tracking-tighter mb-4 leading-[0.9]">
            {t('order.header.title1')} <br/><span className="text-brand-orange">{t('order.header.title2')}</span>
          </h1>
          <p className="text-neutral-500 uppercase tracking-widest text-xs font-black">
            {t('order.header.subtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 mb-16">
          <button
            onClick={() => setOrderType('delivery')}
            className={cn(
              "pb-6 px-10 font-black uppercase tracking-widest text-sm transition-all border-b-2",
              orderType === 'delivery' ? "text-brand-orange border-brand-orange" : "text-neutral-500 border-transparent hover:text-white"
            )}
          >
            {t('order.tabs.delivery')}
          </button>
          <button
            onClick={() => setOrderType('pickup')}
            className={cn(
              "pb-6 px-10 font-black uppercase tracking-widest text-sm transition-all border-b-2",
              orderType === 'pickup' ? "text-brand-orange border-brand-orange" : "text-neutral-500 border-transparent hover:text-white"
            )}
          >
            {t('order.tabs.pickup')}
          </button>
        </div>

        <motion.div
          key={orderType}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-surface p-12 shadow-2xl border border-white/5 rounded-3xl"
        >
          {orderType === 'delivery' ? (
            <div className="space-y-12">
              {/* PIN Code Checker */}
              <div className="bg-brand-bg p-10 rounded-2xl border border-white/5">
                <label className="block text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center">
                  {t('order.delivery.verifyZip')}
                </label>
                <div className="flex gap-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setIsServiceable(null);
                    }}
                    placeholder="e.g. 35390"
                    className="flex-1 bg-brand-surface border border-white/10 rounded-2xl px-6 py-5 text-white font-mono focus:outline-none focus:border-brand-orange transition-colors shadow-sm"
                  />
                  <button
                    onClick={checkPincode}
                    className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-neutral-200 rounded-2xl transition-all shadow-md"
                  >
                    {t('order.delivery.verifyBtn')}
                  </button>
                </div>

                <AnimatePresence>
                  {isServiceable !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto"
                    >
                      <div className={cn(
                        "p-8 rounded-[2rem] border flex items-center space-x-6 shadow-2xl",
                        isServiceable 
                          ? "bg-green-500/5 border-green-500/20 text-green-500" 
                          : "bg-red-500/5 border-red-500/20 text-red-500"
                      )}>
                        <div className={cn("p-4 rounded-2xl", isServiceable ? "bg-green-500/10" : "bg-red-500/10")}>
                          {isServiceable ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Status</p>
                          <p className="text-sm font-black uppercase tracking-tighter italic">
                            {isServiceable ? t('order.delivery.authorized') : t('order.delivery.outOfZone')}
                          </p>
                        </div>
                      </div>

                      {isServiceable && (
                        <div className="p-8 rounded-[2rem] border border-brand-orange/20 bg-brand-orange/5 text-brand-orange flex items-center space-x-6 shadow-2xl">
                          <div className="p-4 rounded-2xl bg-brand-orange/10">
                            <Clock size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{t('order.delivery.estimateLabel')}</p>
                            <p className="text-sm font-black uppercase tracking-tighter italic text-white">
                              {orderType === 'delivery' ? estimatedTimes.delivery : estimatedTimes.pickup}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Delivery Form */}
              <AnimatePresence>
                {isServiceable && (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 pt-12 border-t border-neutral-100"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-neutral-500 text-[10px] uppercase font-black tracking-widest">{t('order.form.name')}</label>
                        <input 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange transition-all outline-none" 
                          placeholder="John Doe" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-neutral-500 text-[10px] uppercase font-black tracking-widest">{t('order.form.phone')}</label>
                        <input 
                          required 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange transition-all outline-none" 
                          placeholder="+49..." 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-neutral-500 text-[10px] uppercase font-black tracking-widest">{t('order.form.address')}</label>
                      <textarea 
                        required 
                        rows={4} 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange transition-all outline-none resize-none" 
                        placeholder={t('order.form.addressPlaceholder')}
                      ></textarea>
                    </div>
                    <OrderSummary total={totalPrice} fee={deliveryFee} t={t} />
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="bg-brand-bg p-10 border border-white/5 rounded-2xl space-y-4">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tighter mb-2">{t('order.pickup.point')}</h4>
                    <p className="text-neutral-500 text-sm font-semibold italic">{RESTAURANT_ADDRESS}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-neutral-500 text-[10px] uppercase font-black tracking-widest font-mono">{t('order.form.name')}</label>
                  <input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-neutral-500 text-[10px] uppercase font-black tracking-widest font-mono">{t('order.pickup.temporalWindow')}</label>
                  <select className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange outline-none cursor-pointer">
                    {[15, 30, 45, 60].map(mins => (
                      <option key={mins} value={mins}>{mins} {t('order.pickup.minutes')}</option>
                    ))}
                  </select>
                </div>
              </div>
              <OrderSummary total={totalPrice} t={t} />
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function OrderSummary({ total, fee = 0, t }: { total: number, fee?: number, t: any }) {
  return (
    <div className="space-y-8 pt-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center bg-brand-surface-2 p-12 rounded-3xl gap-8 shadow-2xl text-white border border-white/5">
        <div>
          <p className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{t('order.summary.label')}</p>
          <div className="flex items-baseline space-x-3">
            <p className="text-5xl font-black text-brand-orange tracking-tighter italic">€{(total + fee).toFixed(2)}</p>
            {fee > 0 && <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">(Incl. €{fee.toFixed(2)} {t('order.summary.fee')})</span>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-16 py-6 bg-brand-orange text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-brand-orange/90 transition-all shadow-2xl disabled:opacity-30"
          disabled={total === 0}
        >
          {t('order.summary.cta')}
        </button>
      </div>
      {total === 0 && (
        <p className="text-center text-red-500 text-[10px] font-black uppercase tracking-[0.2em] font-mono">
          {t('order.summary.error')}
        </p>
      )}
    </div>
  );
}
