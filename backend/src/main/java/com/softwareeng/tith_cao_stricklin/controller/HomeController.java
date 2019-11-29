package com.softwareeng.tith_cao_stricklin.controller;


import com.softwareeng.tith_cao_stricklin.model.Employee;
import com.softwareeng.tith_cao_stricklin.model.Role;
import com.softwareeng.tith_cao_stricklin.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class HomeController {

  @Autowired
  EmployeeRepository employeeRepository;

  @GetMapping(value = "/home")
  public String home(){
    employeeRepository.insert(new Employee(1, "Christian", "Tith", "SWE"));
    return "/home";
  }
  

}
