package edu.ijse.todo.controller;

import edu.ijse.todo.dto.TaskDto;
import edu.ijse.todo.entity.TaskEntity;
import edu.ijse.todo.entity.UserEntity;
import edu.ijse.todo.service.TaskService;
import edu.ijse.todo.service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @GetMapping("/task")
    public ResponseEntity<List<TaskEntity>> getAllTasks(){
        List<TaskEntity> entities=taskService.getAllTasks();
        return entities==null?ResponseEntity.status(404).body(null):ResponseEntity.status(200).body(entities);
    }

    @GetMapping("/lastUserId")
    public ResponseEntity

    @PostMapping("/task")
    public ResponseEntity<TaskEntity> saveTask(@RequestBody TaskDto dto){
        TaskEntity entity=new TaskEntity();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setTaskDateTime(LocalDateTime.now());

       UserEntity userEntity= userService.getUserByUserId(dto.getUserId());
       entity.setUser(userEntity);


        TaskEntity getEntity=taskService.saveTask(entity);
        return getEntity==null?ResponseEntity.status(404).body(null):ResponseEntity.status(200).body(getEntity);

    }

    @PutMapping("/task/{id}")
    public ResponseEntity<TaskEntity> updateTask(@RequestBody TaskDto dto, @PathVariable int id){
        TaskEntity taskEntity=new TaskEntity();
        taskEntity.setTitle(dto.getTitle());
        taskEntity.setDescription(dto.getDescription());
        taskEntity.setTaskDateTime(LocalDateTime.now());
        TaskEntity entity=taskService.updateTask(id,taskEntity);

        return entity==null?ResponseEntity.status(404).body(null):ResponseEntity.status(200).body(entity);
    }

}
