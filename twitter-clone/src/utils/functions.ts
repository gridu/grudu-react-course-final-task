// TODO: naming convention for this file. should be more universal, like 'utils'
import axios from "axios";

export const getUser = async (authorId: string) => {

  try {
    const response = await axios.get(`http://localhost:3001/users/${authorId}`);
    return response.data
  } catch (err) {
    throw new Error('User doesn\'t exist');
  }
};

export const getInitials = (name: string) => { //TODO: can use generic type here to make it more universal https://www.typescriptlang.org/docs/handbook/2/generics.html
  return (name as string).split(" ").map((n)=>n[0]).join("");
} 