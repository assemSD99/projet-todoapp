package com.todoapp.service;

import com.todoapp.model.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(String id) {
        return todoRepository.findById(id);
    }

    public Todo saveOrUpdate(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteById(String id) {
        todoRepository.deleteById(id);
    }
}
