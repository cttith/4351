package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
//
//@Entity
//@Table(name = "Permission")
@Document
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
public class Permission {

  @Id
  String linkPurpose;

  @NonNull
  String link;

//  @ManyToOne
//  @JoinColumn(name = "Role_Permissions", nullable = false)
  private Role role;
}
