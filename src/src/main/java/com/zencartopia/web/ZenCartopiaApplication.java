package com.zencartopia.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ZenCartopiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZenCartopiaApplication.class, args);
	}

}
