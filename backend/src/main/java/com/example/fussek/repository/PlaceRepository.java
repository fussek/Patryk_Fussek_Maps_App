package com.example.fussek.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.fussek.data.Place;

public interface PlaceRepository extends MongoRepository<Place, String> {}
