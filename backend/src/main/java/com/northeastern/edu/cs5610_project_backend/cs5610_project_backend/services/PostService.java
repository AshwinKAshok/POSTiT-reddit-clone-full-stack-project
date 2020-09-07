package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services;


import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Post;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PostService {

  @Autowired
  PostRepository postRepository;

  @Autowired
  PersonService personService;

  @Autowired
  CollectionService collectionService;

  public Post findPostById(String postId) {

    try
    {
      // the String to int conversion happens here
      Integer pid = Integer.parseInt(postId.trim());
      Optional<Post> postOptional  = postRepository.findById(pid);

      if(postOptional.isPresent()) {
        System.out.println("inside first if");
        return postOptional.get();
      } else {
        return null;
      }

    }
    catch (NumberFormatException nfe)
    {
      System.out.println("NumberFormatException found. Cannot convert postId to integer. Checking for reddit id");
    }

    Post post = postRepository.findPostByRedditId(postId);
    if(post == null) {
      return new Post();
    } else {
      return post;
    }
  }

  public List<Post> findAllPosts() {
    return (List<Post>) postRepository.findAll();
  }

  public List<Post> findPostsByPersonId(Integer personId) {
    return postRepository.findPostsByPersonId(personId);
  }

//  public PostResponseById findPostWithPersonId(Integer postId) {
//    return postRepository.findPostByIdWithPersonId(postId);
//  }

  public Integer findAuthorByPostId(Integer postId) {
    return postRepository.findAuthorByPostId(postId);
  }

  public List<Post> findPostByCollectionId(Integer collectionId) {
    return postRepository.findPostsByCollectionId(collectionId);
  }

  public Post createPersonalPost(Post post, Integer personId) {
    Person person = personService.findPersonById(personId);
    post.setPerson(person);
    return postRepository.save(post);
  }

  public Post createCollectionPost(Post post, Integer personId, Integer collectionId) {
    Person person = personService.findPersonById(personId);
    Collection collection = collectionService.findCollectionById(collectionId);

    post.setPerson(person);
    post.setCollection(collection);

    return postRepository.save(post);
  }

  public Integer deletePostById(Integer postId) {
    //deleting the post.
    postRepository.deleteById(postId);

    //Checking if the post deleted successfully by try to retrieve the post.
    if(postRepository.findById(postId).isPresent()) {
      return 1;
    } else {
      return 0;
    }
  }

  public Post updatePost(Post updatedPost, Integer postId) {
    Post postToBeUpdated = postRepository.findById(postId).get();
    postToBeUpdated.setPost(updatedPost.getPost());
    postToBeUpdated.setLikes(updatedPost.getLikes());
    return postRepository.save(postToBeUpdated);

  }
}
