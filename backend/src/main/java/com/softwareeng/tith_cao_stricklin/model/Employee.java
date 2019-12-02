package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "Employees")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
@Data
public class Employee {

  @Id
  @NonNull
  ObjectId _id;

  @NonNull
  String email;

  @NonNull
  String password;

  @NonNull
  String firstName;

  @NonNull
  String lastName;

  @NonNull
  String title;

  @NonNull
  @Field("employeeRoles")
  // String for Role.type
  List<String> employeeRoles;

  public String get_id() { return _id.toHexString(); }
  public void set_id(ObjectId _id) { this._id = _id; }
}
