/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, Truck, MapPin, Phone, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export default function Home() {
  const [reviews, setReviews] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const openingHours = [
    { days: t('home.hours.monFri'), hours: '11:30 - 22:30' },
    { days: t('home.hours.satSun'), hours: '14:00 - 23:00' },
    { days: t('home.hours.holidays'), hours: '14:00 - 22:00' },
  ];

  const mockReviews = [
    {
      id: 'mock-1',
      userName: 'Lukas Schneider',
      rating: 5,
      comment: 'The Cheese Burst Supreme is legitimately the best pizza I have had in Gießen. The molten center is just incredible.',
    },
    {
      id: 'mock-2',
      userName: 'Emma Fischer',
      rating: 5,
      comment: 'Super fast delivery and the peri peri fries were still crispy! This is my new go-to place for late night cravings.',
    },
    {
      id: 'mock-3',
      userName: 'Marc Weber',
      rating: 4,
      comment: 'Authentic flavors and high-quality ingredients. The white sauce pasta is creamy and perfectly seasoned.',
    },
  ];

  const displayedReviews = reviews.length > 0 ? reviews : mockReviews;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/pizza.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-3 mb-8">
              <span className="bg-brand-orange px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-white">
                RALLY FINE DINE
              </span>
              <span className="text-neutral-300 text-[10px] font-black uppercase tracking-widest">
                {t('home.hero.subtitle')}
              </span>
            </div>
            
            <h1 className="text-7xl md:text-[8.5rem] font-black text-white leading-[0.8] tracking-tighter uppercase mb-10 italic">
              {t('home.hero.title1')}<br/>
              <span className="text-brand-orange">{t('home.hero.title2')}</span>
            </h1>
            
            <p className="text-[#ccc] text-xl md:text-2xl mb-12 max-w-2xl leading-snug font-medium italic">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/menu"
                className="group relative flex items-center justify-center px-12 py-6 bg-brand-orange text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-brand-orange/90 transition-all shadow-2xl hover:scale-105"
              >
                {t('home.hero.ctaMenu')}
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={18} />
              </Link>
              <Link
                to="/order"
                className="flex items-center justify-center px-12 py-6 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white hover:text-black transition-all hover:border-white"
              >
                {t('home.hero.ctaStatus')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-brand-bg relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic mb-8">
              {t('home.about.title1')} <span className="text-brand-orange">{t('home.about.title2')}</span>
            </h2>
            <div className="space-y-6">
              <p className="text-neutral-400 text-lg leading-relaxed font-medium italic">
                {t('home.about.p1')}
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed font-bold uppercase tracking-widest italic">
                {t('home.about.p2')}
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/5">
                <div>
                   <p className="text-brand-orange font-black text-3xl italic">100%</p>
                   <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">{t('home.about.stat1')}</p>
                </div>
                <div>
                   <p className="text-brand-orange font-black text-3xl italic">48H</p>
                   <p className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">{t('home.about.stat2')}</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden aspect-square lg:order-2 shadow-[0_50px_1000px_rgba(255,107,0,0.15)] border border-white/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-110"
            >
              <source src="/cook.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay group-hover:bg-transparent transition-all duration-700"></div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Specialties */}
      <section className="py-32 bg-brand-bg relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[150px] -mr-96 -mt-96"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic">
                {t('home.sectors.title1')} <span className="text-brand-orange">{t('home.sectors.title2')}</span>
              </h2>
              <p className="mt-6 text-neutral-500 font-bold uppercase tracking-widest text-[10px] max-w-md">{t('home.sectors.description')}</p>
            </div>
            <Link to="/menu" className="text-brand-orange font-black uppercase tracking-widest text-[10px] flex items-center border-b border-brand-orange/30 pb-2 hover:border-brand-orange transition-all">
              {t('home.sectors.cta')} <ArrowRight className="ml-2" size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', label: t('home.sectors.cat1') },
              { name: 'Sides', img: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800', label: t('home.sectors.cat2') },
              { name: 'Pasta', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800', label: t('home.sectors.cat3') },
              { name: 'Special', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800', label: t('home.sectors.cat4') },
            ].map((cat, i) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={cat.name}
                className="group relative h-[500px] overflow-hidden cursor-pointer bg-brand-surface rounded-[2.5rem] shadow-2xl border border-white/5"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <p className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em] mb-2">{cat.label}</p>
                  <span className="text-4xl font-black text-white uppercase tracking-tighter italic">
                    {cat.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* signature highlight */}
      <section className="py-20 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative rounded-[3rem] overflow-hidden bg-brand-surface border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
             <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-16 flex flex-col justify-center">
                   <div className="flex items-center space-x-2 mb-6">
                      <Star className="text-brand-orange fill-brand-orange" size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">{t('home.signature.label')}</span>
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-8">
                     {t('home.signature.title1')} <span className="text-brand-orange">{t('home.signature.title2')}</span>
                   </h2>
                   <p className="text-neutral-400 text-lg font-medium leading-relaxed mb-12 italic">
                     {t('home.signature.description')}
                   </p>
                   <Link 
                    to="/menu" 
                    className="w-fit px-12 py-6 bg-brand-orange text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:scale-105 transition-all"
                   >
                     {t('home.signature.cta')}
                   </Link>
                </div>
                <div className="relative min-h-[500px]">
                   <img 
                    src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1200" 
                    alt="Cheese Burst Pizza" 
                    className="absolute inset-0 w-full h-full object-cover"
                   />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Info & Opening Hours */}
      <section className="py-32 bg-brand-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-4">{t('home.hours.title1')} <span className="text-brand-orange">{t('home.hours.title2')}</span></h3>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">{t('home.hours.subtitle')}</p>
            </div>
            <div className="space-y-8">
              {openingHours.map((slot) => (
                <div key={slot.days} className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-lg font-black uppercase tracking-tighter text-white/90">{slot.days}</span>
                  <span className="text-xl font-black text-brand-orange italic tracking-tighter">{slot.hours}</span>
                </div>
              ))}
            </div>
            <div className="p-10 bg-brand-bg rounded-[2.5rem] border border-white/5 flex items-start space-x-6">
              <div className="p-4 bg-brand-orange/10 rounded-2xl text-brand-orange">
                <Info size={24} />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">{t('home.hours.holidayProtocol')}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed font-bold uppercase tracking-wide">
                   {t('home.hours.holidayDescription')}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-4">{t('home.location.title1')} <span className="text-brand-orange">{t('home.location.title2')}</span></h3>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">{t('home.location.subtitle')}</p>
            </div>
            <div className="h-96 rounded-[3rem] overflow-hidden group relative grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" 
                alt="Restaurant Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-brand-bg/90 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center shadow-2xl">
                  <MapPin className="text-brand-orange mx-auto mb-4" size={32} />
                  <p className="text-white font-black uppercase tracking-tighter text-lg">Wetzlarer Str. 81</p>
                  <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">35398 Gießen, Germany</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-6xl font-black text-white uppercase tracking-tighter italic">{t('home.reviews.title1')} <span className="text-brand-orange">{t('home.reviews.title2')}</span></h2>
             <p className="mt-4 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">{t('home.reviews.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedReviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-brand-surface p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={cn(i < review.rating ? "text-brand-orange fill-brand-orange" : "text-neutral-700")} 
                      />
                    ))}
                  </div>
                  <p className="text-white/90 text-sm italic font-medium leading-relaxed mb-8">"{review.comment}"</p>
                </div>
                <div className="flex items-center space-x-4 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-brand-bg border border-brand-orange/30 flex items-center justify-center text-brand-orange font-black text-xs">
                    {review.userName.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-black uppercase tracking-tighter text-xs">{review.userName}</span>
                    <span className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest">{t('home.reviews.verified')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
