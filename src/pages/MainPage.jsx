import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import { PlusIcon, RemoveIcon } from "../components/IconComponent";

function MainPage() {
  const [gwa, setGwa] = useState(null);
  const [name, setName] = useState ("");
  const [course, setCourse] = useState ("");
  const [year, setYear] = useState ("");

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
    let totalWeighted = 0;
    let totalUnits = 0;

    subjects.forEach(({ grade, units }) => {
      const g = parseFloat(grade);
      const u = parseFloat(units);

      if (!isNaN(g) && !isNaN(u) && u > 0) {
        totalWeighted += g * u;
        totalUnits += u;
      }
    });

    if (totalUnits === 0) {
      setGwa(null);
      return;
    }

    const result = totalWeighted / totalUnits;
    setGwa(result.toFixed(2));
  };

  return (
    <section>
      <div className="flex justify-center flex-col mb-6">
        <h1 className="text-[4rem] tracking-tighter leading-14 font-medium">
          BU GWA Calculator
        </h1>
        <p>By: PaperNsalt</p>
      </div>

      <div className="bg-white shadow-md flex flex-col gap-6 rounded-4xl p-10">
        {/* Header Info */}
        <div className="grid grid-cols-3 gap-6 w-full">
          <InputField type="text" placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <InputField type="text" placeholder="Course" 
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          />
          <InputField type="text" placeholder="Year" 
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
              <InputField
                type="number"
                step="0.25"
                placeholder="Grade (1.00–5.00)"
                value={subject.grade}
                onChange={(e) => handleChange(index, "grade", e.target.value)}
              />

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

        <div>
          <ButtonComponent label="Compute" onClick={computeGWA} />
        </div>

        <AnimatePresence>
          {gwa && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-4 grid grid-cols-2"
            >
              <div>
              <p className="text-xl">Your GWA is</p>
              <h2 className="text-[3rem] font-bold">{gwa}</h2>
              </div>
              <div>
              <p>{name}</p>
              <p>{course}</p>
              <p>{year}</p>
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MainPage;
