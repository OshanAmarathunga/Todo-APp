package edu.ijse.todo.service;

import edu.ijse.todo.entity.TaskEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    TaskEntity saveTask(TaskEntity entity);
    TaskEntity updateTask(int id,TaskEntity entity);

    void deleteTask(int id);
    List<TaskEntity> getAllTasks();



}
