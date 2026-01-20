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
    <section className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
      <div className="flex justify-center items-center flex-col mb-6 text-white text-center">
        <h1 className="text-4xl md:text-6xl lg:text-[4rem] tracking-tighter leading-tight font-medium">
          BU GWA Calculator
        </h1>
        <p className="mt-2 text-sm md:text-base">By: PaperNsalt</p>
      </div>
      
      <div className="bg-linear-to-t from-indigo-500 to-blue-500 shadow-lg flex flex-col gap-6 rounded-3xl md:rounded-4xl p-6 md:p-10 w-full max-w-3xl">
        {/* Header Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
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
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {subjects.map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                // Kept grid-cols-2 even on mobile so Grade and Units stay side-by-side
                className="grid grid-cols-2 gap-3 md:gap-6 w-full"
              >
                <div className="flex gap-2 items-center">
                  <InputField
                    type="number"
                    step="0.25"
                    placeholder="Grade"
                    value={subject.grade}
                    onChange={(e) => handleChange(index, "grade", e.target.value)}
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <InputField
                    type="number"
                    placeholder="Units"
                    value={subject.units}
                    onChange={(e) => handleChange(index, "units", e.target.value)}
                  />

                  {/* Remove button only if more than 1 row */}
                  {subjects.length > 1 && (
                    <div className="shrink-0">
                      <ButtonComponent
                        icon={RemoveIcon}
                        onClick={() => removeSubject(index)}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-red-100 text-red-700 px-4 py-3 rounded-2xl text-center text-sm md:text-base"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <ButtonComponent label="Compute" onClick={computeGWA} className="w-full md:w-auto" />
        </div>

        <AnimatePresence>
          {gwa !== null && award && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center grid grid-cols-1 md:grid-cols-2 gap-6 border-t-2 border-white pt-8"
            >
              {/* Left Section (Award Info) */}
              <div className="flex flex-col justify-center items-center order-2 md:order-1">
                <p
                  className={`mt-1 text-2xl md:text-[2rem] font-semibold tracking-tighter leading-tight ${
                    award.isFailed ? "text-red-100" : "text-white"
                  }`}
                >
                  {award.message}
                </p>
                <p
                  className={`mt-2 text-xl md:text-[1.8rem] font-semibold tracking-tighter leading-tight ${
                    award.isFailed ? "text-red-300" : "text-[#ff7944]"
                  }`}
                >
                  {award.title}
                </p>
                <p className="mt-2 text-lg md:text-[1.4rem] tracking-tighter text-white">
                  {name}
                </p>

                <p className="text-base md:text-[1.2rem] tracking-tighter text-white">
                  {`${year} ${course}`}
                </p>
              </div>

              {/* Right Section (GWA Score) */}
              <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-4xl flex flex-col justify-center items-center order-1 md:order-2">
                <p className="text-lg md:text-xl">Your GWA is</p>
                <h2
                  className={`text-4xl md:text-[3rem] font-bold ${
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