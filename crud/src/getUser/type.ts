export type typesMention = {
    _id: number;
    name: string;
    email: string;
    number: string;
    address: string;
  };
  
export type FormDataType = Omit<typesMention, '_id'>;
  