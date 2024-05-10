package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.eventtracker.entities.City;
import com.skilldistillery.eventtracker.entities.CityLocation;

public interface CityRepository extends JpaRepository<City, Integer> {

	List<City> findCityByPopulationGreaterThan(int population);

	List<City> findCityByPopulationLessThan(int population);

	List<City> findCityByPopulationBetween(int low, int high);

	List<City> findCityByTimezoneLike(String timezone);

	List<City> findCityByZipsContaining(String zip);

	@Query("SELECT DISTINCT c.state FROM City c order by c.state asc")
	List<String> findDistinctState();

	List<City> findCityByStateOrderByCityAsc(String state);

	@Query("SELECT cl FROM CityLocation cl WHERE cl.city LIKE %:search% ORDER BY cl.city ASC")
	List<CityLocation> findAllCityLocationLatLng(@Param("search") String search);

	// select average population from city group by state
	@Query("SELECT c.state, avg(c.population) FROM City c GROUP BY c.state")
	List<Object[]> findAvgPopulationByState();

	// select sum of population from city group by state
	@Query("SELECT c.state, sum(c.population) FROM City c GROUP BY c.state")
	List<Object[]> findSumPopulationByState();

	// count of cities in each state
	@Query("SELECT c.state, count(c) FROM City c GROUP BY c.state")
	List<Object[]> findCityCountByState();

	// find distance from one city lat/lng to a given lat/lng <- single double value
	@Query(value = "SELECT ( 3959 * acos( cos( radians(:givenLat) ) * cos( radians( c.lat ) ) * cos( radians( c.lng ) - radians(:givenLng) ) + sin( radians(:givenLat) ) * sin( radians( c.lat ) ) ) ) AS distance FROM City c WHERE c.id = :cityId", nativeQuery = true)
	Double findCityDistance(@Param("cityId") int cityId, @Param("givenLat") double givenLat,
			@Param("givenLng") double givenLng);

	@Query(value = "SELECT c.id, c.city, c.state_name, ( 3959 * acos( cos( radians(:givenLat) ) * cos( radians( c.lat ) ) * cos( radians( c.lng ) - radians(:givenLng) ) + sin( radians(:givenLat) ) * sin( radians( c.lat ) ) ) ) AS distance FROM City c HAVING distance <= :howFar ORDER BY distance", nativeQuery = true)
	List<Object[]> findCityDistances(@Param("givenLat") double givenLat, @Param("givenLng") double givenLng,
			@Param("howFar") double howFar);

	@Query("SELECT e FROM City e WHERE e.id IN :ids")
	List<City> findAllCityInIdList(@Param("ids") List<Long> ids);

}
