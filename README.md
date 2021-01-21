## Login-SignUp-API

#### It's a basic nodeJS API Project,And as a database - mongoDB is Used.


### Go To http://localhost:3000/api-docs For Documetation.

### API List
 
<b>1. SignUP : </b>
<p>
 Type : POST</br>
 URL : http://localhost:3000/signup </br>
 Content-Type: application/json </br>
  </br>
 Example Body [JSON Format] :  </br>
 </br>
 
 ```json
 {
    "email":"darjidhaval19@gmail.com",
    "password":"123",
    "confirmPassword":"123"
}
```
</p>
</br></br>

<b>2. Login : </b>
<p>
 Type : POST</br>
 URL : http://localhost:3000/login </br>
 Content-Type: application/json </br>
  </br>
 Example Body [JSON Format] :  </br>
 </br>
 
 ```json
{
    "email":"darjidhaval19@gmail.com",
    "password":"abcxyz"
}
```
</p>

</br></br>

<b>3. Forgot Password : </b>
<p>
 Type : PUT</br>
 URL : http://localhost:3000/forgot-password </br>
 Content-Type: application/json </br>
  </br>
 Example Body [JSON Format] :  </br>
 </br>
 
 ```json
{
    "email":"darjidhaval19@gmail.com"
}
```
</p>


</br></br>

<b>4. Reset Password : </b>
<p>
 Type : PUT</br>
 URL : http://localhost:3000/reset-password </br>
 Content-Type: application/json </br>
  </br>
 Example Body [JSON Format] :  </br>
 </br>
 <b>Note</b> : Value of <b>resetLink</b> will be Token You'll Recieve In Forgot Password Response.
 
 ```json
{
    "newPass":"abcxyz",
    "resetLink":"token.value.you'll.recieve.in.response.of.forgotpassword"
}
```
</p>
