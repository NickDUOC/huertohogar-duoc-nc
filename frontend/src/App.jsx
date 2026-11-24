import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Blog from "./pages/Blog";
import AdminHome from "./pages/AdminHome";
import AdminUsuarios from "./pages/AdminUsuarios";
import RutaProtegida from "./components/RutaProtegida";
import { calcularCantidadTotal } from "./utils/carrito.js";
import { getProductos } from "./services/productoService.js";

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos de Spring Boot:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  function agregarAlCarrito(id) {
    setCarrito((carritoActual) => {
      const itemExistente = carritoActual.find((item) => item.id === id || item.codigo === id);
      if (itemExistente) {
        if (itemExistente.cantidad >= 5) {
          alert("Máximo 5 unidades por producto");
          return carritoActual;
        }
        return carritoActual.map((item) =>
          (item.id === id || item.codigo === id) ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        const prod = productos.find((p) => p.id === id || p.codigo === id);
        if (!prod) return carritoActual;
        return [...carritoActual, { ...prod, cantidad: 1 }];
      }
    });
  }

  function disminuirCantidad(id) {
    setCarrito((carritoActual) => {
      const item = carritoActual.find((i) => i.id === id || i.codigo === id);
      if (!item) return carritoActual;
      if (item.cantidad <= 1) {
        return carritoActual.filter((i) => i.id !== id && i.codigo !== id);
      } else {
        return carritoActual.map((i) =>
          (i.id === id || i.codigo === id) ? { ...i, cantidad: item.cantidad - 1 } : i
        );
      }
    });
  }

  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id && item.codigo !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function comprar() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra en HuertoHogar!");
    vaciarCarrito();
  }

  const cantidadTotalCarrito = calcularCantidadTotal(carrito);

  const propsComunes = {
    carrito,
    vaciarCarrito,
    comprar,
    agregarAlCarrito,
    disminuirCantidad,
    eliminarDelCarrito,
    productos,
  };

  return (
    <Routes>
      <Route element={<LayoutPrincipal cantidadCarrito={cantidadTotalCarrito} />}>
        <Route index element={<Home {...propsComunes} />} />
        <Route path="productos" element={<Productos {...propsComunes} />} />
        <Route path="contacto" element={<Contacto {...propsComunes} />} />
        <Route path="login" element={<Login {...propsComunes} />} />
        <Route path="registro" element={<Registro {...propsComunes} />} />
        <Route path="blog" element={<Blog {...propsComunes} />} />
      </Route>

      <Route
        path="admin"
        element={
          <RutaProtegida exigirAdmin={true}>
            <AdminHome productos={productos} setProductos={setProductos} recargarProductos={cargarProductos} />
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