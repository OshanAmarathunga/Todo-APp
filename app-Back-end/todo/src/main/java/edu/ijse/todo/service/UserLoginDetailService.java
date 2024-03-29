package edu.ijse.todo.service;

import edu.ijse.todo.entity.UserLoginDetailEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserLoginDetailService {
    UserLoginDetailEntity saveNewLogin(UserLoginDetailEntity ety);
    int getLastLoginUserId();
}
