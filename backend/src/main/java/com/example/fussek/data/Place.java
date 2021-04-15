package com.example.fussek.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

public class Place {

    @Id
    private String id;

    private String name;

    private String fullName;

    private String latitude;

    private String longitude;

    private Boolean visited;

    public Place() {
        super();
    }

    public Place(String name, String fullName, String latitude, String longitude, Boolean visited) {
        this.name = name;
        this.fullName = fullName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.visited = visited;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFullName() {
        return fullName;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public Boolean getVisited() { return visited; }

}
