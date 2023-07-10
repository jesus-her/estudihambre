import React from "react";
import Select from "react-select";

interface SchoolSelectProps {
  selectedSchool: any;
  onChange: (value: any) => void;
}

const SchoolSelect: React.FC<SchoolSelectProps> = ({
  selectedSchool,
  onChange,
}) => {
  const options = [
    { value: "ud1", label: "UD1", subtitle: "Financiera" },
    { value: "ud2", label: "UD2", subtitle: "Industrial" },
    { value: "ud3", label: "UD3", subtitle: "Mecatrónica" },
    { value: "ud4", label: "UD4", subtitle: "TI" },
    { value: "ud5", label: "UD5", subtitle: "Biotecnología" },
    { value: "ud6", label: "UD6", subtitle: "Automotriz" },
  ];

  return (
    <div className="container">
      <div className="mt-5 m-auto w-50">
        <Select
          options={options}
          onChange={(value) => onChange(value as any)}
          autoFocus={true}
          formatOptionLabel={(option: any) => (
            <div
              className="
            flex flex-row items-center gap-1"
            >
              <span className=" opacity-50">Edificio</span>
              <div className=" font-bold ">{option.label}</div>
              <div>
                {/* UPTx, */}
                <span className=" font-semibold opacity-80">
                  {option.subtitle}
                </span>
              </div>
            </div>
          )}
        />

        {/* <div className="mt-4">
          {selectedSchool && <>You've selected {selectedSchool.value}</>}
        </div> */}
      </div>
    </div>
  );
};

export default SchoolSelect;
