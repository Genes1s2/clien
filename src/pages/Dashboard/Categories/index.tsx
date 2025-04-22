// import React, { useEffect } from "react";
// import Card from "../../../components/Card";
// import Pagination from "../../../components/Pagination";
// import TableContainer from "../../../components/TableContainer";
// import { useDispatch, useSelector } from "react-redux";
// import { selectCategoriesWithPagination } from "../../../store/categories/slice";
// import { AppDispatch } from "../../../store";
// import { getAllCategoriesWithPaginationAction } from "../../../store/categories/actions";

// const CategoryList = () => {
//   const categories = useSelector(selectCategoriesWithPagination);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(getAllCategoriesWithPaginationAction({}));
//   }, [dispatch]);

//   return (
//     <div>
//       <Card>
//         <div className="flex flex-row justify-between">
//           <h4>Add, update, delete and filter </h4>
//           <div className="flex flex-row gap-2">
//             <button>Add</button>
//           </div>
//         </div>

//         <TableContainer>
//           <thead>
//             <tr className="bg-hovercolor px-8  flex flex-row gap-20">
//               <th scope="col" className="py-4">
//                 ID
//               </th>
//               <th scope="col" className=" py-4">
//                 Nom
//               </th>
//               <th scope="col" className=" py-4">
//                 Created At
//               </th>
//               <th scope="col" className=" py-4">
//                 Updated At
//               </th>
//               {/* <th scope="col" className="py-4">
//                 Actions
//               </th> */}
//             </tr>
//           </thead>
//           <tbody className="flex flex-col table-auto ">
//             {categories.entities && categories.entities.map((category) => (
//               <tr
//                 className="bg-white border-b flex items-center px-8 gap-20  whitespace-nowrap dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 key={category.id}
//               >
//                 <th className="  py-4 ">{category.id}</th>
//                 <td className="j py-4 first-letter:capitalize">
//                   {category.name}
//                 </td>
//                 <td className=" py-4   first-letter:capitalize">
//                   {category.createdAt.toString()}
//                 </td>
//                 <td className=" py-4 first-letter:capitalize">
//                   {category.updatedAt.toString()}
//                 </td>
//                 {/* <td className=" py-4  ">
//                   <button
//                     className="font-medium text-blue-600 dark:text-blue-600 hover:underline"
//                     onClick={() => handleEdit(category)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="font-medium text-bgred dark:text-bgred hover:underline ms-3"
//                     onClick={() => handleDelete(category.id)}
//                   >
//                     Remove
//                   </button>
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </TableContainer>
//         <Pagination />
//       </Card>
//     </div>
//   );
// };

// export default CategoryList;

import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index
