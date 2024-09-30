const { error } = require("console");
const Employee = require("../models/employeeSchema")
// const upload = require("../utils/multer")
const { body, validationResult } = require('express-validator');
const path = require("path");
const Upload = require("../utils/cloudinary");
const cloudinary = require('cloudinary').v2;



// exports.createEmployee = [

//     // upload.single('image'),
//     // body('name').isLength({ min: 1 }).withMessage('Name is required.'),
//     // body('email').isEmail().withMessage('Invalid email format.'),
//     // body('mobile').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 digits long.'),
//     // body('designation').isIn(['HR', 'Manager', 'sales']).withMessage('Invalid designation.'),
//     // body('gender').isIn(['Male', 'Female', 'Others']).withMessage('Invalid gender.'),
//     // body('course.*').isIn(['MCA', 'BCA', 'BSC']).withMessage('Invalid course.'), // Validate each course in the array

//     async (req, res) => {
//         const errors = validationResult(req);
//         // if (!errors.isEmpty()) {
//         //     return res.status(400).json({ errors: errors.array() });
//         // }

//         // if (req.fileValidationError) {
//         //     return res.status(400).json({ error: req.fileValidationError });
//         // }

//         // if (!req.file) {
//         //     return res.status(400).json({ error: "Image is required." });
//         // }

//         const { name, email, mobile, designation, gender, course } = req.body;

//         // Ensure the course is always an array
//         const courseArray = Array.isArray(course) ? course : [course];

//         try {
//             const existingEmployeeByEmail = await Employee.findOne({ email });
//             const existingEmployeeByMobile = await Employee.findOne({ mobile });

//             // if (existingEmployeeByEmail) {
//             //     return res.status(400).json({ error: "Employee email already exists." });
//             // }
//             // if (existingEmployeeByMobile) {
//             //     return res.status(400).json({ error: "Mobile number already exists." });
//             // }

//             // Upload the image to Cloudinary
        
//             // const result = await cloudinary.uploader.upload(req.file.path);
//             const upload = await Upload.uploadFile(req.file.path, {timeout : 60000});
            
//             const newEmployee = new Employee({
//                 name,
//                 email,
//                 mobile,
//                 designation,
//                 gender,
//                 course: courseArray,
//                 image: upload.secure_url
//             });

//             await newEmployee.save();

//             return res.status(201).json({ message: "Employee created successfully", newEmployee });

//         } catch (error) {
//             console.log("Error while saving employee:", error);
//             return res.status(500).json({ message: "Server error, please try again later.", error: error.message });
//         }
//     }
// ];


exports.createEmployee = [

    // Express-validator checks for validation (commented in your current version)
    // upload.single('image'), // Ensure image upload is handled properly
    body('name').isLength({ min: 1 }).withMessage('Name is required.'),
    body('email').isEmail().withMessage('Invalid email format.'),
    body('mobile').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 digits long.'),
    body('designation').isIn(['HR', 'Manager', 'Sales']).withMessage('Invalid designation.'),
    body('gender').isIn(['Male', 'Female', 'Others']).withMessage('Invalid gender.'),
    body('course.*').isIn(['MCA', 'BCA', 'BSC']).withMessage('Invalid course.'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if an image is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image is required." });
        }

        const { name, email, mobile, designation, gender, course } = req.body;

        // Ensure course is always treated as an array
        const courseArray = Array.isArray(course) ? course : [course];
        
        // Upload the image to Cloudinary
        const upload =  await Upload.uploadFile(req.file.path);

        try {
            // Check for existing employees by email and mobile
            const existingEmployeeByEmail = await Employee.findOne({ email });
            const existingEmployeeByMobile = await Employee.findOne({ mobile });

            if (existingEmployeeByEmail) {
                return res.status(400).json({ error: "Employee email already exists." });
            }
            if (existingEmployeeByMobile) {
                return res.status(400).json({ error: "Mobile number already exists." });
            }

            if (req.file.size > 5 * 1024 * 1024) { // 5MB limit
                return res.status(400).json({ error: "File size should not exceed 5MB" });
            }
            
           
            
            // Check if the image upload was successful
            // if (!upload || !upload.secure_url) {
            //     return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
            // }

            // Create new employee object
            const newEmployee = new Employee({
                name,
                email,
                mobile,
                designation,
                gender,
                course: courseArray,
                image: upload.secure_url  // Store the Cloudinary URL
            });

            // Save the employee data
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
        // if (search) {
        //     const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
        //     filter.$or = [
        //         { name: searchRegex },
        //         { email: searchRegex },
        //         { e_id: searchRegex }
        //     ];
        // }

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

        // Map employees to include the image URL
        const employeeData = employees.map(employee => ({
            ...employee.toObject(),
            image: employee.image ? 
            // `http://localhost:4001/images/employeesDp/${employee.image}`
            `http://localhost:4001/${employee.image}`
            
            : null
        }));

        res.status(200).json({
            data: employeeData,
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
    // upload.single('image'),  // Make sure this middleware is included in your route
    
    body('name').isLength({ min: 1 }).withMessage('Name is required.'),
    body('email').isEmail().withMessage('Invalid email format.'),
    body('mobile').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 digits long.'),
    body('designation').isIn(['HR', 'Manager', 'Sales']).withMessage('Invalid designation.'),
    body('gender').isIn(['Male', 'Female', 'Others']).withMessage('Invalid gender.'),
    body('course.*').isIn(['MCA', 'BCA', 'BSC']).withMessage('Invalid course.'), // Validate each course in the array
    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }
  
      const { name, email, mobile, designation, gender, course } = req.body;
  
      // Check if req.file exists before trying to access its path
      let uploadUrl;
      if (req.file) {
        uploadUrl = await Upload.uploadFile(req.file.path); // Only call upload if file exists
      }
  
      // Ensure the course is always an array
      const courseArray = Array.isArray(course) ? course : [course];
  
      try {
        const existingEmployee = await Employee.findById(req.params.id);
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
        existingEmployee.course = courseArray; // Store updated courses as array
  
        // Update image path if a new image is uploaded
        if (uploadUrl) {
          existingEmployee.image = uploadUrl.secure_url; 
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


