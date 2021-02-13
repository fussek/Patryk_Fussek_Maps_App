package com.example.fussek.repository;

import com.example.fussek.data.ToDo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ToDoRepository extends MongoRepository<ToDo, String> {}