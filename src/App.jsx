import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import { productosIniciales } from "./data/productos";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Blog from "./pages/Blog";
import AdminHome from "./pages/AdminHome";
import AdminUsuarios from "./pages/AdminUsuarios";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import { Routes, Route } from "react-router-dom";
import RutaProtegida from "./components/RutaProtegida";
import { calcularCantidadTotal } from "./utils/carrito.js"


function App() {
  // cargar el carrito desde localstorage
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // guardado automático en localstorage cuando haya cambios
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);


  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : productosIniciales;
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // agregar al carrito (max 5)
  function agregarAlCarrito(id) {
    setCarrito((carritoActual) => {
      const itemExistente = carritoActual.find((item) => item.id === id);

      if (itemExistente) {
        if (itemExistente.cantidad >= 5) {
          alert("Máximo 5 unidades por producto");
          return carritoActual;
        }
        return carritoActual.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        const producto = productosIniciales.find((p) => p.id === id);
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  }

  // disminuir
  function disminuirCantidad(id) {
    setCarrito((carritoActual) => {
      const item = carritoActual.find((i) => i.id === id);
      if (!item) return carritoActual;

      if (item.cantidad <= 1) {
        return carritoActual.filter((i) => i.id !== id);
      } else {
        return carritoActual.map((i) =>
          i.id === id ? { ...i, cantidad: item.cantidad - 1 } : i
        );
      }
    });
  }

  // eliminar
  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  }

  // vaciar carrito
  function vaciarCarrito() {
    setCarrito([]);
  }

  // comprar (prueba no más)
  function comprar() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra en HuertoHogar!");
    vaciarCarrito();
  }

  // total de productos
  const cantidadTotalCarrito = calcularCantidadTotal(carrito);  
  
  return (
    <Routes>
      {/* vistas públicas */}
      <Route element={<LayoutPrincipal cantidadCarrito={cantidadTotalCarrito} />}>
        <Route
          index
          element={
            <Home
              carrito={carrito}
              vaciarCarrito={vaciarCarrito}
              comprar={comprar}
              agregarAlCarrito={agregarAlCarrito}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
        <Route
          path="productos"
          element={
            <Productos
              carrito={carrito}
              vaciarCarrito={vaciarCarrito}
              comprar={comprar}
              agregarAlCarrito={agregarAlCarrito}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
        <Route
          path="contacto"
          element={
            <Contacto
              carrito={carrito}
              vaciarCarrito={vaciarCarrito}
              comprar={comprar}
              agregarAlCarrito={agregarAlCarrito}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login
              carrito={carrito}
              vaciarCarrito={vaciarCarrito}
              comprar={comprar}
              agregarAlCarrito={agregarAlCarrito}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
        <Route
          path="registro"
          element={
            <Registro
              carrito={carrito}
              vaciarCarrito={vaciarCarrito}
              comprar={comprar}
              agregarAlCarrito={agregarAlCarrito}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
        <Route
          path="blog"
          element={
            <Blog
              carrito={carrito}
              vaciarCarrito={vaciarCarrito}
              comprar={comprar}
              agregarAlCarrito={agregarAlCarrito}
              disminuirCantidad={disminuirCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
      </Route>{/* vistas admin */}
        <Route
          path="admin"
          element={
            <RutaProtegida exigirAdmin={true}>
              <AdminHome
                productos={productos}
                setProductos={setProductos}
              />
            </RutaProtegida>
          }
        />
        <Route
          path="admin/usuarios"
          element={
            <RutaProtegida exigirAdmin={true}>
              <AdminUsuarios />
            </RutaProtegida>
          }
        />
    </Routes>
  );
}

export default App;