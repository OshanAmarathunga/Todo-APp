package edu.ijse.todo.repository;

import edu.ijse.todo.entity.UserLoginDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserLoginDetailRepository extends JpaRepository<UserLoginDetailEntity,Integer> {
    @Query("SELECT MAX(loginDetailId) FROM UserLoginDetailEntity")
    int getLatestLoginUserDetailID();
}
