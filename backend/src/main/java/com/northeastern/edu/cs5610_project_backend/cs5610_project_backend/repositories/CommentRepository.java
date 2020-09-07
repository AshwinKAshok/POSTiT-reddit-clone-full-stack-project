package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Comment;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface CommentRepository extends CrudRepository<Comment, Integer> {
  @Query("SELECT comment FROM Comment comment WHERE comment.personId=:prsnId")
  public List<Comment> findCommentsByPersonId(@Param("prsnId") Integer personId);

  @Query("SELECT comment FROM Comment comment WHERE comment.postId=:pid")
  public List<Comment> findCommentsByPostId(@Param("pid") Integer postId);

//  @Query("SELECT comment FROM Comment comment WHERE comment.personId =:prsnId AND comment.postId =:pstId")
//  public Comment findCommentByPersonAndPostId(@Param("prsnId") Integer personId, @Param("pstId") Integer pstId);

//  @Transactional
//  @Modifying
//  @Query("DELETE FROM Comment comment WHERE comment.personId =:prsnId AND " +
//          "comment.postId=:pstId")
//  public void deleteComment(@Param("prsnId") Integer prsnId, @Param("pstId") Integer pstId);
}
