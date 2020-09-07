package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.controllers;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.CollectionMembership;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.CollectionMembershipService;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.CollectionService;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CollectionController {

  @Autowired
  CollectionService collectionService;

  @Autowired
  CollectionMembershipService collectionMembershipService;

  @Autowired
  PersonService personService;

  @GetMapping("/api/collection")
  public List<Collection> getAllCollections() {
    return collectionService.getAllCollections();
  }

  @GetMapping("/api/nonAuth/collection")
  public List<Collection> getAllCollectionsNonAuth() {
    return collectionService.getAllCollections();
  }

  @GetMapping("/api/collection/{collectionId}")
  public Collection findCollectionById(@PathVariable("collectionId") Integer collectionId) {
    return collectionService.findCollectionById(collectionId);
  }

  @GetMapping("/api/nonAuth/collection/{collectionId}")
  public Collection findCollectionByIdNonAuth(@PathVariable("collectionId") Integer collectionId) {
    return collectionService.findCollectionById(collectionId);
  }

  @PostMapping("/api/person/{personId}/collection")
  public Collection createCollection(@PathVariable("personId") Integer personId, @RequestBody Collection collection) {
    Collection col = collectionService.createCollection(collection);
    System.out.println(col);

    CollectionMembership mem = new CollectionMembership();
    mem.setCollection(col);
    mem.setPersonId(personId);
    mem.setRole("admin");

    System.out.println(mem);

    mem = collectionMembershipService.createCollectionMembership(mem, personId, col.getId());
    List<CollectionMembership> mems = new ArrayList<CollectionMembership>();
    mems.add(mem);

    System.out.println(mems);

    col.setCollectionMemberships(mems);

    return collectionService.updateCollection(col);
  }

  @PostMapping("/api/collectionMembership/person/{personId}/collection/{collectionId}")
  public CollectionMembership createCollectionMembership(@PathVariable("personId") Integer personId, @PathVariable("collectionId")
          Integer collectionId) {

    CollectionMembership mem = new CollectionMembership();
    return collectionMembershipService.createCollectionMembership(mem,personId, collectionId);
  }

  @GetMapping("/api/collection/{collectionId}/person")
  public List<Person> findAuthorizedPersonOfCollection(@PathVariable("collectionId") Integer collectionId) {
    return collectionService.findAuthorisedPersonsOfCollection(collectionId);
  }

  // get list of collections of user having membership.
  @GetMapping("/api/person/{personId}/collections")
  public List<Collection> findCollectionsOfPerson(@PathVariable("personId") Integer personId) {
    return personService.findCollectionOfPerson(personId);
  }

  @PostMapping("/api/connect/post/{postId}/collection/{collectionId}")
  public Integer addPostToCollection(@PathVariable("postId") Integer postId, @PathVariable("collectionId") Integer collectionId) {
    return collectionService.addPostToCollection(postId, collectionId);
  }

  @DeleteMapping("/api/remove/post/{postId}/collection/{collectionId}")
  public Integer removePostFromCollection(@PathVariable("postId") Integer postId, @PathVariable("collectionId") Integer collectionId) {
    return collectionService.removePostFromCollection(postId);
  }

  @DeleteMapping("/api/remove/person/{personId}/collection/{collectionId}")
  public Integer removeUserFromCollection(@PathVariable("personId") Integer personId, @PathVariable("collectionId") Integer collectionId) {
    return collectionMembershipService.deleteCollectionMembership(personId, collectionId);
  }

  //Update collection
  @PutMapping("/api/collection/{collectionId}")
  public Collection updateCollection(@RequestBody Collection collection, @PathVariable("collectionId") Integer collectionId) {
    return collectionService.updateCollection(collectionId, collection);
  }

  //delete collection
  @DeleteMapping("/api/collection/{collectionId}")
  public Integer deleteCollection(@PathVariable("collectionId") Integer collectionId) {
    return collectionService.deleteCollectionById(collectionId);
  }

}
