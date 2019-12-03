package com.softwareeng.tith_cao_stricklin.RequestBody;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class EmployeeRoleChangeRequest {
  String email;
  List<String> employeeRoles;
}
