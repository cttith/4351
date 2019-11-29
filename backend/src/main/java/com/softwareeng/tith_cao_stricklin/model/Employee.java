package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Employee")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
public class Employee {

  @Id
  int ID;

  @Column
  String firstName;

  @Column
  String lastName;

  @Column
  String title;
}
