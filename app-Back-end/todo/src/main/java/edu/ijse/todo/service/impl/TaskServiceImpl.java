package edu.ijse.todo.service.impl;

import edu.ijse.todo.entity.TaskEntity;
import edu.ijse.todo.repository.TaskRepository;
import edu.ijse.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    TaskRepository taskRepository;
    @Override
    public TaskEntity saveTask(TaskEntity entity) {
        return taskRepository.save(entity);
    }

    @Override
    public TaskEntity updateTask(int id, TaskEntity entity) {
        TaskEntity getEntity=taskRepository.findById(id).orElse(null);
        if(getEntity==null){
            return  null;
        }
        getEntity.setTitle(entity.getTitle());
        getEntity.setTaskDateTime(entity.getTaskDateTime());
        getEntity.setDescription(entity.getDescription());

       return taskRepository.save(getEntity);
    }

    @Override
    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<TaskEntity> getAllTasks() {
        return taskRepository.findAll();
    }
}
