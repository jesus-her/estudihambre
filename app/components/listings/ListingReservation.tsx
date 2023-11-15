"use client";

import { Range } from "react-date-range";

import Counter from "../inputs/Counter";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SchoolSelect from "../inputs/SchoolSelect";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Chip,
  Select,
  SelectItem,
  Input,
  Textarea,
} from "@nextui-org/react";
import { BiCheckCircle, BiSend } from "react-icons/bi";
import { RiCheckFill } from "react-icons/ri";
import { BsSendCheckFill } from "react-icons/bs";

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
      }* en el *Edificio ${selectedSchool?.label?.toUpperCase()} ${
        selectedSchool?.subtitle
      }*`;

    let message2 =
      `¡Hola ${listing.user?.name}!` +
      " me gustaría hacer el siguiente pedido: " +
      `*${quantity} ${listing.title}* ${
        comments && ", " + comments
        //@ts-ignore
      }, actualmente me encuentro en el *Edificio ${selectedSchool?.toUpperCase()}*`;

    // Enviar el mensaje con la imagen adjunta
    let url = `https://api.whatsapp.com/send?phone=52${cellphone}&text=${encodeURIComponent(
      // selectedSchool?.subtitle ? message : message2
      message2
    )}`;
    url += `&file=${encodeURIComponent(file.name)}`;
    window.open(url);
  }

  const [comments, setComments] = useState("");

  return (
    <div className=" rounded-xl border border-[#f0f0f0] dark:border-[#2c2c2c] ">
      <Card>
        <CardHeader>
          <Counter
            title="Cantidad"
            subtitle=""
            value={quantity}
            onChange={(value) => setCustomValue("quantity", value)}
          />
        </CardHeader>
        <hr />
        <CardBody>
          <span className=" text-base font-bold">
            ¿En dónde te gustaría recibir tu producto?
          </span>{" "}
          <br />
          <span className=" opacity-80 text-sm">
            ¡Selecciona el edificio en el que te encuentras actualmente para
            ayudar al vendedor a encontrarte!
          </span>
          <div className="flex w-full max-w-xs flex-col gap-2 my-4">
            <Select
              disallowEmptySelection
              isRequired
              label="Edificio Actual"
              variant="bordered"
              placeholder="Selecciona tu Edificio actual"
              selectedKeys={selectedSchool.value}
              className="max-w-xs"
              onChange={(e) => setSelectedSchool(e.target.value as any)}
            >
              {moreOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          {/* <SchoolSelect
            extraOptions
            selectedSchool={selectedSchool}
            onChange={(value) => {
              setSelectedSchool(value);
            }}
          /> */}
          <div className="w-full flex flex-col gap-2 ">
            <Textarea
              label="Comentarios (Opcional)"
              placeholder="Ingresa algún comentario extra"
              value={comments}
              description="Puedes agregar algún comentario extra para el vendedor."
              onValueChange={setComments}
            />
            {/* <p className="text-default-500 text-small">
              Input value: {comments}
            </p> */}
          </div>
        </CardBody>
        <CardFooter className="p-4 flex flex-row gap-6 items-end justify-between ">
          <div className=" text-md font-extrabold  flex flex-col items-center  ">
            <span className=" font-semibold opacity-80 mb-1">Total: </span>
            <Chip size="lg" variant="shadow" color="success">
              {`$${totalPrice * quantity}`}
            </Chip>
          </div>
          <Button
            color="primary"
            radius="full"
            className=" font-bold text-base"
            endContent={<BiSend />}
            onClick={SendMessage}
            isDisabled={disabled || selectedSchool.value === ""}
          >
            ¡Pedir!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListingReservation;
