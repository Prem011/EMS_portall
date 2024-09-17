const { error } = require("console");
const Employee = require("../models/employeeSchema")
const upload = require("../utils/multer")
const { body, validationResult } = require('express-validator');
const path = require("path");


exports.createEmployee = [

  upload.single('image'),
  body('name').isLength({ min: 1 }).withMessage('Name is required.'),
  body('email').isEmail().withMessage('Invalid email format.'),
  body('mobile').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 digits long.'),
  body('designation').isIn(['HR', 'Manager', 'sales']).withMessage('Invalid designation.'),
  body('gender').isIn(['Male', 'Female', 'Others']).withMessage('Invalid gender.'),
  body('course').isIn(['MCA', 'BCA', 'BSC']).withMessage('Invalid course.'),

  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      if (req.fileValidationError) {
          return res.status(400).json({ error: req.fileValidationError });
      }

      const { name, email, mobile, designation, gender, course } = req.body;

      try {
          const existingEmployeeByEmail = await Employee.findOne({ email });
          const existingEmployeeByMobile = await Employee.findOne({ mobile });

          if (existingEmployeeByEmail) {
              return res.status(400).json({ error: "Employee email already exists." });
          }
          if (existingEmployeeByMobile) {
              return res.status(400).json({ error: "Mobile number already exists." });
          }

          const newEmployee = new Employee({
              name,
              email,
              mobile,
              designation,
              gender,
              course,
              image: req.file ? req.file.path : null 
              // Store file path if uploaded
          });

          await newEmployee.save();
          return res.status(201).json({ message: "Employee created successfully", newEmployee });

      } catch (error) {
          console.log("Error while saving employee:", error);
          return res.status(500).json({ message: "Server error, please try again later.", error: error.message });
      }
  }
];


exports.readEmployee = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc', search } = req.query;

        const filter = {};
        if (req.query.designation) filter.designation = req.query.designation;
        if (req.query.course) filter.course = req.query.course;
        if (req.query.gender) filter.gender = req.query.gender;

        // Add search filter
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
            filter.$or = [
                { name: searchRegex },
                { email: searchRegex },
                { e_id: searchRegex }
            ];
        }

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({ error: 'Page and limit must be positive numbers.' });
        }

        const employees = await Employee.find(filter)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 });

        if (!employees.length) {
            return res.status(404).json({ error: "No employees found matching the criteria" });
        }

        const totalEmployees = await Employee.countDocuments(filter);
        const totalPages = Math.ceil(totalEmployees / limitNumber);

        res.status(200).json({
            data: employees,
            meta: {
                totalEmployees,
                totalPages,
                currentPage: pageNumber,
                perPage: limitNumber
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Server error", error: error.message });
    }
};


exports.updateEmployee = [

    upload.single('image'),
  
    body('name').isLength({ min: 1 }).withMessage('Name is required.'),
    body('email').isEmail().withMessage('Invalid email format.'),
    body('mobile').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 digits long.'),
    body('designation').isIn(['HR', 'Manager', 'sales']).withMessage('Invalid designation.'),
    body('gender').isIn(['Male', 'Female', 'Others']).withMessage('Invalid gender.'),
    body('course').isIn(['MCA', 'BCA', 'BSC']).withMessage('Invalid course.'),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }
  
      const { name, email, mobile, designation, gender, course } = req.body;
  
      try {
        const existingEmployee = await Employee.findOne({ username: req.params.username });
        if (!existingEmployee) {
          return res.status(404).json({ error: "Employee not found." });
        }
  
        const existingEmployeeByEmail = await Employee.findOne({ email, _id: { $ne: existingEmployee._id } });
        const existingEmployeeByMobile = await Employee.findOne({ mobile, _id: { $ne: existingEmployee._id } });
  
        if (existingEmployeeByEmail) {
          return res.status(400).json({ error: "Employee email already exists." });
        }
        if (existingEmployeeByMobile) {
          return res.status(400).json({ error: "Mobile number already exists." });
        }
  
        existingEmployee.name = name;
        existingEmployee.email = email;
        existingEmployee.mobile = mobile;
        existingEmployee.designation = designation;
        existingEmployee.gender = gender;
        existingEmployee.course = course;
  
        if (req.file) {
          existingEmployee.image = req.file.path; // Update image path if a new image is uploaded
        }
  
        await existingEmployee.save();
  
        return res.status(200).json({ message: "Employee updated successfully", employee: existingEmployee });
  
      } catch (error) {
        console.log("Error while updating employee:", error);
        return res.status(500).json({ error: "Server error, please try again later.", error: error.message });
      }
    }
];
  

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error Deleting Emplyee, try later.", error: error.message });
    }
};


exports.toggleActiveStatus = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        employee.active = !employee.active; // Toggle active status
        await employee.save();

        res.status(200).json({ message: "Employee status updated", employee });
    } catch (error) {
        res.status(500).json({ error: "Server error", error: error.message });
    }
};



exports.employeeDp = async (req, res) =>  {
  const filename = req.params.filename;
  const directoryPath = path.join(__dirname, '../public/images/employeesDp');
  
  res.sendFile(`${directoryPath}/${filename}`, (err) => {
      if (err) {
          res.status(404).send({ message: 'Image not found' });
      }
  });
};

exports.employeeDpUpload = upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
  }
  
  res.status(200).send({
      message: 'Image uploaded successfully!',
      filePath: `/public/images/employeesDp/${req.file.filename}`
  });
}

exports.getSingleEmployee = async(req, res) => {

  try {

    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee data retrieved', employee });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error: error.message });
  }

}


