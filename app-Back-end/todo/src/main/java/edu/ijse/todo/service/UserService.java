package edu.ijse.todo.service;

import edu.ijse.todo.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserEntity getUserByUserId(int id);
    UserEntity saveUser(UserEntity userEntity);

    List<UserEntity> getAllUsers();




}
