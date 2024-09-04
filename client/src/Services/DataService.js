const baseUrl = 'http://localhost:5006/';

const checkToken = () => {
    const token = localStorage.getItem('Token');
    const result = token && true;
    return result;
}

const createAccount = async (createdUser) => {
    const result = await fetch(`${baseUrl}User/AddUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(createdUser)
    });
    if(!result.ok) {
        const message = `Yo you have an error. Check your code! ${result.status}`;
        throw new Error(message);
    }
    const data = await result.json();
}

const login = async (loginUser) => {
    const result = await fetch(`${baseUrl}User/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(loginUser)
    });
    if(!result.ok) {
        const message = `Yo you have an error. Check your code! ${result.status}`;
        throw new Error(message);
    }
    const data = await result.json();

    if(data.token != null) {
        localStorage.setItem("Token", data.token);
    }

    return data;
}

const getLoggedInUser = async (username) => {
    const result = await fetch(`${baseUrl}User/GetUserByUsername/${username}`);
    const data = await result.json();
    localStorage.setItem("UserData", JSON.stringify(data));
    return data;
}

const addBlogItem = async (blogItem) => {
    const result = await fetch(`${baseUrl}Blog/AddBlogItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(blogItem)
    });
    if(!result.ok) {
        const message = `Yo you have an error. Check your code! ${result.status}`;
        throw new Error(message);
    }
    const data = await result.json();
    return data;
}

// Experimental
const sendData = async (endpoint, sentData) => {
    const result = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(sentData)
    });
    if(!result.ok) {
        const message = `Yo you have an error. Check your code! ${result.status}`;
        throw new Error(message);
    }
    const data = await result.json();
    return data;
}

const getBlogItems = async () => {
    const result = await fetch(`${baseUrl}Blog/GetBlogItems`);
    const data = await result.json();
    return data;
}

const getBlogItemsByUserId = async (userId) => {
    const result = await fetch(`${baseUrl}Blog/GetBlogItemsByUserId/${userId}`);
    const data = await result.json();
    return data;
}

export { checkToken, createAccount, login, getLoggedInUser, addBlogItem, sendData, getBlogItems, getBlogItemsByUserId }