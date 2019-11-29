package com.softwareeng.tith_cao_stricklin.repository;

import com.softwareeng.tith_cao_stricklin.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Integer> {
}
