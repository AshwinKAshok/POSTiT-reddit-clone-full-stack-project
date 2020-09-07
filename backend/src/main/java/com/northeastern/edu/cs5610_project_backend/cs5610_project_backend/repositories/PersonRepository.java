package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories;


import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface PersonRepository extends CrudRepository<Person, Integer> {

  @Query("SELECT person FROM Person person WHERE person.username=:personName")
  public Person findPersonByName(@Param("personName") String personName);

  @Query("SELECT collection FROM Collection collection, CollectionMembership collectionMembership WHERE " +
          "collectionMembership.personId=:prsnId AND collection.id = collectionMembership.collectionId")
  public List<Collection> findCollectionsOfPerson(@Param("prsnId") Integer personId);

}
