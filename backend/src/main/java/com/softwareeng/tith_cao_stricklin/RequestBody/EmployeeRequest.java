package com.softwareeng.tith_cao_stricklin.RequestBody;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EmployeeRequest {
  String email, password, firstName, lastName;
}
