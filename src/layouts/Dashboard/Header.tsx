// import React from "react";
// import { useSelector } from "react-redux";
// import { AuthUser } from "../../models/auth";
// import { RootState } from "../../store";
// import { SkeletonLoader } from "../../components/SkeletonLoader";
// import { LoadingType } from "../../models/store";


// const Header = () => {
//   const user = useSelector<RootState, AuthUser | null>(
//     (state) => state.session.currentUser.entities
//   );
//   const { status } = useSelector((state: RootState) => state.auth.currentUser);

//   if ( !user) {
//     return (
//       <header className="sticky w-full top-0 p-3 flex items-center justify-end bg-blue-600 text-white shadow-md">
//         <SkeletonLoader />
//       </header>
//     );
//   }

//   return (
//     <header className="sticky top-0 p-4 flex items-center justify-between bg-blue-600 text-white shadow-md">
//       <div className="text-xl font-bold">Dashboard</div>
      
//       {user && (
//         <div className="flex items-center gap-4">
//           <div className="text-right">
//             <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
//             <p className="text-sm opacity-90">{user.email}</p>
//           </div>
//           <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center">
//             <span className="font-medium">
//               {user.firstName[0]}
//               {user.lastName[0]}
//             </span>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, {useMemo} from "react";
import { useSelector } from "react-redux";
import { AuthUser } from "../../models/auth";
import { RootState } from "../../store";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { getRandomColor } from "../../utils/RandomColor";

const Header = () => {
  const user = useSelector<RootState, AuthUser | null>(
    (state) => state.session.currentUser.entities
  );
  const { status } = useSelector((state: RootState) => state.auth.currentUser);
  
  const avatarBgColor = useMemo(() => getRandomColor(), []);

  if (!user) {
    return (
      <header className="sticky w-full top-0 p-3 flex items-center justify-end bg-blue-600 text-white shadow-md">
        <SkeletonLoader />
      </header>
    );
  }

  return (
    <header className="sticky top-0 p-4 flex items-center justify-between bg-blue-600 text-white shadow-md">
      <div className="text-xl font-bold">Dashboard</div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-sm opacity-90">{user.email}</p>
        </div>
        <div className={`h-10 w-10 rounded-full ${avatarBgColor} flex items-center justify-center`}>
          <span className="font-medium">
            {user.firstName[0]}
            {user.lastName[0]}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
