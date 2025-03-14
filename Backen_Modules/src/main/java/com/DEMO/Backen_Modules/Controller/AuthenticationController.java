package com.DEMO.Backen_Modules.Controller;

import com.DEMO.Backen_Modules.Model.dto.LoginDTO;
import com.DEMO.Backen_Modules.Model.dto.RegistroDTO;
import com.DEMO.Backen_Modules.Service.UsuarioService;
import com.DEMO.Backen_Modules.config.JwtResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.DEMO.Backen_Modules.Model.Usuario;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/autenticar")
public class AuthenticationController {

    private final UsuarioService usuarioService;

    public AuthenticationController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarUsuario(@RequestBody RegistroDTO registroDTO) {
        try {
            usuarioService.crearUsuario(registroDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody LoginDTO loginDTO) {
        try {
            String token = usuarioService.autenticarUsuario(loginDTO.getEmail(), loginDTO.getPassword());
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Correo electrónico no registrado");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }
    }

}
