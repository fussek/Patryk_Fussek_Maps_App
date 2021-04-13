package com.example.fussek.controller;

import com.example.fussek.data.Place;
import com.example.fussek.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping
    public List<Place> findAll(){
        return placeService.findAll();
    }

    @GetMapping("/{id}")
    public Place findById(@PathVariable String id){
        return placeService.findById(id);
    }

    @PostMapping
    public Place create(@RequestBody Place place){
        return placeService.save(place);
    }

    @PutMapping("/{id}")
    public Place update(@RequestBody Place place){
        return placeService.save(place);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        placeService.deleteById(id);
    }

}
