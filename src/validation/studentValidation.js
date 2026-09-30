const validateStudentId = (id) => {
  const studentId = Number(id);

  if (!Number.isInteger(studentId) || studentId <= 0) {
    return {
      valid: false,
      message: "Student ID must be a positive number",
    };
  }

  return {
    valid: true,
    value: studentId,
  };
};

const validateCreateStudent = (body) => {
  const { name, course } = body;

  if (name === undefined || course === undefined) {
    return {
      valid: false,
      message: "Name and course are required",
    };
  }

  if (typeof name !== "string" || typeof course !== "string") {
    return {
      valid: false,
      message: "Name and course must be strings",
    };
  }

  if (!name.trim() || !course.trim()) {
    return {
      valid: false,
      message: "Name and course cannot be empty",
    };
  }

  return {
    valid: true,
    name: name.trim(),
    course: course.trim(),
  };
};

const validateUpdateStudent = (body) => {
  const { name, course } = body;

  if (name === undefined && course === undefined) {
    return {
      valid: false,
      message: "At least name or course is required",
    };
  }

  if (name !== undefined) {
    if (typeof name !== "string") {
      return {
        valid: false,
        message: "Name must be a string",
      };
    }

    if (!name.trim()) {
      return {
        valid: false,
        message: "Name cannot be empty",
      };
    }
  }

  if (course !== undefined) {
    if (typeof course !== "string") {
      return {
        valid: false,
        message: "Course must be a string",
      };
    }

    if (!course.trim()) {
      return {
        valid: false,
        message: "Course cannot be empty",
      };
    }
  }

  return {
    valid: true,
    name: name !== undefined ? name.trim() : undefined,
    course: course !== undefined ? course.trim() : undefined,
  };
};

module.exports = {
  validateStudentId,
  validateCreateStudent,
  validateUpdateStudent,
};