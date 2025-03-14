package com.DEMO.Backen_Modules.Service.impl;

import com.DEMO.Backen_Modules.Model.Usuario;
import com.DEMO.Backen_Modules.Model.dto.RegistroDTO;
import com.DEMO.Backen_Modules.Repository.UsuarioRepository;
import com.DEMO.Backen_Modules.Service.UsuarioService;
import com.DEMO.Backen_Modules.config.security.JwtUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.Collections;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UsuarioServiceImpl(
            UsuarioRepository usuarioRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtUtils jwtUtils
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Usuario crearUsuario(RegistroDTO registroDTO) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(registroDTO.getEmail());
        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("El correo electrónico ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(registroDTO.getEmail());
        usuario.setNombre(registroDTO.getNombre());
        usuario.setPassword(passwordEncoder.encode(registroDTO.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public String autenticarUsuario(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Correo electrónico no registrado"));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return jwtUtils.generateToken(usuario.getEmail());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getPassword(),
                Collections.emptyList()
        );
    }

    @Override
    public Optional<Usuario> getUserByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    @PostConstruct
    public void inicializarAdmin() {
        Optional<Usuario> adminExistente = usuarioRepository.findByEmail("admin@admin.com");

        if (adminExistente.isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNombre("admin");
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            usuarioRepository.save(admin);
            System.out.println("Usuario administrador creado exitosamente.");
        }
    }
}
