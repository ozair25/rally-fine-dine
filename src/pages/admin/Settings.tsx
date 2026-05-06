import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { MapPin, Plus, Trash2, X, MapPinned, Settings, Check, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminSettings() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    zoneName: '',
    pinCodes: '',
    deliveryFee: 0,
    minOrder: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'delivery_zones'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setZones(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'delivery_zones');
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      pinCodes: formData.pinCodes.split(',').map(p => p.trim()).filter(p => p.length > 0)
    };
    
    try {
      if (editingZone) {
        await updateDoc(doc(db, 'delivery_zones', editingZone.id), data);
      } else {
        await addDoc(collection(db, 'delivery_zones'), data);
      }
      setIsModalOpen(false);
      setEditingZone(null);
      setFormData({ zoneName: '', pinCodes: '', deliveryFee: 0, minOrder: 0 });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'delivery_zones');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      try {
        await deleteDoc(doc(db, 'delivery_zones', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'delivery_zones');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-white">
      <AdminSidebar />
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">Sector <span className="text-brand-orange">Parameters</span></h1>
            <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Configure operational boundaries and logistics</p>
          </div>
          <button 
            onClick={() => { setEditingZone(null); setFormData({ zoneName: '', pinCodes: '', deliveryFee: 0, minOrder: 0 }); setIsModalOpen(true); }}
            className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center shadow-2xl hover:scale-105 transition-transform"
          >
            <Plus size={18} className="mr-2" /> Define Zone
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-brand-surface rounded-[40px] border border-white/5 p-10 group shadow-2xl hover:border-brand-orange/30 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                  <MapPin size={28} />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                       setEditingZone(zone);
                       setFormData({
                         zoneName: zone.zoneName,
                         pinCodes: zone.pinCodes?.join(', ') || '',
                         deliveryFee: zone.deliveryFee,
                         minOrder: zone.minOrder
                       });
                       setIsModalOpen(true);
                    }}
                    className="p-3 bg-white/5 text-neutral-400 hover:text-white rounded-xl border border-white/5 transition-colors"
                  >
                    <Settings size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(zone.id)}
                    className="p-3 bg-white/5 text-neutral-400 hover:text-red-500 rounded-xl border border-white/5 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-2">{zone.zoneName}</h3>
              <div className="flex items-center space-x-2 mb-8">
                <span className="text-brand-orange text-[10px] font-black uppercase tracking-widest">{zone.pinCodes?.length || 0} Sectors Authorized</span>
              </div>

              <div className="space-y-6 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Service Fee</span>
                  <span className="text-xl font-black text-white italic tracking-tighter">€{zone.deliveryFee?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Minimum Order</span>
                  <span className="text-xl font-black text-white italic tracking-tighter">€{zone.minOrder?.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-4">Postal Codes</p>
                <div className="flex flex-wrap gap-2">
                  {zone.pinCodes?.map((code: string) => (
                    <span key={code} className="bg-brand-bg px-3 py-1 rounded-lg text-[10px] font-bold text-neutral-400 border border-white/5">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-brand-surface rounded-[40px] border border-white/10 p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,0.5)]">
               <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  {editingZone ? 'Calibrate' : 'Deploy'} <span className="text-brand-orange">Sector</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white"><X /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Zone Designation</label>
                    <input 
                      required
                      value={formData.zoneName}
                      onChange={e => setFormData({...formData, zoneName: e.target.value})}
                      placeholder="e.g. Gießen City Center"
                      className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Authorized Postal Codes (Comma Separated)</label>
                    <textarea 
                      required
                      value={formData.pinCodes}
                      onChange={e => setFormData({...formData, pinCodes: e.target.value})}
                      placeholder="35390, 35392, 35394"
                      className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all resize-none"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Logistics Fee (€)</label>
                      <input 
                        required
                        type="number"
                        step="0.01"
                        value={formData.deliveryFee}
                        onChange={e => setFormData({...formData, deliveryFee: parseFloat(e.target.value)})}
                        className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Min Order Requirement (€)</label>
                      <input 
                        required
                        type="number"
                        step="0.01"
                        value={formData.minOrder}
                        onChange={e => setFormData({...formData, minOrder: parseFloat(e.target.value)})}
                        className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 pt-6">
                    <button 
                      type="submit" 
                      className="flex-1 bg-brand-orange py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] transition-all"
                    >
                      Initialize Parameters
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-white/5 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-white/10 transition-all"
                    >
                      Abort Mission
                    </button>
                  </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
