import React from "react";
import Select from "react-select";

interface SchoolSelectProps {
  selectedSchool?: any;
  onChange: (value: any) => void;
  extraOptions?: boolean;
}

const SchoolSelect: React.FC<SchoolSelectProps> = ({
  selectedSchool,
  onChange,
  extraOptions,
}) => {
  const options = [
    { value: "ud1", label: "UD1", subtitle: "Financiera" },
    { value: "ud2", label: "UD2", subtitle: "Industrial" },
    { value: "ud3", label: "UD3", subtitle: "Mecatrónica" },
    { value: "ud4", label: "UD4", subtitle: "TI" },
    { value: "ud5", label: "UD5", subtitle: "Biotecnología" },
    { value: "ud6", label: "UD6", subtitle: "Automotriz" },
  ];
  const moreOptions = [
    { value: "ud1", label: "UD1", subtitle: "Financiera" },
    { value: "ud2", label: "UD2", subtitle: "Industrial" },
    { value: "ud3", label: "UD3", subtitle: "Mecatrónica" },
    { value: "ud4", label: "UD4", subtitle: "TI" },
    { value: "ud5", label: "UD5", subtitle: "Biotecnología" },
    { value: "ud6", label: "UD6", subtitle: "Automotriz" },
    { value: "gym", label: "Gimnasio Universitario", subtitle: "" },
    { value: "biblioteca", label: "Biblioteca", subtitle: "" },
    { value: "cafeteria", label: "Cafetería", subtitle: "" },
  ];

  return (
    <div className="container">
      <div className="mt-5 m-auto w-50">
        <Select
          styles={{
            menuList: (provided, state) => ({
              ...provided,
              paddingTop: 0,
              paddingBottom: 0,
            }),
          }}
          isSearchable={false}
          options={extraOptions ? moreOptions : options}
          onChange={(value) => onChange(value as any)}
          autoFocus={true}
          placeholder={"Selecciona un Edificio..."}
          value={selectedSchool}
          formatOptionLabel={(option: any) => (
            <div
              className=" my-1
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
      </div>
    </div>
  );
};

export default SchoolSelect;
