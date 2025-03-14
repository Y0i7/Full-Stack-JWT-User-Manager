package com.DEMO.Backen_Modules.Model.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class RegistroDTO {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}