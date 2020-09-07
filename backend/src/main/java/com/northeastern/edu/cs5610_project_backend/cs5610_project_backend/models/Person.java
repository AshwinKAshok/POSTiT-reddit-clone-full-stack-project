package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name="persons")
public class Person {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String firstname;
  private String lastname;
  private String username;
  private String password;
  private Date dob;
  private String age;
  private String address;
  private String phone;

  @OneToMany(mappedBy = "person")
  private List<CollectionMembership> collectionMemberships;

  @OneToMany(mappedBy = "person")
  private List<Comment> comments;

  @OneToMany(mappedBy = "person")
  private List<Post> posts;

  @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Likes> likes;

  public List<Likes> getLikes() {
    return likes;
  }

  public void setLikes(List<Likes> likes) {
    this.likes = likes;
  }

  public Person() {
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public List<Post> getPosts() {
    return posts;
  }

  public void setPosts(List<Post> posts) {
    this.posts = posts;
  }

  public List<CollectionMembership> getCollectionMemberships() {
    return collectionMemberships;
  }

  public void setCollectionMemberships(List<CollectionMembership> collectionMemberships) {
    this.collectionMemberships = collectionMemberships;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Date getDob() {
    return dob;
  }

  public void setDob(Date dob) {
    this.dob = dob;
  }

  public String getAge() {
    return age;
  }

  public void setAge(String age) {
    this.age = age;
  }
}
