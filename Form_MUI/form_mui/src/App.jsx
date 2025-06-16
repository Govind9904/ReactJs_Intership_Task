import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  FormLabel, RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './App.css';

function App( ) {
  const [submittedData, setsubmittedData] = useState(null)
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    Gender: '',
    Skills: [],
    Position: '',
    Resume: '',
    college: ''
  });

  // set Skills
  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      Skills: checked ?
        [...prev.Skills, name] : prev.Skills.filter(Skills => Skills !== name)
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.age) errors.age = 'Age is required';
    if (!formData.Gender) errors.Gender = 'Select a Gender';
    if (!formData.college) errors.college = 'College is required';
    if (formData.Skills.length === 0) errors.Skills = 'Select at least one skill';
    if (!formData.Position) errors.Position = 'Select a position';
    if (!formData.Resume) errors.Resume = "Upload Resume";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    // console Submitted Data
    console.log(formData)
    setFormData({
      name: '',
      age: '',
      college: '',
      Gender: '',
      Skills: [],
      Position: '',
      Resume: ''
    })
  };

  return (
   <>
      <h2 style={{ textAlign: 'center', font: 'revert' }}>Student Detail Form</h2>
      <div className="container" style={{ maxWidth: '480px' }}>
        <form onSubmit={handleSubmit}>

          {/* Student Name */}

          <TextField
            fullWidth
            label="Student name"
            variant="filled"
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />

          {/* Age */}

          <TextField
            label="Age"
            sx={{ marginRight: 3 }}
            variant="filled"
            onChange={handleInputChange}
            name="age"
            value={formData.age}
            error={!!formErrors.age}
            helperText={formErrors.age}
          />

          {/* Gender */}

          <FormControl sx={{ marginBottom: '-50px' }}>
            <FormLabel sx={{ mb: '-40px', textAlign: 'left', width: '100%' }}>Gender</FormLabel>
            <RadioGroup
              row
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          {formErrors.Gender && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.Gender}</p>}

          {/* College Name */}
          <TextField
            label="College Name"
            name='college'
            value={formData.college}
            fullWidth
            margin="normal"
            variant="filled"
            onChange={handleInputChange}
            error={!!formErrors.college}
            helperText={formErrors.college}
          />

          {/* Select Skills */}

          <FormLabel sx={{ gap: '0px', textAlign: 'left', marginBottom: '-30px' }} component="legend">Select Skills</FormLabel>
          <FormGroup
            row
            style={{ gap: '4px 16px' }}>
            <FormControlLabel control={<Checkbox name="html" onChange={handleCheckBox} />} label="HTML" />
            <FormControlLabel control={<Checkbox name="css" onChange={handleCheckBox} />} label="CSS" />
            <FormControlLabel control={<Checkbox name="js" onChange={handleCheckBox} />} label="JavaScript" />
            <FormControlLabel control={<Checkbox name="react" onChange={handleCheckBox} />} label="React" />
            <FormControlLabel control={<Checkbox name="node" onChange={handleCheckBox} />} label="Node.js" />
            <FormControlLabel control={<Checkbox name="python" onChange={handleCheckBox} />} label="Python" />
            <FormControlLabel control={<Checkbox name="php" onChange={handleCheckBox} />} label="PHP" />
            <FormControlLabel control={<Checkbox name="laravel" onChange={handleCheckBox} />} label="Laravel" />
            {formErrors.Skills && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.Skills}</p>}
          </FormGroup>

          {/* Position  */}
          <FormControl>
            <FormLabel style={{ marginBottom: '-5px', textAlign: 'left' }}>Position You Applied</FormLabel>
            <Select
              name="Position"
              value={formData.Position}
              onChange={handleInputChange}
              displayEmpty
              sx={{ width: '200px', marginBottom: '-7px' }}
            >
              <MenuItem value="">
                <em>Select Position </em>
              </MenuItem>
              <MenuItem value="React JS">React Js</MenuItem>
              <MenuItem value='Web Developer'>Web Developer</MenuItem>
              <MenuItem value='Python Developer'>Python Developer</MenuItem>
              <MenuItem value='Front End'>Front End</MenuItem>
              <MenuItem value='Back End'>Back End</MenuItem>
              <MenuItem value='PHP Developer'>PHP Developer</MenuItem>
              <MenuItem value='Laravel Developer'>Laravel Developer</MenuItem>
            </Select>
            {formErrors.Position && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.Position}</p>}
          </FormControl>

          {/* Upload Documnet */}

          <div className='file' style={{ marginTop: '30px' }}>
            <Button
              style={{ justifyContent: 'flex-end', height: '40px' }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Resume
              <input
                type='file'
                hidden
                // name = 'Resume'
                onChange={(e) => {
                  const File = e.target.files[0];
                  setFormData((prev) => ({
                    ...prev,
                    Resume: File,
                  }))
                  console.log("Upload File :-", File)
                }}
              />
            </Button>
            {formErrors.Resume && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '8px' }}>
                {formErrors.Resume}
              </p>
            )}
            {formData.Resume && !formErrors.Resume && (
              <p style={{ fontSize: '14px',  marginTop: '8px' }}>
                Uploaded File: {formData.Resume.name}
              </p>
            )}
          </div>

          {/* Button Submit */}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '10px' }}>
            <Button type='submit' variant="contained" color="success" >
              Submit
            </Button>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </div>
        </form>
      </div >
    </>
  );

}
export default App;
