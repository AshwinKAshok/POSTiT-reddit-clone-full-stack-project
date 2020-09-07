package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "comments")
//@IdClass(CommentId.class)
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private Integer personId;

  private Integer postId;

  private String comment;

  @ManyToOne
  @JsonBackReference(value="comment-person")
  @JoinColumn(name = "personId", updatable = false, insertable = false)
  private Person person;

  @ManyToOne
  @JsonBackReference(value="comment-post")
  @JoinColumn(name = "postId", updatable = false, insertable = false)
  private Post post;

  public Comment() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
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
