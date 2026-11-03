const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const students = [];

app.post('/api/students', (req, res) => {
  const { id, name, email, course, age } = req.body;

  if (!id || !name || !email || !course || !age) {
    return res.status(400).json({ 
      error: 'All fields (id, name, email, course, age) are mandatory' 
    });
  }

  const existingStudent = students.find(s => s.id === id);
  if (existingStudent) {
    return res.status(409).json({ 
      error: 'Student with this ID already exists' 
    });
  }

  const newStudent = { id, name, email, course, age };
  students.push(newStudent);

  res.status(201).json({
    message: 'Student record created successfully',
    student: newStudent
  });
});

app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  
  if (!student) {
    return res.status(404).json({ 
      error: 'Student not found' 
    });
  }
  
  res.status(200).json(student);
});

app.put('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id == req.params.id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ 
      error: 'Student not found' 
    });
  }
  
  const { name, email, course, age } = req.body;
  
  students[studentIndex] = {
    ...students[studentIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(course && { course }),
    ...(age && { age })
  };
  
  res.status(200).json({
    message: 'Student record updated successfully',
    student: students[studentIndex]
  });
});

app.delete('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id == req.params.id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ 
      error: 'Student not found' 
    });
  }
  
  students.splice(studentIndex, 1);
  
  res.status(200).json({
    message: 'Student record deleted successfully'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});