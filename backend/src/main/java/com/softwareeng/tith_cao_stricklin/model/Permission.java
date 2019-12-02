package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
//
//@Entity
//@Table(name = "Permission")
@Document(collection = "Permissions")
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@JsonIgnoreProperties
@Data
public class Permission {

  @Id
  ObjectId _id;

  @NonNull
  String linkPurpose;

  @NonNull
  String link;

//  @ManyToOne
//  @JoinColumn(name = "Role_Permissions", nullable = false)
//  private Role role;

  public String get_id() { return _id.toHexString(); }
  public void set_id(ObjectId _id) { this._id = _id; }
}
