package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import java.io.Serializable;

public class CollectionMembershipId implements Serializable {
  public Integer personId;
  public Integer collectionId;

  public boolean equals(Object other) {
    if(!(other instanceof CollectionMembershipId))
      return false;
    if( this.personId.equals(((CollectionMembershipId) other).personId) &&
            this.collectionId.equals(((CollectionMembershipId) other).collectionId)) {
      return true;
    }
    return false;
  }
  public int hash() {
    return personId + collectionId;
  }
}
