package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import java.io.Serializable;

public class CommentId implements Serializable {
  public Integer personId;
  public Integer postId;

  public boolean equals(Object other) {
    if(!(other instanceof CommentId))
      return false;
    if( this.personId.equals(((CommentId) other).personId) &&
            this.postId.equals(((CommentId) other).postId)) {
      return true;
    }
    return false;
  }
  public int hash() {
    return personId + postId;
  }
}
