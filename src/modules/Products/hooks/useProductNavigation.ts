import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

export const useProductNavigation = () => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (id: string) => navigate({ to: "/products/$id", params: { id } }),
    [navigate]
  );

  return { handleCardClick };
};
