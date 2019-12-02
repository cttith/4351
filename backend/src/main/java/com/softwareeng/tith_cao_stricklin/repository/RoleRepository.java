package com.softwareeng.tith_cao_stricklin.repository;

import com.softwareeng.tith_cao_stricklin.model.Role;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, Integer> {

  Role findBy_id(ObjectId _id);
  Role findByType(String type);
}
