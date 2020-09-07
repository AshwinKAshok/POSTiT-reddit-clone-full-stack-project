package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.services;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Collection;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.Person;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.repositories.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

  @Autowired
  PersonRepository personRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  public Person findPersonByName(String username) {
    return personRepository.findPersonByName(username);
  }

  public Person findPersonById(Integer personId) {
    Optional<Person> person = personRepository.findById(personId);
    return person.get();
  }

  public List<Collection> findCollectionOfPerson(Integer personId) {
    return personRepository.findCollectionsOfPerson(personId);
  }

  public Person createNewPerson(Person newPerson) {
    newPerson.setPassword(passwordEncoder.encode(newPerson.getPassword()));
    return personRepository.save(newPerson);
  }

  public Integer updatePersonById(Integer personId, Person newPersonData) {
    Person personToBeUpdated = personRepository.findById(personId).get();

    if(personToBeUpdated== null) {
      return 0;
    } else {
      if(newPersonData.getFirstname() != null )
        personToBeUpdated.setFirstname(newPersonData.getFirstname());

      if(newPersonData.getLastname() != null )
        personToBeUpdated.setLastname(newPersonData.getLastname());

      if(newPersonData.getPassword() != null )
        personToBeUpdated.setPassword(newPersonData.getPassword());

      if(newPersonData.getUsername() != null )
        personToBeUpdated.setUsername(newPersonData.getUsername());

      if(newPersonData.getAddress() != null )
        personToBeUpdated.setAddress(newPersonData.getAddress());

      if(newPersonData.getPhone() != null )
        personToBeUpdated.setPhone(newPersonData.getPhone());

      if(newPersonData.getDob() != null )
        personToBeUpdated.setDob(newPersonData.getDob());
    }
    personRepository.save(personToBeUpdated);
    return 1;
  }

  public int deletePerson(Integer personId) {

    //deleting person by id
    personRepository.deleteById(personId);

    //Checking if deletion is successful.
    Optional<Person> person = personRepository.findById(personId);

    if(person.get() == null) {
      return 1;
    } else{
      return 0;
    }
  }
}
