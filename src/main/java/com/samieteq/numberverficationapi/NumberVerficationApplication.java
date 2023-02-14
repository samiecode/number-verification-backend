package com.samieteq.numberverficationapi;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.net.Socket;

@SpringBootApplication
public class NumberVerficationApplication {

	public static void main(String[] args) {
		SpringApplication.run(NumberVerficationApplication.class, args);
	}


}
