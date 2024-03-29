package edu.ijse.todo.service.impl;

import edu.ijse.todo.entity.UserEntity;
import edu.ijse.todo.repository.UserRepository;
import edu.ijse.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserEntity getUserByUserId(int id) {
       return userRepository.findById(id).orElse(null);
    }

    @Override
    public UserEntity saveUser(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }


}
