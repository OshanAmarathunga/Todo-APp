package edu.ijse.todo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "UserLoginDetail")
public class UserLoginDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loginDetailId;

    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "loginUserID")
    private UserEntity Loginuser;


}
