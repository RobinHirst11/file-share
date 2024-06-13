const loginForm = document.getElementById("loginForm");
const uploadSection = document.getElementById("uploadSection");
const fileListSection = document.getElementById("fileListSection");
const uploadedFilesList = document.getElementById("uploadedFilesList");
const authButtons = document.getElementById("authButtons"); 
let isLoggedIn = false;

// Initially hide the login form
loginForm.style.display = "none"; 

function showLoginForm() {
  loginForm.style.display = "block";
}

const correctHash = "85e47ac07ac9d6416168a97e33fa969a";

function checkLogin() { 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const passwordHash = MD5(password);

  if (username === "robin" && passwordHash === correctHash) {
    loginForm.style.display = "none";
    isLoggedIn = true;
    loadFileList();
    fileListSection.style.display = "block";
    uploadSection.style.display = "block"; 

    authButtons.innerHTML = `
      <button class="logout-btn" onclick="logout()">Logout</button>
    `; 
  } else {
    alert("Invalid username or password.");
  }
}

function logout() {
  isLoggedIn = false;
  authButtons.innerHTML = `
    <button class="login-btn" onclick="showLoginForm()">Login</button>
  `;
  fileListSection.style.display = "none"; 
  uploadSection.style.display = "none"; 
}

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files; 

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileData = event.target.result;
        const fileName = file.webkitRelativePath || file.name; 

        const storedFiles = getStoredFiles();
        storedFiles.push({ name: fileName, data: fileData });
        localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));

        loadFileList();
        alert(`${fileName} uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  } else {
    alert("Please select a file or folder to upload.");
  }
}

function loadFileList() {
  uploadedFilesList.innerHTML = '';
  const storedFiles = getStoredFiles();

  storedFiles.forEach(file => {
    const listItem = document.createElement("li");

    const pathParts = file.name.split("/");
    const fileName = pathParts[pathParts.length - 1];

    const downloadLink = document.createElement("a");
    downloadLink.textContent = fileName;
    downloadLink.href = file.data;
    downloadLink.download = fileName;

    listItem.appendChild(downloadLink);
    uploadedFilesList.appendChild(listItem);
  });
}

function getStoredFiles() {
  const storedData = localStorage.getItem("uploadedFiles");
  return storedData ? JSON.parse(storedData) : [];
}

// Initial state: Hide upload and file list sections
uploadSection.style.display = "none";
fileListSection.style.display = "none";

// Load files from local storage on page load
loadFileList(); 
