package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services;


import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.CollectionMembership;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.CollectionMembershipRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.CollectionRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;


@Service
public class CollectionMembershipService {

  @Autowired
  CollectionMembershipRepository collectionMembershipRepository;

  @Autowired
  PersonRepository personRepository;

  @Autowired
  CollectionRepository collectionRepository;

  public CollectionMembership createCollectionMembership(CollectionMembership collectionMembership,
                                                         Integer personId,
                                                         Integer collectionId) {

    Person person = personRepository.findById(personId).get();
    Collection collection = collectionRepository.findById(collectionId).get();

    collectionMembership.setJoined_date(new Date(System.currentTimeMillis()));
    collectionMembership.setPersonId(person.getId());
    collectionMembership.setCollectionId(collection.getId());
    collectionMembership.setPerson(person);
    collectionMembership.setCollection(collection);

    return collectionMembershipRepository.save(collectionMembership);
  }

  public CollectionMembership findCollectionMembership(Integer personId, Integer collectionID) {
    return collectionMembershipRepository.findCollectionMembershipById(collectionID, personId);
  }

  public Integer deleteCollectionMembership(Integer personId, Integer collectionId) {
    collectionMembershipRepository.deletePersonMembership(collectionId, personId);

    if(collectionMembershipRepository.findCollectionMembershipById(collectionId, personId) == null) {
      return 1;
    } else {
      return 0;
    }
  }
}
