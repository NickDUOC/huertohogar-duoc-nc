package cl.duoc.ep3.repository;

import cl.duoc.ep3.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}