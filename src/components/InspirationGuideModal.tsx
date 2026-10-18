import React, { useState } from 'react';
import { X, Search, BookOpen, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { matchProductCode } from '../utils/search';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export const InspirationGuideModal: React.FC = () => {
  const { products } = useProducts();
  const { 
    isInspirationGuideOpen, 
    setIsInspirationGuideOpen, 
    addToCart, 
    setSelectedProductForModal 
  } = useCart();

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<'all' | 'feminino' | 'masculino'>('all');

  if (!isInspirationGuideOpen) return null;

  const filtered = products.filter((p) => {
    const matchesCat = filterCat === 'all' || p.category === filterCat;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      matchProductCode(p.number, q) ||
      p.number.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.inspiration.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.family.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 w-full">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-amber-100">
                Tabela de Inspirações Olfativas • Brand Collection
              </h2>
              <p className="text-stone-400 text-xs">
                Guia completo de correspondência dos códigos com os perfumes importados de grife
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInspirationGuideOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row gap-3 shrink-0">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por código (#136, #007) ou grife (Scandal, Jadore, Good Girl, Dior...)"
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

          <div className="flex gap-1.5">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCat === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setFilterCat('feminino')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCat === 'feminino'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Femininos
            </button>
            <button
              onClick={() => setFilterCat('masculino')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterCat === 'masculino'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Masculinos
            </button>
          </div>
        </div>

        {/* Table / Card Content */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-4 touch-scroll">
          {/* Mobile Card View (md:hidden) */}
          <div className="md:hidden space-y-2.5">
            {filtered.map((p) => (
              <div 
                key={p.id}
                className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-amber-400/50 transition flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono font-bold text-xs bg-stone-900 text-amber-300 px-1.5 py-0.5 rounded-md">
                        #{p.number}
                      </span>
                      <span className="font-bold text-xs text-stone-900 truncate">
                        {p.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-800 font-semibold mt-0.5 truncate">
                      Ref: {p.inspiration} <span className="text-stone-500 font-normal">({p.brand})</span>
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {p.family} • R$ {p.price.toFixed(2).replace('.', ',')} no PIX
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedProductForModal(p);
                      setIsInspirationGuideOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 bg-white border border-stone-200 hover:bg-stone-100 transition flex items-center justify-center min-w-[32px] min-h-[32px]"
                    title="Ver detalhes"
                    aria-label="Ver detalhes"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold p-1.5 rounded-lg text-xs flex items-center justify-center transition shadow-xs min-w-[32px] min-h-[32px]"
                    title="Adicionar ao carrinho"
                    aria-label="Adicionar ao carrinho"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop & Tablet Table View (hidden md:block) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Frasco</th>
                  <th className="py-2.5 px-3">Nome / Referência</th>
                  <th className="py-2.5 px-3">Grife Inspirada</th>
                  <th className="py-2.5 px-3">Família Olfativa</th>
                  <th className="py-2.5 px-3">Preço no PIX</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((p) => {
                  const unitPrice = p.price;
                  return (
                    <tr key={p.id} className="hover:bg-amber-50/40 transition">
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-900">
                        #{p.number}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="w-10 h-10 rounded-lg bg-stone-50 border border-stone-200 p-0.5 flex items-center justify-center overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-stone-900 block">{p.name}</span>
                        <span className="text-[10px] text-stone-400">{p.volume} • {p.concentration}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                          {p.inspiration}
                        </span>
                        <span className="text-[10px] text-stone-500 block mt-0.5">{p.brand}</span>
                      </td>
                      <td className="py-2.5 px-3 text-stone-600">
                        {p.family}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">
                        R$ {unitPrice.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProductForModal(p);
                              setIsInspirationGuideOpen(false);
                            }}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Comprar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-stone-500 text-xs">
              Nenhum perfume encontrado com os termos pesquisados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
