const loginForm = document.getElementById("loginForm");
const uploadSection = document.getElementById("uploadSection");
const fileListSection = document.getElementById("fileListSection");
const uploadedFilesList = document.getElementById("uploadedFilesList");
let isLoggedIn = false;

function showLoginForm() {
  loginForm.style.display = "block";
}

function checkLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "robin" && password === "share") {
    loginForm.style.display = "none";
    isLoggedIn = true;
    loadFileList();
    fileListSection.style.display = "block";
    uploadSection.style.display = "none"; 

    document.getElementById("authButtons").innerHTML = `
      <span id="loggedInMsg">Logged in as robin</span>
      <button class="login-btn" onclick="logout()">Logout</button>
    `;
  } else {
    alert("Incorrect username or password");
  }
}

function logout() {
  isLoggedIn = false;
  document.getElementById("authButtons").innerHTML = `
    <button class="login-btn" onclick="showLoginForm()">Login</button>
  `;
  fileListSection.style.display = "none"; 
  uploadSection.style.display = "block"; 
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

loadFileList(); 
