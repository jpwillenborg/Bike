package com.jpwillenborg.bike.controller;

import com.jpwillenborg.bike.dto.TuningRequest;
import com.jpwillenborg.bike.model.Bike;
import com.jpwillenborg.bike.repository.BikeRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tuner")
public class TunerController {

    private final BikeRepository bikeRepository;

    public TunerController(BikeRepository bikeRepository) {
        this.bikeRepository = bikeRepository;
    }

    @PostMapping("/calculate")
    public ResponseEntity<Bike> calculateDiagnostics(@Valid @RequestBody TuningRequest request) {
        Bike bike = new Bike();
        bike.setName(request.getName());
        bike.setWeight(request.getWeight());
        bike.setRidingStyle(request.getRidingStyle());
        bike.setForkType(request.getForkType());
        bike.setShockType(request.getShockType());

        double weightFactor = request.getWeight();
        long calculatedForkPsi = Math.round(weightFactor * 0.45);
        long calculatedShockPsi = Math.round(weightFactor * 1.25);

        if ("aggressive".equalsIgnoreCase(request.getRidingStyle())) {
            calculatedForkPsi += 8;
            calculatedShockPsi += 15;
            bike.setReboundClicks(5);
            bike.setHscClicks(4);
            bike.setLscClicks(6);
        } else if ("casual".equalsIgnoreCase(request.getRidingStyle())) {
            calculatedForkPsi -= 5;
            calculatedShockPsi -= 10;
            bike.setReboundClicks(9);
            bike.setHscClicks(12);
            bike.setLscClicks(14);
        } else {
            bike.setReboundClicks(7);
            bike.setHscClicks(8);
            bike.setLscClicks(10);
        }

        if ("fox38".equalsIgnoreCase(request.getForkType()) || "zeb".equalsIgnoreCase(request.getForkType())) {
            calculatedForkPsi += 5;
        }

        bike.setForkPsi(calculatedForkPsi);
        bike.setShockPsi(calculatedShockPsi);

        Bike savedBike = bikeRepository.save(bike);
        return ResponseEntity.ok(savedBike);
    }

    @GetMapping("/bikes")
    public ResponseEntity<List<Bike>> getAllBikes() {
        return ResponseEntity.ok(bikeRepository.findAll());
    }

    @DeleteMapping("/bikes/{id}")
    public ResponseEntity<Void> deleteBike(@PathVariable Long id) {
        if (!bikeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bikeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
