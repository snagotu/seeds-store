import { Image, ColorValue } from "react-native";

export enum Status {
  PENDING = 'pending',
  PROGRESS = 'in-progress',
  DONE = 'done'
}

export interface IProducts {
  _id?: string;
  title: string;
  binomialName: string;
  description: Text;
  ukOnly: boolean;
  image1: Image;
  image2: Image;
  accentColor: ColorValue;
  backgroundColor: ColorValue;
  textColor: ColorValue;
  order: string;
  price: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
