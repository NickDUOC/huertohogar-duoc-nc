import CarritoLateral from "../components/CarritoLateral";

function Blog({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
}) {
  return (
    <main>
      <div className="contenido-principal">
        <section className="blog-seccion">
          <h1>Noticias y Consejos de HuertoHogar</h1>

          <article>
            <h2>5 Beneficios de consumir verduras orgánicas</h2>
            <img src="/img/images.jpeg" alt="imagen_verduras" />
            <p>
              <strong>Resumen:</strong> Descubre cómo los productos cultivados
              sin pesticidas ni químicos benefician tu salud diaria y cuidan el
              medio ambiente...
            </p>
            <p>
              Las verduras orgánicas de HuertoHogar son cosechadas en su punto
              óptimo de madurez. Al no utilizar químicos sintéticos, conservan un
              sabor más auténtico, mayor cantidad de vitaminas, minerales y
              antioxidantes esenciales para tu familia.
            </p>
          </article>

          <hr />

          <article>
            <h2>Cómo mantener tus frutas frescas por más tiempo</h2>
            <img
              src="/img/IMG_3B0967248B47-1.jpg.webp"
              alt="imagen_frutas"
              width="200"
            />
            <p>
              <strong>Resumen:</strong> Aprende trucos sencillos para almacenar
              manzanas, naranjas y plátanos sin que pierdan su sabor ni
              textura...
            </p>
            <p>
              Para evitar que las frutas se deterioren rápidamente, es importante
              conocer cuáles emiten gas etileno. Mantén las manzanas separadas de
              otras frutas y conserva las naranjas en un lugar fresco y ventilado
              a temperatura ambiente.
            </p>
          </article>
        </section>
      </div>

      {/* carrito lateral */}
      <CarritoLateral
        carrito={carrito}
        vaciarCarrito={vaciarCarrito}
        comprar={comprar}
        agregarAlCarrito={agregarAlCarrito}
        disminuirCantidad={disminuirCantidad}
        eliminarDelCarrito={eliminarDelCarrito}
      />
    </main>
  );
}

export default Blog;