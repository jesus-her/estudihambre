"use client";

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import { Button } from "@nextui-org/react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Sin coincidencias exactas",
  subtitle = "Prueba a cambiar o quitar algunos de tus filtros",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center px-4
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            radius="full"
            color="primary"
            onClick={() => router.push("/")}
          >
            Eliminar todos los filtros
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
