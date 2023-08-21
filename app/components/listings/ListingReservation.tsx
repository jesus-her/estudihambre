"use client";

import { Range } from "react-date-range";

import Button from "../Button";
// import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SchoolSelect from "../inputs/SchoolSelect";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  listing: any;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  listing,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      quantity: 1,
    },
  });
  const quantity = watch("quantity");
  const [selectedSchool, setSelectedSchool] = useState({
    label: "",
    subtitle: "",
    value: "",
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  function getCloudinaryImageId(imageSrc: any) {
    const regex = /upload\/v\d+\/(.+)\.[a-zA-Z0-9]+$/;
    const match = imageSrc.match(regex);

    if (match && match.length > 1) {
      return match[1];
    }

    return null;
  }

  async function SendMessage() {
    let cloudinaryImageId = getCloudinaryImageId(listing.imageSrc);
    let cellphone = listing.guestCount.toString();
    // Descargar la imagen desde Cloudinary
    let response = await fetch(
      `https://res.cloudinary.com/dw1bu27jb/image/upload/${cloudinaryImageId}`
    );
    let blob = await response.blob();

    // Crear un objeto File desde el blob de la imagen descargada
    let file = new File([blob], "image.jpg", { type: blob.type });

    // Crear un objeto FormData y adjuntar la imagen
    let formData = new FormData();
    formData.append("image", file);

    // Crear un nuevo mensaje con la imagen adjunta

    let message =
      `¡Hola ${listing.user?.name}!` +
      " me gustaría hacer el siguiente pedido: " +
      `*${quantity} ${
        listing.title
      }* en el *Edificio ${selectedSchool.label.toUpperCase()} ${
        selectedSchool.subtitle
      }*`;

    let message2 =
      `¡Hola ${listing.user?.name}!` +
      " me gustaría hacer el siguiente pedido: " +
      `*${quantity} ${listing.title}* en el *Edificio ${selectedSchool.label}*`;

    // Enviar el mensaje con la imagen adjunta
    let url = `https://api.whatsapp.com/send?phone=52${cellphone}&text=${encodeURIComponent(
      selectedSchool.subtitle ? message : message2
    )}`;
    url += `&file=${encodeURIComponent(file.name)}`;
    window.open(url);
  }

  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 ">
      {/* <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">c/u</div>
      </div> */}

      {/* <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      /> */}
      <div className=" p-4">
        <Counter
          title="Cantidad"
          subtitle=""
          value={quantity}
          onChange={(value) => setCustomValue("quantity", value)}
        />
      </div>
      <hr />
      <div className=" p-4">
        <span className=" text-sm font-bold">
          ¿En dónde te gustaría recibir tu producto?
        </span>{" "}
        <br />
        <span className=" opacity-80 text-xs">
          ¡Selecciona el edificio en el que te encuentras actualmente para
          ayudar al vendedor a encontrarte!
        </span>
        <SchoolSelect
          extraOptions
          selectedSchool={selectedSchool}
          onChange={(value) => {
            setSelectedSchool(value);
          }}
        />
      </div>
      <div className="p-4 flex flex-row gap-6 items-center justify-center ">
        <div className=" text-md font-extrabold  flex flex-col  ">
          <span className=" font-semibold opacity-80">Total: </span>
          {`$${totalPrice * quantity}`}
        </div>
        <Button
          disabled={disabled || !selectedSchool.value}
          label="¡Pedir!"
          price={totalPrice}
          onClick={SendMessage}
        />
      </div>
      <hr />
    </div>
  );
};

export default ListingReservation;
