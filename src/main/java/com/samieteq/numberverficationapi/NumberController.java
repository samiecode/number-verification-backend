package com.samieteq.numberverficationapi;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/validate-number")
@CrossOrigin(origins= "http://localhost:5173")
public class NumberController {

    private final NumberService numberService;

    @PostMapping
    public ResponseEntity<String> numVerify(@RequestBody NumberRequest number) throws IOException {
        return numberService.validate(number.number());

    }
}
