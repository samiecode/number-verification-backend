package com.samieteq.numberverficationapi;

import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class NumberService {
    private final String NUM_VERIFY_API_URL = "https://api.apilayer.com/number_verification/validate?number=";
    private final String NAME = "apikey";
    private final String KEY = "MvRuCJUIQtYFXLiy75TyQFKjGt8xTfJS";
    public ResponseEntity<String> validate(String number) {
        try{
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .readTimeout(30, TimeUnit.SECONDS)
                    .writeTimeout(30, TimeUnit.SECONDS)
                    .build();


            Request request = new Request.Builder()
                    .url(NUM_VERIFY_API_URL + number)
                    .addHeader(NAME ,KEY)
                    .build();
            Response response = client.newCall(request).execute();
            return ResponseEntity.ok().body(response.body().string());
        }catch(IOException e){
            return new ResponseEntity<>("Something went wrong!", HttpStatus.BAD_REQUEST);
        }
    }
}
