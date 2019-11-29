package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
import java.util.List;

//@Entity
//@Table(name = "Role")
@Document
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
public class Role {

  @Id
  int ID;

  @NonNull
  String type;

//  @OneToMany(mappedBy = "Role")
  List<Permission> permissions;

//  @ManyToOne
//  @JoinColumn(name = "Employee_Role", nullable = false)
  Employee employee;



}
