import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  LogOut, 
  SlidersHorizontal, 
  Sparkles, 
  Package, 
  DollarSign, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../data/products';
import { ProductEditModal } from './ProductEditModal';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { 
    products, 
    deleteProduct, 
    resetToDefaults, 
    logoutAdmin,
    adminToast
  } = useProducts();

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<'all' | 'feminino' | 'masculino'>('all');
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const matchesCat = filterCat === 'all' || p.category === filterCat;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.number.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.inspiration.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleDelete = (p: Product) => {
    setProductToDelete(p);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setShowConfirmReset(false);
  };

  const handleModalClose = () => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.toLowerCase().includes('admin') || window.location.pathname.toLowerCase().includes('painel')) {
        history.replaceState(null, '', '/');
      } else if (window.location.hash.toLowerCase().includes('admin') || window.location.hash.toLowerCase().includes('painel')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    onClose();
  };

  const handleModalLogout = () => {
    logoutAdmin();
    handleModalClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 w-full max-w-full">
      <div className="relative bg-white rounded-3xl max-w-6xl w-full h-[90vh] shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Admin Toast */}
        {adminToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-amber-300 px-4 py-2 rounded-xl text-xs font-semibold shadow-xl border border-amber-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{adminToast}</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-white font-serif font-black text-lg">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-lg text-amber-100">
                  Painel Administrativo da Loja
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 font-semibold">
                  Sessão Ativa
                </span>
              </div>
              <p className="text-stone-400 text-xs">
                Mohamed_Brand_Collection • Edição de Produtos, Imagens e Preços
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleModalLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
              title="Encerrar sessão de administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
            <button
              onClick={handleModalClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
              title="Voltar para a loja pública"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Controls */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0 text-xs">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar perfume por número ou nome (Ex: 136, Scandal, Delina...)"
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filterCat === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setFilterCat('feminino')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filterCat === 'feminino'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Feminino
            </button>
            <button
              onClick={() => setFilterCat('masculino')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filterCat === 'masculino'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Masculino
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreatingNew(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Perfume</span>
            </button>

            <button
              onClick={() => setShowConfirmReset(true)}
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition"
              title="Restaurar catálogo para o original"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Confirmation Reset Banner */}
        {showConfirmReset && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 px-4 flex items-center justify-between text-xs text-rose-900 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                Deseja restaurar o catálogo padrão de 114 fragrâncias originais? Todas as alterações personalizadas serão redefinidas.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-2.5 py-1 rounded-md text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs cursor-pointer"
              >
                Sim, Restaurar
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Banner */}
        {productToDelete && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 px-4 flex items-center justify-between text-xs text-amber-950 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                Tem certeza que deseja excluir o perfume <strong>#{productToDelete.number} - {productToDelete.name}</strong>?
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-2.5 py-1 rounded-md text-stone-600 hover:bg-stone-100 font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs cursor-pointer"
              >
                Excluir Perfume
              </button>
            </div>
          </div>
        )}

        {/* Product Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold bg-stone-50">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Imagem</th>
                  <th className="py-2.5 px-3">Nome / Detalhes</th>
                  <th className="py-2.5 px-3">Inspiração</th>
                  <th className="py-2.5 px-3">Preço no PIX</th>
                  <th className="py-2.5 px-3">Preço Original</th>
                  <th className="py-2.5 px-3">Estoque</th>
                  <th className="py-2.5 px-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-amber-50/30 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-900">
                      #{p.number}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="w-11 h-11 rounded-lg bg-stone-50 border border-stone-200 p-1 flex items-center justify-center overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3 max-w-[200px]">
                      <span className="font-bold text-stone-900 block truncate" title={p.name}>
                        {p.name}
                      </span>
                      <span className="text-[10px] text-stone-400 capitalize">
                        {p.category} • {p.volume}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                        {p.inspiration}
                      </span>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{p.brand}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-emerald-800">
                        R$ {(Number(p.price) || 0).toFixed(2).replace('.', ',')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-stone-500 line-through">
                      R$ {(Number(p.oldPrice) || 0).toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {p.stockCount} un
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingItem(p)}
                          className="p-1.5 rounded-lg text-amber-700 hover:text-amber-900 hover:bg-amber-100 transition"
                          title="Editar perfume completo"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Excluir perfume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-400 text-xs">
              Nenhum perfume encontrado com o filtro aplicado.
            </div>
          )}
        </div>
      </div>

      {/* Product Edit Modal */}
      {(editingItem || isCreatingNew) && (
        <ProductEditModal
          product={editingItem}
          isNew={isCreatingNew}
          onClose={() => {
            setEditingItem(null);
            setIsCreatingNew(false);
          }}
        />
      )}
    </div>
  );
};
