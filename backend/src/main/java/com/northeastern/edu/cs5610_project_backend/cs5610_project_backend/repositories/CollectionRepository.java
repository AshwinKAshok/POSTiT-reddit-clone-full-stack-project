package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


import java.util.List;


public interface CollectionRepository extends CrudRepository<Collection, Integer> {
//
//  @Query("SELECT collection FROM Collection collection, CollectionMembership collectionMembership WHERE " +
//          "collectionMembership.personId=:prsnId AND collectionMembership.collectionId = collection.id")
//  public List<Collection> findCollectionsOfPerson(@Param("prsnId") Integer personId);

  @Query("SELECT person FROM Person person, CollectionMembership collectionMembership WHERE " +
          "collectionMembership.collectionId=:cid AND collectionMembership.personId = person.id")
  public List<Person> findAuthorisedPersonsOfCollection(@Param("cid") Integer collectionId);
}
