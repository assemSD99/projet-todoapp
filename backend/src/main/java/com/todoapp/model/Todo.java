package com.todoapp.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "todos")
@TypeAlias("Todo")
public class Todo {
    @Id
    private String id;

    private String title;
    private String description;
    private boolean completed;
}