package com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.controllers;

import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.auth.ApplicationUserService;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.jwt.JwtUtil;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.AuthenticationRequest;
import com.northeastern.edu.cs5610_project_backend.cs5610_project_backend.models.AuthenticationResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtil jwtTokenUtil;

  @Autowired
  private ApplicationUserService applicationUserService;

  @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

    try {
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
      );
    }
    catch (BadCredentialsException e) {
      System.out.println("wrong paasss");
//      throw new Exception("Incorrect username or password", e);
      return ResponseEntity
              .status(HttpStatus.UNAUTHORIZED)
              .body(new AuthenticationResponse(null, "failed"));
    }


    final UserDetails userDetails = applicationUserService
            .loadUserByUsername(authenticationRequest.getUsername());

    final String jwt = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new AuthenticationResponse(jwt, "success"));
  }

}
