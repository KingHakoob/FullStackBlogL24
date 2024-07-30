<!-- Goal is to Create FullStack web app for Blog site -->
<!-- Backend will be done .Net 8, web api, EF core, SQL Server -->
<!-- Front End wil be done in React with Javascript -->
<!-- Delpoy with Azure Statatic web apps -->


<!-- Create an API for Blog, This must handle all CRUD functions -->

<!-- 
CRUD
Create
Read
Update
Delete
 -->

 <!-- In this app the user should be able to login so we need login page -->

 <!-- Create Account Page -->
 <!-- Blog view post page  of published items -->
 <!-- Dashboard page(this is the profile page will edit delete, publish and unpublish your blog post) -->

 <!-- SQL Server from azure for our Database -->

 <!-- Folder structure -->

<!--  Controllers//Folders
        UserController: This will handle all our user interactions
        All our endpoints will be in this controller for users

 -->

 <!-- Login//endpoint
    
        AddUser//endpoint
        UpdateUser//endpoint
        DeleteUser//endpoint
 
 
  -->

<!-- BlogController 

        AddBlogItems//endpoint C
        GetAllBlogItems//endpoint R
        GetAllBlogItemsByCategory//endpoint 
        GetAllBlogItemsByTags//
        GetAllBlogItesmByDate//
        UpdateBlogItems//endpoint U
        DeleteBlogItems;;endpoint D


-->

<!------------------------------------- Models ------------------------>
 
 <!-- Model Folder -->

<!-- UserModel

        id int
        username string
        Salt string
        Hash string 
 -->

<!-- BlogItemModel

        id int
        UserId int
        PublisherName string
        Title string
        Image string
        Description string
        Date string
        Category string
        IsPublished bool
        IsDeleted bool

-->
<!--------------------------- Items that will be saved to our database are above ------------------------------------------------------->

<!-- LoginModel
        Username string
        Password string
     CreateAccountModel
        Id int
        Username string
        password string
     PasswordModel
        Salt string
        Hash string
-->

<!-- Services//Folder

    UserSErvice//file
        GetUserByUsername
        Login
        AddUser
        DeleteUser
    BlogItemService
        AddBlogItems
        GetAllBlogItemsByCategory//fucntions(methods)
        GetAllBlogItemsByTag
        GetAllBlogItemsByDate
        UpdateBlogItems
        DeleteBlogItems
        GetUsersById



 -->

 <!-- PasswordServices//file
    
        Hash password

        Very hash password
 
 
  -->


