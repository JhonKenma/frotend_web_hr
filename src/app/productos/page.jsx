'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://lab15-web-1orq.onrender.com/api/productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (codProducto) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`https://lab15-web-1orq.onrender.com/api/productos/${codProducto}`, {
        method: 'DELETE',
      });
      if (res.status === 204) {
        alert('Producto eliminado');
        fetchProductos();
      } else {
        const data = await res.json();
        alert('Error al eliminar: ' + data.message);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Gestión de Productos
          </h1>
          <p className="text-blue-100 text-lg">
            Administra tu inventario de manera eficiente
          </p>
        </div>

        {/* Botón agregar con hover effect */}
        <div className="mb-8">
          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={() => router.push('/productos/new')}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar Nuevo Producto
            </span>
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          /* Tabla con diseño moderno */
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Nombre del Producto
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productos.map((prod, index) => (
                    <tr 
                      key={prod.codProducto} 
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {prod.codProducto}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {prod.nomPro}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                          ${parseFloat(prod.precioProducto).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          prod.stockProducto > 10 
                            ? 'bg-green-100 text-green-800' 
                            : prod.stockProducto > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {prod.stockProducto} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => router.push(`/productos/${prod.codProducto}/edit`)}
                            className="group relative px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Editar
                            </span>
                          </button>
                          <button
                            onClick={() => eliminarProducto(prod.codProducto)}
                            className="group relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Eliminar
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                          <p className="text-gray-500 text-lg font-medium">No hay productos disponibles</p>
                          <p className="text-gray-400 text-sm mt-1">Comienza agregando tu primer producto</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer con estadísticas */}
        {productos.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {productos.length}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  Total Productos
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {productos.reduce((sum, prod) => sum + parseInt(prod.stockProducto), 0)}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  Total Stock
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  ${productos.reduce((sum, prod) => sum + parseFloat(prod.precioProducto) * parseInt(prod.stockProducto), 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  Valor Inventario
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}