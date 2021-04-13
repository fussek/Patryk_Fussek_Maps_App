package com.example.fussek.service;
import com.example.fussek.data.Place;
import com.example.fussek.exception.EntityNotFoundException;
import com.example.fussek.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public List<Place> findAll(){
        return placeRepository.findAll();
    }

    public Place findById(String id){
        return placeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Place save(Place place){
        return placeRepository.save(place);
    }

    public void deleteById(String id){
        placeRepository.deleteById(id);
    }

}
