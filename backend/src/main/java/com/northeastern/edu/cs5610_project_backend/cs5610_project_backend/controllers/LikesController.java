package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.controllers;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Likes;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.LikesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class LikesController {

  @Autowired
  LikesService likesService;

  @GetMapping("/api/check/person/{personId}/post/{postId}/likes")
  public Integer checkLiked(@PathVariable("personId") Integer personId, @PathVariable("postId") Integer postId) {
    return likesService.checkLiked(personId, postId);
  }

  @PostMapping("/api/person/{personId}/post/{postId}/likes")
  public Likes createLikes(@PathVariable("personId") Integer personId, @PathVariable("postId") Integer postId) {
    return likesService.createLike(personId, postId);
  }

  @DeleteMapping("/api/person/{personId}/post/{postId}/likes")
  public Integer deleteLikes(@PathVariable("personId") Integer personId, @PathVariable("postId") Integer postId) {
    return likesService.deleteLikes(personId, postId);
  }
}
