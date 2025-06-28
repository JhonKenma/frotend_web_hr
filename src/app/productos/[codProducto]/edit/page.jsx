'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducto, updateProducto } from '../../../lib/api';

export default function EditarProducto() {
  const router = useRouter();
  const { codProducto } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nomPro: '',
    precioProducto: '',
    stockProducto: '',
  });

  useEffect(() => {
    const loadProducto = async () => {
      try {
        setLoading(true);
        const data = await getProducto(codProducto);
        setForm(data);
      } catch (error) {
        console.error('Error al cargar producto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (codProducto) {
      loadProducto();
    }
  }, [codProducto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updateProducto(codProducto, {
        ...form,
        precioProducto: parseFloat(form.precioProducto),
        stockProducto: parseInt(form.stockProducto),
      });
      router.push('/productos');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

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
          
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Editar Producto
            </h1>
            <p className="text-orange-100 text-lg">
              Código: {codProducto}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-10 10L4 11" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Ingresa el nombre del producto"
                    value={form.nomPro}
                    onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
                  />
                </div>
              </div>

              {/* Precio */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Precio
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg font-semibold">$</span>
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
                <p className="text-xs text-gray-500">Ingresa el precio en soles (S/)</p>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Stock Disponible
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
                    placeholder="Cantidad en stock"
                    value={form.stockProducto}
                    onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
                  />
                </div>
                <p className="text-xs text-gray-500">Número de unidades disponibles</p>
              </div>

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
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Guardando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Guardar Cambios
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Información importante</h3>
                <p className="text-blue-700 text-sm">
                  Los cambios se aplicarán inmediatamente después de guardar. Asegúrate de que todos los datos sean correctos antes de continuar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}