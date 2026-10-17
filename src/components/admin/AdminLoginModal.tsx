import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin } = useProducts();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setPassword('');
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-amber-100">
                Acesso do Administrador
              </h2>
              <p className="text-stone-400 text-xs">
                Mohamed_Brand_Collection
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Senha de Acesso do Administrador
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Digite a senha de administrador"
                className={`w-full bg-stone-50 border rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none transition ${
                  error
                    ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/30'
                    : 'border-stone-200 focus:border-amber-500 focus:bg-white'
                }`}
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
            {error && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Senha incorreta! Tente novamente.</span>
              </p>
            )}
          </div>

          <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200 leading-relaxed">
            Área restrita para edição de preços, imagens, nomes, estoque e descrições dos perfumes da loja.
          </p>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5 transition"
            >
              <span>Acessar Painel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
