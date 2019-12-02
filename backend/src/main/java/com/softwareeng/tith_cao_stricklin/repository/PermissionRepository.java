package com.softwareeng.tith_cao_stricklin.repository;

import com.softwareeng.tith_cao_stricklin.model.Permission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends MongoRepository<Permission, Integer> {

  Permission findBylinkPurpose(String linkPurpose);
}
