package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.auth;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class ApplicationUser implements UserDetails {

  private String userName;
  private String password;
  private boolean active;
  private List<GrantedAuthority> authorities;

  public ApplicationUser(Person person) {
//    this.userName = user.getUserName();
//    this.password = user.getPassword();
//    this.active = user.isActive();
//    this.authorities = Arrays.stream(user.getRoles().split(","))
//            .map(SimpleGrantedAuthority::new)
//            .collect(Collectors.toList());

    this.userName = person.getUsername();
    this.password = person.getPassword();

    //Hardcoding below 2 values
    this.active = true;
    this.authorities = new ArrayList<>();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return userName;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return active;
  }

}
