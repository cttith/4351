package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Employees")
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
@Data
public class Employee {

  @Id
  @NonNull
  int ID;

  @NonNull
  String firstName;

  @NonNull
  String lastName;

  @NonNull
  String title;

  List<Role> employeeRoles;
}
