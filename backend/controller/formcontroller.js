import Form from '../models/formmodel.js';

export const getAllForms = async (req, res) => {
  try {
    console.log('Fetching all forms...');
    const forms = await Form.find().sort({ createdAt: -1 });
    console.log(`Found ${forms.length} forms`);
    return res.status(200).json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching forms',
      error: error.message
    });
  }
};

export const submitForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body; // Debugging log

    const newForm = new Form({
      name,
      email,
      phone,
      message,
    });

    const savedForm = await newForm.save();
    

    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};