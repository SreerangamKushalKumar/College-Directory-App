document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password && u.role === role);
            if (user) {
                hideAllPages();
                if (role === 'student') {
                    document.getElementById('student-page').style.display = 'block';
                    showStudentProfile(user);
                } else if (role === 'faculty') {
                    document.getElementById('faculty-page').style.display = 'block';
                } else if (role === 'admin') {
                    document.getElementById('admin-page').style.display = 'block';
                }
            } else {
                document.getElementById('error-message').textContent = 'Incorrect credentials, please try again.';
            }
        });
});

function hideAllPages() {
    document.getElementById('index-page').classList.add('hidden');
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('student-page').classList.add('hidden');
    document.getElementById('faculty-page').classList.add('hidden');
    document.getElementById('admin-page').classList.add('hidden');
}

function showStudentProfile(user) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
    `;
}

function searchStudents() {
    const query = document.getElementById('search').value.toLowerCase();
    const results = `
        <p>Search results for "${query}"</p>
        <p>Robert - Computer Science</p>
        <p>John Wick - Electronics</p>
        <p>Stephen - Civil</p>
        <p>Bean - mechanical</p>
    `;
    document.getElementById('search-results').innerHTML = results;
}

document.getElementById('updateProfileForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Profile updated successfully.');
});

function showPage(page) {
    hideAllPages();
    if (page === 'login') {
        document.getElementById('login-page').classList.remove('hidden');
    }
}
