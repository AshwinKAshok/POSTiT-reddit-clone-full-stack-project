package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "collections")
public class Collection {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String collection_name;
  private String collection_description;
  private Date created;

  @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CollectionMembership> collectionMemberships;

//  @OneToMany(mappedBy = "collection")
//  private List<PostCollectionMembership> postCollectionMemberships;

  @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Post> posts;

  public Collection() {
  }

  public List<Post> getPosts() {
    return posts;
  }

  public void setPosts(List<Post> posts) {
    this.posts = posts;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getCollection_name() {
    return collection_name;
  }

  public void setCollection_name(String collection_name) {
    this.collection_name = collection_name;
  }

  public String getCollection_description() {
    return collection_description;
  }

  public void setCollection_description(String collection_description) {
    this.collection_description = collection_description;
  }

  public Date getCreated() {
    return created;
  }

  public void setCreated(Date created) {
    this.created = created;
  }

  public List<CollectionMembership> getCollectionMemberships() {
    return collectionMemberships;
  }

  public void setCollectionMemberships(List<CollectionMembership> collectionMemberships) {
    this.collectionMemberships = collectionMemberships;
  }
}
