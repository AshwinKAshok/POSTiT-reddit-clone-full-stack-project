package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.auth;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApplicationUserService implements UserDetailsService {

  @Autowired
  PersonRepository personRepository;

  @Override
  public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
//    Optional<Person> user = personRepository.findPersonByName(userName);

    Person user = personRepository.findPersonByName(userName);

    if(user==null) {
      throw new UsernameNotFoundException("Not found: " + userName);
    }

    return new ApplicationUser(user);
  }

}
