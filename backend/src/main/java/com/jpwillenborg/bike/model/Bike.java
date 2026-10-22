package com.jpwillenborg.bike.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bikes")
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double weight;
    private String ridingStyle;
    private String forkType;
    private String shockType;
    private long forkPsi;
    private long shockPsi;
    private int reboundClicks;
    private int hscClicks;
    private int lscClicks;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }

    public String getRidingStyle() { return ridingStyle; }
    public void setRidingStyle(String ridingStyle) { this.ridingStyle = ridingStyle; }

    public String getForkType() { return forkType; }
    public void setForkType(String forkType) { this.forkType = forkType; }

    public String getShockType() { return shockType; }
    public void setShockType(String shockType) { this.shockType = shockType; }

    public long getForkPsi() { return forkPsi; }
    public void setForkPsi(long forkPsi) { this.forkPsi = forkPsi; }

    public long getShockPsi() { return shockPsi; }
    public void setShockPsi(long shockPsi) { this.shockPsi = shockPsi; }

    public int getReboundClicks() { return reboundClicks; }
    public void setReboundClicks(int reboundClicks) { this.reboundClicks = reboundClicks; }

    public int getHscClicks() { return hscClicks; }
    public void setHscClicks(int hscClicks) { this.hscClicks = hscClicks; }

    public int getLscClicks() { return lscClicks; }
    public void setLscClicks(int lscClicks) { this.lscClicks = lscClicks; }
}
