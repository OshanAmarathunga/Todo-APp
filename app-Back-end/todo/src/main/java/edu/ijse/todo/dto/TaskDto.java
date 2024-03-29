package edu.ijse.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {

    private String title;
    private String description;
    private int userId;
}
