package com.channel.will.jugtours.web;

import com.channel.will.jugtours.model.User;
import com.channel.will.jugtours.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) { this.userRepository = userRepository; }

    @GetMapping("/users")
    Collection<User> users() { return userRepository.findAll(); }

    @PostMapping("auth/logIn")
    ResponseEntity<User> logIn(@Valid @RequestBody User user) {
        log.info("Request to log in {}", user);
        User result = userRepository.findByEmail(user.getEmail());
        if (result.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok().body(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("auth/signUp")
    ResponseEntity<User> signUp(@Valid @RequestBody User user) {
        log.info("Request to sign up {}", user);
        // TODO: actual token
        User newUser = User.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .token(user.getEmail())
                .build();

        newUser = userRepository.save(newUser);
        return ResponseEntity.ok().body(newUser);
    }
}
