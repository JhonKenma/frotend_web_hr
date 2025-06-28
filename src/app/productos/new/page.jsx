'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createProducto } from '../../lib/api';

export default function CrearProducto() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ 
    nomPro: '', 
    precioProducto: '', 
    stockProducto: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await createProducto({
        ...form,
        precioProducto: parseFloat(form.precioProducto),
        stockProducto: parseInt(form.stockProducto),
      });
      router.push('/productos');
    } catch (error) {
      console.error('Error al crear producto:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/productos')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Productos
          </button>
          
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Crear Nuevo Producto
            </h1>
            <p className="text-emerald-100 text-lg">
              Agrega un producto a tu inventario
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre del Producto */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Nombre del Producto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Ej: Laptop Dell Inspiron 15"
                    value={form.nomPro}
                    onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
                  />
                </div>
                <p className="text-xs text-gray-500">Ingresa un nombre descriptivo para el producto</p>
              </div>

              {/* Precio */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Precio de Venta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg font-semibold">S/</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="0.00"
                    value={form.precioProducto}
                    onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
                  />
                </div>
                <p className="text-xs text-gray-500">Precio en soles peruanos (incluye decimales)</p>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Stock Inicial
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    min="0"
                    required
                    className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Ej: 50"
                    value={form.stockProducto}
                    onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
                  />
                </div>
                <p className="text-xs text-gray-500">Cantidad inicial de unidades disponibles</p>
              </div>

              {/* Preview Card */}
              {(form.nomPro || form.precioProducto || form.stockProducto) && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Vista Previa</h3>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {form.nomPro || 'Nombre del producto'}
                        </h4>
                        <p className="text-green-600 font-semibold text-lg">
                          S/ {form.precioProducto ? parseFloat(form.precioProducto).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        form.stockProducto > 10 
                          ? 'bg-green-100 text-green-800' 
                          : form.stockProducto > 0 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {form.stockProducto || '0'} unidades
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/productos')}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Creando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Crear Producto
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Tips Card */}
          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <h3 className="font-semibold text-emerald-900 mb-2">Consejos para crear productos</h3>
                <ul className="text-emerald-700 text-sm space-y-1">
                  <li>• Usa nombres descriptivos y específicos</li>
                  <li>• Verifica que el precio sea competitivo</li>
                  <li>• Considera el stock mínimo necesario</li>
                  <li>• Revisa los datos antes de guardar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}