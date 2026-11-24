package cl.duoc.ep3.service;

import cl.duoc.ep3.model.Producto;
import cl.duoc.ep3.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> listar() {
        return repository.findAll();
    }

    public Producto buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    public Producto crear(Producto producto) {
        producto.setId(null);
        return repository.save(producto);
    }

    public Producto actualizar(Long id, Producto cambios) {
        Producto actual = buscarPorId(id);
        actual.setCodigo(cambios.getCodigo());
        actual.setNombre(cambios.getNombre());
        actual.setCategoria(cambios.getCategoria());
        actual.setPrecio(cambios.getPrecio());
        actual.setStock(cambios.getStock());
        actual.setUnidad(cambios.getUnidad());
        actual.setDescripcion(cambios.getDescripcion());
        return repository.save(actual);
    }

    public void eliminar(Long id) {
        Producto actual = buscarPorId(id);
        repository.delete(actual);
    }
}