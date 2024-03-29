package edu.ijse.todo.controller;

import edu.ijse.todo.dto.UserLoginDetailDto;
import edu.ijse.todo.entity.UserEntity;
import edu.ijse.todo.entity.UserLoginDetailEntity;
import edu.ijse.todo.service.UserLoginDetailService;
import edu.ijse.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "*")
public class UserLoginDetailController {
    @Autowired
    UserLoginDetailService userLoginDetailService;

    @Autowired
    UserService userService;

    @GetMapping("/lastUserId")
    public int getLastUser(){
        return userLoginDetailService.getLastLoginUserId();

    }

    @PostMapping("/UserLoginDetail")
    public ResponseEntity<UserLoginDetailEntity> saveNewLogin(@RequestBody UserLoginDetailDto  dto){
        UserLoginDetailEntity ety=new UserLoginDetailEntity();
        ety.setDateTime(LocalDateTime.now());
        UserEntity userEntity=userService.getUserByUserId(dto.getUserID());
        ety.setLoginuser(userEntity);

       UserLoginDetailEntity entity= userLoginDetailService.saveNewLogin(ety);
       return entity==null?ResponseEntity.status(404).body(null):ResponseEntity.status(200).body(entity);
    }
}
