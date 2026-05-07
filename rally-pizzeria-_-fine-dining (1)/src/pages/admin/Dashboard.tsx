import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { collection, query, where, getDocs, orderBy, limit, addDoc, writeBatch, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { TrendingUp, ShoppingBag, Users, IndianRupee, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { MENU_ITEMS } from '../../constants';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    customers: 0,
    activeZones: 0
  });
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    async function loadStats() {
      const ordersSnap = await getDocs(collection(db, 'orders'));
      const usersSnap = await getDocs(collection(db, 'users'));
      const zonesSnap = await getDocs(collection(db, 'delivery_zones'));

      const revenue = ordersSnap.docs.reduce((acc, doc) => acc + (doc.data().totalPrice || 0), 0);

      setStats({
        totalOrders: ordersSnap.size,
        revenue,
        customers: usersSnap.size,
        activeZones: zonesSnap.size
      });
    }
    loadStats();
  }, []);

  const seedData = async () => {
    if (!window.confirm('WARNING: This will purge ALL current data and restore the factory-default Rally Pizzeria inventory. Proceed with database reset?')) return;
    setIsSeeding(true);
    try {
      const zones = [
        { zoneName: 'Gießen Central', pinCodes: ['35390', '35392', '35394'], deliveryFee: 40, minOrder: 300 },
        { zoneName: 'North Sector', pinCodes: ['35396', '35398'], deliveryFee: 60, minOrder: 500 }
      ];

      const reviews = [
        { userName: 'Amit R.', rating: 5, comment: 'The Cheese Burst Supreme is legitimate. Molten cheese arrived hot. Best pizza in Giessen!', createdAt: serverTimestamp() },
        { userName: 'Sneha K.', rating: 4, comment: 'Peri Peri fries are actually spicy! Great portion for the price.', createdAt: serverTimestamp() },
        { userName: 'Rahul V.', rating: 5, comment: 'Quick delivery and the Paneer Tikka pizza had a really authentic smoky flavor.', createdAt: serverTimestamp() },
        { userName: 'Priya S.', rating: 5, comment: 'White sauce pasta was rich and creamy. Highly recommend the garlic bread as a side.', createdAt: serverTimestamp() },
        { userName: 'Vikram J.', rating: 5, comment: 'Order was on time and the packaging kept the pizza crisp. Definitely ordering again.', createdAt: serverTimestamp() }
      ];

      // Purge old
      const oldMenu = await getDocs(collection(db, 'menu_items'));
      for (const d of oldMenu.docs) await deleteDoc(d.ref);

      const oldZones = await getDocs(collection(db, 'delivery_zones'));
      for (const d of oldZones.docs) await deleteDoc(d.ref);

      const oldReviews = await getDocs(collection(db, 'reviews'));
      for (const d of oldReviews.docs) await deleteDoc(d.ref);

      // Add new
      for (const item of MENU_ITEMS) await addDoc(collection(db, 'menu_items'), item);
      for (const zone of zones) await addDoc(collection(db, 'delivery_zones'), zone);
      for (const review of reviews) await addDoc(collection(db, 'reviews'), review);

      alert('Database reset successful. Inventory, Delivery Zones, and Intelligence Reports are now live.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error during database initialization');
    } finally {
      setIsSeeding(false);
    }
  };

  const statCards = [
    { name: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: 'bg-green-500/10 text-green-500' },
    { name: 'Completed Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-brand-orange/10 text-brand-orange' },
    { name: 'Registered Personnel', value: stats.customers, icon: Users, color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Active Sectors', value: stats.activeZones, icon: TrendingUp, color: 'bg-purple-500/10 text-purple-500' },
  ];

  return (
    <div className="flex bg-brand-bg min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-12">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Dashboard <span className="text-brand-orange">Overview</span></h1>
            <p className="text-neutral-500 text-xs font-black uppercase tracking-widest mt-2">Real-time operational summary</p>
          </div>
          <button 
            onClick={seedData}
            disabled={isSeeding}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all hover:bg-white/10"
          >
            <Database size={16} />
            <span>{isSeeding ? 'Seeding...' : 'Seed Database'}</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statCards.map((card, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={card.name}
              className="bg-brand-surface p-8 rounded-3xl border border-white/5 shadow-2xl"
            >
              <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                <card.icon size={24} />
              </div>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-1">{card.name}</p>
              <p className="text-3xl font-black text-white tracking-tighter">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-brand-surface p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8">Recent Orders</h3>
            <p className="text-neutral-500 text-sm italic">Connect to orders collection to list live data...</p>
          </div>
          <div className="bg-brand-surface p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8">Revenue Growth</h3>
            <div className="h-64 bg-white/5 rounded-2xl flex items-center justify-center border border-dashed border-white/10">
               <p className="text-neutral-600 text-xs font-black uppercase tracking-widest">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
