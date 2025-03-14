package com.DEMO.Backen_Modules.Service;

import com.DEMO.Backen_Modules.Model.Usuario;
import com.DEMO.Backen_Modules.Model.dto.RegistroDTO;
import org.springframework.security.core.userdetails.UserDetailsService;
import java.util.Optional;

public interface UsuarioService extends UserDetailsService {
    Usuario crearUsuario(RegistroDTO registroDTO);
    String autenticarUsuario(String email, String password);
    Optional<Usuario> getUserByEmail(String email);
    void inicializarAdmin();

}


