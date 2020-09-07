package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Post;
//import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.PostResponseById;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PostRepository extends CrudRepository<Post, Integer> {

  @Query("SELECT post FROM Post post WHERE post.person.id=:personId")
  public List<Post> findPostsByPersonId(@Param("personId") Integer personId);

  @Query("SELECT post FROM Post post WHERE post.collection.id=:collectionId")
  public List<Post> findPostsByCollectionId(@Param("collectionId") Integer collectionId);

//  @Query("SELECT  new com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.PostResponseById(postEntity.id , postEntity.post , personEntity.id ) " +
//          "FROM Post postEntity, Person personEntity WHERE postEntity.id=:postId AND postEntity.person.id = personEntity.id")
//  public PostResponseById findPostByIdWithPersonId(@Param("postId") Integer postId);

  @Query("SELECT post.person.id FROM Post post WHERE post.id =:postId ")
  public Integer findAuthorByPostId(@Param("postId") Integer postId);

  @Query("SELECT post FROM Post post WHERE post.redditId =:rId")
  public Post findPostByRedditId(@Param("rId") String rId);

}
