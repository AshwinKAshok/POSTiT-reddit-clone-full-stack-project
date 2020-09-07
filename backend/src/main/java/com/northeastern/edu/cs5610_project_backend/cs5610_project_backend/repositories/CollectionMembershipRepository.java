package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.CollectionMembership;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


public interface CollectionMembershipRepository extends CrudRepository<CollectionMembership, Integer> {

  @Transactional
  @Modifying
  @Query("DELETE FROM CollectionMembership collectionMembership WHERE collectionMembership.collectionId =:colId AND " +
          "collectionMembership.personId=:pId")
  public void deletePersonMembership(@Param("colId") Integer colId, @Param("pId") Integer pId);

  @Query("SELECT collectionMembership FROM CollectionMembership collectionMembership WHERE " +
          "collectionMembership.collectionId =:colId AND " +
          "collectionMembership.personId =:pId")
  public CollectionMembership findCollectionMembershipById(@Param("colId") Integer colId, @Param("pId") Integer pId);
}
