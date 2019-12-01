package com.softwareeng.tith_cao_stricklin.controller;


import com.softwareeng.tith_cao_stricklin.model.Employee;
import com.softwareeng.tith_cao_stricklin.model.Permission;
import com.softwareeng.tith_cao_stricklin.model.Role;
import com.softwareeng.tith_cao_stricklin.repository.EmployeeRepository;
import com.softwareeng.tith_cao_stricklin.repository.RoleRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class HomeController {

  @Autowired
  EmployeeRepository employeeRepository;

  @Autowired
  RoleRepository roleRepository;

  /*
  Create a user of {category_type} (Global, Sales, HR, Engineering, Finance), every user has access to Global
   */
  @GetMapping(value = "/createEmployee/{category_type}")
  public String home(@PathVariable(name = "category_type") String categoryType){
    ObjectId newID = new ObjectId();
    List<String> roles = Arrays.asList("Global", categoryType);
    employeeRepository.insert(new Employee(newID, "christian@yahoo.com", "password", "Christian", "Tith", "SWE", roles));
    return "creating new employee with ID: " + newID.toHexString();
  }

  @GetMapping(value = "/allEmployees")
  public List<Employee> employees(){
    return employeeRepository.findAll();
  }

  /*
   Find the links that the current user has access to (not actual link, but purpose of link)
   @params:
    RequestBody
      JSON {
        email:
      }
      1.) we can query employees for email and retrieve list of roles
      2.) listOfRoles.forEach (ADMIN, FINANCE_ADMIN....)
       2a.) each role contains x amount of links via permissions (Manage User Accounts, .....)

   */
  @GetMapping(value = "/permissions/{category_type}")
  public List<String> permissions(@PathVariable(name = "category_type")String categoryType){
    return roleRepository.findByType(categoryType).getPermissions();
  }
  

}
