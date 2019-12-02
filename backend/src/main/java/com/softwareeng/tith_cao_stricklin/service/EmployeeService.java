package com.softwareeng.tith_cao_stricklin.service;

import com.softwareeng.tith_cao_stricklin.model.Employee;
import com.softwareeng.tith_cao_stricklin.model.Role;
import com.softwareeng.tith_cao_stricklin.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public class EmployeeService {

  Employee employee;

  @Autowired
  RoleRepository roleRepository;

  public EmployeeService(Employee employee){ this.employee = employee;}

  public List<String> returnRoles(){
    List<String> roles = new ArrayList<>();
    List<String> linkNames = new ArrayList<>();

    for(String category : employee.getEmployeeRoles()) {
      System.out.println("category = " + category);
      roles.add(getRoleFromCategory(category));
    }

    return roles;
  }

  public String getRoleFromCategory(String category){
    switch(category){
      case "Global":
        return "ADMIN";
      case "Finance":
        return "FINANCE_ADMIN";
      case "Sales":
        return "SALES_ADMIN";
      case "HR":
        return "HR_ADMIN";
      case "Engineering":
        return "ENGG_ADMIN";
      default:
        return "";
    }
  }


 /* @GetMapping(value = "/permissions/{role_type}")
  public List<String> permissions(@PathVariable(name = "role_type")String roleType){
    return roleRepository.findByType(roleType).getPermissions();
  }
  */


}
