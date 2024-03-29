package edu.ijse.todo.service.impl;

import edu.ijse.todo.entity.UserLoginDetailEntity;
import edu.ijse.todo.repository.UserLoginDetailRepository;
import edu.ijse.todo.service.UserLoginDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLoginDetailServiceImpl implements UserLoginDetailService {
    @Autowired
    UserLoginDetailRepository userLoginDetailRepository;
    @Override
    public UserLoginDetailEntity saveNewLogin(UserLoginDetailEntity ety) {
       return userLoginDetailRepository.save(ety);
    }

    @Override
    public int getLastLoginUserId() {
       int loginDetailId =userLoginDetailRepository.getLatestLoginUserDetailID();
      UserLoginDetailEntity userLoginDetailEntity= userLoginDetailRepository.findById(loginDetailId).orElse(null);
      return userLoginDetailEntity==null?-1:userLoginDetailEntity.getLoginuser().getUserId();
    }
}
