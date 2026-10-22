package com.jpwillenborg.bike.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TuningRequest {

    @NotBlank(message = "Please provide your bike brand chassis.")
    private String name;

    @NotNull(message = "Rider weight is required.")
    @Min(value = 1, message = "Weight must be a positive number.")
    private Double weight;

    @NotBlank(message = "Terrain style configuration is required.")
    private String ridingStyle;

    @NotBlank(message = "Front fork model is required.")
    private String forkType;

    @NotBlank(message = "Rear shock type is required.")
    private String shockType;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getRidingStyle() { return ridingStyle; }
    public void setRidingStyle(String ridingStyle) { this.ridingStyle = ridingStyle; }

    public String getForkType() { return forkType; }
    public void setForkType(String forkType) { this.forkType = forkType; }

    public String getShockType() { return shockType; }
    public void setShockType(String shockType) { this.shockType = shockType; }
}
