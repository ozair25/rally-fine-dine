import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { MenuItem } from '../../types';

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pizza',
    price: 0,
    description: '',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'
  });

  useEffect(() => {
    const q = query(collection(db, 'menu_items'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[]);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'menu_items');
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'menu_items', editingItem.id), formData);
      } else {
        await addDoc(collection(db, 'menu_items'), formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ name: '', category: 'Pizza', price: 0, description: '', image: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'menu_items');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'menu_items', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, 'menu_items');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-white">
      <AdminSidebar />
      <main className="flex-1 p-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">Menu <span className="text-brand-orange">Control</span></h1>
            <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Manage the culinary arsenal</p>
          </div>
          <button 
            onClick={() => { setEditingItem(null); setFormData({ name: '', category: 'Pizza', price: 0, description: '', image: '' }); setIsModalOpen(true); }}
            className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center shadow-2xl hover:scale-105 transition-transform"
          >
            <Plus size={18} className="mr-2" /> Add Selection
          </button>
        </div>

        <div className="bg-brand-surface rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-neutral-500 font-black">
                <th className="px-8 py-6">Identity</th>
                <th className="px-8 py-6">Sector</th>
                <th className="px-8 py-6">Valuation</th>
                <th className="px-8 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-black uppercase tracking-tighter text-lg">{item.name}</p>
                        <p className="text-neutral-500 text-[10px] uppercase font-bold truncate max-w-xs">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-brand-orange italic tracking-tighter text-xl">
                    €{item.price.toFixed(2)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="p-2 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors bg-white/5 rounded-xl border border-white/5">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-brand-surface rounded-[40px] border border-white/10 p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                  {editingItem ? 'Modify' : 'Incorporate'} <span className="text-brand-orange">Selection</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white"><X /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Nomenclature</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Valuation (€)</label>
                    <input 
                      required
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Classification</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all appearance-none cursor-pointer"
                  >
                    {['Pizza', 'Pasta', 'Curry', 'Naan', 'Sides', 'Drinks'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Visual Identification URL</label>
                  <input 
                    required
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Technical Brief (Description)</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-brand-bg border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-6 pt-6">
                  <button 
                    type="submit" 
                    className="flex-1 bg-brand-orange py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] transition-all"
                  >
                    Confirm Authorization
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
