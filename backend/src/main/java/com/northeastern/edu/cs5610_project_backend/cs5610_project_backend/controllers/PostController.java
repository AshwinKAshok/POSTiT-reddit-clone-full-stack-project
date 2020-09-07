package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.controllers;


import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Post;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.CollectionService;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.PersonService;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class PostController {

  @Autowired
  PostService postService;

  @Autowired
  PersonService personService;

  @Autowired
  CollectionService collectionService;

  //get post by id
  @GetMapping("/api/post/{postId}")
  public Post findPostById(@PathVariable("postId") String postId) {
    return postService.findPostById(postId);
  }

  @GetMapping("/api/nonAuth/post/{postId}")
  public Post findPostByIdNonAuth(@PathVariable("postId") String postId) {
    return postService.findPostById(postId);
  }

  //get all posts
  @GetMapping("/api/nonAuth/posts")
  public List<Post> findAllPosts() {
    return postService.findAllPosts();
  }
  //get list of posts of a user
  @GetMapping("/api/person/{personId}/posts")
  public List<Post> findPostByPersonId(@PathVariable("personId") Integer personId) {
    return postService.findPostsByPersonId(personId);
  }

  //get list of posts of a collection
  @GetMapping("/api/collection/{collectionId}/post")
  public List<Post> findPostByCollectionId(@PathVariable("collectionId") Integer collectionId) {
    return postService.findPostByCollectionId(collectionId);
  }

  @PostMapping("/api/person/{personId}/post")
  public Post createPersonalPost(@RequestBody Post post, @PathVariable("personId") Integer personId) {
    //Todo: add validation/check if null is not returned

    return postService.createPersonalPost(post, personId);
  }

  @PostMapping("/api/collection/{collectionId}/person/{personId}/post")
  public Post createCollectionPost(@RequestBody Post post,
                                   @PathVariable("collectionId") Integer collectionId,
                                   @PathVariable("personId") Integer personId) {

    //Todo: add validation/check if null is not returned

    return postService.createCollectionPost(post, personId, collectionId);
  }

  @PutMapping("/api/post/{postId}")
  public Post updatePost(@RequestBody Post updatedPost, @PathVariable("postId") Integer postId) {
    return postService.updatePost(updatedPost, postId);
  }

//  @GetMapping("/api/postWithPerson/{postId}")
//  public PostResponseById findPostByIdWithPersonId(@PathVariable("postId") Integer postId) {
//    return postService.findPostWithPersonId(postId);
//  }

  //Find the author of a post by its postId
  @GetMapping("/api/post/{postId}/person")
  public Integer findAuthorByPostId(@PathVariable("postId") Integer postId) {
    return postService.findAuthorByPostId(postId);
  }

  //Find the author of a post by its postId
  @GetMapping("/api/nonAuth/post/{postId}/person")
  public Integer findAuthorByPostIdNonAuth(@PathVariable("postId") Integer postId) {
    return postService.findAuthorByPostId(postId);
  }

  @DeleteMapping("/api/post/{postId}")
  public Integer deletePostById(@PathVariable("postId") Integer postId) {
    return postService.deletePostById(postId);
  }

}
