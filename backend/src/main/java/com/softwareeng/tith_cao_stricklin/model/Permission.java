package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Permission")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
public class Permission {

  @Id
  String linkPurpose;

  @Column
  String link;

  @ManyToOne
  @JoinColumn(name = "Role_Permissions", nullable = false)
  private Role role;
}
