import { useRouteError } from "react-router-dom";
import { IMG_CAT_404 } from "../utils/constants";

const Error = () => {
  // Hook the provide extra details about the error (as object).
  const { status, statusText } = useRouteError();
  return (
    <div className="mx-auto my-3 w-1/2">
      <h1 className="font-bold text-red-500">Oops! an error occurred</h1>
      <p>{`Error: ${status}, ${statusText}`}</p>
      <img className="mt-3 w-full" src={IMG_CAT_404}></img>
    </div>
  );
};

export default Error;
