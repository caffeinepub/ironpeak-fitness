import { useMutation, useQuery } from "@tanstack/react-query";
import type { Program, Result, Trainer } from "../backend.d";
import { useActor } from "./useActor";

export function useGetPrograms() {
  const { actor, isFetching } = useActor();
  return useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrograms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTrainers() {
  const { actor, isFetching } = useActor();
  return useQuery<Trainer[]>({
    queryKey: ["trainers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrainers();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation<Result, Error, ContactFormData>({
    mutationFn: async ({ name, email, subject, message }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContact(name, email, subject, message);
    },
  });
}
