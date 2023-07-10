"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";

import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";
import SchoolSelect from "../inputs/SchoolSelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  // const [location, setLocation] = useState<any>(null);
  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  // const handleChange = (schoolSelected: SetStateAction<any>) => {
  //   setLocation(schoolSelected);
  //   console.log(`Option selected:`, schoolSelected);
  // };

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    // Convertir guestCount de string a number
    data.guestCount = parseInt(data.guestCount, 10); // Utiliza parseInt con la base 10
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("¡Producto publicado!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Algo salió mal.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Finalizar";
    }

    return "Siguiente";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Anterior";
  }, [step]);
  const validNumber = /^\d{10}$/.test(guestCount);

  const isDisabled =
    (step === STEPS.CATEGORY && !category) ||
    (step === STEPS.LOCATION && !location) ||
    (step === STEPS.IMAGES && !imageSrc) ||
    (step === STEPS.INFO && !validNumber) ||
    // Agrega más condiciones para otros campos si es necesario
    isLoading;

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿Cuál de estas opciones describe mejor tu producto?"
        subtitle="Elige una categoría"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿De qué edifio eres?"
          subtitle="¡Ayuda a los estudiantes a encontrarte!"
        />
        {/* <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        /> */}
        <SchoolSelect
          selectedSchool={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cuál es tu número de celular?"
          subtitle="Para que los estudiantes puedan hacer su pedido a tu WhatsApp"
        />

        <Input
          id="guestCount"
          label="Número de celular (10 dígitos)"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          pattern="[0-9]{10}"
        />

        {/* <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        /> */}
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Agrega una foto de tu producto"
          subtitle="¡Muestra a todos cómo es tu producto!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cómo describirías tu producto?"
          subtitle="¡Agrega una buena descripción!"
        />
        <Input
          id="title"
          label="Título"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <div className=" w-full relative">
          <textarea
            id="description"
            title="Description"
            cols={50}
            rows={7}
            {...register("description", { required: true })}
            className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors["description"] ? "border-rose-500" : "border-neutral-300"}
          ${
            errors["description"]
              ? "focus:border-rose-500"
              : "focus:border-black"
          }
          `}
          />

          <label
            className={`
            absolute 
            text-md
            duration-150 
            transform 
            -translate-y-3 
            top-5 
            z-10 
            origin-[0] 
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-4
            left-4 
            ${errors["description"] ? "text-rose-500" : "text-zinc-400"}
            `}
          >
            Descripción
          </label>
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ahora, fija tu precio"
          subtitle="¿Cuánto cuesta cada producto?"
        />
        <Input
          id="price"
          label="Precio (MXN)"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading || isDisabled}
      isOpen={rentModal.isOpen}
      title="¡Pon algo a la venta!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
