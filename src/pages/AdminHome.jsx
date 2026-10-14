import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { cerrarSesion } from "../auth/auth.js";

function AdminHome({
  productos,
  setProductos,
  setPaginaActual,
}) {
  // formulario
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    unidad: "",
    descripcion: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  // errores y mensajes de éxito
  const [errores, setErrores] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(null);

  // cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // cargar datos de un producto existente para su edición
  const cargarParaEditar = (producto) => {
    setFormData({
      codigo: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria || "",
      precio: producto.precio.toString(),
      stock: (producto.stock ?? 100).toString(),
      unidad: producto.unidad || "Kilo",
      descripcion: producto.descripcion || "",
    });
    setErrores([]);
    setMensajeExito(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // eliminar un producto del catálogo
  const handleEliminar = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) {
      setProductos((actuales) => actuales.filter((p) => p.id !== id));
      setMensajeExito({
        texto: `Producto ${id} eliminado correctamente del catálogo.`,
        datos: null,
      });
    }
  };

  // validaciones de nuevoproducto.js
  const handleSubmit = (e) => {
    e.preventDefault();

    const codigo = formData.codigo.trim();
    const nombre = formData.nombre.trim();
    const categoria = formData.categoria;
    const precioTexto = formData.precio.trim();
    const stockTexto = formData.stock.trim();
    const unidad = formData.unidad;
    const descripcion = formData.descripcion.trim();

    const precio = Number(precioTexto);
    const stock = Number(stockTexto);

    const nuevosErrores = [];

    // id / código
    if (codigo === "") {
      nuevosErrores.push("El código (ID) del producto es obligatorio.");
    } else if (codigo.length < 3) {
      nuevosErrores.push("El código debe tener al menos 3 caracteres.");
    }

    // nombre
    if (nombre === "") {
      nuevosErrores.push("El nombre del producto es obligatorio.");
    } else if (nombre.length > 100) {
      nuevosErrores.push("El nombre no puede superar los 100 caracteres.");
    }

    // categoría
    if (categoria === "") {
      nuevosErrores.push("Debe seleccionar una categoría.");
    }

    // validar precio
    if (precioTexto === "") {
      nuevosErrores.push("El precio es obligatorio.");
    } else if (isNaN(precio) || precio < 0) {
      nuevosErrores.push("El precio debe ser un número válido mayor o igual a 0.");
    }

    // validar stock
    if (stockTexto === "") {
      nuevosErrores.push("El stock es obligatorio.");
    } else if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
      nuevosErrores.push("El stock debe ser un número entero mayor o igual a 0.");
    }

    // validar unidad de medida
    if (unidad === "") {
      nuevosErrores.push("Debe seleccionar una unidad de medida.");
    }

    // validar descripción
    if (descripcion.length > 500) {
      nuevosErrores.push("La descripción no puede superar los 500 caracteres.");
    }

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      setMensajeExito(null);
    } else {
      setErrores([]);

      const nuevoProducto = {
        id: codigo,
        categoria: categoria,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        stock: stock,
        unidad: unidad,
      };

      // si id existe, se edita. si no, se agrega
      setProductos((actuales) => {
        const existe = actuales.some((p) => p.id === codigo);
        if (existe) {
          return actuales.map((p) => (p.id === codigo ? nuevoProducto : p));
        } else {
          return [...actuales, nuevoProducto];
        }
      });

      setMensajeExito({
        texto: "✅ Producto guardado correctamente en el catálogo.",
        datos: nuevoProducto,
      });

      // limpiar formulario
      setFormData({
        codigo: "",
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        unidad: "",
        descripcion: "",
      });
    }
  };

  return (
    <div className="admin-page">
      {/* navegación del admin */}
      <header className="admin-header">
        <h2>Panel Administrador</h2>
        <nav>
          <NavLink to="/admin" end>Cambiar Productos</NavLink>
          <NavLink to="/admin/usuarios">Cambiar Usuarios</NavLink>
          <Link to="/" className="btn-secundario">Volver a la Tienda</Link>
          <button
            type="button"
            className="btn-secundario"
            onClick={handleLogout}
            style={{ backgroundColor: "#E74C3C", color: "#fff", cursor: "pointer" }}
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main style={{ gridTemplateColumns: "1fr", padding: "1.5rem" }}>
        <h1>Hola Admin</h1>

        <div className="admin-container">
          <h3>
            Añadir Producto / Editar producto (Ingresar mismo ID para editar un
            producto existente)
          </h3>

          <form id="form-producto" onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="codigo">Código (ID)</label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                placeholder="Ej: FR001"
                value={formData.codigo}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label htmlFor="nombre">Nombre del Producto</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                maxLength="100"
                placeholder="Ej: Manzanas Fuji"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label htmlFor="categoria">Categoría</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value="">Seleccione una categoría</option>
                <option value="FR">Frutas Frescas (FR)</option>
                <option value="VR">Verduras Orgánicas (VR)</option>
                <option value="PO">Productos Orgánicos (PO)</option>
                <option value="PL">Productos Lácteos (PL)</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="precio">Precio ($ CLP)</label>
              <input
                type="number"
                id="precio"
                name="precio"
                min="0"
                placeholder="Ej: 1200"
                value={formData.precio}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label htmlFor="stock">Stock Disponible</label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                placeholder="Ej: 150"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label htmlFor="unidad">Unidad de Medida</label>
              <select
                id="unidad"
                name="unidad"
                value={formData.unidad}
                onChange={handleChange}
              >
                <option value="">Seleccione una unidad</option>
                <option value="Kilo">Kilo</option>
                <option value="Bolsa de 500g">Bolsa de 500g</option>
                <option value="Frasco de 500g">Frasco de 500g</option>
                <option value="Unidad">Unidad</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="4"
                maxLength="500"
                placeholder="Ej: Manzanas Fuji crujientes y dulces..."
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-principal">
              Guardar Producto
            </button>
          </form>

          {/* zona de mensajes */}
          <div id="mensajes">
            {errores.length > 0 &&
              errores.map((error, index) => (
                <div key={index} className="error">
                  ⚠️ {error}
                </div>
              ))}

            {mensajeExito && (
              <div className="exito">
                {mensajeExito.texto}
                {mensajeExito.datos && (
                  <>
                    <br />
                    <br />
                    ID: {mensajeExito.datos.id}
                    <br />
                    Nombre: {mensajeExito.datos.nombre}
                    <br />
                    Categoría: {mensajeExito.datos.categoria}
                    <br />
                    Precio: ${mensajeExito.datos.precio} CLP
                    <br />
                    Stock: {mensajeExito.datos.stock}
                    <br />
                    Unidad: {mensajeExito.datos.unidad}
                  </>
                )}
              </div>
            )}
          </div>

          {/* listado de productos */}
          <div className="col-8" style={{ marginTop: "2rem" }}>
            <h1>Productos disponibles</h1>
            <div id="product-list-mostrar" className="grid-productos">
              {productos.map((producto) => (
                <div key={producto.id} className="product">
                  <strong>{producto.nombre}</strong> (ID: {producto.id})
                  <br />
                  Categoría: {producto.categoria || "N/A"}
                  <br />
                  Precio: ${producto.precio} por {producto.unidad}
                  <br />
                  Stock: {producto.stock ?? 100}
                  <br />
                  Descripción: {producto.descripcion}
                  <br />
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <button
                      type="button"
                      className="btn-principal"
                      onClick={() => cargarParaEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-secundario"
                      onClick={() => handleEliminar(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;