package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Role")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
public class Role {

  @Id
  int ID;

  @Column
  String type;

  @OneToMany(mappedBy = "Role")
  List<Permission> permissions;

  @ManyToOne
  @JoinColumn(name = "Employee_Role", nullable = false)
  Employee employee;



}
