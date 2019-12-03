package com.softwareeng.tith_cao_stricklin.repository;

import com.softwareeng.tith_cao_stricklin.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Integer> {
  Optional<Employee> findByEmail(String email);
  void deleteByEmail(String email);
}
