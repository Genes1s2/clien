// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createRole, updateRole } from '../../store/rolePermissions/action';
// import { AppDispatch } from '../../store';

// const RoleForm = ({ existingRole }: { existingRole?: any }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [name, setName] = useState(existingRole?.name || '');
//   const [permissions, setPermissions] = useState<string[]>(existingRole?.permissions?.map((p: any) => p.id) || []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const roleData = { name, permissionIds: permissions };

//     if (existingRole) {
//       dispatch(updateRole({ id: existingRole.id, data: roleData }));
//     } else {
//       dispatch(createRole(roleData));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Role Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           required
//         />
//       </div>

//       {/* Add permission selection (you'll need to fetch permissions) */}

//       <button
//         type="submit"
//         className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//       >
//         {existingRole ? 'Update Role' : 'Create Role'}
//       </button>
//     </form>
//   );
// };

// export default RoleForm;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createRole, fetchPermissions, fetchRoles, updateRole } from '../../store/rolePermissions/action';
import { AppDispatch, RootState } from '../../store';
import { LoadingType } from '../../models/store';
import { Permission, UserRole } from '../../models/rolePermissions';
import { showError, showSuccess } from '../../utils/Notifications';

const roleSchema = Yup.object().shape({
  name: Yup.string().required('Role name is required'),
  permissionIds: Yup.array()
    .of(Yup.string().required())
    .min(1, 'At least one permission must be selected')
});

const RoleForm = ({ existingRole, onSuccess }: { existingRole?: any; onSuccess?: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const permissions = useSelector((state: RootState) => state.rolePermissions.permissions);
  const { status } = useSelector((state: RootState) => state.rolePermissions);
  useEffect(() => {
    dispatch(fetchPermissions());
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        name: existingRole?.name || '',
        permissionIds: existingRole?.permissions?.map((p: any) => p.id) || []
      }}
      validationSchema={roleSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (existingRole) {
            console.log('Updating role:', existingRole.id, values);

            await dispatch(updateRole({ roleId: existingRole.id, data: values as UserRole })).unwrap();
            await dispatch(fetchRoles()).unwrap();
            showSuccess('Role updated successfully!');
            // setSubmitting(false);
          } else {
            await dispatch(createRole(values as UserRole)).unwrap();
            showSuccess('Role created successfully!');
            setSubmitting(false);
          }
          onSuccess?.();
        } catch (error: any) {
          console.error('Error:', error);
          await dispatch(fetchRoles());
          showError(error || 'Failed to create/update role');
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors, touched }) => (
        <Form className="space-y-4">
          {/* Role Name Field */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name
            </label>
            <Field
              name="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name && touched.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Permissions Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <ErrorMessage name="permissionIds" component="div" className="text-red-500 text-sm mb-2" />

            {status === LoadingType.PENDING ? (
              <div className="text-gray-500">Loading permissions...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {permissions.map((permission: Permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Field
                        name="permissionIds"
                        value={permission.id}
                        type="checkbox"
                        checked={values.permissionIds.includes(permission.id)}
                        onChange={(e: any) => {
                          const newIds = e.target.checked
                            ? [...values.permissionIds, permission.id]
                            : values.permissionIds.filter((id: any) => id !== permission.id);
                          setFieldValue('permissionIds', newIds);
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="block text-sm text-gray-700">
                        {permission.name}
                        {permission.description && (
                          <span className="block text-xs text-gray-500">
                            {permission.description}
                          </span>
                        )}

                        {/* {permissions.length === 0 ? (
                          <div>Loading permissions...</div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                            {permissions.map((permission) => (
                              <label key={permission.id}>
                                <Field
                                  type="checkbox"
                                  name="permissionIds"
                                  value={permission.id}
                                />
                                {permission.name}
                              </label>
                            ))}
                          </div>
                        )} */}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Select All Button */}
                <button
                  type="button"
                  onClick={() => {
                    const allIds = permissions.map(p => p.id);
                    setFieldValue(
                      'permissionIds',
                      values.permissionIds.length === allIds.length ? [] : allIds
                    );
                  }}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {values.permissionIds.length === permissions.length
                    ? 'Deselect All'
                    : 'Select All'}
                </button>
              </>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : existingRole ? 'Update Role' : 'Create Role'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RoleForm;