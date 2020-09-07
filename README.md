## POSTiT - place for all your thoughts (An attempt to make a reddit)

## 1. What it is??

This is an attempt to use my knowledge of frontend and backend to do a full-stack web-development project.
This project aims to implement many of the features that reddit has. It provides the follwing
 features:
 * User registration and authentication (JWT token authentication).
 * To publish posts and letting other users like and comment on the post.
 * create private groups.
 * Create public posts visible to everyone.
 * Create private posts visible only to members of a given group.

## 2. TECH STACK

Frontend: React and Redux

Backend: Java Spring.

Database: AWS RDS
 
## 3. USERS AND ROLE

There are three types of users:

**2.1.  The Anonymous User**

The default user which accesses our website for the first time. He has read-only privileges to all posts, collections, and comments. The anonymous user has restricted access to other user profiles to get general information related to a specific user.

**2.2. The Logged in User**

User that has an account on our website. Is able to read and create posts, as well as add new comments to any topic and modify/delete pre existing comments owned by him.

Furthermore, the logged in user is able to create personal collections which are made up of different posts. The user can add/remove posts to these collections.

**2.3. Admin**

Administrators are collection owners. They are able to create, update, and delete owned collections, as well as add/remove any user to their collection.

## 4. WEBAPP STRATEGY

Our general architecture is the following:

**3.1.  Frontend react client**

The frontend is developed using react and redux.

**3.2.  Services**

The services will handle interaction between client and database, as well as external API calls.
The backend is implement using Java spring. The backend also provides authentication using JWT token based 
authentication mechanism.

**3.3. Database** 

The databases will store our user, post, comment and collection models. A database relation will record user posts and their corresponding commenters.
The database used is a relational database for storing the user data.

## 5. API USAGE AND API USAGE STRATEGY

In addition to our the post created by the users of this application, the frontend 
client also shows the latest posts available on the actual reddit site.
For doing this we use the Reddit API to retrieve original posts and ignore the comments. 
Thus, this project fetches the trending articles of the day in realtime only in the frontend, and whenever a comment is made using the project's frontend, the post and comment
 will be saved to the backend database created as part of this project.

Our API supports the following paths:

Person
* CRUD: /api/person
* GET: /api/nonAuth/person

Post
* CRUD: /api/post
* GET: /api/nonAuth/person

Collection
* CRUD: /api/collection
* GET: /api/nonAuth/collection
* add/remove post to collection: /api/connect/post/<pid>/collection/<cid>

Comment
* CRUD: /api/comment/cid
* GET: /api/nonAuth/post/<pid>/comments

Likes
* GET, DELETE: /api/person/<pid>/post/<pid>/likes

