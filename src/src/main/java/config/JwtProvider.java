package config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
//import org.springframework.security.core.Authentication;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtProvider {
    public static final SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    public String generateToken(Authentication auth) {

        String jwt = Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+846000000))
                .claim("email", auth.getName()).signWith(key).compact();
        System.out.println(getEmailFromToken(jwt));
        return jwt;
    }

    public String getEmailFromToken(String jwt) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("email"));
        return email;
    }
}
