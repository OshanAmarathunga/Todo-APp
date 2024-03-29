package edu.ijse.todo.controller;

import edu.ijse.todo.dto.UserDto;
import edu.ijse.todo.entity.UserEntity;
import edu.ijse.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/user/{userName}")
    public ResponseEntity<UserEntity> getUserByUserID(@PathVariable String userName){

        List<UserEntity> entities=userService.getAllUsers();
        for( UserEntity ety:entities){
            if(ety.getUserName().equals(userName)){
                return ResponseEntity.status(200).body(ety);
            }
        }
        return ResponseEntity.status(404).body(null);
    }

    @PostMapping("/user")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserDto dto){
        UserEntity entity=new UserEntity();
        entity.setUserName(dto.getUserName());
        entity.setPassword(dto.getPassword());

        UserEntity getUser=userService.saveUser(entity);

        return getUser==null?ResponseEntity.status(404).body(null):ResponseEntity.status(200).body(getUser);

    }

}
