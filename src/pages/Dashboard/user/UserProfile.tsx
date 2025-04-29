import React from 'react'
import ProfileForm from '../../../components/user/UserProfile'
import PasswordChangeForm from '../../../components/user/PasswordChangeForm'

const UserProfile = () => {
  return (
    <div>
        <ProfileForm />
        <PasswordChangeForm />
    </div>
  )
}

export default UserProfile