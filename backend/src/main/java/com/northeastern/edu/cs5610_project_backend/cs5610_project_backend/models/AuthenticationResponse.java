package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

  private final String jwt;
  private final String authStatus;

  public AuthenticationResponse(String jwt, String authStatus) {
    this.jwt = jwt;
    this.authStatus = authStatus;
  }

  public String getJwt() {
    return jwt;
  }

  public String getAuthStatus() {
    return authStatus;
  }
}
