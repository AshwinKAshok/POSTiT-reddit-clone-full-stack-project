package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Post;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.CollectionRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PersonRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CollectionService {

  @Autowired
  CollectionRepository collectionRepository;

  @Autowired
  PostRepository postRepository;

  @Autowired
  PersonRepository personRepository;

  public Collection createCollection(Collection collection) {
    return collectionRepository.save(collection);
  }

  public Collection updateCollection(Collection collection) {
    return collectionRepository.save(collection);
  }

  public Integer addPostToCollection(Integer postId, Integer collectionId) {
    Optional<Post> postOptional = postRepository.findById(postId);
    Optional<Collection> collectionOptional = collectionRepository.findById(collectionId);

    if (postOptional.isPresent() && collectionOptional.isPresent()) {

      Post post = postOptional.get();
      Collection collection = collectionOptional.get();

      post.setCollection(collection);

      postRepository.save(post);
      return 1;

    } else {
      return 0;
    }
  }

  public Integer removePostFromCollection(Integer postId) {
    Optional<Post> postOptional = postRepository.findById(postId);
    if(postOptional.isPresent()) {
      Post post = postOptional.get();
      post.setCollection(null);
      postRepository.save(post);
      return 1;
    } else {
      return 0;
    }
  }

  public Collection findCollectionById(Integer collectionId) {
    return collectionRepository.findById(collectionId).get();
  }

  public List<Collection> getAllCollections() {
    return (List<Collection>) collectionRepository.findAll();
  }

//  public List<Collection> findCollectionsOfPerson(Integer personId) {
//    return collectionRepository.findCollectionsOfPerson(personId);
//  }

  public List<Person> findAuthorisedPersonsOfCollection(Integer collectionId) {
    return collectionRepository.findAuthorisedPersonsOfCollection(collectionId);
  }

  public int deleteCollectionById(Integer collectionId) {
    collectionRepository.deleteById(collectionId);

    //check if delete successful.
    //return null shows that the collection no longer exists, hence deletion successful.
    if (collectionRepository.findById(collectionId).isPresent()) {
      return 0;
    } else {
      return 1;
    }
  }


  public Collection updateCollection(Integer collectionId, Collection newCollectionData) {
    Optional<Collection> collectionToBeUpdatedOptional = collectionRepository.findById(collectionId);

    if(collectionToBeUpdatedOptional.isPresent()) {
      Collection collectionToBeUpdated = collectionToBeUpdatedOptional.get();

      if(newCollectionData.getCollection_name() != null)
        collectionToBeUpdated.setCollection_name(newCollectionData.getCollection_name());

      if(newCollectionData.getCollection_description() != null)
        collectionToBeUpdated.setCollection_description(newCollectionData.getCollection_description());

      return collectionRepository.save(collectionToBeUpdated);

    } else {
      return null;
    }

  }

}
