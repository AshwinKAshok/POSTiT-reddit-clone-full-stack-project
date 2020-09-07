package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.controllers;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class PersonController {

  @Autowired
  PersonService personService;

  @GetMapping("/api/person/name/{username}")
  public Person findPersonByName(@PathVariable("username") String username) {
    return personService.findPersonByName(username);
  }

  @GetMapping("/api/nonAuth/person/name/{username}")
  public Person findPersonByNameNonAuth(@PathVariable("username") String username) {
    return personService.findPersonByName(username);
  }

  @GetMapping("/api/person/id/{userId}")
  public Person findPersonById(@PathVariable("userId") Integer userId) {
    return personService.findPersonById(userId);
  }

  @GetMapping("/api/nonAuth/person/id/{userId}")
  public Person findPersonByIdNonAuth(@PathVariable("userId") Integer userId) {
    return personService.findPersonById(userId);
  }

  @PutMapping("/api/person/{personId}")
  public Integer updatePersonById(@PathVariable("personId") Integer personId, @RequestBody Person newPersonData) {
    return personService.updatePersonById(personId, newPersonData);
  }


  //Todo: Get all comments made by a person

  @PostMapping("/api/person")
  public Person createPerson(@RequestBody Person person) {
    return personService.createNewPerson(person);
  }

  @PostMapping("/register/person")
  public Person registerPerson(@RequestBody Person person) {
    return personService.createNewPerson(person);
  }

  @DeleteMapping("/api/person/{userId}")
  public int deletePerson(@PathVariable("userId") Integer userId) {
    return personService.deletePerson(userId);
  }
}
