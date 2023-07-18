export interface IMessage {
  type: "user" | "assistant" | "system";
  text: string;
  id?: number;
}

export interface Modes {
  type: string;
  action: string;
}

export const defaultMode = {
  type: '',
  action: '',
}