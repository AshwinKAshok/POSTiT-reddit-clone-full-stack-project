package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Comment;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Post;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.CommentRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PersonRepository;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

  @Autowired
  CommentRepository commentRepository;

  @Autowired
  PersonRepository personRepository;

  @Autowired
  PostRepository postRepository;

  public Comment createComment(Comment comment, Integer personId, Integer postId) {
    Person person = personRepository.findById(personId).get();
    Post post = postRepository.findById(postId).get();
    comment.setPersonId(person.getId());
    comment.setPostId(post.getId());
    comment.setPerson(person);
    comment.setPost(post);

    return commentRepository.save(comment);
  }

  public Comment findCommentById(Integer commentId) {
    Optional<Comment> commentOptional = commentRepository.findById(commentId);

    if (commentOptional.isPresent()) {
      return commentOptional.get();
    } else {
      return null;
    }
  }

  public List<Comment> findCommentsByPersonId(Integer personId) {
    return commentRepository.findCommentsByPersonId(personId);
  }

  public List<Comment> findCommentsByPostId(Integer postId) {
    return commentRepository.findCommentsByPostId(postId);
  }

  public int deleteCommentById(Integer commentId) {
    commentRepository.deleteById(commentId);
    Optional<Comment> commentOptional = commentRepository.findById(commentId);

    if(commentOptional.isPresent()) {
      return 0;
    } else {
      return 1;
    }

  }

  public Comment updateComment(Comment newCommentData, Integer commentId) {
    Comment commentToBeUpdated = commentRepository.findById(commentId).get();

    if (newCommentData.getComment() != null) {
      commentToBeUpdated.setComment(newCommentData.getComment());
    }

    return commentRepository.save(commentToBeUpdated);
  }

}
