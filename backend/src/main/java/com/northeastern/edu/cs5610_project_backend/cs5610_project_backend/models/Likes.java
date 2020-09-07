package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "likes")
@IdClass(LikesId.class)
public class Likes {

  @Id
  private Integer personId;

  @Id
  private Integer postId;

  private Integer likes=1;

  @ManyToOne
  @JsonBackReference(value="likes-person")
  @JoinColumn(name = "personId", updatable = false, insertable = false)
  private Person person;

  @ManyToOne
  @JsonBackReference(value="likes-post")
  @JoinColumn(name = "postId", updatable = false, insertable = false)
  private Post post;

  public Likes() {
  }

  public Integer getPersonId() {
    return personId;
  }

  public void setPersonId(Integer personId) {
    this.personId = personId;
  }

  public Integer getPostId() {
    return postId;
  }

  public void setPostId(Integer postId) {
    this.postId = postId;
  }

  public Integer getLikes() {
    return likes;
  }

  public void setLikes(Integer likes) {
    this.likes = likes;
  }

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public Post getPost() {
    return post;
  }

  public void setPost(Post post) {
    this.post = post;
  }
}
