package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import net.minidev.json.annotate.JsonIgnore;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "collectionMemberships")
@IdClass(CollectionMembershipId.class)
public class CollectionMembership {
  @Id
  private Integer personId;

  @Id
  private Integer collectionId;

  private String role;
  private Date joined_date;

  @ManyToOne
  @JsonBackReference(value="person-collectionMembership")
  @JoinColumn(name = "personId", updatable = false, insertable = false)
  private Person person;

  @ManyToOne
  @JsonBackReference(value="collection-collectionMembership")
  @JoinColumn(name = "collectionId", updatable = false, insertable = false)
  private Collection collection;

  public CollectionMembership() {
  }

  public Integer getPersonId() {
    return personId;
  }

  public void setPersonId(Integer personId) {
    this.personId = personId;
  }

  public Integer getCollectionId() {
    return collectionId;
  }

  public void setCollectionId(Integer collectionId) {
    this.collectionId = collectionId;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public Date getJoined_date() {
    return joined_date;
  }

  public void setJoined_date(Date joined_date) {
    this.joined_date = joined_date;
  }

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

  public Collection getCollection() {
    return collection;
  }

  public void setCollection(Collection collection) {
    this.collection = collection;
  }
}
