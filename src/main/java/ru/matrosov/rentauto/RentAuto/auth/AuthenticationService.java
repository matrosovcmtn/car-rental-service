package ru.matrosov.rentauto.RentAuto.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.repositories.PeopleRepository;
import ru.matrosov.rentauto.RentAuto.services.JwtService;
import ru.matrosov.rentauto.RentAuto.token.Token;
import ru.matrosov.rentauto.RentAuto.token.TokenRepository;
import ru.matrosov.rentauto.RentAuto.token.TokenType;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final PeopleRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final TokenRepository tokenRepository;

  public AuthenticationResponse register(RegisterRequest request) {
    var user = Person.builder()
        .name(request.getName())
        .email(request.getEmail())
        .tel(request.getTel())
        .password(passwordEncoder.encode(request.getPassword()))
        .age(request.getAge())
        .build();
    var savedUser = repository.save(user);
    var jwtToken = jwtService.generateToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
  }

  private void saveUserToken(Person user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(Person user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }
}
