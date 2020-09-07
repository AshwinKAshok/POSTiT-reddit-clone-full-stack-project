package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import java.io.Serializable;

public class LikesId implements Serializable {
  public Integer personId;
  public Integer postId;

  public boolean equals(Object other) {
    if(!(other instanceof LikesId))
      return false;
    if( this.personId.equals(((LikesId) other).personId) &&
            this.postId.equals(((LikesId) other).postId)) {
      return true;
    }
    return false;
  }
  public int hash() {
    return personId + postId;
  }
}
