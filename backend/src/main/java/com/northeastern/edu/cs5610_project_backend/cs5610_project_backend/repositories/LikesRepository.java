package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Likes;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface LikesRepository extends CrudRepository<Likes, Integer> {
  @Transactional
  @Modifying
  @Query("DELETE FROM Likes likes WHERE likes.person.id =:personId AND likes.post.id =:postId")
  public void deleteLikes(@Param("personId") Integer personId, @Param("postId") Integer postId);

  @Query("SELECT likes FROM Likes likes WHERE likes.person.id =:personId AND likes.post.id =:postId")
  public Likes checkLiked(@Param("personId") Integer personId, @Param("postId") Integer postId);
}
