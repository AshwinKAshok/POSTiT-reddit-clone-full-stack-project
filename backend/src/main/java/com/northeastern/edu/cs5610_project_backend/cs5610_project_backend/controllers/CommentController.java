package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.controllers;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Comment;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.CommentService;

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
public class CommentController {

  @Autowired
  CommentService commentService;

  @GetMapping("/api/person/{personId}/comments")
  public List<Comment> findCommentsByPersonId(@PathVariable("personId") Integer personId) {
    return commentService.findCommentsByPersonId(personId);
  }

  @GetMapping("/api/nonAuth/person/{personId}/comments")
  public List<Comment> findCommentsByPersonIdNonAuth(@PathVariable("personId") Integer personId) {
    return commentService.findCommentsByPersonId(personId);
  }


  @GetMapping("/api/post/{postId}/comments")
  public List<Comment> findCommentsByPostId(@PathVariable("postId") Integer postId) {
    return commentService.findCommentsByPostId(postId);
  }

  @GetMapping("/api/nonAuth/post/{postId}/comments")
  public List<Comment> findCommentsByPostIdNonAuth(@PathVariable("postId") Integer postId) {
    return commentService.findCommentsByPostId(postId);
  }

  @GetMapping("/api/comment/{commentId}")
  public Comment findCommentById(Integer commentId) {
    return commentService.findCommentById(commentId);
  }

  @PostMapping("/api/comment/person/{personId}/post/{postId}")
  public Comment createComment(@RequestBody Comment comment,
                               @PathVariable("personId") Integer personId,
                               @PathVariable("postId") Integer postId) {
    return commentService.createComment(comment, personId, postId);
  }

  @DeleteMapping("/api/comment/{commentId}")
  public Integer deleteComment(@PathVariable("commentId") Integer commentId) {
    return commentService.deleteCommentById(commentId);
  }

  @PutMapping("/api/comment/{commentId}")
  public Comment updateComment(@PathVariable("commentId") Integer commentId, @RequestBody Comment comment) {
    return commentService.updateComment(comment, commentId);
  }
}
