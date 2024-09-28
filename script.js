document.addEventListener('DOMContentLoaded', () => {
    const courseForm = document.getElementById('courseForm');
    const viewButton = document.getElementById('viewButton');
    const detailsModal = document.getElementById('detailsModal');
    const closeButton = document.querySelector('.close-button');
    const detailText = document.getElementById('detailText');
    const deleteButton = document.getElementById('deleteButton');
    const editButton = document.getElementById('editButton');

    const generateCourseId = () => 'COURSE-' + Math.floor(Math.random() * 1000);
    const setTimestamps = () => {
        const now = new Date().toLocaleString();
        document.getElementById('createdAt').value = now;
        document.getElementById('updatedAt').value = now;
    };

    setTimestamps();
    document.getElementById('courseId').value = generateCourseId();

    courseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const courseName = document.getElementById('courseName').value;
        const instructor = document.getElementById('instructor').value;

        document.getElementById('nameError').textContent = '';
        document.getElementById('instructorError').textContent = '';

        if (!courseName) {
            document.getElementById('nameError').textContent = 'Tên khóa học là bắt buộc!';
            return;
        }

        if (!instructor) {
            document.getElementById('instructorError').textContent = 'Giảng viên là bắt buộc!';
            return;
        }

        const courseData = {
            courseId: document.getElementById('courseId').value,
            courseName,
            courseDescription: document.getElementById('courseDescription').value,
            instructor,
            createdAt: document.getElementById('createdAt').value,
            updatedAt: document.getElementById('updatedAt').value
        };

        fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Khóa học đã được tạo!');
            setTimestamps();
            document.getElementById('courseId').value = generateCourseId();
            courseForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // View course details
    viewButton.addEventListener('click', () => {
        detailText.innerHTML = `
            <strong>Khóa Học ID:</strong> ${document.getElementById('courseId').value}<br>
            <strong>Tên Khóa Học:</strong> ${document.getElementById('courseName').value}<br>
            <strong>Mô Tả:</strong> ${document.getElementById('courseDescription').value}<br>
            <strong>Giảng Viên:</strong> ${document.getElementById('instructor').value}<br>
            <strong>Ngày Tạo:</strong> ${document.getElementById('createdAt').value}<br>
            <strong>Ngày Cập Nhật:</strong> ${document.getElementById('updatedAt').value}<br>
        `;
        detailsModal.style.display = 'flex';
        setTimeout(() => {
            detailsModal.querySelector('.modal-content').classList.add('show');
        }, 10);
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        detailsModal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => {
            detailsModal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (event) => {
        if (event.target === detailsModal) {
            closeButton.click();
        }
    });

    // Delete course
    deleteButton.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn xóa khóa học này không?')) {
            alert('Khóa học đã được xóa!');
            // Simulate deletion logic
        }
    });

    // Edit course (dummy implementation)
    editButton.addEventListener('click', () => {
        const courseName = document.getElementById('courseName').value;
        const instructor = document.getElementById('instructor').value;
        alert(`Chức năng chỉnh sửa chưa được thực hiện. Tên khóa học: ${courseName}, Giảng viên: ${instructor}`);
    });

    // Real-time validation
    document.getElementById('courseName').addEventListener('blur', () => {
        const courseName = document.getElementById('courseName').value;
        if (!courseName) {
            document.getElementById('nameError').textContent = 'Tên khóa học là bắt buộc!';
        } else {
            document.getElementById('nameError').textContent = '';
        }
    });

    document.getElementById('instructor').addEventListener('change', () => {
        const instructor = document.getElementById('instructor').value;
        if (!instructor) {
            document.getElementById('instructorError').textContent = 'Giảng viên là bắt buộc!';
        } else {
            document.getElementById('instructorError').textContent = '';
        }
    });
});
