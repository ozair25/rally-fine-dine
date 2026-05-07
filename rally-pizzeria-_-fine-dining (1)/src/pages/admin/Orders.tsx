import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { collection, query, onSnapshot, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { ShoppingBag, Clock, MapPin, Phone, User as UserIcon, CheckCircle2, ChevronRight, AlertCircle, Package, Truck, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });
    return unsubscribe;
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="text-brand-orange" size={20} />;
      case 'accepted': return <CheckCircle2 className="text-blue-500" size={20} />;
      case 'preparing': return <Clock className="text-yellow-500" size={20} />;
      case 'delivered': return <Package className="text-green-500" size={20} />;
      case 'cancelled': return <AlertCircle className="text-red-500" size={20} />;
      default: return <AlertCircle className="text-neutral-500" size={20} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-white">
      <AdminSidebar />
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-black uppercase tracking-tighter italic">Order <span className="text-brand-orange">Logistics</span></h1>
          <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Monitor and dispatch incoming requests</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-brand-surface rounded-[40px] border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="flex-1 p-10 border-b md:border-b-0 md:border-r border-white/5 space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center",
                        order.status === 'pending' ? "bg-brand-orange/10 text-brand-orange" :
                        order.status === 'accepted' ? "bg-blue-500/10 text-blue-500" :
                        order.status === 'preparing' ? "bg-yellow-500/10 text-yellow-500" :
                        order.status === 'delivered' ? "bg-green-500/10 text-green-500" :
                        "bg-red-500/10 text-red-500"
                      )}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{order.status}</span>
                      </span>
                      <span className="text-neutral-600 text-[10px] font-bold uppercase tracking-widest">ID: {order.id.slice(0, 8)}</span>
                    </div>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                      {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Valuation</p>
                    <p className="text-3xl font-black text-white tracking-tighter italic">€{order.totalPrice?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-4">
                    <div className="flex items-center text-neutral-400 space-x-3">
                      <UserIcon size={16} className="text-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-wider">{order.userName}</span>
                    </div>
                    <div className="flex items-center text-neutral-400 space-x-3">
                      <Phone size={16} className="text-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-wider">{order.userPhone}</span>
                    </div>
                    <div className="flex items-center text-neutral-400 space-x-3">
                      {order.deliveryType === 'delivery' ? <Truck size={16} className="text-brand-orange" /> : <Package size={16} className="text-brand-orange" />}
                      <span className="text-xs font-black uppercase tracking-widest text-white">{order.deliveryType}</span>
                    </div>
                  </div>
                  <div className="flex items-start text-neutral-400 space-x-3">
                    <MapPin size={16} className="text-brand-orange shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">{order.address}</p>
                      {order.pinCode && <p className="text-brand-orange text-[10px] font-black mt-2">PIN: {order.pinCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-surface-2 p-10 md:w-96 flex flex-col justify-between">
                <div>
                   <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-4">Manifest (Items)</h4>
                   <div className="space-y-4">
                     {order.items?.map((item: any, idx: number) => (
                       <div key={idx} className="flex justify-between items-center group">
                         <div className="flex flex-col">
                           <span className="text-xs font-black uppercase text-white tracking-tighter group-hover:text-brand-orange transition-colors">{item.name}</span>
                           <span className="text-[10px] text-neutral-500 font-bold uppercase">QTY: {item.quantity}</span>
                         </div>
                         <span className="text-xs font-bold text-neutral-400">€{(item.price * item.quantity).toFixed(2)}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="mt-10 pt-10 border-t border-white/5">
                   <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-4">Update Deployment Status</h4>
                   <div className="grid grid-cols-2 gap-3">
                     {['accepted', 'preparing', 'delivered', 'cancelled'].map((stat) => (
                       <button
                         key={stat}
                         onClick={() => updateStatus(order.id, stat)}
                         className={cn(
                           "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                           order.status === stat 
                             ? "bg-brand-orange text-white border-brand-orange shadow-lg" 
                             : "text-neutral-500 border-white/5 bg-white/5 hover:border-white/20 hover:text-white"
                         )}
                       >
                         {stat}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && !loading && (
          <div className="h-[50vh] flex flex-col items-center justify-center text-center">
            <ShoppingBag className="text-neutral-800 mb-8" size={80} />
            <h2 className="text-4xl font-black text-neutral-700 uppercase tracking-tighter">Sector Under-active</h2>
            <p className="text-neutral-800 uppercase tracking-widest text-xs font-black mt-2">Zero incoming requests detected</p>
          </div>
        )}
      </main>
    </div>
  );
}
