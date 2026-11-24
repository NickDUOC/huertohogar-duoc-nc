package cl.duoc.ep3.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank(message = "El usuario/correo es obligatorio") String username,
    @NotBlank(message = "La contraseña es obligatoria") String password
) {}