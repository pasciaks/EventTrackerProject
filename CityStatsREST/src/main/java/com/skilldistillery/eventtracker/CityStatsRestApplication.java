package com.skilldistillery.eventtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CityStatsRestApplication {

	public static void main(String[] args) {

		try {
			SpringApplication.run(CityStatsRestApplication.class, args);
		} catch (Exception e) {

			System.out.println("---------------------------------------------------------------");
			System.out.println("---------------------------------------------------------------");
			System.out.println("------[ check that the MySQL server / MAMP is running ]--------");
			System.out.println("---------------------------------------------------------------");
			System.out.println("---------------------------------------------------------------");
		}
	}

}
