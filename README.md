# Arketfy Server Side
This project is a backend service that provides a RESTful API for an e-commerce based application.

The API allow users to create and remove and add products stored in MongoDB. Users are divided in two different categories: Admins and Customers. The API also includes authentication and authorization mechanisms to ensure that only authorized users can access and manipulate the data.

# Installation Guide

These instructions will get you a copy of the project up and running on your local machine.
The installation guide assumes that you have Docker and Docker Compose installed. Make sure that you have it and you are good to go!

1. Clone the project:
```sh
$ git clone "https://github.com/guifaxina/app.git" <optional:folder>
```
2. Open the folder that you specified
```sh
$ cd <folder>
```
3. Build the image and run a Docker container:
```sh
$ docker compose up && docker compose run -d 
```
The server will now be running on "http://localhost:3001"
### API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /user/user-data   | Retrieve user data. |
| GET    | /user/select-product | Retrieve the selected product. |
| GET    | /user/get-products | Retrieve all products. |
| PATCH  | /user/buy | Update the inventory. |
| POST   | /user/register | Create a new user. |
| POST   | /user/login | Sign in user. |
| POST   | /admin/add-new-product | Create new product. |
| DELETE | /admin/delete-product/:id | Delete product by id. |

### Built with
* TypeScript
* NodeJS
  * Express
* MongoDB
* Docker

### Author
* [Guilherme Faxina](https://www.linkedin.com/in/guifaxina/)
