// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
function App() {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    email: {
      invalid: "",
      required: "",
    },
    password: {
      required: "",
      capsRequired: "",
      smallsRequired: "",
      numsRequired: "",
      uniqueCharRequired: ""
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentError = validate();
    if (Object.keys(currentError).length === 0) {
      console.log("no error")
    } else {
      setErrors(currentError)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      // console.log(prevErrors);
      return {
        ...prevErrors,
        [name]: {}
      }
    });
  }

  const validate = () => {
    let newerrors = {
      email: {
        invalid: "",
        required: "",
      },
      password: {
        required: "",
        capsRequired: "",
        smallsRequired: "",
        numsRequired: "",
        uniqueCharRequired: ""
      }
    };

    if (!formData.email) {
      newerrors.email.required = "Email is Required"
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newerrors.email.invalid = "Email is Invalid"
    }
    if (formData.password.length == 0) {
      newerrors.password.required = "Password is Required"
    } else newerrors.password.required = "Password is Required";
    if (formData.password) {
      let map = new Map();
      let arr = formData.password.split("");

      let errorMessages = {
        capsRequired: "A Upper case letter case is required",
        smallsRequired: "A lower case letter case is required",
        uniqueCharRequired: "A special character (@/!/$/%/&) is required",
        numsRequired: "A number from 0-9 is required"
      }

      for (let i = 0; i < arr.length; i++) {
        if ((arr[i].charCodeAt(0) >= 65 && arr[i].charCodeAt(0) <= 90)) {
          map.set("capsRequired", false);
        }
        if ((arr[i].charCodeAt(0) >= 97 && arr[i].charCodeAt(0) <= 122)) {
          map.set("smallsRequired", false)
        }
        if ((arr[i].charCodeAt(0) === 64 || arr[i].charCodeAt(0) === 33 || (arr[i].charCodeAt(0) >= 36 && arr[i].charCodeAt(0) <= 36))) {
          map.set("uniqueCharRequired", false)
        }
        if ((arr[i].charCodeAt(0) - 48 >= 0 && arr[i].charCodeAt(0) - 48 <= 9)) {
          map.set("numsRequired", false)
        }
      }

      Object.keys(newerrors.password).forEach((key) => {
        if (!map.has(key)) {
          map.set(key, true);
        }
      })

      map.forEach((value, key) => {
        newerrors.password[key] = value == true ? errorMessages[key] : ""
      })
    }
    console.log(newerrors)
    return newerrors;
  }

  return (
    <div className="App">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <div>
            <div style={{ display: 'flex', margin: '10px', marginBottom: '20px', justifyContent: 'space-between', width: '100%' }}>
              <span>Email</span>
              <input className='inputbox'
                id="email"
                name="email"
                // value={formData.email}
                onChange={(e) => handleChange(e)}

              />
            </div>
            <ul>
              {
                Object.keys(errors.email).map((er) => {
                  if ((errors.email[er])?.length > 0) {
                    return <li style={{ color: 'red', fontSize: '10px' }}>{errors.email[er]}</li>
                  }
                })
              }
            </ul>
          </div>
          <div>
            <div style={{ display: 'flex', margin: '10px', marginBottom: '20px', justifyContent: 'space-between', width: '100%' }}>
              <span>Password</span>
              <input className='inputbox'
                type="password"
                id="password"
                name="password"
                // value={formData.password}
                onChange={(e) => handleChange(e)}

              />
            </div>
            <ul>
              {
                Object.keys(errors.password).map((er) => {
                  if ((errors.password[er])?.length > 0) {
                    return <li style={{ color: 'red', fontSize: '10px' }}>{errors.password[er]}</li>
                  }
                })
              }
            </ul>
          </div>
          <button className='submit-btn' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
