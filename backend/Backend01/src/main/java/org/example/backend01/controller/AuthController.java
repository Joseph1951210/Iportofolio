package org.example.backend01.controller;

import org.example.backend01.model.User;
import org.example.backend01.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Value("${JWT_SECRET_KEY}")
    private String secretKey;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //register api
    @PostMapping("/register")
    
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        // check if the username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Username already exists");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        // encode
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // save
        User savedUser = userRepository.save(user);

        // response id and username
        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("username", savedUser.getUsername());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
//    public ResponseEntity<String> register(@RequestBody User user) {
//        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
//            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
//        }
//
//        // hash the password
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        userRepository.save(user);
//
//        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
//
//
//
//    }

    //login api
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginuser){
        Optional<User> user = userRepository.findByUsername(loginuser.getUsername());

        if(user.isPresent() && passwordEncoder.matches(loginuser.getPassword(), user.get().getPassword())) {


            if (secretKey == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Server configuration error: missing secret key");
                return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // generate JWT token

            String token = Jwts.builder()
                    .setSubject(user.get().getUsername())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                    .signWith(SignatureAlgorithm.HS512, secretKey)
                    .compact();

            // Create response object
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.get().getId());
            response.put("username", user.get().getUsername());
            response.put("token", token);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid username or password");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);

        }
    }





}
