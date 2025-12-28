import InputField from "../components/InputFieldComponent";
import { motion } from "motion/react";
function MainPage() {
  return (
    <>
      <section>
        <div className="flex justify-center flex-col gap-0 mb-6">
          <h1 className="text-[4rem] tracking-tighter leading-14 font-medium">BU GWA Calculator</h1>
          <p>By: PaperNsalt</p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center border rounded-4xl p-10">
          {/* header */}
          <div className="grid grid-cols-3 gap-6 w-full">
          <InputField 
          type="text"
          placeholder="Name:"
          />
          <InputField 
          type="text"
          placeholder="Course"
          />
          <InputField 
          type="text"
          placeholder="Year"
          />
          </div>

          <div className="grid grid-cols-2 gap-6 w-full">
          <InputField
            type="number"
            step="0.25"
            placeholder="Grade (1.00–5.00)"
          />
          <InputField 
          type="number"
          placeholder="Number of Units"
          />
          </div>

        </div>
      </section>
    </>
  );
}

export default MainPage;
