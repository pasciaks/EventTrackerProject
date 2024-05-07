package com.skilldistillery.eventtracker.entities;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class City {

	// City [id=1, city=New York, state=New York, county=Queens, lat=40.6943,
	// lng=-73.9249, population=18908608, density=11080.3,
	// timezone=America/New_York, ranking=1, zips=11229 11228 11226 11225 11224
	// 11222 11221 11220 11385 10169 10168 10167 10165 10162 10282 10280 10040 10044
	// 11109 11102 11103 11106 11104 11697 11694 11692 11693 11691 10271 10279 10278
	// 10075 11249 10452 11451 10475 10474 10471 10470 10473 10472 11223 10103 11368
	// 11369 11366 11367 11364 11365 11362 11363 11360 11361 10028 10029 10026 10027
	// 10024 10025 10022 10023 10020 10021 11212 11213 11210 11211 11216 11217 11214
	// 11215 11218 11219 10152 10153 10154 10310 10311 10312 10314 11439 11432 11433
	// 11430 11436 11434 11435 10453 10451 10457 10456 10455 10454 10459 10458 10128
	// 10004 10005 10006 10007 10001 10002 10003 10009 11238 11239 11230 11231 11232
	// 11233 11234 11235 11236 11237 11379 11378 11375 11374 11377 11371 11370 11373
	// 11372 10170 10171 10172 10173 10174 10177 11356 10039 10038 10035 10034 10037
	// 10036 10031 10030 10033 10032 11201 11209 11203 11205 11204 11207 11206 11208
	// 11411 11412 11413 11414 11415 11416 11417 11418 11419 11101 11105 11001 11005
	// 11004 10065 10069 10199 10309 10308 10307 10306 10305 10304 10303 10302 10301
	// 11429 11428 11421 11420 11423 11422 11424 11427 11426 10466 10467 10464 10465
	// 10462 10463 10460 10461 10468 10469 10119 10115 10112 10110 10111 11359 11358
	// 11357 11355 11354 10019 10018 10013 10012 10011 10010 10017 10016 10014 10008
	// 10041 10043 10055 10060 10081 10087 10090 10101 10102 10104 10105 10106 10107
	// 10108 10109 10113 10114 10116 10117 10118 10120 10121 10122 10123 10124 10125
	// 10126 10129 10130 10131 10132 10133 10138 10150 10151 10155 10156 10157 10158
	// 10159 10160 10163 10164 10166 10175 10176 10178 10179 10185 10203 10211 10212
	// 10213 10242 10249 10256 10258 10259 10260 10261 10265 10268 10269 10270 10272
	// 10273 10274 10275 10276 10277 10281 10285 10286 10313 11120 11202 11241 11242
	// 11243 11245 11247 11251 11252 11256 11351 11352 11380 11386 11405 11425 11431
	// 11437 11499 11690 11695]

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "city")
	private String city;

	@Column(name = "state_name")
	private String state;

	@Column(name = "county_name")
	private String county;

	@Column(name = "lat")
	private Double lat;

	@Column(name = "lng")
	private Double lng;

	@Column(name = "population")
	private Long population;

	@Column(name = "density")
	private Double density;

	@Column(name = "timezone")
	private String timezone;

	@Column(name = "ranking")
	private Long ranking;

	@Column(name = "zips")
	private String zips;

	public City() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Long getPopulation() {
		return population;
	}

	public void setPopulation(Long population) {
		this.population = population;
	}

	public Double getDensity() {
		return density;
	}

	public void setDensity(Double density) {
		this.density = density;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public Long getRanking() {
		return ranking;
	}

	public void setRanking(Long ranking) {
		this.ranking = ranking;
	}

	public String getZips() {
		return zips;
	}

	public void setZips(String zips) {
		this.zips = zips;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		City other = (City) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "City [id=" + id + ", city=" + city + ", state=" + state + ", county=" + county + ", lat=" + lat
				+ ", lng=" + lng + ", population=" + population + ", density=" + density + ", timezone=" + timezone
				+ ", ranking=" + ranking + ", zips=" + zips + "]";
	}

}
