export function validateProfileForm (formData) {
    const {
        firstName,
        lastName,
        otherName,
        password,
        confirmPassword,
        email,
        phone,
        street,
        city,
        state,
        postalCode,
        country,
        birthDate,
        profilePic,
    } = formData;

    const validationErrors = {};

    if (firstName.trim() === '') {
        validationErrors.firstName = 'First Name is required';
    }

    if (lastName.trim() === '') {
        validationErrors.lastName = 'Last Name is required';
    }

    if (otherName.trim() === '') {
        validationErrors.otherName = 'Other Name is required';
    }

    if (password.trim() === '') {
        validationErrors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
        validationErrors.password = 'Password must be at least 8 characters long and must contain at least one number and one special character';
    }

    if (confirmPassword.trim() === '') {
        validationErrors.confirmPassword = 'Confirm Password is required';
    } else if (!isValidPassword(confirmPassword)) {
        validationErrors.confirmPassword = 'Password must be at least 8 characters long and must contain at least one number and one special character';
    } else if (password !== confirmPassword) {
        validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (email.trim() === '') {
        validationErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        validationErrors.email = 'Invalid email format';
    }

    if (phone.trim() === '') {
        validationErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(phone)) {
        validationErrors.phone = 'Invalid phone number format';
    }

    if (street.trim() === '') {
        validationErrors.street = 'Street is required';
    }

    if (city.trim() === '') {
        validationErrors.city = 'City is required';
    }

    if (state.trim() === '') {
        validationErrors.state = 'State is required';
    }

    if (postalCode.trim() === '') {
        validationErrors.postalCode = 'Postal code is required';
    } else if (!isValidPostalCode(postalCode)) {
        validationErrors.postalCode = 'Invalid postal code format';
    }

    if (country.trim() === '') {
        validationErrors.country = 'Country is required';
    }

    if (birthDate.trim() === '') {
        validationErrors.birthDate = 'Birth date is required';
    } else if (!isValidBirthdate(birthDate)) {
        validationErrors.birthDate = 'Birth date cannot be in the future';
    }

    if (!profilePic) {
        validationErrors.profilePic = 'Profile picture is required';
    } else if (!isValidProfilePic(profilePic)) {
        validationErrors.profilePic = 'Invalid profile picture format. Only JPEG and PNG are allowed.';
    }

    return validationErrors;
};

const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
const isValidPassword = (password) => {
    // Password must be at least 8 characters long and must contain at least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};

const isValidPhone = (phone) => {
    // Basic phone number format validation
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phone);
};

const isValidPostalCode = (postalCode) => {
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;
    return postalCodeRegex.test(postalCode);
};

const isValidBirthdate = (birthdate) => {
    const inputDate = new Date(birthdate);
    const currentDate = new Date();
    return inputDate <= currentDate;
};

const isValidProfilePic = (filename) => {
    const profilePicRegex = /\.(jpeg|jpg|png)$/i;
    return profilePicRegex.test(filename);
};