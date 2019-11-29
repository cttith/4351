package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "EmployeeCredentials")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
public class Employee_Credentials {

  @Id
  int ID;

  @Column
  String firstName;

  @Column
  String lastName;

  @Column
  String email;

  @Column
  String password;

}
