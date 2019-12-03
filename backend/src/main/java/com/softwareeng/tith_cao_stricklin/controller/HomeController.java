package com.softwareeng.tith_cao_stricklin.controller;


import com.softwareeng.tith_cao_stricklin.RequestBody.EmployeeRequest;
import com.softwareeng.tith_cao_stricklin.RequestBody.EmployeeRoleChangeRequest;
import com.softwareeng.tith_cao_stricklin.RequestBody.Login;
import com.softwareeng.tith_cao_stricklin.model.Employee;
import com.softwareeng.tith_cao_stricklin.model.Permission;
import com.softwareeng.tith_cao_stricklin.model.Role;
import com.softwareeng.tith_cao_stricklin.repository.EmployeeRepository;
import com.softwareeng.tith_cao_stricklin.repository.PermissionRepository;
import com.softwareeng.tith_cao_stricklin.repository.RoleRepository;
import com.softwareeng.tith_cao_stricklin.service.EmployeeService;
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

  @Autowired
  PermissionRepository permissionRepository;

  /*
  Create a user of {category_type} (Global, Sales, HR, Engineering, Finance), every user has access to Global
   */
  @GetMapping(value = "/createEmployee/{category_type}")
  public String home(@PathVariable(name = "category_type") String categoryType){
    ObjectId newID = new ObjectId();
    List<String> roles;
    if (!categoryType.equals("ADMIN")) {
      roles = Arrays.asList("ADMIN", categoryType);
    }else{
      roles = Arrays.asList("ADMIN");
    }
    employeeRepository.insert(new Employee(newID, "christian@yahoo.com", "password", "Christian", "Tith", "SWE", roles));
    return "creating new employee with ID: " + newID.toHexString();
  }

  @PostMapping(value = "/create/employee")
  public Integer createEmployee(@RequestBody EmployeeRequest newEmployee){
    System.out.println("new email = " + newEmployee.getEmail());
    if (employeeRepository.findByEmail(newEmployee.getEmail()).isPresent()) return -1;
    Employee employee = new Employee(new ObjectId(), newEmployee.getEmail(), newEmployee.getPassword(), newEmployee.getFirstName(), newEmployee.getLastName(), "", new ArrayList<>());
    employeeRepository.save(employee);
    return 1;
  }

  @GetMapping(value = "/allEmployees")
  public List<Employee> employees(){
    return employeeRepository.findAll();
  }

  @PostMapping(value = "/authenticate")
  public Integer login(@RequestBody Login credentials){
    System.out.println("calling fxn");
    Optional<Employee> employee = employeeRepository.findByEmail(credentials.email);

    if (!employee.isPresent()) return -2;

    System.out.println("email: " + credentials.email);
    System.out.println("password: " + credentials.password);
    if (employee.get().getPassword().equals(credentials.password)){
      if (employee.get().getEmail().equals("Admin")) return 201;
      return 200;
    }
    return -1;
  }

  @GetMapping(value = "/remove/{email}")
  public Integer removeUser(@PathVariable("email")String email){
    employeeRepository.deleteByEmail(email);
    return 200;
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

   Returns:
    List of link names
   */
  @GetMapping(value = "/permissions/{email}")
  public List<String> permissions(@PathVariable(name = "email")String email){
    Optional<Employee> optionalEmployee = employeeRepository.findByEmail(email.substring(1,email.length()-1));
    Employee employee = optionalEmployee.get();
    EmployeeService employeeService = new EmployeeService(employee);
    List<String> roles = employeeService.returnRoles();

    List<String> linkPurposes = new ArrayList<>();
    for(String role : roles) {
      System.out.println("role = " + role);
      linkPurposes.addAll(roleRepository.findByType(role).getPermissions());
    }

    return linkPurposes;
  }



  /*
  retrieve actual link for user
  @params:
  RequestBody
    JSON {
      email:
    }

    - similar to above, but return link(s).
    Returns:
      for now it will return links assigned to one role, but in the future a user may have more than one role
   */
  @GetMapping(value = "/links/{role_type}")
  public List<String> links(@PathVariable(name = "role_type")String roleType){
    Role role = roleRepository.findByType(roleType);
    List<String> links = new ArrayList<>();
    for(String permission : role.getPermissions()) {
      String link = permissionRepository.findBylinkPurpose(permission).getLink();
      links.add(link);
    }

    return links;

  }

  @PostMapping(value = "/employee/modify/roles")
  public Integer modifyRoles(@RequestBody EmployeeRoleChangeRequest employeeRoleChangeRequest){

    Optional<Employee> optionalEmployee = employeeRepository.findByEmail(employeeRoleChangeRequest.getEmail());
    if(!optionalEmployee.isPresent()) {
      System.out.println("cant find employee");
      return -1;
    }
    Employee employee = optionalEmployee.get();


    employee.setEmployeeRoles(employeeRoleChangeRequest.getEmployeeRoles());

    employeeRepository.save(employee);
    System.out.println("Complete modify");
    return 1;




  }
  

}
