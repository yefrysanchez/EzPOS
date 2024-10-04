import React from "react";

type AlertFunc = {
  alert: string;
};

const AlertSuccess: React.FC<AlertFunc> = ({ alert }) => {
  return <p className="bg-emerald-300 text-black p-3 rounded-lg mb-4 w-full">{alert}</p>;
};

export default AlertSuccess;
