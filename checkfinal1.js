function User(name, password) {
    this.name = name ;
    this.password = password;
    
}

function validateForm(){
    var title=document.getElementById("title").value;
    var content=document.getElementById("content").value;

    if(title==""){
        alert("Title is required");
        return false;
    }
    if(content==""){
        alert("Write something");
        return false;
    }
    return true;
}



function showData(username) {
    var allBlogs = JSON.parse(localStorage.getItem("blog")) || [];

    

    var html = "";
    var html1="";
    allBlogs.forEach(function(element, index) {
        if (element.username === username) {
            if(element.category=='lifestyle')
            {
                html += '<div class="card">';
            html += '<div class="card-body">';
            html += `<h5 class="card-title">${element.title}</h5>`;
            html += '<button onclick="deleteData(' +
            index +')" class="btn btn-danger">Delete</button><button ' +
            'onclick="updateData(' +index +')" class="btn btn-warning m-2">Edit</button>';
            html += `<p class="card-text">${element.content}</p>`;
            html += '</div></div>';
            html += '<br/>'


            }
            
        }
    });

    document.getElementById("user-blogs-body").innerHTML = html;
    // document.getElementById("user-blogs").style.display = "block"; // Display user blogs after login

    allBlogs.forEach(function(element, index) {
        if (element.username === username) {
            if(element.category=='travel')
            {
                html1 += '<div class="card">';
            html1 += '<div class="card-body">';
            html1 += `<h5 class="card-title">${element.title}</h5>`;
            html1 += '<button onclick="deleteData(' +
            index +')" class="btn btn-danger">Delete</button><button ' +
            'onclick="updateData(' +index +')" class="btn btn-warning m-2">Edit</button>';
            html1 += `<p class="card-text">${element.content}</p>`;
            html1 += '</div></div>';
            html1 += '<br/>'


            }
            
        }
    });

    document.getElementById("user-blogs-body1").innerHTML = html1;
    // document.getElementById("user-blogs").style.display = "block"; // Display user blogs after login
}




function showAllBlogs() {
    var allBlogs = JSON.parse(localStorage.getItem("blog")) || [];
    var allBlogs = JSON.parse(localStorage.getItem("blog")) || [];

    

    var html = "";
    var html1="";
    allBlogs.forEach(function(element, index) {
       
            if(element.category=='lifestyle')
            {
                html += '<div class="card">';
            html += '<div class="card-body">';
            html += `<h5 class="card-title">${element.title}</h5>`;
            html += `<p class="card-text">${element.content}</p>`;
            html += '</div></div>';
            html += '<br/>'


            
            
        }
    });

    document.getElementById("user-blogs-body").innerHTML = html;
    // document.getElementById("user-blogs").style.display = "block"; // Display user blogs after login

    allBlogs.forEach(function(element, index) {
       
            if(element.category=='travel')
            {
                html1 += '<div class="card">';
            html1 += '<div class="card-body">';
            html1 += `<h5 class="card-title">${element.title}</h5>`;
            html1 += `<p class="card-text">${element.content}</p>`;
            html1 += '</div></div>';
            html1 += '<br/>'


            }
            
        
    });

    document.getElementById("user-blogs-body1").innerHTML = html1;
}



function add() {
    if (validateForm()) {
        var title = document.getElementById("title").value;
        var content = document.getElementById("content").value;
        var username = localStorage.getItem("currentUser");
        var category = "";

        var allBlogs = JSON.parse(localStorage.getItem("blog")) || [];
        if (document.getElementById("user-blog").style.display === "block") {
            category = document.getElementById("category").value;
        }
        
        allBlogs.push({
            username: username,
            title: title,
            content: content,
            category:category
        });

        localStorage.setItem("blog", JSON.stringify(allBlogs));
        showData(username);

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        if (document.getElementById("user-blog").style.display === "block") {
        document.getElementById("category").value="";
        }
    }
}




function deleteData(index) {
    var allBlogs = JSON.parse(localStorage.getItem("blog")) || [];
    allBlogs.splice(index, 1);
    localStorage.setItem("blog", JSON.stringify(allBlogs));
    showData(localStorage.getItem("currentUser"));
}



function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var allBlogs = JSON.parse(localStorage.getItem("blog")) || [];
    var blog = allBlogs[index];

    document.getElementById("title").value = blog.title;
    document.getElementById("content").value = blog.content;

    document.querySelector("#Update").onclick = function () {
        if (validateForm()) {
            blog.title = document.getElementById("title").value;
            blog.content = document.getElementById("content").value;
            blog.category=document.getElementById("category").value;

            localStorage.setItem("blog", JSON.stringify(allBlogs));
            showData(localStorage.getItem("currentUser"));

            document.getElementById("title").value = "";
            document.getElementById("content").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "block";
        }
    };
}



function showLoginForm() {
    hideForms();
    document.getElementById("login-form").style.display = "block";
}



function showRegisterForm() {
    hideForms();
    document.getElementById("register-form").style.display = "block";
}



function hideForms() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("user-blog").style.display = "none";
}




function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    if (username === "" || password === "") {
        alert("Fill all fields");
    } else {
        // Retrieve existing users from localStorage or initialize an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Find user with matching username and password
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Set the current user and display user data
            localStorage.setItem("currentUser", username);
            showData(username);
            
            // Display welcome message and user blog section
            document.getElementById("user-welcome").innerText = "Welcome, " + username + "!";
            document.getElementById("user-blog").style.display = "block";
            
            // Hide the login form and home page
            document.getElementById("login-form").style.display = "none";
            document.getElementById("home-page").style.display = "none";
        } else {
            alert("Invalid username or password");
        }
    }
}





function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Retrieve existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username is already taken
    const isUsernameTaken = existingUsers.some(user => user.username === username);

    if (username === "" || password === "") {
        alert("Fill all fields");
    } else if (isUsernameTaken) {
        alert("Username is already taken");
    } else {
        // Create a new user object
        const newUser = { username: username, password: password };

        // Add the new user to the list of existing users
        existingUsers.push(newUser);

        // Save the updated list of users to localStorage
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Set the current user and display user data
        localStorage.setItem("currentUser", username);
        showData(username);

        // Display a welcome message and the user blog section
        document.getElementById("user-welcome").innerText = "Welcome, " + username + "!";
        document.getElementById("user-blog").style.display = "block";

        // Hide the register form and the home page
        document.getElementById("register-form").style.display = "none";
        document.getElementById("home-page").style.display = "none";

        

    }
}




function logout() {
    localStorage.removeItem("currentUser");
    showAllBlogs();
    hideForms();
    document.getElementById("home-page").style.display = "block";

    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";

    // Clear register form fields upon logout
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
}

// localStorage.clear()

// Add event listener for DOMContentLoaded event
window.addEventListener('DOMContentLoaded', function() {
    // Call showAllBlogs function to display all blogs when the page loads
    showAllBlogs();
});



