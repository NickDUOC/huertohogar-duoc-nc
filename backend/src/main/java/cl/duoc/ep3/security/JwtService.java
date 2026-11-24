package cl.duoc.ep3.security;

import cl.duoc.ep3.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    // Clave secreta fija de prueba (mínimo 256 bits para HMAC SHA-256)
    private static final String SECRET_KEY_STRING = "HuertoHogarSecretKeyJwtEP3FullStack2026DuocUCSecret";
    private static final long EXPIRATION_MINUTES = 120; // 2 horas de duración

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes(StandardCharsets.UTF_8));

    public String generarToken(Usuario usuario) {
        Instant ahora = Instant.now();
        return Jwts.builder()
                .subject(usuario.getUsername())
                .claim("rol", usuario.getRol().name())
                .issuedAt(Date.from(ahora))
                .expiration(Date.from(ahora.plusSeconds(EXPIRATION_MINUTES * 60)))
                .signWith(key)
                .compact();
    }

    public String obtenerUsername(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}