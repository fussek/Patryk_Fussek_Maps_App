package com.example.fussek.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

public class Place {

    @Id
    private String id;

    private String name;

//    private Boolean visited;

    public Place() {
        super();
    }

    public Place(String name
//                 Boolean visited
    ) {
        this.name = name;
//        this.visited = visited;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

//    public Boolean getVisited() {
//        return visited;
//    }

}
