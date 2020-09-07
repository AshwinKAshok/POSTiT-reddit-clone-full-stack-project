package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Likes;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Post;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.LikesRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PersonRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikesService {

  @Autowired
  LikesRepository likesRepository;

  @Autowired
  PersonRepository personRepository ;

  @Autowired
  PostRepository postRepository;

  public Likes createLike(Integer personId, Integer postId) {
    Person person = personRepository.findById(personId).get();
    Post post = postRepository.findById(postId).get();

    Likes likes = new Likes();
    likes.setPersonId(person.getId());
    likes.setPostId(post.getId());
    likes.setPerson(person);
    likes.setPost(post);

    return likesRepository.save(likes);
  }

  public Integer deleteLikes(Integer personId, Integer postId) {
    likesRepository.deleteLikes(personId, postId);

    if(likesRepository.checkLiked(personId,postId) == null) {
      return 1;
    } else {
      return 0;
    }
  }

  public Integer checkLiked(Integer personId, Integer postId) {
    if(likesRepository.checkLiked(personId, postId) != null) {
      return 1;
    } else {
      return 0;
    }
  }
}
