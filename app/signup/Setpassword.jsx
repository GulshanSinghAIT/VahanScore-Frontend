import { useState } from "react";

const Setpassword = ({ formdata, setformdata, page, setpage }) => {
  const [errors, setErrors] = useState({});
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    symbol: false,
    number: false,
    upperCase: false,
    lowerCase: false,
  });

  const isValidPassword = (password) => {
    const conditions = {
      length: password.length >= 8,
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password),
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
    };
    setPasswordConditions(conditions);
    return Object.values(conditions).every(Boolean);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formdata.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formdata.password)) {
      newErrors.password = "Password does not meet the requirements";
    }
    if (!formdata.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formdata.confirmPassword !== formdata.password) {
      newErrors.confirmPassword = "Passwords must match";
    }
    if (!formdata.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms and conditions";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformdata({
      ...formdata,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "password") {
      isValidPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
        await fetch('http://localhost:5000/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formdata),
        });
      console.log("Form Submitted", formdata);
    } else {
      console.log("Form Validation Failed");
    }
  };

  return (
    <div className="max-w-[97%] mx-auto">
      <div className="mustica mt-10 md:ml-[2em] xl:ml-[8em] max-w-[55em]">
        <h1 className="text-white md:text-xl text-md text-md md:text-[2em]">
          Set up a <span className="text-[#278AE1]">password</span> and we’re
          good to go.
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 mt-8 text-white"
        >
          <div>
            <input
              id="password"
              className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-full px-5"
              placeholder="Setup a password"
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-red-400 ml-5 text-sm">{errors.password}</div>
            )}
          </div>

          <div>
            <input
              id="confirmPassword"
              className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-full px-5"
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              value={formdata.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-red-400 ml-5 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <PasswordConditionsDialog passwordConditions={passwordConditions} />

          <div className="flex items-center">
            <input
              id="agreedToTerms"
              type="checkbox"
              name="agreedToTerms"
              checked={formdata.agreedToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="agreedToTerms" className="text-sm">
              I agree to the{" "}
              <a
                onClick={() => setTerms(!terms)}
                className="text-[#278AE1] underline"
              >
                terms and conditions
              </a>{" "}
              and{" "}
              <a
                onClick={() => setPrivacy(!privacy)}
                className="text-[#278AE1] underline"
              >
                Privacy policy
              </a>
            </label>
          </div>
          {errors.agreedToTerms && (
            <div className="text-red-400 ml-5 text-sm">
              {errors.agreedToTerms}
            </div>
          )}

          <div className="flex gap-5  max-w-[50em]">
            <button
              type="button"
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
              onClick={() => setpage((current) => current - 1)}
              disabled={page === 0}
              className="w-[35%] md:w-[25%] text-white bg-[#fff]/30 py-2 rounded-full"
            >
              Previous
            </button>

            <button
              type="submit"
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
              className="w-[35%] md:w-[25%] text-white bg-[#278AE1] py-2 rounded-full"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PasswordConditionsDialog = ({ passwordConditions }) => (
  <div className="bg-gray-800 text-white p-4 rounded-lg ">
    <h3 className="text-md mb-2">
      Password <span className="text-[#278AE1]"> must Contain</span>
    </h3>
    <ul className="list-disc text-sm ml-5">
      <li
        className={
          passwordConditions.length ? "text-green-400" : "text-red-400"
        }
      >
        At least 8 characters long
      </li>
      <li
        className={
          passwordConditions.symbol ? "text-green-400" : "text-red-400"
        }
      >
        Contains at least one symbol (!@#$%^&*(),.?":{})
      </li>
      <li
        className={
          passwordConditions.number ? "text-green-400" : "text-red-400"
        }
      >
        Contains at least one number
      </li>
      <li
        className={
          passwordConditions.upperCase ? "text-green-400" : "text-red-400"
        }
      >
        Contains at least one uppercase letter
      </li>
      <li
        className={
          passwordConditions.lowerCase ? "text-green-400" : "text-red-400"
        }
      >
        Contains at least one lowercase letter
      </li>
    </ul>
  </div>
);

export default Setpassword;
