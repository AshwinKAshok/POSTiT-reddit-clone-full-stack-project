package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import net.minidev.json.annotate.JsonIgnore;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String post;
  private String category;
  private Integer likes=0;
  private Date created;
  private Date modified;
  private String redditId;
  private boolean isPartOfCollection;

  @ManyToOne
  @JsonBackReference(value="post-person")
  private Person person;

  @ManyToOne
  @JsonBackReference(value="post-collection")
  private Collection collection;

  @OneToMany(mappedBy = "post")
  private List<Comment> comments;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Likes> likesMapping;

  public String getRedditId() {
    return redditId;
  }

  public void setRedditId(String redditId) {
    this.redditId = redditId;
  }

  public List<Likes> getLikesMapping() {
    return likesMapping;
  }

  public void setLikesMapping(List<Likes> likesMapping) {
    this.likesMapping = likesMapping;
  }
//  @OneToMany(mappedBy = "post")
//  private List<PostCollectionMembership> postCollectionMemberships;

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public Post() {
  }

  public Collection getCollection() {
    return collection;
  }

  public void setCollection(Collection collection) {
    this.collection = collection;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getPost() {
    return post;
  }

  public void setPost(String post) {
    this.post = post;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public Integer getLikes() {
    return likes;
  }

  public void setLikes(Integer likes) {
    this.likes = likes;
  }

  public Date getCreated() {
    return created;
  }

  public void setCreated(Date created) {
    this.created = created;
  }

  public Date getModified() {
    return modified;
  }

  public void setModified(Date modified) {
    this.modified = modified;
  }

  public boolean isPartOfCollection() {
    return isPartOfCollection;
  }

  public void setPartOfCollection(boolean partOfCollection) {
    isPartOfCollection = partOfCollection;
  }

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

}
