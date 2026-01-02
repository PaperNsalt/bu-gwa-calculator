import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import { PlusIcon, RemoveIcon } from "../components/IconComponent";

function MainPage() {
  const [gwa, setGwa] = useState(null);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const [subjects, setSubjects] = useState([{ grade: "", units: "" }]);

  // Add new subject row
  const addSubject = () => {
    setSubjects([...subjects, { grade: "", units: "" }]);
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const computeGWA = () => {
    setError("");

    // Validate header fields
    if (!name || !course || !year) {
      setGwa(null);
      setError("Please fill in your Name, Course, and Year.");
      return;
    }

    let totalWeighted = 0;
    let totalUnits = 0;

    for (let i = 0; i < subjects.length; i++) {
      const { grade, units } = subjects[i];
      const g = parseFloat(grade);
      const u = parseFloat(units);

      if (!grade || !units) {
        setGwa(null);
        setError(`Please complete all fields in Subject ${i + 1}.`);
        return;
      }

      if (isNaN(g) || isNaN(u) || u <= 0) {
        setGwa(null);
        setError(`Invalid values in Subject ${i + 1}.`);
        return;
      }

      totalWeighted += g * u;
      totalUnits += u;
    }

    if (totalUnits === 0) {
      setGwa(null);
      setError("Total units must be greater than zero.");
      return;
    }

    const result = totalWeighted / totalUnits;
    setGwa(result.toFixed(2));
  };

  const getAward = (gwa) => {
    const value = parseFloat(gwa);

    if (value <= 1.25) {
      return {
        title: "President’s Lister",
        message: "Congratulations!",
        isFailed: false,
      };
    }

    if (value <= 1.75) {
      return {
        title: "Dean’s Lister",
        message: "Congratulations! You did great 👏",
        isFailed: false,
      };
    }

    if (value <= 3.0) {
      return {
        title: "No Award",
        message: "Good job! Keep pushing 💪",
        isFailed: false,
      };
    }

    return {
      title: "Failed",
      message: "Better luck next time. Don’t give up 💙",
      isFailed: true,
    };
  };

  const award = gwa !== null ? getAward(gwa) : null;

  return (
    <section className=" min-h-[80vh] flex flex-col justify-center items-center p-8">
      <div className=" flex justify-center items-center flex-col mb-6 text-white">
        <h1 className="text-[4rem] tracking-tighter leading-14 font-medium">
          BU GWA Calculator
        </h1>
        <p>By: PaperNsalt</p>
      </div>
      <div className="bg-linear-to-t from-indigo-500 to-blue-500 shadow-lg flex flex-col gap-6 rounded-4xl p-10">
        {/* Header Info */}
        <div className="grid grid-cols-3 gap-6 w-full">
          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        {/* Plus Button */}
        <div className="w-full flex justify-end">
          <ButtonComponent icon={PlusIcon} onClick={addSubject} />
        </div>

        {/* Subject Inputs */}
        <AnimatePresence>
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-2 gap-6 w-full"
            >
              <div className="flex gap-2 items-center">
                <InputField
                  type="number"
                  step="0.25"
                  placeholder="Grade (1.00–5.00)"
                  value={subject.grade}
                  onChange={(e) => handleChange(index, "grade", e.target.value)}
                />
              </div>

              <div className="flex gap-2 items-center">
                <InputField
                  type="number"
                  placeholder="Number of Units"
                  value={subject.units}
                  onChange={(e) => handleChange(index, "units", e.target.value)}
                />

                {/* Remove button only if more than 1 row */}
                {subjects.length > 1 && (
                  <ButtonComponent
                    icon={RemoveIcon}
                    onClick={() => removeSubject(index)}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-red-100 text-red-700 px-4 py-3 rounded-2xl text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <ButtonComponent label="Compute" onClick={computeGWA} />
        </div>

        <AnimatePresence>
          {gwa !== null && award && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center grid grid-cols-2 gap-6 border-t-2 border-white pt-8"
            >
              {/* Left Section */}
              <div className="flex flex-col justify-center items-center">
                <p
                  className={`mt-1 text-[2rem] font-semibold tracking-tighter leading-10 ${
                    award.isFailed ? "text-red-100" : "text-white"
                  }`}
                >
                  {award.message}
                </p>
                <p
                  className={` mt-2 text-[1.8rem] font-semibold tracking-tighter leading-10 ${
                    award.isFailed ? "text-red-300" : "text-[#ff7944]"
                  }`}
                >
                  {award.title}
                </p>
                <p className="mt-2 text-[1.4rem] tracking-tighter text-white">
                  {name}
                </p>

                <p className="text-[1.2rem] tracking-tighter text-white">
                  {`${year} ${course}`}
                </p>
              </div>

              {/* Right Section */}
              <div className="bg-white p-12 rounded-4xl flex flex-col justify-center items-center">
                <p className="text-xl">Your GWA is</p>
                <h2
                  className={`text-[3rem] font-bold ${
                    award.isFailed ? "text-red-600" : "text-black"
                  }`}
                >
                  {gwa}
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MainPage;
