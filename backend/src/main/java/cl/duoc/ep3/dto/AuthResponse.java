package cl.duoc.ep3.dto;

public record AuthResponse(
    String token,
    String username,
    String rol,
    String tipoToken
) {
    public AuthResponse(String token, String username, String rol) {
        this(token, username, rol, "Bearer");
    }
}