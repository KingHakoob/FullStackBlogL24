const baseUrl = 'http://localhost:5006/';

const checkToken = () => {
    const token = localStorage.getItem('Token');
    const response = token && true;
    return response;
}

const createAccount = async (createdUser) => {
    const response = await fetch(`${baseUrl}User/AddUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(createdUser)
    });
    if(!response.ok) {
        const message = `Yo you have an error. Check your code! ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
}

const login = async (loginUser) => {
    const response = await fetch(`${baseUrl}User/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(loginUser)
    });
    if(!response.ok) {
        const message = `Yo you have an error. Check your code! ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();

    if(data.token != null) {
        localStorage.setItem("Token", data.token);
    }

    return data;
}

const getLoggedInUser = async (username) => {
    const response = await fetch(`${baseUrl}User/GetUserByUsername/${username}`);
    const data = await response.json();
    localStorage.setItem("UserData", JSON.stringify(data));
    return data;
}

const addBlogItem = async (blogItem) => {
    const response = await fetch(`${baseUrl}Blog/AddBlogItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(blogItem)
    });
    if(!response.ok) {
        const message = `Yo you have an error. Check your code! ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    return data;
}

// Experimental
const sendData = async (endpoint, sentData) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(sentData)
    });
    if(!response.ok) {
        const message = `Yo you have an error. Check your code! ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    return data;
}

const getBlogItems = async () => {
    const response = await fetch(`${baseUrl}Blog/GetBlogItems`);
    const data = await response.json();
    return data;
}

const getBlogItemsByUserId = async (userId) => {
    const response = await fetch(`${baseUrl}Blog/GetBlogItemsByUserId/${userId}`);
    const data = await response.json();
    return data;
}

const updateBlogItem = async (blogItem) => {
    const response = await fetch(`${baseUrl}Blog/UpdateBlogItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(blogItem)
    });
    if(!response.ok) {
        const message = `Yo you have an error. Check your code! ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    return data;
}

const getPublishedBlogItems = async () => {
    const response = await fetch(`${baseUrl}Blog/GetPublishedItems`);
    const data = await response.json();
    return data;
}

export { checkToken, createAccount, login, getLoggedInUser, addBlogItem, sendData, getBlogItems, getBlogItemsByUserId, updateBlogItem, getPublishedBlogItems }