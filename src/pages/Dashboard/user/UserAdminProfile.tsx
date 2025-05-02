import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../../store';
import { UserProfileLayout } from '../../../components/user/UserProfileLayout';
import { LoadingType } from '../../../models/store';
import { fetchUserProfile } from '../../../store/user/actions';

const UserAdminProfile = () => {

  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: user, status, error } = useSelector(
    (state: RootState) => state.user.currentProfile
  );
  
  useEffect(() => {
  
    if (userId && user?.id !== userId && status !== LoadingType.PENDING) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId, user?.id, status]);
  

  //  useEffect(() => {
  //     if (userId) {
  //       dispatch(fetchUserProfile(userId));
  //     }
  //   }, [dispatch, userId]);
  
    if (status === LoadingType.PENDING) {
      return <div className="text-center p-8">Loading user profile...</div>;
    }
  
    if (error) {
      return <div className="text-red-500 w-full text-center h-screen p-8">{error}</div>;
    }
  
    if (!user) {
      return <div className="p-8">User not found</div>;
    }


  return (
    <div>
        <UserProfileLayout user={user} /> 
    </div>
  )
}

export default UserAdminProfile

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router'
// import { AppDispatch, RootState } from '../../../store'
// import { UserProfileLayout } from '../../../components/user/UserProfileLayout'
// import { LoadingType } from '../../../models/store'
// import { fetchUserProfile } from '../../../store/user/actions'

// const UserAdminProfile = () => {
//   const { userId } = useParams<{ userId: string }>()
//   const dispatch = useDispatch<AppDispatch>()
//   const { data: user, status, error } = useSelector(
//     (state: RootState) => state.user.currentProfile
//   )

//   useEffect(() => {
//     if (!userId) return

//     // Check if existing user data matches the requested userId
//     if (user?.id === userId) return // Add type check if necessary (e.g., String(user.id) === userId)

//     const promise = dispatch(fetchUserProfile(userId))

//     // Cleanup: Abort the request if component unmounts or userId changes
//     return () => {
//       promise.abort() // Assumes your Redux thunk supports AbortController
//     }
//   }, [dispatch, userId, user?.id]) // Add user.id to dependencies

//   // Loading and error states remain the same
//   if (status === LoadingType.PENDING) {
//     return <div className="text-center p-8">Loading user profile...</div>
//   }

//   if (error) {
//     return <div className="text-red-500 w-full text-center h-screen p-8">{error}</div>
//   }

//   if (!user) {
//     return <div className="p-8">User not found</div>
//   }

//   return (
//     <div>
//       <UserProfileLayout user={user} />
//     </div>
//   )
// }

// export default UserAdminProfile;