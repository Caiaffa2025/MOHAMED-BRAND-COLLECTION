import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { Product } from '../../data/products';
import { useProducts } from '../../context/ProductContext';

interface ProductEditModalProps {
  product: Product | null;
  onClose: () => void;
  isNew?: boolean;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onClose, isNew = false }) => {
  const { updateProduct, addProduct, products } = useProducts();

  const [formData, setFormData] = useState<Product>(() => {
    if (product) return { ...product };
    const nextId = Math.max(...products.map(p => p.id), 0) + 1;
    return {
      id: nextId,
      number: String(nextId).padStart(3, '0'),
      name: 'Novo Perfume Brand Collection 25ml',
      inspiration: 'Nome da Inspiração',
      brand: 'Grife Internacional',
      family: 'Floral Frutado Nobre',
      category: 'feminino',
      volume: '25ml',
      concentration: 'Eau de Parfum (Alta Fixação)',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
      price: 70.00,
      oldPrice: 89.00,
      wholesalePriceTier1: 70.00,
      wholesalePriceTier2: 64.90,
      wholesalePriceTier3: 59.90,
      pixDiscountPercent: 5,
      inStock: true,
      stockCount: 20,
      rating: 4.9,
      reviewCount: 35,
      badge: 'Lançamento',
      topNotes: 'Notas frescas e frutadas',
      heartNotes: 'Bouquet floral nobre',
      baseNotes: 'Madeiras, âmbar e baunilha',
      description: 'Perfume Brand Collection Eau de Parfum 25ml réplica miniatura de alta fixação.'
    };
  });

  const [imgError, setImgError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('O nome do perfume é obrigatório.');
      return;
    }
    if (isNew) {
      addProduct(formData);
    } else {
      updateProduct(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto overflow-x-hidden bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 touch-scroll w-full">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-4 sm:my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-amber-100">
                {isNew ? 'Cadastrar Novo Perfume' : `Editar Perfume #${formData.number}`}
              </h2>
              <p className="text-stone-400 text-xs">
                Altere valores, imagens, descrições e detalhes do produto no catálogo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto touch-scroll space-y-4 sm:space-y-5 text-xs text-stone-700">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Image & Main Info Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start bg-stone-50 p-3.5 sm:p-4 rounded-2xl border border-stone-200">
            <div className="sm:col-span-4 flex flex-col items-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-white border border-stone-200 p-2 flex items-center justify-center overflow-hidden shadow-xs relative">
                {!imgError ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                    <span className="font-serif font-black text-2xl text-amber-800">M</span>
                    <span className="text-[10px] text-stone-500 mt-1">Sem imagem</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-stone-400 mt-1">Pré-visualização da imagem</span>
            </div>

            <div className="sm:col-span-8 space-y-2.5">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  URL da Imagem do Produto *
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImgError(false);
                    }}
                    placeholder="https://exemplo.com/imagem.webp"
                    className="flex-1 bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  Insira o link direto da imagem JPG, PNG ou WebP.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Código / Número (#) *</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="136"
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Categoria *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'feminino' | 'masculino' })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500 font-medium cursor-pointer"
                  >
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Title */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Nome do Perfume no Catálogo *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: 136 - Scandal Feminino - Brand Collection - 25ml"
              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 font-semibold"
            />
          </div>

          {/* Pricing Row */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
              Valores do Produto (R$) • Pagamento Exclusivo via PIX
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 font-medium mb-1">Preço Original / De (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 font-bold"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1">Preço no PIX / Por (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setFormData({ 
                      ...formData, 
                      price: val, 
                      wholesalePriceTier1: val,
                      wholesalePriceTier2: val,
                      wholesalePriceTier3: val
                    });
                  }}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 font-bold text-emerald-800 text-base"
                />
              </div>
            </div>
          </div>

          {/* Inspiration, Brand & Family */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Inspiração Olfativa</label>
              <input
                type="text"
                value={formData.inspiration}
                onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
                placeholder="Ex: Scandal"
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Grife Original</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Ex: Jean Paul Gaultier"
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Família Olfativa</label>
              <input
                type="text"
                value={formData.family}
                onChange={(e) => setFormData({ ...formData, family: e.target.value })}
                placeholder="Ex: Chipre Floral Doce"
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Olfactory Pyramid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Notas de Topo (Saída)</label>
              <input
                type="text"
                value={formData.topNotes}
                onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                placeholder="Notas cítricas, frutas frescas..."
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Notas de Coração (Corpo)</label>
              <input
                type="text"
                value={formData.heartNotes}
                onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                placeholder="Flores nobres, jasmim, rosa..."
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Notas de Fundo (Fixação)</label>
              <input
                type="text"
                value={formData.baseNotes}
                onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                placeholder="Madeiras, baunilha, âmbar..."
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Stock, Badge & Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Badge / Selo</label>
              <select
                value={formData.badge || ''}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value || undefined })}
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="">Nenhum</option>
                <option value="Mais Vendido">Mais Vendido</option>
                <option value="Lançamento">Lançamento</option>
                <option value="Destaque Especial">Destaque Especial</option>
                <option value="Promoção">Promoção</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Estoque Disponível (un)</label>
              <input
                type="number"
                value={formData.stockCount}
                onChange={(e) => setFormData({ ...formData, stockCount: parseInt(e.target.value) || 0 })}
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Volume do Frasco</label>
              <input
                type="text"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                placeholder="25ml"
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Descrição Completa do Perfume
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva as características, fixação e detalhes do perfume..."
              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold text-xs transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>{isNew ? 'Salvar Novo Perfume' : 'Salvar Alterações'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
