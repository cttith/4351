package com.softwareeng.tith_cao_stricklin.configuration;

import com.mongodb.MongoClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.softwareeng.tith_cao_stricklin")
public class MongoConfig extends AbstractMongoConfiguration {
  @Override
  protected String getDatabaseName() {
    return "employee";
  }

  @Override
  public MongoClient mongoClient() {
    return new MongoClient("localhost", 27017);
  }

}
