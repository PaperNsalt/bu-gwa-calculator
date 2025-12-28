import InputField from "../components/InputFieldComponent";

function MainPage() {
  return (
    <>
      <section>
        <div className="flex justify-center ">
          <h1>Bicol University GWA Calculator</h1>
        </div>

        <div className="flex flex-col justify-center items-center border rounded-4xl">
          <InputField 
          type="text"
          placeholder="Name:"
          />

          <div className="grid grid-cols-2">
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
