package com.softwareeng.tith_cao_stricklin.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
import java.util.List;

//@Entity
//@Table(name = "Role")
@Document(collection = "Role")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties
@Data
public class Role {

  @Id
  @NonNull
  ObjectId _id;

  @NonNull
  String type;

  @NonNull
  List<String> permissions;

  public String get_id() { return _id.toHexString(); }
  public void set_id(ObjectId _id) { this._id = _id; }


}
