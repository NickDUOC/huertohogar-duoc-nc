package cl.duoc.ep3.config;

import cl.duoc.ep3.model.Producto;
import cl.duoc.ep3.model.Usuario;
import cl.duoc.ep3.repository.ProductoRepository;
import cl.duoc.ep3.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatosIniciales {

    @Bean
    CommandLineRunner cargarDatosSemilla(
            UsuarioRepository usuarioRepository,
            ProductoRepository productoRepository,
            PasswordEncoder encoder) {
        return args -> {

            // 1. USUARIOS SEMILLA (ADMIN Y CLIENTE)
            if (usuarioRepository.findByUsername("admin@duoc.cl").isEmpty()) {
                usuarioRepository.save(new Usuario("admin@duoc.cl", encoder.encode("admin"), Usuario.Rol.ADMIN));
            }
            if (usuarioRepository.findByUsername("cliente@duoc.cl").isEmpty()) {
                usuarioRepository.save(new Usuario("cliente@duoc.cl", encoder.encode("cliente123"), Usuario.Rol.USER));
            }

            // 2. CATÁLOGO INICIAL OFICIAL - FORMA A (HUERTO HOGAR)
            if (productoRepository.count() == 0) {

                // FR001 - Manzanas Fuji
                Producto p1 = new Producto();
                p1.setCodigo("FR001");
                p1.setNombre("Manzanas Fuji");
                p1.setCategoria("FR");
                p1.setPrecio(1200);
                p1.setStock(150);
                p1.setUnidad("Kilo");
                p1.setDescripcion("Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Conocidas por su textura firme y su sabor equilibrado.");
                productoRepository.save(p1);

                // FR002 - Naranjas Valencia
                Producto p2 = new Producto();
                p2.setCodigo("FR002");
                p2.setNombre("Naranjas Valencia");
                p2.setCategoria("FR");
                p2.setPrecio(1000);
                p2.setStock(200);
                p2.setUnidad("Kilo");
                p2.setDescripcion("Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.");
                productoRepository.save(p2);

                // FR003 - Plátanos Cavendish
                Producto p3 = new Producto();
                p3.setCodigo("FR003");
                p3.setNombre("Plátanos Cavendish");
                p3.setCategoria("FR");
                p3.setPrecio(800);
                p3.setStock(250);
                p3.setUnidad("Kilo");
                p3.setDescripcion("Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.");
                productoRepository.save(p3);

                // VR001 - Zanahorias Orgánicas
                Producto p4 = new Producto();
                p4.setCodigo("VR001");
                p4.setNombre("Zanahorias Orgánicas");
                p4.setCategoria("VR");
                p4.setPrecio(900);
                p4.setStock(100);
                p4.setUnidad("Kilo");
                p4.setDescripcion("Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.");
                productoRepository.save(p4);

                // VR002 - Espinacas Frescas
                Producto p5 = new Producto();
                p5.setCodigo("VR002");
                p5.setNombre("Espinacas Frescas");
                p5.setCategoria("VR");
                p5.setPrecio(700);
                p5.setStock(80);
                p5.setUnidad("Bolsa de 500g");
                p5.setDescripcion("Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.");
                productoRepository.save(p5);

                // VR003 - Pimientos Tricolores
                Producto p6 = new Producto();
                p6.setCodigo("VR003");
                p6.setNombre("Pimientos Tricolores");
                p6.setCategoria("VR");
                p6.setPrecio(1500);
                p6.setStock(120);
                p6.setUnidad("Kilo");
                p6.setDescripcion("Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, añaden un toque vibrante y saludable a cualquier receta.");
                productoRepository.save(p6);

                // PO001 - Miel Orgánica
                Producto p7 = new Producto();
                p7.setCodigo("PO001");
                p7.setNombre("Miel Orgánica");
                p7.setCategoria("PO");
                p7.setPrecio(5000);
                p7.setStock(50);
                p7.setUnidad("Frasco de 500g");
                p7.setDescripcion("Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.");
                productoRepository.save(p7);
            }
        };
    }
}
