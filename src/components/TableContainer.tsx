import React, { PropsWithChildren } from "react";

type PropsTableContainer = {
//   data: [];
};

const TableContainer: React.FC<PropsWithChildren<PropsTableContainer>> = ({ children }) => {
  return <table className="w-full  overflow-scroll table  text-sm ">{children}</table>;
};

export default TableContainer;
