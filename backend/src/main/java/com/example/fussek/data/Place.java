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

    private String countryCode;

    private String[] thumbnails;

    private Boolean visited;

    public Place() {
        super();
    }

    public Place(String name, String fullName, String latitude, String longitude, String countryCode, String[] thumbnails, Boolean visited) {
        this.name = name;
        this.fullName = fullName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.countryCode = countryCode;
        this.thumbnails = thumbnails;
        this.visited = visited;
    }

//    todo: those getters are not used

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

    public String getCountryCode() { return countryCode; }

    public String[] getThumbnails() { return thumbnails; }

    public Boolean getVisited() { return visited; }

}
