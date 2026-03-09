import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Time = bigint;
export interface Trainer {
    id: bigint;
    bio: string;
    yearsExperience: bigint;
    name: string;
    specialty: string;
    certifications: Array<string>;
}
export interface Program {
    id: bigint;
    duration: bigint;
    difficulty: Difficulty;
    name: string;
    description: string;
    isPopular: boolean;
    category: string;
}
export enum Difficulty {
    Beginner = "Beginner",
    Advanced = "Advanced",
    Intermediate = "Intermediate"
}
export interface backendInterface {
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getPrograms(): Promise<Array<Program>>;
    getTrainers(): Promise<Array<Trainer>>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<Result>;
}
